import React, { useState } from 'react'
import { Language, FarmType } from '../../types/farming'
import { VoicePreviewCard } from './VoicePreviewCard'
import { schemesData } from '../../data/schemesData'
import { technologiesData } from '../../data/technologiesData'
import { videosData } from '../../data/videosData'
import { Modal } from '../common/Modal'
import {
  Wheat,
  Fish,
  Sprout,
  ArrowRight,
  Mic,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Play,
  Star,
  ChevronDown,
  Cloud,
  Check,
  Waves
} from 'lucide-react'

interface LandingPageProps {
  language: Language
  onOpenAuth: (mode: 'login' | 'signup', defaultType?: FarmType) => void
  onDirectDashboard: (type: FarmType) => void
  onOpenVoiceAssistant?: () => void
}

export const LandingPage: React.FC<LandingPageProps> = ({
  language,
  onOpenAuth,
  onDirectDashboard,
  onOpenVoiceAssistant
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [userRating, setUserRating] = useState(5)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [feedbackComment, setFeedbackComment] = useState('')
  const [videoModal, setVideoModal] = useState<string | null>(null)

  const cropPhoto =
    'https://images.unsplash.com/photo-1721593588838-93fa5c8b0b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1600'
  const farmerPhoto =
    'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1000'

  // Approved features list (Fertilizer/Records and Water Quality/Feed Profit removed per user request)
  const cropFeatures = [
    'Crop selection & cultivation guidance',
    'Plant disease image assistance',
    'Weather-based farming advice',
    'Government schemes & subsidies',
    'New farming technologies',
    'Crop price & profit estimation'
  ]

  const fishFeatures = [
    'Fish-health symptom assistance',
    'Feeding recommendations',
    'Fish growth monitoring',
    'Pond management & checklists',
    'Fisheries PMMSY schemes',
    'Aeration & RAS technologies'
  ]

  const faqs = [
    {
      q: 'Is AgroVoice connected to a real AI service?',
      a: 'No. AgroVoice AI is a frontend prototype. Responses, sensor readings, and recommendations are simulated demonstration data.'
    },
    {
      q: 'Are my account details securely authenticated?',
      a: 'No. Demo credentials are not sent to any database. Please do not use real passwords or sensitive personal details.'
    },
    {
      q: 'Can it replace a local agricultural or aquaculture expert?',
      a: 'No. Always verify important farming, chemical spraying, and pond mortality decisions with qualified local agronomists or fisheries officers.'
    },
    {
      q: 'Does voice recognition work in Telugu and English?',
      a: 'Yes. The platform provides a bilingual switch (English / తెలుగు) with real browser speech recognition and natural speech synthesis read-aloud controls.'
    }
  ]

  const testimonials = [
    {
      name: 'Ravi K.',
      role: 'Paddy farmer, Guntur (AP)',
      text: '“The Telugu voice flow makes the tools feel approachable, even on a busy field day. The scheme documents checklist is clear.”'
    },
    {
      name: 'Meena S.',
      role: 'Fish farmer, Krishna district',
      text: '“I like seeing pond feeding logs and growth trends together instead of in separate notebooks.”'
    },
    {
      name: 'Arjun P.',
      role: 'Farm manager, Warangal',
      text: '“The dashboard is simple and tells me what each sample reading means. Very human-designed interface.”'
    }
  ]

  return (
    <div className="site-content">
      {/* 1. HERO SECTION - EXACT DESIGN FROM SCREENSHOT */}
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="pulse-dot" /> Built for farms of every kind
            </div>
            <h1>
              Your farm. Your voice. <em>Smarter decisions.</em>
            </h1>
            <p>
              An intelligent farming assistant designed for crop farmers and fish farmers.
              Explore practical guidance, understand potential risks, and manage your farm
              through an accessible, voice-first experience.
            </p>
            <div className="hero-actions">
              <button
                className="btn primary large"
                onClick={() => onOpenAuth('signup')}
              >
                Start your demo <ArrowRight className="w-4 h-4 ml-1 inline" />
              </button>
              <a className="btn outline large" href="#features">
                Explore features
              </a>
            </div>
            <div className="trust-row">
              <div className="avatars">
                <span>క</span>
                <span>F</span>
                <span>ర</span>
              </div>
              <p>
                <b>English + తెలుగు</b>
                <br />
                Designed for accessible farming support
              </p>
            </div>
          </div>

          <div className="hero-visual">
            <img src={cropPhoto} alt="Farmer walking through a green crop field" />
            <div className="float-card weather">
              <span className="icon-box">
                <Cloud className="w-5 h-5 text-[#23714f]" />
              </span>
              <div>
                <small>DEMO WEATHER</small>
                <b>28°C · Good to irrigate</b>
              </div>
            </div>
            <div className="float-card voice">
              <span className="sound">∿</span>
              <div>
                <small>VOICE ASSISTANT</small>
                <b>Listening in Telugu…</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOGO STRIP - EXACT FROM SCREENSHOT */}
      <section className="logo-strip">
        <div className="container">
          <span>ONE PLATFORM FOR</span>
          <b>
            <Sprout className="w-4 h-4 text-[#2a8b5e]" /> Crop farming
          </b>
          <b>
            <Waves className="w-4 h-4 text-[#15727b]" /> Aquaculture
          </b>
          <b>
            <Mic className="w-4 h-4 text-[#23714f]" /> Voice-first guidance
          </b>
          <b>
            <Check className="w-4 h-4 text-[#2a8b5e]" /> Farm insights
          </b>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section className="section about" id="about-us">
        <div className="container about-grid">
          <div className="photo-stack">
            <img src={farmerPhoto} alt="Farmer harvesting rice" />
            <div className="photo-note">
              <strong>Simple by design</strong>
              <span>Guidance made easier to understand</span>
            </div>
          </div>
          <div>
            <span className="section-tag">ABOUT AGROVOICE AI</span>
            <h2>Making farming smarter and more accessible</h2>
            <p className="lead">
              AgroVoice AI is a digital farming platform designed to make agricultural information
              easier to access through an AI assistant, voice interaction, and farmer-friendly tools.
            </p>
            <div className="mini-grid">
              <div>
                <Mic className="w-6 h-6 text-[#28835a] mb-2" />
                <h3>Voice-first access</h3>
                <p>Ask naturally in Telugu or English.</p>
              </div>
              <div>
                <Sprout className="w-6 h-6 text-[#28835a] mb-2" />
                <h3>Two farm modes</h3>
                <p>Focused tools for crops and aquaculture.</p>
              </div>
            </div>
            <p className="demo-note">
              Prototype concept — guidance and data shown are for demonstration only.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION (TAILORED WORKSPACES) */}
      <section className="section features" id="features">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-tag">BUILT AROUND YOUR FARM</span>
              <h2>Specialist tools, without the complexity</h2>
            </div>
            <p>
              Choose the workspace that matches your farm. Each experience combines practical tools
              with a shared voice assistant.
            </p>
          </div>

          <div className="feature-columns">
            {/* Crop Farming Card */}
            <article className="feature-group crop-group">
              <div className="feature-top">
                <span className="big-icon">
                  <Wheat className="w-7 h-7 text-[#24704f]" />
                </span>
                <div>
                  <small>CROP FARMING</small>
                  <h3>Grow with more confidence</h3>
                </div>
              </div>
              <div className="feature-list">
                {cropFeatures.map((x) => (
                  <div key={x}>
                    <Check className="w-4 h-4 text-[#2d8a5e] shrink-0 mt-0.5" />
                    <span>{x}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onDirectDashboard('crop')}
                className="hover:underline flex items-center gap-1.5 font-bold text-sm text-[#21704d]"
              >
                <span>Explore crop tools</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </article>

            {/* Fish Farming Card */}
            <article className="feature-group fish-group">
              <div className="feature-top">
                <span className="big-icon">
                  <Fish className="w-7 h-7 text-[#15727b]" />
                </span>
                <div>
                  <small>FISH FARMING</small>
                  <h3>Keep every pond on track</h3>
                </div>
              </div>
              <div className="feature-list">
                {fishFeatures.map((x) => (
                  <div key={x}>
                    <Check className="w-4 h-4 text-[#19818a] shrink-0 mt-0.5" />
                    <span>{x}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onDirectDashboard('fish')}
                className="hover:underline flex items-center gap-1.5 font-bold text-sm text-[#126f79]"
              >
                <span>Explore aquaculture tools</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="section how" id="how-it-works">
        <div className="container">
          <span className="section-tag">HOW IT WORKS</span>
          <h2>From question to clear next step</h2>
          <div className="steps">
            {[
              {
                step: '01',
                title: 'Create a demo account',
                desc: 'Set your language preference (Telugu or English) in moments.'
              },
              {
                step: '02',
                title: 'Choose your farming type',
                desc: 'Select crop farming or aquaculture to open your tailored workspace.'
              },
              {
                step: '03',
                title: 'Open your tailored dashboard',
                desc: 'See tools and sample insights customized for your farm.'
              },
              {
                step: '04',
                title: 'Ask, plan and track',
                desc: 'Use calculators, biometric records and the voice assistant.'
              }
            ].map((s) => (
              <div className="step" key={s.step}>
                <span>{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VOICE ASSISTANT PREVIEW (DARK BANNER) */}
      <section className="section assistant-preview">
        <div className="container preview-grid">
          <div>
            <span className="section-tag light">VOICE ASSISTANT PREVIEW</span>
            <h2>Farming guidance that starts with your voice</h2>
            <p>
              Tap the microphone, ask in your preferred language, and view a clear simulated response.
              Text input is always available too.
            </p>
            <div className="prompt-pills">
              <span>“When should I spray for leaf disease?”</span>
              <span>“How much feed for Rohu today?”</span>
            </div>
            <button
              className="btn white"
              onClick={() => (onOpenVoiceAssistant ? onOpenVoiceAssistant() : onOpenAuth('signup'))}
            >
              Try the demo assistant <ArrowRight className="w-4 h-4 ml-1 inline" />
            </button>
          </div>

          <div className="voice-orb">
            <div className="rings">
              <button
                type="button"
                onClick={() => (onOpenVoiceAssistant ? onOpenVoiceAssistant() : onOpenAuth('signup'))}
                aria-label="Preview microphone"
              >
                <Mic className="w-8 h-8 text-white" />
              </button>
            </div>
            <div className="transcript">
              <small>SIMULATED RESPONSE</small>
              <p>“Based on regional weather, spraying early tomorrow avoids daytime wind drift.”</p>
              <span>Not agronomic advice · Verify locally</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GOVERNMENT SCHEMES HIGHLIGHTS */}
      <section className="section schemes-highlight" id="schemes" style={{ background: '#fbfcf8' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-tag">VERIFIED SCHEMES</span>
              <h2>Government Schemes & Subsidies</h2>
            </div>
            <button
              className="btn primary"
              onClick={() => onOpenAuth('signup')}
            >
              Explore all schemes <ArrowRight className="w-4 h-4 ml-1 inline" />
            </button>
          </div>

          <div className="feature-columns" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {schemesData.slice(0, 3).map((scheme) => (
              <div
                key={scheme.id}
                className="feature-group"
                style={{ padding: '28px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#287452', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                    {scheme.category}
                  </span>
                  <span style={{ fontSize: '11px', color: '#7a8a81' }}>Verified {scheme.lastVerified}</span>
                </div>
                <h3 style={{ fontSize: '18px', color: '#153d30', marginBottom: '4px' }}>{scheme.name}</h3>
                <p style={{ fontSize: '12px', color: '#2a8b5e', fontWeight: 700, marginBottom: '12px' }}>{scheme.teluguName}</p>
                <p style={{ fontSize: '13px', color: '#607168', lineHeight: 1.6, marginBottom: '16px' }}>{scheme.description}</p>
                <div style={{ borderTop: '1px solid #e5ebe6', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '12px', fontWeight: 700, color: '#1f6a49', textDecoration: 'underline' }}
                  >
                    Official Portal →
                  </a>
                  <button
                    onClick={() => onOpenAuth('signup')}
                    style={{ fontSize: '12px', fontWeight: 700, color: '#52655d' }}
                  >
                    View Checklist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. NEW FARMING TECHNOLOGIES */}
      <section className="section tech-highlight" id="tech" style={{ background: '#f4f7f1' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-tag">AGRITECH INNOVATIONS</span>
              <h2>New Farming Technologies</h2>
            </div>
            <p>Explore modern agricultural drones, soil sensors, and solar aeration with subsidy guidance.</p>
          </div>

          <div className="feature-columns" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {technologiesData.slice(0, 3).map((tech) => (
              <div key={tech.id} className="feature-group" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <img src={tech.image} alt={tech.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '24px' }}>
                  <small style={{ fontSize: '10px', fontWeight: 800, color: '#2a8b5e', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                    {tech.category}
                  </small>
                  <h3 style={{ fontSize: '17px', color: '#153d30', margin: '6px 0 2px' }}>{tech.title}</h3>
                  <p style={{ fontSize: '12px', color: '#2a8b5e', fontWeight: 600, marginBottom: '8px' }}>{tech.teluguTitle}</p>
                  <p style={{ fontSize: '12px', color: '#607168', lineHeight: 1.6, marginBottom: '16px' }}>{tech.description}</p>
                  <button
                    className="btn outline"
                    style={{ width: '100%', padding: '10px' }}
                    onClick={() => onOpenAuth('signup')}
                  >
                    Learn How to Use →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. WHY AGROVOICE BENEFITS */}
      <section className="section benefits">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-tag">WHY AGROVOICE</span>
              <h2>Made to feel useful from day one</h2>
            </div>
          </div>
          <div className="benefit-grid">
            {[
              ['01', 'One clear workspace', 'Farm tools, records and guidance stay together.'],
              ['02', 'Local-language access', 'Switch between English and Telugu anytime.'],
              ['03', 'Practical planning', 'Estimate inputs, revenue and potential profit.'],
              ['04', 'Designed responsibly', 'Demo advice is clearly labelled and easy to verify.']
            ].map((x) => (
              <article key={x[0]}>
                <span>{x[0]}</span>
                <h3>{x[1]}</h3>
                <p>{x[2]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. REVIEWS & TESTIMONIALS */}
      <section className="section reviews" id="reviews">
        <div className="container">
          <div className="review-intro">
            <span className="section-tag">DESIGN PREVIEW</span>
            <h2>What the experience feels like</h2>
            <p>
              Feedback and sample ratings below demonstrate the farmer review experience.
            </p>
            <div className="rating-summary">
              <b>4.8</b>
              <div>
                <span>★★★★★</span>
                <small>Sample rating · 124 responses</small>
              </div>
            </div>
          </div>

          <div className="review-cards">
            {testimonials.map((r, i) => (
              <article key={i}>
                <div className="stars">★★★★★</div>
                <p>{r.text}</p>
                <footer>
                  <span>{r.name[0]}</span>
                  <div>
                    <b>{r.name}</b>
                    <small>{r.role}</small>
                  </div>
                </footer>
                <label>DEMO TESTIMONIAL</label>
              </article>
            ))}
          </div>

          <form
            className="review-form"
            onSubmit={(e) => {
              e.preventDefault()
              setFeedbackSubmitted(true)
            }}
          >
            <div>
              <h3>Share prototype feedback</h3>
              <p>Frontend-only: your feedback is received in this browser session.</p>
            </div>
            <div className="star-input" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  className={userRating >= n ? 'selected' : ''}
                  onClick={() => setUserRating(n)}
                  key={n}
                >
                  ★
                </button>
              ))}
            </div>
            <input
              aria-label="Feedback"
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
              placeholder="What did you think of the bilingual voice and tools?"
              required
            />
            <button className="btn primary" disabled={feedbackSubmitted}>
              {feedbackSubmitted ? 'Thanks — received' : 'Submit feedback'}
            </button>
          </form>
        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section className="section faq">
        <div className="container faq-grid">
          <div>
            <span className="section-tag">COMMON QUESTIONS</span>
            <h2>Good to know before you begin</h2>
            <p>This experience is a product prototype for rural and agritech accessibility.</p>
          </div>
          <div>
            {faqs.map((faq, idx) => (
              <details key={idx} open={idx === 0}>
                <summary>
                  {faq.q}
                  <span>+</span>
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CONTACT / CTA SECTION */}
      <section className="contact" id="contact">
        <div className="container contact-box">
          <div>
            <span className="section-tag light">LET’S GROW SMARTER</span>
            <h2>Ready to explore your farm workspace?</h2>
            <p>Set up a demo profile and see how AgroVoice AI adapts to crop or fish farming.</p>
          </div>
          <button
            className="btn white large"
            onClick={() => onOpenAuth('signup')}
          >
            Create demo account <ArrowRight className="w-4 h-4 ml-1 inline" />
          </button>
        </div>
      </section>
    </div>
  )
}
