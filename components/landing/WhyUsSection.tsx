"use client";
import { Mountain, GraduationCap, Scroll, HeartHandshake } from 'lucide-react';

const features = [
  {
    title: "Epic Nature & Outdoors",
    description: "Explore Israel's stunning landscapes through unforgettable adventures.",
    icon: Mountain,
  },
  {
    title: "Practical Leadership Training",
    description: "Develop real-world leadership skills through hands-on challenges.",
    icon: GraduationCap,
  },
  {
    title: "Immersive Culture & Heritage",
    description: "Connect deeply with Jewish history and Israeli culture.",
    icon: Scroll,
  },
  {
    title: "Meaningful Social Impact",
    description: "Make a real difference by volunteering with local communities.",
    icon: HeartHandshake,
  }
];

export default function WhyUsSection() {
  return (
    <section id="spirit" className="w-full py-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#0f172a] to-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            The 'Aharai!' Spirit:
            <br />
            <span className="text-[#fcd839]">The Ultimate Summer Adventure.</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Disconnect from screens, reconnect to potential. 100% Fun. 100% Meaning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-[#fcd839]/50 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-6 p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-[#fcd839] group-hover:text-[#fcd839] transition-colors">
                <item.icon className="w-8 h-8 text-white group-hover:text-[#fcd839]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}