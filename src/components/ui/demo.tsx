"use client";

import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";
export { MarqueeDemo } from "@/components/ui/marquee-demo";

// Curated high-resolution Unsplash stock imagery matching aesthetic dark tech theme
const WORKS: WorksWheelItem[] = [
  {
    title: "Prismatic Rift",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    href: "#prismatic-rift",
  },
  {
    title: "Ember Clouds",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    href: "#ember-clouds",
  },
  {
    title: "Neon Portal",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    href: "#neon-portal",
  },
  {
    title: "Red Ribbon",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
    href: "#red-ribbon",
  },
  {
    title: "Celestial",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    href: "#celestial",
  },
  {
    title: "Uplight",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    href: "#uplight",
  },
  {
    title: "Indigo Marble",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1200&q=80",
    href: "#indigo-marble",
  },
  {
    title: "Launch Window",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    href: "#launch-window",
  },
  {
    title: "Cosmic Wave",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    href: "#cosmic-wave",
  },
];

export function WorksWheelDemo() {
  return (
    <div className="bg-background text-foreground w-full h-screen">
      <WorksWheel items={WORKS} label="Works '26" action="View" />
    </div>
  );
}

export default WorksWheelDemo;
