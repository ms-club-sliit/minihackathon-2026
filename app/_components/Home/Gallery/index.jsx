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
      <div className="flex items-center w-full justify-center">
        <div className="hidden md:block w-1/4 h-0.5 bg-gray-200 mr-4" />
        <div className="bg-gray-800 px-6 py-2 rounded-full shadow text-white text-xl sm:text-2xl font-semibold">
          Gallery
        </div>
        <div className="hidden md:block w-1/4 h-0.5 bg-gray-200 ml-4" />
      </div>

      <div className="gallery space-y-4 py-8 md:py-16 container block mx-auto overflow-x-hidden">
        <div className="flex overflow-x-hidden">
          <Marquee gradient={false} speed={40} direction="left">
            {galleryJson.row1 &&
              galleryJson.row1.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt="slider-img"
                  className="pr-4 rounded-3xl"
                  width={imageSize.width}
                  height={imageSize.height}
                />
              ))}
          </Marquee>
        </div>
        <div className="flex overflow-x-hidden">
          <Marquee gradient={false} speed={40} direction="right">
            {galleryJson.row2 &&
              galleryJson.row2.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt="slider-img"
                  className="pr-4 rounded-3xl"
                  width={imageSize.width}
                  height={imageSize.height}
                />
              ))}
          </Marquee>
        </div>
        <div className="flex overflow-x-hidden">
          <Marquee gradient={false} speed={40} direction="left">
            {galleryJson.row3 &&
              galleryJson.row3.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt="slider-img"
                  className="pr-4 rounded-3xl"
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
