import React, { useState, useEffect, useRef } from 'react'
import { Language, FarmType, ChatMessage } from '../../types/farming'
import { SpeechService, getAssistantGreeting } from '../../utils/speech'
import { getSimulatedAIResponse } from '../../utils/calculators'
import { AgroVoiceAPI } from '../../services/api'
import { VoiceVisualizer } from '../common/VoiceVisualizer'
import { LANGUAGES_LIST } from '../common/LanguageToggle'
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  RotateCcw,
  Pause,
  Play,
  Bot,
  User,
  X,
  Wheat,
  Fish,
  Sparkles,
  Globe,
  Radio,
  ArrowRight
} from 'lucide-react'

interface FloatingVoiceModalProps {
  isOpen: boolean
  onClose: () => void
  language: Language
  onLanguageChange: (lang: Language) => void
  farmType?: FarmType
  onSwitchFarmType?: (type: FarmType) => void
  onNavigateTab?: (tab: string) => void
}

export const FloatingVoiceModal: React.FC<FloatingVoiceModalProps> = ({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  farmType: initialFarmType = 'crop',
  onSwitchFarmType,
  onNavigateTab
}) => {
  const [farmType, setFarmType] = useState<FarmType>(initialFarmType)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [speakingText, setSpeakingText] = useState('')
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const [sessionId, setSessionId] = useState<string | undefined>(undefined)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const speechServiceRef = useRef<SpeechService | null>(null)
  const hasSpokenGreetingRef = useRef(false)

  // Initialize Speech Service
  useEffect(() => {
    speechServiceRef.current = new SpeechService()
    return () => {
      SpeechService.stopSpeech()
    }
  }, [])

  // Auto-speak greeting when modal opens
  useEffect(() => {
    if (isOpen) {
      const greeting = getAssistantGreeting(language)
      const greetingMsg: ChatMessage = {
        id: 'greet-' + Date.now(),
        sender: 'assistant',
        text: greeting,
        timestamp: 'Just now',
        language
      }
      setMessages([greetingMsg])

      // Speak aloud immediately as requested: "how can i help you sir or madam"
      setSpeakingText(greeting)
      setIsSpeaking(true)
      setIsPaused(false)
      SpeechService.speak(greeting, language, () => {
        setIsSpeaking(false)
        setIsPaused(false)
      })
      hasSpokenGreetingRef.current = true
    } else {
      SpeechService.stopSpeech()
      setIsSpeaking(false)
      setIsListening(false)
    }
  }, [isOpen, language])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isListening, isSpeaking])

  if (!isOpen) return null

  // Language suggestions
  const quickQuestions: Record<Language, { crop: string[]; fish: string[] }> = {
    en: {
      crop: [
        'Why are my paddy leaves turning yellow?',
        'How should I manage irrigation before rain?',
        'What government schemes may apply to me?'
      ],
      fish: [
        'Why are fish piping or gasping at the pond surface?',
        'How to test dissolved oxygen and ammonia?',
        'What is the daily feeding ration for Rohu?'
      ]
    },
    te: {
      crop: [
        'వరి ఆకులు పసుపు రంగులోకి ఎందుకు మారుతున్నాయి?',
        'రేపు వర్షం పడితే నీటిపారుదల ఎలా చేయాలి?',
        'పీఎం కిసాన్ మరియు రైతు భరోసా ఎలా దరఖాస్తు చేసుకోవాలి?'
      ],
      fish: [
        'చేపలు తెల్లవారుజామున నీటిపైకి ఎందుకు తేలుతున్నాయి?',
        'చెరువులో అమ్మోనియా మరియు ఆక్సిజన్ ఎలా సరిచేయాలి?',
        'రోహు చేపలకు రోజువారీ మేత ఎంత వేయాలి?'
      ]
    },
    hi: {
      crop: [
        'मेरी धान की पत्तियां पीली क्यों पड़ रही हैं?',
        'बारिश से पहले सिंचाई कैसे प्रबंधित करें?',
        'पीएम किसान और सरकारी सब्सिडी के क्या नियम हैं?'
      ],
      fish: [
        'मछलियां सुबह पानी की सतह पर क्यों आ रही हैं?',
        'तालाब में ऑक्सीजन और अमोनिया कैसे ठीक करें?',
        'रोहू मछली को प्रतिदिन कितना चारा देना चाहिए?'
      ]
    },
    ta: {
      crop: [
        'நெல் இலைகள் ஏன் மஞ்சள் நிறமாக மாறுகின்றன?',
        'மழைக்கு முன் பாசனத்தை எவ்வாறு நிர்வகிக்க வேண்டும்?',
        'பிரதமர் கிசான் மானியத்திற்கு எவ்வாறு விண்ணப்பிப்பது?'
      ],
      fish: [
        'மீன்கள் அதிகாலையில் நீர்மட்டத்தில் ஏன் சுவாசிக்கின்றன?',
        'குளத்தில் ஆக்ஸிஜன் மற்றும் அம்மோனியாவை எவ்வாறு சரிசெய்வது?',
        'ரோகு மீன்களுக்கு தினசரி தீவன அளவு என்ன?'
      ]
    },
    kn: {
      crop: [
        'ನನ್ನ ಭತ್ತದ ಎಲೆಗಳು ಏಕೆ ಹಳದಿಯಾಗುತ್ತಿವೆ?',
        'ಮಳೆಗೆ ಮುಂಚಿತವಾಗಿ ನೀರಾವರಿಯನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸಬೇಕು?',
        'ಪಿಎಂ ಕಿಸಾನ್ ಮತ್ತು ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿಗಳಿಗೆ ಹೇಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು?'
      ],
      fish: [
        'ಮುಂಜಾನೆ ಮೀನುಗಳು ನೀರಿನ ಮೇಲ್ಮೈಗೆ ಏಕೆ ಬರುತ್ತಿವೆ?',
        'ಕೊಳದಲ್ಲಿ ಆಮ್ಲಜನಕ ಮತ್ತು ಅಮೋನಿಯಾವನ್ನು ಹೇಗೆ ಪರೀಕ್ಷಿಸುವುದು?',
        'ರೋಹು ಮೀನುಗಳಿಗೆ ದೈನಂದಿನ ಆಹಾರದ ಪ್ರಮಾಣ ಎಷ್ಟು?'
      ]
    }
  }

  const currentQuestions = quickQuestions[language]?.[farmType] || quickQuestions.en.crop

  const handleSend = async (text: string) => {
    if (!text.trim()) return

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now',
      language
    }

    setMessages((prev) => [...prev, userMsg])
    setInputText('')

    try {
      // Call Django REST Framework backend API
      const apiResult = await AgroVoiceAPI.sendChatMessage(text, farmType, language, sessionId)
      if (apiResult.session_id) setSessionId(apiResult.session_id)

      const answerText = apiResult.assistant_message.text
      const route = apiResult.suggested_route

      const assistantMsg: ChatMessage = {
        id: 'ai-' + apiResult.assistant_message.id,
        sender: 'assistant',
        text: answerText,
        timestamp: 'Just now',
        language,
        suggestedAction: route
          ? {
              label:
                language === 'te'
                  ? 'సంబంధిత విభాగాన్ని తెరవండి'
                  : language === 'hi'
                  ? 'संबंधित मॉड्यूल खोलें'
                  : language === 'ta'
                  ? 'தொடர்புடைய பிரிவைத் திறக்கவும்'
                  : language === 'kn'
                  ? 'ಸಂಬಂಧಿತ ಮಾಡ್ಯೂಲ್ ತೆರೆಯಿರಿ'
                  : 'Open Relevant Module',
              route: route
            }
          : undefined
      }

      setMessages((prev) => [...prev, assistantMsg])

      // Auto-speak response aloud to the user
      setSpeakingText(answerText)
      setIsSpeaking(true)
      setIsPaused(false)
      SpeechService.speak(answerText, language, () => {
        setIsSpeaking(false)
        setIsPaused(false)
      })
    } catch (_err) {
      // Graceful offline fallback
      const response = getSimulatedAIResponse(text, farmType, language)
      const assistantMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'assistant',
        text: response.answer,
        timestamp: 'Just now',
        language,
        suggestedAction: response.route
          ? {
              label:
                language === 'te'
                  ? 'సంబంధిత విభాగాన్ని తెరవండి'
                  : 'Open Relevant Module',
              route: response.route
            }
          : undefined
      }

      setMessages((prev) => [...prev, assistantMsg])
      setSpeakingText(response.answer)
      setIsSpeaking(true)
      setIsPaused(false)
      SpeechService.speak(response.answer, language, () => {
        setIsSpeaking(false)
        setIsPaused(false)
      })
    }
  }

  const toggleListening = () => {
    if (isListening) {
      speechServiceRef.current?.stopListening()
      setIsListening(false)
    } else {
      SpeechService.stopSpeech()
      setIsSpeaking(false)
      setIsListening(true)

      speechServiceRef.current?.startListening(
        language,
        (transcript) => {
          setInputText(transcript)
        },
        () => {
          setIsListening(false)
          if (inputText.trim()) {
            handleSend(inputText)
          }
        }
      )
    }
  }

  const handleReplayGreeting = () => {
    const greeting = getAssistantGreeting(language)
    setSpeakingText(greeting)
    setIsSpeaking(true)
    setIsPaused(false)
    SpeechService.speak(greeting, language, () => {
      setIsSpeaking(false)
      setIsPaused(false)
    })
  }

  const handlePauseResume = () => {
    if (isPaused) {
      SpeechService.resumeSpeech()
      setIsPaused(false)
    } else {
      SpeechService.pauseSpeech()
      setIsPaused(true)
    }
  }

  const handleStopAudio = () => {
    SpeechService.stopSpeech()
    setIsSpeaking(false)
    setIsPaused(false)
    setSpeakingText('')
  }

  const activeLangObj = LANGUAGES_LIST.find((l) => l.id === language) || LANGUAGES_LIST[0]

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full sm:w-[480px] sm:max-h-[85vh] h-[92vh] sm:h-auto rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-250">
        
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-stone-200 bg-[#f9fcfa] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0f766e] text-white flex items-center justify-center shadow-xs">
              <Bot className="w-6 h-6 text-teal-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-extrabold text-sm sm:text-base text-[#113a29] leading-tight">
                  AgroVoice AI Assistant
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[11px] text-stone-500 font-medium">
                Voice & Text Companion for Indian Farmers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* 5-Language Selector in Modal */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-stone-200 bg-white text-stone-700 text-xs font-bold hover:bg-stone-50 transition-colors shadow-2xs"
                title="Select language (5 supported)"
              >
                <Globe className="w-3.5 h-3.5 text-[#1b6b43]" />
                <span>{activeLangObj.nativeName}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-44 rounded-2xl bg-white shadow-xl border border-stone-200 py-1 z-50">
                  {LANGUAGES_LIST.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => {
                        onLanguageChange(l.id)
                        setLangDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-bold transition-colors ${
                        language === l.id
                          ? 'bg-[#edf6f0] text-[#134e32]'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div>{l.nativeName}</div>
                      <div className="text-[10px] text-stone-400 font-normal">{l.label}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors"
              aria-label="Close assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Farm Type Selector Pill */}
        <div className="px-5 py-2.5 bg-white border-b border-stone-100 flex items-center justify-between text-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
            Farm Topic:
          </span>
          <div className="inline-flex rounded-xl bg-stone-100 p-0.5 border border-stone-200 font-bold">
            <button
              type="button"
              onClick={() => {
                setFarmType('crop')
                if (onSwitchFarmType) onSwitchFarmType('crop')
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                farmType === 'crop'
                  ? 'bg-white text-[#1b6b43] shadow-2xs font-extrabold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Wheat className="w-3.5 h-3.5" />
              <span>Crop Agriculture</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setFarmType('fish')
                if (onSwitchFarmType) onSwitchFarmType('fish')
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                farmType === 'fish'
                  ? 'bg-white text-[#0f766e] shadow-2xs font-extrabold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Fish className="w-3.5 h-3.5" />
              <span>Aquaculture (Fish)</span>
            </button>
          </div>
        </div>

        {/* Live Audio Status Strip (when speaking) */}
        {isSpeaking && (
          <div className="px-4 py-2 bg-[#f0f8f4] border-b border-[#cde5d7] flex items-center justify-between text-xs text-[#134e32] animate-in fade-in">
            <div className="flex items-center gap-2 overflow-hidden">
              <Radio className="w-4 h-4 text-emerald-600 animate-pulse shrink-0" />
              <span className="font-bold truncate">
                AI Speaking: &ldquo;{(speakingText || '').slice(0, 50)}...&rdquo;
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handlePauseResume}
                className="p-1 text-emerald-800 hover:bg-emerald-100 rounded-lg transition-colors"
                title={isPaused ? 'Resume Speech' : 'Pause Speech'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={handleStopAudio}
                className="p-1 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Stop Audio"
              >
                <VolumeX className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Chat Stream Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fafcfb]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 max-w-[90%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-[#1b6b43] text-white shadow-xs'
                    : 'bg-[#eef7f2] text-[#1b6b43] border border-[#cbe4d5]'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-[#145334] text-white rounded-tr-none'
                    : 'bg-white border border-[#e2ece5] text-stone-800 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {msg.suggestedAction && onNavigateTab && (
                  <button
                    type="button"
                    onClick={() => {
                      onNavigateTab(msg.suggestedAction!.route)
                      onClose()
                    }}
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#edf6f0] hover:bg-[#dbeee1] border border-[#c2e2ce] text-[#134d31] rounded-xl text-xs font-bold transition-colors"
                  >
                    <span>{msg.suggestedAction.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <div className="flex items-center justify-between gap-3 mt-2 text-[10px] opacity-70">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'assistant' && (
                    <button
                      type="button"
                      onClick={() => {
                        setSpeakingText(msg.text)
                        setIsSpeaking(true)
                        setIsPaused(false)
                        SpeechService.speak(msg.text, language, () => {
                          setIsSpeaking(false)
                          setIsPaused(false)
                        })
                      }}
                      className="hover:text-emerald-700 flex items-center gap-1 font-bold"
                      title="Speak this response aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Speak</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Listening State Banner */}
          {isListening && (
            <div className="p-3 bg-[#e8f6ed] border border-[#bde5cb] rounded-2xl flex items-center gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-xl bg-[#1b6b43] text-white flex items-center justify-center">
                <Mic className="w-4 h-4 animate-bounce" />
              </div>
              <div className="flex-1 min-w-0">
                <strong className="block text-xs text-[#134e32]">Listening to your voice...</strong>
                <span className="text-[11px] text-stone-600 block truncate">
                  {inputText || 'Please speak your question in Telugu, English, Hindi, Tamil, or Kannada'}
                </span>
              </div>
              <VoiceVisualizer active={isListening} />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        <div className="px-4 py-2 bg-white border-t border-stone-100 overflow-x-auto no-scrollbar flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider whitespace-nowrap">
            Try:
          </span>
          {currentQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q)}
              className="text-left text-xs bg-[#f4f8f5] hover:bg-[#e8f4ec] border border-[#d8eae0] text-[#164a34] px-2.5 py-1 rounded-xl whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Bottom Input & Voice Controls */}
        <div className="p-4 bg-white border-t border-stone-200 space-y-2.5">
          <div className="flex items-center gap-2">
            {/* Big Voice Button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-3 rounded-2xl transition-all shadow-xs flex items-center justify-center shrink-0 ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse ring-4 ring-red-200'
                  : 'bg-[#1b6b43] hover:bg-[#124b2f] text-white'
              }`}
              title={isListening ? 'Stop Listening' : 'Speak to AI'}
              aria-label="Microphone"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Text Input Box */}
            <div className="relative flex-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend(inputText)
                }}
                placeholder={
                  language === 'te'
                    ? 'ఇక్కడ మాట్లాడండి లేదా టైప్ చేయండి...'
                    : language === 'hi'
                    ? 'यहाँ बोलें या प्रश्न टाइप करें...'
                    : language === 'ta'
                    ? 'இங்கே பேசவும் அல்லது தட்டச்சு செய்யவும்...'
                    : language === 'kn'
                    ? 'ಇಲ್ಲಿ ಮಾತನಾಡಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ...'
                    : 'Speak or type your farming question...'
                }
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:bg-white focus:border-[#1b6b43] focus:outline-hidden"
              />
            </div>

            {/* Send Button */}
            <button
              type="button"
              onClick={() => handleSend(inputText)}
              disabled={!inputText.trim()}
              className="p-2.5 rounded-2xl bg-[#1b6b43] hover:bg-[#124b2f] disabled:bg-stone-200 disabled:text-stone-400 text-white transition-colors shadow-xs"
              title="Send question"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] text-stone-500 px-1">
            <button
              type="button"
              onClick={handleReplayGreeting}
              className="hover:text-[#1b6b43] font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Replay Voice Greeting</span>
            </button>
            <span>Simulated AI Demo • Works in 5 Languages</span>
          </div>
        </div>
      </div>
    </div>
  )
}
