export type Language = 'en' | 'te' | 'hi' | 'ta' | 'kn'
export type FarmType = 'crop' | 'fish'

export interface Scheme {
  id: string
  name: string
  teluguName: string
  category: 'income' | 'insurance' | 'mechanization' | 'irrigation' | 'organic' | 'fisheries'
  targetType: 'crop' | 'fish' | 'both'
  description: string
  benefits: string[]
  eligibility: string[]
  requiredDocuments: string[]
  applicationSteps: string[]
  officialUrl: string
  lastVerified: string
  department: string
}

export interface FarmingTech {
  id: string
  title: string
  teluguTitle: string
  targetType: 'crop' | 'fish' | 'both'
  category: string
  image: string
  description: string
  benefits: string[]
  estimatedCost: string
  subsidyAvailable: string
  howToUseSteps: string[]
  roiPeriod: string
}

export interface FarmingVideo {
  id: string
  title: string
  teluguTitle: string
  category: 'crop' | 'disease' | 'fertilizer' | 'irrigation' | 'machinery' | 'aquaculture' | 'schemes'
  duration: string
  language: 'English' | 'Telugu' | 'Bilingual'
  thumbnail: string
  description: string
  keyTakeaways: string[]
  videoUrlPlaceholder: string
}

export interface CropDisease {
  id: string
  crop: string
  name: string
  teluguName: string
  severity: 'low' | 'medium' | 'high'
  confidence: number
  sampleImage: string
  symptoms: string[]
  organicTreatment: string[]
  chemicalTreatment: string[]
  preventionGuidance: string[]
}

export interface FishHealthCondition {
  id: string
  species: string
  name: string
  teluguName: string
  severity: 'mild' | 'moderate' | 'critical'
  confidence: number
  sampleImage: string
  symptoms: string[]
  immediateActions: string[]
  prevention: string[]
  veterinaryWarning: string
}

export interface WeatherDay {
  day: string
  date: string
  condition: string
  tempMax: number
  tempMin: number
  rainChance: number
  humidity: number
  windSpeed: number
  advisory: string
}

export interface WaterQualityReading {
  ph: number
  dissolvedOxygen: number // mg/L
  temperature: number // °C
  ammonia: number // mg/L
  alkalinity: number // mg/L
}

export interface FarmRecord {
  id: string
  date: string
  type: string
  plotOrPond: string
  details: string
  status: 'Completed' | 'Pending' | 'Scheduled'
}

export interface ChatMessage {
  id: string
  sender: 'user' | 'assistant'
  text: string
  timestamp: string
  language: Language
  suggestedAction?: {
    label: string
    route: string
  }
}
