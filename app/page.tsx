import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import WhyUsSection from "@/components/landing/WhyUsSection";
import ProgramTimeline from "@/components/landing/ProgramTimeline";
import SafetySection from "@/components/landing/SafetySection";
import AboutSection from "@/components/landing/AboutSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://aharai.org.il"
  ),
  title: "Aharai Boost — The Summer of a Lifetime",
  description:
    "Join the Founding Cohort of Aharai Boost: a 6-week journey in Israel blending epic travel with deep leadership training.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  openGraph: {
    title: "Aharai Boost — The Summer of a Lifetime",
    description:
      "Apply for the Founding Cohort (Summer 2026). A journey of resilience, identity, and unforgettable bonds.",
    type: "website",
    url: "/",
    siteName: "Aharai Boost",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Aharai Boost"
      }
    ]
  },
  twitter: {
    card: "summary",
    title: "Aharai Boost — The Summer of a Lifetime",
    description:
      "Apply for the Founding Cohort (Summer 2026). A journey of resilience, identity, and unforgettable bonds.",
    images: ["/icon.png"]
  }
};

export default function Home() {
  return (
    <main className='min-h-screen bg-aharai-cream text-aharai-dark selection:bg-aharai-yellow selection:text-aharai-dark'>
      <Navbar />
      <HeroSection />

      <AboutSection />

      <WhyUsSection />

      <ProgramTimeline />

      <SafetySection />

      <ContactSection />
      
      {/* זהו! מחקנו את ה-FAQ מכאן סופית */}
      
      <Footer />
    </main>
  );
}