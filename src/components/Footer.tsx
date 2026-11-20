import React from 'react';
import { Terminal, ArrowUp } from 'lucide-react';

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-root">
      <div className="footer-container">
        <div className="footer-top-row">
          {/* Brand & Tagline */}
          <div className="footer-brand-wrap">
            <div className="footer-logo">
              <Terminal size={18} className="text-blue-400" />
              <span className="footer-brand-title">Dika.dev</span>
            </div>
            <p className="footer-tagline">
              Membangun pengalaman web modern dengan presisi kode, tipografi tajam, dan dimensi 3D
              interaktif.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="footer-nav-col">
            <span className="footer-col-heading">Navigasi</span>
            <div className="footer-links-list">
              <a href="#Home">Beranda</a>
              <a href="#About">Tentang Saya</a>
              <a href="#Portofolio">Portofolio</a>
              <a href="#Contact">Kontak</a>
            </div>
          </div>

          {/* Socials */}
          <div className="footer-nav-col">
            <span className="footer-col-heading">Terhubung</span>
            <div className="footer-social-row">
              <a
                href="https://github.com/boxdik089-ctrl"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href="https://instagram.com/dprxz_"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://tiktok.com/@boxdik089"
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.3V2h-3.64v13.67a2.9 2.9 0 0 1-2.9 2.75 2.9 2.9 0 0 1-2.9-2.9 2.9 2.9 0 0 1 2.9-2.9c.3 0 .6.05.88.14V9.05a6.5 6.5 0 1 0 5.66 6.45V8.53a8.4 8.4 0 0 0 4.91 1.58V6.69h-1.14Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="footer-bottom-row">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} DikaDev. All rights reserved.
          </p>

          <button type="button" onClick={scrollToTop} className="footer-back-to-top">
            <span>Kembali ke Atas</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
