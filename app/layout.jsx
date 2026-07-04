import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
//
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
//
export const metadata = {
  title: "Mini Hackathon 2025",
  description: "MS Club Mini Hackathon 2025",
};
//
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-56">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0"
        />
      </head>
      <body className={poppins.className}>
        <Header />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
