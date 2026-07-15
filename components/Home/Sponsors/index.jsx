import React from "react";
import Sponsers from "../../../app/_components/Home/sponsers";
import SectionHeader from "../../section-header";

const SponsorsSection = () => {
  return (
    <section className="relative pb-12 md:pb-16">
      {/* Heading — aligned with the other section headers */}
      <div className="relative z-10 pt-8 pb-4 px-4 md:pl-[100px] md:pr-8">
        <SectionHeader title="Our Sponsors" className="mb-0" />
      </div>

      {/* Content container — matches the Gallery/section width and alignment */}
      <div className="container mx-auto px-4">
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
