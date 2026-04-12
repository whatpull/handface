/**
 * VoiceController — wake-word activated STT + TTS.
 *
 * 항상 듣고 있다가:
 *   "시작" / "start"   → 녹음 시작 (active mode)
 *   "보내" / "send"    → 녹음 중지 + 메시지 전송 (idle mode)
 *
 * 브라우저 SpeechRecognition API, 추가 비용 없음.
 */

const WAKE_WORDS = ['시작', 'start', '시작해'];
const SEND_WORDS = ['보내', 'send', '전송', '보내줘', '보내기'];
const AUTO_SEND_TIMEOUT = 30000;   // 30초 동안 보내 안 하면 자동 전송

export class VoiceController {
  constructor() {
    this.mode          = 'idle';   // 'idle' | 'active'
    this.recognition   = null;
    this.handlers      = new Set();
    this.accumulated   = '';
    this.available     = false;
    this.autoTimer     = null;
  }

  onEvent(fn) { this.handlers.add(fn); return () => this.handlers.delete(fn); }
  emit(ev)    { for (const fn of this.handlers) fn(ev); }

  get listening() { return this.mode === 'active'; }

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
      // 항상 재시작 (웨이크워드 대기 유지)
      setTimeout(() => {
        try { this.recognition.start(); } catch {}
      }, 300);
    };

    this.available = true;
    // 즉시 시작 — 항상 듣기 모드
    try { this.recognition.start(); } catch {}
    this.emit({ type: 'wake-ready' });
  }

  _onResult(e) {
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const transcript = e.results[i][0].transcript.trim();
      const isFinal    = e.results[i].isFinal;
      const lower      = transcript.toLowerCase();

      if (this.mode === 'idle') {
        // ── 웨이크워드 감지 ──
        if (WAKE_WORDS.some(w => lower.includes(w))) {
          this.mode = 'active';
          this.accumulated = '';
          clearTimeout(this.autoTimer);
          this.autoTimer = setTimeout(() => this._autoSend(), AUTO_SEND_TIMEOUT);
          this.emit({ type: 'listening-start' });
        }
      } else {
        // ── 활성 모드: 텍스트 수집 + 보내기 감지 ──
        const hasSend = SEND_WORDS.some(w => lower.includes(w));

        if (hasSend) {
          // "보내" 키워드를 텍스트에서 제거
          let msg = transcript;
          for (const w of SEND_WORDS) {
            msg = msg.replace(new RegExp(w, 'gi'), '');
          }
          // 웨이크워드도 제거
          for (const w of WAKE_WORDS) {
            msg = msg.replace(new RegExp(w, 'gi'), '');
          }
          if (msg.trim()) this.accumulated += ' ' + msg.trim();
          this._doSend();
        } else if (isFinal) {
          // 확정된 결과 누적 (웨이크워드 제거)
          let msg = transcript;
          for (const w of WAKE_WORDS) {
            msg = msg.replace(new RegExp(w, 'gi'), '');
          }
          if (msg.trim()) this.accumulated += ' ' + msg.trim();
          this.emit({ type: 'transcript', text: this.accumulated.trim() });
        } else {
          // 임시 결과: 현재까지 + interim 표시
          let msg = transcript;
          for (const w of [...WAKE_WORDS, ...SEND_WORDS]) {
            msg = msg.replace(new RegExp(w, 'gi'), '');
          }
          this.emit({ type: 'transcript', text: (this.accumulated + ' ' + msg).trim() });
        }
      }
    }
  }

  _doSend() {
    clearTimeout(this.autoTimer);
    const text = this.accumulated.trim();
    this.mode = 'idle';
    this.accumulated = '';
    this.emit({ type: 'listening-stop', text });
  }

  _autoSend() {
    if (this.mode === 'active') this._doSend();
  }

  // 수동 토글 (🎤 버튼용)
  startListening() {
    if (this.mode === 'active') return;
    this.mode = 'active';
    this.accumulated = '';
    clearTimeout(this.autoTimer);
    this.autoTimer = setTimeout(() => this._autoSend(), AUTO_SEND_TIMEOUT);
    this.emit({ type: 'listening-start' });
  }

  stopAndSend() {
    if (this.mode !== 'active') return;
    this._doSend();
  }

  // TTS
  speak(text) {
    if (!text || text.length < 2 || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang  = navigator.language || 'en-US';
    utterance.rate  = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices() || [];
    const lang   = utterance.lang.slice(0, 2);
    const voice  = voices.find(v => v.lang.startsWith(lang) && v.localService)
                || voices.find(v => v.lang.startsWith(lang));
    if (voice) utterance.voice = voice;

    utterance.onstart = () => this.emit({ type: 'speaking-start' });
    utterance.onend   = () => this.emit({ type: 'speaking-end' });

    window.speechSynthesis.speak(utterance);
  }
}
