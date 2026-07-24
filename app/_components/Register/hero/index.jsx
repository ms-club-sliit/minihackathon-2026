"use client";

import GlassHeroShell from "@/components/GlassHeroShell";
import Image from "next/image";

import { useState, useEffect } from "react";

export default function RegisterHero() {
  const defaultPath = `
    M 35 202
    Q 35 172 65 172
    H 165
    Q 195 172 195 87
    V 87
    Q 195 57 225 57
    H 935
    Q 965 57 965 87
    V 670
    Q 965 700 935 700
    H 65
    Q 35 700 35 670
    Z
  `.trim();

  const mobilePath = "M 35 87 Q 35 57 65 57 H 935 Q 965 57 965 87 V 670 Q 965 700 935 700 H 65 Q 35 700 35 670 Z";

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
            
            // Critical fix: yMax must be >= yTop + 90 to prevent the two bezier curves (r=30) from crossing and breaking the path
            if (yMax < yTop + 90) yMax = yTop + 90;

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

  return (
    <main className="relative overflow-visible bg-transparent px-3 pt-3 sm:px-4 md:px-0 md:pt-0 lg:overflow-hidden lg:min-h-[110px] min-h-[60px] pb-20">
      <GlassHeroShell
        glassPath={glassPath}
        active="register"
      >
        <div className="relative z-10 flex min-h-full w-full flex-col items-center justify-center gap-4 px-4 pb-3 pt-2 text-center sm:gap-5 sm:px-6 lg:gap-6 lg:px-[6.6%] lg:pb-[7%] lg:pt-[4.8%]">
          <Image
            src="/images/2026-images/logo-main-2026.png"
            alt="Mini Hackathon 26"
            width={260}
            height={70}
            priority
            className="h-auto w-[220px] object-contain sm:w-[260px] lg:w-[340px]"
          />

          <h1 className="max-w-3xl font-slogan text-[clamp(2rem,8vw,3.2rem)] font-bold leading-none tracking-normal text-[#1a1a1a] lg:text-[clamp(2.8rem,5.2vw,5.5rem)]">
            Register <span className="text-[#2E47FF]">Your Team</span>
          </h1>

          <p className="max-w-xl text-sm font-medium leading-6 text-gray-700 sm:text-base lg:max-w-2xl lg:text-lg lg:leading-7">
            A great idea becomes a winning solution when minds come together.
          </p>
        </div>
      </GlassHeroShell>
    </main>
  );
}