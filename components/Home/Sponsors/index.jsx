import React from "react";
import Sponsers from "../../../app/_components/Home/sponsers";
import SectionHeader from "../../section-header";

const SponsorsSection = () => {
  return (
    <section className="relative px-4 py-12 md:py-16">
      <div className="mx-auto w-full max-w-6xl">
        {/* Heading */}
        <div className="mb-6 md:pl-4">
          <SectionHeader title="Our Sponsors" />
        </div>

        {/* Glass container holding the sponsor grid */}
        <div className="relative rounded-[32px] border border-white/30 bg-white/20 p-5 shadow-[0_25px_60px_rgba(100,125,175,0.18)] backdrop-blur-2xl sm:p-8 md:p-10">
          <Sponsers />
        </div>

        {/* Contact for Sponsorship */}
        <div className="mt-8 text-center text-sm text-gray-700">
          Interested in sponsoring?{" "}
          <a
            href="mailto:fcsc@msclubsliit.com"
            className="inline-flex items-center font-medium text-[#2E47FF] hover:underline"
          >
            Contact us <span className="ml-1">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
