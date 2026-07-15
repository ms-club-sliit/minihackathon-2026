"use client";

import Image from "next/image";
import { useState } from "react";
import sponsorData from "@/app/data/home/sponsors.json";

const Sponsors = () => {
  const [imageErrors, setImageErrors] = useState(new Set());

  // No data guard
  if (!sponsorData || Object.keys(sponsorData).length === 0) {
    return (
      <div className="relative text-center py-8">
        <p className="text-gray-500">No sponsors data available</p>
      </div>
    );
  }

  // Flatten every category into a single list of sponsors, keeping the
  // category name as the partner label shown on each card's pill.
  const allSponsors = Object.entries(sponsorData).flatMap(
    ([categoryName, sponsors]) =>
      sponsors.map((sponsor) => ({
        ...sponsor,
        category: sponsor.category || categoryName,
      }))
  );

  const handleImageError = (sponsorId, e) => {
    setImageErrors((prev) => new Set([...prev, sponsorId]));
    e.currentTarget.src = "/images/home/sponsors/default.webp";
  };

  const openSponsor = (sponsor) => {
    if (sponsor.url) {
      window.open(sponsor.url, "_blank", "noopener,noreferrer");
    }
  };

  // Reusable "grateful" copy block — rendered as a grid cell so it sits in the
  // middle of the badge layout, exactly like the reference design.
  const GratefulCopy = (
    <div className="flex flex-col items-center justify-center text-center px-4 py-6">
      <span className="text-2xl sm:text-3xl font-medium text-gray-700">
        We are
      </span>
      <span className="bg-gradient-to-r from-[#2E47FF] to-[#5b7bff] bg-clip-text text-transparent font-slogan text-5xl sm:text-6xl md:text-7xl leading-none tracking-[-0.04em]">
        grateful
      </span>
      <p className="mt-3 max-w-[16rem] text-base sm:text-lg font-medium leading-6 text-gray-600">
        these amazing organizations for making Mini Hackathon 2026 possible.
      </p>
    </div>
  );

  const SponsorCard = (sponsor, index) => {
    const sponsorId = `sponsor-${sponsor.id}-${index}`;
    const isClickable = Boolean(sponsor.url);

    return (
      <div
        key={sponsorId}
        onClick={() => openSponsor(sponsor)}
        tabIndex={isClickable ? 0 : -1}
        role={isClickable ? "button" : "img"}
        className={`group relative flex h-[340px] sm:h-[360px] flex-col items-center rounded-[26px] bg-gradient-to-br from-[#2a5cbf] via-[#123a86] to-[#0a1f4d] p-5 sm:p-6 shadow-[0_18px_40px_rgba(10,25,70,0.35)] ring-1 ring-white/10 transition-transform duration-300 ${
          isClickable ? "cursor-pointer hover:-translate-y-1" : ""
        }`}
      >
        {/* Partner label pill */}
        <div className="w-full max-w-[240px] rounded-full border border-sky-300/40 bg-gradient-to-b from-white/20 to-white/5 px-4 py-2 text-center text-sm font-semibold text-white shadow-inner backdrop-blur-sm">
          {sponsor.category}
        </div>

        {/* Logo / badge — flexes to fill the space so every badge is vertically centered on the same line */}
        <div className="flex w-full flex-1 items-center justify-center py-4">
          <Image
            className="max-h-[130px] max-w-[70%] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
            src={sponsor.src || "/images/home/sponsors/default.webp"}
            alt={sponsor.alt || `${sponsor.category} Sponsor`}
            width={sponsor.width ? Math.min(sponsor.width, 220) : 180}
            height={sponsor.height ? Math.min(sponsor.height, 140) : 120}
            quality={90}
            loading="lazy"
            onError={(e) => handleImageError(sponsorId, e)}
            sizes="220px"
          />
        </div>

        <div className="flex h-6 items-center text-center text-base font-semibold text-white/90">
          {sponsor.name}
        </div>
      </div>
    );
  };

  // Build the grid: first sponsor, then the grateful copy in the top-middle
  // slot, then the remaining sponsors flow around it.
  const [first, ...rest] = allSponsors;
  const cells = [
    first && SponsorCard(first, 0),
    <div key="grateful-copy">{GratefulCopy}</div>,
    ...rest.map((sponsor, i) => SponsorCard(sponsor, i + 1)),
  ].filter(Boolean);

  return (
    <div className="grid grid-cols-1 items-center gap-5 sm:gap-6 md:grid-cols-3 md:items-start">
      {cells}
    </div>
  );
};

export default Sponsors;
