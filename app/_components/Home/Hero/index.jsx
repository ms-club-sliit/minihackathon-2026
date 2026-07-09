import Header from "@/components/Header/index";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import Image from "next/image";
import { HiArrowRight, HiChevronDown } from "react-icons/hi";

export default function Hero() {
  const glassPath = `
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#EEF5FF] via-[#F4FAFF] to-[#F4FFF5] px-8 py-7">

      {/* ================= BACKGROUND BLOBS ================= */}
      <div className="absolute -left-36 bottom-[-140px] h-[520px] w-[520px] rounded-full bg-violet-600/75 blur-[170px]" />
      <div className="absolute -right-40 -top-32 h-[560px] w-[560px] rounded-full bg-emerald-500/70 blur-[180px]" />
      <div className="absolute left-[42%] top-[28%] h-[360px] w-[360px] rounded-full bg-sky-500/65 blur-[150px]" />
      <div className="absolute left-[12%] top-[18%] h-[250px] w-[250px] rounded-full bg-fuchsia-500/50 blur-[130px]" />
      <div className="absolute right-[14%] bottom-[8%] h-[260px] w-[260px] rounded-full bg-lime-400/50 blur-[130px]" />

      {/* ================= HERO WRAPPER CARD ================= */}
      <section className="relative w-[95vw] h-[95vh] filter drop-shadow-[0_25px_45px_rgba(100,125,175,0.16)] mx-auto">
        
        {/* Main Custom Shaped Glass Container */}
        <div className="relative w-full h-full overflow-hidden ">
          
          {/* Unified Fluid SVG Outer Border & Glass Background Mask */}
          <svg
            className="absolute inset-0 w-full h-full z-0"
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

          {/* ================= CONTENT LAYER ================= */}
          <div className="relative z-10 grid grid-rows-[auto_1fr_auto] min-h-[640px] p-4 font-sans">

              {/* Integrated Top Navigation Menu */}
              <div className="mr-4">
                <Header />
              </div>

            {/* Center Content Row (Hero Branding) */}
            <div className="flex flex-col items-center justify-center text-center px-8 my-auto">
              {/* Core Co-Branding Logos */}
              <div className="mb-8 flex items-center justify-center gap-6">
                <Image
                  src="/images/logos/MSLogo.png"
                  alt="MS Club Logo"
                  width={90}
                  height={60}
                  className="h-16 sm:h-20 w-auto object-contain"
                />
                <span className="text-3xl font-light text-gray-400">✕</span>
                <Image
                  src="/images/2026-images/logo-main-2026.png"
                  alt="Mini Hackathon 26 Logo"
                  width={280}
                  height={70}
                  className="h-20 sm:h-22 w-auto object-contain"
                />
              </div>

              {/* Core Tagline Heading */}
              <h2 className="mb-6 flex items-center justify-center gap-4 text-4xl sm:text-5xl font-light tracking-tight">
                <span className="bg-[#3153FF] px-6 py-2 font-medium text-white shadow-sm">
                  Innovation
                </span>
                <span className="text-gray-900 font-normal">
                  starts here.
                </span>
              </h2>

              {/* Sub-Description Paragraph */}
              <p className="max-w-[780px] text-xl sm:text-2xl leading-relaxed text-gray-700 font-light">
                Join the SLIIT Inter-university Ideation and showcase your creativity,
                innovation, and technical skills on a national stage.
              </p>
            </div>

            {/* Bottom Controls Row (Perfectly aligns elements directly into the SVG tabs) */}
            <div className="grid grid-cols-[240px_1fr_240px] items-end px-10 gap-4">
              
              {/* Left Tab Button - Scroll For More */}
              <button className="group flex h-14 items-center justify-center gap-3 rounded-full bg-white/20 hover:bg-white/40 border border-white/40 transition-all duration-300 shadow-sm ml-2 mb-1">
                <span className="text-sm font-medium text-gray-800">Scroll For More.</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <HiChevronDown className="animate-bounce text-lg" />
                </div>
              </button>

              {/* Center Tab Button - Primary CTA */}
              <div className="flex justify-center pb-1">
                <button className="group relative w-full max-w-[450px] h-14 overflow-hidden rounded-full bg-gradient-to-r from-[#3552ff] to-[#4f71ff] shadow-[0_12px_30px_rgba(53,82,255,0.35)] hover:shadow-[0_16px_40px_rgba(53,82,255,0.45)] transition-all duration-300 transform hover:-translate-y-0.5">
                  <span className="absolute inset-y-0 -left-40 w-32 -skew-x-12 bg-white/20 transition-all duration-700 group-hover:left-[110%]" />
                  <span className="relative flex items-center justify-center gap-3 text-lg font-semibold text-white">
                    Get Full Instructions
                    <HiArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </div>

              {/* Right Tab - Social Networking Panel */}
              <div className="flex flex-col items-center justify-center h-14 mr-2 mb-1">
                <p className="text-[11px] font-bold tracking-wider text-gray-600 uppercase mb-1">
                  Follow Us On.
                </p>
                <div className="flex items-center gap-3">
                  <a href="#" className="text-gray-700 hover:text-[#1877F2] transition-colors"><FaFacebookF size={15} /></a>
                  <a href="#" className="text-gray-700 hover:text-[#E4405F] transition-colors"><FaInstagram size={15} /></a>
                  <a href="#" className="text-gray-700 hover:text-[#FF0000] transition-colors"><FaYoutube size={15} /></a>
                  <a href="#" className="text-gray-700 hover:text-[#0A66C2] transition-colors"><FaLinkedinIn size={15} /></a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}