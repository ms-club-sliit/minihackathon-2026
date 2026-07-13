"use client";
import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-20">
      <div className="hidden lg:grid grid-cols-[20%_80%] gap-4 items-center w-full">

        <div className="flex items-center h-[110px]">
          <div className="flex items-center gap-2">
            <img
              src="/images/2026-images/logo-main-2026.png"
              alt="MS Club"
              className="h-14 w-auto object-contain"
            />
          </div>
        </div>

        <div className="flex h-[60px] items-center justify-between mr-[-5.5vw] rounded-[40px] border border-white/20 bg-white/10 px-8 backdrop-blur-3xl shadow-[0_0_45px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3">
            <a href="/">
              <button className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
                Home
              </button>
            </a>

            <a href="#eligibility">
              <button className="rounded-full border-2 border-blue-600 bg-none px-5 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white">
                Eligibility
              </button>
            </a>

            <a href="#timeline">
              <button className="rounded-full border-2 border-blue-600 bg-none px-5 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white">
                Timeline
              </button>
            </a>

            <a href="#gallery">
              <button className="rounded-full border-2 border-blue-600 bg-none px-5 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white">
                Gallery
              </button>
            </a>

            <a href="/rules">
              <button className="rounded-full border-2 border-blue-600 bg-none px-5 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white">
                Rules
              </button>
            </a>
          </div>

          <a href="/register">
            <button className="rounded-full bg-gradient-to-r from-[#3552ff] to-[#4d6eff] px-7 py-3 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(53,82,255,0.45)] transition hover:-translate-y-1">
              Register Now
            </button>
          </a>

        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex lg:hidden items-center justify-between w-full h-[60px] px-5 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[30px] shadow-[0_0_30px_rgba(0,0,0,0.1)] relative">
        <div className="flex items-center">
          <img
            src="/images/2026-images/logo-main-2026.png"
            alt="MS Club"
            className="h-10 w-auto object-contain"
          />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-blue-700 focus:outline-none p-1 rounded-lg hover:bg-white/20 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
        </button>

        {isOpen && (
          <div className="absolute top-[70px] left-0 right-0 z-50 flex flex-col gap-3 p-5 rounded-[24px] border border-white/20 bg-white/80 px-8 backdrop-blur-3xl shadow-[0_0_45px_rgba(0,0,0,0.2)]">
            <a href="/" onClick={() => setIsOpen(false)}>
              <button className="w-full rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                Home
              </button>
            </a>
            <a href="#eligibility" onClick={() => setIsOpen(false)}>
              <button className="w-full rounded-full border-2 border-blue-600 bg-white/50 px-5 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white">
                Eligibility
              </button>
            </a>
            <a href="#timeline" onClick={() => setIsOpen(false)}>
              <button className="w-full rounded-full border-2 border-blue-600 bg-white/50 px-5 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white">
                Timeline
              </button>
            </a>
            <a href="#gallery" onClick={() => setIsOpen(false)}>
              <button className="w-full rounded-full border-2 border-blue-600 bg-white/50 px-5 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white">
                Gallery
              </button>
            </a>
            <a href="/rules" onClick={() => setIsOpen(false)}>
              <button className="w-full rounded-full border-2 border-blue-600 bg-white/50 px-5 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white">
                Rules
              </button>
            </a>
            <a href="/register" onClick={() => setIsOpen(false)}>
              <button className="w-full rounded-full bg-gradient-to-r from-[#3552ff] to-[#4d6eff] px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(53,82,255,0.35)] transition hover:opacity-90">
                Register Now
              </button>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}