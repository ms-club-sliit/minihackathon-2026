"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import galleryJson from "@/app/data/home/gallery.json";
import SectionHeader from "@/components/section-header";

export default function Gallery() {
  const renderRow = (images, direction) => (
    <div className="flex overflow-hidden rounded-3xl">
      <Marquee gradient={false} speed={40} direction={direction}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative mr-4 h-[200px] w-[300px] sm:h-[260px] sm:w-[390px] md:h-[320px] md:w-[480px] shrink-0 overflow-hidden rounded-3xl"
          >
            <Image
              src={image}
              alt="slider-img"
              fill
              sizes="(max-width: 768px) 300px, (max-width: 1024px) 390px, 480px"
              className="object-cover"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );

  return (
    <main id="gallery">
      <div className="relative z-10 pt-8 pb-4 px-4 md:pl-[100px] md:pr-8">
        <SectionHeader title="Gallery" className="mb-0" />
      </div>

      <div className="gallery space-y-8 pt-8 md:pt-10 pb-8 md:pb-16 container block mx-auto overflow-x-hidden">
        {galleryJson.row1 && renderRow(galleryJson.row1, "left")}
        {galleryJson.row2 && renderRow(galleryJson.row2, "right")}
        {galleryJson.row3 && renderRow(galleryJson.row3, "left")}
      </div>
    </main>
  );
}