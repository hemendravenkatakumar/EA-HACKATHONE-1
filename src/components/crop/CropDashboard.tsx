import React, { useState } from 'react'
import { Language, FarmType } from '../../types/farming'
import { CropOverview } from './CropOverview'
import { CropDiseaseDetector } from './CropDiseaseDetector'
import { CropWeatherPage } from './CropWeatherPage'
import { CropSchemesDirectory } from './CropSchemesDirectory'
import { CropTechLibrary } from './CropTechLibrary'
import { CropVideoLibrary } from './CropVideoLibrary'
import { CropProfitCalculator } from './CropProfitCalculator'
import { ChatAssistant } from '../assistant/ChatAssistant'
import { LanguageToggle } from '../common/LanguageToggle'
import {
  Wheat,
  LayoutDashboard,
  Bot,
  Scan,
  CloudSun,
  Landmark,
  Cpu,
  Video,
  Calculator,
  LogOut,
  Fish,
  Menu,
  X,
  Sprout,
  ArrowRight
} from 'lucide-react'

interface CropDashboardProps {
  language: Language
  userName: string
  onLanguageChange: (lang: Language) => void
  onSwitchFarmType: (type: FarmType) => void
  onLogout: () => void
}

export const CropDashboard: React.FC<CropDashboardProps> = ({
  language,
  userName,
  onLanguageChange,
  onSwitchFarmType,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'overview', labelEn: 'Farm Overview', labelTe: 'స్థూల విశ్లేషణ', icon: LayoutDashboard },
    { id: 'assistant', labelEn: 'AI Voice Assistant', labelTe: 'AI వాయిస్ అసిస్టెంట్', icon: Bot, highlight: true },
    { id: 'disease', labelEn: 'Plant Disease Detection', labelTe: 'తెగుళ్ల గుర్తింపు', icon: Scan },
    { id: 'weather', labelEn: 'Weather-Based Advice', labelTe: 'వాతావరణ సలహాలు', icon: CloudSun },
    { id: 'schemes', labelEn: 'Govt Schemes & Subsidies', labelTe: 'ప్రభుత్వ పథకాలు', icon: Landmark },
    { id: 'tech', labelEn: 'New Farming Technologies', labelTe: 'ఆధునిక సాంకేతికతలు', icon: Cpu },
    { id: 'videos', labelEn: 'Tutorial Video Library', labelTe: 'వీడియో పాఠాలు', icon: Video },
    { id: 'calculator', labelEn: 'Crop Price & Profit', labelTe: 'లాభాల కాలిక్యులేటర్', icon: Calculator }
  ]

  const activeItem = navItems.find((n) => n.id === activeTab) || navItems[0]

  return (
    <div className="min-h-screen bg-[#f8faf7] flex flex-col md:flex-row text-[#17332a]">
      {/* Light Clean Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-[#e6ede8] flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo & Workspace Card */}
          <div className="p-5 border-b border-[#edf3ee] space-y-4">
            <div className="flex items-center justify-between">
              <a href="#home" className="flex items-center gap-2.5 text-decoration-none">
                <span className="w-9 h-9 rounded-xl bg-[#1f6a49] text-white flex items-center justify-center shadow-xs">
                  <Sprout className="w-5 h-5 text-white" />
                </span>
                <span className="font-display font-extrabold text-lg text-[#153d30] tracking-tight">
                  AgroVoice <b className="text-[#2a8b5e]">AI</b>
                </span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="md:hidden p-1 text-[#52655d] hover:text-[#153d30]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Workspace Pill (Light Theme) */}
            <div className="p-3 bg-[#f2f7f3] rounded-2xl border border-[#dfeae1] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#e2efe5] text-[#1f6a49] flex items-center justify-center">
                  <Wheat className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#627a6d] uppercase tracking-wider">
                    Current Mode
                  </span>
                  <strong className="block text-xs font-bold text-[#153d30]">Crop Farming</strong>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onSwitchFarmType('fish')}
                className="text-[11px] font-bold text-[#15727b] hover:text-[#0d4e58] bg-[#e6f3f4] hover:bg-[#d6ecf0] px-2.5 py-1 rounded-lg border border-[#cbe6ea] transition-colors"
                title="Switch to Aquaculture"
              >
                Fish →
              </button>
            </div>
          </div>

          {/* Navigation Items (Light Theme) */}
          <nav className="flex-1 p-3.5 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-[#edf6f0] text-[#1a5a3d] font-bold shadow-2xs border-l-3 border-[#2a8b5e]'
                      : 'text-[#4d6659] hover:bg-[#f4f8f5] hover:text-[#184835]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#2a8b5e]' : 'text-[#6e8779]'}`} />
                  <span className="truncate">
                    {language === 'te' ? item.labelTe : item.labelEn}
                  </span>
                  {item.highlight && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-[#2a8b5e] animate-pulse" />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Bottom Farmer Card & Logout */}
          <div className="p-4 border-t border-[#edf3ee] bg-[#fbfdfb] space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#e2efe5] text-[#1f6a49] flex items-center justify-center font-bold text-xs border border-[#cfdfd4]">
                {userName.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <strong className="block text-xs font-bold text-[#153d30] truncate">{userName}</strong>
                <span className="text-[10px] text-[#6b8275] truncate block">Normal Agriculture</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-[#546b5e] hover:text-[#1f6a49] hover:bg-[#edf5ef] rounded-xl transition-colors border border-[#dbe6de]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area (Light Theme) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Clean Light Topbar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#e6ede8] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-[#244b3b] hover:bg-[#f2f7f3] rounded-xl"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#287452]">
                  Crop Farming Workspace
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-[10px] font-bold bg-[#fff8e8] text-[#8c6b22] border border-[#f1dfbb] px-2 py-0.5 rounded-full">
                  DEMO DATA
                </span>
              </div>
              <h1 className="font-display font-extrabold text-lg sm:text-xl text-[#153d30] leading-tight">
                {language === 'te' ? activeItem.labelTe : activeItem.labelEn}
              </h1>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onSwitchFarmType('fish')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#eaf4f6] hover:bg-[#d8ecf0] border border-[#cae2e6] text-[#126f79] font-bold rounded-xl text-xs transition-colors shadow-2xs"
            >
              <Fish className="w-3.5 h-3.5 text-[#15727b]" />
              <span>Switch to Aquaculture</span>
            </button>

            <LanguageToggle language={language} onToggle={onLanguageChange} />
          </div>
        </header>

        {/* Tab Content Display */}
        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto flex-1">
          {activeTab === 'overview' && (
            <CropOverview
              language={language}
              userName={userName}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'assistant' && (
            <div className="h-[76vh]">
              <ChatAssistant
                farmType="crop"
                language={language}
                onLanguageChange={onLanguageChange}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onSwitchFarmType={onSwitchFarmType}
              />
            </div>
          )}

          {activeTab === 'disease' && (
            <CropDiseaseDetector language={language} />
          )}

          {activeTab === 'weather' && (
            <CropWeatherPage language={language} />
          )}

          {activeTab === 'schemes' && (
            <CropSchemesDirectory language={language} defaultTarget="crop" />
          )}

          {activeTab === 'tech' && (
            <CropTechLibrary language={language} defaultTarget="crop" />
          )}

          {activeTab === 'videos' && (
            <CropVideoLibrary language={language} defaultCategory="all" />
          )}

          {activeTab === 'calculator' && (
            <CropProfitCalculator language={language} />
          )}
        </main>
      </div>
    </div>
  )
}
