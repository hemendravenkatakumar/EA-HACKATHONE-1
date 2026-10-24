import React, { useState, useMemo } from 'react'
import { Language } from '../../types/farming'
import { evaluateWaterQuality } from '../../utils/calculators'
import {
  Droplets,
  Activity,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react'

interface WaterQualityTesterProps {
  language: Language
}

export const WaterQualityTester: React.FC<WaterQualityTesterProps> = ({ language }) => {
  const [ph, setPh] = useState(7.6)
  const [dissolvedOxygen, setDissolvedOxygen] = useState(5.2) // mg/L
  const [temperature, setTemperature] = useState(28) // °C
  const [ammonia, setAmmonia] = useState(0.02) // mg/L
  const [alkalinity, setAlkalinity] = useState(140) // mg/L
  const [selectedPond, setSelectedPond] = useState('Pond 2 · Carp Grow-out (2.0 Ha)')

  const evaluation = useMemo(
    () => evaluateWaterQuality({ ph, dissolvedOxygen, temperature, ammonia, alkalinity }),
    [ph, dissolvedOxygen, temperature, ammonia, alkalinity]
  )

  const handlePreset = (preset: 'optimal' | 'lowDO' | 'highAmmonia') => {
    if (preset === 'optimal') {
      setPh(7.6)
      setDissolvedOxygen(5.4)
      setTemperature(28)
      setAmmonia(0.02)
      setAlkalinity(140)
    } else if (preset === 'lowDO') {
      setPh(7.2)
      setDissolvedOxygen(2.8)
      setTemperature(31)
      setAmmonia(0.04)
      setAlkalinity(110)
    } else if (preset === 'highAmmonia') {
      setPh(8.5)
      setDissolvedOxygen(4.1)
      setTemperature(29)
      setAmmonia(0.14)
      setAlkalinity(160)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-cyan-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-700/60 text-teal-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Activity className="w-3.5 h-3.5" />
              Pond Limnology Lab
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              {language === 'te' ? 'నీటి నాణ్యత తనిఖీ & విశ్లేషణ' : 'Pond Water Quality Assessment'}
            </h2>
            <p className="text-xs sm:text-sm text-teal-200/90 mt-1 max-w-xl">
              {language === 'te'
                ? 'pH, కరిగిన ఆక్సిజన్ (DO), అమ్మోనియా మరియు ఉష్ణోగ్రత రీడింగ్‌లను నమోదు చేయండి. తక్షణ భద్రతా విశ్లేషణ మరియు నివారణ సలహాలు పొందండి.'
                : 'Validate critical chemical parameters for freshwater carps and shrimp ponds with automatic risk flags and corrective protocols.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handlePreset('optimal')}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-colors"
            >
              Preset: Normal
            </button>
            <button
              type="button"
              onClick={() => handlePreset('lowDO')}
              className="px-3 py-1.5 rounded-xl bg-red-500/30 hover:bg-red-500/40 border border-red-300/40 text-xs font-bold text-red-200 transition-colors"
            >
              Preset: Low DO (Dawn)
            </button>
            <button
              type="button"
              onClick={() => handlePreset('highAmmonia')}
              className="px-3 py-1.5 rounded-xl bg-amber-500/30 hover:bg-amber-500/40 border border-amber-300/40 text-xs font-bold text-amber-200 transition-colors"
            >
              Preset: High Ammonia
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Parameter Inputs + Realtime Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Column */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-teal-100 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-teal-100">
            <h3 className="font-display font-bold text-base text-teal-950">
              Pond Sample Readings
            </h3>
            <select
              value={selectedPond}
              onChange={(e) => setSelectedPond(e.target.value)}
              className="px-2.5 py-1 bg-teal-50 border border-teal-200 text-teal-900 rounded-lg text-xs font-semibold"
            >
              <option>Pond 1 · Nursery (1.0 Ha)</option>
              <option>Pond 2 · Carp Grow-out (2.0 Ha)</option>
              <option>Pond 3 · Pangasius (1.5 Ha)</option>
              <option>Pond 4 · Vannamei Shrimp (1.2 Ha)</option>
            </select>
          </div>

          {/* pH Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-teal-950">Water pH (ఆమ్ల / క్షార స్థాయి):</span>
              <span className={`px-2 py-0.5 rounded-md font-mono ${
                ph >= 7.2 && ph <= 8.5 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}>
                {ph.toFixed(1)} pH
              </span>
            </div>
            <input
              type="range"
              min="5.5"
              max="10.0"
              step="0.1"
              value={ph}
              onChange={(e) => setPh(parseFloat(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span>5.5 (Acidic)</span>
              <span className="text-emerald-700 font-bold">7.5 - 8.5 (Ideal)</span>
              <span>10.0 (Alkaline)</span>
            </div>
          </div>

          {/* Dissolved Oxygen */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-teal-950">Dissolved Oxygen - DO (కరిగిన ఆక్సిజన్):</span>
              <span className={`px-2 py-0.5 rounded-md font-mono ${
                dissolvedOxygen >= 4.5 ? 'bg-emerald-100 text-emerald-800' : dissolvedOxygen >= 3.2 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
              }`}>
                {dissolvedOxygen.toFixed(1)} mg/L
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="9.0"
              step="0.1"
              value={dissolvedOxygen}
              onChange={(e) => setDissolvedOxygen(parseFloat(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span className="text-red-600 font-bold">&lt; 3.0 (Lethal Hypoxia)</span>
              <span className="text-emerald-700 font-bold">&gt; 5.0 (Optimal)</span>
              <span>9.0 mg/L</span>
            </div>
          </div>

          {/* Ammonia */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-teal-950">Total Ammonia Nitrogen - TAN (అమ్మోనియా):</span>
              <span className={`px-2 py-0.5 rounded-md font-mono ${
                ammonia <= 0.04 ? 'bg-emerald-100 text-emerald-800' : ammonia <= 0.08 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
              }`}>
                {ammonia.toFixed(2)} mg/L
              </span>
            </div>
            <input
              type="range"
              min="0.00"
              max="0.30"
              step="0.01"
              value={ammonia}
              onChange={(e) => setAmmonia(parseFloat(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span className="text-emerald-700 font-bold">&lt; 0.05 (Safe)</span>
              <span className="text-amber-700">0.08 (Warning)</span>
              <span className="text-red-600 font-bold">&gt; 0.10 (Toxic)</span>
            </div>
          </div>

          {/* Water Temperature & Alkalinity */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-teal-950 mb-1">
                Water Temp (°C):
              </label>
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-teal-950 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-teal-950 mb-1">
                Alkalinity (mg/L):
              </label>
              <input
                type="number"
                value={alkalinity}
                onChange={(e) => setAlkalinity(Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-teal-950 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Right Output Diagnostic Column */}
        <div className="lg:col-span-7 space-y-4">
          {/* Status Gauge Banner */}
          <div
            className={`p-6 rounded-3xl text-white shadow-md transition-all ${
              evaluation.overallStatus === 'Optimal'
                ? 'bg-gradient-to-br from-teal-800 via-teal-900 to-cyan-950'
                : evaluation.overallStatus === 'Caution'
                ? 'bg-gradient-to-br from-amber-700 via-amber-800 to-stone-900'
                : 'bg-gradient-to-br from-red-800 via-red-900 to-stone-950'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-200">
                Pond Water Quality Status
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                  evaluation.overallStatus === 'Optimal'
                    ? 'bg-emerald-400/20 text-emerald-200'
                    : evaluation.overallStatus === 'Caution'
                    ? 'bg-amber-400/20 text-amber-200'
                    : 'bg-red-400/20 text-red-200'
                }`}
              >
                {evaluation.overallStatus === 'Optimal' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                {evaluation.overallStatus} Status
              </span>
            </div>

            <div className="my-4">
              <span className="text-xs text-teal-200/90 font-medium">Evaluation Summary:</span>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl mt-1">
                {evaluation.overallStatus === 'Optimal'
                  ? 'Healthy Water Conditions for Aquaculture'
                  : evaluation.overallStatus === 'Caution'
                  ? 'Sub-Optimal Water Chemistry Detected'
                  : 'Critical Risk: Immediate Pond Action Required!'}
              </h3>
            </div>

            {/* Identified Issues */}
            {evaluation.issues.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <span className="block text-[11px] font-bold text-amber-200 uppercase">
                  Flagged Risks:
                </span>
                {evaluation.issues.map((issue, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs bg-black/20 px-3 py-1.5 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actionable Recommendations */}
          <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-xs space-y-4">
            <h4 className="font-display font-bold text-sm text-teal-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Actionable Treatment & Management Protocol
            </h4>

            <div className="space-y-2.5">
              {evaluation.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 text-xs sm:text-sm text-teal-950 flex items-start gap-2.5 leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-teal-700 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>

            {/* Educational Disclaimer */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 flex items-start gap-2">
              <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <span>
                Accurate water evaluation requires calibrated digital probes or titration kits. Dissolved oxygen fluctuates diurnal (highest at 3 PM due to photosynthesis, lowest at 5 AM due to respiration).
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
