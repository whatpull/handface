/**
 * VoiceController — always-on STT + streaming TTS.
 *
 * · 항상 음성 인식 ON (웨이크워드 불필요)
 * · 말을 멈추면 5초 후 자동 전송
 * · AI가 말하는 동안만 인식 일시 정지
 * · TTS는 문장 단위로 바로바로 읽기 (스트리밍)
 */

const SILENCE_TIMEOUT   = 5000;   // 5초 침묵 → 자동 전송
const MIN_SPEECH_CHARS  = 3;      // 최소 3자 이상이어야 전송 대상

export class VoiceController {
  constructor() {
    this.recognition      = null;
    this.handlers         = new Set();
    this.accumulated      = '';
    this.available        = false;
    this.silenceTimer     = null;
    this.paused           = false;   // TTS 중 일시 정지
    this.hasActiveInput   = false;   // 현재 음성 입력 진행 중
  }

  onEvent(fn) { this.handlers.add(fn); return () => this.handlers.delete(fn); }
  emit(ev)    { for (const fn of this.handlers) fn(ev); }

  get listening() { return this.hasActiveInput; }

  async init() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      this.emit({ type: 'error', error: 'SpeechRecognition not supported' });
      return;
    }

    this.recognition = new SR();
    this.recognition.continuous     = true;
    this.recognition.interimResults = true;
    this.recognition.lang           = navigator.language || 'en-US';

    this.recognition.onresult = (e) => this._onResult(e);

    this.recognition.onerror = (e) => {
      if (e.error !== 'no-speech' && e.error !== 'aborted') {
        this.emit({ type: 'error', error: e.error });
      }
    };

    this.recognition.onend = () => {
      if (!this.paused) {
        setTimeout(() => { try { this.recognition.start(); } catch {} }, 200);
      }
    };

    this.available = true;
    try { this.recognition.start(); } catch {}
    this.emit({ type: 'ready' });
  }

  _onResult(e) {
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const raw     = e.results[i][0].transcript;
      const isFinal = e.results[i].isFinal;

      // 불필요한 선행 구두점 제거 (음성 인식이 가끔 "." 먼저 생성)
      const cleaned = raw.replace(/^[\s.,;:!?。，；：！？]+/, '').trim();
      if (!cleaned) continue;

      if (isFinal) {
        if (cleaned) this.accumulated += (this.accumulated ? ' ' : '') + cleaned;
      }

      // 화면에 실시간 표시
      const display = isFinal
        ? this.accumulated
        : (this.accumulated + (this.accumulated ? ' ' : '') + cleaned);

      if (display.trim()) {
        if (!this.hasActiveInput) {
          this.hasActiveInput = true;
          this.emit({ type: 'listening-start' });
        }
        this.emit({ type: 'transcript', text: display.trim() });
      }

      // 침묵 타이머 리셋 (새 음성이 들어올 때마다)
      clearTimeout(this.silenceTimer);
      if (this.accumulated.trim().length >= MIN_SPEECH_CHARS) {
        this.silenceTimer = setTimeout(() => this._autoSend(), SILENCE_TIMEOUT);
      }
    }
  }

  _autoSend() {
    if (!this.hasActiveInput) return;
    const text = this.accumulated.trim();
    this.accumulated   = '';
    this.hasActiveInput = false;
    clearTimeout(this.silenceTimer);
    this.emit({ type: 'listening-stop', text });
  }

  // 수동 전송 (🎤 버튼)
  manualSend() {
    if (this.hasActiveInput && this.accumulated.trim().length > 0) {
      this._autoSend();
    }
  }

  // ── TTS (문장 단위 스트리밍) ──────────────────
  speakChunk(text) {
    if (!text || text.length < 1 || !window.speechSynthesis) return;
    this._pause();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang  = navigator.language || 'en-US';
    utterance.rate  = 1.05;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices() || [];
    const lang   = utterance.lang.slice(0, 2);
    const voice  = voices.find(v => v.lang.startsWith(lang) && v.localService)
                || voices.find(v => v.lang.startsWith(lang));
    if (voice) utterance.voice = voice;

    utterance.onstart = () => this.emit({ type: 'speaking-start' });
    utterance.onend   = () => {
      // 큐에 더 남아있으면 계속 speaking, 없으면 resume
      if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
        this._resume();
        this.emit({ type: 'speaking-end' });
      }
    };

    window.speechSynthesis.speak(utterance);  // 큐에 추가 (cancel 안 함)
  }

  stopSpeaking() {
    window.speechSynthesis?.cancel();
    this._resume();
  }

  _pause() {
    if (this.paused) return;
    this.paused = true;
    try { this.recognition?.stop(); } catch {}
  }

  _resume() {
    if (!this.paused) return;
    this.paused = false;
    setTimeout(() => { try { this.recognition?.start(); } catch {} }, 300);
  }
}
