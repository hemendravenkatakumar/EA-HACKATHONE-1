import React, { useState } from 'react'
import { Language, FarmType } from '../../types/farming'
import { FishOverview } from './FishOverview'
import { FishHealthDetector } from './FishHealthDetector'
import { FishFeedingAdvisor } from './FishFeedingAdvisor'
import { FishGrowthMonitor } from './FishGrowthMonitor'
import { PondManager } from './PondManager'
import { CropSchemesDirectory } from '../crop/CropSchemesDirectory'
import { CropTechLibrary } from '../crop/CropTechLibrary'
import { CropVideoLibrary } from '../crop/CropVideoLibrary'
import { ChatAssistant } from '../assistant/ChatAssistant'
import { LanguageToggle } from '../common/LanguageToggle'
import {
  Fish,
  LayoutDashboard,
  Bot,
  Activity,
  Utensils,
  TrendingUp,
  Landmark,
  LogOut,
  Wheat,
  Menu,
  X,
  Sprout,
  Cpu,
  Video
} from 'lucide-react'

interface FishDashboardProps {
  language: Language
  userName: string
  onLanguageChange: (lang: Language) => void
  onSwitchFarmType: (type: FarmType) => void
  onLogout: () => void
}

export const FishDashboard: React.FC<FishDashboardProps> = ({
  language,
  userName,
  onLanguageChange,
  onSwitchFarmType,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Approved aquaculture modules (Pond Water Quality and Fish Feed Cost & Profit removed as requested)
  const navItems = [
    { id: 'overview', labelEn: 'Aquaculture Overview', labelTe: 'చెరువుల సమీక్ష', icon: LayoutDashboard },
    { id: 'assistant', labelEn: 'AI Aqua Assistant', labelTe: 'ఆక్వా AI అసిస్టెంట్', icon: Bot, highlight: true },
    { id: 'health', labelEn: 'Fish Health Assistance', labelTe: 'చేపల ఆరోగ్య విశ్లేషణ', icon: Activity },
    { id: 'feeding', labelEn: 'Feeding Recommendations', labelTe: 'మేత ప్రణాళిక', icon: Utensils },
    { id: 'growth', labelEn: 'Fish Growth Monitoring', labelTe: 'పెరుగుదల పర్యవేక్షణ', icon: TrendingUp },
    { id: 'ponds', labelEn: 'Pond Management Hub', labelTe: 'చెరువుల నిర్వహణ', icon: Fish },
    { id: 'schemes', labelEn: 'Fisheries PMMSY Schemes', labelTe: 'మత్స్య సంపద పథకాలు', icon: Landmark },
    { id: 'tech', labelEn: 'Aeration & RAS Tech', labelTe: 'ఆక్వా సాంకేతికత', icon: Cpu },
    { id: 'videos', labelEn: 'Aquaculture Tutorials', labelTe: 'ఆక్వా వీడియోలు', icon: Video }
  ]

  const activeItem = navItems.find((n) => n.id === activeTab) || navItems[0]

  return (
    <div className="min-h-screen bg-[#f4f8fa] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white text-stone-700 border-r border-[#dde9ed] flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand & Workspace Pill */}
          <div className="p-5 border-b border-[#e5eef2] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0f766e] flex items-center justify-center text-white shadow-sm">
                  <Fish className="w-5 h-5 text-teal-100" />
                </div>
                <div>
                  <span className="font-display font-black text-lg text-[#0f3d45] tracking-tight">
                    AgroVoice <span className="text-[#0d9488]">Aqua</span>
                  </span>
                  <span className="block text-[10px] text-stone-500 font-medium">Smart Aquaculture Hub</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="md:hidden p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Workspace Identifier */}
            <div className="p-3 bg-[#f0f8fa] rounded-xl border border-[#d2e8ed] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#0f766e]/15 text-[#0f766e] flex items-center justify-center">
                  <Fish className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#0f766e] uppercase tracking-wider">
                    Workspace
                  </span>
                  <strong className="block text-xs text-[#0f3d45]">Aquaculture / Ponds</strong>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onSwitchFarmType('crop')}
                className="text-[10px] text-[#1b6845] hover:text-[#124b31] font-bold bg-[#e8f6ed] hover:bg-[#d8eedf] px-2.5 py-1 rounded-md border border-[#c0e4ce] transition-colors"
                title="Switch to Crop Agriculture"
              >
                Crop →
              </button>
            </div>
          </div>

          {/* Navigation Links List */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
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
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#e6f4f6] text-[#0d5864] font-bold shadow-2xs border-l-4 border-[#0f766e]'
                      : 'text-stone-600 hover:bg-[#f0f7f8] hover:text-[#0b4d58]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0f766e]' : 'text-stone-400'}`} />
                  <span className="truncate">
                    {language === 'te' ? item.labelTe : item.labelEn}
                  </span>
                  {item.highlight && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-[#0d9488] animate-pulse" />
                  )}
                </button>
              )
            })}
          </nav>

          {/* User Profile & Logout Bottom */}
          <div className="p-4 border-t border-[#e2ecf0] bg-[#f9fcfe] space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0f766e] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {userName.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <strong className="block text-xs text-[#0f3d45] truncate">{userName}</strong>
                <span className="text-[10px] text-stone-500 truncate block">Fish Farmer</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs text-stone-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-stone-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out to Home</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#dde9ed] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-stone-700 hover:bg-stone-100 rounded-xl"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f766e]">
                  Aquaculture Workspace
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-[10px] font-bold bg-[#fff8eb] text-[#8a6519] border border-[#f4e2bb] px-2 py-0.5 rounded-full">
                  DEMO DATA
                </span>
              </div>
              <h1 className="font-display font-extrabold text-lg sm:text-xl text-[#0f3d45] leading-tight">
                {language === 'te' ? activeItem.labelTe : activeItem.labelEn}
              </h1>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* 1-Click Role Switcher */}
            <button
              type="button"
              onClick={() => onSwitchFarmType('crop')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#eaf4ec] hover:bg-[#d6ecda] border border-emerald-200 text-[#21704d] font-bold rounded-xl text-xs transition-colors shadow-2xs"
              title="Open Normal Agriculture (Crop Farming) Workspace"
            >
              <Wheat className="w-3.5 h-3.5 text-[#24704f]" />
              <span>Switch to Crop Farming</span>
            </button>

            <LanguageToggle language={language} onToggle={onLanguageChange} />
          </div>
        </header>

        {/* Tab Content Display */}
        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto flex-1">
          {activeTab === 'overview' && (
            <FishOverview
              language={language}
              userName={userName}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'assistant' && (
            <div className="h-[76vh]">
              <ChatAssistant
                farmType="fish"
                language={language}
                onLanguageChange={onLanguageChange}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onSwitchFarmType={onSwitchFarmType}
              />
            </div>
          )}

          {activeTab === 'health' && (
            <FishHealthDetector language={language} />
          )}

          {activeTab === 'feeding' && (
            <FishFeedingAdvisor language={language} />
          )}

          {activeTab === 'growth' && (
            <FishGrowthMonitor language={language} />
          )}

          {activeTab === 'ponds' && (
            <PondManager
              language={language}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'schemes' && (
            <CropSchemesDirectory language={language} defaultTarget="fish" />
          )}

          {activeTab === 'tech' && (
            <CropTechLibrary language={language} defaultTarget="fish" />
          )}

          {activeTab === 'videos' && (
            <CropVideoLibrary language={language} defaultCategory="aquaculture" />
          )}
        </main>
      </div>
    </div>
  )
}
