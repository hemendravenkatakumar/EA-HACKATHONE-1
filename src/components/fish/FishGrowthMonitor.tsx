import React, { useState } from 'react'
import { Language } from '../../types/farming'
import {
  TrendingUp,
  Scale,
  Calendar,
  Activity,
  Plus,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

interface FishGrowthMonitorProps {
  language: Language
}

export const FishGrowthMonitor: React.FC<FishGrowthMonitorProps> = ({ language }) => {
  const [stockingDate, setStockingDate] = useState('2026-06-15')
  const [initialWeight, setInitialWeight] = useState(25) // grams (fingerling)
  const [currentWeight, setCurrentWeight] = useState(520) // grams
  const [daysOfCulture, setDaysOfCulture] = useState(130) // DOC

  // Sample sampling points for SVG Chart
  const growthPoints = [
    { month: 'Month 1', doc: 30, target: 80, actual: 75 },
    { month: 'Month 2', doc: 60, target: 180, actual: 195 },
    { month: 'Month 3', doc: 90, target: 320, actual: 340 },
    { month: 'Month 4', doc: 120, target: 480, actual: 490 },
    { month: 'Current (DOC 130)', doc: 130, target: 540, actual: 520 },
    { month: 'Harvest Goal', doc: 180, target: 850, actual: null }
  ]

  // Average Daily Gain (ADG) in grams/day
  const adg = ((currentWeight - initialWeight) / Math.max(1, daysOfCulture)).toFixed(2)

  return (
    <div className="space-y-6">
      {/* Header - Light Design */}
      <div className="bg-white border border-[#d2e8ed] rounded-3xl p-6 sm:p-8 shadow-xs">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f6f8] text-[#0f766e] text-xs font-bold uppercase tracking-wider mb-2 border border-[#c4e6ec]">
          <TrendingUp className="w-3.5 h-3.5" />
          Growth Kinetics & Biometrics
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0f3d45]">
          {language === 'te' ? 'చేపల పెరుగుదల పర్యవేక్షణ' : 'Fish Growth Monitoring & Sampling'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
          {language === 'te'
            ? 'నెలవారీ శాంప్లింగ్ బరువులు, సగటు రోజువారీ పెరుగుదల (ADG) మరియు టార్గెట్ ఎదుగుదల చార్ట్.'
            : 'Track actual biometric sampling data against standard Asian carp growth curves to forecast harvest date.'}
        </p>
      </div>

      {/* KPI Biometric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-teal-100 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Days of Culture (DOC)
          </span>
          <strong className="text-2xl font-display font-extrabold text-teal-950 mt-1 block">
            {daysOfCulture} Days
          </strong>
          <span className="text-[10px] text-teal-700">Stocked: {stockingDate}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-teal-100 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Current Avg Weight
          </span>
          <strong className="text-2xl font-display font-extrabold text-teal-950 mt-1 block">
            {currentWeight} g
          </strong>
          <span className="text-[10px] text-emerald-700">Initial: {initialWeight}g fingerling</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-teal-100 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Avg Daily Gain (ADG)
          </span>
          <strong className="text-2xl font-display font-extrabold text-teal-950 mt-1 block">
            {adg} g / day
          </strong>
          <span className="text-[10px] text-emerald-700">Healthy carp trajectory</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-teal-100 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Target Harvest Size
          </span>
          <strong className="text-2xl font-display font-extrabold text-teal-950 mt-1 block">
            1.0 - 1.2 kg
          </strong>
          <span className="text-[10px] text-stone-500">Expected in 50 days</span>
        </div>
      </div>

      {/* Growth Chart Section */}
      <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-100 gap-2">
          <div>
            <h3 className="font-display font-bold text-base text-teal-950">
              Growth Curve: Actual Sampling vs Target Trajectory
            </h3>
            <p className="text-xs text-stone-500">Weight in Grams over Days of Culture (DOC)</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-teal-700">
              <span className="w-3 h-3 rounded-full bg-teal-600" />
              Actual Sampled
            </span>
            <span className="flex items-center gap-1.5 text-stone-400">
              <span className="w-3 h-0.5 bg-stone-400" />
              Target Curve
            </span>
          </div>
        </div>

        {/* SVG Interactive Visual Chart */}
        <div className="py-4">
          <div className="grid grid-cols-6 gap-2 text-center text-xs">
            {growthPoints.map((pt, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-[11px] font-bold text-stone-700">{pt.month}</span>
                <span className="text-[10px] text-stone-400 mb-2">DOC {pt.doc}</span>

                <div className="h-44 w-full flex items-end justify-center gap-2 bg-stone-50/70 rounded-xl p-2 border border-stone-100">
                  {/* Target Bar */}
                  <div
                    className="w-3 bg-stone-300 rounded-t-sm"
                    style={{ height: `${(pt.target / 850) * 100}%` }}
                    title={`Target: ${pt.target}g`}
                  />
                  {/* Actual Bar */}
                  {pt.actual !== null && (
                    <div
                      className="w-4 bg-teal-600 rounded-t-sm shadow-xs"
                      style={{ height: `${(pt.actual / 850) * 100}%` }}
                      title={`Actual: ${pt.actual}g`}
                    />
                  )}
                </div>

                <div className="mt-2 text-xs font-bold text-teal-950">
                  {pt.actual ? `${pt.actual}g` : `Goal: ${pt.target}g`}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-200 text-xs text-teal-950 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
          <span>
            Current growth tracking indicates your Rohu stock is <strong>on schedule</strong>. Next mandatory net cast sampling scheduled for Nov 10, 2026.
          </span>
        </div>
      </div>
    </div>
  )
}
