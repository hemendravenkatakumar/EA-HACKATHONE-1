import React, { useState } from 'react'
import { Language, FarmType } from '../../types/farming'
import { LanguageToggle } from './LanguageToggle'
import {
  Sprout,
  Menu,
  X,
  ArrowRight
} from 'lucide-react'

interface NavbarProps {
  language: Language
  onLanguageToggle: (lang: Language) => void
  onNavigatePage: (page: string) => void
  onOpenAuth: (mode: 'login' | 'signup', farmType?: FarmType) => void
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageToggle,
  onNavigatePage,
  onOpenAuth
}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const nav = [
    { label: 'About Us', href: '#about-us' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' }
  ]

  return (
    <header className="nav-wrap">
      <nav className="nav container">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={() => onNavigatePage('home')}
          className="logo"
          aria-label="AgroVoice AI home"
        >
          <span className="logo-mark">
            <Sprout className="w-5 h-5 text-white" />
          </span>
          <span>
            AgroVoice <b>AI</b>
          </span>
        </a>

        {/* Center Desktop Links */}
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </a>
          ))}
        </div>

        {/* Right Desktop Actions */}
        <div className="nav-actions">
          <LanguageToggle language={language} onToggle={onLanguageToggle} />

          <button
            type="button"
            className="btn ghost"
            onClick={() => onOpenAuth('login')}
          >
            Log in
          </button>

          <button
            type="button"
            className="btn primary"
            onClick={() => onOpenAuth('signup')}
          >
            <span>Get started</span>
            <ArrowRight className="w-4 h-4 ml-1 inline" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
    </header>
  )
}
