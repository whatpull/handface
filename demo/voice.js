/**
 * VoiceController — clap detection + STT + TTS.
 *
 * · 박수 1회 → 음성 인식 시작
 * · 박수 2회 → 음성 인식 중지 + 텍스트 전송
 * · AI 응답 → TTS 음성 출력
 *
 * 모두 브라우저 내장 API, 추가 비용 없음.
 */

const CLAP_THRESHOLD     = 0.32;   // idle 시 볼륨 임계값
const CLAP_THRESHOLD_HI  = 0.55;   // listening 중 (말소리 오인 방지)
const CLAP_DEBOUNCE_MS   = 280;    // 같은 박수 내 중복 방지
const CLAP_WINDOW_MS     = 650;    // 이 시간 안에 추가 박수가 없으면 확정

export class VoiceController {
  constructor() {
    this.listening    = false;
    this.recognition  = null;
    this.audioCtx     = null;
    this.analyser     = null;
    this.handlers     = new Set();
    this.lastClapTime = 0;
    this.clapCount    = 0;
    this.clapTimer    = null;
    this.lastTranscript = '';
    this.available    = false;
  }

  onEvent(fn) { this.handlers.add(fn); return () => this.handlers.delete(fn); }
  emit(ev)    { for (const fn of this.handlers) fn(ev); }

  async init() {
    try {
      // Audio stream for clap detection
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source  = this.audioCtx.createMediaStreamSource(stream);
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 512;
      source.connect(this.analyser);

      // Speech recognition
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SR) {
        this.recognition = new SR();
        this.recognition.continuous     = true;
        this.recognition.interimResults = true;
        this.recognition.lang           = navigator.language || 'en-US';

        this.recognition.onresult = (e) => {
          let interim = '', final = '';
          for (let i = e.resultIndex; i < e.results.length; i++) {
            const t = e.results[i][0].transcript;
            if (e.results[i].isFinal) final += t;
            else interim += t;
          }
          this.lastTranscript = final || interim;
          this.emit({ type: 'transcript', text: this.lastTranscript, isFinal: !!final });
        };

        this.recognition.onerror = (e) => {
          if (e.error !== 'no-speech') this.emit({ type: 'error', error: e.error });
        };

        this.recognition.onend = () => {
          if (this.listening) {
            try { this.recognition.start(); } catch {}
          }
        };
      }

      this.available = true;
      this._detectLoop();
    } catch (err) {
      this.available = false;
      this.emit({ type: 'error', error: 'Microphone access denied' });
    }
  }

  // ─── Clap Detection Loop ──────────────────────
  _detectLoop() {
    const buf = new Float32Array(this.analyser.fftSize);

    const tick = () => {
      requestAnimationFrame(tick);
      if (window.speechSynthesis?.speaking) return;  // TTS 중 박수 무시

      this.analyser.getFloatTimeDomainData(buf);
      let sum = 0;
      for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
      const rms = Math.sqrt(sum / buf.length);

      const threshold = this.listening ? CLAP_THRESHOLD_HI : CLAP_THRESHOLD;
      const now = Date.now();

      if (rms > threshold && now - this.lastClapTime > CLAP_DEBOUNCE_MS) {
        this.lastClapTime = now;
        this.clapCount++;
        this.emit({ type: 'clap', count: this.clapCount });

        clearTimeout(this.clapTimer);
        this.clapTimer = setTimeout(() => {
          const count = this.clapCount;
          this.clapCount = 0;
          if (count === 1 && !this.listening)     this.startListening();
          else if (count >= 2 && this.listening)   this.stopAndSend();
          else if (count >= 2 && !this.listening)  this.startListening();
        }, CLAP_WINDOW_MS);
      }
    };
    tick();
  }

  // ─── STT Control ──────────────────────────────
  startListening() {
    if (this.listening || !this.recognition) return;
    this.listening = true;
    this.lastTranscript = '';
    try { this.recognition.start(); } catch {}
    this.emit({ type: 'listening-start' });
  }

  stopAndSend() {
    if (!this.listening) return;
    this.listening = false;
    try { this.recognition.stop(); } catch {}
    this.emit({ type: 'listening-stop', text: this.lastTranscript });
  }

  // ─── TTS ──────────────────────────────────────
  speak(text) {
    if (!text || text.length < 2) return;
    window.speechSynthesis?.cancel();  // 이전 발화 중지

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang  = navigator.language || 'en-US';
    utterance.rate  = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis?.getVoices() || [];
    const lang = utterance.lang.slice(0, 2);
    const voice = voices.find(v => v.lang.startsWith(lang) && v.localService)
                || voices.find(v => v.lang.startsWith(lang));
    if (voice) utterance.voice = voice;

    utterance.onstart = () => this.emit({ type: 'speaking-start' });
    utterance.onend   = () => this.emit({ type: 'speaking-end' });

    window.speechSynthesis?.speak(utterance);
  }
}
