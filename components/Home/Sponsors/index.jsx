"use client";
import React, { useState } from "react";
import Image from "next/image";
import sponsorData from "@/app/data/home/sponsors.json";

const SponsorsSection = () => {
  const [imageErrors, setImageErrors] = useState(new Set());

  // Check if sponsor data exists and has content
  if (!sponsorData || Object.keys(sponsorData).length === 0) {
    return null;
  }

  // Map categories to labels (Figma design only shows partner types in badge)
  const categoryMap = {
    "Platinum Partner": { label: "Platinum Partner" },
    "Knowledge Partner": { label: "Knowledge Partner" },
    "Gold Partner": { label: "Gold Partner" },
    "Media Partner": { label: "Media Partner" },
  };

  // Flatten all sponsors
  const allSponsors = Object.entries(sponsorData).flatMap(([categoryName, sponsors]) =>
    sponsors.map((sponsor) => ({
      ...sponsor,
      category: categoryMap[categoryName]?.label || categoryName,
    }))
  );

  const handleImageError = (sponsorId) => {
    setImageErrors((prev) => {
      const updated = new Set(prev);
      updated.add(sponsorId);
      return updated;
    });
  };

  return (
    // Outer section wrapper with the gorgeous soft radial/linear gradient
    <section className="relative w-full py-16 px-4 md:px-8 bg-gradient-to-br from-[#FFF0F3] via-[#F3F8FF] to-[#E6F4FF] overflow-hidden flex flex-col items-center">
      {/* Header Badge */}
      <div className="flex justify-center mb-10">
        <div className="bg-[#0B3CC1] pl-6 pr-4 py-2.5 rounded-xl shadow-lg flex items-center gap-4 border border-blue-600/30">
          <span className="text-white text-lg sm:text-xl font-bold tracking-wider uppercase font-sans">
            Our Sponsors
          </span>
          {/* Vertical stripes on the right */}
          <div className="flex gap-[3px] h-6 items-center">
            <span className="w-[3px] h-5 bg-white/20 rounded-full"></span>
            <span className="w-[3px] h-5 bg-white/30 rounded-full"></span>
            <span className="w-[3px] h-5 bg-white/50 rounded-full"></span>
            <span className="w-[3px] h-5 bg-white/70 rounded-full"></span>
            <span className="w-[3px] h-5 bg-white/90 rounded-full"></span>
            <span className="w-[3px] h-5 bg-white rounded-full"></span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Container */}
      <div className="w-full max-w-6xl bg-white/35 backdrop-blur-md border border-white/60 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] p-6 sm:p-10 lg:p-12">
        {/* Desktop Layout (lg: grid-cols-3) */}
        <div className="hidden lg:grid grid-cols-3 gap-8 items-center justify-items-center">
          {/* Row 1, Col 1: Sponsor 1 (Platinum - Innobot) */}
          {allSponsors[0] ? (
            <SponsorCard sponsor={allSponsors[0]} imageErrors={imageErrors} onImageError={handleImageError} />
          ) : (
            <div />
          )}

          {/* Row 1, Col 2: Center grateful text */}
          <GratefulText />

          {/* Row 1, Col 3: Sponsor 2 (Knowledge - MSA) */}
          {allSponsors[1] ? (
            <SponsorCard sponsor={allSponsors[1]} imageErrors={imageErrors} onImageError={handleImageError} />
          ) : (
            <div />
          )}

          {/* Row 2: Center the remaining cards (Gold & Media) */}
          <div className="col-span-3 flex justify-center gap-8 mt-2 w-full">
            {allSponsors[2] && <SponsorCard sponsor={allSponsors[2]} imageErrors={imageErrors} onImageError={handleImageError} />}
            {allSponsors[3] && <SponsorCard sponsor={allSponsors[3]} imageErrors={imageErrors} onImageError={handleImageError} />}
            {allSponsors.slice(4).map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} imageErrors={imageErrors} onImageError={handleImageError} />
            ))}
          </div>
        </div>

        {/* Tablet Layout (md: grid-cols-2) */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-8 items-center">
          {/* Grateful text spanning 2 columns */}
          <div className="col-span-2 mb-4">
            <GratefulText />
          </div>
          {/* Sponsors grid below */}
          {allSponsors.map((sponsor) => (
            <div key={sponsor.id} className="flex justify-center">
              <SponsorCard sponsor={sponsor} imageErrors={imageErrors} onImageError={handleImageError} />
            </div>
          ))}
        </div>

        {/* Mobile Layout (1 column) */}
        <div className="flex flex-col md:hidden gap-8 items-center">
          <GratefulText />
          {allSponsors.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} imageErrors={imageErrors} onImageError={handleImageError} />
          ))}
        </div>
      </div>

      {/* Footer Contact Info */}
      <div className="text-center text-sm font-medium text-gray-700 mt-10">
        Interested in sponsoring?{" "}
        <a
          href="mailto:fcsc@msclubsliit.com"
          className="text-[#0B3CC1] hover:underline font-bold inline-flex items-center group transition-colors duration-200"
        >
          Contact us
          <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
        </a>
      </div>
    </section>
  );
};

// Grateful Text component matching Figma
const GratefulText = () => (
  <div className="flex flex-col items-center justify-center text-center px-4 py-6 select-none">
    <span className="text-xl sm:text-2xl font-light text-slate-700 font-sans tracking-wide">
      We are
    </span>
    <h2 className="text-5xl sm:text-6xl font-black text-[#2B5BFF] my-2 lowercase tracking-tight select-none">
      grateful
    </h2>
    <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-[260px] font-sans">
      these amazing organizations for making Mini Hackathon 2026 possible.
    </p>
  </div>
);

// Sponsor Card component matching Figma styling
const SponsorCard = ({ sponsor, imageErrors, onImageError }) => {
  const hasError = imageErrors.has(sponsor.id);
  const imageSrc = hasError ? "/images/home/sponsors/default.webp" : (sponsor.src || "/images/home/sponsors/default.webp");

  return (
    <div
      onClick={() => sponsor.url && window.open(sponsor.url, "_blank", "noopener,noreferrer")}
      className={`w-full max-w-[280px] h-[340px] rounded-[2rem] bg-gradient-to-b from-[#0C58B6] to-[#0D1F38] p-6 flex flex-col items-center justify-between relative shadow-xl border border-white/10 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ${
        sponsor.url ? "cursor-pointer" : ""
      }`}
      style={{
        boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 10px 25px -5px rgba(12, 88, 182, 0.3)",
      }}
    >
      {/* Category Glass Badge */}
      <div className="mt-2 px-4 py-1.5 rounded-full text-white text-[11px] font-semibold bg-white/10 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] tracking-wide uppercase select-none">
        {sponsor.category}
      </div>

      {/* Logo Container */}
      <div className="flex-1 flex items-center justify-center w-full p-4">
        <Image
          src={imageSrc}
          alt={sponsor.alt || sponsor.name}
          width={sponsor.width ? Math.min(sponsor.width, 220) : 180}
          height={sponsor.height ? Math.min(sponsor.height, 140) : 100}
          className="object-contain max-h-[140px] w-auto drop-shadow-lg select-none"
          onError={() => onImageError(sponsor.id)}
          quality={95}
        />
      </div>

      {/* Optional fallback text if image failed */}
      {hasError && (
        <div className="text-white text-center font-bold pb-4 select-none">
          {sponsor.name}
        </div>
      )}
    </div>
  );
};

export default SponsorsSection;
