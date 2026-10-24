import React, { useState, useEffect } from 'react'
import { Language, FarmType } from './types/farming'
import { Navbar } from './components/common/Navbar'
import { Footer } from './components/common/Footer'
import { LandingPage } from './components/landing/LandingPage'
import { CropDashboard } from './components/crop/CropDashboard'
import { FishDashboard } from './components/fish/FishDashboard'
import { AuthModal } from './components/auth/AuthModal'
import { FloatingVoiceModal } from './components/assistant/FloatingVoiceModal'
import { FloatingAIButton } from './components/common/FloatingAIButton'

export function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'crop' | 'fish'>('home')
  const [language, setLanguage] = useState<Language>('en')
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup')
  const [authDefaultType, setAuthDefaultType] = useState<FarmType>('crop')
  const [userName, setUserName] = useState<string>('Ramesh Patel')
  const [floatingAssistantOpen, setFloatingAssistantOpen] = useState(false)

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('agrovoice_user')
      if (savedUser) {
        const parsed = JSON.parse(savedUser)
        if (parsed.name) setUserName(parsed.name)
        if (parsed.preferredLang) setLanguage(parsed.preferredLang)
      }
    } catch (_e) {}

    const handleHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash === 'crop') setCurrentPage('crop')
      else if (hash === 'fish') setCurrentPage('fish')
      else if (hash === 'login') {
        setAuthMode('login')
        setAuthModalOpen(true)
      } else if (hash === 'signup') {
        setAuthMode('signup')
        setAuthModalOpen(true)
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const handleOpenAuth = (mode: 'login' | 'signup', defaultType: FarmType = 'crop') => {
    setAuthMode(mode)
    setAuthDefaultType(defaultType)
    setAuthModalOpen(true)
  }

  const handleAuthSuccess = (type: FarmType, name: string) => {
    setUserName(name)
    setAuthModalOpen(false)
    window.location.hash = type
    setCurrentPage(type)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSwitchFarmType = (type: FarmType) => {
    window.location.hash = type
    setCurrentPage(type)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#fafcf8] text-emerald-950 selection:bg-emerald-200 selection:text-emerald-950">
      {currentPage === 'home' ? (
        <>
          <Navbar
            language={language}
            onLanguageToggle={setLanguage}
            onNavigatePage={(p) => {
              window.location.hash = p
              setCurrentPage('home')
            }}
            onOpenAuth={handleOpenAuth}
          />
          <main className="flex-1">
            <LandingPage
              language={language}
              onOpenAuth={handleOpenAuth}
              onDirectDashboard={handleSwitchFarmType}
              onOpenVoiceAssistant={() => setFloatingAssistantOpen(true)}
            />
          </main>
          <Footer language={language} />
        </>
      ) : currentPage === 'crop' ? (
        <CropDashboard
          language={language}
          userName={userName}
          onLanguageChange={setLanguage}
          onSwitchFarmType={handleSwitchFarmType}
          onLogout={() => {
            window.location.hash = 'home'
            setCurrentPage('home')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      ) : (
        <FishDashboard
          language={language}
          userName={userName}
          onLanguageChange={setLanguage}
          onSwitchFarmType={handleSwitchFarmType}
          onLogout={() => {
            window.location.hash = 'home'
            setCurrentPage('home')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      )}

      {/* Global Floating "Ask AgroVoice AI" Button */}
      <FloatingAIButton language={language} onClick={() => setFloatingAssistantOpen(true)} />

      {/* Floating Voice & Text Assistant Modal */}
      <FloatingVoiceModal
        isOpen={floatingAssistantOpen}
        onClose={() => setFloatingAssistantOpen(false)}
        language={language}
        onLanguageChange={setLanguage}
        farmType={currentPage === 'fish' ? 'fish' : 'crop'}
        onSwitchFarmType={handleSwitchFarmType}
      />

      {/* Auth Modal (Login / Signup) */}
      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        defaultFarmType={authDefaultType}
        language={language}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        onSwitchMode={(mode) => setAuthMode(mode)}
      />
    </div>
  )
}

export default App
