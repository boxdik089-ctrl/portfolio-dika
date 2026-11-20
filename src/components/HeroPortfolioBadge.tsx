import FrontIdCard from './FrontIdCard';

interface HeroPortfolioBadgeProps {
  embedded?: boolean;
  className?: string;
}

export default function HeroPortfolioBadge({ embedded = false, className = '' }: HeroPortfolioBadgeProps) {
  if (embedded) {
    return <FrontIdCard className={className} />;
  }

  return (
    <div className={`relative min-h-screen w-full bg-[#080c14] text-white overflow-hidden flex items-center justify-center p-6 select-none ${className}`}>
      <FrontIdCard />
    </div>
  );
}

export { HeroPortfolioBadge, FrontIdCard };
