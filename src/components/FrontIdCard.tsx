import { useRef, useState, useCallback, type MouseEvent, type CSSProperties, type FC } from 'react';
import './FrontIdCard.css';

interface FrontIdCardProps {
  className?: string;
  style?: CSSProperties;
}

export const FrontIdCard: FC<FrontIdCardProps> = ({ className = '', style }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');
  const [glarePos, setGlarePos] = useState({ x: '50%', y: '50%' });

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    setGlarePos({
      x: `${(x / rect.width) * 100}%`,
      y: `${(y / rect.height) * 100}%`,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('rotateX(0deg) rotateY(0deg)');
  }, []);

  return (
    <div className={`id-card-scene ${className}`} style={style}>
      <div
        ref={cardRef}
        id="idCard"
        className="id-card-wrapper"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform,
          // @ts-expect-error CSS variable support
          '--mx': glarePos.x,
          '--my': glarePos.y,
        }}
      >
        {/* Klip & Ring Lanyard */}
        <svg className="lanyard-clip" viewBox="0 0 60 64" fill="none">
          <defs>
            <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#9ca3af" />
              <stop offset="75%" stopColor="#374151" />
              <stop offset="100%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          {/* Penjepit Atas */}
          <rect x="12" y="0" width="36" height="8" rx="2" fill="url(#metalGrad)" />
          <rect x="24" y="8" width="12" height="10" rx="1" fill="url(#metalGrad)" />
          {/* Cincin Ring */}
          <path
            d="M33 15 C21 15, 17 26, 17 36 C17 47, 23 55, 32 55 C38 55, 42 51, 43 46"
            stroke="url(#metalGrad)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </svg>

        <div className="card-bezel">
          <div className="card-slot" />

          <div className="card-inner">
            {/* Pola Latar Spirograph & Grid Kanan Atas */}
            <svg className="bg-pattern" viewBox="0 0 314 469" fill="none">
              <ellipse cx="157" cy="235" rx="185" ry="120" transform="rotate(-24 157 235)" stroke="#141e36" strokeOpacity="0.07" />
              <ellipse cx="157" cy="235" rx="185" ry="120" transform="rotate(-12 157 235)" stroke="#141e36" strokeOpacity="0.07" />
              <ellipse cx="157" cy="235" rx="185" ry="120" transform="rotate(0 157 235)" stroke="#141e36" strokeOpacity="0.07" />
              <ellipse cx="157" cy="235" rx="185" ry="120" transform="rotate(12 157 235)" stroke="#141e36" strokeOpacity="0.07" />
              <ellipse cx="157" cy="235" rx="185" ry="120" transform="rotate(24 157 235)" stroke="#141e36" strokeOpacity="0.07" />
              <circle cx="157" cy="235" r="145" stroke="#141e36" strokeOpacity="0.06" />
            </svg>
            <div className="top-right-grid" />

            {/* Garis Blueprint & Titik Node */}
            <svg className="blueprint-svg" viewBox="0 0 314 469" fill="none">
              {/* Frame Header */}
              <path d="M16 42 H296 V114 H16 Z" stroke="#141e36" strokeWidth="1" />
              <circle cx="16" cy="42" r="3.5" fill="#141e36" />
              <circle cx="16" cy="114" r="3.5" fill="#141e36" />
              <circle cx="296" cy="114" r="3.5" fill="#141e36" />
              <circle cx="296" cy="130" r="3.5" fill="#141e36" />
              {/* Garis Kanan & Bawah */}
              <line x1="252" y1="130" x2="296" y2="130" stroke="#141e36" strokeWidth="1" />
              <line x1="296" y1="130" x2="296" y2="385" stroke="#141e36" strokeWidth="1" />
              <line x1="220" y1="385" x2="296" y2="385" stroke="#141e36" strokeWidth="1" />
              {/* Titik Node Tengah Kanan */}
              <line x1="195" y1="142" x2="245" y2="142" stroke="#141e36" strokeWidth="1" strokeDasharray="6 4" />
              <circle cx="230" cy="142" r="3.5" fill="#141e36" />
              <line x1="185" y1="178" x2="245" y2="178" stroke="#141e36" strokeWidth="1" strokeDasharray="6 4" />
              <circle cx="212" cy="178" r="3.5" fill="#141e36" />
              <circle cx="230" cy="178" r="3.5" fill="#141e36" />
            </svg>

            {/* Header */}
            <div className="badge-junior">JUNIOR</div>

            <div className="school-box">
              <img
                src="/logo-smkn1-beringin.png"
                alt="Logo SMKN 1 Beringin"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <div className="school-text">
                SMKN 1<br />BERINGIN
              </div>
            </div>

            <div className="title-developer">DEVELOPER</div>

            {/* Kotak Grid Kiri & Grafik Node */}
            <div className="left-chart-box">
              <svg width="100%" height="100%" viewBox="0 0 132 245" fill="none">
                <line x1="22" y1="88" x2="66" y2="22" stroke="#9ca3af" strokeWidth="1.2" />
                <circle cx="22" cy="88" r="5" fill="#9ca3af" />
                <circle cx="44" cy="55" r="5" fill="#9ca3af" />
                <circle cx="66" cy="22" r="5" fill="#9ca3af" />
                <circle cx="44" cy="176" r="5" fill="#9ca3af" />
                <circle cx="66" cy="176" r="5" fill="#9ca3af" />
              </svg>
            </div>

            {/* Teks Vertikal Kanan */}
            <div className="right-vertical-text">TEKNIK JARINGAN</div>

            {/* Foto PNG Transparan */}
            <img
              src="/foto-dika.png"
              alt="Dika Armadana"
              className="subject-photo"
            />

            {/* Label Nama */}
            <div className="name-strip">DIKA ARMADANA</div>

            {/* Bar Biru Bawah (Layer Depan) */}
            <div className="footer-portfolio">
              <span>PORTFOLIO</span>
            </div>

            <div className="card-glare" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontIdCard;
