"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0f172a]">
      
      {/* תמונת רקע - הוספנו טשטוש והגדלה קלה */}
      <div 
        className="absolute inset-0 z-0 blur-[3px] scale-110 transform" // <-- הנה הטשטוש
        style={{
          backgroundImage: "url('/hero-bg.jpg')", // וודא שהשם תואם לקובץ שלך ב-public
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* השכבה שיוצרת את הצבע הירוק בצד אחד ואדום בצד שני */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a4d2e]/90 to-[#450a0a]/80 mix-blend-multiply" />
      </div>

      {/* התוכן (לא מטושטש) */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
          The Summer of a <br />
          Lifetime.
        </h1>
        
        <h2 className="text-3xl md:text-5xl font-bold text-[#fcd839] mb-6 drop-shadow-md">
          Body - Mind - Land
        </h2>
        
        <div className="space-y-2 mb-8 text-lg md:text-xl text-gray-100 max-w-3xl mx-auto font-medium drop-shadow">
          <p>
            The ultimate summer experience for those who want more than just a vacation.
          </p>
          <p>
            A journey of resilience, identity, and unforgettable bonds.
          </p>
        </div>

        <p className="font-bold text-white mb-10 tracking-wide uppercase text-sm md:text-base drop-shadow-md">
          6 Weeks | Summer 2026 | North American & Israeli Teens United
        </p>

        <Link 
          href="#apply"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#be123c] hover:bg-[#9f1239] text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          Apply for the Founding Cohort <ArrowRight className="w-5 h-5" />
        </Link>

      </div>
    </section>
  );
}