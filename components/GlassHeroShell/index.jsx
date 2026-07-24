"use client";

import { useId } from "react";
import HeroHeader from "@/components/HeroHeader";
import Header from "@/components/Header";

export default function GlassHeroShell({
  glassPath,
  active = "home",
  children,
  containerClassName = "h-full filter drop-shadow-[0_25px_45px_rgba(100,125,175,0.16)] md:w-[95vw]",
  cardClassName = "h-full rounded-[30px] border border-white/20 bg-white/10 p-2 backdrop-blur-3xl md:rounded-none md:border-none md:bg-transparent md:p-0 md:backdrop-blur-none",
  svgClassName = "absolute inset-0 z-0 hidden h-full w-full md:block",
  contentWrapperClassName = "h-full flex flex-col items-center w-full mx-auto px-5 sm:px-10 md:px-12 lg:px-[5vw]",
  viewBox = "0 0 1000 750",
}) {
  const idPrefix = useId().replace(/:/g, "");
  const clipPathId = `glass-shape-${idPrefix}`;
  const shadowFilterId = `glass-shadow-${idPrefix}`;

  return (
    <div className={`relative mx-auto w-full ${containerClassName}`}>
      <div id="glass-container" className={`relative h-full w-full overflow-visible lg:overflow-hidden ${cardClassName}`}>
        <svg
          className={svgClassName}
          viewBox={viewBox}
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id={clipPathId}>
              <path d={glassPath} className="transition-all duration-500 ease-in-out" />
            </clipPath>
            <filter id={shadowFilterId} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="5" dy="10" stdDeviation="6" floodColor="#000000" floodOpacity="0.9" />
              <feDropShadow dx="2" dy="4" stdDeviation="2" floodColor="#000000" floodOpacity="0.5" />
            </filter>
          </defs>

          <path d={glassPath} fill="rgba(255, 255, 255, 0.1)" className="backdrop-blur-3xl transition-all duration-500 ease-in-out" clipPath={`url(#${clipPathId})`} />
          <path
            d={glassPath}
            fill="none"
            stroke="rgba(157, 237, 248, 0.6)"
            strokeWidth="1.5"
            filter={`url(#${shadowFilterId})`}
            className="transition-all duration-500 ease-in-out"
          />
        </svg>

        <div className={contentWrapperClassName}>
          <Header active={active} className="pt-4 md:pt-16 lg:pt-10"/>
          {children}
        </div>
      </div>
    </div>
  );
}
