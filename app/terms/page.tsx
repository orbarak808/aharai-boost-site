import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-32 space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-[#fcd839]">Terms of Service</h1>
        <p className="text-sm text-gray-500">Last Updated: January 2026</p>
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing our website and applying to the <strong>Aharai! Boost</strong> program, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Program Eligibility</h2>
            <p>
              The Aharai! Boost program is intended for participants in their <strong>last year of high school or first year of college</strong>. By applying, you confirm that you meet these eligibility requirements and that all information provided in your application is accurate and truthful.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
            <p>
              The content on this website, including text, graphics, logos, and images, is the property of Aharai! and is protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
            <p>
              Aharai! shall not be liable for any indirect, incidental, special, consequential or punitive damages, resulting from your access to or use of, or inability to access or use, the website or program.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Information</h2>
            <p>
              Questions about the Terms of Service should be sent to us at: <br />
              <a href="mailto:boost.america@aharai.org.il" className="text-[#fcd839] hover:underline">boost.america@aharai.org.il</a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}