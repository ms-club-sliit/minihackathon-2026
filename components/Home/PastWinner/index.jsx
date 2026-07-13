import React from "react";
import PastWinner from "../../../app/_components/Home/PastWinners";

const PastWinnersList = () => {
  return (
    <div className="relative mr-0 px-10 lg:px-0">
      {/* <img
        src="images/design-left.png"
        alt="design-left"
        className="absolute -z-10 opacity-0 lg:opacity-50 lg:w-[30%] left-0 top-1/2"
      /> */}
      <div className="my-2 z-10">
        <div className="max-w-7xl mx-auto px-4 pb-8">
          {/* Blue striped accent heading */}
          <div className="relative flex h-12 sm:h-14 md:h-16 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[440px] items-center mb-6 md:mb-10">
            {/* Left blue accent bars */}
            <div className="flex h-full absolute left-0 top-0 bottom-0 z-0">
              <div className="w-[120px] sm:w-[150px] md:w-[225px] bg-[#2E47FF]" />
              <div className="ml-0.5 md:ml-1 w-[12px] md:w-[20px] bg-[#2E47FF]" />
              <div className="ml-0.5 md:ml-1 w-[9px] md:w-[15px] bg-[#2E47FF]" />
              <div className="ml-0.5 md:ml-1 w-[6px] md:w-[10px] bg-[#2E47FF]" />
              <div className="ml-0.5 md:ml-1 w-[3px] md:w-[5px] bg-[#2E47FF]" />
              <div className="ml-0.5 md:ml-1 w-px bg-[#2E47FF]" />
            </div>
            {/* Heading text */}
            <h2 className="absolute left-4 sm:left-5 md:left-6 z-10 text-3xl sm:text-2xl md:text-5xl leading-none tracking-[-0.05em] text-[#FFF8F8] font-slogan whitespace-nowrap">
              Past Winners
            </h2>
          </div>
        </div>
        <PastWinner />

        {/* Tagline */}
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-8 text-center">
          <p className="text-3xl sm:text-4xl md:text-5xl font-slogan text-gray-900 leading-tight">
            Innovate, collaborate, and shape{" "}
            <span className="text-[#2E47FF]">the future.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PastWinnersList;