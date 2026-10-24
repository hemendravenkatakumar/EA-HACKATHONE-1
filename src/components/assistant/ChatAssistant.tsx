import React, { useState, useEffect, useRef } from 'react'
import { Language, FarmType, ChatMessage } from '../../types/farming'
import { SpeechService, parseVoiceCommand } from '../../utils/speech'
import { getSimulatedAIResponse } from '../../utils/calculators'
import { VoiceVisualizer } from '../common/VoiceVisualizer'
import { LanguageToggle } from '../common/LanguageToggle'
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  RotateCcw,
  Pause,
  Play,
  Sparkles,
  History,
  Bot,
  User,
  ArrowRight,
  HelpCircle,
  Wheat,
  Fish,
  AlertCircle
} from 'lucide-react'

interface ChatAssistantProps {
  farmType: FarmType
  language: Language
  onLanguageChange: (lang: Language) => void
  onNavigateTab?: (tab: string) => void
  onSwitchFarmType?: (type: FarmType) => void
  isCompact?: boolean
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  farmType,
  language,
  onLanguageChange,
  onNavigateTab,
  onSwitchFarmType,
  isCompact = false
}) => {
  const isCrop = farmType === 'crop'

  const getWelcomeText = (lang: Language) => {
    switch (lang) {
      case 'te':
        return isCrop
          ? 'నమస్కారం! నేను మీ ఆగ్రోవాయిస్ పంట సహాయకుడిని. వరి, పత్తి తెగుళ్లు, ఎరువుల సమయం, లేదా ప్రభుత్వ పథకాల గురించి మాట్లాడండి లేదా టైప్ చేయండి.'
          : 'నమస్కారం! నేను మీ ఆగ్రోవాయిస్ ఆక్వా సహాయకుడిని. చెరువు నీటి నాణ్యత (pH, DO), చేపల ఆరోగ్యం, లేదా మేత లెక్కల గురించి అడగండి.'
      case 'hi':
        return isCrop
          ? 'नमस्ते! मैं आपका एग्रोवॉयस फसल सहायक हूँ। आप अपनी भाषा में बोलकर या लिखकर फसलों की बीमारी, मौसम और सरकारी योजनाओं के बारे में पूछ सकते हैं।'
          : 'नमस्ते! मैं आपका एग्रोवॉयस मत्स्य सहायक हूँ। आप तालाब के पानी की गुणवत्ता, ऑक्सीजन, और मछली के चारे के बारे में पूछ सकते हैं।'
      case 'ta':
        return isCrop
          ? 'வணக்கம்! நான் உங்கள் அக்ரோவாய்ஸ் பயிர் உதவியாளர். பயிர் நோய்கள், உர அட்டவணை மற்றும் அரசு மானியங்கள் பற்றி குரல் அல்லது தட்டச்சு மூலம் கேளுங்கள்.'
          : 'வணக்கம்! நான் உங்கள் அக்ரோவாய்ஸ் மீன்வள உதவியாளர். குளத்து நீர் தரம், ஆக்ஸிஜன் அளவு மற்றும் மீன் தீவனம் பற்றி கேளுங்கள்.'
      case 'kn':
        return isCrop
          ? 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಅಗ್ರೋವಾಯ್ಸ್ ಬೆಳೆ ಸಹಾಯಕ. ಬೆಳೆ ರೋಗಗಳು, ಗೊಬ್ಬರದ ಸಮಯ ಮತ್ತು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಮಾತನಾಡಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ.'
          : 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಅಗ್ರೋವಾಯ್ಸ್ ಮತ್ಸ್ಯ ಸಹಾಯಕ. ಕೊಳದ ನೀರಿನ ಗುಣಮಟ್ಟ, ಆಮ್ಲಜನಕ ಮತ್ತು ಮೀನು ಆಹಾರದ ಬಗ್ಗೆ ಕೇಳಿ.'
      case 'en':
      default:
        return isCrop
          ? 'Namaste! I am your AgroVoice Crop Assistant. You can speak or type in English or your regional language. Ask about plant diseases, irrigation scheduling, or government subsidies.'
          : 'Namaste! I am your AgroVoice Aquaculture Assistant. You can ask in your preferred language about pond water testing, surface piping, feeding rate, or PMMSY subsidies.'
    }
  }

  // Pre-populated conversations
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: getWelcomeText(language),
      timestamp: 'Just now',
      language
    }
  ])

  // Sync messages and speak when language toggle changes
  useEffect(() => {
    const welcome = getWelcomeText(language)
    setMessages([
      {
        id: 'greet-' + Date.now(),
        sender: 'assistant',
        text: welcome,
        timestamp: 'Just now',
        language
      }
    ])
    SpeechService.stopSpeech()
    speakText(welcome)
  }, [language, farmType])
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [statusText, setStatusText] = useState('')
  const [showHistory, setShowHistory] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const speechServiceRef = useRef<SpeechService | null>(null)

  useEffect(() => {
    speechServiceRef.current = new SpeechService()
    return () => {
      SpeechService.stopSpeech()
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isListening])

  const cropPromptsByLang: Record<Language, string[]> = {
    te: [
      'వరి ఆకులు పసుపు రంగులోకి ఎందుకు మారుతున్నాయి?',
      'రేపు వర్షం పడితే నీటిపారుదల ఎలా చేయాలి?',
      'పీఎం కిసాన్ మరియు రైతు భరోసా ఎలా దరఖాస్తు చేసుకోవాలి?',
      'మొక్కజొన్నకు N-P-K ఎరువుల మోతాదు ఎంత?'
    ],
    hi: [
      'मेरी धान की पत्तियां पीली क्यों पड़ रही हैं?',
      'बारिश से पहले सिंचाई कैसे प्रबंधित करें?',
      'पीएम किसान और सरकारी योजनाएं क्या हैं?',
      'मक्के में फॉल आर्मीवर्म की पहचान कैसे करें?'
    ],
    ta: [
      'நெல் இலைகள் ஏன் மஞ்சள் நிறமாக மாறுகின்றன?',
      'மழைக்கு முன் பாசனத்தை எவ்வாறு நிர்வகிப்பது?',
      'எனக்கு என்ன அரசு மானியத் திட்டங்கள் கிடைக்கும்?',
      'மக்காச்சோளத்தில் படைப்புழுவை எவ்வாறு கட்டுப்படுத்துவது?'
    ],
    kn: [
      'ನನ್ನ ಭತ್ತದ ಎಲೆಗಳು ಏಕೆ ಹಳದಿಯಾಗುತ್ತಿವೆ?',
      'ಮಳೆಗೆ ಮುನ್ನ ನೀರಾವರಿಯನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸಬೇಕು?',
      'ಯಾವ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ನನಗೆ ಅನ್ವಯಿಸುತ್ತವೆ?',
      'ಮೆಕ್ಕೆಜೋಳದಲ್ಲಿ ಲದ್ದಿ ಹುಳು ಹತೋಟಿ ಹೇಗೆ?'
    ],
    en: [
      'Why are my rice leaves turning yellow?',
      'How should I manage irrigation before rain?',
      'What government schemes may apply to me?',
      'How do I detect fall armyworm in maize?'
    ]
  }

  const fishPromptsByLang: Record<Language, string[]> = {
    te: [
      'చెరువులో అమ్మోనియా పెరిగితే ఏం చేయాలి?',
      'తెల్లవారుజామున చేపలు ఉపరితలంపై తేలితే ఏం చేయాలి?',
      'రోహు చేపలకు రోజువారీ మేత ఎంత వేయాలి?',
      'పీఎం మత్స్య సంపద యోజన రాయితీ వివరాలు ఏమిటి?'
    ],
    hi: [
      'तालाब में पानी की गुणवत्ता (pH, अमोनिया) कैसे जांचें?',
      'सुबह मछलियां पानी की सतह पर क्यों तैरती हैं?',
      'रोहू मछली के लिए दाना खिलाने का सही तरीका क्या है?',
      'एरेटर के लिए पीएम मत्स्य संपदा योजना सब्सिडी क्या है?'
    ],
    ta: [
      'குளத்து நீரின் தரத்தை எவ்வாறு சரிபார்ப்பது?',
      'அதிகாலையில் மீன்கள் மேற்பரப்பில் ஏன் நீந்துகின்றன?',
      'ரோகு மீனுக்கான சிறந்த தீவன முறை என்ன?',
      'காற்றோட்ட கருவிக்கான PMMSY மானியம் என்ன?'
    ],
    kn: [
      'ಕೊಳದ ನೀರಿನ ಗುಣಮಟ್ಟವನ್ನು ಹೇಗೆ ಪರೀಕ್ಷಿಸುವುದು?',
      'ಮುಂಜಾನೆ ಮೀನುಗಳು ಮೇಲ್ಮೈಗೆ ಏಕೆ ಬರುತ್ತವೆ?',
      'ರೋಹು ಮೀನುಗಳಿಗೆ ಆಹಾರ ನೀಡುವ ವಿಧಾನ ಹೇಗೆ?',
      'ಏರೇಟರ್‌ಗಳಿಗೆ ಪಿಎಂ ಮತ್ಸ್ಯ ಸಂಪದ ಸಬ್ಸಿಡಿ ಏನು?'
    ],
    en: [
      'How can I check pond water quality?',
      'Why are fish coming to the surface at dawn?',
      'How can I improve feeding practices for Rohu?',
      'What is the PMMSY subsidy for pond aerators?'
    ]
  }

  const suggestedPrompts = isCrop
    ? (cropPromptsByLang[language] || cropPromptsByLang.en)
    : (fishPromptsByLang[language] || fishPromptsByLang.en)

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputText).trim()
    if (!query) return

    // Stop speaking if playing
    SpeechService.stopSpeech()
    setIsSpeaking(false)
    setIsPaused(false)

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language
    }

    setMessages((prev) => [...prev, userMsg])
    setInputText('')
    setStatusText(language === 'te' ? 'ఆలోచిస్తున్నాను...' : 'AgroVoice is processing...')

    // Check voice navigation command
    const command = parseVoiceCommand(query)
    if (command) {
      if (command.action === 'navigate' && command.target && onSwitchFarmType) {
        onSwitchFarmType(command.target as FarmType)
      } else if (command.action === 'tab' && command.target && onNavigateTab) {
        onNavigateTab(command.target)
      }
    }

    // Generate simulated AI response
    setTimeout(() => {
      const { answer, route } = getSimulatedAIResponse(query, farmType, language)
      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language,
        suggestedAction: route
          ? {
              label:
                route === 'disease'
                  ? language === 'te' ? 'తెగుళ్ల విశ్లేషణ తెరవండి' : 'Open Disease Diagnostic'
                  : route === 'weather'
                  ? language === 'te' ? 'వాతావరణ సలహా చూడండి' : 'Check Weather Forecast'
                  : route === 'schemes'
                  ? language === 'te' ? 'పథకాల జాబితా చూడండి' : 'View Govt Schemes'
                  : route === 'water'
                  ? language === 'te' ? 'నీటి నాణ్యత తనిఖీ చేయండి' : 'Check Water Quality'
                  : language === 'te' ? 'మరిన్ని వివరాలు' : 'Open Module',
              route
            }
          : undefined
      }

      setMessages((prev) => [...prev, assistantMsg])
      setStatusText('')

      // Auto speak response
      speakText(answer)
    }, 700)
  }

  const toggleMic = () => {
    if (isListening) {
      speechServiceRef.current?.stopListening()
      setIsListening(false)
      setStatusText('')
    } else {
      setIsListening(true)
      setStatusText(
        language === 'te'
          ? 'మీ స్వరాన్ని వింటున్నాము... మాట్లాడండి'
          : 'Listening to your voice... Speak now'
      )

      speechServiceRef.current?.startListening(
        language,
        (text) => {
          setInputText(text)
        },
        () => {
          setIsListening(false)
          setStatusText('')
          if (inputText.trim()) {
            handleSend(inputText)
          }
        }
      )
    }
  }

  const speakText = (text: string) => {
    SpeechService.stopSpeech()
    setIsSpeaking(true)
    setIsPaused(false)
    SpeechService.speak(text, language, () => {
      setIsSpeaking(false)
      setIsPaused(false)
    })
  }

  const togglePauseSpeech = () => {
    if (isPaused) {
      SpeechService.resumeSpeech()
      setIsPaused(false)
    } else {
      SpeechService.pauseSpeech()
      setIsPaused(true)
    }
  }

  const stopAudio = () => {
    SpeechService.stopSpeech()
    setIsSpeaking(false)
    setIsPaused(false)
  }

  return (
    <div className={`flex flex-col h-full bg-white rounded-2xl border ${isCrop ? 'border-[#dce8e0]' : 'border-[#d2e8ed]'} shadow-xs overflow-hidden`}>
      {/* Assistant Header - Light Theme */}
      <div className={`px-5 py-3.5 flex items-center justify-between border-b bg-white ${isCrop ? 'border-[#e4eee7]' : 'border-[#e0edf0]'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isCrop ? 'bg-[#edf6f0] text-[#1b6845]' : 'bg-[#e8f6f8] text-[#0f766e]'} shadow-2xs`}>
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`font-display font-bold text-sm tracking-tight ${isCrop ? 'text-[#123e2b]' : 'text-[#0f3d45]'} flex items-center gap-1.5`}>
                AgroVoice Assistant
                <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider border border-stone-200">
                  Gemini-Style
                </span>
              </h3>
            </div>
            <p className="text-[11px] text-stone-500 font-medium">
              {isCrop
                ? language === 'te' ? 'పంటల సాగు & తెగుళ్ల సహాయకుడు' : 'Crop Cultivation & Agronomy AI'
                : language === 'te' ? 'ఆక్వాకల్చర్ & చెరువుల సహాయకుడు' : 'Aquaculture & Pond Management AI'}
            </p>
          </div>
        </div>

        {/* Header Controls */}
        <div className="flex items-center gap-2">
          {/* 5-Language Switch */}
          <LanguageToggle language={language} onToggle={onLanguageChange} />

          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            title="Toggle chat history"
            aria-label="Toggle chat history"
          >
            <History className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Chat Layout (with optional history sidebar) */}
      <div className="flex-1 flex overflow-hidden">
        {/* History Sidebar */}
        {showHistory && (
          <aside className="w-56 border-r border-emerald-100 bg-emerald-50/50 p-3 hidden sm:flex flex-col gap-2 overflow-y-auto text-xs animate-in slide-in-from-left duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60 font-bold text-emerald-900">
              <span>Past Sessions</span>
              <button
                type="button"
                onClick={() => {
                  const welcome = getWelcomeText(language)
                  setMessages([
                    {
                      id: 'greet-' + Date.now(),
                      sender: 'assistant',
                      text: welcome,
                      timestamp: 'Just now',
                      language
                    }
                  ])
                }}
                className="text-emerald-600 hover:text-emerald-800"
                title="Clear current chat"
              >
                Clear
              </button>
            </div>
            <div className="flex flex-col gap-1.5 mt-1">
              <button
                type="button"
                className="text-left p-2 rounded-lg bg-white border border-emerald-200 text-emerald-900 font-medium truncate shadow-2xs hover:border-emerald-400"
              >
                🌾 Rice leaf blast diagnosis
              </button>
              <button
                type="button"
                className="text-left p-2 rounded-lg bg-white border border-emerald-200 text-emerald-900 font-medium truncate shadow-2xs hover:border-emerald-400"
              >
                💧 Kharif drip scheduling
              </button>
              <button
                type="button"
                className="text-left p-2 rounded-lg bg-white border border-emerald-200 text-emerald-900 font-medium truncate shadow-2xs hover:border-emerald-400"
              >
                📜 Rythu Bharosa checklist
              </button>
              <button
                type="button"
                className="text-left p-2 rounded-lg bg-white border border-emerald-200 text-emerald-900 font-medium truncate shadow-2xs hover:border-emerald-400"
              >
                🐟 Pond dissolved oxygen check
              </button>
            </div>
          </aside>
        )}

        {/* Chat Stream Area */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-stone-50/50 to-white">
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
            {/* Prototype notice badge */}
            <div className="flex items-center justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-[11px] text-amber-800 font-semibold shadow-2xs">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                Simulated AI Demo · Not real agronomic prescription · Always verify locally
              </span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[88%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.sender === 'user'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : isCrop
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-teal-100 text-teal-800 border border-teal-200'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-emerald-800 text-white rounded-tr-none'
                      : 'bg-white border border-emerald-950/10 text-emerald-950 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Optional Action Pill inside assistant message */}
                  {msg.suggestedAction && onNavigateTab && (
                    <button
                      type="button"
                      onClick={() => onNavigateTab(msg.suggestedAction!.route)}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 rounded-lg text-xs font-bold transition-colors"
                    >
                      <span>{msg.suggestedAction.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
                    </button>
                  )}

                  <div className="flex items-center justify-between gap-3 mt-2 text-[10px] opacity-70">
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'assistant' && (
                      <button
                        type="button"
                        onClick={() => speakText(msg.text)}
                        className="hover:text-emerald-700 flex items-center gap-1"
                        title="Read aloud"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Speak</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Listening / Speaking Live State Indicator */}
            {(isListening || isSpeaking || statusText) && (
              <div className="flex items-center gap-3 p-3 bg-emerald-50/90 border border-emerald-200 rounded-xl max-w-md animate-pulse">
                <VoiceVisualizer active={isListening || isSpeaking} color={isCrop ? 'emerald' : 'teal'} />
                <span className="text-xs font-semibold text-emerald-900">
                  {statusText || (isSpeaking ? 'Reading response aloud...' : 'Listening...')}
                </span>
                {isSpeaking && (
                  <div className="ml-auto flex items-center gap-1">
                    <button
                      type="button"
                      onClick={togglePauseSpeech}
                      className="p-1 rounded bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-100"
                      title={isPaused ? 'Resume' : 'Pause'}
                    >
                      {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                    </button>
                    <button
                      type="button"
                      onClick={stopAudio}
                      className="p-1 rounded bg-white border border-emerald-200 text-red-600 hover:bg-red-50"
                      title="Stop audio"
                    >
                      <VolumeX className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions */}
          <div className="px-4 py-2 border-t border-emerald-100 bg-emerald-50/40">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-900/80 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'te' ? 'సూచించిన ప్రశ్నలు:' : 'Suggested Questions:'}</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap px-3 py-1.5 bg-white border border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/80 text-emerald-950 rounded-full text-xs font-medium transition-all shadow-2xs hover:scale-102"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input & Voice Controls Bar */}
          <div className="p-3 sm:p-4 border-t border-emerald-100 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex items-center gap-2"
            >
              {/* Mic Button */}
              <button
                type="button"
                onClick={toggleMic}
                className={`p-3 rounded-xl transition-all shadow-sm ${
                  isListening
                    ? 'bg-red-500 text-white animate-bounce'
                    : isCrop
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-teal-100 text-teal-800 hover:bg-teal-200'
                }`}
                title={isListening ? 'Stop listening' : 'Start voice input (Telugu or English)'}
                aria-label="Microphone"
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  language === 'te'
                    ? 'పంట లేదా చేపల ప్రశ్నను ఇక్కడ టైప్ చేయండి...'
                    : 'Ask about crops, diseases, water testing, or schemes...'
                }
                className="flex-1 px-4 py-2.5 text-sm bg-stone-50 border border-emerald-200 rounded-xl focus:bg-white focus:border-emerald-600 focus:outline-hidden text-emerald-950 placeholder-emerald-900/40"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`p-3 rounded-xl transition-all ${
                  inputText.trim()
                    ? isCrop
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md'
                      : 'bg-teal-700 hover:bg-teal-800 text-white shadow-md'
                    : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                }`}
                title="Send message"
                aria-label="Send"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>

            <div className="flex items-center justify-between mt-2 text-[10px] text-emerald-900/60 px-1">
              <span>Supports voice commands: e.g. "Open crop farming", "Show schemes", "Check water"</span>
              <span>English & తెలుగు Audio TTS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
