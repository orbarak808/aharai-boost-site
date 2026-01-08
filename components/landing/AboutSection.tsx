"use client";
import { AHARAI_MAIN_SITE_URL } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/useI18n";

export default function AboutSection() {
  const { m } = useI18n();
  return (
    <section id="about" className="w-full py-24 scroll-mt-24 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#1c1917] via-[#0c0a09] to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Text Content */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {m.about.headingLine1} <br />
              <span className="text-[#fcd839]">{m.about.headingHighlight}</span>
            </h2>
            
            <div className="space-y-6 text-base sm:text-lg text-gray-300 leading-relaxed">
              <p>
                {m.about.paragraph1.beforeStrong}
                <strong className="text-white">{m.about.paragraph1.strong}</strong>
                {m.about.paragraph1.afterStrong}
              </p>
              <p>
                {m.about.paragraph2.beforeHighlight}
                <strong className="text-[#fcd839]">{m.about.paragraph2.highlight}</strong>
                {m.about.paragraph2.afterHighlight}
              </p>
              <p>{m.about.paragraph3}</p>
            </div>

            <div className="pt-4">
              <a 
                href={AHARAI_MAIN_SITE_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#fcd839] hover:text-white transition-colors border-b border-[#fcd839] hover:border-white pb-1 font-medium"
              >
                {m.about.linkText}
              </a>
            </div>
          </div>

          {/* Right Side: YouTube Video */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#fcd839]/10 bg-black/50">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/3C96XwCMuHA" 
              title={m.about.videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}