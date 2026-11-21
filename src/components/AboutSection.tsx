import React, { useRef, useEffect } from 'react';
import { UserCheck, Code2, ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const sec = sectionRef.current;
    const portrait = portraitRef.current;
    if (!sec || !portrait) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        portrait.classList.toggle('is-in-view', entry.isIntersecting);
        if (!entry.isIntersecting) {
          clearTimeout(timerRef.current);
          portrait.classList.remove('spider-hovered');
          delete portrait.dataset.spiderVisible;
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sec);
    return () => {
      observer.disconnect();
      clearTimeout(timerRef.current);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const stage = portraitRef.current;
    const portrait = stage?.querySelector('.about-portrait');
    if (!stage || !portrait) return;

    clearTimeout(timerRef.current);
    const rect = portrait.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    stage.style.setProperty('--hover-x', `${x}%`);
    stage.style.setProperty('--hover-y', `${y}%`);
    stage.classList.add('spider-hovered');
    stage.dataset.spiderVisible = 'true';
  };

  const handlePointerLeave = () => {
    const stage = portraitRef.current;
    if (stage) {
      delete stage.dataset.spiderVisible;
      clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        stage.classList.remove('spider-hovered');
      }, 7000);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="about-root-section"
      id="About"
      aria-labelledby="about-section-heading"
    >
      <h2 className="section-display-title" id="about-section-heading">
        About Me
      </h2>

      <div className="about-container-inner">
        {/* Left Name & Hubungi Saya */}
        <div className="about-intro">
          <h2 className="about-title" id="about-title">
            <span className="about-title-greeting">Hi, I'm</span>
            <span>
              Dika
              <br />
              Armadana
            </span>
          </h2>
          <a href="#Contact" className="about-action about-action-primary">
            <UserCheck size={17} />
            <span>Hubungi Saya</span>
          </a>
        </div>

        {/* Center Spotlight Photo with Spider-Man mask hover */}
        <div
          ref={portraitRef}
          className="about-portrait-stage"
          aria-label="Portrait with Spider-Man suit hover effect"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className="about-portrait-glow" />
          <div className="about-portrait">
            <img
              className="about-person-image"
              src="/assets/dika_portrait.png?v=sports_jersey_centered_v3"
              alt="Dika Armadana"
            />
            <img
              className="about-spider-image"
              src="/assets/PhotoSpiderman-SN9X5pZn.png"
              alt=""
              aria-hidden="true"
            />
          </div>
          <span className="about-portrait-spark" />
        </div>

        {/* Right Bio & Lihat Projek */}
        <div className="about-bio">
          <p>
            Saya adalah <strong>Web & System Developer</strong> yang berfokus pada pengembangan
            teknologi yang fungsional sekaligus menarik. Saya senang memadukan kode, desain, dan
            pengalaman 3D untuk membangun produk digital yang berkesan.
          </p>
          <p>
            Dengan Node.js, PHP, React, dan teknologi web modern, saya mengubah ide menjadi pengalaman
            digital yang intuitif, responsif, dan berdampak.
          </p>
          <a href="#Portofolio" className="about-action about-action-secondary">
            <Code2 size={17} />
            <span>Lihat Projek</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
