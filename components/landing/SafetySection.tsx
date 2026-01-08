"use client";
import { ShieldCheck, Users, Utensils } from 'lucide-react';
import { useI18n } from "@/lib/i18n/useI18n";

export default function SafetySection() {
  const icons = [ShieldCheck, Users, Utensils];
  const { m } = useI18n();

  const cards = m.safety.cards.map((card, index) => ({
    ...card,
    icon: icons[index],
  }));

  return (
    <section id="safety" className="w-full py-24 scroll-mt-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e293b] via-[#0f172a] to-[#020617]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
          {m.safety.headingPrefix} <span className="text-[#fcd839]">{m.safety.headingHighlight}</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div key={card.title} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="mb-6 p-4 mx-auto w-fit rounded-full bg-[#fcd839]/10 text-[#fcd839]">
                <card.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-gray-400">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}