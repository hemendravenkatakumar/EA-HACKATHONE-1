import React, { useState } from 'react'
import { Language, FarmType } from '../../types/farming'
import { LANGUAGES_LIST } from '../common/LanguageToggle'
import { AgroVoiceAPI } from '../../services/api'
import {
  Sprout,
  Wheat,
  Fish,
  Lock,
  Mail,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  X,
  Globe,
  ShieldCheck,
  Check
} from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  mode: 'login' | 'signup'
  defaultFarmType?: FarmType
  language: Language
  onClose: () => void
  onSuccess: (farmType: FarmType, userName: string) => void
  onSwitchMode: (mode: 'login' | 'signup') => void
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  mode: initialMode,
  defaultFarmType = 'crop',
  language,
  onClose,
  onSuccess,
  onSwitchMode
}) => {
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup')
  const [farmType, setFarmType] = useState<FarmType>(defaultFarmType)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [preferredLang, setPreferredLang] = useState<Language>(language)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  if (!isOpen) return null

  const handleToggleMode = (signUpState: boolean) => {
    setIsSignUp(signUpState)
    setErrorMsg('')
    onSwitchMode(signUpState ? 'signup' : 'login')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!email) {
      setErrorMsg('Please enter an email address.')
      return
    }

    setIsLoading(true)
    const farmerName = name.trim() || (farmType === 'crop' ? 'Ramesh Patel' : 'Kiran Verma')

    try {
      if (isSignUp) {
        await AgroVoiceAPI.register({
          name: farmerName,
          email,
          password: password || 'agrovoice2026',
          farmType,
          language: preferredLang
        })
      }
    } catch (_e) {
      // Gracefully continue in demo mode if backend is starting
    }

    setTimeout(() => {
      setIsLoading(false)
      localStorage.setItem('agrovoice_user', JSON.stringify({ name: farmerName, farmType, preferredLang }))
      onSuccess(farmType, farmerName)
    }, 450)
  }

  const handleQuickDemo = (type: FarmType) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      const demoName = type === 'crop' ? 'Ramesh Patel (Crop Farmer)' : 'Kiran Verma (Aqua Farmer)'
      localStorage.setItem('agrovoice_user', JSON.stringify({ name: demoName, farmType: type, preferredLang }))
      onSuccess(type, demoName)
    }, 350)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Sliding Auth Card */}
      <div className="relative w-full max-w-4xl min-h-[580px] bg-white rounded-[2.5rem] shadow-2xl border border-stone-200/80 overflow-hidden z-10 my-auto flex flex-col md:flex-row animate-in zoom-in-95 duration-250">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-40 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* =========================================================================
            DESKTOP SLIDING OVERLAY SHEET (Animated left-right translation)
            "athe blue sheet wan to come this side sine mean that was do to left side"
        ========================================================================= */}
        <div
          className={`hidden md:block absolute top-0 bottom-0 w-1/2 z-30 transition-transform duration-700 ease-in-out shadow-2xl pointer-events-auto ${
            isSignUp ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ left: 0 }}
        >
          {/* Luminous, light attractive gradient panel with organic decorative accents */}
          <div className="relative w-full h-full bg-gradient-to-br from-[#10b981] via-[#06b6d4] to-[#0284c7] text-white p-10 flex flex-col justify-between overflow-hidden">
            
            {/* Organic background curve styling */}
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/15 blur-2xl pointer-events-none" />
            <svg
              className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path d="M0,0 C30,40 70,60 100,100 L100,0 Z" fill="white" />
            </svg>

            {/* Top Brand Pill in Sliding Sheet */}
            <div className="relative z-10 flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-xs">
                <Sprout className="w-4 h-4 text-emerald-100" />
              </div>
              <span className="font-display font-extrabold text-base tracking-tight text-white">
                AgroVoice AI
              </span>
            </div>

            {/* Center Switch Content: Changes based on isSignUp state */}
            <div className="relative z-10 my-auto text-center px-4 space-y-4">
              {isSignUp ? (
                /* Shown when User is on Sign Up view (Sheet is on the LEFT) */
                <div className="space-y-4 animate-in fade-in duration-500">
                  <h2 className="text-3xl lg:text-4xl font-display font-black tracking-tight text-white leading-tight">
                    Welcome Back!
                  </h2>
                  <p className="text-xs lg:text-sm text-cyan-100/90 leading-relaxed max-w-xs mx-auto">
                    To keep connected with your farm plots, pond telemetry, and AI voice history, please sign in.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleToggleMode(false)}
                      className="px-10 py-3 rounded-full border-2 border-white text-white font-extrabold text-xs tracking-wider uppercase hover:bg-white hover:text-[#0284c7] transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      SIGN IN
                    </button>
                  </div>
                </div>
              ) : (
                /* Shown when User is on Sign In view (Sheet is on the RIGHT as in screenshot) */
                <div className="space-y-4 animate-in fade-in duration-500">
                  <h2 className="text-3xl lg:text-4xl font-display font-black tracking-tight text-white leading-tight">
                    Create, <br />Account!
                  </h2>
                  <p className="text-xs lg:text-sm text-cyan-100/90 leading-relaxed max-w-xs mx-auto">
                    Sign up if you still don&apos;t have an account to unlock smart crop disease scanning and fish pond monitoring.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleToggleMode(true)}
                      className="px-10 py-3 rounded-full border-2 border-white text-white font-extrabold text-xs tracking-wider uppercase hover:bg-white hover:text-[#0284c7] transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      SIGN UP
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Safe Agronomy Pill */}
            <div className="relative z-10 flex items-center justify-center gap-1.5 text-[11px] text-cyan-100/80">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Dedicated for Indian Agriculture & Ponds</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            LEFT PANEL: SIGN IN FORM
        ========================================================================= */}
        <div className={`w-full md:w-1/2 p-7 sm:p-10 flex flex-col justify-between transition-opacity duration-500 ${
          isSignUp ? 'md:pointer-events-none md:opacity-40' : 'opacity-100 pointer-events-auto'
        }`}>
          <div>
            <div className="text-center md:text-left mb-6">
              <h2 className="text-2xl sm:text-3xl font-display font-black text-stone-900 tracking-tight">
                Sign in
              </h2>

              {/* Social Login Icons Row matching user screenshot */}
              <div className="flex items-center justify-center md:justify-start gap-3 my-4">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('crop')}
                  className="w-10 h-10 rounded-full border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 flex items-center justify-center text-stone-600 hover:text-emerald-700 transition-all shadow-2xs cursor-pointer"
                  title="1-Click Crop Farmer"
                >
                  <Wheat className="w-4 h-4 text-emerald-600" />
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('fish')}
                  className="w-10 h-10 rounded-full border border-stone-200 hover:border-teal-500 hover:bg-teal-50/50 flex items-center justify-center text-stone-600 hover:text-teal-700 transition-all shadow-2xs cursor-pointer"
                  title="1-Click Aqua Farmer"
                >
                  <Fish className="w-4 h-4 text-teal-600" />
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('crop')}
                  className="w-10 h-10 rounded-full border border-stone-200 hover:border-cyan-500 hover:bg-cyan-50/50 flex items-center justify-center text-stone-600 font-bold text-xs transition-all shadow-2xs cursor-pointer"
                  title="Google / Kisan SSO"
                >
                  G
                </button>
              </div>

              <span className="text-[11px] text-stone-400 block font-medium">
                Or sign in using E-Mail Address
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-[#f3f6f5] hover:bg-[#eef3f0] focus:bg-white border border-stone-200/80 rounded-2xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:border-[#0284c7] focus:outline-hidden transition-colors"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-[#f3f6f5] hover:bg-[#eef3f0] focus:bg-white border border-stone-200/80 rounded-2xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:border-[#0284c7] focus:outline-hidden transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Farm Mode Quick Choice for Login */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[11px] font-bold text-stone-500">Destination:</span>
                <div className="inline-flex rounded-xl bg-stone-100 p-0.5 border border-stone-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setFarmType('crop')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      farmType === 'crop' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-stone-500'
                    }`}
                  >
                    🌾 Crop
                  </button>
                  <button
                    type="button"
                    onClick={() => setFarmType('fish')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      farmType === 'fish' ? 'bg-white text-teal-800 shadow-2xs' : 'text-stone-500'
                    }`}
                  >
                    🐟 Aqua
                  </button>
                </div>
              </div>

              <div className="text-center md:text-left">
                <button
                  type="button"
                  onClick={() => handleQuickDemo(farmType)}
                  className="text-[11px] text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                >
                  Forgot your password?
                </button>
              </div>

              {errorMsg && (
                <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                  {errorMsg}
                </p>
              )}

              {/* Submit Pill Button matching screenshot */}
              <div className="pt-2 flex justify-center md:justify-start">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-10 py-3 rounded-full bg-gradient-to-r from-[#0d9488] via-[#0284c7] to-[#0369a1] hover:from-[#0b7c72] hover:to-[#025c8a] text-white font-extrabold text-xs tracking-wider uppercase shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{isLoading ? 'OPENING...' : 'SIGN IN'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Mobile switcher (visible on small screens) */}
          <div className="md:hidden mt-6 pt-4 border-t border-stone-100 text-center text-xs text-stone-600">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => handleToggleMode(true)}
              className="font-bold text-[#0284c7] hover:underline cursor-pointer"
            >
              Sign Up here
            </button>
          </div>
        </div>

        {/* =========================================================================
            RIGHT PANEL: SIGN UP FORM
        ========================================================================= */}
        <div className={`w-full md:w-1/2 p-7 sm:p-10 flex flex-col justify-between transition-opacity duration-500 ${
          !isSignUp ? 'md:pointer-events-none md:opacity-40' : 'opacity-100 pointer-events-auto'
        }`}>
          <div>
            <div className="text-center md:text-left mb-5">
              <h2 className="text-2xl sm:text-3xl font-display font-black text-stone-900 tracking-tight">
                Create Account
              </h2>
              <span className="text-[11px] text-stone-400 block mt-1 font-medium">
                Choose your farming type and language preference
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Farming Type Selection Cards */}
              <div>
                <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                  Farming Workspace:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFarmType('crop')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      farmType === 'crop'
                        ? 'border-emerald-500 bg-[#edf7f1] text-[#134e32] font-bold ring-2 ring-emerald-200'
                        : 'border-stone-200 hover:border-emerald-200 bg-white text-stone-600'
                    }`}
                  >
                    <Wheat className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs truncate">Crop Farming</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFarmType('fish')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      farmType === 'fish'
                        ? 'border-teal-500 bg-[#e8f6f8] text-[#0f5c66] font-bold ring-2 ring-teal-200'
                        : 'border-stone-200 hover:border-teal-200 bg-white text-stone-600'
                    }`}
                  >
                    <Fish className="w-4 h-4 text-teal-600 shrink-0" />
                    <span className="text-xs truncate">Fish Farming</span>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name (రైతు పేరు)"
                  className="w-full px-4 py-2.5 bg-[#f3f6f5] hover:bg-[#eef3f0] focus:bg-white border border-stone-200/80 rounded-2xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:border-[#0284c7] focus:outline-hidden transition-colors"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full px-4 py-2.5 bg-[#f3f6f5] hover:bg-[#eef3f0] focus:bg-white border border-stone-200/80 rounded-2xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:border-[#0284c7] focus:outline-hidden transition-colors"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-2.5 bg-[#f3f6f5] hover:bg-[#eef3f0] focus:bg-white border border-stone-200/80 rounded-2xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:border-[#0284c7] focus:outline-hidden transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Preferred Language selector */}
              <div>
                <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                  Language Preference:
                </label>
                <select
                  value={preferredLang}
                  onChange={(e) => setPreferredLang(e.target.value as Language)}
                  className="w-full px-3.5 py-2.5 bg-[#f3f6f5] hover:bg-[#eef3f0] focus:bg-white border border-stone-200/80 rounded-2xl text-xs font-bold text-stone-800 focus:border-[#0284c7] focus:outline-hidden"
                >
                  {LANGUAGES_LIST.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.nativeName} ({l.label})
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex justify-center md:justify-start">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-10 py-3 rounded-full bg-gradient-to-r from-[#10b981] via-[#0ea5e9] to-[#0284c7] hover:from-[#0da271] hover:to-[#0275b0] text-white font-extrabold text-xs tracking-wider uppercase shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{isLoading ? 'CREATING...' : 'SIGN UP'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Mobile switcher (visible on small screens) */}
          <div className="md:hidden mt-6 pt-4 border-t border-stone-100 text-center text-xs text-stone-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => handleToggleMode(false)}
              className="font-bold text-[#0284c7] hover:underline cursor-pointer"
            >
              Sign In here
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
