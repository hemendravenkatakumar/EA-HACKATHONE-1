import React from 'react'
import { Language } from '../../types/farming'
import { Mic } from 'lucide-react'

interface FloatingAIButtonProps {
  language: Language
  onClick: () => void
}

export const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({ language, onClick }) => {
  const getButtonLabel = (lang: Language) => {
    switch (lang) {
      case 'te':
        return 'AI వాయిస్ సహాయకుడిని అడగండి'
      case 'hi':
        return 'एग्रोवॉयस एआई से पूछें'
      case 'ta':
        return 'அக்ரோவாய்ஸ் AI-யிடம் கேளுங்கள்'
      case 'kn':
        return 'ಅಗ್ರೋವಾಯ್ಸ್ ಎಐ ಕೇಳಿ'
      case 'en':
      default:
        return 'Ask AgroVoice AI'
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        type="button"
        onClick={onClick}
        className="group flex items-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-[#0f766e] via-[#115e59] to-[#042f2e] hover:from-[#134e48] hover:to-[#021f1e] text-white rounded-full shadow-2xl hover:scale-105 transition-all border border-teal-300/40 font-bold text-xs sm:text-sm cursor-pointer"
        title="Speak with AgroVoice AI Assistant"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <Mic className="w-4 h-4 text-teal-200 animate-pulse" />
        </div>
        <span className="hidden sm:inline">{getButtonLabel(language)}</span>
      </button>
    </div>
  )
}
