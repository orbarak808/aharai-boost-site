"use client";

import { Mountain, GraduationCap, Landmark, HeartHandshake } from "lucide-react";
import { useI18n } from "@/lib/i18n/useI18n";

const icons = [Mountain, GraduationCap, Landmark, HeartHandshake];

export default function HighlightsSection() {
  const { m } = useI18n();

  const highlights = m.highlights.items.map((item, index) => ({
    ...item,
    icon: icons[index],
  }));

  return (
    <section className="w-full py-20 lg:py-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#102a3a] via-[#06161c] to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {highlights.map((highlight) => {
            const IconComponent = highlight.icon;
            return (
              <div
                key={highlight.title}
                className="group rounded-2xl p-6 text-center bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-[#fcd839]/40 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-[#fcd839]/10 border border-white/10 group-hover:border-[#fcd839]/50 flex items-center justify-center mb-4 mx-auto transition-colors">
                  <IconComponent className="w-7 h-7 text-white group-hover:text-[#fcd839] transition-colors" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                  {highlight.title}
                </h3>
                
                <p className="text-sm sm:text-base text-gray-300 group-hover:text-gray-100 leading-relaxed transition-colors">
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

