import React, { useState, useEffect, Suspense, lazy } from 'react';
import { FrontIdCard } from './FrontIdCard';

// Lazy load the full Three.js Lanyard
// @ts-expect-error Lanyard3D is a standalone JSX component
const Lanyard3D = lazy(() => import('./Lanyard3D.jsx'));

class LanyardErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('Lanyard 3D fallback active:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center w-full h-full p-4 pointer-events-auto">
          <FrontIdCard />
        </div>
      );
    }
    return this.props.children;
  }
}

interface LanyardCardProps {
  introFinished?: boolean;
}

export const LanyardCard: React.FC<LanyardCardProps> = () => {
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section
      className={`lanyard-card-container${isMobile ? ' is-mobile' : ''}`}
      aria-label="Interactive 3D Lanyard"
    >
      <div className="lanyard-viewport">
        <LanyardErrorBoundary>
          <Suspense fallback={null}>
            <Lanyard3D
              frontImage={isMobile ? '/lanyard/frontCard-mobile.webp?v=dika_vector_v6' : '/lanyard/frontCard.png?v=dika_vector_v6'}
              backImage={isMobile ? '/lanyard/backCard-mobile.webp?v=smkn1_clean_v7' : '/lanyard/backCard.png?v=smkn1_clean_v7'}
              strapImage="/lanyard/bandd.png?v=dika_strap_v2"
              cardColor="#04010e09"
              imagePadding={0.035}
              strapColor="#111827"
              finish="glossy"
              anchor={isMobile ? 'center' : 'right'}
              orientation="portrait"
              size={0.62}
              cornerRadius={0.25}
              strapLength={0.59}
              strapWidth={0.62}
              gravity={1.2}
              damping={0.35}
              elasticity={0.7}
              breeze={0.1}
              interactive={true}
              autoFlip={false}
              intro={true}
            />
          </Suspense>
        </LanyardErrorBoundary>
      </div>
    </section>
  );
};

export default LanyardCard;
