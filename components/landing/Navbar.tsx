"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Instagram, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OUR_INSTAGRAM, getEmailLink } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/useI18n";

export default function Navbar() {
  const { m } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: m.navbar.links.spirit, href: "#spirit" },
    { name: m.navbar.links.journey, href: "#journey" },
    { name: m.navbar.links.safety, href: "#safety" },
    { name: m.navbar.links.about, href: "#about" }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center relative"> {/* הוספנו relative כדי שהמרכוז יעבוד */}
        
        {/* 1. צד שמאל: לוגו */}
        <Link href="/" className="relative z-10 flex items-center">
          <Image 
            src="/Transparent2.png" 
            alt={m.navbar.logoAlt} 
            width={220}
            height={90}
            className="w-auto h-14 sm:h-16 md:h-24 object-contain"
            priority
          />
        </Link>

        {/* 2. מרכז: תפריט ניווט (ממורכז אבסולוטית) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-white font-medium hover:text-[#fcd839] transition-colors relative group py-2 whitespace-nowrap"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#fcd839] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* 3. צד ימין: אייקונים וכפתור */}
        <div className="hidden md:flex items-center gap-4 z-10">
          {/* Social Icons */}
          <div className="flex items-center gap-3 border-r border-white/20 pr-4 mr-1">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#fcd839] transition-colors"
              aria-label={m.navbar.aria.instagram}
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.mail}
              className="text-white hover:text-[#fcd839] transition-colors"
              aria-label={m.navbar.aria.email}
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Apply Button */}
          <Link 
            href="#apply"
            className="px-6 py-2.5 bg-[#fcd839] hover:bg-white text-black font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(252,216,57,0.5)]"
          >
            {m.navbar.applyNow}
          </Link>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-10 text-white p-2"
          aria-label={m.navbar.aria.toggleMenu}
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
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

              <hr className="w-1/3 border-white/10 my-2" />

              <div className="flex items-center gap-6 mb-2">
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-full text-white hover:text-[#fcd839] transition-colors"
                  aria-label={m.navbar.aria.instagram}
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href={socialLinks.mail}
                  className="p-3 bg-white/10 rounded-full text-white hover:text-[#fcd839] transition-colors"
                  aria-label={m.navbar.aria.email}
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
              
              <Link 
                href="#apply"
                onClick={() => setIsOpen(false)}
                className="mt-2 px-8 py-3 bg-[#fcd839] text-black font-bold rounded-full text-xl hover:bg-white transition-all w-3/4 text-center"
              >
                {m.navbar.applyNow}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}