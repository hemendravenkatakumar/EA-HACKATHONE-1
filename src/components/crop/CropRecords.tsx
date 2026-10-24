import React, { useState } from 'react'
import { Language, FarmRecord } from '../../types/farming'
import {
  ClipboardList,
  Plus,
  CheckCircle2,
  Calendar,
  Filter,
  Wheat,
  Download,
  Search
} from 'lucide-react'

interface CropRecordsProps {
  language: Language
}

export const CropRecords: React.FC<CropRecordsProps> = ({ language }) => {
  const [records, setRecords] = useState<FarmRecord[]>([
    {
      id: 'rec-1',
      date: 'Oct 24, 2026',
      type: 'Irrigation',
      plotOrPond: 'Plot A · Paddy (4.5 Ac)',
      details: 'Canal water release 3 hours. Maintained 2.5 cm depth.',
      status: 'Completed'
    },
    {
      id: 'rec-2',
      date: 'Oct 22, 2026',
      type: 'Fertilizer Application',
      plotOrPond: 'Plot C · Maize (2.5 Ac)',
      details: 'Applied 40 kg Urea + 10 kg Zinc Sulphate as second top-dressing.',
      status: 'Completed'
    },
    {
      id: 'rec-3',
      date: 'Oct 19, 2026',
      type: 'Pest Scouting',
      plotOrPond: 'Plot B · Cotton (3.0 Ac)',
      details: 'Installed 15 yellow sticky traps. Minor whitefly nymph incidence noted.',
      status: 'Completed'
    },
    {
      id: 'rec-4',
      date: 'Oct 26, 2026',
      type: 'Pesticide Spray',
      plotOrPond: 'Plot A · Paddy (4.5 Ac)',
      details: 'Scheduled preventive Tricyclazole spray for blast protection.',
      status: 'Scheduled'
    }
  ])

  const [isAdding, setIsAdding] = useState(false)
  const [newType, setNewType] = useState('Fertilizer')
  const [newPlot, setNewPlot] = useState('Plot A · Paddy')
  const [newDetails, setNewDetails] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDetails) return
    const rec: FarmRecord = {
      id: `rec-${Date.now()}`,
      date: 'Today',
      type: newType,
      plotOrPond: newPlot,
      details: newDetails,
      status: 'Completed'
    }
    setRecords([rec, ...records])
    setNewDetails('')
    setIsAdding(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
              <ClipboardList className="w-3.5 h-3.5" />
              Digital Farm Diary
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              {language === 'te' ? 'పొలం రికార్డులు & చరిత్ర' : 'Farm Activity Records & History'}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/90 mt-1 max-w-xl">
              {language === 'te'
                ? 'ఎరువుల వేళలు, నీటిపారుదల మరియు పిచికారీ వివరాలను భద్రపరుచుకోండి.'
                : 'Log and track agronomy operations, inputs applied, irrigation events, and harvest timeline.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAdding(!isAdding)}
            className="self-start sm:self-center px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Log New Farm Activity</span>
          </button>
        </div>
      </div>

      {/* Add New Activity Form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-4 animate-in slide-in-from-top-3">
          <h3 className="font-display font-bold text-sm text-emerald-950 pb-2 border-b border-emerald-100">
            Log New Farm Operation
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Operation Type:</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:outline-hidden"
              >
                <option>Fertilizer Application</option>
                <option>Irrigation</option>
                <option>Pesticide / Foliar Spray</option>
                <option>Weeding & Interculture</option>
                <option>Harvesting & Threshing</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Plot / Crop:</label>
              <select
                value={newPlot}
                onChange={(e) => setNewPlot(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:outline-hidden"
              >
                <option>Plot A · Paddy (4.5 Ac)</option>
                <option>Plot B · Cotton (3.0 Ac)</option>
                <option>Plot C · Maize (2.5 Ac)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Activity Notes:</label>
              <input
                type="text"
                value={newDetails}
                onChange={(e) => setNewDetails(e.target.value)}
                placeholder="e.g. Applied 20kg Urea, ran borewell for 4 hours"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:outline-hidden"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              Save Record
            </button>
          </div>
        </form>
      )}

      {/* Records Table */}
      <div className="bg-white rounded-2xl border border-emerald-100 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between">
          <h3 className="font-display font-bold text-sm text-emerald-950">
            Recent Farm Logs ({records.length})
          </h3>
          <span className="text-xs text-stone-500">Auto-saved to local profile</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/70 text-stone-600 font-semibold border-b border-stone-100">
              <tr>
                <th className="p-3.5 pl-6">Date</th>
                <th className="p-3.5">Operation</th>
                <th className="p-3.5">Plot / Field</th>
                <th className="p-3.5">Notes & Quantities</th>
                <th className="p-3.5 pr-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {records.map((rec) => (
                <tr key={rec.id} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="p-3.5 pl-6 font-semibold text-stone-900 whitespace-nowrap">{rec.date}</td>
                  <td className="p-3.5 font-bold text-emerald-900">{rec.type}</td>
                  <td className="p-3.5 text-stone-700">{rec.plotOrPond}</td>
                  <td className="p-3.5 text-stone-600 max-w-sm">{rec.details}</td>
                  <td className="p-3.5 pr-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      rec.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
