import { Language } from '../types/farming'

export const LANG_CODE_MAP: Record<Language, string> = {
  en: 'en-IN',
  te: 'te-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  kn: 'kn-IN'
}

let cachedVoices: SpeechSynthesisVoice[] = []

if (typeof window !== 'undefined' && window.speechSynthesis) {
  const updateVoices = () => {
    try {
      cachedVoices = window.speechSynthesis.getVoices()
    } catch (_e) {}
  }
  updateVoices()
  window.speechSynthesis.onvoiceschanged = updateVoices
}

export function findVoiceForLang(lang: Language): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null
  if (!cachedVoices || cachedVoices.length === 0) {
    try {
      cachedVoices = window.speechSynthesis.getVoices()
    } catch (_e) {}
  }

  const targetCode = (LANG_CODE_MAP[lang] || 'en-IN').toLowerCase()
  const prefix = targetCode.split('-')[0]

  const exact = cachedVoices.find((v) => v.lang.toLowerCase().replace('_', '-') === targetCode)
  if (exact) return exact

  const prefixMatch = cachedVoices.find((v) => v.lang.toLowerCase().startsWith(prefix))
  if (prefixMatch) return prefixMatch

  const langKeywords: Record<Language, string[]> = {
    te: ['telugu', 'te-in', 'mohan', 'shruti', 'chitra'],
    hi: ['hindi', 'hi-in', 'madhur', 'swara', 'kalpana', 'hemant'],
    ta: ['tamil', 'ta-in', 'pallavi', 'valluvar'],
    kn: ['kannada', 'kn-in', 'gagan', 'sapna'],
    en: ['india', 'en-in', 'neerja', 'prabhat', 'ravi', 'heera']
  }

  const keywords = langKeywords[lang] || []
  const nameMatch = cachedVoices.find((v) => {
    const vName = v.name.toLowerCase()
    return keywords.some((k) => vName.includes(k))
  })
  if (nameMatch) return nameMatch

  return null
}
