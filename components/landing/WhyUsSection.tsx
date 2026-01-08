"use client";
import { Mountain, GraduationCap, Scroll, HeartHandshake } from 'lucide-react';
import { useI18n } from "@/lib/i18n/useI18n";
import { AnimatedText } from "@/components/ui/animated-text";

const icons = [Mountain, GraduationCap, Scroll, HeartHandshake];

export default function WhyUsSection() {
  const { m } = useI18n();

  const features = m.whyUs.features.map((item, index) => ({
    ...item,
    icon: icons[index],
  }));

  return (
    <section id="spirit" className="w-full py-24 scroll-mt-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#0f172a] to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <AnimatedText variant="slide-up" duration={900}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              {m.whyUs.headingLine1}
              <br />
              <span className="text-[#fcd839]">{m.whyUs.headingHighlight}</span>
            </h2>
          </AnimatedText>
          <AnimatedText variant="slide-up" delay={120} duration={900}>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {m.whyUs.subheading}
            </p>
          </AnimatedText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((item, index) => (
            <AnimatedText key={index} variant="slide-up" delay={index * 90} duration={900}>
              <div className="group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-[#fcd839]/50 transition-all duration-300 flex flex-col items-center text-center">
                <div className="mb-6 p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-[#fcd839] group-hover:text-[#fcd839] transition-colors">
                  <item.icon className="w-8 h-8 text-white group-hover:text-[#fcd839]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
                  {item.description}
                </p>
              </div>
            </AnimatedText>
          ))}
        </div>
      </div>
    </section>
  );
}