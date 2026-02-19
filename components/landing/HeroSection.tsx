"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/useI18n";
import { Typewriter } from "@/components/ui/typewriter";

export default function HeroSection() {
  const { m } = useI18n();
  const videoUrl = "https://iuotyzullakoanfcinic.supabase.co/storage/v1/object/public/assets/HeroLP.mp4";

  return (
    <section className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#0f172a] pt-28 pb-16 md:py-0">
      
      {/* --- 1. שכבת הוידאו --- */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* --- 2. שכבת ה-Overlay --- */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-[#1a4d2e]/80 to-[#450a0a]/70 mix-blend-multiply" />

      {/* --- 3. התוכן --- */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        
        {/* === התוספת: כפתור הפניה לוובינר === */}
        <Link 
          href="#webinar" 
          className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm md:text-base font-medium transition-all backdrop-blur-md shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
          Free Live Webinar | March 8th, 8:00 PM (ET) <ArrowRight className="w-4 h-4" />
        </Link>
        {/* ======================================= */}

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-lg max-w-6xl mx-auto">
          {m.hero.titleLines[0]} {m.hero.titleLines[1]}
        </h1>
        
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#fcd839] mb-6 drop-shadow-md">
          <Typewriter speed={85} startDelay={350}>
            {m.hero.tagline}
          </Typewriter>
        </h2>
        
        <div className="space-y-2 mb-8 text-base sm:text-lg md:text-xl text-gray-100 max-w-3xl mx-auto font-medium drop-shadow">
          {m.hero.descriptionLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        {/* --- המידע המעודכן --- */}
        <div className="flex flex-col items-center space-y-2 mb-10">
            {/* שורת התאריכים */}
            <p className="font-bold text-white tracking-wide uppercase text-sm md:text-base drop-shadow-md">
              6 WEEKS | JULY 1ST - AUGUST 10TH
            </p>
            {/* שורת קהל היעד - עודכן עם Juniors ('27) */}
            <p className="text-[#fcd839] font-bold text-lg sm:text-xl tracking-tight drop-shadow-md">
              Open to High School Juniors ('27), Seniors ('26) & College Freshmen
            </p>
        </div>

        <Link 
          href="#apply"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#be123c] hover:bg-[#9f1239] text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          {m.hero.cta} <ArrowRight className="w-5 h-5" />
        </Link>

      </div>
    </section>
  );
}