export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  github?: string;
  category: string;
  features?: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  image: string;
  verifyUrl: string;
  skills: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  event: string;
  rank: string;
  year: string;
  organizer: string;
  description: string;
  badgeColor?: string;
}

export interface TechItem {
  num: string;
  name: string;
  category: string;
  iconName: string;
  proficiency?: string;
  desc?: string;
}

export interface SongItem {
  id: number;
  title: string;
  artist: string;
  album: string;
  cover: string;
  audio: string;
  duration: string;
}

export interface CommentItem {
  id: string;
  name: string;
  comment: string;
  avatar: string;
  date: string;
  likes: number;
  isLiked?: boolean;
}

export const portfolioData = {
  brand: {
    first: "DIKA",
    second: "ARMADANA",
    tagline: ">_ Dika.dev"
  },
  hero: {
    firstName: "DIKA",
    lastName: "ARMADANA",
    role: "FULL STACK",
    roleSecondary: "DEVELOPER",
    tagline: "Bridging creative design and scalable engineering to build exceptional web experiences.",
    marquee: [
      "LARAVEL", "REACT.JS", "TAILWIND CSS", "TYPESCRIPT",
      "GSAP", "THREE.JS", "MYSQL", "PHP", "GIT", "FRAMER MOTION"
    ],
    greeting: "Welcome to",
    title: "My Portfolio",
    typewriter: [
      "Junior / Full-Stack Developer",
      "Creative Web Architect",
      "SMK Negeri 1 Beringin • TIK",
      "Interactive 3D & UI/UX Enthusiast",
      "Building Fast & Scalable Systems"
    ],
    bio: "Berawal dari rasa penasaran, sekarang jadi passion. Aku suka bereksperimen dengan kode, mengeksplorasi teknologi baru, dan mengubah ide menjadi sesuatu yang nyata. Dari tampilan web yang menarik sampai interaksi 3D yang seru, aku selalu berusaha bikin sesuatu yang bukan cuma keren dilihat, tapi juga nyaman digunakan.",
    ctaProjects: "Lihat Projek",
    ctaContact: "Hubungi Saya",
    idCard: {
      roleTitle: "JUNIOR / FULL-STACK",
      roleSub: "DEVELOPER",
      name: "DIKA ARMADANA",
      specialty: "Web & System Developer",
      idCode: "ID: 2026-DEV",
      qrUrl: "https://www.instagram.com/dprxz_/",
      avatar: "/profile.jpg"
    }
  },
  about: {
    watermark: "ABOUT ME",
    tag: "// ABOUT",
    heading: "PASSIONATE DEVELOPER",
    nameHighlight: "Dika Armadana",
    aliasHighlight: "Dika",
    bioPart1: "I bridge the gap between solid backend architecture and engaging frontend experiences as a Full Stack Developer.",
    bioPart2: "Currently focusing on full-stack web architecture, school digitalization platforms, and interactive web experiences.",
    statusBadge: "Available for Projects",
    location: "Indonesia",
    experienceYears: "Full Stack Engineer",
    name: "Dika Armadana",
    role: "Web & System Developer",
    bio1: "Saya adalah Web & System Developer yang berfokus pada pengembangan teknologi yang fungsional sekaligus menarik. Saya senang memadukan kode, desain UI/UX, dan automasi sistem untuk membangun produk digital yang berkesan.",
    bio2: "Dengan Node.js, PHP, React, dan manajemen infrastruktur server modern, saya mengubah ide menjadi pengalaman digital yang intuitif, responsif, dan berdampak nyata.",
    avatar: "/profile.jpg",
    maskAvatar: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=700&q=80",
    education: {
      school: "SMK Negeri 1 Beringin",
      major: "Teknologi Informasi & Komunikasi",
      status: "Aktif",
      icon: "graduation-cap"
    },
    experience: {
      role: "Web Infrastructure & Full-Stack Dev",
      sub: "Pengembangan Aplikasi Sekolah & Freelance",
      period: "2024 - Sekarang",
      icon: "server"
    },
    stats: [
      { count: 3, label: "PROJECTS", sub: "Karya yang dibuat", icon: "code" },
      { count: 2, label: "CERTIFICATES", sub: "Skill yang divalidasi", icon: "award" },
      { count: 1, label: "AWARDS", sub: "Pencapaian diraih", icon: "trophy" }
    ]
  },
  projects: [
    {
      id: "perpustakaan",
      number: "01",
      title: "E-Perpustakaan",
      category: "Full Stack Web App",
      subtitle: "Command Center sistem manajemen buku & peminjaman digital dengan fitur barcode scanner, kalkulasi denda otomatis, dan kios presensi mandiri.",
      description: "Aplikasi sistem informasi perpustakaan modern berbasis web yang dirancang untuk mendigitalisasi operasional perpustakaan sekolah. Dilengkapi dengan pemindaian barcode cepat untuk sirkulasi buku, tracking peminjam & tanggal pengembalian, kalkulator denda keterlambatan, hingga dashboard analitik buku terpopuler dan statistik pengunjung harian.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MySQL"],
      image: "/projects/perpustakaan.png",
      link: "https://perpustakaan.tiksmkn1beringin.my.id",
      github: "https://github.com/boxdik089-ctrl",
      features: [
        "Barcode & QR Code Scanner untuk peminjaman instan",
        "Kalkulasi denda otomatis terintegrasi hari libur",
        "Kios presensi mandiri siswa dengan kartu pelajar",
        "Dashboard analitik sirkulasi & inventaris buku realtime"
      ]
    },
    {
      id: "hpu-landing",
      number: "02",
      title: "Landing Page HPU",
      category: "Commercial Landing Page",
      subtitle: "High-converting commercial landing page untuk produk Herbal Pelangsing Ultimate dengan layout responsif & modern.",
      description: "Landing page komersial modern yang dirancang untuk produk Herbal Pelangsing Ultimate (HPU). Mengedepankan hierarki visual persuasif, presentasi keunggulan produk, integrasi call-to-action (CTA) langsung ke checkout WhatsApp, serta performa loading instan dengan arsitektur mobile-first.",
      tech: ["Tailwind CSS", "HTML5", "JavaScript", "Responsive UI", "Marketing Web"],
      image: "/projects/hpu_landing.png",
      link: "#",
      features: [
        "Hero section persuasif dengan visualisasi keunggulan produk",
        "Katalog varian herbal dengan benefit & pricing breakdown",
        "Integrasi call-to-action langsung ke customer service / checkout",
        "Mobile-first responsive layout dengan performa loading cepat"
      ]
    },
    {
      id: "presensi-eskul",
      number: "03",
      title: "Presensi Eskul",
      category: "School Information System",
      subtitle: "Centralized school extracurricular attendance & activity monitoring management system.",
      description: "Sistem absensi dan monitoring kegiatan ekstrakurikuler sekolah secara terpusat. Mengakomodasi ratusan siswa dengan validasi presensi real-time, pencatatan jurnal kegiatan pembina, rekapitulasi kehadiran berkala, dan reporting berbasis PDF/Excel untuk evaluasi sekolah.",
      tech: ["Laravel", "PHP", "Tailwind CSS", "MySQL", "Chart.js"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      link: "#",
      github: "https://github.com/boxdik089-ctrl",
      features: [
        "Pencatatan presensi digital pembina & anggota ekstrakurikuler",
        "Verifikasi geolokasi & batas waktu sesi kegiatan",
        "Rekap kehadiran otomatis bulanan dan semester",
        "Ekspor laporan otomatis berformat PDF & Excel"
      ]
    },
    {
      id: "hotel-pkl",
      number: "04",
      title: "Wing Hotel Kualanamu Web Portal",
      category: "Commercial Showcase",
      subtitle: "Interactive company profile & operational showcase created during vocational internship.",
      description: "Platform web company profile interaktif yang dirancang untuk memvisualisasikan fasilitas kamar, ruang rapat (meeting room), dan layanan operasional perhotelan dengan sentuhan animasi GSAP responsif dan performa tinggi.",
      tech: ["React", "TypeScript", "Tailwind CSS", "GSAP", "Vite"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      link: "#",
      github: "https://github.com/boxdik089-ctrl",
      features: [
        "Smooth scroll showcase kamar dan fasilitas hotel",
        "Katalog interaktif paket wedding & meeting convention",
        "Navigasi dinamis dengan micro-interactions responsif",
        "Optimasi Core Web Vitals dengan skor LCP optimal"
      ]
    },
    {
      id: "interactive-portfolio",
      number: "05",
      title: "Interactive 3D Portfolio",
      category: "Creative Engineering",
      subtitle: "High-performance creative portfolio featuring 3D Lanyard ID Card, canvas starfield, and Spotify player.",
      description: "Portofolio interaktif tingkat lanjut yang memadukan React 19, TypeScript, Tailwind CSS v4, Canvas 2D Particle Engine, dan Interactive 3D Lanyard ID Card dengan fisika geser dan putar 180°.",
      tech: ["React 19", "TypeScript", "Tailwind CSS v4", "GSAP", "Lenis"],
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
      link: "#",
      github: "https://github.com/boxdik089-ctrl",
      features: [
        "Interactive 3D Lanyard Card dengan fisika drag & flip 180°",
        "Twinkling stars & passing meteors background canvas",
        "Integrated Spotify audio player dengan 9 playable tracks",
        "Live persistent guestbook dengan penyimpanan localStorage"
      ]
    },
    {
      id: "sim-sekolah",
      number: "06",
      title: "SIM Data Sekolah Terpadu",
      category: "Full Stack Web App",
      subtitle: "Integrated student, teacher, and academic database management system.",
      description: "Platform pengelolaan basis data terpadu untuk administrasi data siswa, tenaga pendidik, dan inventaris perangkat laboratorium kejuruan berbasis peran (Role-Based Access Control).",
      tech: ["PHP", "MySQL", "Bootstrap", "JavaScript", "FPDF"],
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
      link: "#",
      github: "https://github.com/boxdik089-ctrl",
      features: [
        "Multi-role user management (Admin, Guru, Staf TU)",
        "Audit trail dan log aktivitas pengubahan data",
        "Pencetakan kartu pelajar massal otomatis",
        "Backup basis data terjadwal otomatis"
      ]
    },
    {
      id: "linux-server-automation",
      number: "07",
      title: "Dev Server Orchestration & Automation",
      category: "Systems & DevOps",
      subtitle: "Automated Linux server deployment scripts, reverse proxy, and SSL management.",
      description: "Rangkaian skrip automasi server Linux (Ubuntu/Debian) untuk konfigurasi Nginx reverse proxy, manajemen sertifikat SSL otomatis Let's Encrypt, container Docker, dan monitoring resource server.",
      tech: ["Linux", "Bash", "Nginx", "Docker", "Git"],
      image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80",
      link: "#",
      github: "https://github.com/boxdik089-ctrl",
      features: [
        "One-click deployment skrip web server & database",
        "Automasi sertifikat SSL multi-domain",
        "Pemantauan utilisasi CPU, RAM, & storage via Telegram bot",
        "Automasi backup database harian ke remote storage"
      ]
    }
  ] as ProjectItem[],
  certificates: [
    {
      id: "cert-1",
      title: "Memulai Dasar Pemrograman Web",
      issuer: "Dicoding Indonesia",
      date: "2024",
      credentialId: "DICODING-WEB-2024",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      verifyUrl: "https://www.dicoding.com",
      skills: ["HTML5", "CSS3", "Semantic Web", "Responsive Design"]
    },
    {
      id: "cert-2",
      title: "Belajar Membuat Front-End Web untuk Pemula",
      issuer: "Dicoding Indonesia",
      date: "2024",
      credentialId: "DICODING-FE-2024",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      verifyUrl: "https://www.dicoding.com",
      skills: ["JavaScript ES6+", "DOM Manipulation", "Web Storage", "Event Handling"]
    },
    {
      id: "cert-3",
      title: "Junior Web Developer Certification",
      issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
      date: "2025",
      credentialId: "BNSP-JWD-2025-089",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      verifyUrl: "https://bnsp.go.id",
      skills: ["Database Design", "Web Security", "Server Scripting", "Software Testing"]
    },
    {
      id: "cert-4",
      title: "Belajar Fundamental Aplikasi Web dengan React",
      issuer: "Dicoding Indonesia",
      date: "2025",
      credentialId: "DICODING-REACT-2025",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
      verifyUrl: "https://www.dicoding.com",
      skills: ["React Components", "State Management", "Hooks", "SPA Architecture"]
    },
    {
      id: "cert-5",
      title: "IT Essentials: PC Hardware & Software",
      issuer: "Cisco Networking Academy",
      date: "2024",
      credentialId: "CISCO-NET-2024",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
      verifyUrl: "https://www.netacad.com",
      skills: ["Networking Basics", "Troubleshooting", "Operating Systems", "Security"]
    }
  ] as CertificateItem[],
  achievements: [
    {
      id: "ach-1",
      title: "Juara 1 — LKS Tingkat Kabupaten",
      event: "Lomba Kompetensi Siswa (LKS) SMK Bidang Web Technologies",
      rank: "1st Place (Gold)",
      year: "2025",
      organizer: "Dinas Pendidikan & MKKS SMK",
      description: "Meraih juara pertama dalam kompetisi pengembangan sistem web modern yang meliputi perancangan database, REST API backend, dan antarmuka responsif dalam batas waktu intensif.",
      badgeColor: "from-amber-400 to-amber-600"
    },
    {
      id: "ach-2",
      title: "Juara 2 — Inovasi Digitalisasi Sekolah",
      event: "Gelar Karya Teknologi & Inovasi Sekolah Kejuruan",
      rank: "2nd Place (Silver)",
      year: "2025",
      organizer: "SMK Negeri 1 Beringin Showcase",
      description: "Penghargaan atas inovasi sistem Command Center E-Perpustakaan yang mempermudah sirkulasi inventaris dan mengurangi waktu antrean peminjaman buku.",
      badgeColor: "from-slate-300 to-slate-400"
    },
    {
      id: "ach-3",
      title: "Finalis — Tech Innovation Showcase",
      event: "Kompetisi Kreasi Digital & Pemrograman Provinsi",
      rank: "Top Finalist",
      year: "2024",
      organizer: "Dinas Komunikasi & Informatika",
      description: "Mewakili sekolah mempresentasikan arsitektur sistem absensi ekstrakurikuler berbasis web dengan verifikasi geolokasi dan reporting otomatis.",
      badgeColor: "from-blue-400 to-blue-600"
    }
  ] as AchievementItem[],
  techStack: [
    { num: "01", name: "Laravel", category: "Backend Framework", iconName: "server", proficiency: "Advanced", desc: "Arsitektur MVC, Eloquent ORM, RESTful API" },
    { num: "02", name: "React 19", category: "Frontend Library", iconName: "code-2", proficiency: "Advanced", desc: "Hooks, Server Components, State Architecture" },
    { num: "03", name: "TypeScript", category: "Language", iconName: "code", proficiency: "Intermediate+", desc: "Strict typing, generic interfaces, zero build errors" },
    { num: "04", name: "Tailwind CSS v4", category: "Styling Engine", iconName: "sparkles", proficiency: "Advanced", desc: "Modern utility classes, fluid design, animations" },
    { num: "05", name: "Three.js", category: "3D & WebGL", iconName: "cpu", proficiency: "Intermediate", desc: "Shaders, 3D scenes, particle physics, R3F" },
    { num: "06", name: "GSAP & Lenis", category: "Motion & Scroll", iconName: "sparkles", proficiency: "Advanced", desc: "ScrollTrigger, smooth 60fps kinetic motion" },
    { num: "07", name: "PHP", category: "Backend Language", iconName: "server", proficiency: "Advanced", desc: "OOP, Composer, Security best practices" },
    { num: "08", name: "MySQL", category: "Relational Database", iconName: "server", proficiency: "Advanced", desc: "Indexing, relational normalization, stored queries" },
    { num: "09", name: "Node.js", category: "Runtime", iconName: "cpu", proficiency: "Intermediate+", desc: "Express, backend microservices, npm scripts" },
    { num: "10", name: "Git & GitHub", category: "Version Control", iconName: "code", proficiency: "Advanced", desc: "Branching strategies, CI/CD, version tracking" },
    { num: "11", name: "Linux / Ubuntu", category: "Infrastructure", iconName: "server", proficiency: "Intermediate", desc: "Nginx reverse proxy, SSH management, cron jobs" },
    { num: "12", name: "Docker", category: "Containerization", iconName: "cpu", proficiency: "Intermediate", desc: "Containerized environments, docker-compose" }
  ] as TechItem[],
  journeyMoments: [
    "/moments/moment-1.jpg",
    "/moments/moment-2.jpg",
    "/moments/moment-3.jpg",
    "/moments/moment-4.jpg",
    "/moments/moment-5.jpg",
    "/moments/moment-6.jpg",
    "/moments/moment-7.jpg",
    "/moments/moment-8.jpg",
    "/moments/moment-9.jpg"
  ],
  journey: [
    {
      num: "01",
      role: "SOFTWARE ENGINEERING STUDENT",
      period: "2023 — 2026 • Indonesia",
      desc: "Membangun fondasi teknologi, logika pemrograman, dan arsitektur aplikasi web berbasis kebutuhan user.",
      tags: ["HTML", "CSS", "JavaScript", "PHP"]
    },
    {
      num: "02",
      role: "VOCATIONAL INTERN (PKL)",
      period: "2026 • Wing Hotel Kualanamu",
      desc: "Mengembangkan aplikasi web company profile interaktif dengan visualisasi operasional dan animasi GSAP.",
      tags: ["React", "Tailwind", "GSAP", "UI/UX"]
    },
    {
      num: "03",
      role: "FULL STACK WEB DEVELOPER",
      period: "Present • Independent Projects",
      desc: "Membangun ekosistem aplikasi digitalisasi sekolah (Perpustakaan dan Presensi Eskul) yang cepat dan modern.",
      tags: ["Laravel", "React", "MySQL", "Tailwind"]
    }
  ],
  github: {
    name: "Dika Armadana",
    nick: "DIKA..",
    handle: "a.k.a Dika",
    username: "boxdik089-ctrl",
    role: "Software Engineering Student",
    repos: "9 REPOS",
    privateRepos: 2,
    followers: "8 FOLLOWERS",
    following: "9 FOLLOWING",
    contributions: "111 commits in the last year",
    url: "https://github.com/boxdik089-ctrl"
  },
  songs: [
    {
      id: 1,
      title: "The Man Who Can't Be Moved",
      artist: "The Script",
      album: "The Script",
      cover: "/covers/song-1.jpg",
      audio: "/audio/song-1.mp3",
      duration: "4:01"
    },
    {
      id: 2,
      title: "Location Unknown",
      artist: "HONNE feat. Georgia",
      album: "Love Me / Love Me Not",
      cover: "/covers/song-2.jpg",
      audio: "/audio/song-2.mp3",
      duration: "3:48"
    },
    {
      id: 3,
      title: "Wish You Were Here",
      artist: "Neck Deep",
      album: "The Peace and the Panic",
      cover: "/covers/song-3.jpg",
      audio: "/audio/song-3.mp3",
      duration: "3:52"
    },
    {
      id: 4,
      title: "December",
      artist: "Neck Deep",
      album: "Life's Not Out to Get You",
      cover: "/covers/song-4.jpg",
      audio: "/audio/song-4.mp3",
      duration: "3:38"
    },
    {
      id: 5,
      title: "Fix You",
      artist: "Coldplay",
      album: "X&Y",
      cover: "/covers/song-5.jpg",
      audio: "/audio/song-5.mp3",
      duration: "4:55"
    },
    {
      id: 6,
      title: "What If I Call",
      artist: "Alex Crichton",
      album: "What If I Call",
      cover: "/covers/song-6.jpg",
      audio: "/audio/song-6.mp3",
      duration: "2:45"
    },
    {
      id: 7,
      title: "The Scientist",
      artist: "Coldplay",
      album: "A Rush of Blood to the Head",
      cover: "/covers/song-7.jpg",
      audio: "/audio/song-7.mp3",
      duration: "5:09"
    },
    {
      id: 8,
      title: "About You",
      artist: "The 1975",
      album: "Being Funny In A Foreign Language",
      cover: "/covers/song-8.jpg",
      audio: "/audio/song-8.mp3",
      duration: "5:26"
    },
    {
      id: 9,
      title: "A Thousand Years",
      artist: "Christina Perri",
      album: "The Twilight Saga",
      cover: "/covers/song-9.jpg",
      audio: "/audio/song-9.mp3",
      duration: "4:45"
    }
  ] as SongItem[],
  socials: {
    email: "boxdik089@gmail.com",
    github: "https://github.com/boxdik089-ctrl",
    instagram: "https://instagram.com/dprxz_",
    tiktok: "https://tiktok.com/@dikaarmadana"
  },
  initialComments: [
    {
      id: "seed-1",
      name: "Budi Santoso",
      comment: "Portofolionya luar biasa keren Mas Dika! Efek kartu 3D dan animasi spotlight fotonya sangat halus. Sukses terus untuk projek digitalisasi sekolahnya!",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      date: "1 hari yang lalu",
      likes: 4,
      isLiked: false
    },
    {
      id: "seed-2",
      name: "Rina Marlina",
      comment: "Desainnya futuristik dan sangat rapi. Penataan komponennya nyaman banget dilihat dan player musiknya bikin betah explore! Keep up the good work!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      date: "3 hari yang lalu",
      likes: 6,
      isLiked: true
    }
  ] as CommentItem[]
};
