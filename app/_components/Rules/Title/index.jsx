"use client";

import GlassHeroShell from "@/components/GlassHeroShell";
import Image from "next/image";
import { HiChevronDoubleDown } from "react-icons/hi";

import { useState, useEffect } from "react";

export default function Title() {
  const defaultPath = `
    M 35 165
    Q 35 135 65 135
    H 180
    Q 210 135 210 105
    V 95
    Q 210 65 240 57
    H 935
    Q 965 57 965 87
    V 670
    Q 965 700 935 700
    H 65
    Q 35 700 35 670
    Z
  `.trim();

  const mobilePath = "M 35 78 Q 35 50 65 50 H 130 Q 163 51 179 50 V 50 Q 210 50 240 50 H 935 Q 965 57 965 87 V 670 Q 965 700 935 700 H 65 Q 35 700 35 670 Z";

  const [glassPath, setGlassPath] = useState(defaultPath);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setGlassPath(mobilePath);
      } else {
        const logo = document.getElementById("header-logo");
        const container = document.getElementById("glass-container");
        if (logo && container) {
          const containerRect = container.getBoundingClientRect();
          const logoRect = logo.getBoundingClientRect();
          
          if (containerRect.height > 0 && containerRect.width > 0) {
            const scaleY = 700 / containerRect.height;
            const scaleX = 1000 / containerRect.width;

            const logoBottomDOM = logoRect.bottom - containerRect.top;
            const logoRightDOM = logoRect.right - containerRect.left;

            const paddingYDOM = 50;
            const paddingXDOM = 30;

            let yMax = (logoBottomDOM + paddingYDOM) * scaleY;
            let notchX = (logoRightDOM + paddingXDOM) * scaleX;

            const yTop = 57; 
            
            if (yMax < yTop + 40) yMax = yTop + 40;

            const r = 30; 
            const yMid = yMax - r;
            const yHigh = yMid - r;

            const dynamicPath = `
              M 35 ${yMax}
              Q 35 ${yMid} 65 ${yMid}
              H ${notchX - r}
              Q ${notchX} ${yMid} ${notchX} ${yHigh}
              V ${yTop + r}
              Q ${notchX} ${yTop} ${notchX + r} ${yTop}
              H 935
              Q 965 57 965 87
              V 670
              Q 965 700 935 700
              H 65
              Q 35 700 35 670
              Z
            `.trim();
            setGlassPath(dynamicPath);
            return;
          }
        }
        setGlassPath(defaultPath);
      }
    };
    
    handleResize(); 
    window.addEventListener("resize", handleResize);
    
    const timer = setTimeout(handleResize, 150);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  const portraitClip = {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 18% 100%, 0 84%)",
  };

  const scrollToRules = () => {
    document.getElementById("rules-content")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="relative overflow-visible bg-transparent md:pb-0 md:pt-0 lg:overflow-hidden min-h-[60px] shrink-0 lg:min-h-[110px]">
      <GlassHeroShell
        glassPath={glassPath}
        active="rules"
      >
        <div className="relative z-10 flex min-h-full w-full flex-col px-2 pb-3 pt-2 sm:px-4 sm:pb-5 lg:flex-1 lg:px-[6.6%] lg:pb-[7%] lg:pt-[4.8%]">
          <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] gap-3 pt-5 sm:gap-4 sm:pt-7 lg:grid-cols-[minmax(0,56%)_minmax(300px,44%)] lg:grid-rows-1 lg:items-end lg:gap-x-4 lg:gap-y-3 lg:pt-0">
              <div className="relative z-10 flex min-w-0 max-w-full flex-col items-start justify-center self-center px-2 text-left sm:px-4 lg:max-w-none lg:px-0 lg:pr-8">
                <p className="font-slogan text-[clamp(2.15rem,10vw,3rem)] font-bold leading-none tracking-normal text-[#1a1a1a] lg:text-[clamp(2.9rem,5.2vw,6.5rem)]">
                  OFFICIAL
                </p>

                <h1 className="mt-2 max-w-full font-slogan text-[clamp(1.72rem,8.6vw,2.5rem)] font-bold leading-[0.95] tracking-normal text-[#2E47FF] lg:text-[clamp(2.5rem,5.4vw,6.75rem)]">
                  <span className="block whitespace-nowrap">RULES AND</span>
                  <span className="block whitespace-nowrap">REGULATIONS.</span>
                </h1>

                <p className="mt-4 max-w-[36rem] text-sm font-medium leading-5 text-gray-700 sm:text-base sm:leading-6 lg:mt-6 lg:text-lg lg:leading-7">
                  Your next big idea starts here! Join the SLIIT Inter-University
                  Ideation and inspire the future through innovation.
                </p>
              </div>

              <div className="pointer-events-none relative z-0 mx-auto h-full min-h-0 w-full max-w-[500px] self-end lg:z-10 lg:mx-0 lg:max-w-none" aria-hidden="true">
                <div
                  className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center overflow-hidden lg:justify-end"
                  style={portraitClip}
                >
                  <Image
                    src="/images/2026-images/tesla.png"
                    alt="Nikola Tesla portrait"
                    width={1100}
                    height={1366}
                    priority
                    className="h-full w-auto max-w-none object-contain object-bottom drop-shadow-2xl lg:mr-[10%]"
                  />
                </div>

                <div className="absolute right-[-3%] top-1/2 hidden origin-center -translate-y-1/2 translate-x-[34%] rotate-90 lg:block">
                  <Image
                    src="/images/2026-images/logo-main-2026.png"
                    alt="Mini Hackathon 26"
                    width={260}
                    height={70}
                    className="h-auto w-[250px] object-contain lg:w-[310px]"
                  />
                </div>
              </div>
          </div>
        </div>
      </GlassHeroShell>

      <div className="relative z-0 mx-auto w-full md:w-[95vw]">
        <div className="flex justify-center px-4 pb-2 pt-5 sm:pt-6 lg:pt-5">
          <button
            type="button"
            onClick={scrollToRules}
            className="group flex h-12 w-full max-w-[260px] items-center justify-center gap-3 rounded-full border border-white/60 bg-white/30 shadow-[0_12px_30px_rgba(15,23,42,0.15)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E47FF] focus-visible:ring-offset-2 sm:h-14 sm:max-w-[320px] lg:h-16 lg:max-w-[360px]"
          >
            <span className="text-sm font-semibold text-gray-900 sm:text-base">Scroll For More.</span>
            <HiChevronDoubleDown className="text-lg transition-transform group-hover:translate-y-0.5 sm:text-xl" />
          </button>
        </div>
      </div>
    </main>
  );
}
