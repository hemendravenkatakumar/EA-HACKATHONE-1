import React, { useState, useRef, useEffect } from 'react'
import { Language } from '../../types/farming'
import { Globe, ChevronDown, Check } from 'lucide-react'

interface LanguageToggleProps {
  language: Language
  onToggle: (lang: Language) => void
  variant?: 'light' | 'dark'
}

export const LANGUAGES_LIST: { id: Language; label: string; nativeName: string; region: string }[] = [
  { id: 'en', label: 'English', nativeName: 'English', region: 'All India' },
  { id: 'te', label: 'Telugu', nativeName: 'తెలుగు', region: 'AP & Telangana' },
  { id: 'hi', label: 'Hindi', nativeName: 'हिन्दी', region: 'North & Central' },
  { id: 'ta', label: 'Tamil', nativeName: 'தமிழ்', region: 'Tamil Nadu' },
  { id: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ', region: 'Karnataka' }
]

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  language,
  onToggle,
  variant = 'light'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const activeLang = LANGUAGES_LIST.find((l) => l.id === language) || LANGUAGES_LIST[0]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-2xs ${
          variant === 'dark'
            ? 'bg-emerald-950/80 border-emerald-700/60 text-white hover:bg-emerald-900'
            : 'bg-white border-[#d2dfd8] text-[#154634] hover:bg-[#f6faf8]'
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        title="Select Language (5 Languages Supported)"
      >
        <Globe className="w-3.5 h-3.5 text-[#1b6b43] shrink-0" />
        <span className="font-extrabold">{activeLang.nativeName}</span>
        <span className="hidden sm:inline text-[11px] text-stone-500 font-medium">({activeLang.label})</span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-56 rounded-2xl bg-white shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-stone-100 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
            Choose Preferred Language (5 భాషలు)
          </div>
          {LANGUAGES_LIST.map((lang) => {
            const isSelected = language === lang.id
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => {
                  onToggle(lang.id)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors text-left ${
                  isSelected
                    ? 'bg-[#edf7f1] text-[#124d31] font-bold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <div>
                  <div className="font-bold text-sm leading-tight">{lang.nativeName}</div>
                  <div className="text-[10px] text-stone-500">{lang.label} • {lang.region}</div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#1b6b43] shrink-0" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
