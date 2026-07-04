import React from "react";
import Sponsers from "../../../app/_components/Home/sponsers";

const SponsorsSection = () => {
  return (
    <div className="relative px-2 sm:px-10 lg:px-0 py-10 bg-white">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center w-full justify-center">
          <div className="hidden md:block w-1/4 h-0.5 bg-gray-200 mr-4" />
          <div className="bg-gray-800 px-6 py-2 rounded-full shadow text-white text-xl sm:text-2xl font-semibold">Our Sponsors</div>
          <div className="hidden md:block w-1/4 h-0.5 bg-gray-200 ml-4" />
        </div>
        <p className="text-center text-gray-500 mt-4 max-w-2xl text-sm sm:text-base">
          We're grateful to these amazing organizations for making Mini Hackathon 2025 possible.
        </p>
      </div>

      {/* Sponsors Cards */}
      <Sponsers />

      {/* Contact for Sponsorship */}
      <div className="text-center text-sm text-gray-700 mt-8">
        Interested in sponsoring?{' '}
        <a
          href="mailto:fcsc@msclubsliit.com"
          className="text-blue-600 hover:underline inline-flex items-center"
        >
          Contact us <span className="ml-1">&rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default SponsorsSection;
