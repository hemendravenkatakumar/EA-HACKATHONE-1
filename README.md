# AgroVoice AI — Smart Farming & Aquaculture Platform

**AgroVoice AI** is a premium, modern, responsive agritech platform designed specifically for Indian farmers and aquaculture producers. Built with a human-crafted aesthetic, authentic agrarian photography, bilingual voice capabilities (English + Telugu), and specialized modules for **Normal Agriculture (Crop Farming)** and **Fish Farming (Aquaculture)**.

---

## 🌟 Key Features

### 1. Public Landing Page
- **Hero Experience**: *"Your Farm. Your Voice. Smarter Decisions."* (మీ పొలం. మీ స్వరం. తెలివైన నిర్ణయాలు.)
- **Bilingual Switcher**: Instant toggle between English and Telugu (`తెలుగు`) across all UI text, voice prompts, and speech audio.
- **Dual Prominent Cards**: High-contrast, tailored access cards for **Crop Farming** (paddy, cotton, maize, chilli) and **Fish Farming** (carps, pangasius, tilapia, shrimp).
- **Interactive Voice Assistant Preview**: Live interactive microphone testing sound wave animations, voice transcription, and browser speech synthesis read-aloud.
- **Government Scheme Highlights**: Real, verified schemes (PM-KISAN, PMFBY, Rythu Bharosa, PMMSY, SMAM) with official government links.
- **New Farming Technologies**: Highlights on agricultural spraying drones, IoT soil probes, and solar aerators with specs and capital subsidy details.
- **Farming Tutorial Videos**: Masterclass cards with duration tags, language badges, and an interactive video preview player.
- **Social Proof & Feedback**: User reviews from Andhra Pradesh, Telangana, and an interactive feedback form.
- **Official Portals & Helpline**: Verified government links (`pmkisan.gov.in`, `pmmsy.dof.gov.in`) and Kisan Call Centre Toll-Free: **1800-180-1551**.

### 2. User Accounts & Farm Mode Routing
- **1-Click Demo Profiles**: Instant 1-click access as *"Ramesh Patel (Crop Farmer)"* or *"Kiran Verma (Aqua Farmer)"*.
- **Farm Type Selector**: Normal Agriculture vs Fish Farming.
- **Prototype Notice**: Clear disclaimers that demo credentials are not sent to any database, safeguarding farmer privacy.

### 3. Crop Farming Dashboard
- **AI Voice Assistant (Gemini-Style)**:
  - Multi-turn conversational interface with user & assistant bubbles.
  - Real browser speech recognition (`webkitSpeechRecognition` / `SpeechRecognition`) + fallback audio waveform simulator.
  - Spoken audio responses via `window.speechSynthesis` with Read, Replay, Pause, and Stop controls.
  - Voice navigation commands: *"Open crop farming"*, *"Show schemes"*, *"Calculate profit"*, etc.
  - History sidebar with quick-restore sessions.
- **Plant Disease Detection**:
  - Upload crop or leaf photograph or pick from verified sample presets (Paddy Blast, Maize Fall Armyworm, Cotton Leaf Curl, Tomato Early Blight).
  - Diagnostic report with confidence score, visible symptoms, organic remedies (Neem, Trichoderma, Pseudomonas), approved chemical interventions, and prevention protocols.
- **Fertilizer & Irrigation Advisor**:
  - Custom calculations for Rice, Maize, Cotton, and Chilli.
  - Balanced N-P-K nutrient schedules, split Urea/DAP/MOP applications, micronutrient advice, and responsible fertilizer warnings.
- **Weather-Based Farming Advice**:
  - 5-day regional forecast (e.g. Guntur, Karimnagar, Warangal, Godavari).
  - Practical advisories for safe spray windows, irrigation pauses before heavy rain, and harvesting alerts.
- **Government Schemes Directory**:
  - Searchable directory with category filters (Income Support, Insurance, Mechanization, Micro-Irrigation).
  - Modal with eligibility criteria, required documents checklist, application steps, and verified official portals.
- **New Farming Technologies**:
  - Drones, IoT probes, precision laser levelers, and climate-controlled polyhouses with subsidy rates and step-by-step operating instructions.
- **Educational Video Library**:
  - Filterable video masterclasses with key takeaways and interactive video modal.
- **Crop Price & Profit Estimator**:
  - Working frontend calculator responding live to acreage, expected quintal yield, mandi selling price, and breakdown of expenses (seeds, fertilizer, machinery, labor, irrigation, transport).
  - Calculates gross revenue, total expenses, net profit/loss, profit per acre, and ROI percentage with cost distribution visual progress bars.
- **Farm Records Diary**:
  - Log daily farm operations (fertilizer, watering, scouting, harvest) with filterable history table.

### 4. Fish Farming Dashboard (Aquaculture)
- **Aquaculture Oceanic Design**: Tailored deep teal and blue palette (`#0d4e58`, `#147281`, `#0ea5e9`).
- **AI Aquaculture Assistant**: Contextual questions for pond water quality, dawn dissolved oxygen depletion, feeding trays, and PMMSY subsidies.
- **Water Quality Assessment**:
  - Interactive sliders with real-time safety badges for **pH (7.2 - 8.5)**, **Dissolved Oxygen (> 4.5 mg/L)**, **Ammonia (< 0.05 mg/L)**, **Temperature**, and **Alkalinity**.
  - One-click presets (Normal, Dawn Low DO Hypoxia, High Ammonia Spikes).
  - Corrective treatment actions (aerators running hours, agricultural lime / dolomite dosage, water exchange volume).
- **Fish Health Diagnostics**:
  - Species selector (Rohu, Catla, Pangasius, Tilapia, Vannamei Shrimp).
  - Clinical symptom checklist and photo inspection for bacterial ulcers, gill necrosis, and fin rot with immediate pond countermeasures.
- **Feeding Recommendations**:
  - Computes total biomass (kg), daily feed ration (% body weight), morning/evening split portions, and recommended floating pellet sizes.
- **Fish Growth Monitoring**:
  - Days of culture (DOC) tracker, initial vs current sample weights, Average Daily Gain (ADG in g/day), and interactive SVG growth trajectory chart.
- **Pond Management Hub**:
  - Multi-pond cards (Nursery, Grow-Out, Pangasius, Shrimp) with live aerator ON/OFF controls and daily maintenance checklist.
- **Feed Cost & Profit Calculator**:
  - Calculates surviving fish, harvest tonnage, gross revenue, operating costs, Feed Conversion Ratio (FCR), and net profit per kg.

---

## 💻 Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + Manrope & DM Sans typography
- **Icons**: Lucide React
- **Voice Capabilities**: Web Speech API (`webkitSpeechRecognition` & `SpeechSynthesis`) + Fallback Audio Visualizer
- **Bundler**: Vite 8

---

## 🚀 Running the Project

The Vite development server is configured on port `8443` (or default `$PORT`):

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build
```

---

## 🛡️ Responsible Agritech Disclaimer

AgroVoice AI is a frontend demonstration prototype. All AI responses, sensor measurements, weather forecasts, and market prices are simulated models for interface evaluation and do not replace certified advice from your local Agriculture Extension Officer (AO) or Fisheries Development Officer (FDO).
