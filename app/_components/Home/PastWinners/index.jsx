import React from "react";
import PastWinnersData from "../../../data/home/PastWinners.json";

const PastWinner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {PastWinnersData.data.length > 0 ? (
        PastWinnersData.data.map((winner, index) => (
          <div
            key={index}
            className="relative bg-white rounded-2xl p-4 sm:p-6 md:pr-6 md:p-0 shadow-lg"
          >

            <div className="flex flex-col lg:flex-row gap-8 items-center">
              
              <div className="flex-shrink-0 w-full lg:w-80 relative h-full">
                <img
                  src={winner.imageUrl}
                  alt={`${winner.position} - ${winner.name}`}
                  className="w-full h-60 object-cover rounded-xl shadow-md"
                />

                <div className="absolute top-4 left-4 bg-white text-blue-800 px-3 py-1 rounded-lg font-semibold text-sm">
                  {winner.year || "2024"}
                </div>
              </div>

              <div className="flex-1 w-full lg:w-1/2 space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                  {winner.position}
                </h2>

                <blockquote className="text-gray-700 text-base lg:text-lg leading-relaxed italic">
                  "{winner.description}"
                </blockquote>

                <div className="text-right pt-4">
                  <cite className="text-gray-800 font-semibold text-lg not-italic">
                    -{winner.name}-
                  </cite>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-16">
          <div className="bg-gray-50 rounded-xl p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-500 mb-2">
              No Past Winners Found
            </h2>
            <p className="text-gray-400">
              Check back later for updates on hackathon winners.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PastWinner;