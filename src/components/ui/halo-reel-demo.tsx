import { HaloReel, type HaloReelItem } from "@/components/ui/halo-reel";

const CARDS: HaloReelItem[] = [
  {
    src: '/moments/moment-1.jpg',
    alt: 'Evaluasi Proyek & Diskusi Bersama Guru Mentor',
  },
  {
    src: '/moments/moment-2.jpg',
    alt: 'Instalasi Jaringan & CCTV di Ketinggian',
  },
  {
    src: '/moments/moment-3.jpg',
    alt: 'Pemasangan & Kalibrasi Kamera Dome CCTV Plafon',
  },
  {
    src: '/moments/moment-4.jpg',
    alt: 'Terminasi Kabel LAN UTP & Manajemen Switch Box',
  },
  {
    src: '/moments/moment-5.jpg',
    alt: 'Perakitan & Penggantian Hard Drive Server NVR',
  },
  {
    src: '/moments/moment-6.jpg',
    alt: 'Instalasi Jalur Kabel Tray Plafon di Ketinggian',
  },
  {
    src: '/moments/moment-7.jpg',
    alt: 'Bongkar Pasang Komponen Motherboard & Cooler PC',
  },
  {
    src: '/moments/moment-8.jpg',
    alt: 'Persiapan Material Kabel Belden UTP & Tester LAN',
  },
  {
    src: '/moments/moment-9.jpg',
    alt: 'Manajemen Distribusi Switch Box & Panel Server',
  },
];

export default function HaloReelDemo() {
  return (
    <HaloReel
      items={CARDS}
      aria-label="Documented moments"
      centerLabel={
        <span
          className="font-medium tracking-tight"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3.4vw',
            color: '#E5A93C',
          }}
        >
          MOMENTS '26
        </span>
      }
      cardWidth={130}
      cardHeight={180}
      minScale={0.4}
      radiusYRatio={0.36}
      holdDuration={1000}
      stepDuration={700}
      className="h-[560px] bg-[#07090E]"
    />
  );
}
