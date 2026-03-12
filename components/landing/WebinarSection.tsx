export default function WebinarSection() {
    return (
      <section id="webinar" className="bg-[#00504a] py-24 px-6 border-y border-[#fcd839]/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#fcd839] mb-6">
            Resilience in Crisis
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Join a powerful live conversation with Israeli youth. <br className="hidden md:block" /> 
            Discover the strength behind the headlines.
          </p>
          
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl">
            <p className="text-[#fcd839] font-bold mb-4 uppercase tracking-widest text-sm">Next Session</p>
            <h3 className="text-2xl text-white font-bold mb-8">Sunday, March 22nd | 1:00 PM (ET)</h3>
            
            {/* הכפתור הרשמי של לומה */}
            <a 
              href="https://lu.ma/event/evt-ZyZ4Tv5uVY76nrG" 
              className="luma-checkout--button inline-flex items-center gap-3 px-10 py-5 bg-[#fcd839] hover:bg-[#eab308] text-[#00504a] text-xl font-bold rounded-xl transition-all shadow-xl hover:-translate-y-1"
              data-luma-action="checkout"
              data-luma-event-id="evt-ZyZ4Tv5uVY76nrG"
            >
              Register Now
            </a>
            
            <p className="text-white/60 text-sm mt-6">
              Free registration. Link will be sent upon approval.
            </p>
          </div>
        </div>
      </section>
    );
  }