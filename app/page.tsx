import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import WhyUsSection from "@/components/landing/WhyUsSection";
import ProgramTimeline from "@/components/landing/ProgramTimeline";
import HighlightsSection from "@/components/landing/HighlightsSection";
import SafetySection from "@/components/landing/SafetySection";
import AboutSection from "@/components/landing/AboutSection";
import CTASection from "@/components/landing/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#fcd839] selection:text-black">
      <Navbar />
      <HeroSection />
      
      {/* Anchor IDs for Navigation */}
      <div id="spirit">
        <WhyUsSection />
      </div>
      
      <div id="journey">
        <ProgramTimeline />
      </div>
      
      <div id="safety">
        <SafetySection />
      </div>
      
      <div id="about">
        <AboutSection />
      </div>
      
      <div id="apply">
        <CTASection />
      </div>
    </main>
  );
}