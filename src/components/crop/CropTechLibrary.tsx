import React, { useState } from 'react'
import { Language, FarmingTech } from '../../types/farming'
import { technologiesData } from '../../data/technologiesData'
import { Modal } from '../common/Modal'
import {
  Cpu,
  Sparkles,
  IndianRupee,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers
} from 'lucide-react'

interface CropTechLibraryProps {
  language: Language
  defaultTarget?: 'crop' | 'fish' | 'both'
}

export const CropTechLibrary: React.FC<CropTechLibraryProps> = ({
  language,
  defaultTarget = 'crop'
}) => {
  const [activeTechModal, setActiveTechModal] = useState<FarmingTech | null>(null)

  const items = technologiesData.filter(
    (t) => defaultTarget === 'both' || t.targetType === defaultTarget || t.targetType === 'both'
  )

  return (
    <div className="space-y-6">
      {/* Header - Light Design */}
      <div className="bg-white border border-[#dce8e0] rounded-3xl p-6 sm:p-8 shadow-xs">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f5ec] text-[#1b6b43] text-xs font-bold uppercase tracking-wider mb-2 border border-[#c5e6d0]">
          <Cpu className="w-3.5 h-3.5" />
          Modern AgriTech & Automation
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#123e2b]">
          {language === 'te' ? 'ఆధునిక వ్యవసాయ సాంకేతికతలు' : 'New Farming Technologies & Equipment'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
          {language === 'te'
            ? 'వ్యవసాయ డ్రోన్లు, స్మార్ట్ మట్టి సెన్సార్లు, ఉపగ్రహ పంట పర్యవేక్షణ మరియు ఆటోమేటెడ్ పాలీహౌస్ వివరాలు, ఖర్చు మరియు వాడే విధానం.'
            : 'Explore precision farming innovations, drone spraying specs, soil moisture sensor setups, and ROI timelines with government subsidy assistance.'}
        </p>
      </div>

      {/* Technology Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((tech) => (
          <div
            key={tech.id}
            className="bg-white rounded-2xl border border-emerald-100 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between overflow-hidden group"
          >
            <div className="space-y-4">
              {/* Image Banner */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-black/5">
                <img
                  src={tech.image}
                  alt={tech.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] font-bold text-emerald-950 uppercase tracking-wider border border-white/40">
                  {tech.category}
                </div>
              </div>

              <div className="px-6 space-y-3">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-emerald-950 group-hover:text-emerald-700 transition-colors leading-snug">
                    {tech.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700">
                    {tech.teluguTitle}
                  </p>
                </div>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {tech.description}
                </p>

                {/* Estimated Cost Pill */}
                <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs">
                  <span className="block text-[10px] font-bold text-emerald-900 uppercase">
                    Estimated Cost & Subsidy:
                  </span>
                  <strong className="block text-emerald-950 text-xs mt-0.5">
                    {tech.estimatedCost}
                  </strong>
                </div>
              </div>
            </div>

            {/* Learn How to Use Action */}
            <div className="p-6 pt-4">
              <button
                type="button"
                onClick={() => setActiveTechModal(tech)}
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Learn How to Use</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for How to Use Steps */}
      {activeTechModal && (
        <Modal
          isOpen={!!activeTechModal}
          onClose={() => setActiveTechModal(null)}
          title={activeTechModal.title}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5 text-xs sm:text-sm">
            <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-black/5">
              <img
                src={activeTechModal.image}
                alt={activeTechModal.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
              {activeTechModal.description}
            </p>

            <div className="grid grid-cols-2 gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
              <div>
                <span className="block font-bold text-emerald-900 uppercase text-[10px]">Subsidy Scheme:</span>
                <span className="font-semibold text-emerald-950">{activeTechModal.subsidyAvailable}</span>
              </div>
              <div>
                <span className="block font-bold text-emerald-900 uppercase text-[10px]">Expected Payback / ROI:</span>
                <span className="font-semibold text-emerald-950">{activeTechModal.roiPeriod}</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm text-emerald-950 mb-2">Key Operational Benefits:</h4>
              <ul className="space-y-1.5">
                {activeTechModal.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm text-emerald-950 mb-2">Step-by-Step Operating Guide:</h4>
              <ol className="space-y-2">
                {activeTechModal.howToUseSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-stone-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
