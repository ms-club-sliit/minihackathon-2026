import React from "react";
import PastWinner from "../../../app/_components/Home/PastWinners";
import SectionHeader from "../../section header";

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
          <SectionHeader title="Past Winners" className="mb-6 md:mb-10" />
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