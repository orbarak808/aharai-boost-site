"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/useI18n";
import { Typewriter } from "@/components/ui/typewriter";

export default function HeroSection() {
  const { m } = useI18n();
  // הלינק לסרטון שלך מ-Supabase
  const videoUrl = "https://iuotyzullakoanfcinic.supabase.co/storage/v1/object/public/assets/HeroLP.mp4";

  return (
    <section className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#0f172a] pt-28 pb-16 md:py-0">
      
      {/* --- 1. שכבת הוידאו (במקום תמונת הרקע) --- */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        // טיפ: כדאי להוסיף כאן poster="/hero-bg.jpg" כדי למנוע הבהוב בטעינה ראשונית
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* --- 2. שכבת ה-Overlay (הגרדיאנט של המותג) --- */}
      {/* הורדתי מעט את האטימות (מ-90 ל-80/70) כדי שיראו את הוידאו דרך הצבעים */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-[#1a4d2e]/80 to-[#450a0a]/70 mix-blend-multiply" />

      {/* --- 3. התוכן (נשאר בדיוק כמו ששלחת לי) --- */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-lg max-w-6xl mx-auto">
          {/* השינוי כאן: מחקנו את <br /> ושמנו רווח פשוט בין שני החלקים */}
          {m.hero.titleLines[0]} {m.hero.titleLines[1]}
        </h1>
        
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#fcd839] mb-6 drop-shadow-md">
          {/* התיקון: מחקנו את המילה blinkCursor מתוך התגית למטה */}
          <Typewriter speed={85} startDelay={350}>
            {m.hero.tagline}
          </Typewriter>
        </h2>
        
        <div className="space-y-2 mb-8 text-base sm:text-lg md:text-xl text-gray-100 max-w-3xl mx-auto font-medium drop-shadow">
          {m.hero.descriptionLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <p className="font-bold text-white mb-10 tracking-wide uppercase text-sm md:text-base drop-shadow-md">
          {m.hero.metaLine}
        </p>

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