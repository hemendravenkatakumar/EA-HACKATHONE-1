import React from 'react'
import { Language } from '../../types/farming'
import { Sprout } from 'lucide-react'

interface FooterProps {
  language: Language
  onNavigateTab?: (type: 'crop' | 'fish', tab: string) => void
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div>
          <div className="logo logo-light">
            <span className="logo-mark">
              <Sprout className="w-5 h-5 text-white" />
            </span>
            <span>
              AgroVoice <b>AI</b>
            </span>
          </div>
          <p>
            An intelligent farming assistant designed for crop farmers and fish farmers,
            available in Telugu and English.
          </p>
          <div style={{ marginTop: '16px', fontSize: '12px', color: '#8dd9b5' }}>
            📞 Kisan Call Centre Toll-Free: <strong>1800-180-1551</strong>
          </div>
        </div>

        <div>
          <b>Platform</b>
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#schemes">Govt Schemes</a>
          <a href="#tech">Farming Tech</a>
        </div>

        <div>
          <b>Company</b>
          <a href="#about-us">About us</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </div>

        <div>
          <b>Legal & Disclaimers</b>
          <span>Prototype demo only</span>
          <span>Not agronomic prescription</span>
          <span>Verify with local officials</span>
        </div>
      </div>

      <div className="container copyright">
        © 2026 AgroVoice AI concept. Frontend demonstration prototype for Indian agriculture & aquaculture.
      </div>
    </footer>
  )
}
