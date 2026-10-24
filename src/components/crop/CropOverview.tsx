import React from 'react'
import { Language } from '../../types/farming'
import {
  Wheat,
  Droplets,
  CloudSun,
  Scan,
  TrendingUp,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Bot
} from 'lucide-react'

interface CropOverviewProps {
  language: Language
  userName: string
  onNavigateTab: (tab: string) => void
}

export const CropOverview: React.FC<CropOverviewProps> = ({
  language,
  userName,
  onNavigateTab
}) => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#174f3c] via-[#1f6a49] to-[#257a54] text-white p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-[#8dd9b5] text-xs font-bold uppercase tracking-wider mb-3">
            <Wheat className="w-3.5 h-3.5" />
            Normal Agriculture · Crop Workspace
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            {language === 'te'
              ? `శుభోదయం, ${userName.split(' ')[0]} గారు!`
              : `Good Morning, ${userName.split(' ')[0]}!`}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
            {language === 'te'
              ? 'మీ వరి మరియు పత్తి పొలాల్లో నేడు 2 పనులు చేయాల్సి ఉంది. వాతావరణం పిచికారీ చేయడానికి అనుకూలంగా ఉంది.'
              : 'Your active plots are in healthy condition. Regional weather is clear for morning foliar spray until 11:30 AM.'}
          </p>

          <div className="flex flex-wrap gap-2.5 mt-5">
            <button
              type="button"
              onClick={() => onNavigateTab('assistant')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-emerald-50 text-[#174f3c] font-bold rounded-xl text-xs transition-colors shadow-sm"
            >
              <Bot className="w-4 h-4 text-[#1f6a49]" />
              <span>Ask Crop Assistant</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('disease')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl text-xs transition-colors"
            >
              <Scan className="w-4 h-4 text-[#8dd9b5]" />
              <span>Diagnose Leaf Disease</span>
            </button>
          </div>
        </div>

        {/* Decorative crop illustration */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-25 pointer-events-none hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
            alt="Paddy field harvest"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#e0e8e2] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#e6f1e8] text-[#2d8159] flex items-center justify-center shrink-0">
            <Wheat className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Cultivated Area
            </span>
            <strong className="text-xl font-display font-extrabold text-[#1e4034]">
              10.0 Acres
            </strong>
            <span className="text-[10px] text-[#2d8159] block">3 Plots · Rice, Cotton, Maize</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e0e8e2] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <CloudSun className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Today's Weather
            </span>
            <strong className="text-xl font-display font-extrabold text-[#1e4034]">
              32°C · Clear
            </strong>
            <span className="text-[10px] text-stone-600 block">25% rain chance · Humid</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e0e8e2] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#e2f1f2] text-[#157984] flex items-center justify-center shrink-0">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Irrigation Status
            </span>
            <strong className="text-xl font-display font-extrabold text-[#1e4034]">
              Optimum
            </strong>
            <span className="text-[10px] text-[#157984] block">Next schedule in 2 days</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e0e8e2] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#e6f1e8] text-[#2d8159] flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Est. Season Profit
            </span>
            <strong className="text-xl font-display font-extrabold text-[#1e4034]">
              ₹1,96,500
            </strong>
            <span className="text-[10px] text-[#2d8159] block">+14% vs previous Kharif</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Plots + Tasks Due */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Plots */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#e0e8e2] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-display font-bold text-base text-[#153d30]">
              Active Crops & Plots (ప్రస్తుత పంటలు)
            </h3>
            <button
              type="button"
              onClick={() => onNavigateTab('calculator')}
              className="text-xs font-bold text-[#2d8159] hover:text-[#18563c]"
            >
              Profit Calculator →
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                crop: 'BPT-5204 (Samba Mahsuri) Paddy',
                plot: 'Plot A · 4.5 Acres',
                stage: 'Panicle Initiation Stage (62 Days)',
                health: 'Good (Healthy)',
                healthColor: 'bg-[#eef6ef] text-[#26704e]',
                nextTask: 'Apply Potash (MOP) top-dress tomorrow morning'
              },
              {
                crop: 'Bt Cotton Hybrid',
                plot: 'Plot B · 3.0 Acres',
                stage: 'Boll Development (85 Days)',
                health: 'Attention (Minor Whitefly)',
                healthColor: 'bg-[#fff5dd] text-[#886b2d]',
                nextTask: 'Install yellow sticky traps @ 15/acre'
              },
              {
                crop: 'Hybrid Maize / Corn',
                plot: 'Plot C · 2.5 Acres',
                stage: 'Knee-high Vegetative (35 Days)',
                health: 'Excellent',
                healthColor: 'bg-[#eef6ef] text-[#26704e]',
                nextTask: 'Irrigate via alternate furrows'
              }
            ].map((plot, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-stone-200/80 hover:border-emerald-300 transition-colors bg-stone-50/50 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#1e4034]">{plot.crop}</h4>
                    <span className="text-xs text-stone-500">{plot.plot}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${plot.healthColor}`}>
                    {plot.health}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-200/60 text-stone-600">
                  <span>Stage: <strong>{plot.stage}</strong></span>
                  <span className="text-[#2d8159] font-semibold">{plot.nextTask}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Scheduled Tasks & Quick Links */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-[#e0e8e2] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-display font-bold text-base text-[#153d30]">
                Field Tasks Due (నేటి పనులు)
              </h3>
              <span className="px-2 py-0.5 bg-[#fff5dd] text-[#886b2d] rounded-md text-[11px] font-bold">
                2 Pending
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-amber-950">
                  <span>Field Soil Check</span>
                  <span className="text-[10px] text-amber-700">Due Today</span>
                </div>
                <p className="text-amber-900 text-[11px]">
                  Plot A (Paddy): Inspect standing water depth before morning.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-950">
                  <span>Whitefly Trap Inspection</span>
                  <span className="text-[10px] text-emerald-700">Due Tomorrow</span>
                </div>
                <p className="text-emerald-900 text-[11px]">
                  Plot B (Cotton): Check sticky trap counts to monitor threshold.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                Quick Shortcuts:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => onNavigateTab('disease')}
                  className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-[#174f3c] text-left transition-colors"
                >
                  Leaf Scanner →
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('weather')}
                  className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-[#174f3c] text-left transition-colors"
                >
                  Weather Alert →
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('schemes')}
                  className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-[#174f3c] text-left transition-colors"
                >
                  Govt Schemes →
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('calculator')}
                  className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-[#174f3c] text-left transition-colors"
                >
                  Profit Tool →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
