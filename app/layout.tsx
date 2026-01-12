import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import en from "@/lib/i18n/en.json";
import SonnerToaster from "@/components/ui/SonnerToaster";
import AccessibilityWidget from "@/components/ui/AccessibilityWidget"; // <-- הוספנו את זה

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
        {children}
        <SonnerToaster />
        <AccessibilityWidget /> {/* <-- הוספנו את זה כאן */}
      </body>
    </html>
  );
}