"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TimelineData from "@/app/data/Timeline.json";

const elementImages = [
  "/assets/1.png", 
  "/assets/2.png", 
  "/assets/3.png", 
  "/assets/4.png", 
];

function DecorativeCorners({ images = elementImages }) {
  const [tl, tr, bl, br] = [
    images[0] || "/assets/1.png",
    images[3] || "/assets/2.png",
    images[2] || "/assets/3.png",
    images[1] || "/assets/4.png",
  ];

  return (
    <div aria-hidden className="pointer-events-none select-none absolute inset-0 -z-10">
      <Image
        src={tl}
        alt=""
        width={100}
        height={100}
        priority
        draggable={false}
        sizes="(max-width: 768px) 96px, 144px"
        className="absolute top-36 left-0 w-24 md:w-36 opacity-70"
      />

      <Image
        src={tr}
        alt=""
        width={100}
        height={100}
        draggable={false}
        sizes="(max-width: 768px) 96px, 160px"
        className="absolute top-36 right-0 w-24 md:w-40 opacity-70"
      />

      <Image
        src={bl}
        alt=""
        width={100}
        height={100}
        draggable={false}
        sizes="(max-width: 768px) 112px, 192px"
        className="absolute bottom-8 left-0 w-20 md:w-48 opacity-70"
      />

      <Image
        src={br}
        alt=""
        width={100}
        height={100}
        draggable={false}
        sizes="(max-width: 768px) 112px, 192px"
        className="absolute bottom-0 right-0 w-28 md:w-48 opacity-70"
      />
    </div>
  );
}

/**
 * Reveal items on scroll.
 * Re-animates whenever the element enters the viewport.
 * Disables animation for users with reduced motion or on small screens.
 */
function RevealOnScroll({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches;

    if (reduce || !isDesktop) {
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const onEnter = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setShown(true), delay);
    };

    const onExit = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      setShown(false);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onEnter();
          else onExit();
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      io.disconnect();
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${className} md:transition-all md:duration-700 md:ease-out md:will-change-transform ${
        shown ? "md:opacity-100 md:translate-y-0" : "md:opacity-0 md:translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

export default function Timeline() {
  return (
    <main id="timeline" className="relative isolate bg-white min-h-screen py-12 overflow-hidden">
      {/* Decorative corner UI elements */}
      <DecorativeCorners />

      {/* Header */}
      <div className="mb-20 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <span aria-hidden className="h-px bg-gray-300 flex-1" />
          <h1 className="shrink-0 inline-block bg-gray-800 text-white px-8 py-2 rounded-full text-xl font-semibold">
            Timeline
          </h1>
          <span aria-hidden className="h-px bg-gray-300 flex-1" />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Center line */}
        <div
          aria-hidden
          className="absolute left-12 md:left-1/2 top-0 md:-translate-x-1/2 h-[calc(100%-12rem)] w-[2px] bg-gray-300"
        />

        {TimelineData.map((timeline, index) => {
          const isLeft = index % 2 === 0;
          const isFirst = timeline.index === 1;
          const isLast = timeline.index === TimelineData.length;

          if (isLast) {
            return (
              <RevealOnScroll key={timeline.index} className="relative mb-24">
                {/* Mobile layout */}
                <div className="block md:hidden">
                  <div className="flex items-start">
                    <div className="w-full pl-16 pr-4">
                      <p className="text-gray-500 text-xs mb-1 uppercase tracking-wide">
                        {timeline.date}
                      </p>
                      <h3 className="font-bold text-gray-900 text-base mb-2 leading-tight">
                        {timeline.title}
                      </h3>
                      <p className="text-gray-600 text-md leading-relaxed text-justify">
                        {timeline.description}
                      </p>
                    </div>
                  </div>
                  {/* Mobile marker */}
                  <div className="absolute left-8 top-2 -translate-x-1/2 z-10">
                    <div className="h-12 w-12 rounded-full bg-black shadow-lg border-4 border-white flex items-center justify-center">
                      <span className="text-white text-lg">✓</span>
                    </div>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:block">
                  {/* Black circle */}
                  <div className="w-full flex justify-center">
                    <div className="h-14 w-14 rounded-full bg-black shadow-lg border-4 border-white flex items-center justify-center">
                      <span className="text-white text-lg">✓</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="mt-6 max-w-2xl mx-auto text-center px-4">
                    <p className="text-gray-500 text-md mb-1 uppercase tracking-wide">
                      {timeline.date}
                    </p>
                    <h3 className="font-bold text-gray-900 text-xl md:text-2xl mb-2">
                      {timeline.title}
                    </h3>
                    <p className="text-gray-600 text-md leading-relaxed text-center">
                      {timeline.description}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            );
          }

          return (
            <RevealOnScroll key={timeline.index} className="relative mb-16 md:mb-20">
              <div className="flex items-start md:items-center">
                {isLeft && <div className="hidden md:block md:w-1/2" />}

                <div
                  className={`w-full md:w-1/2 pl-16 pr-4 md:px-8 ${
                    isLeft ? "md:pl-16" : "md:pr-16"
                  }`}
                >
                  <p
                    className={`text-gray-500 text-xs md:text-md mb-1 uppercase tracking-wide ${
                      !isLeft ? "md:text-right" : ""
                    }`}
                  >
                    {timeline.date}
                  </p>
                  <h3
                    className={`font-bold text-gray-900 text-base md:text-lg mb-2 leading-tight ${
                      !isLeft ? "md:text-right" : ""
                    }`}
                  >
                    {timeline.title}
                  </h3>
                  <p className="text-gray-600 text-md leading-relaxed text-justify">
                    {timeline.description}
                  </p>
                </div>

                {!isLeft && <div className="hidden md:block md:w-1/2" />}
              </div>

              <div className="absolute left-8 top-2 md:left-1/2 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
                <div
                  className={`flex items-center justify-center shadow-lg border-4 border-white ${
                    isFirst
                      ? "h-12 w-12 md:h-14 md:w-14 rounded-full bg-black"
                      : "h-16 w-8 md:h-20 md:w-9 rounded-full"
                  }`}
                  style={!isFirst ? { backgroundColor: timeline.color } : {}}
                  aria-hidden
                >
                  <span className="text-white font-bold text-md md:text-lg leading-none">
                    {timeline.index}
                  </span>
                </div>
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </main>
  );
}
