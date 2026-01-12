"use client";
import { AHARAI_MAIN_SITE_URL } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-24 scroll-mt-24 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#0f2b2d] via-[#071819] to-[#051112]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Text Content */}
          <div className="space-y-8 text-left">
            <div className="space-y-3">
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  Powered by Israel's <br />
                  Leading Youth Organization
                </h2>
                
                {/* --- הוספנו את הנתון של 389 קבוצות כאן --- */}
                <h3 className="text-2xl md:text-3xl font-bold text-[#fcd839] leading-tight">
                  74,000 Alumni. 389&nbsp;Youth&nbsp;Groups. <br />
                  144 Municipalities. 29 Years of Impact.
                </h3>
            </div>
            
            <div className="space-y-4 text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
              <p>
                We offer a <span className="text-white font-bold">full life-cycle of leadership</span>: 
                From High School Prep and Gap Year Mechinot, to Soldier Support and career placement.
                We don't just run programs; we build resilience for life.
              </p>
              
              <p>
                Now, <strong className="text-[#fcd839]">Aharai! Boost</strong> brings this unrivaled experience to North American teens, inviting you to join a global family of change-makers.
              </p>
            </div>

            <div className="pt-2">
              <a 
                href={AHARAI_MAIN_SITE_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#fcd839] hover:text-white transition-colors border-b border-[#fcd839] hover:border-white pb-1 font-medium group"
              >
                Visit main website
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Side: YouTube Video */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#fcd839]/10 bg-black/50">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/3C96XwCMuHA?rel=0" 
              title="Aharai Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}