"use client";
import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const NAV_LINKS = [
  { key: "home", label: "Home", href: "/" },
  { key: "eligibility", label: "Eligibility", href: "/#eligibility" },
  { key: "timeline", label: "Timeline", href: "/#timeline" },
  { key: "gallery", label: "Gallery", href: "/#gallery" },
  { key: "rules", label: "Rules", href: "/rules" },
];

export default function Header({ active = "home", className = "" }) {
  const [isOpen, setIsOpen] = useState(false);

  const desktopClass = (key) =>
    key === active
      ? "rounded-full bg-blue-600 px-3 py-2 text-xs font-semibold text-white xl:px-5 xl:text-sm"
      : "rounded-full border-2 border-blue-600 bg-none px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white xl:px-5 xl:text-sm";

  const mobileClass = (key) =>
    key === active
      ? "w-full rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      : "w-full rounded-full border-2 border-blue-600 bg-white/50 px-5 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white";

  return (
    <header className={`relative z-50 w-full ${className}`}>
      <div className="hidden lg:flex w-full h-full items-center gap-12">

        <div className="flex h-[110px] items-center">
          <div className="flex items-center">
            <img
              id="header-logo"
              src="/images/2026-images/logo-main-2026.png"
              alt="MS Club"
              className="h-14 w-auto object-contain"
            />
          </div>
        </div>

        <div className="flex flex-grow min-w-0 items-center py-2 justify-between rounded-[40px] border border-white/20 bg-white/10 px-4 backdrop-blur-3xl shadow-[0_0_45px_rgba(0,0,0,0.2)] xl:px-8">
          <div className="flex min-w-0 items-center gap-2 xl:gap-3">
            {NAV_LINKS.map((link) => (
              <a key={link.key} href={link.href}>
                <button className={desktopClass(link.key)}>{link.label}</button>
              </a>
            ))}
          </div>

          <a href="/register">
            <button className="whitespace-nowrap rounded-full bg-gradient-to-r from-[#3552ff] to-[#4d6eff] px-4 py-3 text-xs font-semibold text-white shadow-[0_15px_35px_rgba(53,82,255,0.45)] transition hover:-translate-y-1 xl:px-7 xl:text-sm">
              Register Now
            </button>
          </a>

        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="relative flex h-[60px] w-full items-center justify-between rounded-[30px] border border-white/20 bg-white/10 px-5 shadow-[0_0_30px_rgba(0,0,0,0.1)] backdrop-blur-3xl lg:hidden">
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
          <div className="absolute left-0 right-0 top-[70px] z-[100] flex flex-col gap-3 rounded-[24px] border border-white/20 bg-white/80 p-5 px-8 shadow-[0_0_45px_rgba(0,0,0,0.2)] backdrop-blur-3xl">
            {NAV_LINKS.map((link) => (
              <a key={link.key} href={link.href} onClick={() => setIsOpen(false)}>
                <button className={mobileClass(link.key)}>{link.label}</button>
              </a>
            ))}
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
