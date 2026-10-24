import { CropDisease, FishHealthCondition } from '../types/farming'

export const cropDiseasesData: CropDisease[] = [
  {
    id: 'paddy-blast',
    crop: 'Paddy / Rice (వరి)',
    name: 'Rice Blast (Magnaporthe oryzae)',
    teluguName: 'వరి అగ్గితెగులు (బ్లాస్ట్)',
    severity: 'high',
    confidence: 96,
    sampleImage: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    symptoms: [
      'Spindle-shaped elliptical lesions with gray or whitish center and dark brown or reddish-brown margins on leaf blades.',
      'Node rot turning blackish and leading to stem breakage during heading stage.',
      'Neck rot causing empty, chaffy grains and lodging of panicles (blank panicles).'
    ],
    organicTreatment: [
      'Spray Pseudomonas fluorescens @ 10g / litre of water at 10-day intervals.',
      'Apply 5% Cow urine + fermented butter milk spray as bio-fungicide.',
      'Avoid excess application of chemical nitrogen fertilizer which promotes succulent tissues.'
    ],
    chemicalTreatment: [
      'Tricyclazole 75% WP @ 0.6g per litre of water OR Isoprothiolane 40% EC @ 1.5ml per litre.',
      'Alternate with Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/litre during neck blast initiation.'
    ],
    preventionGuidance: [
      'Use certified blast-resistant seed varieties (e.g. MTU-1010, BPT-5204 treated seeds).',
      'Seed treatment with Carbendazim 2g/kg seed before nursery sowing.',
      'Maintain field sanitation and burn heavily infected stubbles.'
    ]
  },
  {
    id: 'maize-armyworm',
    crop: 'Maize / Corn (మొక్కజొన్న)',
    name: 'Fall Armyworm (Spodoptera frugiperda)',
    teluguName: 'మొక్కజొన్న కత్తెర పురుగు',
    severity: 'high',
    confidence: 94,
    sampleImage: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    symptoms: [
      'Pinholes and shot-hole feeding damage on unfurled young whorl leaves.',
      'Extensive window-pane feeding leaving only transparent leaf epidermis.',
      'Presence of coarse, sawdust-like larval fecal pellets accumulated inside the leaf whorl.'
    ],
    organicTreatment: [
      'Hand-pick and destroy egg masses covered with brownish hairs.',
      'Apply dry fine sand or wood ash (10-15g) mixed with lime directly into the central whorls.',
      'Spray Bacillus thuringiensis (Bt) kurstaki formulation @ 2g/litre or Beauveria bassiana @ 5g/litre.'
    ],
    chemicalTreatment: [
      'Emamectin benzoate 5% SG @ 0.4g per litre of water OR Chlorantraniliprole 18.5% SC @ 0.4ml per litre directed into the whorl.',
      'Poison baiting: Fermented mixture of 10kg rice bran + 2kg jaggery + 100g Thiodicarb applied per acre.'
    ],
    preventionGuidance: [
      'Deep summer ploughing to expose pupae to predatory birds and sun.',
      'Intercrop with legumes (cowpea, green gram) at 2:1 or 4:1 ratio.',
      'Erect FAW pheromone traps @ 5 per acre within 15 days of sowing.'
    ]
  },
  {
    id: 'cotton-leaf-curl',
    crop: 'Cotton (పత్తి)',
    name: 'Cotton Leaf Curl Virus (CLCuV)',
    teluguName: 'పత్తి ఆకు ముడత వైరస్ తెగులు',
    severity: 'medium',
    confidence: 91,
    sampleImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    symptoms: [
      'Upward and downward curling of young leaf margins with vein thickening.',
      'Formation of enations (cup-like leaf outgrowth) on the underside of major veins.',
      'Severely stunted plant growth with aborted flower buds and minimal boll formation.'
    ],
    organicTreatment: [
      'Install yellow sticky traps @ 15-20 traps per acre to capture transmitting whitefly vectors (Bemisia tabaci).',
      'Spray Neem oil (10,000 ppm) @ 2-3ml per litre + liquid soap emulsifier.',
      'Rogue out and destroy infected viral plants during early vegetative stage (under 30 days).'
    ],
    chemicalTreatment: [
      'Whitefly vector control: Diafenthiuron 50% WP @ 1.25g per litre OR Spiromesifen 22.9% SC @ 1ml per litre.',
      'Ensure thorough spraying on the underside of leaves where whitefly nymphs colonize.'
    ],
    preventionGuidance: [
      'Sow recommended resistant or tolerant Bt cotton hybrids.',
      'Eradicate alternate weed hosts (Abutilon, Xanthium) along field bunds.',
      'Avoid late sowing which coincides with peak whitefly population outbreaks.'
    ]
  },
  {
    id: 'tomato-early-blight',
    crop: 'Tomato & Vegetables (టమాటా / కూరగాయలు)',
    name: 'Early Blight (Alternaria solani)',
    teluguName: 'టమాటా ముందస్తు ఎండు తెగులు',
    severity: 'medium',
    confidence: 93,
    sampleImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    symptoms: [
      'Concentric dark rings with target-board pattern on older lower leaves.',
      'Yellow chlorotic halos surrounding the dark necrotic leaf spots.',
      'Dark, sunken leathery lesions at the stem end of fruits.'
    ],
    organicTreatment: [
      'Spray Trichoderma viride @ 5g/litre + Panchagavya 3% foliar spray.',
      'Mulch soil surface with paddy straw to prevent fungal spores splashing from soil to lower foliage.',
      'Prune off infected lower leaves touching wet soil.'
    ],
    chemicalTreatment: [
      'Mancozeb 75% WP @ 2.5g/litre or Chlorothalonil 75% WP @ 2g/litre as protective spray.',
      'For curative action: Difenoconazole 25% EC @ 1ml/litre of clean water.'
    ],
    preventionGuidance: [
      'Follow 3-year crop rotation avoiding other Solanaceous crops (potato, brinjal, chili).',
      'Use drip irrigation instead of overhead sprinklers to keep leaf surface dry.'
    ]
  }
]

