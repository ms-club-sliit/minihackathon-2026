"use client";

import GlassHeroShell from "@/components/GlassHeroShell";

import InstagramIcon from '@iconify-react/selfhst/instagram';
import FacebookIcon from '@iconify-react/selfhst/facebook';
import YoutubeIcon from '@iconify-react/selfhst/youtube';
import GithubDarkIcon from '@iconify-react/selfhst/github-dark';
import LinkedinIcon from '@iconify-react/selfhst/linkedin';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HiArrowRight, HiChevronDoubleDown } from "react-icons/hi";

export default function Hero() {
  const defaultPath = `
    M 35 150
    Q 35 120 65 120
    H 180
    Q 210 120 210 90
    V 80
    Q 210 50 240 50
    H 935 
    Q 965 50 965 80 
    V 520
    Q 965 550 935 550
    H 715
    Q 685 550 685 580
    V 590
    Q 685 620 655 620
    H 345
    Q 315 620 315 590
    V 580
    Q 315 550 285 550
    H 65
    Q 35 550 35 520
    Z
  `.trim();

  const mobilePath = "M 35 78 Q 35 50 65 50 H 130 Q 163 51 179 50 V 50 Q 210 50 240 50 H 935 Q 965 50 965 80 V 520 Q 965 550 935 550 H 715 Q 685 550 685 580 V 590 Q 685 620 655 620 H 345 Q 315 620 315 590 V 580 Q 315 550 285 550 H 65 Q 35 550 35 520 Z";

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

            const yTop = 50; 
            
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
              Q 965 50 965 80 
              V 520
              Q 965 550 935 550
              H 715
              Q 685 550 685 580
              V 590
              Q 685 620 655 620
              H 345
              Q 315 620 315 590
              V 580
              Q 315 550 285 550
              H 65
              Q 35 550 35 520
              Z
            `.trim();
            setGlassPath(dynamicPath);
            return;
          }
        }
        setGlassPath(defaultPath);
      }
    };
    
    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    
    // Fallback: image might load later, affecting its height
    const timer = setTimeout(handleResize, 150);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="relative h-auto md:h-screen md:min-h-[43rem] overflow-hidden bg-transparent">
      <GlassHeroShell glassPath={glassPath}>
        {/* ================= HERO CONTENT LAYER ================= */}
        <div className="flex flex-col h-full w-full items-center justify-center pt-16 md:pt-0 pb-[4.5rem]">
              <div className="relative w-full h-full flex flex-col items-center justify-center font-sans md:pb-20">

                {/* Center Content Row (Hero Branding) */}
                <div className="flex flex-col items-center justify-center text-center">
                  {/* Core Co-Branding Logos */}
                  <div className="mb-6 md:mb-8 flex items-center justify-center gap-4 md:gap-6">
                    <Image
                      src="/images/logos/MSLogo.png"
                      alt="MS Club Logo"
                      width={90}
                      height={60}
                      className="h-12 sm:h-20 md:h-28 w-auto object-contain"
                    />
                    <span className="text-xl sm:text-2xl md:text-3xl font-light text-gray-400">✕</span>
                    <Image
                      src="/images/2026-images/logo-main-2026.png"
                      alt="Mini Hackathon 26 Logo"
                      width={280}
                      height={70}
                      className="h-16 sm:h-20 md:h-28 w-auto object-contain"
                    />
                  </div>

                  {/* Core Tagline Heading */}
                  <div className="relative flex h-12 sm:h-14 md:h-16 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[496px] md:mx-auto items-center justify-center mb-6 md:mb-[3vh]">
                    {/* Left blue accent */}
                    <div className="flex h-full left-0 top-0 bottom-0 z-0 relative">
                      <div className="w-px bg-[#2E47FF]" />
                      <div className="ml-0.5 md:ml-1 w-[3px] md:w-[5px] bg-[#2E47FF]" />
                      <div className="ml-0.5 md:ml-1 w-[6px] md:w-[10px] bg-[#2E47FF]" />
                      <div className="ml-0.5 md:ml-1 w-[9px] md:w-[15px] bg-[#2E47FF]" />
                      <div className="ml-0.5 md:ml-1 w-[12px] md:w-[20px] bg-[#2E47FF]" />
                      <div className="ml-0.5 md:ml-1 w-[120px] sm:w-[150px] md:w-[206px] bg-[#2E47FF]" />
                      <h2 className="absolute  top-1/2 -translate-y-1/2 right-0 text-3xl sm:text-2xl md:text-5xl leading-none tracking-[-0.05em] text-[#FFF8F8] font-slogan pr-3 md:pr-5">
                        Innovation
                      </h2>
                    </div>

                    {/* Text */}
                    <div className="flex left-[15vw] md:left-[4vw] md:inset-0 md:justify-center z-10 items-center h-full pl-3 md:pl-5">
                      <h2 className="text-3xl sm:text-2xl md:text-5xl leading-none tracking-[-0.05em] text-[#000000] font-slogan text-nowrap">
                        starts here.
                      </h2>
                    </div>
                  </div>

                  {/* Sub-Description Paragraph */}
                  <p className="max-w-[900px] text-base sm:text-lg md:text-2xl leading-relaxed text-gray-900 font-normal px-2">
                    Join the SLIIT Intra-university ideathon and showcase your creativity, innovation, and technical skills on a national stage.
                  </p>
                </div>
              </div>
          {/* ================ Bottom Controls Row ================ */}
          <div className="md:absolute md:bottom-8 md:left-0 w-full flex flex-col items-center gap-4 md:flex-row md:items-end md:gap-0 pt-7 md:pt-10 md:pb-10">
                <div className="hidden md:block w-[3.5%]" />
                
                {/* Left Tab Button - Scroll For More */}
                <div className="w-full md:w-[25%] flex justify-center px-4 md:px-0">
                  <button className="group flex h-12 md:h-14 w-full max-w-[320px] md:max-w-none items-center justify-center gap-3 rounded-full bg-white/20 shadow-[0_0_40px_rgba(0,0,0,0.15)] hover:bg-white/40 border border-white/40 transition-all duration-300">
                    <span className="text-xs md:text-sm font-medium text-gray-800">Scroll For More.</span>
                    <HiChevronDoubleDown className="animate-bounce text-base md:text-lg" />
                  </button>
                </div>

                <div className="hidden md:block w-[6%]" />

                {/* Center Tab Button - Primary CTA */}
                <div className="w-full md:w-[31%] flex justify-center px-4 md:px-0 mb-0 md:mb-5">
                  <Link href="/rules" className="group relative w-full max-w-[320px] md:max-w-none h-12 md:h-14 overflow-hidden rounded-full bg-gradient-to-r from-[#3552ff] to-[#4f71ff] shadow-[0_12px_30px_rgba(53,82,255,0.35)] hover:shadow-[0_16px_40px_rgba(53,82,255,0.45)] transition-all duration-300 transform hover:-translate-y-0.5">
                    <span className="absolute inset-y-0 -left-40 w-32 -skew-x-12 bg-white/20 transition-all duration-700 group-hover:left-[110%]" />
                    <span className="relative flex h-full items-center justify-center gap-3 text-sm md:text-lg font-semibold text-white">
                      Get Full Instructions
                      <HiArrowRight className="text-base md:text-xl transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>

                <div className="hidden md:block w-[6%]" />

                {/* Right Tab - Social Networking Panel */}
                <div className="w-full md:w-[25%] flex justify-center px-4 md:px-0">
                  <div className="flex flex-col items-center justify-center h-12 md:h-14 w-full max-w-[320px] md:max-w-none rounded-full bg-white/20 shadow-[0_0_40px_rgba(0,0,0,0.15)] border border-white/40">
                    <p className="text-[9px] md:text-[11px] font-bold tracking-wider text-gray-600 uppercase mb-1">
                      Follow Us On.
                    </p>
                    <div className="flex items-center gap-4 md:gap-5">
                      <a href="https://www.facebook.com/msclubsliit/" className="transition-transform duration-300 hover:scale-110 text-gray-700 hover:text-blue-600" target="_blank" rel="noopener noreferrer"><FacebookIcon height="1.3em" /></a>
                      <a href="https://www.instagram.com/msclub.sliit/" className="transition-transform duration-300 hover:scale-110 text-gray-700 hover:text-pink-600" target="_blank" rel="noopener noreferrer"><InstagramIcon height="1.3em" /></a>
                      <a href="https://www.youtube.com/@msclubofsliit/" className="transition-transform duration-300 hover:scale-110 text-gray-700 hover:text-red-600" target="_blank" rel="noopener noreferrer"><YoutubeIcon height="1.3em" /></a>
                      <a href="https://www.linkedin.com/company/msclubsliit/" className="transition-transform duration-300 hover:scale-110 text-gray-700 hover:text-blue-700" target="_blank" rel="noopener noreferrer"><LinkedinIcon height="1.3em" /></a>
                      <a href="https://github.com/ms-club-sliit/" className="transition-transform duration-300 hover:scale-110 text-gray-700 hover:text-black" target="_blank" rel="noopener noreferrer"><GithubDarkIcon height="1.3em" /></a>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:block w-[3.5%]" />
          </div>
        </div>

      </GlassHeroShell>
    </main>
  );
}
