import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface TechItem {
  num: string;
  name: string;
  category: string;
}

/* ── Category Color Map ── */
const categoryColors: Record<string, { accent: string; glow: string; bg: string }> = {
  Framework:        { accent: '#E5A93C', glow: 'rgba(229, 169, 60, 0.35)',  bg: 'rgba(229, 169, 60, 0.06)' },
  Library:          { accent: '#61DAFB', glow: 'rgba(97, 218, 251, 0.35)',  bg: 'rgba(97, 218, 251, 0.06)' },
  Language:         { accent: '#3178C6', glow: 'rgba(49, 120, 198, 0.35)',  bg: 'rgba(49, 120, 198, 0.06)' },
  Styling:          { accent: '#38BDF8', glow: 'rgba(56, 189, 248, 0.35)',  bg: 'rgba(56, 189, 248, 0.06)' },
  Motion:           { accent: '#88CE02', glow: 'rgba(136, 206, 2, 0.35)',   bg: 'rgba(136, 206, 2, 0.06)' },
  WebGL:            { accent: '#F5F5F5', glow: 'rgba(245, 245, 245, 0.25)', bg: 'rgba(245, 245, 245, 0.04)' },
  Database:         { accent: '#F29111', glow: 'rgba(242, 145, 17, 0.35)',  bg: 'rgba(242, 145, 17, 0.06)' },
  'Version Control':{ accent: '#F05032', glow: 'rgba(240, 80, 50, 0.35)',   bg: 'rgba(240, 80, 50, 0.06)' },
};

const getColors = (category: string) =>
  categoryColors[category] || { accent: '#E5A93C', glow: 'rgba(229, 169, 60, 0.35)', bg: 'rgba(229, 169, 60, 0.06)' };

/* ── Official Tech Brand SVGs ── */
const techIconMap: Record<string, string> = {
  laravel: '/tech-icons/laravel.svg',
  react: '/tech-icons/react.svg',
  typescript: '/tech-icons/typescript.svg',
  tailwind: '/tech-icons/tailwindcss.svg',
  gsap: '/tech-icons/gsap.svg',
  threejs: '/tech-icons/threejs.svg',
  php: '/tech-icons/php.svg',
  mysql: '/tech-icons/mysql.svg',
  git: '/tech-icons/git.svg',
};

const TechIcon: React.FC<{ name: string }> = ({ name }) => {
  const norm = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const iconSrc = techIconMap[norm];

  if (!iconSrc) {
    return <span style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>{name.slice(0, 2)}</span>;
  }

  return (
    <img
      src={iconSrc}
      alt={`${name} official brand logo`}
      loading="lazy"
      decoding="async"
      style={{
        width: 38,
        height: 38,
        objectFit: 'contain',
        display: 'block',
        pointerEvents: 'none',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    />
  );
};

/* ── Floating Particle Background ── */
const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isVisible = false;
    const isMobile = window.innerWidth < 768;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    const COUNT = isMobile ? 18 : 26;

    const resize = () => {
      canvas.width = canvas.offsetWidth * Math.min(window.devicePixelRatio, 1.5);
      canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 1.5);
      ctx.scale(Math.min(window.devicePixelRatio, 1.5), Math.min(window.devicePixelRatio, 1.5));
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.35 + 0.1,
      });
    }

    const draw = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 169, 60, ${p.a})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(229, 169, 60, ${0.05 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    // Pause rendering when TechStack section is not in viewport
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(animId);
      }
    }, { rootMargin: '100px' });

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

/* ── Orbital Ring Animation ── */
const OrbitalRing: React.FC<{ size: number; duration: number; opacity: number; delay?: number }> = ({
  size, duration, opacity, delay = 0,
}) => (
  <div
    className="orbital-ring"
    style={{
      width: size,
      height: size,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: `1px solid rgba(229, 169, 60, ${opacity})`,
      borderRadius: '50%',
      animation: `orbital-spin ${duration}s linear infinite`,
      animationDelay: `${delay}s`,
      pointerEvents: 'none',
    }}
  >
    {/* Orbiting dot */}
    <div
      style={{
        position: 'absolute',
        top: -3,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: `rgba(229, 169, 60, ${opacity * 3})`,
        boxShadow: `0 0 10px rgba(229, 169, 60, ${opacity * 2})`,
      }}
    />
  </div>
);

