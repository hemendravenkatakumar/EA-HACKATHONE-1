import React from 'react'

interface VoiceVisualizerProps {
  active: boolean
  color?: 'emerald' | 'teal'
  bars?: number
}

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({
  active,
  color = 'emerald',
  bars = 9
}) => {
  const heights = [30, 65, 45, 90, 100, 75, 55, 80, 40]
  const delays = [0, 0.15, 0.3, 0.1, 0.25, 0.05, 0.2, 0.35, 0.12]

  const barColor =
    color === 'teal'
      ? 'bg-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.5)]'
      : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]'

  return (
    <div className="flex items-center justify-center gap-1.5 h-12 px-3 py-1">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={`w-1 rounded-full transition-all duration-300 ${barColor}`}
          style={{
            height: active ? `${heights[i % heights.length]}%` : '15%',
            animation: active
              ? `soundWave 0.8s ease-in-out infinite alternate ${delays[i % delays.length]}s`
              : 'none'
          }}
        />
      ))}
    </div>
  )
}
