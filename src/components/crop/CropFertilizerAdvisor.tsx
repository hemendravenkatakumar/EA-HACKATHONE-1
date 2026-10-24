import React, { useState } from 'react'
import { Language } from '../../types/farming'
import {
  Sprout,
  Droplets,
  Layers,
  FlaskConical,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react'

interface CropFertilizerAdvisorProps {
  language: Language
}

export const CropFertilizerAdvisor: React.FC<CropFertilizerAdvisorProps> = ({ language }) => {
  const [crop, setCrop] = useState('Paddy / Rice (వరి)')
  const [stage, setStage] = useState('Vegetative Growth (మొక్క దశ)')
  const [soilType, setSoilType] = useState('Black Cotton Soil (నల్లరేగడి నేల)')
  const [irrigation, setIrrigation] = useState('Canal / Tube Well (కాలువ / బోరు బావి)')
  const [acreage, setAcreage] = useState(2.5)

  // Demo dynamic recommendations based on inputs
  const getGuidance = () => {
    if (crop.includes('Paddy')) {
      return {
        npkRatio: '120 : 60 : 40 kg N:P:K / hectare',
        ureaDose: `${Math.round(acreage * 35)} kg Urea`,
        dapDose: `${Math.round(acreage * 50)} kg DAP (applied as basal)`,
        mopDose: `${Math.round(acreage * 25)} kg MOP (Potash)`,
        zincAdvice: 'Apply 10 kg Zinc Sulphate (21%) per acre at 15-20 days after transplanting. Do not mix Zinc directly with DAP.',
        irrigationSchedule: 'Maintain 2-3 cm shallow water layer during tillering. Drain 2 days before fertilizer application, then re-flood.',
        organicAdvice: 'Incorporate 5 tonnes well-decomposed Farm Yard Manure (FYM) or green manure (Dhaincha/Sunn hemp) during summer ploughing.'
      }
    } else if (crop.includes('Maize')) {
      return {
        npkRatio: '150 : 75 : 40 kg N:P:K / hectare',
        ureaDose: `${Math.round(acreage * 45)} kg Urea (split in 3 applications: knee-high, tasseling, grain filling)`,
        dapDose: `${Math.round(acreage * 55)} kg DAP (basal dose)`,
        mopDose: `${Math.round(acreage * 20)} kg MOP`,
        zincAdvice: 'Foliar spray of 0.5% Zinc Sulphate + 0.25% lime solution if interveinal striping appears on young leaves.',
        irrigationSchedule: 'Critical irrigation stages: Knee-high (30 DAS), Tasseling (50 DAS), and Silking (65 DAS). Avoid water logging.',
        organicAdvice: 'Apply Azospirillum and Phosphobacteria bio-fertilizers @ 2 kg/acre mixed with 200 kg vermicompost.'
      }
    } else {
      return {
        npkRatio: '100 : 50 : 50 kg N:P:K / hectare',
        ureaDose: `${Math.round(acreage * 30)} kg Urea`,
        dapDose: `${Math.round(acreage * 40)} kg DAP`,
        mopDose: `${Math.round(acreage * 30)} kg MOP`,
        zincAdvice: 'Apply Boron 1 kg/acre + Zinc 5 kg/acre to prevent boll shedding and flower drop.',
        irrigationSchedule: 'Irrigate along alternate furrows to save 30% water and prevent collar rot in heavy black soil.',
        organicAdvice: 'Apply 250 kg Neem Cake per acre as basal soil conditioner to repel soil nematodes.'
      }
    }
  }

  const advice = getGuidance()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
          <FlaskConical className="w-3.5 h-3.5" />
          Nutrient Management
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          {language === 'te' ? 'ఎరువులు & నీటిపారుదల సలహాదారు' : 'Fertilizer & Irrigation Advisor'}
        </h2>
        <p className="text-xs sm:text-sm text-emerald-200/90 mt-1 max-w-2xl">
          {language === 'te'
            ? 'మీ పంట, పెరుగుదల దశ, మట్టి రకం మరియు నీటి వనరును నమోదు చేయండి. సమతుల్య N-P-K మోతాదు మరియు బాధ్యతాయుత ఎరువుల మార్గదర్శకాలను పొందండి.'
            : 'Formulate balanced N-P-K schedules, micronutrient plans, and water-saving irrigation practices tailored to your crop and soil.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs space-y-4">
          <h3 className="font-display font-bold text-base text-emerald-950 pb-2 border-b border-emerald-100">
            Field & Crop Parameters
          </h3>

          <div>
            <label className="block text-xs font-bold text-emerald-950 mb-1">
              Select Crop (పంట):
            </label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-emerald-200 rounded-xl text-xs sm:text-sm font-semibold text-emerald-950 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
            >
              <option>Paddy / Rice (వరి)</option>
              <option>Maize / Corn (మొక్కజొన్న)</option>
              <option>Cotton (పత్తి)</option>
              <option>Chilli / Pepper (మిర్చి)</option>
              <option>Groundnut (వేరుశనగ)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-950 mb-1">
              Growth Stage (పెరుగుదల దశ):
            </label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-emerald-200 rounded-xl text-xs sm:text-sm font-semibold text-emerald-950 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
            >
              <option>Basal / Sowing Stage (విత్తన / నాటు దశ)</option>
              <option>Vegetative Growth (మొక్క దశ - 20-35 DAS)</option>
              <option>Flowering / Panicle Initiation (పూత / పిలకల దశ)</option>
              <option>Grain / Boll Development (గింజ పాలుపోసుకునే దశ)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-950 mb-1">
              Soil Type (మట్టి రకం):
            </label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-emerald-200 rounded-xl text-xs sm:text-sm font-semibold text-emerald-950 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
            >
              <option>Black Cotton Soil (నల్లరేగడి నేల)</option>
              <option>Red Sandy Loam (ఎర్ర నేల)</option>
              <option>Alluvial River Soil (ఒండ్రు నేల)</option>
              <option>Clay Loam (బంకమట్టి నేల)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-950 mb-1">
              Irrigation Source (నీటి వనరు):
            </label>
            <select
              value={irrigation}
              onChange={(e) => setIrrigation(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-emerald-200 rounded-xl text-xs sm:text-sm font-semibold text-emerald-950 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
            >
              <option>Canal / Tube Well (కాలువ / బోరు బావి)</option>
              <option>Drip Fertigation System (డ్రిప్ సేద్యం)</option>
              <option>Sprinkler Irrigation (స్ప్రింక్లర్)</option>
              <option>Rainfed / Dryland (వర్షాధార)</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-emerald-950">
                Plot Size (సాగు విస్తీర్ణం):
              </label>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {acreage} Acres
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="20"
              step="0.5"
              value={acreage}
              onChange={(e) => setAcreage(parseFloat(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
          </div>

          {/* Responsible Fertilizer Warning Box */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 leading-relaxed flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Responsible Fertilizer Use:</strong> Do not treat chemical quantities as universal truth. Actual nutrient requirements depend on soil testing (Soil Health Card). Excess nitrogen causes lodging and pest attraction.
            </div>
          </div>
        </div>

        {/* Output Guidance Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-100">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Recommended For {acreage} Acres
                </span>
                <h3 className="font-display font-extrabold text-xl text-emerald-950">
                  {crop.split('(')[0]} · {stage.split('(')[0]}
                </h3>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-full text-xs font-bold">
                {advice.npkRatio}
              </span>
            </div>

            {/* Split Dose Table */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center">
                <span className="block text-[11px] font-bold text-emerald-800 uppercase">Urea (46% N)</span>
                <strong className="block text-lg font-extrabold text-emerald-950 mt-1">{advice.ureaDose}</strong>
                <span className="text-[10px] text-emerald-700">Split into 3 doses</span>
              </div>
              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-center">
                <span className="block text-[11px] font-bold text-amber-800 uppercase">DAP (18-46-0)</span>
                <strong className="block text-lg font-extrabold text-amber-950 mt-1">{advice.dapDose}</strong>
                <span className="text-[10px] text-amber-700">100% at basal stage</span>
              </div>
              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-center">
                <span className="block text-[11px] font-bold text-blue-800 uppercase">MOP (60% K)</span>
                <strong className="block text-lg font-extrabold text-blue-950 mt-1">{advice.mopDose}</strong>
                <span className="text-[10px] text-blue-700">Root & grain strength</span>
              </div>
            </div>

            {/* Micronutrient Advice */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Micronutrient & Soil Health Advice:
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">{advice.zincAdvice}</p>
            </div>

            {/* Irrigation Timing Guidance */}
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-1.5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-blue-600" />
                Irrigation Schedule & Moisture Management:
              </h4>
              <p className="text-xs text-emerald-900 leading-relaxed">{advice.irrigationSchedule}</p>
            </div>

            {/* Organic Compost Guidance */}
            <div className="p-4 rounded-xl bg-emerald-900 text-emerald-100 space-y-1.5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-emerald-300" />
                Organic Compost & Bio-Fertilizer Recommendation:
              </h4>
              <p className="text-xs text-emerald-200/90 leading-relaxed">{advice.organicAdvice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
