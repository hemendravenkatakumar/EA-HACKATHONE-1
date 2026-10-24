import { Scheme } from '../types/farming'

export const schemesData: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    teluguName: 'పీఎం కిసాన్ సమ్మాన్ నిధి',
    category: 'income',
    targetType: 'crop',
    description: 'Central government income support scheme providing direct financial benefit to landholding farmer families across India.',
    benefits: [
      '₹6,000 per year transferred directly to bank account in 3 equal installments of ₹2,000 every 4 months.',
      '100% centrally funded through Direct Benefit Transfer (DBT).',
      'No intermediary commission; linked with Aadhaar verification.'
    ],
    eligibility: [
      'All landholding farmer families with cultivable land in their names.',
      'Exclusions: Institutional landholders, former/present ministers, income tax payees of last assessment year.'
    ],
    requiredDocuments: [
      'Aadhaar Card linked with mobile number',
      'Pattadar Passbook / Land Record (RoR 1B or Khatauni)',
      'Bank Account Passbook with IFSC code'
    ],
    applicationSteps: [
      'Visit the official PM-KISAN portal (pmkisan.gov.in).',
      'Click on "Farmer Corner" and select "New Farmer Registration".',
      'Enter Aadhaar number, state, and mobile number, then submit OTP.',
      'Fill in land survey numbers, account details, and upload documents.'
    ],
    officialUrl: 'https://pmkisan.gov.in',
    lastVerified: 'October 2026',
    department: 'Ministry of Agriculture and Farmers Welfare, Govt of India'
  },
  {
    id: 'pmmsy-fisheries',
    name: 'Pradhan Mantri Matsya Sampada Yojana (PMMSY)',
    teluguName: 'పీఎం మత్స్య సంపద యోజన (చేపల పథకం)',
    category: 'fisheries',
    targetType: 'fish',
    description: 'Flagship initiative for sustainable development and blue revolution in Indian fisheries and aquaculture sectors.',
    benefits: [
      'Subsidy up to 40% of project cost for General Category farmers.',
      'Subsidy up to 60% of project cost for SC, ST, and Women beneficiaries.',
      'Covers pond construction, biofloc units, paddlewheel aerators, solar systems, and feed mills.'
    ],
    eligibility: [
      'Individual fishers, fish farmers, Self-Help Groups (SHGs), and Fisheries Cooperatives.',
      'Must possess owned or leased land/pond water rights for minimum 7-10 years.'
    ],
    requiredDocuments: [
      'Aadhaar Card and PAN Card',
      'Pond land title deed or registered lease agreement',
      'Detailed Project Report (DPR) / Cost estimate',
      'Bank account details and caste certificate (if claiming 60% SC/ST quota)'
    ],
    applicationSteps: [
      'Visit the official PMMSY portal (pmmsy.dof.gov.in).',
      'Select individual or group beneficiary registration.',
      'Select component (e.g. New Freshwater Pond or Aeration Equipment).',
      'Submit through your District Fisheries Officer (DFO) for technical sanction.'
    ],
    officialUrl: 'https://pmmsy.dof.gov.in',
    lastVerified: 'September 2026',
    department: 'Department of Fisheries, Ministry of Fisheries, Animal Husbandry & Dairying'
  },
  {
    id: 'pmfby-insurance',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    teluguName: 'ప్రధాన మంత్రి ఫసల్ బీమా యోజన (పంటల బీమా)',
    category: 'insurance',
    targetType: 'crop',
    description: 'Comprehensive yield and weather insurance cover protecting farmers against natural calamities, pests, and unseasonal rainfall.',
    benefits: [
      'Uniform very low premium: only 2% for Kharif crops, 1.5% for Rabi, and 5% for commercial/horticultural crops.',
      'Balance premium fully subsidized by Central and State Governments.',
      'Fast digital claim settlement via satellite imagery and Crop Cutting Experiments (CCE).'
    ],
    eligibility: [
      'All farmers growing notified crops in notified areas during notified seasons.',
      'Covers both loanee and non-loanee farmers, sharecroppers, and tenant farmers.'
    ],
    requiredDocuments: [
      'Sowing Certificate / Crop Declaration issued by Village Revenue Officer',
      'Land Records (Pahani / Adangal / Khasra)',
      'Bank Account Passbook and Aadhaar Card'
    ],
    applicationSteps: [
      'Apply online via pmfby.gov.in or through local Common Service Centre (CSC) or bank branch.',
      'Apply before the cutoff date (usually July 31 for Kharif, Dec 31 for Rabi).',
      'Track policy status using application number on the PMFBY mobile app.'
    ],
    officialUrl: 'https://pmfby.gov.in',
    lastVerified: 'October 2026',
    department: 'Ministry of Agriculture and Farmers Welfare'
  },
  {
    id: 'rythu-bharosa',
    name: 'Rythu Bharosa / Farmer Investment Support',
    teluguName: 'రైతు భరోసా / రైతు బంధు పెట్టుబడి సాయం',
    category: 'income',
    targetType: 'crop',
    description: 'State government input assistance providing direct cash aid before sowing season for seeds, fertilizers, and field preparation.',
    benefits: [
      'Financial assistance of ₹13,500 per family per year (inclusive of PM-KISAN component).',
      'Direct credit into beneficiary bank accounts in time for Kharif and Rabi input purchase.',
      'Tenant farmer support cards provided for recognized cultivator families.'
    ],
    eligibility: [
      'Farmer families owning agricultural land as per state revenue records (Meebhoomi / Dharani portal).',
      'Tenant farmers enrolled under the Authorized Rythu / Tenant Registry.'
    ],
    requiredDocuments: [
      'Pattadar Passbook / Digital Title Deed',
      'Aadhaar card of family head',
      'Bank account details mapped with NPCI Aadhaar Seeding'
    ],
    applicationSteps: [
      'Verification conducted automatically via Rythu Bharosa Kendras (RBKs) / Village Secretariats.',
      'Farmers can verify their inclusion on the designated state portal using Aadhaar number.',
      'Grievances can be logged at local Village Secretariat counters.'
    ],
    officialUrl: 'https://apagrisnet.gov.in',
    lastVerified: 'August 2026',
    department: 'State Department of Agriculture'
  },
  {
    id: 'smam-mechanization',
    name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    teluguName: 'వ్యవసాయ యాంత్రీకరణ సబ్-మిషన్ (SMAM)',
    category: 'mechanization',
    targetType: 'both',
    description: 'Promotes farm mechanization with up to 40-50% subsidy on tractors, power weeders, rotavators, sprayers, and agricultural drones.',
    benefits: [
      'Subsidy of 40% to 50% on agricultural machinery purchase.',
      'Custom Hiring Centre (CHC) establishment grants up to 40% (max ₹10 Lakhs).',
      'Kisan Drone purchase subsidy up to ₹5 Lakhs for FPOs and ₹4 Lakhs for individual youth farmers.'
    ],
    eligibility: [
      'Small and marginal farmers, SC/ST, women farmers given special preference.',
      'Farmer Producer Organizations (FPOs) and registered village SHGs eligible for CHC grants.'
    ],
    requiredDocuments: [
      'Land revenue document verifying farming status',
      'Aadhaar Card, Bank Passbook, Caste Certificate if applicable',
      'Quotation/Invoice from authorized machinery dealer'
    ],
    applicationSteps: [
      'Visit agrimachinery.nic.in portal.',
      'Register as Farmer / FPO and choose desired machine type.',
      'Upload dealer quotation and land documents for Department sanction letter.'
    ],
    officialUrl: 'https://agrimachinery.nic.in',
    lastVerified: 'October 2026',
    department: 'Mechanization & Technology Division, Govt of India'
  },
  {
    id: 'pmksy-irrigation',
    name: 'Pradhan Mantri Krishi Sinchayee Yojana - Micro Irrigation',
    teluguName: 'పీఎం కేఎస్‌వై - సూక్ష్మ సేద్యం (డ్రిప్ & స్ప్రింక్లర్)',
    category: 'irrigation',
    targetType: 'crop',
    description: 'Per Drop More Crop scheme subsidizing drip and sprinkler irrigation systems to maximize water use efficiency.',
    benefits: [
      '55% subsidy for small and marginal farmers on drip & sprinkler systems.',
      '45% subsidy for other farmers; up to 70-90% combined subsidy in selected states for SC/ST.',
      'Saves 40-60% water while boosting crop yields by 20-30%.'
    ],
    eligibility: [
      'Farmers having assured source of irrigation water (borewell, open well, or farm pond).',
      'Minimum land holding 0.5 acre.'
    ],
    requiredDocuments: [
      'Pattadar Passbook, Aadhaar card, Electricity connection proof / Water source proof',
      'Field survey sketch from field assistant'
    ],
    applicationSteps: [
      'Submit application at district Micro Irrigation Office or State Horticulture Portal.',
      'Technical engineer surveys plot and creates system design and estimate.',
      'Farmer pays beneficiary share to accredited vendor (e.g. Jain Irrigation, Netafim).'
    ],
    officialUrl: 'https://pmksy.gov.in',
    lastVerified: 'September 2026',
    department: 'Ministry of Jal Shakti & Dept of Agriculture'
  }
]
