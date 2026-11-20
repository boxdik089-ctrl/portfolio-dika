import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';
import SculptureHero from '@/components/ui/liquid-sculpture-hero';
import { MarqueeDemo } from '@/components/ui/marquee-demo';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Thematic Multi-Layer Parallax Scrolling (GSAP ScrollTrigger Timeline)
      const triggerElement = heroRef.current;
      if (triggerElement) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });

        const layers = [
          { layer: '1', yPercent: 40 },
          { layer: '2', yPercent: 28 },
          { layer: '3', yPercent: 14 },
          { layer: '4', yPercent: 6 },
        ];

        layers.forEach((layerObj, idx) => {
          tl.to(
            triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
            {
              yPercent: layerObj.yPercent,
              ease: 'none',
            },
            idx === 0 ? undefined : '<'
          );
        });
      }

      // Staggered intro reveal
      gsap.from('.hero-stagger-item', {
        y: 35,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-monolith-wrapper" id="home">
      {/* Parallax Layer 1: Atmospheric Horizon, Blueprint Grid & Cosmic Starscape */}
      <div
        data-parallax-layer="1"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          width: '100%',
          height: '115%',
          pointerEvents: 'none',
          backgroundImage:
            'radial-gradient(circle at 75% 35%, rgba(229, 169, 60, 0.16), transparent 50%), radial-gradient(circle at 25% 65%, rgba(212, 175, 55, 0.12), transparent 45%), linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 100% 100%, 80px 80px, 80px 80px',
          willChange: 'transform',
        }}
      />

      {/* Parallax Layer 2: Liquid Particle Sculpture & Horizon Geometry */}
      <div
        data-parallax-layer="2"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          width: '100%',
          height: '110%',
          overflow: 'hidden',
          pointerEvents: 'auto',
          willChange: 'transform',
        }}
      >
        <SculptureHero
          showNav={false}
          showCredit={false}
          theme="dark"
          darkBackground="#090805"
          tintColor="gold"
          headline=""
          eyebrow=""
          body=""
          backdropText={portfolioData.hero.lastName}
          height="100%"
          sculptureScale={1.1}
          sculptureX={20}
          sculptureY={0}
          interactive={true}
          liquid={1.2}
          strength={1.1}
          particleDensity={0.7}
          turbulence={0.9}
        />
      </div>

      {/* Parallax Layer 3: Central Hero Monolith Content & Typography */}
      <div
        data-parallax-layer="3"
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      >
        <div ref={textRef} className="hero-monolith-inner">
          <div className="hero-title-group">
            {/* Monumental Name Title */}
            <h1 className="hero-name-title hero-stagger-item">
              <span>{portfolioData.hero.firstName}</span>{' '}
              <span className="hero-name-gradient">{portfolioData.hero.lastName}</span>
            </h1>

            {/* Clean, Editorial Full Stack Role */}
            <div className="hero-role-wrapper hero-stagger-item">
              <span className="hero-role-title">{portfolioData.hero.role}</span>
              <span className="hero-role-secondary">{portfolioData.hero.roleSecondary}</span>
            </div>

            {/* Minimal & Concise Tagline */}
            <p className="hero-tagline-text hero-stagger-item">
              {portfolioData.hero.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Parallax Layer 4: Foreground Horizon Mist & Velocity-Reactive Marquee */}
      <div
        data-parallax-layer="4"
        style={{
          position: 'relative',
          zIndex: 12,
          width: '100%',
          willChange: 'transform',
        }}
      >
        <div className="border-y border-white/[0.08] bg-[#070707]/95 backdrop-blur-md overflow-hidden py-1 sm:py-2 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          <MarqueeDemo />
        </div>
      </div>

      <style>{`
        .hero-monolith-wrapper {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          background: radial-gradient(circle at 75% 40%, #17130b 0%, #070604 70%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 100px;
        }
        .hero-monolith-inner {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: calc(100vh - 180px);
          padding: 40px 0 20px;
          max-width: 760px;
        }
        .hero-title-group {
          display: flex;
          flex-direction: column;
        }
        .hero-name-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 7.2vw, 5.8rem);
          font-weight: 800;
          line-height: 1.02;
          letter-spacing: -0.035em;
          color: #FFFFFF;
          margin: 0 0 16px 0;
          text-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
        }
        .hero-name-gradient {
          background: linear-gradient(135deg, #FFFFFF 15%, #FDE68A 45%, #E5A93C 75%, #B8860B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-role-wrapper {
          display: inline-flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin: 0 0 20px 0;
        }
        .hero-role-title {
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 2.3vw, 1.8rem);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #FFFFFF;
        }
        .hero-role-secondary {
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 2.3vw, 1.8rem);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #E5A93C;
          text-shadow: 0 0 25px rgba(229, 169, 60, 0.4);
        }
        .hero-tagline-text {
          font-family: var(--font-body);
          font-size: clamp(1.02rem, 1.4vw, 1.22rem);
          line-height: 1.65;
          color: #94A3B8;
          max-width: 540px;
          margin: 0;
          text-wrap: pretty;
        }
      `}</style>
    </section>
  );
};

export default Hero;
