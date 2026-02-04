"use client";
import { Users, Flag, HeartHandshake, Globe } from 'lucide-react';
import { useI18n } from "@/lib/i18n/useI18n";
import { AnimatedText } from "@/components/ui/animated-text";

const icons = [Users, Flag, HeartHandshake, Globe];

export default function WhyUsSection() {
  const { m } = useI18n();

  const features = [
    {
      title: "Uniting Diverse Worlds",
      description: "Connect with peers from every sector of Israeli society: Secular, Haredi, periphery, and center. One shared story.",
      icon: Users
    },
    {
      title: "A Culture of \"After Me!\"",
      description: "It’s not just a name; it’s a mindset. We train you to step up when others step back and lead by example.",
      icon: Flag
    },
    {
      title: "A Home for Everyone",
      // --- התיקון כאן ---
      description: "We bring together youth from every corner of society! Here, labels disappear, and you become part of one shared family.",
      icon: HeartHandshake
    },
    {
      title: "Shaping the Future",
      description: "Don't just visit Israel, impact it. Join the Founding Cohort and become an active partner in shaping the Jewish future.",
      icon: Globe
    }
  ];
  return (
    <section id="spirit" className="w-full py-24 scroll-mt-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#0f172a] to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* כותרת ראשית */}
        <div className="text-center mb-16">
          <AnimatedText variant="slide-up" duration={900}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              The 'Aharai!' Spirit: <br />
              <span className="text-[#fcd839]">The Ultimate Summer Adventure.</span>
            </h2>
          </AnimatedText>

          <AnimatedText variant="slide-up" delay={120} duration={900}>
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-lg text-gray-300">
                Disconnect from screens, reconnect to potential.
              </p>
              
              {/* השינוי: הקטנו את הפונט ל-text-xl md:text-2xl כדי שייכנס בשורה אחת יפה */}
              <p className="text-xl md:text-2xl font-bold text-[#fcd839] leading-relaxed">
                Join the mindset that has led Israeli youth for 29 years.
              </p>
            </div>
          </AnimatedText>
        </div>

        {/* גריד הכרטיסיות */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((item, index) => (
            <AnimatedText key={index} variant="slide-up" delay={index * 90} duration={900}>
              <div className="h-full flex flex-col group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-[#fcd839]/50 transition-all duration-300 flex flex-col items-center text-center shadow-lg">
                
                <div className="mb-6 p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-[#fcd839] group-hover:text-[#fcd839] transition-colors duration-300">
                  <item.icon className="w-8 h-8 text-white group-hover:text-[#fcd839] transition-colors" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#fcd839] transition-colors">
                    {item.title}
                </h3>
                
                <div className="flex-1 flex items-start justify-center w-full mt-1">
                  <p className="text-gray-300 group-hover:text-gray-100 transition-colors text-center text-lg leading-relaxed">
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