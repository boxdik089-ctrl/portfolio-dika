import React from 'react';

export const EduExpSection: React.FC = () => {
  return (
    <section className="experience-section" aria-labelledby="experience-section-heading">
      <div className="experience-container">
        <div className="experience-columns">
          {/* Education Group */}
          <div className="experience-group">
            <h2>Education</h2>

            <article className="experience-card">
              <div className="experience-logo">
                <img src="/assets/smkn1-beringin-logo.png" alt="Logo SMK Negeri 1 Beringin" />
              </div>
              <div className="experience-card-copy">
                <h3>SMK Negeri 1 Beringin</h3>
                <p>Teknik Jaringan Komputer dan Telekomunikasi (TJKT)</p>
                <span className="experience-date">2024 – 2027</span>
              </div>
            </article>

            <article className="experience-card">
              <div className="experience-logo">
                <img src="/assets/mts-logo.png" alt="Logo MTs / SMP Negeri" />
              </div>
              <div className="experience-card-copy">
                <h3>MTs / SMP Negeri</h3>
                <p>Sekolah Menengah Pertama</p>
                <span className="experience-date">2021 – 2024</span>
              </div>
            </article>
          </div>

          {/* Experience Group */}
          <div className="experience-group">
            <h2>Experience</h2>

            <article className="experience-card">
              <div className="experience-logo">
                <img src="/assets/wing-hotel-logo.png" alt="Logo Wing Hotel Kualanamu" />
              </div>
              <div className="experience-card-copy">
                <h3>Wing Hotel Kualanamu</h3>
                <p>IT Support (Praktik Kerja Lapangan)</p>
                <span className="experience-date">2025 – 2026</span>
                <p className="experience-desc">
                  Mendukung operasional teknologi informasi hotel, membantu kebutuhan teknis, serta mengenal sistem dan perangkat IT di lingkungan kerja.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EduExpSection;
