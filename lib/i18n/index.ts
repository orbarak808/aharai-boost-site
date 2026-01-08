import en from "./en.json";

export const SUPPORTED_LOCALES = ["en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export type Messages = typeof en;

const ALL_MESSAGES: Record<Locale, Messages> = {
  en
};

export function getMessages(locale: Locale = "en"): Messages {
  return ALL_MESSAGES[locale];
}

