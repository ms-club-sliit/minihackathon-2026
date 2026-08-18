"use client";

import { useState } from "react";

const topics = [
  "AI & Machine Learning",
  "Web3 & Blockchain",
  "Sustainability Tech",
  "Health Tech",
  "Fintech",
  "EdTech",
  "IoT & Smart Devices",
  "Open Innovation",
];

const colors = [
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#EF4444",
  "#14B8A6",
];

const segmentAngle = 360 / topics.length;

export default function TopicWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  function spin() {
    if (spinning) return;

    setSpinning(true);
    setResult(null);

    const index = Math.floor(Math.random() * topics.length);
    const target = 5 * 360 + (360 - index * segmentAngle - segmentAngle / 2);

    setRotation(rotation + target);

    setTimeout(() => {
      setSpinning(false);
      setResult(topics[index]);
    }, 4000);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <div className="relative w-80 h-80">
        <div className="absolute left-1/2 -translate-x-1/2 -top-3 z-10 w-0 h-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent border-t-red-500" />

        <div
          className="w-full h-full rounded-full shadow-xl border-4 border-white overflow-hidden relative"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
          }}
        >
          {topics.map((topic, i) => (
            <div
              key={topic}
              className="absolute w-1/2 h-1/2 origin-bottom-right flex items-start justify-center"
              style={{
                left: 0,
                top: 0,
                transform: `rotate(${segmentAngle * i}deg)`,
                backgroundColor: colors[i % colors.length],
                clipPath: "polygon(0 0, 100% 0, 0 100%)",
              }}
            >
              <span
                className="text-white text-xs font-semibold mt-4"
                style={{
                  transform: `rotate(${segmentAngle / 2}deg)`,
                  width: "80px",
                  textAlign: "center",
                }}
              >
                {topic}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className="px-6 py-3 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-700 disabled:opacity-50 transition"
      >
        {spinning ? "Spinning..." : "Spin the Wheel"}
      </button>

      {result && !spinning && (
        <div className="text-lg font-semibold text-center">
          Selected topic: <span className="text-indigo-600">{result}</span>
        </div>
      )}
    </div>
  );
}