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

  const portraitClip = {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 18% 100%, 0 84%)",
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent px-2 py-3 sm:px-4 md:px-0 md:py-4">
      <section className="relative mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-[1600px] filter drop-shadow-[0_25px_45px_rgba(100,125,175,0.16)] md:h-[95vh] md:min-h-[680px] md:w-[95vw] md:max-h-[940px]">
        <div className="relative flex w-full flex-col overflow-hidden rounded-[30px] border border-white/20 bg-white/10 p-2 backdrop-blur-3xl md:rounded-none md:border-none md:bg-transparent md:p-0 md:backdrop-blur-none">
          <svg
            className="absolute inset-0 z-0 hidden h-full w-full md:block"
            viewBox="0 0 1000 700"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="rules-glass-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="5" dy="10" stdDeviation="6" floodColor="#000000" floodOpacity="0.9" />
                <feDropShadow dx="2" dy="4" stdDeviation="2" floodColor="#000000" floodOpacity="0.5" />
              </filter>
            </defs>

            <path d={glassPath} fill="rgba(255, 255, 255, 0.1)" />
            <path
              d={glassPath}
              fill="none"
              stroke="rgba(157, 237, 248, 0.6)"
              strokeWidth="1.5"
              filter="url(#rules-glass-shadow)"
            />
          </svg>

          <div className="relative z-10 flex min-h-full w-full flex-col px-2 pb-6 pt-2 sm:px-4 sm:pb-8 md:flex-1 md:px-[5.6%] md:pb-[5.5%] md:pt-[4.8%] lg:px-[6.6%]">
            <div className="relative z-50 w-full md:max-w-[92%] lg:max-w-[96%]">
              <Header active="rules" />
            </div>

            <div className="grid items-end gap-5 py-7 sm:gap-6 sm:py-10 md:flex-1 md:grid-cols-[minmax(0,58%)_minmax(220px,42%)] md:gap-x-4 md:gap-y-3 md:py-0 lg:grid-cols-[minmax(0,56%)_minmax(300px,44%)]">
              <div className="relative z-10 flex min-w-0 max-w-[calc(100vw-3rem)] flex-col items-start justify-center self-center px-2 pr-0 text-left sm:max-w-full sm:px-4 md:max-w-none md:px-0 md:pr-4 lg:pr-8">
                <p className="font-slogan text-[clamp(2.25rem,9.5vw,3rem)] font-bold leading-none tracking-normal text-[#1a1a1a] md:text-[clamp(2.9rem,5.2vw,6.5rem)]">
                  OFFICIAL
                </p>

                <h1 className="mt-2 max-w-full font-slogan text-[clamp(1.8rem,8.2vw,2.55rem)] font-bold leading-[0.95] tracking-normal text-[#2E47FF] md:text-[clamp(2.5rem,5.4vw,6.75rem)]">
                  <span className="block whitespace-nowrap">RULES AND</span>
                  <span className="block whitespace-nowrap">REGULATIONS.</span>
                </h1>

                <p className="mt-5 max-w-[calc(100vw-4rem)] text-sm font-medium leading-6 text-gray-700 sm:max-w-[36rem] sm:text-base md:mt-6 md:text-base md:leading-6 lg:text-lg lg:leading-7">
                  Your next big idea starts here! Join the SLIIT Inter-University
                  Ideation and inspire the future through innovation.
                </p>
              </div>

              <div className="pointer-events-none relative z-0 mx-auto h-[260px] w-full max-w-[500px] self-end sm:h-[360px] md:z-10 md:mx-0 md:h-full md:max-w-none" aria-hidden="true">
                <div
                  className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center overflow-hidden md:justify-end"
                  style={portraitClip}
                >
                  <Image
                    src="/images/2026-images/tesla.png"
                    alt="Nikola Tesla portrait"
                    width={1100}
                    height={1366}
                    priority
                    className="h-full w-auto max-w-none object-contain object-bottom drop-shadow-2xl md:h-[78%] lg:h-[86%] xl:h-[90%] 2xl:h-[94%]"
                  />
                </div>

                <div className="absolute right-0 top-1/2 hidden origin-center -translate-y-1/2 translate-x-[34%] rotate-90 md:block">
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

          <div className="absolute bottom-[1.6%] left-0 right-0 z-20 flex justify-center px-4">
            <button className="group flex h-12 w-full max-w-[280px] items-center justify-center gap-3 rounded-full border border-white/50 bg-white/30 shadow-[0_16px_38px_rgba(15,23,42,0.16)] backdrop-blur-2xl transition-all duration-300 hover:bg-white/45 md:h-14 md:max-w-[360px]">
              <span className="text-sm font-semibold text-gray-800 md:text-base">Scroll For More.</span>
              <HiChevronDoubleDown className="animate-bounce text-lg md:text-xl" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
