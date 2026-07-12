import CountdownTimer from "./_components/Home/CountdownTimer";
import Eligibility from "./_components/Home/Eligibility";
import Gallery from "./_components/Home/Gallery";
import Hero from "./_components/Home/Hero";
import PastWinnersList from "../components/Home/PastWinner";
import Sponsor from "@/components/Home/Sponsors";
import Timeline from "./_components/Home/Timeline";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent">

      {/* ================= BACKGROUND BLOBS ================= */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -left-36 -bottom-20 h-[300px] w-[300px] md:h-[520px] md:w-[520px] rounded-full bg-violet-600/75 blur-[100px] md:blur-[170px]" />
        <div className="absolute -right-40 -top-32 h-[350px] w-[350px] md:h-[560px] md:w-[560px] rounded-full bg-emerald-500/70 blur-[110px] md:blur-[180px]" />
        <div className="absolute left-[42%] top-[28%] h-[200px] w-[200px] md:h-[360px] md:w-[360px] rounded-full bg-sky-500/65 blur-[90px] md:blur-[150px]" />
        <div className="absolute left-[12%] top-[18%] h-[150px] w-[150px] md:h-[250px] md:w-[250px] rounded-full bg-fuchsia-500/50 blur-[80px] md:blur-[130px]" />
        <div className="absolute right-[14%] bottom-[8%] h-[160px] w-[160px] md:h-[260px] md:w-[260px] rounded-full bg-lime-400/50 blur-[80px] md:blur-[130px]" />
      </div>

      {/* ================= PAGE SECTIONS ================= */}
      {/* Added relative z-10 to ensure content sections sit properly on top of background layers */}
      <div className="relative z-10">
        <section id="Hero">
          <Hero />
        </section>
        <section id="Timeline" className="scroll-mt-20">
          <CountdownTimer />
          <Timeline />
        </section>
        <section id="Eligibility">
          <Eligibility />
        </section>
        <section id="Gallery">
          <Gallery />
        </section>
        <section id="Sponsor">
          <Sponsor />
        </section>
        <section id="PastWinnersList">
          <PastWinnersList />
        </section>
      </div>
    </main>
  );
}