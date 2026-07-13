import React from "react";
import Sponsers from "../../../app/_components/Home/sponsers";
import SectionTitle from "@/components/SectionTitle";

const SponsorsSection = () => {
  return (
    <div className="relative bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12 mb-8">
        <SectionTitle title="Our Sponsors" />
      </div>

      <div className="flex flex-col items-center mb-8 px-4 md:px-8 lg:px-12">
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
