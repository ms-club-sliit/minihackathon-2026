import CountdownTimer from "./_components/Home/CountdownTimer";
import Eligibility from "./_components/Home/Eligibility";
import Gallery from "./_components/Home/Gallery";
import Hero from "./_components/Home/Hero";
import PastWinnersList from "../components/Home/PastWinner";
import Sponsor from "@/components/Home/Sponsors";
import Timeline from "./_components/Home/Timeline";
import ChatBot from "@/components/Chatbot/Chatbot";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent">
      <Hero />
      <CountdownTimer />
      <Eligibility />
      <Timeline />
      <Gallery />
      <Sponsor />
      <PastWinnersList />
      <ChatBot />
    </main>
  );
}