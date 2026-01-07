"use client";

import { Mountain, GraduationCap, Landmark, HeartHandshake } from "lucide-react";

const highlights = [
  {
    icon: Mountain,
    title: "Epic Nature & Outdoors",
    description: "Explore Israel's stunning landscapes through unforgettable adventures.",
  },
  {
    icon: GraduationCap,
    title: "Practical Leadership Training",
    description: "Develop real-world leadership skills that last a lifetime.",
  },
  {
    icon: Landmark,
    title: "Immersive Culture & Heritage",
    description: "Connect deeply with Jewish history and Israeli culture.",
  },
  {
    icon: HeartHandshake,
    title: "Meaningful Social Impact",
    description: "Make a difference in local communities during your journey.",
  },
];

export default function HighlightsSection() {
  return (
    <section className="w-full bg-ui-sage py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {highlights.map((highlight) => {
            const IconComponent = highlight.icon;
            return (
              <div
                key={highlight.title}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-brand-gold/20 flex items-center justify-center mb-4 mx-auto">
                  <IconComponent className="w-7 h-7 text-brand-forest" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-brand-forest mb-3">
                  {highlight.title}
                </h3>
                
                <p className="text-sm sm:text-base text-ui-night leading-relaxed">
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

