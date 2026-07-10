import React from "react";

export default function Header() {
  return (
    <header className="relative z-20">

      <div className="relative ml-auto top-[6vh] -left-[1.5vw] flex h-[60px] w-[calc(100%-21vw)] items-center justify-between rounded-[40px] border border-white/20 bg-white/10 px-8 backdrop-blur-3xl shadow-[0_0_45px_rgba(0,0,0,0.2)]">

        {/* Left Badge */}

        <div className="absolute -left-[14vw] flex h-[110px] w-[165px] flex-col justify-center rounded-br-[34px]">
          <div className="flex items-center gap-2">

            <img
              src="/images/2026-images/logo-main-2026.png"
              alt="MS Club"
              className="h-14 w-auto object-contain"
            />

          </div>
        </div>

        {/* Navigation */}

        <div className="flex items-center gap-3">

          <button className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
            Home
          </button>

          <button className="rounded-full border-2 border-blue-600 bg-none px-5 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white">
            Eligibility
          </button>

          <button className="rounded-full border-2 border-blue-600 bg-none px-5 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white">
            Timeline
          </button>

          <button className="rounded-full border-2 border-blue-600 bg-none px-5 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white">
            Gallery
          </button>

          <button className="rounded-full border-2 border-blue-600 bg-none px-5 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white">
            Rules
          </button>

        </div>

        <button className="rounded-full bg-gradient-to-r from-[#3552ff] to-[#4d6eff] px-7 py-3 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(53,82,255,0.45)] transition hover:-translate-y-1">

          Register Now

        </button>

      </div>

    </header>
  );
}