import * as React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  pauseOnHover?: boolean
  direction?: "left" | "right"
  speed?: number
  gapClassName?: string
}

export function Marquee({
  children,
  pauseOnHover = true,
  direction = "left",
  speed = 35,
  className,
  gapClassName = "gap-14 sm:gap-20 pr-14 sm:pr-20",
  ...props
}: MarqueeProps) {
  return (
    <div 
      className={cn(
        "w-full overflow-hidden z-10",
        className
      )} 
      {...props}
    >
      <div className="relative flex max-w-full overflow-hidden py-3 sm:py-4">
        <div 
          className={cn(
            "flex w-max shrink-0 items-center animate-marquee",
            pauseOnHover && "hover:[animation-play-state:paused]",
            direction === "right" && "animate-marquee-reverse"
          )}
          style={{ "--duration": `${speed}s` } as React.CSSProperties}
        >
          <div className={cn("flex items-center shrink-0", gapClassName)}>
            {children}
          </div>
          <div className={cn("flex items-center shrink-0", gapClassName)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Marquee
