export default function WebinarSection() {
    return (
      <section id="webinar" className="bg-[#00504a] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#fcd839] mb-4">
              Resilience in Crisis
            </h2>
            <p className="text-lg text-white/90">
              Join the conversation with Israeli youth. Secure your spot below.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[650px] border-4 border-[#fcd839]/20">
            <iframe
              src="https://lu.ma/checkout/evt-ZyZ4Tv5uVY76nrG"
              width="100%"
              height="650"
              frameBorder="0"
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            ></iframe>
          </div>
        </div>
      </section>
    );
  }