/* ── Tech Card Component ── */
const TechCard: React.FC<{ item: TechItem; index: number }> = ({ item, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const colors = getColors(item.category);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--spot-x', `${x}px`);
    card.style.setProperty('--spot-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px) scale(1.015)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="ts-card"
      data-index={index}
      style={{
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease',
        transformStyle: 'preserve-3d',
        borderColor: isHovered ? `${colors.accent}44` : 'rgba(255, 255, 255, 0.06)',
        boxShadow: isHovered
          ? `0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px ${colors.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.06)`
          : '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight Follow Effect (GPU CSS Variable Driven, Zero React Re-renders) */}
      <div
        className="card-spotlight"
        style={{
          background: isHovered
            ? `radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${colors.bg}, transparent 65%)`
            : 'none',
        }}
      />

      {/* Top accent bar */}
      <div
        className="card-accent-bar"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Background Number Watermark */}
      <span
        className="card-watermark"
        style={{
          color: isHovered ? `${colors.accent}18` : 'rgba(255, 255, 255, 0.02)',
          transform: isHovered ? 'scale(1.15) translateY(-8px)' : 'scale(1) translateY(0)',
        }}
      >
        {item.num.replace(/\s+/g, '')}
      </span>

      {/* Content */}
      <div className="card-content">
        {/* Icon + Category Row */}
        <div className="card-icon-row">
          <div
            className="card-icon-wrapper"
            style={{
              background: isHovered ? `${colors.accent}15` : 'rgba(255, 255, 255, 0.03)',
              borderColor: isHovered ? `${colors.accent}30` : 'rgba(255, 255, 255, 0.06)',
              boxShadow: isHovered ? `0 0 20px ${colors.glow}` : 'none',
            }}
          >
            <TechIcon name={item.name} />
          </div>
          <span
            className="card-category"
            style={{
              color: isHovered ? colors.accent : '#6B7280',
              background: isHovered ? `${colors.accent}10` : 'rgba(255, 255, 255, 0.04)',
              borderColor: isHovered ? `${colors.accent}25` : 'rgba(255, 255, 255, 0.06)',
            }}
          >
            {item.category}
          </span>
        </div>

        {/* Name + Number */}
        <div className="card-info">
          <span className="card-num" style={{ color: isHovered ? colors.accent : '#4B5563' }}>
            {item.num}
          </span>
          <h3
            className="card-name"
            style={{ color: isHovered ? '#FFFFFF' : '#E5E7EB' }}
          >
            {item.name}
          </h3>
        </div>

        {/* Animated bottom line */}
        <div className="card-bottom-line">
          <div
            className="card-line-fill"
            style={{
              background: `linear-gradient(90deg, ${colors.accent}, transparent)`,
              transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

/* ── Main Section ── */
export const TechStackSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header reveal
      gsap.from('.ts-header-tag', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ts-header-tag', start: 'top 85%' },
      });
      gsap.from('.ts-header-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ts-header-title', start: 'top 85%' },
      });
      gsap.from('.ts-header-desc', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ts-header-desc', start: 'top 85%' },
      });

      // Staggered card reveal
      const cards = gsap.utils.toArray<HTMLElement>('.ts-card');
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          rotateX: 12,
          scale: 0.92,
          duration: 0.9,
          ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
        });
      });

      // Orbital ring fade in
      gsap.from('.orbital-center', {
        scale: 0.6,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="ts-section"
      id="tech"
    >
      {/* Floating particles */}
      <FloatingParticles />

      {/* Decorative orbital rings (behind grid) */}
      <div className="orbital-center">
        <OrbitalRing size={400} duration={30} opacity={0.06} />
        <OrbitalRing size={600} duration={45} opacity={0.04} delay={5} />
        <OrbitalRing size={800} duration={60} opacity={0.03} delay={10} />
      </div>

      {/* Grid backdrop */}
      <div className="ts-grid-backdrop" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div className="ts-header">
          <div className="ts-header-left">
            <span className="ts-header-tag">03 // TOOLS & TECHNOLOGIES</span>
            <h2 className="ts-header-title">
              TECH<br />
              <span className="ts-title-outline">STACK</span>
            </h2>
          </div>
          <div className="ts-header-right">
            <p className="ts-header-desc">
              Crafting exceptional digital experiences with a curated toolkit of
              modern frameworks, languages, and creative technologies.
            </p>
            <span className="ts-header-count">
              <span className="ts-count-number">{portfolioData.techStack.length.toString().padStart(2, '0')}</span>
              <span className="ts-count-label">CORE PROFICIENCIES</span>
            </span>
          </div>
        </div>

        {/* Separator */}
        <div className="ts-separator">
          <div className="ts-separator-line" />
          <div className="ts-separator-dot" />
          <div className="ts-separator-line" />
        </div>

        {/* Cards Grid */}
        <div className="ts-cards-grid">
          {portfolioData.techStack.map((item, idx) => (
            <TechCard key={item.num} item={item} index={idx} />
          ))}
        </div>
      </div>

      {/* Inline Styles */}
      <style>{`
        .ts-section {
          position: relative;
          background: #080808;
          padding: 140px 0 160px;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        /* Grid Backdrop */
        .ts-grid-backdrop {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 30% 20%, rgba(229, 169, 60, 0.04), transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(229, 169, 60, 0.03), transparent 50%),
            linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 60px 60px, 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        /* Orbital */
        .orbital-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          pointer-events: none;
        }

        @keyframes orbital-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Header */
        .ts-header {
          display: flex;
          flex-direction: column;
          gap: 32px;
          margin-bottom: 48px;
        }
        @media (min-width: 768px) {
          .ts-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
          }
        }

        .ts-header-tag {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          letter-spacing: 0.18em;
          color: #E5A93C;
          text-transform: uppercase;
          margin-bottom: 16px;
          display: inline-block;
        }

        .ts-header-title {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 8vw, 7rem);
          line-height: 0.88;
          letter-spacing: 0.02em;
          color: #FFFFFF;
        }

        .ts-title-outline {
          -webkit-text-stroke: 2px rgba(229, 169, 60, 0.5);
          color: transparent;
        }

        .ts-header-right {
          max-width: 380px;
        }

        .ts-header-desc {
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.7;
          color: #9CA3AF;
          margin-bottom: 20px;
        }

        .ts-header-count {
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }

        .ts-count-number {
          font-family: var(--font-display);
          font-size: 2.5rem;
          color: #E5A93C;
          line-height: 1;
        }

        .ts-count-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          color: #6B7280;
          line-height: 1.3;
        }

        /* Separator */
        .ts-separator {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 56px;
        }

        .ts-separator-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(229, 169, 60, 0.2), transparent);
        }

        .ts-separator-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #E5A93C;
          box-shadow: 0 0 12px rgba(229, 169, 60, 0.5);
        }

        /* Cards Grid */
        .ts-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }
        @media (min-width: 640px) {
          .ts-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .ts-cards-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Card */
        .ts-card {
          position: relative;
          background: rgba(17, 17, 17, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 0;
          overflow: hidden;
          cursor: pointer;
          will-change: transform;
        }

        .card-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          border-radius: 16px;
          transition: background 0.3s ease;
        }

        .card-accent-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          z-index: 3;
          transition: opacity 0.4s ease;
        }

        .card-watermark {
          position: absolute;
          right: 16px;
          bottom: -14px;
          font-family: var(--font-display);
          font-size: 6rem;
          pointer-events: none;
          user-select: none;
          transition: color 0.4s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          line-height: 1;
          z-index: 0;
        }

        .card-content {
          position: relative;
          z-index: 1;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          min-height: 180px;
          justify-content: space-between;
        }

        .card-icon-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
        }

        .card-category {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.4s ease;
        }

        .card-info {
          display: flex;
          align-items: baseline;
          gap: 14px;
        }

        .card-num {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.15em;
          transition: color 0.3s ease;
        }

        .card-name {
          font-family: var(--font-display);
          font-size: 1.8rem;
          letter-spacing: 0.04em;
          transition: color 0.3s ease;
          margin: 0;
        }

        .card-bottom-line {
          height: 2px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 2px;
          overflow: hidden;
        }

        .card-line-fill {
          width: 100%;
          height: 100%;
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </section>
  );
};

export default TechStackSection;
