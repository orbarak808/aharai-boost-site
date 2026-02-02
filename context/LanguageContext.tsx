"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "he";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  direction: "ltr" | "rtl";
  t: typeof import("../lib/translations").translations.en;
}

// ייבוא המילון
import { translations } from "@/lib/translations";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "en" ? "he" : "en"));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const direction = language === "he" ? "rtl" : "ltr";
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, direction, t }}>
      <div dir={direction} className={language === "he" ? "font-sans" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}