import React from "react";

// SectionHeader - Reusable blue striped accent heading component.

const SectionHeader = ({ title, className = "" }) => {
  return (
    <div
      className={`relative flex h-12 sm:h-14 md:h-16 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[440px] items-center ${className}`}
    >
      <div className="flex h-full absolute left-0 top-0 bottom-0 z-0">
        <div className="w-[150px] sm:w-[150px] md:w-[225px] bg-[#2E47FF]" />
        <div className="ml-0.5 md:ml-1 w-[12px] md:w-[20px] bg-[#2E47FF]" />
        <div className="ml-0.5 md:ml-1 w-[9px] md:w-[15px] bg-[#2E47FF]" />
        <div className="ml-0.5 md:ml-1 w-[6px] md:w-[10px] bg-[#2E47FF]" />
        <div className="ml-0.5 md:ml-1 w-[3px] md:w-[5px] bg-[#2E47FF]" />
        <div className="ml-0.5 md:ml-1 w-px bg-[#2E47FF]" />
      </div>

      <h2 className="absolute left-4 sm:left-5 md:left-6 z-10 text-3xl sm:text-2xl md:text-5xl leading-none tracking-[-0.05em] text-[#FFF8F8] font-slogan whitespace-nowrap">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;