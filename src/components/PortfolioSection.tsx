import React, { useState, useEffect, useRef } from 'react';
import {
  Code2,
  Award,
  Cpu,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ZoomIn,
  X,
  ArrowUpRight
} from 'lucide-react';
import gsap from 'gsap';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  longDesc: string;
  image: string;
  mobileImage?: string;
  tags: string[];
  gradient?: string;
  github?: string;
  link?: string;
}

export interface CertData {
  id: string;
  title: string;
  image: string;
  mobileImage?: string;
}

const PROJECTS: ProjectData[] = [
  {
    id: 'dataSiswa',
    title: 'Database Siswa',
    description:
      'Aplikasi Dashboard Data Siswa merupakan platform berbasis website untuk memantau data siswa secara terpusat.',
    longDesc:
      'Aplikasi Dashboard Data Siswa merupakan platform berbasis website untuk memantau dan mengelola data siswa secara terpusat, mencakup presensi harian, nilai akademik, rekapitulasi kelas, dan rekam jejak siswa dengan integrasi database terproteksi.',
    image: '/assets/dataSiswa-BQe6wQ9l.png',
    mobileImage: '/assets/dataSiswa-mobile-BInbeI1D.webp',
    tags: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'Chart.js']
  },
  {
    id: 'ePerpustakaan',
    title: 'E-Perpustakaan',
    description:
      'Command Center sistem manajemen buku & peminjaman digital dengan barcode scanner dan kalkulasi denda otomatis.',
    longDesc:
      'Aplikasi sistem informasi perpustakaan modern berbasis web yang dirancang untuk mendigitalisasi operasional perpustakaan sekolah. Dilengkapi dengan pemindaian barcode cepat untuk sirkulasi buku, tracking peminjam & tanggal pengembalian, kalkulator denda keterlambatan, hingga dashboard analitik buku terpopuler dan statistik pengunjung harian.',
    image: '/projects/perpustakaan.png',
    link: 'https://perpustakaan.tiksmkn1beringin.my.id',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MySQL']
  },
  {
    id: 'hpuLanding',
    title: 'Landing Page HPU',
    description:
      'High-converting commercial landing page untuk produk Herbal Pelangsing Ultimate dengan layout responsif & modern.',
    longDesc:
      'Landing page komersial modern yang dirancang untuk produk Herbal Pelangsing Ultimate (HPU). Mengedepankan hierarki visual persuasif, presentasi keunggulan produk, integrasi call-to-action (CTA) langsung ke checkout WhatsApp, serta performa loading instan dengan arsitektur mobile-first.',
    image: '/projects/hpu_landing.png',
    tags: ['Tailwind CSS', 'HTML5', 'JavaScript', 'Responsive UI', 'Marketing Web']
  }
];

const CERTIFICATES: CertData[] = [
  {
    id: 'cert-css-js',
    title: 'CSS & JavaScript Course',
    image: '/assets/css-js-course-CKMSixCf.jpg'
  },
  {
    id: 'cert-competency',
    title: 'Certificate of Competency Web Development',
    image: '/assets/UC-f106f323-2cad-4f16-a2d3-e0e843fb2016-1-DTe2UNv0.png'
  }
];

interface SkillItem {
  name: string;
  logo: string;
  logoClass?: string;
  color: string;
  rgb: string;
}

const TECH_STACK: SkillItem[] = [
  { name: 'React', logo: '/tech/react.svg', color: '#61DAFB', rgb: '97, 218, 251' },
  { name: 'JavaScript', logo: '/tech/javascript.svg', color: '#F7DF1E', rgb: '247, 223, 30' },
  { name: 'HTML5', logo: '/tech/html5.svg', color: '#E34F26', rgb: '227, 79, 38' },
  { name: 'CSS3', logo: '/tech/css3.svg', color: '#1572B6', rgb: '21, 114, 182' },
  { name: 'Tailwind CSS', logo: '/tech/tailwind.svg', color: '#38BDF8', rgb: '56, 189, 248' },
  { name: 'Next.js', logo: '/tech/nextjs.svg', logoClass: 'is-light', color: '#E2E8F0', rgb: '226, 232, 240' },
  { name: 'Node.js', logo: '/tech/nodejs.svg', color: '#68A063', rgb: '104, 160, 99' },
  { name: 'Python', logo: '/tech/python.svg', color: '#3776AB', rgb: '55, 118, 171' },
  { name: 'PHP', logo: '/tech/php.svg', color: '#777BB4', rgb: '119, 123, 180' },
  { name: 'MySQL', logo: '/assets/mysql-logo-svgrepo-com-BQqVCOl5.svg', color: '#00758F', rgb: '0, 117, 143' },
  { name: 'Android Studio', logo: '/assets/android-studio-icon-7CEbVhV6.svg', color: '#3DDC84', rgb: '61, 220, 132' },
  { name: 'XAMPP', logo: '/assets/xampp-svgrepo-com-CyJx88TA.svg', color: '#FB7A24', rgb: '251, 122, 36' },
  { name: 'Supabase', logo: '/tech/supabase.svg', color: '#3ECF8E', rgb: '62, 207, 142' },
  { name: 'Firebase', logo: '/tech/firebase.svg', color: '#FFCA28', rgb: '255, 202, 40' },
  { name: 'Git', logo: '/tech/git.svg', color: '#F05032', rgb: '240, 80, 50' },
  { name: 'GitHub', logo: '/tech/github.svg', logoClass: 'is-light', color: '#C084FC', rgb: '192, 132, 252' },
  { name: 'Vite', logo: '/tech/vite.svg', color: '#BD34FE', rgb: '189, 52, 254' },
  { name: 'Vercel', logo: '/tech/vercel.svg', logoClass: 'is-light', color: '#F8FAFC', rgb: '248, 250, 252' }
];