export const fishHealthConditionsData: FishHealthCondition[] = [
  {
    id: 'dropsy-ulcer',
    species: 'Indian Major Carps (Rohu / Catla / Mrigal)',
    name: 'Bacterial Ulcerative Disease / Dropsy (Aeromonas hydrophila)',
    teluguName: 'చేపల పుండ్ల తెగులు (అల్సరేటివ్ డిసీజ్) & బొబ్బలు',
    severity: 'critical',
    confidence: 95,
    sampleImage: 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    symptoms: [
      'Hemorrhagic red patches, shallow round ulcers with necrotic centers on flank and caudal peduncle.',
      'Abdominal swelling (ascites), protruding pop-eyes (exophthalmia), and raised pine-cone scales.',
      'Lethargic swimming near pond dikes, loss of appetite, and sudden mortality events.'
    ],
    immediateActions: [
      'Perform potassium permanganate (KMnO4) pond bath treatment @ 2-3 ppm (2-3 kg per acre-meter).',
      'Apply agricultural limestone (CaCO3) @ 100 kg/acre to buffer water pH and precipitate organic load.',
      'Cease all commercial feeding for 24-48 hours to prevent further bottom organic pollution.'
    ],
    prevention: [
      'Avoid high stocking density beyond 4,000 fingerlings per acre in semi-intensive culture.',
      'Maintain dissolved oxygen strictly above 4.5 mg/L using mechanical aerators.',
      'Periodically apply pond bottom probiotics (Bacillus subtilis) to digest toxic sludge.'
    ],
    veterinaryWarning: 'Bacterial septicaemia can spread rapidly in warm water. Contact your District Fisheries Development Officer or CIFA / state fisheries lab immediately for bacterial culture and antibiotic sensitivity testing.'
  },
  {
    id: 'gill-rot-hypoxia',
    species: 'Pangasius & Carps (పంకాస్ / రోహు)',
    name: 'Branchiomycosis / Bacterial Gill Rot & Dawn Hypoxia',
    teluguName: 'చేపల మొప్ప కుళ్లు తెగులు & ఆక్సిజన్ కొరత',
    severity: 'critical',
    confidence: 93,
    sampleImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    symptoms: [
      'Severe surface piping and gasping for air near pond banks between 4:00 AM and 7:00 AM.',
      'Gills appear pale, necrotic with mottled white and brown patches with heavy mucus secretion.',
      'Fish congregate around incoming freshwater inlet pipe or aerator propeller wash.'
    ],
    immediateActions: [
      'Turn on all paddlewheel aerators immediately and run continuously until 9:00 AM.',
      'Broadcast emergency oxygen-generating tablets (Sodium Percarbonate) @ 2-3 kg per acre.',
      'Pump fresh well-oxygenated water into the pond if available.'
    ],
    prevention: [
      'Never overfeed; monitor feed trays 2 hours after feeding to ensure zero leftover feed.',
      'Check dissolved oxygen daily before daybreak.',
      'Ensure pond water depth is maintained at optimal 1.5 to 1.8 meters.'
    ],
    veterinaryWarning: 'Low oxygen coupled with gill necrosis causes rapid suffocation. Do not delay emergency aeration.'
  },
  {
    id: 'fin-rot-fungal',
    species: 'Tilapia & Murrel (తిలాపియా / కొర్రమీను)',
    name: 'Fin & Tail Rot (Flexibacter columnaris)',
    teluguName: 'తోక మరియు రెక్కల కుళ్లు తెగులు',
    severity: 'moderate',
    confidence: 90,
    sampleImage: 'https://images.unsplash.com/photo-1636028689841-19af5807cba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    symptoms: [
      'Fraying of caudal, dorsal, and pectoral fins with cloudy white margins.',
      'Fin rays disintegrate leaving bare spiny skeletal rays.',
      'White cotton-like fungal tufts (Saprolegnia) settling on damaged fin margins.'
    ],
    immediateActions: [
      'Give dip treatment in 3% common salt (NaCl) solution for 3-5 minutes for affected sample fish.',
      'Broadcast Copper Sulphate (CuSO4) @ 0.5 ppm under expert supervision.',
      'Improve water transparency and exchange 20% of bottom water.'
    ],
    prevention: [
      'Handle fish with smooth knotted or knotless scoop nets during sampling to prevent mechanical injury.',
      'Disinfect drag nets in bleaching powder solution before moving between ponds.'
    ],
    veterinaryWarning: 'Secondary fungal infections follow skin abrasions. Consult an aquaculture specialist for water alkalinity testing before applying copper sulphate.'
  }
]
