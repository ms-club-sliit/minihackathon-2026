"use client";
import Image from "next/image";
import HackathonImage from "../../../../public/images/2025-images/hero-image-up.png";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="container mx-auto px-6 sm:px-12 lg:px-16">
      <div className="relative w-full flex flex-col lg:flex-row items-center justify-between min-h-[600px] rounded-[40px] py-12 px-8 lg:px-16 overflow-hidden my-12 lg:my-20 bg-[#222222]">
        {/* Left Section */}
        <div className="relative z-20 text-left max-w-2xl flex flex-col gap-5">
          {/* Badge */}
          <div className="inline-block">
            <span className="px-4 py-1 bg-gray-600 text-white text-sm font-semibold rounded-lg">
              MINIHACKATHON 2025
            </span>
          </div>

          {/* Headlines */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            IT&apos;S HACKATHON TIME!
          </h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white leading-none tracking-tight">
            ARE YOU READY?
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 font-medium leading-relaxed">
            Showcase Your Creativity And Technical Skills In Our Tech
            Competition!
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              className="px-6 py-3 bg-white text-black font-semibold text-lg rounded-lg hover:bg-gray-200 transition-all"
              onClick={() => router.push("/register")}
            >
              Register
            </button>
            <button
              className="px-6 py-3 border border-white text-white font-semibold text-lg rounded-lg hover:bg-white hover:text-black transition-all"
              onClick={() => router.push("/rules")}
            >
              Get Full Instruction →
            </button>
          </div>
        </div>

        {/* Right Side Image with Previous Animation */}
        <div className="absolute -bottom-8 lg:-bottom-12 right-0 lg:right-12 w-[50%] lg:w-[38%] opacity-80 transform hover:scale-105 transition-transform duration-700 ease-out">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#]/10 to-transparent blur-3xl"></div>
            <div className="flex justify-end">
              <Image
                src={HackathonImage}
                alt="Hackathon Elements"
                className="w-3/4 h-auto object-contain relative z-10 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
