import React, { useState } from 'react'
import { Language, FishHealthCondition } from '../../types/farming'
import { fishHealthConditionsData } from '../../data/diseasesData'
import {
  Fish,
  Scan,
  AlertTriangle,
  Upload,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Activity,
  HeartHandshake
} from 'lucide-react'

interface FishHealthDetectorProps {
  language: Language
}

export const FishHealthDetector: React.FC<FishHealthDetectorProps> = ({ language }) => {
  const [species, setSpecies] = useState('Indian Major Carps (Rohu / Catla / Mrigal)')
  const [previewImage, setPreviewImage] = useState<string>(fishHealthConditionsData[0].sampleImage)
  const [isScanning, setIsScanning] = useState(false)
  const [diagnosis, setDiagnosis] = useState<FishHealthCondition | null>(fishHealthConditionsData[0])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewImage(url)
      triggerScan()
    }
  }

  const handleSelectSample = (sample: FishHealthCondition) => {
    setPreviewImage(sample.sampleImage)
    setSpecies(sample.species)
    triggerScan(sample)
  }

  const triggerScan = (customResult?: FishHealthCondition) => {
    setIsScanning(true)
    setDiagnosis(null)
    setTimeout(() => {
      setIsScanning(false)
      setDiagnosis(customResult || fishHealthConditionsData[0])
    }, 800)
  }

  return (
    <div className="space-y-6">
      {/* Header - Light Design */}
      <div className="bg-white border border-[#d2e8ed] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f6f8] text-[#0f766e] text-xs font-bold uppercase tracking-wider mb-2 border border-[#c4e6ec]">
              <Activity className="w-3.5 h-3.5" />
              Aquatic Pathology AI
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0f3d45]">
              {language === 'te' ? 'చేపల ఆరోగ్య విశ్లేషణ & వ్యాధి గుర్తింపు' : 'Fish Health & Disease Diagnostics'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
              {language === 'te'
                ? 'చేపల పుండ్లు, మొప్ప కుళ్లు, లేదా అసాధారణ ఈత లక్షణాలను పరిశీలించండి. తక్షణ అత్యవసర చర్యలు మరియు నివారణ మార్గదర్శకాలను పొందండి.'
                : 'Diagnose bacterial ulcers, fin rot, gill necrosis, and hypoxia surface piping with immediate pond intervention protocols.'}
            </p>
          </div>

          <div className="shrink-0 bg-[#f0f8fa] p-3 rounded-2xl border border-[#c4e4eb] text-center text-xs">
            <span className="block font-bold text-[#0f766e]">Species-Specific</span>
            <span className="text-[10px] text-stone-500">Carps, Pangasius, Tilapia</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-teal-100 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-teal-950 uppercase tracking-wider mb-1">
                1. Fish Species (చేప రకం):
              </label>
              <select
                value={species}
                onChange={(e) => {
                  setSpecies(e.target.value)
                  const match = fishHealthConditionsData.find((d) => d.species.includes(e.target.value.split(' ')[0]))
                  if (match) handleSelectSample(match)
                }}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-teal-200 rounded-xl text-xs sm:text-sm font-semibold text-teal-950 focus:outline-hidden"
              >
                <option>Indian Major Carps (Rohu / Catla / Mrigal)</option>
                <option>Pangasius & Carps (పంకాస్ / రోహు)</option>
                <option>Tilapia & Murrel (తిలాపియా / కొర్రమీను)</option>
                <option>Vannamei Whiteleg Shrimp (రొయ్యలు)</option>
              </select>
            </div>

            <label className="block text-xs font-bold text-teal-950 uppercase tracking-wider">
              2. Upload Specimen Photo (చేప ఫోటో):
            </label>

            {/* Image Preview Box */}
            <div className="relative border-2 border-dashed border-teal-300 rounded-2xl overflow-hidden bg-teal-50/30 group">
              {previewImage ? (
                <div className="relative aspect-4/3 w-full overflow-hidden bg-black/5">
                  <img
                    src={previewImage}
                    alt="Fish specimen preview"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  {isScanning && (
                    <div className="absolute inset-0 bg-teal-950/60 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                      <RefreshCw className="w-8 h-8 animate-spin text-teal-400 mb-2" />
                      <span className="font-bold text-sm">Simulating Aquatic AI Diagnostics...</span>
                      <span className="text-[11px] text-teal-200">Inspecting skin lesions & gills</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2">
                    <label className="cursor-pointer bg-white/90 hover:bg-white text-teal-950 px-3 py-1.5 rounded-lg text-xs font-bold shadow-md flex items-center gap-1.5 backdrop-blur-xs">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Change Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <strong className="text-sm font-bold text-teal-950">Upload fish or pond photo</strong>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Clickable Preset Samples */}
            <div>
              <span className="block text-xs font-bold text-teal-900/80 mb-2">
                Or test sample clinical signs:
              </span>
              <div className="grid grid-cols-1 gap-2">
                {fishHealthConditionsData.map((cond) => (
                  <button
                    key={cond.id}
                    type="button"
                    onClick={() => handleSelectSample(cond)}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all ${
                      diagnosis?.id === cond.id
                        ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold'
                        : 'border-stone-200 hover:border-teal-300 bg-white text-stone-700'
                    }`}
                  >
                    <img
                      src={cond.sampleImage}
                      alt={cond.name}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <div className="text-xs truncate">{cond.name.split('(')[0]}</div>
                      <div className="text-[10px] text-teal-700 truncate">{cond.teluguName}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Expert Veterinary Warning */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Fisheries Expert Consultation:</strong>
              This simulated diagnosis provides preliminary guidance only. In events of fish mortality or rapid spread, contact your District Fisheries Development Officer (DFO) or regional ICAR-CIFA laboratory immediately.
            </div>
          </div>
        </div>

        {/* Right Output Diagnostic Card */}
        <div className="lg:col-span-7">
          {diagnosis ? (
            <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-xs space-y-5 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-teal-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-100 text-red-800 border border-red-200">
                      Severity: {diagnosis.severity.toUpperCase()}
                    </span>
                    <span className="text-xs font-semibold text-teal-700">
                      Species: {diagnosis.species.split('(')[0]}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-teal-950 mt-1">
                    {diagnosis.name}
                  </h3>
                  <p className="text-sm font-semibold text-teal-700">
                    {diagnosis.teluguName}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-teal-50 px-3.5 py-2 rounded-xl border border-teal-200 text-xs font-bold text-teal-900 self-start">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Preliminary Guide</span>
                </div>
              </div>

              {/* Observed Symptoms */}
              <div>
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-teal-900 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Observed Clinical Symptoms:
                </h4>
                <ul className="space-y-1.5">
                  {diagnosis.symptoms.map((sym, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200/60 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Immediate Countermeasures */}
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2">
                <h5 className="font-bold text-xs uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-teal-600" />
                  Immediate Pond Actions (తక్షణ చర్యలు):
                </h5>
                <ul className="space-y-1 text-xs text-teal-950">
                  {diagnosis.immediateActions.map((act, i) => (
                    <li key={i} className="flex items-start gap-2 py-1">
                      <span className="text-teal-700 font-bold">✓</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention & Warning */}
              <div className="p-4 rounded-2xl bg-teal-950 text-teal-100 space-y-2">
                <h5 className="font-bold text-xs uppercase tracking-wider text-white">
                  Biosecurity & Prevention Protocol:
                </h5>
                <ul className="space-y-1 text-xs text-teal-200/90">
                  {diagnosis.prevention.map((pr, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">→</span>
                      <span>{pr}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-12 bg-white rounded-2xl border border-dashed border-teal-200 text-center">
              <div>
                <Scan className="w-12 h-12 text-teal-400 mx-auto mb-3 animate-pulse" />
                <h4 className="font-bold text-teal-950">Evaluating Specimen</h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
