import { Language } from '../types/farming'
import { LANG_CODE_MAP, findVoiceForLang } from './speechVoices'

export class SpeechService {
  private recognition: any = null
  private isListening: boolean = false
  private onResultCallback: ((text: string) => void) | null = null
  private onEndCallback: (() => void) | null = null
  private static activeAudio: HTMLAudioElement | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        try {
          this.recognition = new SpeechRecognition()
          this.recognition.continuous = false
          this.recognition.interimResults = true
          this.recognition.lang = 'en-IN'

          this.recognition.onresult = (event: any) => {
            let current = ''
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              current += event.results[i][0].transcript
            }
            if (this.onResultCallback) this.onResultCallback(current)
          }

          this.recognition.onerror = () => {
            this.isListening = false
            if (this.onEndCallback) this.onEndCallback()
          }

          this.recognition.onend = () => {
            this.isListening = false
            if (this.onEndCallback) this.onEndCallback()
          }
        } catch (_e) {
          this.recognition = null
        }
      }
    }
  }

  public isSupported(): boolean {
    return !!this.recognition
  }

  public startListening(lang: Language, onResult: (text: string) => void, onEnd: () => void): boolean {
    this.onResultCallback = onResult
    this.onEndCallback = onEnd
    const langCode = LANG_CODE_MAP[lang] || 'en-IN'

    if (this.recognition) {
      try {
        this.recognition.lang = langCode
        this.recognition.start()
        this.isListening = true
        return true
      } catch (_err) {
        this.simulateListening(lang, onResult, onEnd)
        return false
      }
    } else {
      this.simulateListening(lang, onResult, onEnd)
      return false
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop()
      } catch (_e) {}
    }
    this.isListening = false
  }

  private simulateListening(lang: Language, onResult: (text: string) => void, onEnd: () => void) {
    const samples: Record<Language, string[]> = {
      en: ['Why are my paddy leaves turning yellow?', 'Check weather advisory.'],
      te: ['వరి ఆకులు ఎందుకు పసుపు రంగులోకి మారుతున్నాయి?', 'వాతావరణ సలహా చూపించు.'],
      hi: ['धान की पत्तियां पीली क्यों पड़ रही हैं?', 'मौसम सलाह क्या है?'],
      ta: ['நெல் இலைகள் ஏன் மஞ்சள் நிறமாக மாறுகின்றன?', 'வானிலை ஆலோசனை.'],
      kn: ['ಭತ್ತದ ಎಲೆಗಳು ಏಕೆ ಹಳದಿಯಾಗುತ್ತಿವೆ?', 'ಹವಾಮಾನ ಸಲಹೆ.']
    }
    const pool = samples[lang] || samples.en
    const sample = pool[Math.floor(Math.random() * pool.length)]
    let idx = 0
    const interval = setInterval(() => {
      idx += 4
      if (idx >= sample.length) {
        clearInterval(interval)
        onResult(sample)
        setTimeout(() => onEnd(), 500)
      } else {
        onResult(sample.slice(0, idx))
      }
    }, 100)
  }

  public static speak(text: string, lang: Language = 'en', onEnd?: () => void): boolean {
    if (typeof window === 'undefined') {
      if (onEnd) onEnd()
      return false
    }
    this.stopSpeech()
    const cleanText = text.replace(/[*#_`~[\]()]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 320)
    if (!cleanText) {
      if (onEnd) onEnd()
      return false
    }

    try {
      const endpoint = `/api/assistant/tts/?lang=${encodeURIComponent(lang)}&text=${encodeURIComponent(cleanText)}`
      const audio = new Audio(endpoint)
      this.activeAudio = audio
      audio.onended = () => {
        this.activeAudio = null
        if (onEnd) onEnd()
      }
      audio.onerror = () => {
        this.activeAudio = null
        this.speakBrowserFallback(cleanText, lang, onEnd)
      }
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => this.speakBrowserFallback(cleanText, lang, onEnd))
      }
      return true
    } catch (_err) {
      return this.speakBrowserFallback(cleanText, lang, onEnd)
    }
  }

  private static speakBrowserFallback(cleanText: string, lang: Language, onEnd?: () => void): boolean {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      if (onEnd) onEnd()
      return false
    }
    try {
      const utterance = new SpeechSynthesisUtterance(cleanText)
      const voice = findVoiceForLang(lang)
      if (voice) utterance.voice = voice
      utterance.lang = voice?.lang || LANG_CODE_MAP[lang] || 'en-IN'
      utterance.rate = 0.95
      if (onEnd) {
        utterance.onend = onEnd
        utterance.onerror = onEnd
      }
      window.speechSynthesis.speak(utterance)
      return true
    } catch (_e) {
      if (onEnd) onEnd()
      return false
    }
  }

  public static pauseSpeech(): void {
    if (this.activeAudio) this.activeAudio.pause()
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.pause()
  }

  public static resumeSpeech(): void {
    if (this.activeAudio) this.activeAudio.play().catch(() => {})
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.resume()
  }

  public static stopSpeech(): void {
    if (this.activeAudio) {
      this.activeAudio.pause()
      this.activeAudio = null
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel()
      } catch (_e) {}
    }
  }
}
