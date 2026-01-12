import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Aharai! 2023 Brand Palette ---
        'aharai-red': '#951744',      // הבורדו החזק
        'aharai-blue': '#59a7d1',     // התכלת (היה חסר קודם)
        'aharai-cream': '#e0ebd3',    // צבע שמנת/חול (מעולה לרקעים בהירים)
        'aharai-stone': '#596b6b',    // אפור-ירוק כהה (היה חסר!)
        'aharai-dark': '#071819',     // השחור-ירקרק העמוק (הרקע הנוכחי)
        'aharai-sage': '#b8c6b1',     // ירוק מרווה בהיר
        'aharai-forest': '#00504a',   // ירוק יער כהה
        'aharai-yellow': '#fcd839',   // הצהוב המוכר (כפתורים)
        'aharai-navy': '#17365e',     // כחול עמוק
        
        // --- Aliases (שמות לשימוש שוטף כדי לא לשבור את האתר) ---
        'brand-gold': '#fcd839',      // שומרים על זה כדי שהכפתורים לא ייעלמו
        'ui-night': '#071819',        // שומרים על זה לרקע הכהה
      },
    },
  },
  plugins: [],
}
export default config