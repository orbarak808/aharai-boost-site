"use client";

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-24 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#1c1917] via-[#0c0a09] to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Text Content */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Powered by Israel’s <br />
              <span className="text-[#fcd839]">Leading Youth Organization</span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                For 29 years, <strong className="text-white">Aharai!</strong> has led Israeli youth to peaks of 
                leadership and social impact in 144 municipalities across the country.
              </p>
              <p>
                We serve more than <strong className="text-[#fcd839]">10,000 youth group participants</strong> every year.
              </p>
              <p>
                Now, we are bringing our experience, heart, and professionalism to the Diaspora youth, 
                to build the next generation of Jewish leadership - together.
              </p>
            </div>

            <div className="pt-4">
              <a 
                href="https://aharai.org.il/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#fcd839] hover:text-white transition-colors border-b border-[#fcd839] hover:border-white pb-1 font-medium"
              >
                Visit main website (aharai.org.il) &rarr;
              </a>
            </div>
          </div>

          {/* Right Side: YouTube Video */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#fcd839]/10 bg-black/50">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/3C96XwCMuHA" 
              title="Aharai Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}