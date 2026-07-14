"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import galleryJson from "@/app/data/home/gallery.json";
import SectionHeader from "@/components/section header";

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
        <SectionHeader title="Gallery" className="mb-0" />
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
