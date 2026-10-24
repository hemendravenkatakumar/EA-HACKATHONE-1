import React, { useState } from 'react'
import { Language } from '../../types/farming'
import { SpeechService } from '../../utils/speech'
import { VoiceVisualizer } from '../common/VoiceVisualizer'
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Bot,
  Play,
  RotateCcw
} from 'lucide-react'

interface VoicePreviewCardProps {
  language: Language
  onOpenDemo: (type: 'crop' | 'fish') => void
}

export const VoicePreviewCard: React.FC<VoicePreviewCardProps> = ({
  language,
  onOpenDemo
}) => {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [activePrompt, setActivePrompt] = useState<string>(
    language === 'te'
      ? 'వరి ఆకులు పసుపు రంగులోకి మారితే ఎలాంటి ఎరువు వాడాలి?'
      : 'Why are my rice leaf tips turning yellow?'
  )
  const [simulatedResponse, setSimulatedResponse] = useState<string>(
    language === 'te'
      ? 'ఆగ్రోవాయిస్ AI సమాధానం: వరి ఆకుల చివర్లు పసుపుగా మారితే నత్రజని లేదా జింక్ లోపం కావచ్చు. ఎకరాకు 25 కిలోల యూరియాతో పాటు 10 కిలోల జింక్ సల్ఫేట్ పైపాటుగా చల్లండి.'
      : 'AgroVoice AI Response: Yellowing of rice leaves typically indicates nitrogen or zinc deficiency. Recommended: Top-dress with 25 kg Urea + 10 kg Zinc Sulphate per acre.'
  )

  const sampleVoicePrompts = language === 'te'
    ? [
        'వరి ఆకులు పసుపు రంగులోకి మారితే ఏం చేయాలి?',
        'చెరువులో అమ్మోనియా పెరిగితే ఎలాంటి చర్యలు తీసుకోవాలి?',
        'పీఎం కిసాన్ పథకం ఈ-కేవైసీ ఎలా చేసుకోవాలి?'
      ]
    : [
        'Why are my rice leaf tips turning yellow?',
        'How can I lower toxic ammonia in fish ponds?',
        'What documents are needed for PM-KISAN subsidy?'
      ]

  const handleMicClick = () => {
    if (isListening) {
      setIsListening(false)
    } else {
      setIsListening(true)
      setIsSpeaking(false)
      SpeechService.stopSpeech()

      setTimeout(() => {
        setIsListening(false)
        setIsSpeaking(true)
        SpeechService.speak(simulatedResponse, language, () => {
          setIsSpeaking(false)
        })
      }, 2500)
    }
  }

  const handleSelectPrompt = (prompt: string) => {
    setActivePrompt(prompt)
    SpeechService.stopSpeech()
    setIsSpeaking(false)

    let resp = ''
    if (prompt.includes('ammonia') || prompt.includes('అమ్మోనియా') || prompt.includes('చెరువు')) {
      resp = language === 'te'
        ? 'ఆక్వా సలహా: చెరువులో అమ్మోనియా 0.05 కంటే పెరిగితే మేతను 30% తగ్గించి, ఎకరాకు 50 కిలోల వ్యవసాయ సున్నం చల్లండి.'
        : 'Aquaculture Tip: For ammonia above 0.05 ppm, reduce feed ration by 30% and broadcast agricultural limestone.'
    } else if (prompt.includes('PM-KISAN') || prompt.includes('కిసాన్')) {
      resp = language === 'te'
        ? 'పథకం సమాచారం: పీఎం కిసాన్ కోసం ఆధార్ నంబర్, పట్టాదార్ పాస్‌బుక్ మరియు బ్యాంక్ ఖాతా వివరాలు అవసరం.'
        : 'Scheme Info: PM-KISAN requires your Aadhaar linked mobile, Pattadar passbook RoR-1B, and bank IFSC details.'
    } else {
      resp = language === 'te'
        ? 'ఆగ్రోవాయిస్ AI సమాధానం: వరి ఆకుల చివర్లు పసుపుగా మారితే నత్రజని లేదా జింక్ లోపం కావచ్చు. ఎకరాకు 25 కిలోల యూరియాతో పాటు 10 కిలోల జింక్ సల్ఫేట్ పైపాటుగా చల్లండి.'
        : 'AgroVoice AI Response: Yellowing of rice leaves typically indicates nitrogen or zinc deficiency. Recommended: Top-dress with 25 kg Urea + 10 kg Zinc Sulphate per acre.'
    }
    setSimulatedResponse(resp)
  }

  const handlePlayVoice = () => {
    setIsSpeaking(true)
    SpeechService.speak(simulatedResponse, language, () => {
      setIsSpeaking(false)
    })
  }

  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-emerald-950 via-teal-950 to-emerald-950 text-white p-6 sm:p-7 border border-emerald-800/80 shadow-2xl overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-5">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/30">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Interactive Voice Preview
              </span>
              <span className="block text-[10px] text-emerald-400/70">Telugu & English Dual Engine</span>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-emerald-200 border border-white/20">
            Live Speech Synth
          </span>
        </div>

        {/* Central Voice Orb & Mic Action */}
        <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
          {/* Animated Mic Ring */}
          <div className="relative flex items-center justify-center shrink-0">
            <button
              type="button"
              onClick={handleMicClick}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all shadow-xl hover:scale-105 ${
                isListening
                  ? 'bg-red-500 animate-pulse ring-8 ring-red-500/30 shadow-red-500/50'
                  : 'bg-gradient-to-tr from-emerald-600 to-teal-500 ring-4 ring-emerald-500/30 hover:ring-emerald-400/50'
              }`}
              title="Tap to preview microphone voice input"
              aria-label="Microphone Voice Test"
            >
              {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wide text-emerald-300">
                {isListening
                  ? 'Listening in ' + (language === 'te' ? 'Telugu...' : 'English...')
                  : isSpeaking
                  ? 'AgroVoice is Speaking...'
                  : 'Tap Microphone to Speak'}
              </span>
              {(isListening || isSpeaking) && (
                <VoiceVisualizer active={true} color="emerald" bars={5} />
              )}
            </div>
            <p className="text-xs text-emerald-100 font-medium">"{activePrompt}"</p>
            <span className="block text-[10px] text-emerald-400/60">
              Or tap any suggested voice query below
            </span>
          </div>
        </div>

        {/* Quick Sample Voice Prompts */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-emerald-300/80 uppercase tracking-wider block">
            Try Sample Voice Queries:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleVoicePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPrompt(p)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                  activePrompt === p
                    ? 'bg-emerald-500 text-emerald-950 font-bold shadow-xs'
                    : 'bg-white/10 hover:bg-white/20 text-emerald-200 border border-white/10'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Simulated Response Box */}
        <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 text-xs text-emerald-100 space-y-2">
          <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
            <span>Simulated Spoken Answer</span>
            <button
              type="button"
              onClick={handlePlayVoice}
              className="hover:text-white flex items-center gap-1 font-semibold text-emerald-300"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Read Aloud</span>
            </button>
          </div>
          <p className="leading-relaxed text-xs sm:text-sm text-white/95">
            {simulatedResponse}
          </p>
          <div className="text-[10px] text-emerald-400/60 pt-1 border-t border-white/10">
            * Prototype Preview: Connects to natural text-to-speech in supported browsers.
          </div>
        </div>
      </div>
    </div>
  )
}
