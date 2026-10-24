import React, { useState, useMemo } from 'react'
import { Language } from '../../types/farming'
import { calculateCropProfit, CropProfitInput } from '../../utils/calculators'
import {
  Calculator,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  PieChart,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react'

interface CropProfitCalculatorProps {
  language: Language
}

export const CropProfitCalculator: React.FC<CropProfitCalculatorProps> = ({ language }) => {
  const [formData, setFormData] = useState<CropProfitInput>({
    cropName: 'Paddy / Rice (వరి)',
    areaAcres: 3,
    expectedYieldPerAcre: 24, // quintals
    sellingPricePerQuintal: 2320, // ₹ MSP approx
    seedsCost: 4500,
    fertilizerPesticidesCost: 16500,
    machineryDieselCost: 12000,
    laborWagesCost: 21000,
    irrigationPowerCost: 4500,
    transportBaggingCost: 5000,
    otherCosts: 3000
  })

  const results = useMemo(() => calculateCropProfit(formData), [formData])

  const handleChange = (field: keyof CropProfitInput, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: typeof value === 'number' ? value : isNaN(Number(value)) ? value : Number(value)
    }))
  }

  const handleReset = () => {
    setFormData({
      cropName: 'Paddy / Rice (వరి)',
      areaAcres: 3,
      expectedYieldPerAcre: 24,
      sellingPricePerQuintal: 2320,
      seedsCost: 4500,
      fertilizerPesticidesCost: 16500,
      machineryDieselCost: 12000,
      laborWagesCost: 21000,
      irrigationPowerCost: 4500,
      transportBaggingCost: 5000,
      otherCosts: 3000
    })
  }

  // Cost breakdown percentages for progress bars
  const costBreakdown = useMemo(() => {
    const total = results.totalExpenses || 1
    return [
      { label: 'Labor & Weeding', amount: formData.laborWagesCost, pct: Math.round((formData.laborWagesCost / total) * 100), color: 'bg-emerald-600' },
      { label: 'Fertilizers & Sprays', amount: formData.fertilizerPesticidesCost, pct: Math.round((formData.fertilizerPesticidesCost / total) * 100), color: 'bg-amber-500' },
      { label: 'Tractor & Diesel', amount: formData.machineryDieselCost, pct: Math.round((formData.machineryDieselCost / total) * 100), color: 'bg-blue-500' },
      { label: 'Seeds & Nursery', amount: formData.seedsCost, pct: Math.round((formData.seedsCost / total) * 100), color: 'bg-teal-500' },
      { label: 'Irrigation & Power', amount: formData.irrigationPowerCost, pct: Math.round((formData.irrigationPowerCost / total) * 100), color: 'bg-cyan-600' },
      { label: 'Transport & Mandi', amount: formData.transportBaggingCost + formData.otherCosts, pct: Math.round(((formData.transportBaggingCost + formData.otherCosts) / total) * 100), color: 'bg-stone-500' }
    ]
  }, [formData, results.totalExpenses])

  return (
    <div className="space-y-6">
      {/* Header - Light Theme */}
      <div className="bg-white border border-[#dce8e0] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f5ec] text-[#1b6b43] text-xs font-bold uppercase tracking-wider mb-2 border border-[#c5e6d0]">
              <Calculator className="w-3.5 h-3.5" />
              Economic Farm Planning
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#123e2b]">
              {language === 'te' ? 'పంట లాభ నష్టాల కాలిక్యులేటర్' : 'Crop Price & Profit Estimator'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              {language === 'te'
                ? 'మీ విత్తనాలు, ఎరువులు, కూలీలు, డీజిల్ ఖర్చులు మరియు ఆశించిన దిగుబడిని నమోదు చేసి నికర లాభాన్ని అంచనా వేయండి.'
                : 'Calculate total production, gross revenue, comprehensive input expenses, and net profit per acre with real-time reactive calculations.'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="self-start sm:self-center px-4 py-2 bg-[#f4f7f5] hover:bg-[#e8efe9] border border-[#d0ded3] rounded-xl text-xs font-bold text-[#1b6b43] flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Values</span>
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-900">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>User-Entered Estimate Notice:</strong> Prices, yields, and input costs shown are user-defined models, not live regulated mandi rates.
        </span>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs space-y-4">
          <h3 className="font-display font-bold text-base text-emerald-950 pb-2 border-b border-emerald-100">
            1. Crop & Production Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">
                Crop Name (పంట):
              </label>
              <select
                value={formData.cropName}
                onChange={(e) => handleChange('cropName', e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-emerald-950 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              >
                <option>Paddy / Rice (వరి)</option>
                <option>Maize / Corn (మొక్కజొన్న)</option>
                <option>Cotton (పత్తి)</option>
                <option>Chilli (మిర్చి)</option>
                <option>Groundnut (వేరుశనగ)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">
                Cultivated Area (ఎకరాలు):
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={formData.areaAcres}
                onChange={(e) => handleChange('areaAcres', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-emerald-950 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">
                Expected Yield (క్వింటాళ్ళు/ఎకరాకు):
              </label>
              <input
                type="number"
                min="1"
                value={formData.expectedYieldPerAcre}
                onChange={(e) => handleChange('expectedYieldPerAcre', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-emerald-950 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">
                Selling Price (₹ / Quintal):
              </label>
              <input
                type="number"
                min="100"
                step="50"
                value={formData.sellingPricePerQuintal}
                onChange={(e) => handleChange('sellingPricePerQuintal', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-emerald-950 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>
          </div>

          <h3 className="font-display font-bold text-base text-emerald-950 pt-2 pb-2 border-b border-emerald-100">
            2. Operational Cost Breakdown (ఖర్చులు - ₹)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Seeds & Nursery Cost (విత్తనాలు):
              </label>
              <input
                type="number"
                value={formData.seedsCost}
                onChange={(e) => handleChange('seedsCost', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Fertilizers & Pesticides (ఎరువులు/మందులు):
              </label>
              <input
                type="number"
                value={formData.fertilizerPesticidesCost}
                onChange={(e) => handleChange('fertilizerPesticidesCost', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Tractor, Diesel & Machinery (ట్రాక్టర్):
              </label>
              <input
                type="number"
                value={formData.machineryDieselCost}
                onChange={(e) => handleChange('machineryDieselCost', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Labor & Weeding Wages (కూలీల ఖర్చు):
              </label>
              <input
                type="number"
                value={formData.laborWagesCost}
                onChange={(e) => handleChange('laborWagesCost', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Irrigation & Electricity (విద్యుత్/నీరు):
              </label>
              <input
                type="number"
                value={formData.irrigationPowerCost}
                onChange={(e) => handleChange('irrigationPowerCost', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Transport & Mandi Bagging (రవాణా):
              </label>
              <input
                type="number"
                value={formData.transportBaggingCost}
                onChange={(e) => handleChange('transportBaggingCost', Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Right Output Results Cards */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Profit Card - Clean Human Light SaaS Design */}
          <div
            className={`p-6 sm:p-7 rounded-3xl bg-white shadow-xs border transition-all ${
              results.isProfit
                ? 'border-emerald-300 ring-2 ring-emerald-100/50'
                : 'border-red-300 ring-2 ring-red-100/50'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Estimated Net Farm Income
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                  results.isProfit ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {results.isProfit ? <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> : <TrendingDown className="w-3.5 h-3.5 text-red-600" />}
                {results.isProfit ? 'Profitable' : 'Deficit'}
              </span>
            </div>

            <div className="my-5">
              <span className="text-xs text-stone-500 font-medium">Net Profit / Loss:</span>
              <div
                className={`text-4xl sm:text-5xl font-display font-black tracking-tight mt-1 ${
                  results.isProfit ? 'text-[#124b33]' : 'text-red-700'
                }`}
              >
                ₹{results.netProfit.toLocaleString('en-IN')}
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-stone-600">
                <span>
                  Profit / Acre: <strong className="text-stone-900">₹{Math.round(results.profitPerAcre).toLocaleString('en-IN')}</strong>
                </span>
                <span className="text-stone-300">•</span>
                <span>
                  Estimated ROI: <strong className="text-stone-900">{results.roiPercentage.toFixed(1)}%</strong>
                </span>
              </div>
            </div>

            {/* Financial Overview Metrics */}
            <div className="grid grid-cols-3 gap-2 p-3.5 bg-[#f6faf7] border border-emerald-100/70 rounded-2xl text-center text-xs">
              <div>
                <span className="text-[10px] text-stone-500 block uppercase font-bold tracking-wider">Total Yield</span>
                <strong className="text-sm font-bold text-stone-900">{results.totalProductionQuintals} Qtl</strong>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 block uppercase font-bold tracking-wider">Gross Revenue</span>
                <strong className="text-sm font-bold text-emerald-800">₹{results.grossRevenue.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 block uppercase font-bold tracking-wider">Total Costs</span>
                <strong className="text-sm font-bold text-stone-900">₹{results.totalExpenses.toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </div>

          {/* Cost Allocation Visualizer */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs space-y-4">
            <h4 className="font-display font-bold text-sm text-emerald-950 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-700" />
              Expense Distribution Breakdown
            </h4>

            {/* Stacked Progress Bar */}
            <div className="w-full h-3 rounded-full bg-stone-100 overflow-hidden flex shadow-inner">
              {costBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className={`${item.color} h-full transition-all duration-300`}
                  style={{ width: `${Math.max(2, item.pct)}%` }}
                  title={`${item.label}: ${item.pct}%`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              {costBreakdown.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 text-xs">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className="text-[11px] text-stone-600 font-semibold truncate">{item.label}</span>
                  </div>
                  <strong className="block text-emerald-950">₹{item.amount.toLocaleString('en-IN')}</strong>
                  <span className="text-[10px] text-stone-500">{item.pct}% of total</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
