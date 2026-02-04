import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import en from "@/lib/i18n/en.json";
import SonnerToaster from "@/components/ui/SonnerToaster";
import AccessibilityWidget from "@/components/ui/AccessibilityWidget";
import { LanguageProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/react"; // <-- הייבוא החדש של הסטטיסטיקות

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {/* עטפנו את הכל ב-Provider כדי שהעברית תעבוד בכל האתר */}
        <LanguageProvider>
          {children}
          <SonnerToaster />
          <AccessibilityWidget />
          <Analytics /> {/* <-- הרכיב שאוסף את הנתונים */}
        </LanguageProvider>
      </body>
    </html>
  );
}