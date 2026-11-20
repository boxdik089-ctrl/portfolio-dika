import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

const NAV_ITEMS = [
  { name: 'Home', href: '#Home', section: 'Home' },
  { name: 'About', href: '#About', section: 'About' },
  { name: 'Portfolio', href: '#Portofolio', section: 'Portofolio' },
  { name: 'Contact', href: '#Contact', section: 'Contact' }
];

export const FloatingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const sections = ['Home', 'About', 'Portofolio', 'Contact'];
      const triggerY = window.innerHeight * 0.38;
      let current = sections[0];

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= triggerY) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // GSAP active pill pulse
  useEffect(() => {
    const pill = document.querySelector('.navbar-link-item.is-active .navbar-active-pill');
    if (!pill) return;

    const anim1 = gsap.fromTo(
      pill,
      { autoAlpha: 0, scale: 0.82 },
      { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'back.out(2)' }
    );
    const anim2 = gsap.to(pill, {
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.2), 0 0 28px rgba(59,130,246,.36)',
      duration: 1.5,
      delay: 0.45,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    return () => {
      anim1.kill();
      anim2.kill();
    };
  }, [activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(target, { offset: -110, duration: 1.1 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`navbar-root ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Desktop Links */}
        <nav className="navbar-links">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.section;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`navbar-link-item ${isActive ? 'is-active' : ''}`}
              >
                <span>{item.name}</span>
                {isActive && <span className="navbar-active-pill" />}
              </a>
            );
          })}
        </nav>

        {/* Mobile Brand */}
        <span className="navbar-mobile-brand" aria-label="DikaDev.">
          DikaDev.
        </span>

        {/* Mobile menu button */}
        <div className="navbar-actions">
          <button
            type="button"
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`navbar-mobile-menu ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div className="navbar-mobile-glass">
          <div className="navbar-mobile-inner">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.section;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`navbar-mobile-link ${isActive ? 'is-active' : ''}`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="navbar-mobile-indicator" />}
                </a>
              );
            })}

            <div className="navbar-mobile-footer">
              <a
                href="#Contact"
                onClick={(e) => handleNavClick(e, '#Contact')}
                className="navbar-mobile-cta"
              >
                <span>Hubungi Saya</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FloatingNavbar;
