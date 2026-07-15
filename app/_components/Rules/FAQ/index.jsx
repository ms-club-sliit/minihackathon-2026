"use client";

import { useState } from "react";
import faqData from "@/app/data/faq/faq.json";

function AccordionIcon({ open }) {
  return (
    <span
      aria-hidden="true"
      className={`relative block h-4 w-4 transition-transform duration-300 ${
        open ? "rotate-45" : ""
      }`}
    >
      <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 rounded-full bg-current" />
      <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-current" />
    </span>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-28 top-8 h-80 w-80 rounded-full bg-[#B794F6]/35 blur-3xl" />
        <div className="absolute left-1/3 top-0 h-72 w-72 rounded-full bg-[#9DEDF8]/30 blur-3xl" />
        <div className="absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-[#7CE3B1]/35 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-[34px] border border-[#9DEDF8]/60 bg-white/10 shadow-[5px_12px_18px_rgba(0,0,0,0.18),0_0_42px_rgba(157,237,248,0.22)] backdrop-blur-3xl sm:rounded-[48px] lg:rounded-[64px]">
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-white/10 to-white/5" />
            <div className="absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-[#B794F6]/25 blur-3xl" />
            <div className="absolute -right-16 top-12 h-80 w-80 rounded-full bg-[#7CE3B1]/25 blur-3xl" />
            <div className="absolute inset-x-8 top-8 h-px bg-white/55" />
            <div className="absolute inset-x-8 bottom-8 h-px bg-[#9DEDF8]/30" />
          </div>

          <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
            <div className="relative flex flex-col justify-between border-b border-white/30 bg-white/10 p-7 shadow-[inset_-1px_0_rgba(255,255,255,0.25)] sm:p-10 lg:min-h-[650px] lg:border-b-0 lg:border-r lg:border-white/25 lg:p-12 xl:p-14">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                  Mini Hackathon 2026
                </p>
                <h2 className="max-w-md text-4xl font-black leading-[0.95] tracking-[-0.05em] text-gray-950 sm:text-5xl xl:text-6xl">
                  Questions,
                  <span className="block text-[#2E47FF]">answered.</span>
                </h2>
                <p className="mt-6 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
                  Everything you need to know before you assemble your team,
                  shape your idea, and start building.
                </p>
              </div>

              <div className="mt-10 flex items-end justify-between gap-6 lg:mt-16">
                <div className="rounded-[28px] border border-white/40 bg-white/20 px-7 py-5 shadow-[0_0_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl">
                  <span className="block text-3xl font-black tracking-tight text-gray-950">
                    {String(faqData.length).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Quick answers
                  </span>
                </div>

                <div className="flex h-12 items-stretch gap-1 rounded-full border border-white/35 bg-white/15 p-3 shadow-[0_0_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl" aria-hidden="true">
                  <span className="w-1 rounded-full bg-[#2E47FF]/25" />
                  <span className="w-2 rounded-full bg-[#2E47FF]/40" />
                  <span className="w-3 rounded-full bg-[#2E47FF]/65" />
                  <span className="w-12 rounded-full bg-[#2E47FF]" />
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-7 lg:p-9 xl:p-11">
              <div className="space-y-3">
                {faqData.map((item, index) => {
                  const isOpen = openIndex === index;
                  const answerId = `faq-answer-${index}`;
                  const buttonId = `faq-question-${index}`;

                  return (
                    <article
                      key={item.question}
                      className={`overflow-hidden rounded-[26px] border backdrop-blur-2xl transition-all duration-300 sm:rounded-[32px] ${
                        isOpen
                          ? "border-[#9DEDF8]/70 bg-white/35 shadow-[0_16px_34px_rgba(46,71,255,0.16),inset_0_1px_rgba(255,255,255,0.45)]"
                          : "border-white/40 bg-white/15 shadow-[0_0_28px_rgba(0,0,0,0.08)] hover:border-[#9DEDF8]/60 hover:bg-white/25"
                      }`}
                    >
                      <h3>
                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={answerId}
                          onClick={() => toggle(index)}
                          className="group flex w-full items-center gap-4 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2E47FF] sm:gap-5 sm:p-5"
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold tracking-wider transition-colors duration-300 sm:h-10 sm:w-10 ${
                              isOpen
                                ? "bg-[#2E47FF] text-white shadow-[0_10px_24px_rgba(46,71,255,0.3)]"
                                : "border border-white/45 bg-white/25 text-gray-600 group-hover:text-[#2E47FF]"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span
                            className={`flex-1 text-sm font-bold leading-6 transition-colors duration-300 sm:text-base ${
                              isOpen ? "text-gray-950" : "text-gray-700"
                            }`}
                          >
                            {item.question}
                          </span>

                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                              isOpen
                                ? "bg-[#2E47FF] text-white shadow-[0_8px_18px_rgba(46,71,255,0.25)]"
                                : "border border-white/40 bg-white/20 text-gray-600 group-hover:bg-white/35 group-hover:text-[#2E47FF]"
                            }`}
                          >
                            <AccordionIcon open={isOpen} />
                          </span>
                        </button>
                      </h3>

                      <div
                        id={answerId}
                        role="region"
                        aria-labelledby={buttonId}
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="border-t border-white/35 px-4 pb-5 pt-4 text-sm leading-7 text-gray-700 sm:ml-[60px] sm:px-5 sm:pb-6">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
