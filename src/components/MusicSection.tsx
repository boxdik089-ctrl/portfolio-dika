import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Disc3 } from 'lucide-react';
import { CoverflowCarousel, type CoverflowSlide } from '@/components/ui/coverflow-carousel';

gsap.registerPlugin(ScrollTrigger);

export const MusicSection: React.FC = () => {
  const songs = portfolioData.songs;
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activeSong = songs[currentIdx] || songs[0];

  // Build coverflow slides from song data
  const coverflowSlides: CoverflowSlide[] = songs.map((song) => ({
    src: song.cover,
    alt: `${song.title} — ${song.artist}`,
    title: song.title,
    subtitle: song.artist,
    meta: [
      { label: 'Album', value: song.album },
      { label: 'Duration', value: song.duration },
    ],
  }));

  // Initialize and handle Audio instance
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = volume;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 30);
    };

    const onEnded = () => {
      // Auto-advance to next song
      setCurrentIdx((prev) => (prev + 1) % songs.length);
    };

    const onError = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.src = '';
    };
  }, [songs.length]);

  // Handle active song source change
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const wasPlaying = isPlaying;

    audio.src = activeSong.audio;
    audio.currentTime = 0;
    setCurrentTime(0);

    if (wasPlaying) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [currentIdx, activeSong.audio]);

  // Volume & Mute sync
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleSelectSong = (index: number) => {
    if (currentIdx === index) {
      togglePlay();
    } else {
      setCurrentIdx(index);
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current
          ?.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }, 50);
    }
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Sync coverflow slide change → select song
  const handleSlideChange = useCallback((index: number) => {
    if (index !== currentIdx) {
      setCurrentIdx(index);
    }
  }, [currentIdx]);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.playlist-editorial-table', {
        y: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="music-section-wrap" id="music">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-row" style={{ marginBottom: '40px' }}>
          <div>
            <span className="section-tag light">05 // MUSIC LOUNGE</span>
            <h2 className="music-main-title">FAVORITE SOUNDTRACKS</h2>
          </div>
        </div>

        {/* Coverflow Album Art Carousel */}
        <div className="music-coverflow-wrap">
          <CoverflowCarousel
            slides={coverflowSlides}
            showCaption={false}
            showNavigation
            loop
            rotate={44}
            depth={0.6}
            perspective={3}
            falloff={0.56}
            fade={0.12}
            cardWidth="clamp(140px, 20vw, 240px)"
            gap={0.06}
            label="Favorite soundtracks carousel"
            onSlideChange={handleSlideChange}
            cardClassName="coverflow-album-card"
          />

          {/* Now Playing Info Bar — below the carousel */}
          <div className="now-playing-bar">
            <div className="now-playing-left">
              <div className="now-playing-cover">
                <img src={activeSong.cover} alt={activeSong.title} />
                {isPlaying && <div className="now-playing-ring" />}
              </div>
              <div className="now-playing-info">
                <span className="now-playing-title">{activeSong.title}</span>
                <span className="now-playing-artist">{activeSong.artist}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="now-playing-controls">
              <button type="button" onClick={handlePrev} className="player-nav-btn" title="Previous Song">
                <SkipBack size={18} />
              </button>
              <button
                type="button"
                onClick={togglePlay}
                className="player-main-play-btn"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={20} fill="#FFFFFF" /> : <Play size={20} fill="#FFFFFF" style={{ marginLeft: '2px' }} />}
              </button>
              <button type="button" onClick={handleNext} className="player-nav-btn" title="Next Song">
                <SkipForward size={18} />
              </button>
            </div>

            {/* Progress + Volume */}
            <div className="now-playing-right">
              <div className="now-playing-timeline">
                <span className="time-label">{formatTime(currentTime)}</span>
                <div className="scrubber-track-container">
                  <div className="scrubber-fill-bar" style={{ width: `${progressPercent}%` }} />
                  <input
                    type="range"
                    min="0"
                    max={duration || 30}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    className="scrubber-slider-input"
                  />
                </div>
                <span className="time-label">{formatTime(duration || 30)}</span>
              </div>
              <div className="now-playing-volume">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="player-tool-btn"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    if (isMuted) setIsMuted(false);
                  }}
                  style={{ width: '52px', accentColor: '#D96B27', cursor: 'pointer' }}
                  title="Adjust Volume"
                />
                <div className={`disc-spin-indicator ${isPlaying ? 'spin-active' : ''}`} title="Playing Now">
                  <Disc3 size={16} color={isPlaying ? '#D96B27' : '#94A3B8'} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curated Editorial Playlist Table */}
        <div className="playlist-editorial-table">
          <div className="playlist-table-header">
            <span style={{ width: '36px' }}>#</span>
            <span style={{ flex: 1 }}>TITLE / ARTIST</span>
            <span className="hidden-sm" style={{ width: '180px' }}>ALBUM</span>
            <span style={{ width: '60px', textAlign: 'right' }}>TIME</span>
          </div>

          <div className="playlist-items-scroll">
            {songs.map((song, idx) => {
              const isSelected = currentIdx === idx;
              const isItemPlaying = isSelected && isPlaying;

              return (
                <div
                  key={song.id || idx}
                  onClick={() => handleSelectSong(idx)}
                  className={`playlist-item-row ${isSelected ? 'row-selected' : ''}`}
                >
                  {/* Index or Equalizer / Play indicator */}
                  <div className="playlist-item-num">
                    {isItemPlaying ? (
                      <div className="row-mini-eq">
                        <span />
                        <span />
                        <span />
                      </div>
                    ) : (
                      <span className="num-text">0{idx + 1}</span>
                    )}
                    <Play size={13} className="hover-play-icon" />
                  </div>

                  {/* Artwork + Title & Artist */}
                  <div className="playlist-item-details">
                    <div className="playlist-mini-cover">
                      <img src={song.cover} alt={song.title} loading="lazy" />
                      {isItemPlaying && <div className="mini-cover-playing-ring" />}
                    </div>
                    <div className="playlist-names-wrap">
                      <span className={`row-track-title ${isSelected ? 'title-active' : ''}`}>
                        {song.title}
                      </span>
                      <span className="row-track-artist">{song.artist}</span>
                    </div>
                  </div>

                  {/* Album Name */}
                  <div className="playlist-item-album hidden-sm">
                    <span>{song.album || 'Single'}</span>
                  </div>

                  {/* Duration / Status */}
                  <div className="playlist-item-time">
                    <span>{song.duration || '3:30'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .music-section-wrap {
          padding: 130px 0;
          background-color: #F8FAFC;
          color: #0F172A;
          position: relative;
        }

        .music-main-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #0F172A;
          line-height: 1.05;
          margin-top: 10px;
        }

        /* ── Coverflow Wrapper ── */
        .music-coverflow-wrap {
          margin-bottom: 48px;
        }

        .coverflow-album-card {
          border-radius: 16px !important;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2) !important;
        }

        /* ── Now Playing Bar ── */
        .now-playing-bar {
          display: flex;
          align-items: center;
          gap: 20px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 14px 20px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
          margin-top: 4px;
        }

        .now-playing-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          flex: 0 0 auto;
        }

        .now-playing-cover {
          position: relative;
          width: 48px;
          height: 48px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        .now-playing-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .now-playing-ring {
          position: absolute;
          inset: 0;
          border: 2px solid #D96B27;
          border-radius: 10px;
          animation: ring-pulse 2s ease-in-out infinite;
        }

        @keyframes ring-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(217, 107, 39, 0.4); }
          50% { box-shadow: 0 0 0 4px rgba(217, 107, 39, 0); }
        }

        .now-playing-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .now-playing-title {
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 0.92rem;
          color: #0F172A;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 160px;
        }

        .now-playing-artist {
          font-family: var(--font-body);
          font-size: 0.78rem;
          color: #64748B;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 160px;
        }

        /* ── Controls ── */
        .now-playing-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .player-nav-btn {
          background: transparent;
          border: none;
          color: #64748B;
          cursor: pointer;
          padding: 6px;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .player-nav-btn:hover {
          color: #D96B27;
          transform: scale(1.1);
        }

        .player-main-play-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #D96B27;
          color: #FFFFFF;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(217, 107, 39, 0.4);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .player-main-play-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 10px 25px rgba(217, 107, 39, 0.55);
        }

        /* ── Right Side: Timeline + Volume ── */
        .now-playing-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }

        .now-playing-timeline {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .time-label {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: #64748B;
          flex-shrink: 0;
          min-width: 32px;
        }

        .scrubber-track-container {
          position: relative;
          height: 5px;
          background: #E2E8F0;
          border-radius: 9999px;
          overflow: hidden;
          flex: 1;
        }

        .scrubber-fill-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: #D96B27;
          border-radius: 9999px;
          pointer-events: none;
        }

        .scrubber-slider-input {
          position: absolute;
          inset: 0;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .now-playing-volume {
          display: flex;
          align-items: center;
          gap: 4px;
          justify-content: flex-end;
        }

        .player-tool-btn {
          background: transparent;
          border: none;
          color: #64748B;
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .player-tool-btn:hover {
          color: #0F172A;
          background: #F1F5F9;
        }

        .disc-spin-indicator {
          padding: 4px;
          border-radius: 50%;
        }

        .disc-spin-indicator.spin-active svg {
          animation: spin-pulse 3s linear infinite;
        }

        @keyframes spin-pulse {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* ── Playlist Editorial Table ── */
        .playlist-editorial-table {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 24px 28px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
        }

        .playlist-table-header {
          display: flex;
          align-items: center;
          padding: 0 16px 14px 16px;
          border-bottom: 1px solid #E2E8F0;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #94A3B8;
        }

        .playlist-items-scroll {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 10px;
        }

        .playlist-item-row {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .playlist-item-row:hover {
          background: #F8FAFC;
          border-color: #E2E8F0;
          transform: translateX(4px);
        }

        .playlist-item-row.row-selected {
          background: #FFF7ED;
          border-color: #FFEDD5;
        }

        .playlist-item-num {
          width: 36px;
          position: relative;
          display: flex;
          align-items: center;
        }

        .num-text {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 600;
          color: #94A3B8;
          transition: opacity 0.15s ease;
        }

        .hover-play-icon {
          position: absolute;
          left: 0;
          opacity: 0;
          color: #D96B27;
          transition: opacity 0.15s ease;
        }

        .playlist-item-row:hover .num-text {
          opacity: 0;
        }

        .playlist-item-row:hover .hover-play-icon {
          opacity: 1;
        }

        .row-mini-eq {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 14px;
        }

        .row-mini-eq span {
          width: 2px;
          background: #D96B27;
          border-radius: 1px;
          animation: mini-eq 0.8s ease-in-out infinite alternate;
        }

        .row-mini-eq span:nth-child(1) { height: 12px; animation-delay: 0.1s; }
        .row-mini-eq span:nth-child(2) { height: 6px; animation-delay: 0.3s; }
        .row-mini-eq span:nth-child(3) { height: 14px; animation-delay: 0.2s; }

        @keyframes mini-eq {
          0% { height: 3px; }
          100% { height: 14px; }
        }

        .playlist-item-details {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
        }

        .playlist-mini-cover {
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .playlist-mini-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .mini-cover-playing-ring {
          position: absolute;
          inset: 0;
          border: 2px solid #D96B27;
          border-radius: 8px;
        }

        .playlist-names-wrap {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .row-track-title {
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.95rem;
          color: #0F172A;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .row-track-title.title-active {
          color: #D96B27;
          font-weight: 700;
        }

        .row-track-artist {
          font-family: var(--font-body);
          font-size: 0.82rem;
          color: #64748B;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .playlist-item-album {
          width: 180px;
          font-family: var(--font-body);
          font-size: 0.84rem;
          color: #64748B;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-right: 12px;
        }

        .playlist-item-time {
          width: 60px;
          text-align: right;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: #94A3B8;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hidden-sm {
            display: none !important;
          }
          .now-playing-bar {
            flex-wrap: wrap;
            gap: 12px;
            padding: 12px 14px;
          }
          .now-playing-right {
            width: 100%;
            flex: 1 1 100%;
          }
          .now-playing-title,
          .now-playing-artist {
            max-width: 120px;
          }
        }
      `}</style>
    </section>
  );
};

export default MusicSection;
