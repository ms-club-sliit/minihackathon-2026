"use client";

import Header from "@/components/Header/index";
import Image from "next/image";
import { HiChevronDoubleDown } from "react-icons/hi";

export default function Title() {
  const glassPath = `
    M 35 150
    Q 35 120 65 120
    H 180
    Q 210 120 210 90
    V 80
    Q 210 50 240 50
    H 935
    Q 965 50 965 80
    V 600
    Q 965 630 935 630
    H 65
    Q 35 630 35 600
    Z
  `.trim();

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">

      {/* ================= HERO WRAPPER CARD ================= */}
      <section className="relative w-full md:w-[95vw] min-h-[90vh] md:h-[95vh] filter drop-shadow-[0_25px_45px_rgba(100,125,175,0.16)] mx-auto">

        {/* Main Custom Shaped Glass Container */}
        <div className="relative w-full h-full overflow-hidden rounded-[30px] md:rounded-none border border-white/20 md:border-none bg-white/10 md:bg-transparent backdrop-blur-3xl md:backdrop-blur-none p-2 md:p-0">

          {/* Unified Fluid SVG Outer Border & Glass Background Mask (Visible only on Desktop) */}
          <svg
            className="absolute inset-0 w-full h-full z-0 hidden md:block"
            viewBox="0 0 1000 700"
            preserveAspectRatio="none"
          >
            <defs>
              <clipPath id="glass-shape">
                <path d={glassPath} />
              </clipPath>

              <filter id="glass-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="5" dy="10" stdDeviation="6" floodColor="#000000" floodOpacity="0.9" />
                {/* Layer 2: Sharp core shadow for crisp depth */}
                <feDropShadow dx="2" dy="4" stdDeviation="2" floodColor="#000000" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* Glass Backdrop Fill */}
            <path
              d={glassPath}
              fill="rgba(255, 255, 255, 0.1)"
              className="backdrop-blur-3xl"
            />

            {/* Precise Border Stroke */}
            <path
              d={glassPath}
              fill="none"
              stroke="rgba(157, 237, 248, 0.6)"
              strokeWidth="1.5"
              filter="url(#glass-shadow)"
            />
          </svg>

          {/* ================= PORTRAIT + VERTICAL BRANDING (Right side, inside glass) ================= */}
          <div className="pointer-events-none absolute inset-0 z-[5] hidden md:block" aria-hidden="true">
            {/* Portrait — sits against the bottom edge, leaving room for the logo on its right */}
            <div className="absolute bottom-[10.5%] right-[14%] z-[2] flex h-[76%] items-end lg:right-[16%]">
              <Image
                src="/images/2026-images/tesla.png"
                alt="Nikola Tesla portrait"
                width={1100}
                height={1366}
                priority
                className="h-full w-auto max-w-none object-contain object-bottom drop-shadow-2xl"
              />
            </div>

            {/* Vertical brand logo strip — far right edge, above the portrait */}
            <div className="absolute right-[2%] top-[44%] z-[1] -translate-y-1/2 rotate-90 origin-center">
              <Image
                src="/images/2026-images/logo-main-2026.png"
                alt="Mini Hackathon 26"
                width={260}
                height={70}
                className="h-auto w-[280px] object-contain lg:w-[340px]"
              />
            </div>
          </div>

          {/* ================= CONTENT LAYER ================= */}
          <div className="md:w-[80%] md:min-h-full mx-0 relative z-10">

            {/* Integrated Top Navigation Menu */}
            <div className="relative w-full md:left-[8%] md:mt-[5.5vh]">
              <Header active="rules" />
            </div>

            {/* ================= HERO CONTENT LAYER ================= */}
            <div className="md:absolute flex items-center w-full md:min-h-[55vh] min-h-[60vh]">
              <div className="relative flex w-full flex-col items-start justify-center px-6 md:pl-[10%] md:pr-4 font-sans text-left">

                {/* OFFICIAL */}
                <h2 className="text-6xl sm:text-7xl md:text-[5rem] xl:text-[6.6rem] font-bold leading-none tracking-[-0.03em] text-[#1a1a1a] font-slogan">
                  OFFICIAL
                </h2>

                {/* RULES AND REGULATIONS. */}
                <h1 className="mt-1 md:mt-2 bg-gradient-to-r from-[#2E47FF] to-[#5b7bff] bg-clip-text text-transparent text-7xl sm:text-8xl md:text-[6.6rem] xl:text-[8.8rem] font-bold leading-[0.82] tracking-[-0.04em] font-slogan">
                  RULES AND
                  <span className="block">REGULATIONS.</span>
                </h1>

                {/* Description */}
                <p className="mt-6 md:mt-8 max-w-lg text-base sm:text-lg font-medium leading-7 text-gray-700">
                  Your next big idea starts here!
                  <br />
                  Join the SLIIT Inter-University Ideation and inspire the future
                  through innovation.
                </p>
              </div>
            </div>

          </div>

          {/* ================ Scroll For More (centered) ================ */}
          <div className="flex md:absolute md:bottom-[2%] md:left-0 md:right-0 justify-center w-full px-4 mt-6 md:mt-0 z-10">
            <button className="group flex h-12 md:h-14 w-full max-w-[320px] items-center justify-center gap-3 rounded-full bg-white/20 shadow-[0_0_40px_rgba(0,0,0,0.15)] hover:bg-white/40 border border-white/40 backdrop-blur-2xl transition-all duration-300">
              <span className="text-xs md:text-sm font-medium text-gray-800">Scroll For More.</span>
              <HiChevronDoubleDown className="animate-bounce text-base md:text-lg" />
            </button>
          </div>


        </div>
      </section>
    </main>
  );
}
