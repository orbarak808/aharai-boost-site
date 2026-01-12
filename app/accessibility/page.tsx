import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-32 space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-[#fcd839]">Accessibility Statement</h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>
            At <strong>Aharai! Boost</strong>, we are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8">Conformance Status</h2>
          <p>
            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. 
            Aharai! Boost is partially conformant with WCAG 2.1 level AA.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8">Feedback</h2>
          <p>
            We welcome your feedback on the accessibility of Aharai! Boost. Please let us know if you encounter accessibility barriers on Aharai! Boost:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              E-mail: <a href="mailto:boost.america@aharai.org.il" className="hover:text-[#fcd839] transition-colors">boost.america@aharai.org.il</a>
            </li>
            <li>
              Instagram: <a href="https://instagram.com/aharai.america" target="_blank" rel="noopener noreferrer" className="hover:text-[#fcd839] transition-colors">@aharai.america</a>
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </main>
  );
}