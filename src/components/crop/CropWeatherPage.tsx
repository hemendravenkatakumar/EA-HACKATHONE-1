import React, { useState } from 'react'
import { Language, WeatherDay } from '../../types/farming'
import {
  CloudSun,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  MapPin,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react'

interface CropWeatherPageProps {
  language: Language
}

export const CropWeatherPage: React.FC<CropWeatherPageProps> = ({ language }) => {
  const [selectedRegion, setSelectedRegion] = useState('Guntur, Andhra Pradesh (గుంటూరు)')

  const forecastDays: WeatherDay[] = [
    {
      day: 'Today (నేడు)',
      date: 'Oct 25',
      condition: 'Partly Cloudy with Humid Breeze',
      tempMax: 32,
      tempMin: 24,
      rainChance: 25,
      humidity: 68,
      windSpeed: 12,
      advisory: 'Safe window for foliar pesticide spray until 11:30 AM. Light evening dew expected.'
    },
    {
      day: 'Tomorrow (రేపు)',
      date: 'Oct 26',
      condition: 'Afternoon Thunder Showers',
      tempMax: 29,
      tempMin: 23,
      rainChance: 75,
      humidity: 82,
      windSpeed: 18,
      advisory: 'Postpone chemical spraying and nitrogen top-dressing to prevent leaching. Clean field drainage bunds.'
    },
    {
      day: 'Sunday',
      date: 'Oct 27',
      condition: 'Moderate Rainfall',
      tempMax: 27,
      tempMin: 22,
      rainChance: 65,
      humidity: 88,
      windSpeed: 15,
      advisory: 'Pause irrigation pump operations entirely. Monitor nursery plots for standing water.'
    },
    {
      day: 'Monday',
      date: 'Oct 28',
      condition: 'Scattered Clouds & Sunny Spells',
      tempMax: 31,
      tempMin: 23,
      rainChance: 20,
      humidity: 65,
      windSpeed: 10,
      advisory: 'Ideal condition to resume manual weeding and intercultural operations in cotton.'
    },
    {
      day: 'Tuesday',
      date: 'Oct 29',
      condition: 'Clear Sunny Skies',
      tempMax: 33,
      tempMin: 24,
      rainChance: 10,
      humidity: 58,
      windSpeed: 9,
      advisory: 'Good weather for harvesting and grain threshing in upland areas.'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header with Region Selector - Light Design */}
      <div className="bg-white border border-[#dce8e0] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f5ec] text-[#1b6b43] text-xs font-bold uppercase tracking-wider mb-2 border border-[#c5e6d0]">
              <CloudSun className="w-3.5 h-3.5" />
              Agricultural Meteorology
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#123e2b]">
              {language === 'te' ? 'వాతావరణ ఆధారిత వ్యవసాయ సలహాలు' : 'Weather-Based Farming Advice'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              {language === 'te'
                ? 'ఉష్ణోగ్రత, వర్షపాత సంభావ్యత మరియు గాలి వేగం ఆధారంగా సరైన పిచికారీ మరియు నీటిపారుదల సమయాలను నిర్ణయించండి.'
                : 'Actionable micro-climate advisories tailored for irrigation scheduling, spray windows, and heavy rain mitigation.'}
            </p>
          </div>

          {/* Region Picker */}
          <div className="bg-[#f6faf7] p-3.5 rounded-2xl border border-emerald-200 text-left space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#1b6b43] tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              Demo Agrarian Belt:
            </span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-white text-stone-900 text-xs font-bold rounded-xl px-3 py-2 border border-emerald-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-200"
            >
              <option>Guntur, Andhra Pradesh (గుంటూరు)</option>
              <option>East Godavari, AP (తూర్పు గోదావరి)</option>
              <option>Warangal, Telangana (వరంగల్)</option>
              <option>Kurnool, AP (కర్నూలు)</option>
              <option>Karimnagar, TG (కరీంనగర్)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Prototype Notice */}
      <div className="px-4 py-2.5 bg-amber-50 border border-amber-200/80 rounded-xl flex items-center gap-2 text-xs text-amber-900">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Simulated Weather Data:</strong> Values displayed below represent a realistic demo model for agricultural planning demonstrations.
        </span>
      </div>

      {/* Today's Hero Weather Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Today's Overview
              </span>
              <span className="text-xs text-stone-500 font-semibold">{forecastDays[0].date}</span>
            </div>

            <div className="flex items-center justify-between my-5">
              <div>
                <span className="text-5xl font-display font-extrabold text-emerald-950">
                  {forecastDays[0].tempMax}°
                  <span className="text-xl font-normal text-stone-500">C</span>
                </span>
                <span className="block text-xs font-bold text-stone-600 mt-1">
                  Min: {forecastDays[0].tempMin}°C · Feels like 34°C
                </span>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
                <Sun className="w-9 h-9" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 py-3 bg-stone-50 rounded-xl border border-stone-100 text-center text-xs">
              <div>
                <span className="block text-[10px] text-stone-500">Rain Prob</span>
                <strong className="text-stone-900 font-bold">{forecastDays[0].rainChance}%</strong>
              </div>
              <div>
                <span className="block text-[10px] text-stone-500">Humidity</span>
                <strong className="text-stone-900 font-bold">{forecastDays[0].humidity}%</strong>
              </div>
              <div>
                <span className="block text-[10px] text-stone-500">Wind</span>
                <strong className="text-stone-900 font-bold">{forecastDays[0].windSpeed} km/h</strong>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950">
            <span className="font-bold block text-emerald-800 uppercase text-[10px]">Today's Field Action:</span>
            {forecastDays[0].advisory}
          </div>
        </div>

        {/* 4-Day Forecast Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {forecastDays.slice(1).map((day, i) => (
            <div
              key={i}
              className={`p-5 rounded-2xl border transition-all ${
                day.rainChance >= 60
                  ? 'bg-blue-50/60 border-blue-200'
                  : 'bg-white border-stone-200'
              } shadow-xs flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-stone-900">{day.day}</span>
                  <span className="text-[11px] text-stone-500 font-semibold">{day.date}</span>
                </div>

                <div className="flex items-center gap-3 my-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    day.rainChance >= 60 ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {day.rainChance >= 60 ? <CloudRain className="w-5 h-5" /> : <CloudSun className="w-5 h-5" />}
                  </div>
                  <div>
                    <span className="text-xl font-bold text-stone-900">
                      {day.tempMax}° / <small className="text-stone-500 font-normal">{day.tempMin}°C</small>
                    </span>
                    <span className="block text-[11px] text-stone-600">{day.condition}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-stone-600 my-2">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                    {day.rainChance}% rain
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="w-3.5 h-3.5 text-stone-400" />
                    {day.windSpeed} km/h
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-stone-200/80 text-[11px] leading-relaxed text-stone-800">
                <strong>Advisory: </strong>{day.advisory}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
