"use client"
import Image from "next/image";
import { useState } from "react";
import sponsorData from "@/app/data/home/sponsors.json";

const Sponsors = () => {
  // isPaused is only needed for scroll, declared below if needed
  const [imageErrors, setImageErrors] = useState(new Set());

  // Check if sponsor data exists and has content
  if (!sponsorData || Object.keys(sponsorData).length === 0) {
    return (
      <div className="relative text-center py-8">
        <p className="text-gray-500">No sponsors data available</p>
      </div>
    );
  }

  // Map legacy categories to new partner types and colors
  const categoryMap = {
    'Platinum Sponsors': { label: 'Platinum Partner', color: '#E67700E8' },
    'Knowledge Partners': { label: 'Knowledge Partner', color: '#3B82F6' },
    'Gold Partners': { label: 'Gold Partner', color: '#219C73' },
    'Media Partners': { label: 'Media Partner', color: '#6A6970' }, 
    // Add more mappings as needed
  };

  // For backward compatibility, map Gold/Silver/Bronze to Platinum/Knowledge/Beverage
  const legacyMap = {
    'Gold Sponsors': { label: 'Platinum Partner', color: '#E67700E8' },
    'Silver Sponsors': { label: 'Knowledge Partner', color: '#3B82F6' },
    'Bronze Sponsors': { label: 'Beverage Partner', color: '#219C73' },
  };

  // Merge both maps
  const mergedCategoryMap = { ...categoryMap, ...legacyMap };

  // Flatten all sponsors into one array with mapped category info
  const allSponsors = Object.entries(sponsorData).flatMap(([categoryName, sponsors]) =>
    sponsors.map(sponsor => ({
      ...sponsor,
      category: mergedCategoryMap[categoryName]?.label || categoryName,
      color: mergedCategoryMap[categoryName]?.color || undefined
    }))
  );

  const handleImageError = (sponsorId, e) => {
    setImageErrors(prev => new Set([...prev, sponsorId]));
    e.currentTarget.src = "/images/home/sponsors/default.webp";
  };

  const handleSponsorClick = (sponsor) => {
    if (sponsor.url) {
      window.open(sponsor.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Get package color based on category (updated for new partner types)
  const getPackageColor = (category) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('platinum')) {
      return '#E67700E8';
    } else if (categoryLower.includes('knowledge')) {
      return '#3B82F6';
    } else if (categoryLower.includes('gold')) {
      return '#FFD700';
    } else if (categoryLower.includes('media')) {
      return '#6A6970';
    }
    return '#3B82F6'; // Default
  };

  // Duplicated sponsors for seamless scroll (declared below if needed)

  // Duplicate sponsors for seamless scroll
  const duplicatedSponsors = [
    ...allSponsors,
    ...allSponsors,
    ...allSponsors,
    ...allSponsors
  ];

  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-8 bg-white">
      <div className="relative overflow-hidden">
        <div
          className="flex items-center gap-10 py-8 animate-scroll"
          style={{
            animationPlayState: isPaused ? "paused" : "running",
            width: "fit-content",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicatedSponsors.map((sponsor, index) => {
            const sponsorId = `sponsor-${sponsor.id}-${index}`;
            const isClickable = sponsor.url;
            return (
              <div
                key={sponsorId}
                className="flex-shrink-0 relative flex flex-col items-center bg-white rounded-xl shadow-md w-64 h-64 p-4 transition-transform"
                style={{ minWidth: '240px', maxWidth: '270px' }}
                onClick={() => isClickable && window.open(sponsor.url, '_blank', 'noopener,noreferrer')}
                tabIndex={isClickable ? 0 : -1}
                role={isClickable ? 'button' : 'img'}
              >
                {/* Partner badge at top middle, overlapping border */}
                <div
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-3 rounded-full text-white text-xs font-semibold shadow`}
                  style={{
                    minWidth: '150px',
                    textAlign: 'center',
                    zIndex: 10,
                    backgroundColor: sponsor.color || getPackageColor(sponsor.category),
                  }}
                >
                  {sponsor.category}
                  {/* {!sponsor.color && (
                    <span className={getPackageColor(sponsor.category)} style={{ position: 'absolute', inset: 0, borderRadius: '9999px', zIndex: -1 }}></span>
                  )}
                  {sponsor.category} */}
                </div>
                <div className="flex-1 flex flex-col justify-center items-center mt-4 w-full">
                  {/* Fixed height image container for alignment */}
                  <div style={{ height: 80, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      className="object-contain max-w-full max-h-full"
                      src={sponsor.src || "/images/home/sponsors/default.webp"}
                      alt={sponsor.alt || `${sponsor.category} Sponsor`}
                      width={sponsor.width ? Math.min(sponsor.width, 200) : 120}
                      height={sponsor.height ? Math.min(sponsor.height, 120) : 60}
                      quality={90}
                      loading="lazy"
                      onError={(e) => handleImageError(sponsorId, e)}
                      sizes="120px"
                    />
                  </div>
                  <div className="text-lg font-bold text-gray-800 mt-4 text-center w-full">
                    {sponsor.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Sponsors;