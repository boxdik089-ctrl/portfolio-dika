import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Theme Palette per Project ─── */
interface ProjectTheme {
  accent: string;
  glow: string;
  badgeBg: string;
}

const PROJECT_THEMES: Record<number, ProjectTheme> = {
  0: { accent: '#E5A93C', glow: 'rgba(229, 169, 60, 0.25)', badgeBg: 'rgba(229, 169, 60, 0.1)' },
  1: { accent: '#38BDF8', glow: 'rgba(56, 189, 248, 0.25)', badgeBg: 'rgba(56, 189, 248, 0.1)' },
  2: { accent: '#A78BFA', glow: 'rgba(167, 139, 250, 0.25)', badgeBg: 'rgba(167, 139, 250, 0.1)' },
};

/* ─── Individual Project Card ─── */
interface ProjectCardProps {
  project: (typeof portfolioData.projects)[0];
  index: number;
  total: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const theme = PROJECT_THEMES[index % 3];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--spot-x', `${x}px`);
    card.style.setProperty('--spot-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      className="pgallery-card"
      onMouseMove={handleMouseMove}
      style={{
        '--card-accent': theme.accent,
        '--card-glow': theme.glow,
        '--card-badge-bg': theme.badgeBg,
      } as React.CSSProperties}
    >
      {/* Cursor spotlight */}
      <div className="pgallery-spotlight" />

      {/* Top accent line */}
      <div className="pgallery-accent-line" />

      {/* Layout: Image + Content */}
      <div className="pgallery-inner">
        {/* Image */}
        <div className="pgallery-img-col">
          <div className="pgallery-img-frame">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="pgallery-img"
            />
            <div className="pgallery-img-sheen" />
            <div className="pgallery-img-badge">
              <span>EXPLORE SYSTEM</span>
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pgallery-content-col">
          <div className="pgallery-content-inner">
            {/* Project Number */}
            <div className="pgallery-meta">
              <span className="pgallery-num">// {project.number}</span>
              <span className="pgallery-dot" />
            </div>

            {/* Title */}
            <h3 className="pgallery-title">{project.title}</h3>

            {/* Subtitle */}
            <p className="pgallery-desc">{project.subtitle}</p>

            {/* Tech Tags */}
            <div className="pgallery-tags">
              {project.tech.map((tech) => (
                <span key={tech} className="pgallery-tag">
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="pgallery-cta-wrap">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="pgallery-cta"
              >
                <span>VIEW ARCHITECTURE</span>
                <ArrowUpRight size={16} className="pgallery-cta-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Section ─── */
export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 1. Section Header Entrance */
      gsap.from('.pgallery-header > *', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      /* 2. Perspective Gallery: Each card flies in from 3D depth */
      const cards = gsap.utils.toArray<HTMLElement>('.pgallery-card-wrapper');

      cards.forEach((wrapper, index) => {
        const card = wrapper.querySelector<HTMLElement>('.pgallery-card');
        if (!card) return;

        // Alternate entrance direction (left vs right)
        const isEven = index % 2 === 0;
        const rotateY = isEven ? -18 : 18;
        const translateX = isEven ? -120 : 120;

        // Set initial 3D state (far away, rotated)
        gsap.set(card, {
          rotateX: 12,
          rotateY: rotateY,
          translateZ: -600,
          translateX: translateX,
          opacity: 0,
          scale: 0.85,
          transformPerspective: 1200,
          transformOrigin: 'center center',
        });

        // Scrub animation: fly in and settle
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          translateZ: 0,
          translateX: 0,
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 95%',
            end: 'top 35%',
            scrub: 1.2,
          },
        });

        // Content stagger reveal
        const contentElements = card.querySelectorAll(
          '.pgallery-meta, .pgallery-title, .pgallery-desc, .pgallery-tags, .pgallery-cta-wrap'
        );

        gsap.from(contentElements, {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 50%',
            toggleActions: 'play none none none',
          },
        });

        // Parallax glow pulse behind the card
        const glowEl = wrapper.querySelector<HTMLElement>('.pgallery-glow-bg');
        if (glowEl) {
          gsap.fromTo(glowEl,
            { opacity: 0, scale: 0.6 },
            {
              opacity: 1,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: wrapper,
                start: 'top 85%',
                end: 'top 40%',
                scrub: 1.5,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pgallery-section"
      id="work"
    >
      <div id="projects" className="absolute top-0 pointer-events-none" aria-hidden="true" />
      <div className="container">
        {/* Section Header */}
        <div className="pgallery-header">
          <div>
            <span className="section-tag dark">02 // SELECTED WORK</span>
            <h2 className="section-title">FEATURED ARCHITECTURE</h2>
          </div>
          <div className="pgallery-header-count">
            <span className="pgallery-count-num">0{portfolioData.projects.length}</span>
            <span className="pgallery-count-txt">PRODUCTION PLATFORMS</span>
          </div>
        </div>

        {/* Perspective Gallery Cards */}
        <div className="pgallery-grid">
          {portfolioData.projects.map((project, idx) => (
            <div key={project.number} className="pgallery-card-wrapper">
              {/* Background glow pulse */}
              <div
                className="pgallery-glow-bg"
                style={{
                  '--glow-color': PROJECT_THEMES[idx % 3].glow,
                } as React.CSSProperties}
              />
              <ProjectCard
                project={project}
                index={idx}
                total={portfolioData.projects.length}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ==========================================================================
           PERSPECTIVE GALLERY — 3D Cinematic Reveal
           ========================================================================== */
        .pgallery-section {
          position: relative;
          background: #07090E;
          padding: 120px 0 160px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          overflow: hidden;
          /* 3D perspective context for the entire section */
          perspective: 1400px;
        }

        /* ── Header ── */
        .pgallery-header {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 80px;
        }
        @media (min-width: 768px) {
          .pgallery-header {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          }
        }

        .pgallery-header-count {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: #71717A;
          letter-spacing: 0.12em;
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .pgallery-count-num {
          font-family: var(--font-display);
          font-size: 1.8rem;
          color: #E5A93C;
          line-height: 1;
        }

        /* ── Card Grid ── */
        .pgallery-grid {
          display: flex;
          flex-direction: column;
          gap: 100px;
        }
        @media (max-width: 768px) {
          .pgallery-grid {
            gap: 60px;
          }
        }

        /* ── Card Wrapper (holds glow + card) ── */
        .pgallery-card-wrapper {
          position: relative;
          /* Preserve the 3D space from the section perspective */
          transform-style: preserve-3d;
        }

        /* ── Ambient Glow Behind Card ── */
        .pgallery-glow-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80%;
          height: 70%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            var(--glow-color, rgba(229, 169, 60, 0.15)),
            transparent 70%
          );
          filter: blur(80px);
          pointer-events: none;
          opacity: 0;
          z-index: 0;
          will-change: opacity, transform;
        }

        /* ── Card Itself ── */
        .pgallery-card {
          position: relative;
          z-index: 1;
          background: linear-gradient(
            145deg,
            rgba(15, 16, 22, 0.98) 0%,
            rgba(12, 13, 18, 0.95) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          overflow: hidden;
          box-shadow:
            0 25px 60px rgba(0, 0, 0, 0.6),
            0 0 1px rgba(255, 255, 255, 0.12);
          transition: border-color 0.35s ease,
                      box-shadow 0.35s ease;
          will-change: transform, opacity;
          /* Needed for 3D rotation from GSAP */
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .pgallery-card:hover {
          border-color: var(--card-accent, #E5A93C);
          box-shadow:
            0 35px 90px rgba(0, 0, 0, 0.8),
            0 0 60px var(--card-glow, rgba(229, 169, 60, 0.2));
        }

        /* ── Spotlight ── */
        .pgallery-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          border-radius: 24px;
          background: radial-gradient(
            600px circle at var(--spot-x, -500px) var(--spot-y, -500px),
            var(--card-glow, rgba(229, 169, 60, 0.08)),
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .pgallery-card:hover .pgallery-spotlight {
          opacity: 1;
        }

        /* ── Top Accent Line ── */
        .pgallery-accent-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--card-accent, #E5A93C), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 3;
        }
        .pgallery-card:hover .pgallery-accent-line {
          opacity: 1;
        }

        /* ── Inner Layout ── */
        .pgallery-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .pgallery-inner {
            grid-template-columns: 1.2fr 0.8fr;
            align-items: center;
          }
        }

        /* ── Image Column ── */
        .pgallery-img-col {
          padding: 20px;
        }
        @media (min-width: 768px) {
          .pgallery-img-col {
            padding: 28px;
          }
        }

        .pgallery-img-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 16px;
          overflow: hidden;
          background: #090A0D;
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
        }

        .pgallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          filter: brightness(0.95) contrast(1.03);
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.5s ease;
        }
        .pgallery-card:hover .pgallery-img {
          transform: scale(1.04);
          filter: brightness(1) contrast(1.06);
        }

        .pgallery-img-sheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.06) 0%,
            transparent 50%,
            rgba(0, 0, 0, 0.3) 100%
          );
          pointer-events: none;
        }

        .pgallery-img-badge {
          position: absolute;
          bottom: 16px;
          right: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 9999px;
          background: rgba(10, 11, 16, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
          transform: translateY(8px);
          opacity: 0;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pgallery-card:hover .pgallery-img-badge {
          transform: translateY(0);
          opacity: 1;
          border-color: var(--card-accent, #E5A93C);
          color: var(--card-accent, #E5A93C);
        }

        /* ── Content Column ── */
        .pgallery-content-col {
          padding: 24px 24px 32px;
        }
        @media (min-width: 768px) {
          .pgallery-content-col {
            padding: 36px 40px;
          }
        }

        .pgallery-content-inner {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pgallery-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pgallery-num {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--card-accent, #E5A93C);
        }

        .pgallery-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--card-accent, #E5A93C);
          box-shadow: 0 0 12px var(--card-accent, #E5A93C);
          animation: pgallery-pulse 2.5s ease-in-out infinite;
        }

        @keyframes pgallery-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 12px var(--card-accent, #E5A93C); }
          50% { opacity: 0.5; box-shadow: 0 0 4px var(--card-accent, #E5A93C); }
        }

        .pgallery-title {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          line-height: 1.05;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: 0.01em;
          transition: color 0.3s ease;
        }

        .pgallery-desc {
          font-family: var(--font-body);
          font-size: 1.05rem;
          line-height: 1.65;
          color: #A1A1AA;
          margin: 0;
          max-width: 520px;
        }

        .pgallery-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 6px;
        }

        .pgallery-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          padding: 5px 12px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #D4D4D8;
          transition: all 0.25s ease;
        }
        .pgallery-card:hover .pgallery-tag {
          border-color: rgba(255, 255, 255, 0.18);
          color: #FFFFFF;
        }

        .pgallery-cta-wrap {
          margin-top: 14px;
        }

        .pgallery-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #FFFFFF;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pgallery-cta:hover {
          background: var(--card-accent, #E5A93C);
          border-color: var(--card-accent, #E5A93C);
          color: #000000;
          transform: translateX(4px);
          box-shadow: 0 4px 20px var(--card-glow, rgba(229, 169, 60, 0.35));
        }
        .pgallery-cta-icon {
          transition: transform 0.3s ease;
        }
        .pgallery-cta:hover .pgallery-cta-icon {
          transform: translate(2px, -2px);
        }

        /* ── Responsive Adjustments ── */
        @media (max-width: 768px) {
          .pgallery-section {
            padding: 80px 0 100px;
            perspective: 900px;
          }
          .pgallery-header {
            margin-bottom: 50px;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;
