import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ChatBot from "@/components/Chatbot/Chatbot";
//
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
//
export const metadata = {
  title: "Mini Hackathon 2026",
  description: "MS Club Mini Hackathon 2026",
};
//
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning  className="scroll-smooth scroll-pt-56">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Open+Sans+Condensed:wght@300;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/earlyaccess/opensanshebrewcondensed.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0"
        />
      </head>
      <body className={`${poppins.className} relative min-h-screen bg-transparent`}>
        {/* Global background gradients */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -left-36 -bottom-20 h-[300px] w-[300px] md:h-[520px] md:w-[520px] rounded-full bg-violet-600/75 blur-[100px] md:blur-[170px]" />
          <div className="absolute -right-40 -top-32 h-[350px] w-[350px] md:h-[560px] md:w-[560px] rounded-full bg-emerald-500/70 blur-[110px] md:blur-[180px]" />
          <div className="absolute left-[42%] top-[28%] h-[200px] w-[200px] md:h-[360px] md:w-[360px] rounded-full bg-sky-500/65 blur-[90px] md:blur-[150px]" />
          <div className="absolute left-[12%] top-[18%] h-[150px] w-[150px] md:h-[250px] md:w-[250px] rounded-full bg-fuchsia-500/50 blur-[80px] md:blur-[130px]" />
          <div className="absolute right-[14%] bottom-[8%] h-[160px] w-[160px] md:h-[260px] md:w-[260px] rounded-full bg-lime-400/50 blur-[80px] md:blur-[130px]" />
        </div>

        {/* <Header /> */}
        <div className="relative z-10">{children}</div>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}