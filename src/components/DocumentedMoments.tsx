import React from 'react';
import { HaloReel, type HaloReelItem } from '@/components/ui/halo-reel';

const MOMENT_ITEMS: HaloReelItem[] = [
  {
    src: '/moments/moment-1.jpg',
    alt: 'Evaluasi Proyek & Diskusi Bersama Guru Mentor',
    title: 'Evaluasi Proyek & Diskusi Bersama Guru Mentor',
    subtitle: 'MENTOR SESSION',
  },
  {
    src: '/moments/moment-2.jpg',
    alt: 'Instalasi Jaringan & CCTV di Ketinggian',
    title: 'Instalasi Jaringan & CCTV di Ketinggian',
    subtitle: 'FIELD WORK',
  },
  {
    src: '/moments/moment-3.jpg',
    alt: 'Pemasangan & Kalibrasi Kamera Dome CCTV Plafon',
    title: 'Pemasangan & Kalibrasi Kamera Dome CCTV Plafon',
    subtitle: 'CCTV INSTALL',
  },
  {
    src: '/moments/moment-4.jpg',
    alt: 'Terminasi Kabel LAN UTP & Manajemen Switch Box',
    title: 'Terminasi Kabel LAN UTP & Manajemen Switch Box',
    subtitle: 'NETWORKING',
  },
  {
    src: '/moments/moment-5.jpg',
    alt: 'Perakitan & Penggantian Hard Drive Server NVR',
    title: 'Perakitan & Penggantian Hard Drive Server NVR',
    subtitle: 'SERVER HARDWARE',
  },
  {
    src: '/moments/moment-6.jpg',
    alt: 'Instalasi Jalur Kabel Tray Plafon di Ketinggian',
    title: 'Instalasi Jalur Kabel Tray Plafon di Ketinggian',
    subtitle: 'CABLE ROUTING',
  },
  {
    src: '/moments/moment-7.jpg',
    alt: 'Bongkar Pasang Komponen Motherboard & Cooler PC',
    title: 'Bongkar Pasang Komponen Motherboard & Cooler PC',
    subtitle: 'PC ASSEMBLY',
  },
  {
    src: '/moments/moment-8.jpg',
    alt: 'Persiapan Material Kabel Belden UTP & Tester LAN',
    title: 'Persiapan Material Kabel Belden UTP & Tester LAN',
    subtitle: 'MATERIAL PREP',
  },
  {
    src: '/moments/moment-9.jpg',
    alt: 'Manajemen Distribusi Switch Box & Panel Server',
    title: 'Manajemen Distribusi Switch Box & Panel Server',
    subtitle: 'PANEL MANAGEMENT',
  },
];


export const DocumentedMoments: React.FC = () => {
  return (
    <section
      className="architectural-grid-subtle"
      style={{
        position: 'relative',
        zIndex: 10,
        isolation: 'isolate',
        padding: '120px 0 100px',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
      id="moments"
    >
      <div className="container" style={{ marginBottom: '36px' }}>
        <div className="section-header-row" style={{ marginBottom: '16px' }}>
          <div>
            <span className="section-tag dark">// MOMENTS</span>
            <h2 className="section-title">DOCUMENTED MOMENTS</h2>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.55)',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                marginTop: '10px',
                maxWidth: '650px',
                fontFamily: 'var(--font-mono, monospace)',
                letterSpacing: '0.01em',
              }}
            >
              Dokumentasi nyata kegiatan kejuruan, instalasi infrastruktur jaringan kabel &amp; CCTV, perakitan hardware server, serta presentasi proyek teknis.
            </p>
          </div>
        </div>
      </div>

      {/* 3D Interactive Halo Reel Carousel */}
      <div className="w-full relative">
        <HaloReel
          items={MOMENT_ITEMS}
          aria-label="Documented moments carousel"
          autoPlay={true}
          autoScrollSpeed={0.22}
          pauseOnHover={true}
          centerLabel={
            <div className="flex flex-col items-center gap-2">
              <span
                className="font-bold tracking-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.2rem, 3.2vw, 2.6rem)',
                  color: '#E5A93C',
                  lineHeight: 1.1,
                }}
              >
                MOMENTS '26
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                PKL &bull; Wing Hotel Kualanamu
              </span>
            </div>
          }
          cardWidth={150}
          cardHeight={210}
          minScale={0.35}
          radiusXRatio={0.42}
          radiusYRatio={0.34}
          centerXRatio={0}
          holdDuration={1200}
          stepDuration={800}
          spread={1.15}
          className="h-[560px] sm:h-[640px] bg-transparent"
        />
      </div>
    </section>
  );
};

export default DocumentedMoments;
