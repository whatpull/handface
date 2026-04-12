/**
 * VoiceController — STT + TTS only.
 *
 * 박수 감지는 MediaPipe (HandControl 'clap' 이벤트)에서 처리.
 * 이 모듈은 음성 인식/합성만 담당.
 */

export class VoiceController {
  constructor() {
    this.listening     = false;
    this.recognition   = null;
    this.handlers      = new Set();
    this.lastTranscript = '';
    this.available     = false;
  }

  onEvent(fn) { this.handlers.add(fn); return () => this.handlers.delete(fn); }
  emit(ev)    { for (const fn of this.handlers) fn(ev); }

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
      if (e.error !== 'no-speech' && e.error !== 'aborted') {
        this.emit({ type: 'error', error: e.error });
      }
    };

    this.recognition.onend = () => {
      if (this.listening) {
        try { this.recognition.start(); } catch {}
      }
    };

    this.available = true;
  }

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
