import { FarmingTech } from '../types/farming'

export const technologiesData: FarmingTech[] = [
  {
    id: 'agri-drones',
    title: 'Kisan Agricultural Spraying Drones',
    teluguTitle: 'వ్యవసాయ డ్రోన్ పిచికారీ పరికరాలు',
    targetType: 'crop',
    category: 'Precision Agriculture',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    description: 'Autonomous 10-16 litre payload drones designed for ultra-low volume precision spraying of nano-urea, bio-pesticides, and micronutrients over 1 acre in just 7-10 minutes.',
    benefits: [
      'Reduces pesticide exposure for farmers by 100%.',
      'Saves up to 90% water compared to manual knapsack spraying.',
      'Uniform canopy coverage reduces chemical waste and input cost by 25-30%.'
    ],
    estimatedCost: '₹4,50,000 - ₹6,50,000 (Subsidy: 50% up to ₹5 Lakhs for FPOs under SMAM)',
    subsidyAvailable: 'Available via SMAM / Kisan Drone Scheme',
    howToUseSteps: [
      'Obtain DGCA remote pilot certificate or hire certified rural drone pilot.',
      'Map the field boundary coordinates using the pilot ground station tablet.',
      'Mix recommended nano-fertilizer solution with clean water in the onboard tank.',
      'Ensure wind speed is below 12 km/h and engage automated flight path at 2m above canopy.'
    ],
    roiPeriod: '1.2 to 2 years for Custom Hiring Centers (service charge ₹400-500/acre)'
  },
  {
    id: 'iot-soil-sensors',
    title: 'Smart IoT Soil Moisture & NPK Sensors',
    teluguTitle: 'స్మార్ట్ మట్టి తేమ & పోషకాల సెన్సార్లు',
    targetType: 'crop',
    category: 'Smart Irrigation',
    image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    description: 'Wireless underground probe nodes measuring soil volumetric water content, electrical conductivity (EC), temperature, and primary NPK nutrient levels in real-time.',
    benefits: [
      'Eliminates over-irrigation and prevents root rot diseases.',
      'Sends mobile SMS alerts when root-zone moisture drops below critical refill point.',
      'Saves 35-45% electricity and pump running hours.'
    ],
    estimatedCost: '₹8,000 - ₹18,000 per field unit',
    subsidyAvailable: 'Eligible under Precision Ag Technology Grants',
    howToUseSteps: [
      'Insert the sensor probe 15-30 cm deep near the crop root zone.',
      'Connect the solar transmitter node to the regional 4G / LoRa gateway.',
      'Configure soil threshold alerts on your AgroVoice AI dashboard.'
    ],
    roiPeriod: 'Single crop season via electricity and water savings'
  },
  {
    id: 'solar-aeration-fish',
    title: 'Solar-Powered Paddlewheel Pond Aerators',
    teluguTitle: 'సౌర విద్యుత్ చెరువు ఎయిరేటర్లు',
    targetType: 'fish',
    category: 'Aquaculture Tech',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    description: 'High-efficiency 2HP and 4HP paddlewheel aerators equipped with off-grid solar panels and lithium-ion backup to maintain critical dissolved oxygen in fish ponds.',
    benefits: [
      'Zero monthly electricity bill or diesel generator costs.',
      'Prevents mass early morning fish mortality caused by oxygen depletion.',
      'Enables 25% higher fish stocking density per hectare.'
    ],
    estimatedCost: '₹85,000 - ₹1,40,000 per 2HP unit',
    subsidyAvailable: '40% - 60% subsidy under PMMSY scheme',
    howToUseSteps: [
      'Anchor aerator floats in the pond center or along the perimeter current line.',
      'Set automated timer to run during critical 2:00 AM - 6:30 AM dawn window.',
      'Clean algae from paddle blades fortnightly.'
    ],
    roiPeriod: '14-18 months based on diesel displacement'
  },
  {
    id: 'ras-biofloc',
    title: 'Recirculating Aquaculture Systems (RAS) & Biofloc',
    teluguTitle: 'రీసర్క్యులేటింగ్ ఆక్వాకల్చర్ (RAS) & బయోఫ్లాక్',
    targetType: 'fish',
    category: 'High-Density Aquaculture',
    image: 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    description: 'Indoor closed-loop circular tanks utilizing biological filtration and beneficial microbial flocs to recycle 90% of water while rearing high-value fish.',
    benefits: [
      'Yields 10x higher fish production per square meter than traditional earthen ponds.',
      'Independent of local drought or groundwater scarcity.',
      'Complete biosecurity protection against external disease vectors.'
    ],
    estimatedCost: '₹3,50,000 - ₹7,00,000 for 4-tank commercial setup',
    subsidyAvailable: 'Up to 60% capital subsidy under PMMSY',
    howToUseSteps: [
      'Cycle biofilter for 14-21 days using probiotic inoculum before stocking.',
      'Maintain carbon-to-nitrogen (C:N) ratio above 15:1 using jaggery or molasses.',
      'Monitor Imhoff cone floc volume daily between 20-40 ml/L.'
    ],
    roiPeriod: '2 to 3 harvest cycles'
  },
  {
    id: 'ai-satellite-monitoring',
    title: 'AI Satellite Crop Health & NDVI Mapping',
    teluguTitle: 'శాటిలైట్ పంట పర్యవేక్షణ & NDVI మ్యాపింగ్',
    targetType: 'crop',
    category: 'Remote Sensing',
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    description: 'Multi-spectral satellite imagery delivering vegetation index (NDVI), nitrogen deficiency maps, and early drought stress detection directly to farmer phones.',
    benefits: [
      'Pinpoints exact field patches requiring fertilizer booster before visual chlorosis occurs.',
      'Historic yield prediction helps negotiate better farm gate prices.',
      'Automates crop insurance proof submission.'
    ],
    estimatedCost: 'Free on AgroVoice AI / ₹150/acre/year for commercial high-res',
    subsidyAvailable: 'Supported via National E-Governance in Agriculture',
    howToUseSteps: [
      'Draw your field boundary on the digital cadastral map.',
      'View false-color NDVI heatmap updated every 3 to 5 days.',
      'Inspect red/yellow zones in person for soil or pest issues.'
    ],
    roiPeriod: 'Immediate benefit in input optimization'
  },
  {
    id: 'smart-greenhouse',
    title: 'Climate-Controlled Polyhouse with Fertigation',
    teluguTitle: 'ఆటోమేటిక్ పాలీహౌస్ & ఫెర్టిగేషన్',
    targetType: 'crop',
    category: 'Protected Cultivation',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    description: 'Galvanized iron naturally ventilated polyhouses with automated foggers, shading nets, and vent motors for year-round exotic vegetables and nursery saplings.',
    benefits: [
      'Protects crops from scorching summer heat, unseasonal hailstorms, and heavy rain.',
      'Enables 300% higher profit with high-value bell peppers, English cucumber, and melons.',
      'Zero heavy pesticide residues due to insect-proof netting.'
    ],
    estimatedCost: '₹950 - ₹1,400 per square meter',
    subsidyAvailable: '50% subsidy via Mission for Integrated Development of Horticulture (MIDH)',
    howToUseSteps: [
      'Install UV-stabilized 200 micron polythene film on GI framework.',
      'Link temperature and humidity sensors with exhaust fan automation.',
      'Use drip fertigation venturi injector for controlled water soluble fertilizer delivery.'
    ],
    roiPeriod: '2.5 to 3 years'
  }
]
