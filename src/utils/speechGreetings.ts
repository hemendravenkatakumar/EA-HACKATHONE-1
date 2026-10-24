import { Language } from '../types/farming'

export function getAssistantGreeting(lang: Language): string {
  switch (lang) {
    case 'te':
      return 'నమస్కారం! నేను మీకు ఎలా సహాయపడగలను సర్ లేదా మేడమ్? మీరు మాట్లాడవచ్చు లేదా టైప్ చేయవచ్చు.'
    case 'hi':
      return 'नमस्ते! मैं आपकी किस प्रकार सहायता कर सकता हूँ, सर या मैडम? आप बोलकर या लिखकर पूछ सकते हैं।'
    case 'ta':
      return 'வணக்கம்! நான் உங்களுக்கு எவ்வாறு உதவ முடியும் ஐயா அல்லது அம்மா? நீங்கள் பேசலாம் அல்லது தட்டச்சு செய்யலாம்.'
    case 'kn':
      return 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ ಸರ್ ಅಥವಾ ಮೇಡಂ? ನೀವು ಮಾತನಾಡಬಹುದು ಅಥವಾ ಟೈಪ್ ಮಾಡಬಹುದು.'
    case 'en':
    default:
      return 'Hello! How can I help you today, sir or madam? You can speak with me or type your question.'
  }
}
