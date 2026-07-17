"use client";

import { useId } from "react";
import HeroHeader from "@/components/HeroHeader";

export default function GlassHeroShell({
  glassPath,
  active = "home",
  children,
  containerClassName = "min-h-[90vh] filter drop-shadow-[0_25px_45px_rgba(100,125,175,0.16)] md:h-[95vh] md:w-[95vw]",
  cardClassName = "h-full rounded-[30px] border border-white/20 bg-white/10 p-2 backdrop-blur-3xl md:rounded-none md:border-none md:bg-transparent md:p-0 md:backdrop-blur-none",
  svgClassName = "absolute inset-0 z-0 hidden h-full w-full md:block",
  contentWrapperClassName = "mx-0 md:min-h-full md:w-[80%]",
  spacerClassName = "h-[60px] shrink-0 md:h-[calc(5.5vh+110px)]",
}) {
  const idPrefix = useId().replace(/:/g, "");
  const clipPathId = `glass-shape-${idPrefix}`;
  const shadowFilterId = `glass-shadow-${idPrefix}`;

  return (
    <div className={`relative mx-auto w-full ${containerClassName}`}>
      <div className={`relative h-full w-full overflow-hidden ${cardClassName}`}>
        <svg
          className={svgClassName}
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id={clipPathId}>
              <path d={glassPath} />
            </clipPath>
            <filter id={shadowFilterId} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="5" dy="10" stdDeviation="6" floodColor="#000000" floodOpacity="0.9" />
              <feDropShadow dx="2" dy="4" stdDeviation="2" floodColor="#000000" floodOpacity="0.5" />
            </filter>
          </defs>

          <path d={glassPath} fill="rgba(255, 255, 255, 0.1)" className="backdrop-blur-3xl" clipPath={`url(#${clipPathId})`} />
          <path
            d={glassPath}
            fill="none"
            stroke="rgba(157, 237, 248, 0.6)"
            strokeWidth="1.5"
            filter={`url(#${shadowFilterId})`}
          />
        </svg>

        <HeroHeader active={active} />

        <div className={contentWrapperClassName}>
          <div className={spacerClassName} aria-hidden="true" />
          {children}
        </div>
      </div>
    </div>
  );
}
