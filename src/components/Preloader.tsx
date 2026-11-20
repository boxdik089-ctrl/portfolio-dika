import React, { useState, useEffect, useRef } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
  onExitAnimationStart?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, onExitAnimationStart }) => {
  const [progress, setProgress] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  const onCompleteRef = useRef(onComplete);
  const onExitAnimationStartRef = useRef(onExitAnimationStart);
  const completedRef = useRef(false);
  const finishDelayRef = useRef<number | null>(null);
  const skipFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    onExitAnimationStartRef.current = onExitAnimationStart;
  });

  useEffect(() => {
    // Lock scroll while loading
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    let current = 0;

    const finish = (exitDelayMs = 700) => {
      if (completedRef.current) return;
      completedRef.current = true;
      setProgress(100);
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      onExitAnimationStartRef.current?.();
      setIsLeaving(true);

      finishDelayRef.current = window.setTimeout(() => {
        html.style.overflow = prevHtmlOverflow;
        body.style.overflow = prevBodyOverflow;
        onCompleteRef.current?.();
      }, exitDelayMs);
    };

    skipFnRef.current = () => finish(500);

    const interval = setInterval(() => {
      if (completedRef.current) return;
      current += Math.floor(Math.random() * 5) + 4;
      if (current >= 100) {
        finish(700);
      } else {
        setProgress(current);
      }
    }, 35);

    // Safety timeout: Maximum 2.0s before guarantee-finishing
    const safetyTimeout = setTimeout(() => {
      finish(700);
    }, 2000);

    return () => {
      skipFnRef.current = null;
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      if (finishDelayRef.current !== null) {
        clearTimeout(finishDelayRef.current);
      }
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  const handleClickSkip = () => {
    skipFnRef.current?.();
  };

  return (
    <div
      className={`welcome-screen-root ${isLeaving ? 'is-leaving' : ''}`}
      onClick={handleClickSkip}
      title="Klik untuk melewati loading"
    >
      <div className="welcome-loader">
        <span
          className="welcome-loader-number"
          role="status"
          aria-live="polite"
          aria-label={`Memuat aset portfolio ${progress}%`}
        >
          {progress}
          <span>%</span>
        </span>

        <div className="welcome-progress-track" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>

        <span className="welcome-loader-count">Memuat assets...</span>
      </div>
    </div>
  );
};

export default Preloader;
