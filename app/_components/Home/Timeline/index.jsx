"use client";
import { useEffect, useRef, useState } from "react";
import TimelineData from "@/app/data/Timeline.json";
import SectionHeader from "@/components/section header";

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
      typeof globalThis.window !== "undefined" &&
      globalThis.window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop =
      typeof globalThis.window !== "undefined" &&
      globalThis.window.matchMedia("(min-width: 768px)").matches;

    if (reduce || !isDesktop) {
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const onEnter = () => {
      if (timerRef.current) globalThis.clearTimeout(timerRef.current);
      timerRef.current = globalThis.setTimeout(() => setShown(true), delay);
    };

    const onExit = () => {
      if (timerRef.current) globalThis.clearTimeout(timerRef.current);
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
      if (timerRef.current) globalThis.clearTimeout(timerRef.current);
      io.disconnect();
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${className} md:transition-all md:duration-700 md:ease-out md:will-change-transform ${
        shown
          ? "md:opacity-100 md:translate-y-0"
          : "md:opacity-0 md:translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

export default function Timeline() {
  const lastIndex = TimelineData.length;

  return (
    <section id="timeline" className="relative w-full overflow-hidden">

      <div className="flex flex-col md:flex-row min-h-screen w-full">

        {/* ── LEFT PANEL ── */}
        <div className="relative md:w-[45%] min-h-[60vh] md:min-h-screen flex flex-col overflow-hidden">

          {/* SectionHeader badge + headline */}
          <div className="relative z-10 pt-8 pb-4" style={{ marginLeft: "100px" }}>
            <SectionHeader title="Timeline" className="mb-5" />
            <h2 className="font-slogan text-7xl md:text-8xl leading-[1.05] font-bold mt-4">
              The Road To
              <br />
              <span className="font-slogan italic" style={{ color: "#2E47FF" }}>
                VICTORY.
              </span>
            </h2>
          </div>

          {/* Steve Jobs image — fills remaining height, cropped */}
          <div className="relative flex-1 min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/2026-images/steve_jobs.png"
              alt="Steve Jobs"
              draggable={false}
              style={{
                width: "90%",
                height: "90%",
                objectFit: "cover",
                objectPosition: "top center",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* ── RIGHT PANEL — Timeline list ── */}
        <div className="md:w-[55%] py-10 pl-4 pr-8 flex flex-col justify-center">
          <div className="relative">
            {/* Vertical connecting line */}
            <div
              aria-hidden
              className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gray-300/70"
            />

            {TimelineData.map((item) => {
              const isLast = item.index === lastIndex;

              return (
                <RevealOnScroll
                  key={item.index}
                  delay={(item.index - 1) * 80}
                  className="relative flex gap-4 mb-10 last:mb-0"
                >
                  {/* Marker */}
                  <div className="relative z-10 flex-shrink-0">
                    {isLast ? (
                      <div className="h-10 w-10 rounded-full bg-green-500 border-[3px] border-white shadow-md flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div
                        className="h-10 w-10 rounded-full border-[3px] border-white shadow-md flex items-center justify-center"
                        style={{ backgroundColor: "#1a1a2e" }}
                      >
                        <span className="font-slogan text-white text-sm font-bold leading-none">
                          {item.index}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="pt-1">
                    <p
                      className="font-slogan text-sm mb-1 uppercase tracking-widest font-medium"
                      style={{ color: "#000000" }}
                    >
                      {item.date}
                    </p>
                    <h3
                      className="font-slogan text-xl font-bold mb-1.5 leading-snug"
                      style={{ color: "#000000" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="font-slogan text-base leading-relaxed font-normal"
                      style={{ color: "#000000" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
