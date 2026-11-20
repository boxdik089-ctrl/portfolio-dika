import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  hasFlare: boolean;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  thickness: number;
  trailColor: string;
  headGlowColor: string;
}

export const StarMeteorCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    setupCanvasSize();

    // Generate static twinkling stars
    const starCount = Math.min(Math.floor((width * height) / 9000), 160);
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.4 + 0.6,
        baseAlpha: Math.random() * 0.6 + 0.25,
        twinkleSpeed: Math.random() * 0.025 + 0.008,
        twinkleOffset: Math.random() * Math.PI * 2,
        hasFlare: Math.random() < 0.08 // 8% chance of subtle 4-point sparkle
      });
    }

    // Active meteors and stardust sparks
    const meteors: Meteor[] = [];
    const sparks: Spark[] = [];
    let lastMeteorTime = Date.now() - 1500; // spawn first meteor quickly (within ~500ms)
    let nextMeteorInterval = 600;

    const COLOR_PALETTES = [
      { trail: 'rgba(56, 189, 248, ', glow: '#38BDF8' }, // Electric Cyan
      { trail: 'rgba(96, 165, 250, ', glow: '#60A5FA' }, // Royal Blue
      { trail: 'rgba(192, 132, 252, ', glow: '#C084FC' }, // Nebula Purple
      { trail: 'rgba(251, 191, 36, ', glow: '#FBBF24' }   // Starlight Gold
    ];

    const createMeteor = (offsetX = 0, offsetY = 0): Meteor => {
      // 40° to 50° angle (downward toward bottom-right)
      const angle = (Math.PI / 4) + (Math.random() * 0.16 - 0.08);
      const palette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
      
      // Spawn from top or top-left area
      const startFromTop = Math.random() > 0.4;
      const x = startFromTop
        ? Math.random() * (width * 0.85) - (width * 0.1) + offsetX
        : -50 + offsetX;
      const y = startFromTop
        ? -40 + offsetY
        : Math.random() * (height * 0.45) + offsetY;

      return {
        x,
        y,
        length: Math.random() * 100 + 130, // 130px - 230px graceful streak
        speed: Math.random() * 8 + 14,     // 14px - 22px per frame (fast & cinematic)
        angle,
        opacity: 1,
        thickness: Math.random() * 1.6 + 1.2,
        trailColor: palette.trail,
        headGlowColor: palette.glow
      };
    };

    const spawnMeteorShower = () => {
      meteors.push(createMeteor());
      
      // 25% chance of twin meteor (paired shooting star)
      if (Math.random() < 0.25) {
        setTimeout(() => {
          if (meteors.length < 5) {
            meteors.push(createMeteor(Math.random() * 100 - 50, Math.random() * 60 - 30));
          }
        }, Math.random() * 350 + 150);
      }

      lastMeteorTime = Date.now();
      // Random interval between 1.4s and 2.8s for lively ambiance
      nextMeteorInterval = Math.random() * 1400 + 1400;
    };

    const handleResize = () => {
      setupCanvasSize();
      // Reposition out of bounds stars
      for (const s of stars) {
        if (s.x > width) s.x = Math.random() * width;
        if (s.y > height) s.y = Math.random() * height;
      }
    };

    window.addEventListener('resize', handleResize);

    let time = 0;
    let isPaused = false;

    const onVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const render = () => {
      if (isPaused) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 1;
      ctx.clearRect(0, 0, width, height);

      // 1. Render Twinkling Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
        const alpha = Math.max(0.12, Math.min(0.95, s.baseAlpha + twinkle * 0.35));

        ctx.fillStyle = `rgba(224, 242, 254, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Stellar flare for bright stars
        if (s.hasFlare && alpha > 0.65) {
          const flareLen = s.size * 3.5;
          ctx.strokeStyle = `rgba(255, 255, 255, ${(alpha - 0.65) * 1.5})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(s.x - flareLen, s.y);
          ctx.lineTo(s.x + flareLen, s.y);
          ctx.moveTo(s.x, s.y - flareLen);
          ctx.lineTo(s.x, s.y + flareLen);
          ctx.stroke();
        }
      }

      // 2. Check and spawn new shooting stars
      if (Date.now() - lastMeteorTime > nextMeteorInterval) {
        spawnMeteorShower();
      }

      // 3. Update & Render Stardust Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= sp.decay;

        if (sp.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `${sp.color}${sp.alpha})`;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Update & Render Meteors (Bintang Jatuh)
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const dx = Math.cos(m.angle) * m.speed;
        const dy = Math.sin(m.angle) * m.speed;

        m.x += dx;
        m.y += dy;
        m.opacity -= 0.012; // Gradual fade

        // Emit cosmic spark dust behind head
        if (Math.random() < 0.6 && sparks.length < 40) {
          sparks.push({
            x: m.x - dx * 0.3 + (Math.random() * 4 - 2),
            y: m.y - dy * 0.3 + (Math.random() * 4 - 2),
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: Math.random() * 1.2 + 0.5,
            alpha: m.opacity * 0.8,
            decay: Math.random() * 0.03 + 0.02,
            color: m.trailColor
          });
        }

        if (m.opacity <= 0 || m.x > width + 200 || m.y > height + 200) {
          meteors.splice(i, 1);
          continue;
        }

        // Calculate tail coordinate
        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        // Meteor Trail Gradient (Fades from 0 at tail tip to bright at the head)
        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        grad.addColorStop(0, `${m.trailColor}0)`);
        grad.addColorStop(0.5, `${m.trailColor}${m.opacity * 0.35})`);
        grad.addColorStop(0.85, `${m.trailColor}${m.opacity * 0.85})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${m.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = m.thickness;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();

        // Meteor Head Glow (Outer halo)
        const haloGrad = ctx.createRadialGradient(
          m.x,
          m.y,
          0,
          m.x,
          m.y,
          m.thickness * 4.5
        );
        haloGrad.addColorStop(0, `rgba(255, 255, 255, ${m.opacity * 0.95})`);
        haloGrad.addColorStop(0.35, `${m.trailColor}${m.opacity * 0.7})`);
        haloGrad.addColorStop(1, `${m.trailColor}0)`);

        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.thickness * 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Intense White Core Bullet
        ctx.fillStyle = `rgba(255, 255, 255, ${m.opacity})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.thickness * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      id="star-canvas"
      ref={canvasRef}
      className="star-meteor-layer"
      aria-hidden="true"
    />
  );
};

export default StarMeteorCanvas;
