import React, { useState } from 'react'
import { Language, FarmingVideo } from '../../types/farming'
import { videosData } from '../../data/videosData'
import { Modal } from '../common/Modal'
import {
  Video,
  Play,
  Clock,
  Globe,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

interface CropVideoLibraryProps {
  language: Language
  defaultCategory?: string
}

export const CropVideoLibrary: React.FC<CropVideoLibraryProps> = ({
  language,
  defaultCategory = 'all'
}) => {
  const [selectedCat, setSelectedCat] = useState<string>(defaultCategory)
  const [activeVideo, setActiveVideo] = useState<FarmingVideo | null>(null)

  const filteredVideos = videosData.filter(
    (v) => selectedCat === 'all' || v.category === selectedCat
  )

  return (
    <div className="space-y-6">
      {/* Header - Light Design */}
      <div className="bg-white border border-[#dce8e0] rounded-3xl p-6 sm:p-8 shadow-xs">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f5ec] text-[#1b6b43] text-xs font-bold uppercase tracking-wider mb-2 border border-[#c5e6d0]">
          <Video className="w-3.5 h-3.5" />
          Field Video Masterclasses
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#123e2b]">
          {language === 'te' ? 'వ్యవసాయ వీడియో పాఠశాల' : 'Farming Tutorial Video Library'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
          {language === 'te'
            ? 'శ్రీ వరి సాగు, సమగ్ర సస్యరక్షణ, డ్రోన్ పిచికారీ మరియు చెరువు యాజమాన్యం పై తెలుగు మరియు ఆంగ్లంలో ఆచరణాత్మక వీడియోలు.'
            : 'Watch practical field demonstrations by agricultural scientists and progressive farmers in Telugu and English.'}
        </p>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold no-scrollbar">
        {[
          { id: 'all', label: 'All Tutorials' },
          { id: 'crop', label: 'Crop Cultivation' },
          { id: 'disease', label: 'Disease & Pest Control' },
          { id: 'machinery', label: 'Machinery & Drones' },
          { id: 'aquaculture', label: 'Aquaculture & Ponds' },
          { id: 'schemes', label: 'Government Portals' }
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCat(cat.id)}
            className={`px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap ${
              selectedCat === cat.id
                ? 'bg-emerald-700 text-white font-bold shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((vid) => (
          <div
            key={vid.id}
            className="bg-white rounded-2xl border border-emerald-100 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between overflow-hidden group"
          >
            <div className="space-y-3">
              {/* Thumbnail Container */}
              <div
                className="relative aspect-16/10 w-full overflow-hidden bg-black/10 cursor-pointer"
                onClick={() => setActiveVideo(vid)}
              >
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {vid.duration}
                </div>
                <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-emerald-950 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-white/40">
                  <Globe className="w-3 h-3 text-emerald-700" />
                  {vid.language}
                </div>
              </div>

              <div className="p-5 pt-1 space-y-2">
                <h3 className="font-display font-extrabold text-base text-emerald-950 group-hover:text-emerald-700 transition-colors leading-snug">
                  {vid.title}
                </h3>
                <p className="text-xs font-semibold text-emerald-700">
                  {vid.teluguTitle}
                </p>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {vid.description}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                type="button"
                onClick={() => setActiveVideo(vid)}
                className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 text-emerald-700" />
                <span>Watch Tutorial Video</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <Modal
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          title={activeVideo.title}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-4">
            {/* Simulated Video Player */}
            <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-black flex flex-col items-center justify-center text-white">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
                <div className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center shadow-xl self-center mb-6">
                  <Play className="w-7 h-7 ml-1" />
                </div>
                <div className="flex items-center justify-between text-xs text-stone-300">
                  <span>0:00 / {activeVideo.duration}</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold">1080p HD</span>
                </div>
                <div className="w-full bg-white/30 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full w-1/4 rounded-full" />
                </div>
              </div>
            </div>

            {/* Placeholder Notice */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Demo Video Player:</strong> This video card illustrates video-learning library integration with full curriculum chapters and takeaways.
              </span>
            </div>

            <div>
              <h4 className="font-bold text-sm text-emerald-950 mb-2">Key Takeaways (ముఖ్యమైన అంశాలు):</h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {activeVideo.keyTakeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
