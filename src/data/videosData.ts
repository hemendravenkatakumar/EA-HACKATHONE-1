import { FarmingVideo } from '../types/farming'

export const videosData: FarmingVideo[] = [
  {
    id: 'vid-paddy-system',
    title: 'System of Rice Intensification (SRI) Paddy Cultivation',
    teluguTitle: 'శ్రీ వరి సాగు పద్ధతి - తక్కువ ఖర్చుతో అధిక దిగుబడి',
    category: 'crop',
    duration: '14:20',
    language: 'Telugu',
    thumbnail: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    description: 'Learn modern SRI methodology: transplanting 8-12 day young seedlings, square planting with 25x25cm spacing, rotary cono-weeder usage, and alternate wetting and drying irrigation.',
    keyTakeaways: [
      'Reduces seed requirement from 25kg to just 2kg per acre.',
      'Saves 40% irrigation water while improving root aeration.',
      'Average yield increase of 25-35% compared to flooded broadcasting.'
    ],
    videoUrlPlaceholder: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'vid-fish-pond-prep',
    title: 'Freshwater Fish Pond Preparation & Liming Protocol',
    teluguTitle: 'చేపల చెరువు తయారీ - సున్నం మరియు ఎరువుల నిర్వహణ',
    category: 'aquaculture',
    duration: '18:45',
    language: 'Telugu',
    thumbnail: 'https://images.unsplash.com/photo-1636028689841-19af5807cba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    description: 'Master practical fish pond desilting, sun-drying until soil cracks, agricultural limestone application based on soil pH, and organic manuring for natural plankton bloom.',
    keyTakeaways: [
      'Apply 250-400 kg agricultural lime per hectare to neutralize pond bottom acidity.',
      'Allow pond bottom to sun-dry for 10-15 days to eradicate pathogen spores.',
      'Verify green-brown plankton bloom before introducing fingerlings.'
    ],
    videoUrlPlaceholder: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'vid-drone-spraying',
    title: 'Agricultural Drone Spraying Calibration & Safety',
    teluguTitle: 'వ్యవసాయ డ్రోన్ పిచికారీ - తీసుకోవాల్సిన జాగ్రత్తలు',
    category: 'machinery',
    duration: '11:15',
    language: 'Bilingual',
    thumbnail: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    description: 'Step-by-step tutorial on droplet size calibration, battery handling, flight route planning, and wind drift safety guidelines for spraying in cotton and chili crops.',
    keyTakeaways: [
      'Always spray during calm early morning or late afternoon hours.',
      'Maintain 2 meters uniform altitude above crop canopy.',
      'Triple-rinse nozzle manifold after spraying micronutrients or bio-agents.'
    ],
    videoUrlPlaceholder: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'vid-cotton-pest',
    title: 'Integrated Pest Management (IPM) in Cotton & Chilli',
    teluguTitle: 'పత్తి మరియు మిర్చిలో సమగ్ర సస్యరక్షణ పద్ధతులు',
    category: 'disease',
    duration: '16:05',
    language: 'Telugu',
    thumbnail: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    description: 'Learn non-chemical IPM techniques including yellow sticky traps, pheromone traps for pink bollworm, border crops of maize, and timely neem oil sprays.',
    keyTakeaways: [
      'Install 8-10 pheromone traps per acre for early pest monitoring.',
      'Spray 5% Neem Seed Kernel Extract (NSKE) at early vegetative stage.',
      'Preserve natural friendly predators like ladybird beetles and spiders.'
    ],
    videoUrlPlaceholder: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'vid-water-quality',
    title: 'Testing Dissolved Oxygen & Ammonia in Aquaculture Ponds',
    teluguTitle: 'చేపల చెరువులో ఆక్సిజన్ మరియు అమ్మోనియా పరీక్ష విధానం',
    category: 'aquaculture',
    duration: '13:50',
    language: 'English',
    thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    description: 'Visual demonstration using digital multi-probes and chemical drop titration kits to detect lethal dawn hypoxia and toxic un-ionized ammonia.',
    keyTakeaways: [
      'Check dissolved oxygen between 4:00 AM and 5:30 AM before sunrise.',
      'If DO falls below 3.0 mg/L, turn on aerators and apply oxygen tablets.',
      'Keep unionized ammonia (NH3) strictly below 0.05 mg/L to avoid gill burn.'
    ],
    videoUrlPlaceholder: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'vid-pmkisan-portal',
    title: 'How to Apply for PM-KISAN & e-KYC Verification',
    teluguTitle: 'పీఎం కిసాన్ ఈ-కేవైసీ మొబైల్‌లోనే ఎలా చేసుకోవాలి?',
    category: 'schemes',
    duration: '09:30',
    language: 'Telugu',
    thumbnail: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    description: 'Clear step-by-step screen recording guiding farmers through Aadhaar OTP e-KYC, land seeding verification, and checking installment transfer status on the mobile app.',
    keyTakeaways: [
      'Complete face-authentication eKYC using PM-KISAN mobile application.',
      'Verify NPCI bank account seeding status on the UIDAI portal.',
      'Resolve land record mismatch by uploading RoR-1B at Village Secretariat.'
    ],
    videoUrlPlaceholder: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
]
