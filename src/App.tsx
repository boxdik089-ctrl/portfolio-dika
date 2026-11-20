import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Preloader } from './components/Preloader';
import { StarMeteorCanvas } from './components/StarMeteorCanvas';
import { FloatingNavbar } from './components/FloatingNavbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { EduExpSection } from './components/EduExpSection';
import { SpotifySection } from './components/SpotifySection';
import { PortfolioSection } from './components/PortfolioSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  // Always run the preloader on every page load/refresh
  const [introFinished, setIntroFinished] = useState(false);
  const [lanyardStarted, setLanyardStarted] = useState(false);

  useEffect(() => {
    document.title = 'Dika Armadana | Portofolio';
    sessionStorage.removeItem('portfolio-intro-finished');

    // Initialize Lenis Smooth Scrolling (Per user rules: duration: 0.85, wheelMultiplier: 1.15)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const lenis = new Lenis({
      duration: isTouchDevice ? 0.6 : 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.5,
      syncTouch: false
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      lenisRef.current = null;
      delete (window as any).lenis;
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (introFinished) {
      lenis.start();
    } else {
      lenis.stop();
    }
  }, [introFinished]);

  // GSAP Ambient Orbs & Section Scroll Reveals
  useEffect(() => {
    if (!introFinished || !pageRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const ctx = gsap.context(() => {
      // Ambient floating orbs
      if (!isMobile) {
        gsap.utils.toArray('.gsap-ambient-orb', pageRef.current).forEach((orb: any, idx: number) => {
          gsap.to(orb, {
            x: idx % 2 === 0 ? 28 : -24,
            y: idx === 1 ? -34 : 26,
            scale: idx === 2 ? 1.12 : 1.06,
            autoAlpha: idx === 1 ? 0.72 : 0.9,
            duration: 7 + idx * 1.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: idx * -1.4
          });
        });
      }

      // Section scroll reveals
      const reveals = [
        ['.about-root-section', '.section-display-title', '.about-intro, .about-portrait-stage, .about-bio'],
        ['.experience-section', '.experience-group h2', '.experience-card, .experience-stat-card'],
        ['.spotify-section', '.spotify-copy h2', '.spotify-card'],
        [
          '.portfolio-root-section',
          '.section-display-title',
          '.portfolio-tab-bar, .portfolio-projects-view, .portfolio-skills-view, .portfolio-certificates-view, .portfolio-awards-view'
        ],
        ['.contact-root-section', '.section-display-title', '.contact-panel']
      ];

      reveals.forEach(([secSel, titleSel, contentSel]) => {
        const sec = pageRef.current?.querySelector(secSel);
        if (!sec) return;
        const titles = sec.querySelectorAll(titleSel);
        const contents = sec.querySelectorAll(contentSel);

        if (titles.length) {
          gsap.fromTo(
            titles,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: titles[0],
                start: 'top bottom-=120',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        if (contents.length) {
          gsap.fromTo(
            contents,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: contents[0],
                start: 'top bottom-=90',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });
    }, pageRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [introFinished]);

  return (
    <div ref={pageRef} className="home-page-container">
      {/* GSAP Ambient Glow Orbs */}
      <div className="gsap-ambient" aria-hidden="true">
        <span className="gsap-ambient-orb gsap-ambient-orb-one" />
        <span className="gsap-ambient-orb gsap-ambient-orb-two" />
        <span className="gsap-ambient-orb gsap-ambient-orb-three" />
      </div>

      {/* Background Star & Meteor Canvas */}
      <StarMeteorCanvas />

      <div className="home-ui-scale">
        {/* Preloader */}
        {!introFinished && (
          <Preloader
            onComplete={() => setIntroFinished(true)}
            onExitAnimationStart={() => setLanyardStarted(true)}
          />
        )}

        {/* Floating Glass Navbar */}
        <FloatingNavbar />

        {/* Main Content Sections */}
        <main>
          <HeroSection lanyardIntroStarted={lanyardStarted} />
          <AboutSection />
          <EduExpSection />
          <SpotifySection />
          <PortfolioSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
