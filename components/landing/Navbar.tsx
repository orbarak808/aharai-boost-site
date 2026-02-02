"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Instagram, Mail, Globe } from 'lucide-react'; // הוספתי אייקון גלובוס
import { motion, AnimatePresence } from 'framer-motion';
import { OUR_INSTAGRAM, getEmailLink } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext"; // <-- שימוש במנוע החדש שלנו

export default function Navbar() {
  // חיבור ל"מוח" שבנינו
  const { language, toggleLanguage, t } = useLanguage();
  
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // הקישורים לוקחים עכשיו את הטקסט מהמילון
  const navLinks = [
    { name: t.nav.spirit, href: "/#spirit" },
    { name: t.nav.journey, href: "/#journey" },
    { name: t.nav.safety, href: "/#safety" },
    { name: t.nav.about, href: "/#about" }
  ];

  const socialLinks = {
    instagram: OUR_INSTAGRAM,
    mail: getEmailLink()
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-md py-2 border-b border-white/10' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center relative">
        
        {/* 1. לוגו */}
        <Link href="/" className="relative z-10 flex items-center">
          <Image 
            src="/Transparent2.png" 
            alt="Aharai Boost Logo" 
            width={300}
            height={150}
            className="w-auto h-16 sm:h-20 md:h-28 lg:h-36 object-contain transition-all duration-300"
            priority
          />
        </Link>

        {/* 2. תפריט דסקטופ (ימין) */}
        <div className="hidden md:flex items-center gap-4 z-10">
          
          {/* כפתור החלפת שפה */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-white hover:text-[#fcd839] transition-colors font-medium text-sm mr-2"
          >
            <Globe className="w-4 h-4" />
            {language === 'en' ? 'עברית' : 'English'}
          </button>

          {/* קישור FAQ */}
          <Link 
            href="/faq" 
            className="text-white font-bold hover:text-[#fcd839] transition-colors mr-2 text-sm tracking-wide"
          >
            {t.nav.faq}
          </Link>

          {/* אייקונים חברתיים */}
          <div className="flex items-center gap-3 border-l border-white/20 pl-4 border-r pr-4 mr-1">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#fcd839] transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.mail}
              className="text-white hover:text-[#fcd839] transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* כפתור הרשמה */}
          <Link 
            href="/#apply"
            className="px-6 py-2.5 bg-[#fcd839] hover:bg-white text-black font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(252,216,57,0.5)]"
          >
            {t.nav.apply}
          </Link>
        </div>

        {/* כפתור המבורגר למובייל */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-10 text-white p-2"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* תפריט מובייל נפתח */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-b border-white/10 py-8 md:hidden shadow-2xl"
          >
            <div className="flex flex-col items-center gap-6">
              
              {/* החלפת שפה במובייל */}
              <button 
                onClick={() => {
                    toggleLanguage();
                    setIsOpen(false);
                }}
                className="flex items-center gap-2 text-xl font-bold text-[#fcd839] border border-[#fcd839]/30 px-4 py-1 rounded-full mb-2"
              >
                <Globe className="w-5 h-5" />
                {language === 'en' ? 'עבור לעברית' : 'Switch to English'}
              </button>

              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold text-white hover:text-[#fcd839] transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <Link 
                href="/faq"
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold text-white hover:text-[#fcd839] transition-colors"
              >
                {t.nav.faq}
              </Link>

              <hr className="w-1/3 border-white/10 my-2" />

              <div className="flex items-center gap-6 mb-2">
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-full text-white hover:text-[#fcd839] transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href={socialLinks.mail}
                  className="p-3 bg-white/10 rounded-full text-white hover:text-[#fcd839] transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
              
              <Link 
                href="/#apply"
                onClick={() => setIsOpen(false)}
                className="mt-2 px-8 py-3 bg-[#fcd839] text-black font-bold rounded-full text-xl hover:bg-white transition-all w-3/4 text-center"
              >
                {t.nav.apply}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}