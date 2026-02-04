"use client";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail } from "lucide-react";
import { OUR_INSTAGRAM, getEmailLink } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* שינינו את הגריד: 2 עמודות - אחת גדולה למותג, אחת קטנה למשפטי */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          
          {/* צד שמאל: לוגו ותיאור */}
          <div className="space-y-6 max-w-sm">
            <Link href="/" className="inline-block">
              <Image 
                src="/Transparent2.png" 
                alt="Aharai Boost Logo" 
                width={180} 
                height={60}
                className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              A 6-week journey of resilience, identity, and unforgettable bonds. 
              Join the founding cohort of Aharai Boost and discover your strength.
            </p>
            
            <div className="flex items-center gap-4">
              <a href={OUR_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-[#fcd839] hover:text-black transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={getEmailLink()} className="p-2 bg-white/5 rounded-full hover:bg-[#fcd839] hover:text-black transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* צד ימין: משפטי ונגישות בלבד */}
          <div className="space-y-4 md:text-right">
            <h3 className="text-lg font-bold text-white">Legal & Support</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/accessibility" className="hover:text-[#fcd839] transition-colors">
                    Accessibility Statement
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#fcd839] transition-colors">
                    Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#fcd839] transition-colors">
                    Terms of Service
                </Link>
              </li>
              <li>
                <a href={getEmailLink()} className="hover:text-[#fcd839] transition-colors">
                    Contact Support
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* זכויות יוצרים */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} Aharai! Boost. All rights reserved.</p>
          <p>Built with ❤️ </p>
        </div>
      </div>
    </footer>
  );
}