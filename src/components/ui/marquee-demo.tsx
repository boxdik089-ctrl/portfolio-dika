import { Marquee } from "@/components/ui/marquee"

const Logos = {
  tailwindcss: () => (
    <div className="flex items-center gap-3 whitespace-nowrap select-none">
      <svg className="h-5 w-5 text-cyan-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
      </svg>
      <span className="font-semibold text-[13px] sm:text-sm tracking-widest uppercase text-neutral-200 group-hover:text-white transition-colors">
        Tailwind CSS
      </span>
    </div>
  ),
  react: () => (
    <div className="flex items-center gap-3 whitespace-nowrap select-none">
      <svg
        className="h-5 w-5 text-cyan-400 shrink-0 animate-[spin_12s_linear_infinite]"
        viewBox="-11.5 -10.23174 23 20.46348"
      >
        <circle cx="0" cy="0" r="2.05" fill="#38bdf8"/>
        <g stroke="#38bdf8" strokeWidth="1.2" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
      <span className="font-semibold text-[13px] sm:text-sm tracking-widest uppercase text-neutral-200 group-hover:text-white transition-colors">
        React.js
      </span>
    </div>
  ),
  typescript: () => (
    <div className="flex items-center gap-3 whitespace-nowrap select-none">
      <div className="w-5 h-5 rounded-[4px] bg-[#3178C6] flex items-center justify-center text-[10px] font-black text-white shrink-0 shadow-sm">
        TS
      </div>
      <span className="font-semibold text-[13px] sm:text-sm tracking-widest uppercase text-neutral-200 group-hover:text-white transition-colors">
        TypeScript
      </span>
    </div>
  ),
  framer: () => (
    <div className="flex items-center gap-3 whitespace-nowrap select-none">
      <svg
        viewBox="0 0 14 21"
        className="h-5 w-auto fill-white shrink-0"
      >
        <path d="M0 0h14v7H7zm0 7h7l7 7H7v7l-7-7z" fill="currentColor"></path>
      </svg>
      <span className="font-semibold text-[13px] sm:text-sm tracking-widest uppercase text-neutral-200 group-hover:text-white transition-colors">
        Framer Motion
      </span>
    </div>
  ),
  laravel: () => (
    <div className="flex items-center gap-3 whitespace-nowrap select-none">
      <svg className="h-5 w-5 text-[#FF2D20] shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.2 5.1L12.7.2c-.4-.2-.9-.2-1.3 0L2.8 5.1c-.4.2-.7.7-.7 1.2v9.8c0 .5.3.9.7 1.2l8.5 4.9c.4.2.9.2 1.3 0l8.5-4.9c.4-.2.7-.7.7-1.2V6.3c.1-.5-.2-1-.6-1.2zM12 2.2l6.9 4-6.9 4-6.9-4 6.9-4zm-8 6.1l7 4.1v7.9l-7-4.1V8.3zm9 12v-7.9l7-4.1v7.9l-7 4.1z"/>
      </svg>
      <span className="font-semibold text-[13px] sm:text-sm tracking-widest uppercase text-neutral-200 group-hover:text-white transition-colors">
        Laravel
      </span>
    </div>
  ),
  threejs: () => (
    <div className="flex items-center gap-3 whitespace-nowrap select-none">
      <svg className="h-5 w-5 fill-white shrink-0" viewBox="0 0 24 24">
        <path d="M12 1.5l10.5 6v12L12 25.5 1.5 19.5v-12L12 1.5zm0 2.3L3.8 8.4l8.2 4.7 8.2-4.7L12 3.8zm-8.5 6.3v8.5l7.5 4.3v-8.5l-7.5-4.3zm17 0l-7.5 4.3v8.5l7.5-4.3v-8.5z"/>
      </svg>
      <span className="font-semibold text-[13px] sm:text-sm tracking-widest uppercase text-neutral-200 group-hover:text-white transition-colors">
        Three.js
      </span>
    </div>
  ),
  gsap: () => (
    <div className="flex items-center gap-3 whitespace-nowrap select-none">
      <div className="w-5 h-5 rounded-full bg-[#0ae448] flex items-center justify-center text-[10px] font-black text-black shrink-0 shadow-sm">
        G
      </div>
      <span className="font-semibold text-[13px] sm:text-sm tracking-widest uppercase text-neutral-200 group-hover:text-white transition-colors">
        GSAP
      </span>
    </div>
  ),
  git: () => (
    <div className="flex items-center gap-3 whitespace-nowrap select-none">
      <svg className="h-5 w-5 fill-[#F05032] shrink-0" viewBox="0 0 24 24">
        <path d="M2.597 10.963l8.44-8.44a1.802 1.802 0 012.548 0l8.44 8.44a1.802 1.802 0 010 2.548l-8.44 8.44a1.802 1.802 0 01-2.548 0l-8.44-8.44a1.802 1.802 0 010-2.548zm7.397 5.177a1.644 1.644 0 102.325 2.325 1.644 1.644 0 00-2.325-2.325zm4.847-4.847a1.644 1.644 0 102.325 2.325 1.644 1.644 0 00-2.325-2.325zm-3.684-2.522v3.74a2.983 2.983 0 00-1.163.638l-2.072-2.072a1.644 1.644 0 10-1.163 1.163l2.062 2.062a2.986 2.986 0 001.173 1.812v.03a2.987 2.987 0 102.325-2.925v-4.448a1.644 1.644 0 10-1.162 0z"/>
      </svg>
      <span className="font-semibold text-[13px] sm:text-sm tracking-widest uppercase text-neutral-200 group-hover:text-white transition-colors">
        Git
      </span>
    </div>
  ),
  aws: () => (
    <div className="flex items-center gap-3 whitespace-nowrap select-none">
      <svg
        className="h-5 w-auto shrink-0"
        viewBox="-45.101 -44.95 390.872 269.7"
      >
        <g transform="translate(-1.668 -1.1)">
          <path
            d="M86.4 66.4c0 3.7.4 6.7 1.1 8.9.8 2.2 1.8 4.6 3.2 7.2.5.8.7 1.6.7 2.3 0 1-.6 2-1.9 3L83.2 92c-.9.6-1.8.9-2.6.9-1 0-2-.5-3-1.4-1.4-1.5-2.6-3.1-3.6-4.7-1-1.7-2-3.6-3.1-5.9Q59.2 94.7 41.5 94.7c-8.4 0-15.1-2.4-20-7.2s-7.4-11.2-7.4-19.2c0-8.5 3-15.4 9.1-20.6s14.2-7.8 24.5-7.8c3.4 0 6.9.3 10.6.8s7.5 1.3 11.5 2.2v-7.3c0-7.6-1.6-12.9-4.7-16-3.2-3.1-8.6-4.6-16.3-4.6-3.5 0-7.1.4-10.8 1.3s-7.3 2-10.8 3.4c-1.6.7-2.8 1.1-3.5 1.3s-1.2.3-1.6.3c-1.4 0-2.1-1-2.1-3.1v-4.9c0-1.6.2-2.8.7-3.5s1.4-1.4 2.8-2.1Q28.75 5 36.1 3.2C41 1.9 46.2 1.3 51.7 1.3c11.9 0 20.6 2.7 26.2 8.1 5.5 5.4 8.3 13.6 8.3 24.6v32.4zM45.8 81.6c3.3 0 6.7-.6 10.3-1.8s6.8-3.4 9.5-6.4c1.6-1.9 2.8-4 3.4-6.4s1-5.3 1-8.7v-4.2c-2.9-.7-6-1.3-9.2-1.7s-6.3-.6-9.4-.6c-6.7 0-11.6 1.3-14.9 4s-4.9 6.5-4.9 11.5c0 4.7 1.2 8.2 3.7 10.6 2.4 2.5 5.9 3.7 10.5 3.7m80.3 10.8c-1.8 0-3-.3-3.8-1-.8-.6-1.5-2-2.1-3.9L96.7 10.2c-.6-2-.9-3.3-.9-4 0-1.6.8-2.5 2.4-2.5h9.8c1.9 0 3.2.3 3.9 1 .8.6 1.4 2 2 3.9l16.8 66.2 15.6-66.2c.5-2 1.1-3.3 1.9-3.9s2.2-1 4-1h8c1.9 0 3.2.3 4 1 .8.6 1.5 2 1.9 3.9l15.8 67 17.3-67c.6-2 1.3-3.3 2-3.9.8-.6 2.1-1 3.9-1h9.3c1.6 0 2.5.8 2.5 2.5 0 .5-.1 1-.2 1.6s-.3 1.4-.7 2.5l-24.1 77.3q-.9 3-2.1 3.9c-.8.6-2.1 1-3.8 1h-8.6c-1.9 0-3.2-.3-4-1s-1.5-2-1.9-4L156 23l-15.4 64.4c-.5 2-1.1 3.3-1.9 4s-2.2 1-4 1zm128.5 2.7c-5.2 0-10.4-.6-15.4-1.8s-8.9-2.5-11.5-4c-1.6-.9-2.7-1.9-3.1-2.8s-.6-1.9-.6-2.8v-5.1c0-2.1.8-3.1 2.3-3.1q.9 0 1.8.3c.6.2 1.5.6 2.5 1 3.4 1.5 7.1 2.7 11 3.5 4 .8 7.9 1.2 11.9 1.2 6.3 0 11.2-1.1 14.6-3.3s5.2-5.4 5.2-9.5c0-2.8-.9-5.1-2.7-7s-5.2-3.6-10.1-5.2L246 52c-7.3-2.3-12.7-5.7-16-10.2-3.3-4.4-5-9.3-5-14.5q0-6.3 2.7-11.1c1.8-3.2 4.2-6 7.2-8.2 3-2.3 6.4-4 10.4-5.2s8.2-1.7 12.6-1.7c2.2 0 4.5.1 6.7.4 2.3.3 4.4.7 6.5 1.1 2 .5 3.9 1 5.7 1.6q2.7.9 4.2 1.8c1.4.8 2.4 1.6 3 2.5q.9 1.2.9 3.3v4.7c0 2.1-.8 3.2-2.3 3.2-.8 0-2.1-.4-3.8-1.2q-8.55-3.9-19.2-3.9c-5.7 0-10.2.9-13.3 2.8s-4.7 4.8-4.7 8.9c0 2.8 1 5.2 3 7.1s5.7 3.8 11 5.5l14.2 4.5c7.2 2.3 12.4 5.5 15.5 9.6s4.6 8.8 4.6 14c0 4.3-.9 8.2-2.6 11.6-1.8 3.4-4.2 6.4-7.3 8.8-3.1 2.5-6.8 4.3-11.1 5.6-4.5 1.4-9.2 2.1-14.3 2.1"
            className="fill-white"
          />
          <g>
            <path
              d="M273.5 143.7c-32.9 24.3-80.7 37.2-121.8 37.2-57.6 0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6 3.4-4.4 42.4 24.6 94.7 39.5 148.8 39.5 36.5 0 76.6-7.6 113.5-23.2 5.5-2.5 10.2 3.6 4.8 7.6"
              className="fill-[#FF9900]"
            />
            <path
              d="M287.2 128.1c-4.2-5.4-27.8-2.6-38.5-1.3-3.2.4-3.7-2.4-.8-4.5 18.8-13.2 49.7-9.4 53.3-5 3.6 4.5-1 35.4-18.6 50.2-2.7 2.3-5.3 1.1-4.1-1.9 4-9.9 12.9-32.2 8.7-37.5"
              className="fill-[#FF9900]"
            />
          </g>
        </g>
      </svg>
      <span className="font-semibold text-[13px] sm:text-sm tracking-widest uppercase text-neutral-200 group-hover:text-white transition-colors">
        AWS
      </span>
    </div>
  ),
}

export function MarqueeDemo() {
  const items = [
    { key: "tailwind", Component: Logos.tailwindcss },
    { key: "react", Component: Logos.react },
    { key: "typescript", Component: Logos.typescript },
    { key: "framer", Component: Logos.framer },
    { key: "laravel", Component: Logos.laravel },
    { key: "threejs", Component: Logos.threejs },
    { key: "gsap", Component: Logos.gsap },
    { key: "git", Component: Logos.git },
    { key: "aws", Component: Logos.aws },
  ]

  return (
    <Marquee speed={35} pauseOnHover={true} gapClassName="gap-4 sm:gap-6 pr-4 sm:pr-6">
      {items.map(({ key, Component }) => (
        <div key={key} className="group shrink-0 flex items-center gap-4 sm:gap-6">
          <Component />
          <span
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]/90 shadow-[0_0_6px_rgba(229,169,60,0.7)] shrink-0"
          />
        </div>
      ))}
    </Marquee>
  )
}

export default MarqueeDemo
