"use client";

import GlassHeroShell from "@/components/GlassHeroShell";
import Image from "next/image";

export default function RegisterHero() {
  const glassPath = `
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

  return (
    <main className="relative overflow-visible bg-transparent px-3 pb-3 pt-3 sm:px-4 md:px-0 md:pb-0 md:pt-0 lg:overflow-hidden">
      <GlassHeroShell
        glassPath={glassPath}
        active="register"
        containerClassName="z-20 min-h-0 filter-none drop-shadow-none md:h-auto md:w-[95vw]"
        cardClassName="flex h-[650px] flex-col overflow-visible rounded-[26px] border border-white/30 bg-white/10 p-2 shadow-[0_22px_50px_rgba(70,95,145,0.18)] backdrop-blur-3xl sm:h-[720px] sm:rounded-[30px] md:h-[720px] lg:h-auto lg:min-h-[520px] lg:aspect-[2/1] lg:max-h-[650px] lg:overflow-hidden lg:rounded-none lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none lg:filter lg:drop-shadow-[0_25px_45px_rgba(100,125,175,0.16)]"
        svgClassName="absolute inset-0 z-0 hidden h-full w-full lg:block"
        contentWrapperClassName="mx-0 min-h-full w-full"
        spacerClassName="h-[60px] shrink-0 lg:h-[110px]"
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