import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-32 space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-[#fcd839]">Privacy Policy</h1>
        <p className="text-sm text-gray-500">Last Updated: January 2026</p>
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to <strong>Aharai! Boost</strong>. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (aharai.org.il) and tell you about your privacy rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. The Data We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Identity Data:</strong> includes first name, last name, and age.</li>
              <li><strong>Contact Data:</strong> includes email address, telephone number, and address.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>To process your application for the Aharai! Boost program.</li>
              <li>To manage our relationship with you.</li>
              <li>To improve our website and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at: <br />
              <a href="mailto:boost.america@aharai.org.il" className="text-[#fcd839] hover:underline">boost.america@aharai.org.il</a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}