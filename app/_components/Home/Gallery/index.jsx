"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import galleryJson from "@/app/data/home/gallery.json";

export default function Gallery() {
  const defaultWidth = 480;
  const defaultHeight = 320;

  const [imageSize, setImageSize] = useState({
    width: defaultWidth,
    height: defaultHeight,
  });

  const updateImageSize = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth < 768) {
      setImageSize({
        width: windowWidth * 0.5,
        height: (windowWidth * 0.5 * defaultHeight) / defaultWidth,
      });
    } else if (windowWidth < 1024) {
      setImageSize({
        width: windowWidth * 0.6,
        height: (windowWidth * 0.6 * defaultHeight) / defaultWidth,
      });
    } else {
      setImageSize({ width: defaultWidth, height: defaultHeight });
    }
  };

  useEffect(() => {
    updateImageSize();
    window.addEventListener("resize", updateImageSize);

    return () => {
      window.removeEventListener("resize", updateImageSize);
    };
  }, []);

  return (
    <main id="gallery">
      <div className="container mx-auto">
        {/* box + fading bars; base font-size drives every em unit so the
            whole badge scales fluidly between ~40px and 60px tall */}
        <div
          className="inline-flex items-stretch gap-[0.6em] h-[6em]"
          style={{ fontSize: "clamp(6.7px, 0.365vw + 5.33px, 10px)" }}
        >
          <div className="flex items-center bg-[#3B3EF2] px-[3em] overflow-hidden">
            <span
              className="text-white text-[5.2em] leading-none translate-y-[2px]"
              style={{
                fontFamily: "'Open Sans Condensed', sans-serif",
                fontWeight: 300,
                WebkitTextStroke: "0.6px white",
              }}
            >
              Gallery
            </span>
          </div>
          <div className="flex items-stretch" aria-hidden="true">
            <i className="block w-[1.8em] mr-[0.4em] bg-[#3B3EF2]" />
            <i className="block w-[1.1em] mr-[0.4em] bg-[#3B3EF2]" />
            <i className="block w-[1em] mr-[0.3em] bg-[#3B3EF2]" />
            <i className="block w-[0.5em] mr-[0.3em] bg-[#3B3EF2]" />
            <i className="block w-[0.1em] min-w-[1px] bg-[#3B3EF2]" />
          </div>
        </div>
      </div>

      <div className="gallery space-y-8 pt-8 md:pt-10 pb-8 md:pb-16 container block mx-auto overflow-x-hidden">
        <div className="flex overflow-hidden rounded-3xl">
          <Marquee gradient={false} speed={40} direction="left">
            {galleryJson.row1 &&
              galleryJson.row1.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt="slider-img"
                  className="mr-4 rounded-3xl"
                  width={imageSize.width}
                  height={imageSize.height}
                />
              ))}
          </Marquee>
        </div>
        <div className="flex overflow-hidden rounded-3xl">
          <Marquee gradient={false} speed={40} direction="right">
            {galleryJson.row2 &&
              galleryJson.row2.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt="slider-img"
                  className="mr-4 rounded-3xl"
                  width={imageSize.width}
                  height={imageSize.height}
                />
              ))}
          </Marquee>
        </div>
        <div className="flex overflow-hidden rounded-3xl">
          <Marquee gradient={false} speed={40} direction="left">
            {galleryJson.row3 &&
              galleryJson.row3.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt="slider-img"
                  className="mr-4 rounded-3xl"
                  width={imageSize.width}
                  height={imageSize.height}
                />
              ))}
          </Marquee>
        </div>
      </div>
    </main>
  );
}
