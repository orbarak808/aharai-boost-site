"use client";
import { User, Map, Shield, Flame, Mic, Rocket } from 'lucide-react';

const weeks = [
  {
    week: "WEEK 1",
    title: "The Foundation",
    description: "Strangers become family. Building the 'tribe' through trust, team challenges, and creating a home base.",
    icon: User,
  },
  {
    week: "WEEK 2",
    title: "The Land",
    description: "Forget the bus window. We explore Israel's raw beauty and human mosaic through our feet, meeting the people who make this country beat.",
    icon: Map,
  },
  {
    week: "WEEK 3",
    title: "The Spirit",
    description: "An immersive IDF experience. Understanding the values, the ethics, and the responsibility of defending a home. No filters.",
    icon: Shield,
  },
  {
    week: "WEEK 4",
    title: "The Grit",
    description: "Resilience Week. Survival skills, field navigation, and physical challenges designed to prove: You are stronger than you think.",
    icon: Flame,
  },
  {
    week: "WEEK 5",
    title: "The Voice",
    description: "Leadership & Advocacy. Master the art of storytelling. Learn to lead conversations and represent your truth with confidence.",
    icon: Mic,
  },
  {
    week: "WEEK 6",
    title: "The Launchpad",
    description: "Processing the journey and packing the mental tools you'll need for campus life and beyond.",
    icon: Rocket,
  }
];

export default function ProgramTimeline() {
  return (
    <section className="w-full py-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0d2621] via-[#040f0d] to-[#000000]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Journey: From Tourist to Leader
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            6 weeks designed to challenge, connect, and build you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {weeks.map((item, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:-translate-y-2 hover:border-brand-gold/30 hover:shadow-2xl hover:shadow-brand-gold/10"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}