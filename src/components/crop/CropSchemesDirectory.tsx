import React, { useState } from 'react'
import { Language, Scheme } from '../../types/farming'
import { schemesData } from '../../data/schemesData'
import { Modal } from '../common/Modal'
import {
  Landmark,
  Search,
  ExternalLink,
  Calendar,
  FileText,
  CheckCircle2,
  Filter,
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react'

interface CropSchemesDirectoryProps {
  language: Language
  defaultTarget?: 'crop' | 'fish' | 'both'
}

export const CropSchemesDirectory: React.FC<CropSchemesDirectoryProps> = ({
  language,
  defaultTarget = 'crop'
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeSchemeModal, setActiveSchemeModal] = useState<Scheme | null>(null)

  const filteredSchemes = schemesData.filter((scheme) => {
    // Filter target
    const matchesTarget =
      defaultTarget === 'both'
        ? true
        : scheme.targetType === defaultTarget || scheme.targetType === 'both'

    const matchesCategory =
      selectedCategory === 'all' || scheme.category === selectedCategory

    const matchesSearch =
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.teluguName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesTarget && matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header - Light Design */}
      <div className="bg-white border border-[#dce8e0] rounded-3xl p-6 sm:p-8 shadow-xs">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f5ec] text-[#1b6b43] text-xs font-bold uppercase tracking-wider mb-2 border border-[#c5e6d0]">
          <Landmark className="w-3.5 h-3.5" />
          Verified Central & State Portals
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#123e2b]">
          {language === 'te' ? 'రైతు ప్రభుత్వ పథకాలు & రాయితీలు' : 'Government Schemes & Subsidies Directory'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
          {language === 'te'
            ? 'రైతుల కొరకు పీఎం కిసాన్, రైతు భరోసా, పంటల బీమా, డ్రిప్ సబ్సిడీ మరియు డ్రోన్ పథకాల వివరాలు, అధికారిక లింకులు మరియు అవసరమైన ధ్రువపత్రాలు.'
            : 'Explore officially verified farmer welfare schemes, eligibility rules, document checklists, and direct government portal links.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-emerald-700/60 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search schemes by name, keyword (e.g. Kisan, Drip, PMFBY)..."
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-emerald-950 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar text-xs font-semibold">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-2 rounded-xl transition-colors whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-emerald-700 text-white font-bold'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All Categories
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('income')}
            className={`px-3 py-2 rounded-xl transition-colors whitespace-nowrap ${
              selectedCategory === 'income'
                ? 'bg-emerald-700 text-white font-bold'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Income Support
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('insurance')}
            className={`px-3 py-2 rounded-xl transition-colors whitespace-nowrap ${
              selectedCategory === 'insurance'
                ? 'bg-emerald-700 text-white font-bold'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Crop Insurance
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('irrigation')}
            className={`px-3 py-2 rounded-xl transition-colors whitespace-nowrap ${
              selectedCategory === 'irrigation'
                ? 'bg-emerald-700 text-white font-bold'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Micro-Irrigation
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('mechanization')}
            className={`px-3 py-2 rounded-xl transition-colors whitespace-nowrap ${
              selectedCategory === 'mechanization'
                ? 'bg-emerald-700 text-white font-bold'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Mechanization
          </button>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-2xl border border-emerald-100 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between overflow-hidden group"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {scheme.category}
                </span>
                <span className="text-[10px] text-stone-500 font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-stone-400" />
                  Verified: {scheme.lastVerified}
                </span>
              </div>

              <div>
                <h3 className="font-display font-extrabold text-lg text-emerald-950 group-hover:text-emerald-700 transition-colors leading-snug">
                  {scheme.name}
                </h3>
                <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                  {scheme.teluguName}
                </p>
              </div>

              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {scheme.description}
              </p>

              {/* Key Benefit Highlights */}
              <div className="space-y-1.5 pt-2 border-t border-stone-100">
                <span className="block text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
                  Key Benefits:
                </span>
                {scheme.benefits.slice(0, 2).map((benefit, i) => (
                  <div key={i} className="text-xs text-stone-700 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="px-6 py-4 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between gap-2 text-xs">
              <button
                type="button"
                onClick={() => setActiveSchemeModal(scheme)}
                className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 py-1"
              >
                <span>View Steps & Docs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-emerald-50 border border-emerald-200 rounded-lg font-bold text-emerald-900 transition-colors shadow-2xs"
              >
                <span>Official Portal</span>
                <ExternalLink className="w-3 h-3 text-emerald-600" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Full Scheme Application Details */}
      {activeSchemeModal && (
        <Modal
          isOpen={!!activeSchemeModal}
          onClose={() => setActiveSchemeModal(null)}
          title={activeSchemeModal.name}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5 text-xs sm:text-sm">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
              <span className="block font-bold text-xs uppercase text-emerald-800">Department:</span>
              <span className="text-xs font-medium">{activeSchemeModal.department}</span>
            </div>

            <div>
              <h4 className="font-bold text-sm text-emerald-950 mb-2">Key Scheme Benefits:</h4>
              <ul className="space-y-1.5">
                {activeSchemeModal.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm text-emerald-950 mb-2">Eligibility Overview:</h4>
              <ul className="space-y-1">
                {activeSchemeModal.eligibility.map((e, i) => (
                  <li key={i} className="flex items-start gap-2 text-stone-700">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm text-emerald-950 mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                Required Documents Checklist:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeSchemeModal.requiredDocuments.map((doc, i) => (
                  <div key={i} className="p-2.5 bg-emerald-50/50 rounded-lg border border-emerald-200/70 text-xs text-emerald-950 font-medium">
                    ✓ {doc}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm text-emerald-950 mb-2">How to Apply (దరఖాస్తు విధానం):</h4>
              <ol className="space-y-2">
                {activeSchemeModal.applicationSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-stone-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="pt-4 border-t border-emerald-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-500">
                Last Verified: {activeSchemeModal.lastVerified}
              </span>
              <a
                href={activeSchemeModal.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md"
              >
                <span>Open Government Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
