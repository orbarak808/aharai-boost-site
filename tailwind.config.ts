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
        'brand-red': '#951744',
        'brand-forest': '#00504a',
        'brand-gold': '#fcd839',
        'brand-navy': '#17365e',
        'ui-cream': '#e0ebd3',
        'ui-sage': '#b8c6b1',
        'ui-night': '#071819',
        'ui-sky': '#59a7d1',
        'hero-overlay-start': '#0a2e1e',
        'hero-overlay-end': '#4a1220',
        'brand-deep-forest': '#0a1f1c',
      },
    },
  },
  plugins: [],
}
export default config

