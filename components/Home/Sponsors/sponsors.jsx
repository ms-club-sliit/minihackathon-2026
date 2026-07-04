import Image from "next/image";
import sponsor from "@/app/data/home/sponsors.json";

// Use transparent sponsor logos for best effect
// executing code
const Sponsors = () => {

  const sponsor = []

  if (!sponsor) {
    return null;
  }
  return (
    <div className="relative text-center py-8">
      {Object.keys(sponsor).map((index) => (
        <div className="py-5 lg:py-10" key={index}>
          <h2 className="text-3xl lg:text-5xl font-bold">{index}</h2>
          <div className="flex flex-row justify-center py-8 bg-sponsors-bg bg-cover bg-center overflow-hidden">
            {sponsor[index] &&
              sponsor[index].length > 0 &&
              sponsor[index].map((Sponsor) => (
                <div key={index} className="items-center mx-4">
                  <Image
                    className="rounded-xl w-[150px]"
                    src={Sponsor.src || "/images/home/sponsors/default.webp"}
                    alt={Sponsor.alt || "Image Not Found"}
                    width={Sponsor.width || 300}
                    height={Sponsor.height || 300}
                  />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sponsors;
