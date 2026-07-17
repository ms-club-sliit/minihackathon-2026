"use client";
import { useState } from "react";
import Image from "next/image";
import sponsorData from "@/app/data/home/sponsors.json";
import SectionHeader from "@/components/section-header";

/**
 * Map raw category keys from sponsors.json to the display label
 * shown on each card's badge. Add new keys here as sponsors are added.
 */
const categoryMap = {
  "Platinum Sponsors": "Platinum Partner",
  "Gold Partners": "Gold Partner",
  "Knowledge Partners": "Knowledge Partner",
  "Media Partners": "Media Partner",
  "Beverage Partners": "Beverage Partner",
};

/**
 * Fixed tier priority — Platinum sponsors always render first (and land in
 * the featured top-row slots), regardless of key order in sponsors.json.
 */
const categoryOrder = [
  "Platinum Sponsors",
  "Gold Partners",
  "Knowledge Partners",
  "Media Partners",
  "Beverage Partners",
];

function SponsorCard({ sponsor, onImageError, hasError }) {
  const imageSrc = hasError
    ? "/images/home/sponsors/default.webp"
    : sponsor.src || "/images/home/sponsors/default.webp";
  const isClickable = Boolean(sponsor.url);

  return (
    <div
      onClick={() =>
        isClickable && window.open(sponsor.url, "_blank", "noopener,noreferrer")
      }
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      className={`w-[260px] sm:w-[290px] md:w-[310px] lg:w-[330px] max-w-[88vw] h-[320px] sm:h-[360px] md:h-[390px] lg:h-[410px] shrink-0 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-b from-[#1B5FAE] to-[#081227] p-5 sm:p-6 flex flex-col items-center justify-between relative shadow-xl border border-white/10 transition-all duration-300 ${
        isClickable ? "cursor-pointer hover:scale-[1.03] hover:shadow-2xl" : ""
      }`}
      style={{
        boxShadow:
          "inset 0 1px 1px rgba(255,255,255,0.18), 0 10px 25px -5px rgba(12,88,182,0.35)",
      }}
    >
      {/* Category badge */}
      <div className="font-slogan px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-white text-xs sm:text-sm md:text-base font-semibold bg-white/10 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] tracking-wide uppercase">
        {sponsor.category}
      </div>

      {/* Logo */}
      <div className="flex-1 flex items-center justify-center w-full p-3 sm:p-4">
        <Image
          src={imageSrc}
          alt={sponsor.alt || sponsor.name}
          width={sponsor.width ? Math.min(sponsor.width, 260) : 200}
          height={sponsor.height ? Math.min(sponsor.height, 180) : 140}
          className="object-contain max-h-[140px] sm:max-h-[160px] md:max-h-[180px] w-auto drop-shadow-lg"
          onError={() => onImageError(sponsor.id)}
          quality={95}
        />
      </div>

      {/* Fallback name if the logo fails to load */}
      {hasError && (
        <div className="font-slogan text-white text-center font-bold pb-2 text-sm sm:text-base">
          {sponsor.name}
        </div>
      )}
    </div>
  );
}

function GratefulText() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-6">
      <h2 className="font-slogan text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] font-bold">
        We are
        <br />
        <span className="font-slogan italic" style={{ color: "#2E47FF" }}>
          grateful.
        </span>
      </h2>
      <p className="font-slogan text-lg sm:text-xl md:text-2xl lg:text-3xl text-black max-w-xs sm:max-w-sm leading-relaxed mt-3">
        these amazing organizations for making Mini Hackathon 2026 possible.
      </p>
    </div>
  );
}

export default function Sponsors() {
  const [imageErrors, setImageErrors] = useState(new Set());

  const handleImageError = (id) => {
    setImageErrors((prev) => new Set(prev).add(id));
  };

  if (!sponsorData || Object.keys(sponsorData).length === 0) {
    return null;
  }

  const knownKeys = new Set(categoryOrder);
  const extraKeys = Object.keys(sponsorData).filter((key) => !knownKeys.has(key));
  const orderedKeys = [...categoryOrder, ...extraKeys];

  const allSponsors = orderedKeys.flatMap((categoryName) =>
    (sponsorData[categoryName] || []).map((sponsor) => ({
      ...sponsor,
      category: categoryMap[categoryName] || categoryName,
    }))
  );

  const [first, second, ...rest] = allSponsors;

  return (
    <section
      id="sponsors"
      className="w-full flex flex-col items-center py-8 sm:py-10 md:py-12 px-5 sm:px-10 md:px-20"
    >
      {/* Header — reuses the same SectionHeader badge used in Timeline */}
      <div className="relative z-10 w-full max-w-7xl mb-8 px-2">
        <SectionHeader title="Our Sponsors" className="ml-[-10px]" />
      </div>

      {/* Container — same width/treatment as Eligibility (translucent #EFEFEF + blur) */}
      <div
        className="w-full max-w-7xl bg-[#EFEFEF] backdrop-filter backdrop-blur-lg bg-opacity-10 rounded-[16px] sm:rounded-[24px] md:rounded-[36px] lg:rounded-[48px] px-2 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16"
        style={{ boxShadow: "0px 0px 18px 8px #0000001A" }}
      >
        {/* Desktop: card — grateful text — card, then remaining cards centered */}
        <div className="hidden lg:grid grid-cols-3 gap-8 items-center justify-items-center">
          {first ? (
            <SponsorCard
              sponsor={first}
              onImageError={handleImageError}
              hasError={imageErrors.has(first.id)}
            />
          ) : (
            <div />
          )}

          <GratefulText />

          {second ? (
            <SponsorCard
              sponsor={second}
              onImageError={handleImageError}
              hasError={imageErrors.has(second.id)}
            />
          ) : (
            <div />
          )}

          {rest.length > 0 && (
            <div className="col-span-3 flex flex-wrap justify-center gap-8 mt-4">
              {rest.map((sponsor) => (
                <SponsorCard
                  key={sponsor.id}
                  sponsor={sponsor}
                  onImageError={handleImageError}
                  hasError={imageErrors.has(sponsor.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Tablet */}
        <div className="hidden md:flex lg:hidden flex-col items-center gap-8">
          <GratefulText />
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 w-full">
            {allSponsors.map((sponsor) => (
              <SponsorCard
                key={sponsor.id}
                sponsor={sponsor}
                onImageError={handleImageError}
                hasError={imageErrors.has(sponsor.id)}
              />
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="flex flex-col md:hidden gap-6 sm:gap-8 items-center">
          <GratefulText />
          {allSponsors.map((sponsor) => (
            <SponsorCard
              key={sponsor.id}
              sponsor={sponsor}
              onImageError={handleImageError}
              hasError={imageErrors.has(sponsor.id)}
            />
          ))}
        </div>
      </div>

      {/* Footer contact line */}
      <div className="font-slogan text-center text-base sm:text-lg md:text-xl font-medium text-black mt-10">
        Interested in sponsoring?{" "}
        <a
          href="mailto:fcsc@msclubsliit.com"
          className="font-bold underline inline-flex items-center group transition-colors duration-200"
          style={{ color: "#2E47FF" }}
        >
          Contact us
          <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
            &rarr;
          </span>
        </a>
      </div>
    </section>
  );
}