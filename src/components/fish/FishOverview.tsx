import React from 'react'
import { Language } from '../../types/farming'
import {
  Fish,
  Activity,
  Wind,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Utensils,
  Bot,
  Sparkles
} from 'lucide-react'

interface FishOverviewProps {
  language: Language
  userName: string
  onNavigateTab: (tab: string) => void
}

export const FishOverview: React.FC<FishOverviewProps> = ({
  language,
  userName,
  onNavigateTab
}) => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner - Clean Human-Designed Light Theme */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-[#d3e5ea] text-stone-900 p-6 sm:p-8 shadow-xs">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f6f8] text-[#0f766e] text-xs font-bold uppercase tracking-wider mb-3 border border-[#c4e6ec]">
            <Fish className="w-3.5 h-3.5" />
            Aquaculture · Fish & Pond Workspace
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0e3b43] tracking-tight leading-tight">
            {language === 'te'
              ? `నమస్తే, ${userName.split(' ')[0]} గారు!`
              : `Welcome Back, ${userName.split(' ')[0]}!`}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
            {language === 'te'
              ? 'మీ 4 చెరువులలో 3 ఆప్టిమల్ స్థాయిలో ఉన్నాయి. చెరువు 2 లో ఉదయం ఫీడింగ్ ట్రేలను సమీక్షించండి.'
              : 'Your 4 pond units are operational. Morning feed check in Pond 2 shows healthy appetite across Rohu and Catla stock.'}
          </p>

          <div className="flex flex-wrap gap-2.5 mt-5">
            <button
              type="button"
              onClick={() => onNavigateTab('assistant')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#0f766e] hover:bg-[#0c5c56] text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
            >
              <Bot className="w-4 h-4 text-teal-200" />
              <span>Ask Aquaculture AI</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('health')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#f0f8fa] hover:bg-[#e2f2f5] border border-[#bcdde4] text-[#0f5b66] font-bold rounded-xl text-xs transition-colors"
            >
              <Activity className="w-4 h-4 text-[#0f766e]" />
              <span>Check Fish Health</span>
            </button>
          </div>
        </div>

        {/* Decorative pond image with subtle fade */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1636028689841-19af5807cba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
            alt="Aquaculture fish pond"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#dfe7e1] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#e2f1f2] text-[#157984] flex items-center justify-center shrink-0">
            <Fish className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Active Ponds
            </span>
            <strong className="text-xl font-display font-extrabold text-[#0e3942]">
              4 Ponds · 5.7 Ha
            </strong>
            <span className="text-[10px] text-[#157984] block">3 Healthy · 1 Under Review</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#dfe7e1] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Total Fish Stock
            </span>
            <strong className="text-xl font-display font-extrabold text-[#0e3942]">
              1,01,400
            </strong>
            <span className="text-[10px] text-stone-600 block">Rohu, Catla, Shrimp</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#dfe7e1] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Today's Feed Ration
            </span>
            <strong className="text-xl font-display font-extrabold text-[#0e3942]">
              305 kg
            </strong>
            <span className="text-[10px] text-emerald-700 block">Morning ration completed</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#dfe7e1] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Avg Daily Gain (ADG)
            </span>
            <strong className="text-xl font-display font-extrabold text-[#0e3942]">
              3.8 g / day
            </strong>
            <span className="text-[10px] text-teal-700 block">DOC 130 · On schedule</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Pond Cards & Quick Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pond Overview */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#dfe7e1] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-display font-bold text-base text-[#0e3942]">
              Pond Status & Aeration (చెరువుల స్థితి)
            </h3>
            <button
              type="button"
              onClick={() => onNavigateTab('ponds')}
              className="text-xs font-bold text-[#157984] hover:text-[#0d4e58]"
            >
              Manage Ponds →
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                name: 'Pond 1: Nursery Carps',
                spec: 'Rohu & Catla Fingerlings (15,000)',
                doVal: '5.4 mg/L',
                status: 'Optimal',
                statusColor: 'bg-[#eef6ef] text-[#26704e]',
                aerator: 'Off'
              },
              {
                name: 'Pond 2: Grow-Out Carps',
                spec: 'Rohu (8,400 fish · 520g avg)',
                doVal: '3.8 mg/L (Dawn Low)',
                status: 'Review Required',
                statusColor: 'bg-[#fff5dd] text-[#886b2d]',
                aerator: 'Running (2 Aerators)'
              },
              {
                name: 'Pond 3: High Density Pangasius',
                spec: 'Pangasius (18,000 fish · 750g)',
                doVal: '4.9 mg/L',
                status: 'Optimal',
                statusColor: 'bg-[#eef6ef] text-[#26704e]',
                aerator: 'Running (1 Aerator)'
              }
            ].map((p, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-stone-200/80 hover:border-teal-300 transition-colors bg-stone-50/50 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#0e3942]">{p.name}</h4>
                    <span className="text-xs text-stone-500">{p.spec}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${p.statusColor}`}>
                    {p.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-200/60 text-stone-600">
                  <span>DO: <strong>{p.doVal}</strong></span>
                  <span className="text-[#157984] font-semibold">Aerators: {p.aerator}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Tools */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-[#dfe7e1] shadow-xs space-y-4">
            <h3 className="font-display font-bold text-base text-[#0e3942] pb-2 border-b border-stone-100">
              Active Aquaculture Tools
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              <button
                type="button"
                onClick={() => onNavigateTab('feeding')}
                className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/60 hover:bg-teal-100/80 text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <strong className="block text-xs text-[#0e3942]">Biomass & Feed Ration Calculator</strong>
                  <span className="text-[11px] text-[#157984]">Compute kg feed by body weight & temp</span>
                </div>
                <Utensils className="w-5 h-5 text-[#157984]" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('health')}
                className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/60 hover:bg-teal-100/80 text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <strong className="block text-xs text-[#0e3942]">Fish Health Diagnostic</strong>
                  <span className="text-[11px] text-[#157984]">Check ulcers, gill rot, fin rot symptoms</span>
                </div>
                <Activity className="w-5 h-5 text-[#157984]" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('growth')}
                className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/60 hover:bg-teal-100/80 text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <strong className="block text-xs text-[#0e3942]">Fish Growth Monitoring</strong>
                  <span className="text-[11px] text-[#157984]">Biometric curve & Average Daily Gain</span>
                </div>
                <TrendingUp className="w-5 h-5 text-[#157984]" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('ponds')}
                className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/60 hover:bg-teal-100/80 text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <strong className="block text-xs text-[#0e3942]">Pond Management Hub</strong>
                  <span className="text-[11px] text-[#157984]">Aerator control & daily checklist</span>
                </div>
                <Fish className="w-5 h-5 text-[#157984]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
