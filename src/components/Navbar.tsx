import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

interface NavbarProps {
  onNavigate: (targetId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', target: '#about' },
    { label: 'Work', target: '#work' },
    { label: 'Moments', target: '#moments' },
    { label: 'GitHub', target: '#github' },
    { label: 'Music', target: '#music' },
  ];

  return (
    <header className="navbar-fixed-wrapper">
      <div className={`navbar-floating-pill ${scrolled ? 'navbar-scrolled' : ''}`}>
        {/* Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('#home');
          }}
          className="navbar-brand"
        >
          <span className="brand-first">{portfolioData.brand.first}</span>
          <span className="brand-second">{portfolioData.brand.second}</span>
        </a>

        {/* Center Minimalist Navigation Links */}
        <nav className="navbar-links-group">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.target}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(link.target);
              }}
              className="navbar-link"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <style>{`
        .navbar-fixed-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 9990;
          padding: 16px 20px;
          display: flex;
          justify-content: center;
          pointer-events: none;
        }
        .navbar-floating-pill {
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 920px;
          padding: 10px 22px;
          border-radius: 9999px;
          background: rgba(10, 14, 23, 0.88);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.45);
          transition: all 0.3s ease;
          position: relative;
          z-index: 10;
        }
        .navbar-scrolled {
          background: rgba(7, 9, 14, 0.94);
          border-color: rgba(255, 255, 255, 0.16);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.65);
          padding: 8px 20px;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          user-select: none;
          white-space: nowrap;
          flex-shrink: 0;
          position: relative;
          z-index: 2;
        }
        .brand-first {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #FFFFFF;
        }
        .brand-second {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #E5A93C;
        }
        .navbar-links-group {
          display: none;
          align-items: center;
          gap: 22px;
        }
        @media (min-width: 768px) {
          .navbar-links-group {
            display: flex;
          }
        }
        .navbar-link {
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.65);
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: color 0.2s ease;
          padding: 4px 0;
        }
        .navbar-link:hover {
          color: #FFFFFF;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
