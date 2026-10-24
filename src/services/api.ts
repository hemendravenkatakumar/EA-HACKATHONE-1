import { Language, FarmType } from '../types/farming'

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'

export interface ChatApiResponse {
  session_id: string
  user_message: { id: number; sender: string; text: string; created_at: string }
  assistant_message: { id: number; sender: string; text: string; created_at: string }
  suggested_route?: string
  engine_source?: string
}

export interface DiseaseScanApiResponse {
  id: string
  crop_or_species: string
  detected_disease: string
  telugu_disease_name?: string
  confidence_percentage: number
  symptoms: string[]
  treatment_organic: string[]
  treatment_chemical: string[]
  image_url?: string
  disclaimer: string
}

export const AgroVoiceAPI = {
  /** Check if Django REST API is online */
  async isOnline(): Promise<boolean> {
    try {
      const res = await fetch('http://localhost:8000/api/', { method: 'GET', signal: AbortSignal.timeout(2000) })
      return res.ok
    } catch {
      return false
    }
  },

  /** Send chat message to Django AI assistant and save in SQL */
  async sendChatMessage(
    message: string,
    farmType: FarmType = 'crop',
    language: Language = 'en',
    sessionId?: string
  ): Promise<ChatApiResponse> {
    const res = await fetch(`${API_BASE_URL}/assistant/chat/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        farm_type: farmType,
        language,
        session_id: sessionId
      })
    })

    if (!res.ok) {
      throw new Error(`Chat API error: ${res.statusText}`)
    }
    return res.json()
  },

  /** Upload disease photo to Django vision service */
  async scanDiseaseImage(
    file: File | null,
    cropOrSpecies: string,
    farmType: FarmType = 'crop'
  ): Promise<DiseaseScanApiResponse> {
    const formData = new FormData()
    formData.append('crop_or_species', cropOrSpecies)
    formData.append('farm_type', farmType)
    if (file) {
      formData.append('image', file)
    }

    const res = await fetch(`${API_BASE_URL}/assistant/scan/`, {
      method: 'POST',
      body: formData
    })

    if (!res.ok) {
      throw new Error(`Disease scan error: ${res.statusText}`)
    }
    return res.json()
  },

  /** Register farmer account in Django User & Profile tables */
  async register(data: {
    name: string
    email: string
    password: string
    farmType: FarmType
    language: Language
  }) {
    const res = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        farm_type: data.farmType,
        preferred_language: data.language
      })
    })
    return res.json()
  },

  /** Fetch live fish ponds from PostgreSQL/SQL database */
  async getPonds() {
    const res = await fetch(`${API_BASE_URL}/farms/ponds/`)
    if (!res.ok) throw new Error('Failed to fetch ponds')
    return res.json()
  },

  /** Toggle aerators in Database */
  async toggleAerator(pondId: number) {
    const res = await fetch(`${API_BASE_URL}/farms/ponds/${pondId}/toggle-aerator/`, {
      method: 'POST'
    })
    return res.json()
  }
}
