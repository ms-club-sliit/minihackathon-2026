"use client";
import { useState } from "react";
import faqData from "@/app/data/faq/faq.json";

function PlusIcon({ open }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="10" y1="5" x2="10" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container mx-auto py-16 px-6 md:px-12 lg:px-20">
      {/* Section header — matching the pill pattern used across the site */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="h-px bg-gray-300 flex-1 max-w-[120px]" />
        <span className="bg-gray-800 text-white px-6 py-1.5 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider">
          FAQ
        </span>
        <span className="h-px bg-gray-300 flex-1 max-w-[120px]" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#161414] mb-10">
        Frequently Asked Questions
      </h2>

      {/* FAQ Items */}
      <div className="max-w-3xl mx-auto space-y-3">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`rounded-2xl border transition-colors duration-300 bg-white ${
                isOpen
                  ? "border-[#EF4A23]/30 shadow-md"
                  : "border-gray-200 shadow-sm hover:border-gray-300"
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
              >
                <span
                  className={`text-sm md:text-base font-semibold transition-colors duration-300 pr-2 ${
                    isOpen ? "text-[#EF4A23]" : "text-gray-800"
                  }`}
                >
                  {item.question}
                </span>
                <span
                  className={`flex-shrink-0 transition-colors duration-300 ${
                    isOpen ? "text-[#EF4A23]" : "text-gray-400"
                  }`}
                >
                  <PlusIcon open={isOpen} />
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm md:text-base text-[#334155] leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
