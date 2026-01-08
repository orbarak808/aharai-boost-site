"use client";
import { User, Map, Shield, Flame, Mic, Rocket } from 'lucide-react';
import { useI18n } from "@/lib/i18n/useI18n";
import { AnimatedText } from "@/components/ui/animated-text";

const icons = [User, Map, Shield, Flame, Mic, Rocket];

export default function ProgramTimeline() {
  const { m } = useI18n();

  const weeks = m.programTimeline.weeks.map((item, index) => ({
    ...item,
    icon: icons[index],
  }));

  return (
    <section id="journey" className="w-full py-24 scroll-mt-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0d2621] via-[#040f0d] to-[#000000]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <AnimatedText variant="slide-up" duration={900}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {m.programTimeline.heading}
            </h2>
          </AnimatedText>
          <AnimatedText variant="slide-up" delay={120} duration={900}>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {m.programTimeline.subheading}
            </p>
          </AnimatedText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {weeks.map((item, index) => (
            <AnimatedText key={index} variant="slide-up" delay={index * 80} duration={900}>
              <div className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:-translate-y-2 hover:border-brand-gold/30 hover:shadow-2xl hover:shadow-brand-gold/10">
                <div className="mb-6 p-3 rounded-full bg-white/5 w-fit border border-white/10 group-hover:border-brand-gold/50 group-hover:text-[#fcd839] transition-colors">
                  <item.icon className="w-8 h-8 text-white group-hover:text-[#fcd839] transition-colors" />
                </div>

                <div className="space-y-2">
                  <span className="text-[#fcd839] text-xs font-bold tracking-widest uppercase">{item.week}</span>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#fcd839] transition-colors">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimatedText>
          ))}
        </div>
      </div>
    </section>
  );
}