import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { LanyardCard } from './LanyardCard';

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

interface HeroSectionProps {
  lanyardIntroStarted?: boolean;
}

const TYPEWRITER_WORDS = [
  'Junior / Full-Stack Developer',
  'React & Three.js Enthusiast',
  'Creative Web Architect',
  'SMK Negeri 1 Beringin • TIK'
];

export const HeroSection: React.FC<HeroSectionProps> = ({ lanyardIntroStarted }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const handleTypewriter = useCallback(() => {
    const currentWord = TYPEWRITER_WORDS[wordIndex];
    if (isTyping) {
      if (charIndex < currentWord.length) {
        setDisplayText((prev) => prev + currentWord[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (charIndex > 0) {
        setDisplayText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timer = setTimeout(handleTypewriter, isTyping ? 80 : 40);
    return () => clearTimeout(timer);
  }, [handleTypewriter, isTyping]);

  return (
    <section className="hero-root-section" id="Home">
      {/* 3D Interactive Lanyard with Physics */}
      <LanyardCard introFinished={lanyardIntroStarted} />

      <div className="hero-container-inner">
        <div className="hero-text-col">
          <div className="hero-heading-group">
            <h1 className="hero-h1-gradient">Welcome to</h1>
            <h1 className="hero-h1-white">My Portfolio</h1>
          </div>

          <div className="hero-typewriter-row">
            <span className="hero-typewriter-text">{displayText}</span>
            <span className="hero-typewriter-cursor" />
          </div>

          <p className="hero-description-copy">
            Berawal dari rasa penasaran, sekarang jadi passion. Aku suka bereksperimen dengan kode,
            mengeksplorasi teknologi baru, dan mengubah ide menjadi sesuatu yang nyata. Dari tampilan web
            yang menarik sampai interaksi 3D yang seru, aku selalu berusaha bikin sesuatu yang bukan cuma
            keren dilihat, tapi juga nyaman digunakan.
          </p>

          <div className="hero-action-row">
            <a href="#Portofolio" className="hero-btn-primary">
              <span>Lihat Projek</span>
              <ArrowRight size={16} />
            </a>
            <a href="#Contact" className="hero-btn-secondary">
              <span>Hubungi Saya</span>
              <Send size={15} />
            </a>
          </div>

          <div className="hero-find-me-wrap">
            <span className="hero-find-me-label">FIND ME</span>
            <div className="hero-social-buttons">
              <a
                href="https://github.com/boxdik089-ctrl"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon-btn"
                aria-label="GitHub"
                title="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://instagram.com/dprxz_"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon-btn"
                aria-label="Instagram"
                title="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://tiktok.com/@boxdik089"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon-btn"
                aria-label="TikTok"
                title="TikTok"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.3V2h-3.64v13.67a2.9 2.9 0 0 1-2.9 2.75 2.9 2.9 0 0 1-2.9-2.9 2.9 2.9 0 0 1 2.9-2.9c.3 0 .6.05.88.14V9.05a6.5 6.5 0 1 0 5.66 6.45V8.53a8.4 8.4 0 0 0 4.91 1.58V6.69h-1.14Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
