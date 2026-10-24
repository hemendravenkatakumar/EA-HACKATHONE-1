import React, { useState, useMemo } from 'react'
import { Language } from '../../types/farming'
import {
  Fish,
  Utensils,
  Scale,
  Clock,
  Sparkles,
  Info,
  Calendar,
  AlertCircle
} from 'lucide-react'

interface FishFeedingAdvisorProps {
  language: Language
}

export const FishFeedingAdvisor: React.FC<FishFeedingAdvisorProps> = ({ language }) => {
  const [species, setSpecies] = useState('Rohu (లబేయో రోహిత)')
  const [stockedCount, setStockedCount] = useState(8000)
  const [avgWeightGrams, setAvgWeightGrams] = useState(450) // grams
  const [waterTemp, setWaterTemp] = useState(28) // °C
  const [feedType, setFeedType] = useState('Floating Extruded Pellet (28% Protein)')

  // Calculations
  const biomassData = useMemo(() => {
    const totalFish = Math.max(100, stockedCount)
    const avgKg = Math.max(0.01, avgWeightGrams / 1000)
    const totalBiomassKg = Math.round(totalFish * avgKg)

    // Feed rate % based on fish size and water temp
    let feedRatePct = 2.5
    if (avgWeightGrams < 50) feedRatePct = 5.0
    else if (avgWeightGrams < 200) feedRatePct = 3.5
    else if (avgWeightGrams < 600) feedRatePct = 2.5
    else feedRatePct = 1.8

    // Temperature correction factor
    if (waterTemp < 22 || waterTemp > 34) feedRatePct *= 0.7

    const dailyFeedKg = Math.round(totalBiomassKg * (feedRatePct / 100))
    const morningFeedKg = Math.round(dailyFeedKg * 0.5)
    const eveningFeedKg = dailyFeedKg - morningFeedKg

    let pelletSize = '2.0 mm Floating'
    if (avgWeightGrams < 30) pelletSize = '0.8 - 1.2 mm Crumble'
    else if (avgWeightGrams < 150) pelletSize = '1.8 mm Pellet'
    else if (avgWeightGrams < 500) pelletSize = '2.5 - 3.0 mm Pellet'
    else pelletSize = '4.0 mm Large Pellet'

    return {
      totalBiomassKg,
      feedRatePct,
      dailyFeedKg,
      morningFeedKg,
      eveningFeedKg,
      pelletSize
    }
  }, [stockedCount, avgWeightGrams, waterTemp])

  return (
    <div className="space-y-6">
      {/* Header - Light Design */}
      <div className="bg-white border border-[#d2e8ed] rounded-3xl p-6 sm:p-8 shadow-xs">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f6f8] text-[#0f766e] text-xs font-bold uppercase tracking-wider mb-2 border border-[#c4e6ec]">
          <Utensils className="w-3.5 h-3.5" />
          Precision Nutrition
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0f3d45]">
          {language === 'te' ? 'చేపల మేత ప్రణాళిక & బయోమాస్ కాలిక్యులేటర్' : 'Fish Feeding & Biomass Rationing'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
          {language === 'te'
            ? 'చేప రకం, ప్రస్తుత బరువు మరియు చెరువు జనాభా ఆధారంగా రోజూ ఎంత మేత వేయాలి, పెల్లెట్ సైజు మరియు వేళలను నిర్ణయించండి.'
            : 'Optimize Feed Conversion Ratio (FCR) by computing exact biomass weight, daily ration percentage, and dawn/dusk feeding schedules.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Column */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-teal-100 shadow-xs space-y-4">
          <h3 className="font-display font-bold text-base text-teal-950 pb-2 border-b border-teal-100">
            Pond Stocking Parameters
          </h3>

          <div>
            <label className="block text-xs font-bold text-teal-950 mb-1">
              Fish Species (చేప రకం):
            </label>
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-teal-950 focus:outline-hidden"
            >
              <option>Rohu (లబేయో రోహిత)</option>
              <option>Catla (కట్ల - ఉపరితల చేప)</option>
              <option>Pangasius (పంకాస్ / పిల్లిచేప)</option>
              <option>Tilapia (గిఫ్ట్ తిలాపియా)</option>
              <option>Vannamei Shrimp (రొయ్యలు)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-teal-950 mb-1">
              Estimated Fish Population (మొత్తం చేపల సంఖ్య):
            </label>
            <input
              type="number"
              step="500"
              value={stockedCount}
              onChange={(e) => setStockedCount(Number(e.target.value))}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-teal-950 focus:outline-hidden"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-teal-950">
                Average Sample Body Weight (సగటు బరువు):
              </label>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                {avgWeightGrams} Grams
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="2000"
              step="10"
              value={avgWeightGrams}
              onChange={(e) => setAvgWeightGrams(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-teal-950 mb-1">
              Pond Water Temperature (°C):
            </label>
            <input
              type="number"
              value={waterTemp}
              onChange={(e) => setWaterTemp(Number(e.target.value))}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-teal-950 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-teal-950 mb-1">
              Feed Formulation (మేత రకం):
            </label>
            <select
              value={feedType}
              onChange={(e) => setFeedType(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-teal-950 focus:outline-hidden"
            >
              <option>Floating Extruded Pellet (28% Protein)</option>
              <option>High-Protein Floating (32% Protein)</option>
              <option>Sinking Mash / Sinking Pellets (24% Protein)</option>
              <option>Traditional Rice Bran + Mustard Oil Cake (1:1)</option>
            </select>
          </div>
        </div>

        {/* Right Output Recommendations */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-teal-100">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Recommended Daily Feeding Protocol
                </span>
                <h3 className="font-display font-extrabold text-xl text-teal-950">
                  {species.split('(')[0]} · {avgWeightGrams}g Average
                </h3>
              </div>
              <span className="px-3 py-1 bg-teal-100 text-teal-900 border border-teal-200 rounded-full text-xs font-bold">
                {biomassData.feedRatePct.toFixed(1)}% Body Weight
              </span>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 bg-teal-50/70 border border-teal-200 rounded-xl text-center">
                <span className="block text-[11px] font-bold text-teal-800 uppercase">Total Biomass</span>
                <strong className="block text-lg font-extrabold text-teal-950 mt-1">
                  {biomassData.totalBiomassKg.toLocaleString('en-IN')} kg
                </strong>
                <span className="text-[10px] text-teal-700">In pond water</span>
              </div>
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center">
                <span className="block text-[11px] font-bold text-emerald-800 uppercase">Daily Feed Ration</span>
                <strong className="block text-lg font-extrabold text-emerald-950 mt-1">
                  {biomassData.dailyFeedKg} kg
                </strong>
                <span className="text-[10px] text-emerald-700">Per 24 hours</span>
              </div>
              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-center">
                <span className="block text-[11px] font-bold text-blue-800 uppercase">Pellet Size</span>
                <strong className="block text-sm font-extrabold text-blue-950 mt-1">
                  {biomassData.pelletSize}
                </strong>
                <span className="text-[10px] text-blue-700">Floating Feed</span>
              </div>
            </div>

            {/* Feeding Schedule Breakdown */}
            <div className="p-4 rounded-xl bg-teal-900 text-teal-100 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-300" />
                Daily Feeding Schedule:
              </h4>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-white/10 rounded-xl">
                  <span className="block text-xs font-bold text-teal-200">Morning Session (8:30 AM)</span>
                  <strong className="text-lg text-white font-extrabold">{biomassData.morningFeedKg} kg</strong>
                  <span className="block text-[10px] text-teal-300/80">Wait until dissolved oxygen rises</span>
                </div>
                <div className="p-3 bg-white/10 rounded-xl">
                  <span className="block text-xs font-bold text-teal-200">Evening Session (4:30 PM)</span>
                  <strong className="text-lg text-white font-extrabold">{biomassData.eveningFeedKg} kg</strong>
                  <span className="block text-[10px] text-teal-300/80">Check check-tray 2 hours after</span>
                </div>
              </div>
            </div>

            {/* Check-Tray Best Practice */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-1">
              <strong className="font-bold text-stone-900 block">Check-Tray Inspection Rule:</strong>
              Place 2 feed check-trays per pond. If feed remains unconsumed after 2 hours, reduce the subsequent feeding ration by 20% to prevent un-ionized ammonia buildup and bottom sludge fermentation.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
