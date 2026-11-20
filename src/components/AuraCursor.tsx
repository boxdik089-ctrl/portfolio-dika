import { useEffect, useRef, useState } from 'react';

/**
 * AuraCursor — Ultra-High Performance Fluid Magnetic Cursor
 * 
 * Performance & Zero-Lag Enhancements:
 * - 0ms Micro-Dot Pointer: Hardware-synced translate3d with ZERO CSS transform transition delay.
 * - Anti-Lag Spring Physics: Snappy lerp factors (0.55 follower, 0.35 aura) to eliminate dragging feel.
 * - Compositor-Accelerated: Eliminated expensive backdrop-filter blur; uses lightweight GPU alpha-composited glass.
 * - Single-Mount Architecture: Animation loop & event listeners stay active across hover states without tearing down.
 * - Native Text Support: Native I-beam cursor enabled for inputs and textareas.
 */
export const AuraCursor = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);
  const ambientAuraRef = useRef<HTMLDivElement | null>(null);
  const rippleContainerRef = useRef<HTMLDivElement | null>(null);

  const [cursorText, setCursorText] = useState<string>('');
  const [hoverType, setHoverType] = useState<'default' | 'button' | 'music' | 'project'>('default');
  const hoverTypeRef = useRef<'default' | 'button' | 'music' | 'project'>('default');

  // Position, Physics & Motion State
  const mouse = useRef({ x: -200, y: -200 });
  const followerPos = useRef({ x: -200, y: -200 });
  const auraPos = useRef({ x: -200, y: -200 });
  const velocity = useRef({ x: 0, y: 0 });
  const prevMouse = useRef({ x: -200, y: -200 });
  const isVisible = useRef(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Keep hoverTypeRef in sync
  useEffect(() => {
    hoverTypeRef.current = hoverType;
  }, [hoverType]);

  useEffect(() => {
    // Check if device supports fine hover pointer
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    let animId: number;
    let lastTargetCheck = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (followerRef.current) followerRef.current.style.opacity = '1';
        if (ambientAuraRef.current) ambientAuraRef.current.style.opacity = '0.5';
      }

      // Micro-dot follows cursor coordinates immediately with zero latency (instant hardware sync)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      // Throttle target checks to prevent heavy DOM queries on mousemove
      const now = performance.now();
      if (now - lastTargetCheck > 80) {
        lastTargetCheck = now;
        const target = e.target as HTMLElement | null;
        if (target) {
          const isLeftPlayerConsole = target.closest('.vinyl-player-card');
          const playlistItemTarget = !isLeftPlayerConsole && target.closest('.playlist-item-row, [data-cursor="play"]');
          const projectTarget = target.closest(
            '.project-card-interactive, .moment-card, .project-bento-card, [data-cursor="view"]'
          );
          const buttonTarget = target.closest(
            'a, button, [role="button"], .magnetic-btn, .skyline-metric-pill, .stat-item, .tech-card, .player-tool-btn, .player-nav-btn, .player-main-play-btn'
          );

          if (playlistItemTarget) {
            setHoverType('music');
            setCursorText('▶ PLAY');
          } else if (projectTarget) {
            setHoverType('project');
            setCursorText('VIEW ↗');
          } else if (buttonTarget) {
            setHoverType('button');
            setCursorText('');
          } else {
            setHoverType('default');
            setCursorText('');
          }
        }
      }
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (followerRef.current) followerRef.current.style.opacity = '0';
      if (ambientAuraRef.current) ambientAuraRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (followerRef.current) followerRef.current.style.opacity = '1';
      if (ambientAuraRef.current) ambientAuraRef.current.style.opacity = '0.5';
    };

    // Click Shockwave Ripple
    const onMouseDown = (e: MouseEvent) => {
      if (!rippleContainerRef.current) return;
      const ripple = document.createElement('div');
      ripple.className = 'cursor-click-shockwave';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      rippleContainerRef.current.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 450);
    };

    // Smooth Hardware-Accelerated High-Responsiveness Animation Loop
    const renderLoop = () => {
      // Calculate mouse velocity for subtle kinetic stretch
      const vx = mouse.current.x - prevMouse.current.x;
      const vy = mouse.current.y - prevMouse.current.y;
      prevMouse.current.x = mouse.current.x;
      prevMouse.current.y = mouse.current.y;

      velocity.current.x += (vx - velocity.current.x) * 0.45;
      velocity.current.y += (vy - velocity.current.y) * 0.45;

      // Snappy spring physics for Liquid Follower (lerp 0.55 for zero-lag feeling)
      followerPos.current.x += (mouse.current.x - followerPos.current.x) * 0.55;
      followerPos.current.y += (mouse.current.y - followerPos.current.y) * 0.55;

      // Ambient Aura (smooth trailing lerp 0.35)
      auraPos.current.x += (mouse.current.x - auraPos.current.x) * 0.35;
      auraPos.current.y += (mouse.current.y - auraPos.current.y) * 0.35;

      const speed = Math.hypot(velocity.current.x, velocity.current.y);
      const angle = Math.atan2(velocity.current.y, velocity.current.x);

      // Kinetic deformation factor capped at 1.25 for tight control
      const stretch = Math.min(1.25, 1 + speed * 0.008);
      const squish = 1 / Math.sqrt(stretch);

      // 1. Update Ambient Flashlight Aura
      if (ambientAuraRef.current) {
        ambientAuraRef.current.style.transform = `translate3d(${auraPos.current.x}px, ${auraPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // 2. Update Liquid Follower
      if (followerRef.current) {
        const curHover = hoverTypeRef.current;
        if (curHover === 'music' || curHover === 'project') {
          followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%) scale(1)`;
        } else {
          followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%) rotate(${angle}rad) scale(${stretch}, ${squish})`;
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('mouseenter', onMouseEnter, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });

    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mousedown', onMouseDown);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Click Shockwave Container */}
      <div ref={rippleContainerRef} className="cursor-ripple-container" />

      {/* 1. Ambient Flashlight Aura (Atmospheric Light Cone across Canvas) */}
      <div
        ref={ambientAuraRef}
        className="cursor-ambient-cone"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99996,
          opacity: 0,
          willChange: 'transform',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* 2. Magnetic Liquid Glass Follower (Morphs into Pills or Ring) */}
      <div
        ref={followerRef}
        className={`cursor-liquid-follower follower-${hoverType}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          willChange: 'transform, width, height',
        }}
      >
        {cursorText && (
          <span className="follower-inner-text">
            {cursorText}
          </span>
        )}
      </div>

      {/* 3. Razor-Sharp Precision Pointer Micro-Dot (Always at true mouse coordinate) */}
      <div
        ref={dotRef}
        className="cursor-micro-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          willChange: 'transform',
        }}
      />

      {/* CSS Styling & Animations */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          html, body, a, button, [role="button"] {
            cursor: none !important;
          }
          input, textarea, select {
            cursor: auto !important;
          }
        }

        /* 1. Ambient Flashlight Cone (Hardware accelerated radial gradient) */
        .cursor-ambient-cone {
          background: radial-gradient(
            circle,
            rgba(229, 169, 60, 0.12) 0%,
            rgba(56, 189, 248, 0.05) 45%,
            transparent 70%
          );
          pointer-events: none;
        }

        /* 2. Precision Micro-Dot — ZERO transform transition delay for instant response */
        .cursor-micro-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #FFFFFF;
          box-shadow: 0 0 6px #FFFFFF, 0 0 12px #E5A93C;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        /* 3. Liquid Follower Base — Fast GPU compositing (no expensive backdrop-filter) */
        .cursor-liquid-follower {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          transition: width 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                      height 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.2s ease,
                      border-color 0.2s ease,
                      box-shadow 0.2s ease;
        }

        /* Resting State: Sleek 20px hairline ring */
        .cursor-liquid-follower.follower-default {
          width: 20px;
          height: 20px;
          background: rgba(255, 255, 255, 0.04);
          border: 1.5px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 0 10px rgba(229, 169, 60, 0.12);
        }

        /* Button Hover State: Magnetic Glowing Amber Ring */
        .cursor-liquid-follower.follower-button {
          width: 42px;
          height: 42px;
          background: rgba(229, 169, 60, 0.12);
          border: 1.5px solid #E5A93C;
          box-shadow: 0 0 18px rgba(229, 169, 60, 0.3);
        }

        /* Music Hover State: Editorial "▶ PLAY" Glass Pill */
        .cursor-liquid-follower.follower-music {
          width: 84px;
          height: 32px;
          background: rgba(13, 17, 23, 0.92);
          border: 1px solid rgba(229, 169, 60, 0.7);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 14px rgba(229, 169, 60, 0.25);
        }

        /* Project Hover State: "VIEW ↗" Glass Pill */
        .cursor-liquid-follower.follower-project {
          width: 80px;
          height: 32px;
          background: rgba(13, 17, 23, 0.92);
          border: 1px solid rgba(56, 189, 248, 0.7);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 14px rgba(56, 189, 248, 0.25);
        }

        /* Follower Text Badge */
        .follower-inner-text {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #FFAA70;
          white-space: nowrap;
          pointer-events: none;
          animation: text-pop 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .follower-project .follower-inner-text {
          color: #7DD3FC;
        }

        @keyframes text-pop {
          0% { opacity: 0; transform: scale(0.75); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* 4. Click Shockwave */
        .cursor-ripple-container {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 99995;
          overflow: hidden;
        }

        .cursor-click-shockwave {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1.5px solid #E5A93C;
          transform: translate(-50%, -50%) scale(1);
          animation: shockwave-expand 0.45s cubic-bezier(0.15, 0.85, 0.35, 1) forwards;
          pointer-events: none;
        }

        @keyframes shockwave-expand {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(6.5);
            border-color: rgba(56, 189, 248, 0);
          }
        }
      `}</style>
    </>
  );
};

export default AuraCursor;
