import Header from "@/components/Header";

export default function HeroHeader({ active = "home" }) {
  return (
    <div className="absolute left-2 right-2 top-2 z-50 md:left-[6.4%] md:right-auto md:top-[5.5vh] md:w-[80%]">
      <Header active={active} />
    </div>
  );
}
