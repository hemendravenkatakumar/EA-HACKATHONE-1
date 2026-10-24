import React, { useState, useMemo } from 'react'
import { Language } from '../../types/farming'
import { calculateFishProfit, FishProfitInput } from '../../utils/calculators'
import {
  Calculator,
  Fish,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  RotateCcw,
  Sparkles,
  PieChart
} from 'lucide-react'

interface FishProfitCalculatorProps {
  language: Language
}

export const FishProfitCalculator: React.FC<FishProfitCalculatorProps> = ({ language }) => {
  const [formData, setFormData] = useState<FishProfitInput>({
    speciesName: 'Rohu (లబేయో రోహిత)',
    stockedCount: 10000,
    survivalRatePercent: 82, // 82%
    averageHarvestWeightKg: 1.1, // 1.1 kg
    sellingPricePerKg: 145, // ₹/kg
    fingerlingsCost: 35000,
    feedCost: 480000,
    electricityDieselCost: 55000,
    laborSecurityCost: 45000,
    probioticsMedicineCost: 28000,
    pondLeaseMaintenanceCost: 40000
  })

  const results = useMemo(() => calculateFishProfit(formData), [formData])

  const handleChange = (field: keyof FishProfitInput, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: typeof value === 'number' ? value : isNaN(Number(value)) ? value : Number(value)
    }))
  }

  const handleReset = () => {
    setFormData({
      speciesName: 'Rohu (లబేయో రోహిత)',
      stockedCount: 10000,
      survivalRatePercent: 82,
      averageHarvestWeightKg: 1.1,
      sellingPricePerKg: 145,
      fingerlingsCost: 35000,
      feedCost: 480000,
      electricityDieselCost: 55000,
      laborSecurityCost: 45000,
      probioticsMedicineCost: 28000,
      pondLeaseMaintenanceCost: 40000
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-cyan-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-700/60 text-teal-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              Aquaculture Economics
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              {language === 'te' ? 'చేపల పెంపకం లాభ నష్టాల కాలిక్యులేటర్' : 'Fish Feed Cost & Profit Estimator'}
            </h2>
            <p className="text-xs sm:text-sm text-teal-200/90 mt-1 max-w-xl">
              {language === 'te'
                ? 'స్టాక్ చేసిన చేపలు, బ్రతికిన శాతం, మేత ఖర్చులు మరియు మార్కెట్ ధరను నమోదు చేసి నికర ఆదాయాన్ని గణించండి.'
                : 'Interactive harvest forecasting: Calculate surviving stock, total harvest tonnage, Feed Conversion Ratio (FCR), and net aquaculture profitability.'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="self-start sm:self-center px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Values</span>
          </button>
        </div>
      </div>

      {/* Prototype Notice */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-900">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Simulated Commercial Estimate:</strong> Feed prices and farm-gate fish rates vary across local mandis (e.g. Bhimavaram, Eluru, Howrah).
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-teal-100 shadow-xs space-y-4">
          <h3 className="font-display font-bold text-base text-teal-950 pb-2 border-b border-teal-100">
            1. Stocking & Production Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-teal-950 mb-1">Species Name:</label>
              <select
                value={formData.speciesName}
                onChange={(e) => handleChange('speciesName', e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-teal-950 focus:outline-hidden"
              >
                <option>Rohu (లబేయో రోహిత)</option>
                <option>Catla (కట్ల)</option>
                <option>Pangasius (పంకాస్)</option>
                <option>Tilapia (గిఫ్ట్ తిలాపియా)</option>
                <option>Vannamei Shrimp (రొయ్యలు)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-teal-950 mb-1">
                Stocked Count (చేప పిల్లల సంఖ్య):
              </label>
              <input
                type="number"
                min="500"
                step="500"
                value={formData.stockedCount}
                onChange={(e) => handleChange('stockedCount', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-teal-950 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-teal-950 mb-1">
                Expected Survival Rate (%):
              </label>
              <input
                type="number"
                min="40"
                max="98"
                value={formData.survivalRatePercent}
                onChange={(e) => handleChange('survivalRatePercent', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-teal-950 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-teal-950 mb-1">
                Average Harvest Weight (kg):
              </label>
              <input
                type="number"
                step="0.1"
                min="0.2"
                max="5.0"
                value={formData.averageHarvestWeightKg}
                onChange={(e) => handleChange('averageHarvestWeightKg', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-teal-950 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-teal-950 mb-1">
                Selling Price (₹ / kg):
              </label>
              <input
                type="number"
                min="50"
                step="5"
                value={formData.sellingPricePerKg}
                onChange={(e) => handleChange('sellingPricePerKg', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-teal-950 focus:outline-hidden"
              />
            </div>
          </div>

          <h3 className="font-display font-bold text-base text-teal-950 pt-2 pb-2 border-b border-teal-100">
            2. Operating & Feed Expenses (ఖర్చులు - ₹)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Fingerling / Seed Cost (పిల్లల ఖర్చు):
              </label>
              <input
                type="number"
                value={formData.fingerlingsCost}
                onChange={(e) => handleChange('fingerlingsCost', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Commercial Feed Cost (మేత ఖర్చు):
              </label>
              <input
                type="number"
                value={formData.feedCost}
                onChange={(e) => handleChange('feedCost', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Aerator Electricity & Diesel (విద్యుత్):
              </label>
              <input
                type="number"
                value={formData.electricityDieselCost}
                onChange={(e) => handleChange('electricityDieselCost', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Labor & Watchman Wages (కూలీలు):
              </label>
              <input
                type="number"
                value={formData.laborSecurityCost}
                onChange={(e) => handleChange('laborSecurityCost', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Probiotics, Lime & Medicines (మందులు):
              </label>
              <input
                type="number"
                value={formData.probioticsMedicineCost}
                onChange={(e) => handleChange('probioticsMedicineCost', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Pond Lease & Dike Repairs (లీజు):
              </label>
              <input
                type="number"
                value={formData.pondLeaseMaintenanceCost}
                onChange={(e) => handleChange('pondLeaseMaintenanceCost', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Right Output Results Cards */}
        <div className="lg:col-span-6 space-y-4">
          <div
            className={`p-6 rounded-3xl text-white shadow-md transition-all ${
              results.isProfit
                ? 'bg-gradient-to-br from-teal-800 via-teal-900 to-cyan-950'
                : 'bg-gradient-to-br from-red-900 via-red-950 to-stone-950'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-200">
                Net Aquaculture Profit
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                  results.isProfit ? 'bg-emerald-400/20 text-emerald-300' : 'bg-red-400/20 text-red-300'
                }`}
              >
                {results.isProfit ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {results.isProfit ? 'Profitable Harvest' : 'Deficit'}
              </span>
            </div>

            <div className="my-5">
              <span className="text-xs text-teal-300/80 font-medium">Estimated Net Return:</span>
              <div className="text-4xl sm:text-5xl font-display font-black tracking-tight text-white mt-1">
                ₹{results.netProfit.toLocaleString('en-IN')}
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-teal-200/90">
                <span>
                  Profit / kg: <strong>₹{Math.round(results.profitPerKg)}</strong>
                </span>
                <span>•</span>
                <span>
                  ROI: <strong>{results.roiPercentage.toFixed(1)}%</strong>
                </span>
                <span>•</span>
                <span>
                  Est. FCR: <strong>{results.estimatedFCR}</strong>
                </span>
              </div>
            </div>

            {/* Financial Overview Metrics */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-black/20 rounded-2xl text-center text-xs">
              <div>
                <span className="text-[10px] text-teal-300/70 block">Harvest Biomass</span>
                <strong className="text-sm font-bold">
                  {(results.totalBiomassHarvestedKg / 1000).toFixed(1)} Tonnes
                </strong>
                <span className="text-[10px] text-teal-300/60">{results.survivingFishCount.toLocaleString('en-IN')} fish</span>
              </div>
              <div>
                <span className="text-[10px] text-teal-300/70 block">Gross Revenue</span>
                <strong className="text-sm font-bold">
                  ₹{results.grossRevenue.toLocaleString('en-IN')}
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-teal-300/70 block">Total Expenses</span>
                <strong className="text-sm font-bold">
                  ₹{results.totalOperatingCosts.toLocaleString('en-IN')}
                </strong>
              </div>
            </div>
          </div>

          {/* Quick Economics Note */}
          <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-xs space-y-3 text-xs text-stone-700">
            <h4 className="font-display font-bold text-sm text-teal-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Feed Conversion Ratio (FCR) Rule of Thumb
            </h4>
            <p className="leading-relaxed">
              Feed accounts for <strong>60-70%</strong> of commercial aquaculture production costs. An FCR below 1.5 indicates exceptional nutrition management. Regular sampling and zero feed wastage in feeding trays ensures maximum profit margin per kilogram.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
