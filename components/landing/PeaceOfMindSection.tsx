"use client";

import { Shield, Users, Utensils } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safety First",
    description: "24/7 situation room and comprehensive safety protocols.",
  },
  {
    icon: Users,
    title: "Our Team",
    description: "Israel's finest youth leaders and mentors.",
  },
  {
    icon: Utensils,
    title: "The Full Package",
    description: "Kosher food, logistics, and all accommodations included.",
  },
];

export default function PeaceOfMindSection() {
  return (
    <section className="w-full bg-ui-cream py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-forest text-center mb-12 sm:mb-16">
          Uncompromising Standards of Safety & Quality
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-lg text-center"
              >
                <div className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center mb-6 mx-auto">
                  <IconComponent className="w-8 h-8 text-brand-red" />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-brand-forest mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-base sm:text-lg text-ui-night leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

