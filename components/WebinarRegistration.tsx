"use client";
import Script from "next/script";

export default function WebinarRegistration() {
  return (
    <section className="w-full py-20 flex flex-col items-center justify-center bg-transparent">
      <div className="max-w-3xl w-full px-4 text-center">
        
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          Join Our Exclusive Info Webinar
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Aharai!'s proven leadership and resilience tools are coming to North America. Secure your spot today.
        </p>

        {/* הכפתור שיפתח את הפופ-אפ של Luma */}
        <a
          href="https://luma.com/event/evt-toFMRTHsfJcLYHY"
          className="luma-checkout--button inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-[#be123c] rounded-xl hover:bg-[#9f1239] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          data-luma-action="checkout"
          data-luma-event-id="evt-toFMRTHsfJcLYHY"
        >
          Register for the Webinar
        </a>

        {/* הסקריפט הרשמי של Luma שגורם לכפתור לפתוח פופ-אפ */}
        <Script 
          id="luma-checkout" 
          src="https://embed.lu.ma/checkout-button.js" 
          strategy="lazyOnload" 
        />

      </div>
    </section>
  );
}