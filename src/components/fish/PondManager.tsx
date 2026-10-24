import React, { useState } from 'react'
import { Language } from '../../types/farming'
import {
  Fish,
  Activity,
  Wind,
  Droplets,
  CheckCircle2,
  AlertCircle,
  Plus,
  Power,
  RotateCw
} from 'lucide-react'

interface PondManagerProps {
  language: Language
  onNavigateTab: (tab: string) => void
}

interface PondItem {
  id: string
  name: string
  species: string
  areaHa: number
  stockCount: number
  waterStatus: 'Optimal' | 'Review' | 'Critical'
  aeratorsActive: boolean
  lastFed: string
  morningDO: number
}

export const PondManager: React.FC<PondManagerProps> = ({ language, onNavigateTab }) => {
  const [ponds, setPonds] = useState<PondItem[]>([
    {
      id: 'pond-1',
      name: 'Pond 1: Rohu Nursery',
      species: 'Rohu Fingerlings',
      areaHa: 1.0,
      stockCount: 15000,
      waterStatus: 'Optimal',
      aeratorsActive: false,
      lastFed: 'Today, 8:30 AM (45 kg)',
      morningDO: 5.4
    },
    {
      id: 'pond-2',
      name: 'Pond 2: Grow-Out Carps',
      species: 'Rohu (80%) + Catla (20%)',
      areaHa: 2.0,
      stockCount: 8400,
      waterStatus: 'Review',
      aeratorsActive: true,
      lastFed: 'Today, 8:45 AM (92 kg)',
      morningDO: 3.8
    },
    {
      id: 'pond-3',
      name: 'Pond 3: Pangasius High-Density',
      species: 'Pangasius bocourti',
      areaHa: 1.5,
      stockCount: 18000,
      waterStatus: 'Optimal',
      aeratorsActive: true,
      lastFed: 'Today, 9:00 AM (140 kg)',
      morningDO: 4.9
    },
    {
      id: 'pond-4',
      name: 'Pond 4: Vannamei Brackishwater',
      species: 'Whiteleg Shrimp (Litopenaeus vannamei)',
      areaHa: 1.2,
      stockCount: 60000,
      waterStatus: 'Optimal',
      aeratorsActive: true,
      lastFed: 'Today, 7:30 AM (28 kg)',
      morningDO: 5.8
    }
  ])

  // Checklist state
  const [checklist, setChecklist] = useState([
    { id: 1, task: 'Dawn DO check (between 4:00 AM - 5:30 AM)', done: true },
    { id: 2, task: 'Inspect morning feed check-trays at 10:30 AM', done: true },
    { id: 3, task: 'Secchi disc transparency measurement (target 25-35 cm)', done: false },
    { id: 4, task: 'Lubricate paddlewheel aerator gearbox bearings', done: false },
    { id: 5, task: 'Broadcast 50kg agricultural lime on Pond 2 dike perimeter', done: false }
  ])

  const toggleChecklist = (id: number) => {
    setChecklist(
      checklist.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    )
  }

  const toggleAerator = (id: string) => {
    setPonds(
      ponds.map((p) => (p.id === id ? { ...p, aeratorsActive: !p.aeratorsActive } : p))
    )
  }

  return (
    <div className="space-y-6">
      {/* Header - Light Design */}
      <div className="bg-white border border-[#d2e8ed] rounded-3xl p-6 sm:p-8 shadow-xs">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f6f8] text-[#0f766e] text-xs font-bold uppercase tracking-wider mb-2 border border-[#c4e6ec]">
          <Fish className="w-3.5 h-3.5" />
          Aquaculture Multi-Pond Hub
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0f3d45]">
          {language === 'te' ? 'చెరువుల నిర్వహణ & ఆపరేషన్స్' : 'Pond Management & Daily Operations'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
          {language === 'te'
            ? 'అన్ని చెరువుల నీటి నాణ్యత, ఎయిరేటర్ల స్థితి, ఫీడింగ్ లాగ్‌లు మరియు రోజువారీ తనిఖీ జాబితా.'
            : 'Supervise all pond units, manage aeration running status, log check-tray observations, and track daily maintenance tasks.'}
        </p>
      </div>

      {/* Multi-Pond Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ponds.map((pond) => (
          <div
            key={pond.id}
            className="bg-white rounded-2xl p-6 border border-teal-100 shadow-xs hover:border-teal-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-teal-950">
                    {pond.name}
                  </h3>
                  <span className="text-xs text-stone-500 font-medium">
                    {pond.species} · {pond.areaHa} Hectare
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    pond.waterStatus === 'Optimal'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {pond.waterStatus} Water
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 my-3 text-center text-xs">
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-[10px] text-stone-400 block">Stock Count</span>
                  <strong className="text-stone-900 font-bold mt-0.5 block">
                    {pond.stockCount.toLocaleString('en-IN')}
                  </strong>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-[10px] text-stone-400 block">Dawn DO</span>
                  <strong className={`font-bold mt-0.5 block ${pond.morningDO < 4.0 ? 'text-amber-600' : 'text-emerald-700'}`}>
                    {pond.morningDO} mg/L
                  </strong>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-[10px] text-stone-400 block">Aerators</span>
                  <strong className={`font-bold mt-0.5 block ${pond.aeratorsActive ? 'text-teal-700' : 'text-stone-400'}`}>
                    {pond.aeratorsActive ? 'Running' : 'Standby'}
                  </strong>
                </div>
              </div>

              <div className="text-xs text-stone-600 bg-teal-50/50 p-2.5 rounded-xl border border-teal-100 flex items-center justify-between">
                <span>Last Feed: <strong>{pond.lastFed}</strong></span>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigateTab('feeding')}
                className="text-xs font-bold text-teal-800 hover:text-teal-950 flex items-center gap-1"
              >
                <span>Feed Rationing →</span>
              </button>

              <button
                type="button"
                onClick={() => toggleAerator(pond.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  pond.aeratorsActive
                    ? 'bg-teal-700 text-white hover:bg-teal-800'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{pond.aeratorsActive ? 'Aerators ON' : 'Turn Aerator ON'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Operations Checklist */}
      <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h3 className="font-display font-bold text-base text-teal-950">
              Daily Pond Maintenance Checklist (రోజువారీ తనిఖీ జాబితా)
            </h3>
            <span className="text-xs text-stone-500">
              {checklist.filter((c) => c.done).length} of {checklist.length} completed today
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {checklist.map((item) => (
            <label
              key={item.id}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                item.done ? 'bg-teal-50/60 border-teal-200 text-teal-950' : 'bg-stone-50 border-stone-200 text-stone-800'
              }`}
            >
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleChecklist(item.id)}
                className="w-4 h-4 accent-teal-700 cursor-pointer rounded"
              />
              <span className={`text-xs sm:text-sm font-medium ${item.done ? 'line-through text-stone-400' : ''}`}>
                {item.task}
              </span>
              {item.done && <CheckCircle2 className="w-4 h-4 text-teal-600 ml-auto" />}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
