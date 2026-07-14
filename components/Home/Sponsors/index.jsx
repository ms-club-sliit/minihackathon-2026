import React from "react";
import Sponsers from "../../../app/_components/Home/sponsers";
import SectionHeader from "../../section-header";

const SponsorsSection = () => {
  return (
    <div className="relative px-4 py-10 bg-white">
      <div className="relative z-10 pt-2 pb-4 px-4 md:pl-[100px] md:pr-8 mb-4">
        <SectionHeader title="Our Sponsors" className="mb-4" />
        <p className="text-left text-gray-500 mt-4 max-w-2xl text-sm sm:text-base">
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