const SHOW_CERTIFICATES = false; // Ubah ke true saat ingin memunculkan tab Certificates kembali

export const PortfolioSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const prevTabRef = useRef<string>('projects');
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'skills'>(
    'projects'
  );
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [previewCert, setPreviewCert] = useState<CertData | null>(null);

  // Pointer Glow for Project Detail
  useEffect(() => {
    if (!selectedProject) return;
    const handlePointerMove = (e: PointerEvent) => {
      const root = document.documentElement;
      const x = e.clientX.toFixed(2);
      const y = e.clientY.toFixed(2);
      const ratio = e.clientX / window.innerWidth;
      root.style.setProperty('--tech-glow-x', `${x}px`);
      root.style.setProperty('--tech-glow-y', `${y}px`);
      root.style.setProperty('--tech-glow-hue', `${210 + ratio * 100}`);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.style.removeProperty('--tech-glow-x');
      document.documentElement.style.removeProperty('--tech-glow-y');
      document.documentElement.style.removeProperty('--tech-glow-hue');
    };
  }, [selectedProject]);

  // Escape key for Cert Viewer Modal
  useEffect(() => {
    if (!previewCert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewCert]);

  // Tab switch animations
  useEffect(() => {
    if (selectedProject) return;
    const prev = prevTabRef.current;
    prevTabRef.current = activeTab;
    if (prev === activeTab) return;

    const container = containerRef.current;
    if (!container) return;

    const activeView = container.querySelector(`.portfolio-${activeTab}-view`);
    const cards = activeView?.querySelectorAll(
      '.portfolio-project-card, .portfolio-skill-card, .portfolio-cert-card'
    );
    if (!cards?.length) return;

    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 24, scale: 0.95 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.05,
        ease: 'power3.out',
        clearProps: 'transform,opacity,visibility'
      }
    );
  }, [activeTab, selectedProject]);

  const handleOpenDetail = (project: ProjectData) => {
    setSelectedProject(project);
    window.scrollTo({ top: (containerRef.current?.offsetTop || 800) - 80, behavior: 'smooth' });
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
  };

  // If a project is selected, show Project Detail Page
  if (selectedProject) {
    return (
      <main className="project-detail-page">
        <div className="project-detail-inner">
          {/* Breadcrumbs */}
          <div className="project-detail-breadcrumbs">
            <button
              type="button"
              className="project-detail-back"
              onClick={handleBackToProjects}
            >
              <ArrowLeft size={20} aria-hidden="true" />
              <span>Back</span>
            </button>
            <span className="project-detail-crumb-muted">Projects</span>
            <ChevronRight size={18} aria-hidden="true" className="project-detail-crumb-chevron" />
            <span className="project-detail-crumb-current">{selectedProject.title}</span>
          </div>

          {/* Layout */}
          <div className="project-detail-layout">
            {/* Left Copy */}
            <div className="project-detail-copy">
              <h1 className="project-detail-title">{selectedProject.title}</h1>
              <p className="project-detail-description">{selectedProject.longDesc}</p>

              <div className="project-detail-tech">
                <h2>
                  <Code2 size={20} aria-hidden="true" />
                  Technologies Used
                </h2>
                <div className="project-detail-tech-list">
                  {selectedProject.tags.map((t) => (
                    <span key={t} className="project-detail-tech-chip" data-glow="true">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProject.link && (
                <div className="project-detail-action" style={{ marginTop: '1.5rem' }}>
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600/25 hover:bg-blue-600/40 text-blue-300 hover:text-white border border-blue-500/40 hover:border-blue-400 transition-all font-medium text-sm"
                  >
                    <span>Kunjungi Website</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              )}
            </div>

            {/* Right Mockup Preview */}
            <div className="project-detail-preview has-image">
              <img
                src={selectedProject.image}
                alt={`Tampilan ${selectedProject.title}`}
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <section
      ref={containerRef}
      className="portfolio-root-section"
      id="Portofolio"
      aria-labelledby="portfolio-section-heading"
    >
      <div className="portfolio-container-inner">
        <h2 className="section-display-title" id="portfolio-section-heading">
          Portfolio
        </h2>

        {/* 3 Tabs Bar */}
        <div className="portfolio-tab-bar">
          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`portfolio-tab-btn ${activeTab === 'projects' ? 'is-active' : ''}`}
          >
            <Code2 size={22} />
            <span>Projects</span>
          </button>

          {SHOW_CERTIFICATES && (
            <button
              type="button"
              onClick={() => setActiveTab('certificates')}
              className={`portfolio-tab-btn ${activeTab === 'certificates' ? 'is-active' : ''}`}
            >
              <Award size={22} />
              <span>Certificates</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveTab('skills')}
            className={`portfolio-tab-btn ${activeTab === 'skills' ? 'is-active' : ''}`}
          >
            <Cpu size={22} />
            <span>Tech Stack</span>
          </button>
        </div>

        {/* TAB 1: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="portfolio-projects-view">
            <div className="portfolio-cards-grid">
              {PROJECTS.map((project) => (
                <article key={project.id} className="portfolio-project-card">
                  <div className="portfolio-project-metal-border" />
                  <div className="portfolio-project-card-content">
                    <div className="portfolio-card-thumbnail">
                      <img
                        className="portfolio-card-thumbnail-image"
                        src={project.image}
                        alt={`Thumbnail ${project.title}`}
                        loading="lazy"
                      />
                    </div>
                    <div className="portfolio-card-body">
                      <h3 className="portfolio-card-title">{project.title}</h3>
                      <p className="portfolio-card-desc">{project.description}</p>
                      <button
                        type="button"
                        className="portfolio-details-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDetail(project);
                        }}
                      >
                        <span>Details</span>
                        <ArrowRight size={20} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CERTIFICATES (Temporarily hidden) */}
        {SHOW_CERTIFICATES && activeTab === 'certificates' && (
          <div className="portfolio-certificates-view">
            <div className="portfolio-certificates-grid">
              {CERTIFICATES.map((cert) => (
                <article
                  key={cert.id}
                  className="portfolio-cert-card"
                  role="button"
                  tabIndex={0}
                  aria-label={`Lihat sertifikat ${cert.title}`}
                  onClick={() => setPreviewCert(cert)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setPreviewCert(cert);
                    }
                  }}
                >
                  <div className="portfolio-cert-preview">
                    <img
                      className="portfolio-cert-preview-image"
                      src={cert.image}
                      alt={`Preview ${cert.title}`}
                      loading="lazy"
                    />
                    <span className="portfolio-cert-preview-overlay">
                      Lihat sertifikat
                      <ZoomIn size={18} aria-hidden="true" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TECH STACK */}
        {activeTab === 'skills' && (
          <div className="portfolio-skills-view">
            <div className="portfolio-skills-grid">
              {TECH_STACK.map((tech) => (
                <article
                  key={tech.name}
                  className="portfolio-skill-card"
                  style={{
                    '--brand-color': tech.color,
                    '--brand-rgb': tech.rgb
                  } as React.CSSProperties}
                  onPointerMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty('--spotlight-x', `${x}px`);
                    e.currentTarget.style.setProperty('--spotlight-y', `${y}px`);
                  }}
                >
                  <div className="portfolio-skill-card-content">
                    <div className="portfolio-skill-mark">
                      <img
                        className={`portfolio-skill-logo ${tech.logoClass || ''}`}
                        src={tech.logo}
                        alt={tech.name}
                        loading="lazy"
                      />
                    </div>
                    <h3 className="portfolio-skill-name">{tech.name}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Certificate Viewer Modal */}
      {previewCert && (
        <div
          className="portfolio-cert-viewer-backdrop"
          onClick={() => setPreviewCert(null)}
        >
          <button
            type="button"
            className="portfolio-cert-viewer-close"
            onClick={() => setPreviewCert(null)}
            aria-label="Tutup sertifikat"
          >
            <X size={30} />
          </button>
          <div
            className="portfolio-cert-viewer"
            role="dialog"
            aria-modal="true"
            aria-label={previewCert.title}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              className="portfolio-cert-viewer-image"
              src={previewCert.image}
              alt={previewCert.title}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
