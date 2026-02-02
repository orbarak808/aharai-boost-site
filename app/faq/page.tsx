import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import FaqSection from "@/components/landing/FaqSection";

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-aharai-cream text-aharai-dark">
      <Navbar />
      
      {/* הוספתי ריפוד עליון כדי שהתוכן לא יתחבא מתחת לבר העליון */}
      <div className="pt-24 pb-12 min-h-[80vh] flex flex-col justify-center">
        <FaqSection />
      </div>

      <Footer />
    </main>
  );
}