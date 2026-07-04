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
      <div className="lg:px-20 my-2 z-10">
        <div className="pb-8">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
          <span aria-hidden className="h-px bg-gray-300 flex-1" />
          <h1 className="shrink-0 inline-block bg-gray-800 text-white px-8 py-2 rounded-full text-xl font-semibold">
            Past Winners
          </h1>
          <span aria-hidden className="h-px bg-gray-300 flex-1" />
        </div>
        </div>
        <PastWinner />
      </div>
    </div>
  );
};

export default PastWinnersList;