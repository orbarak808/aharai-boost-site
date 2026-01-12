import { z } from "zod";

/**
 * Client-side form schema
 */
export const LeadFormSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(80),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().min(6, "Phone is required").max(30),
  
  // תיקון: הסרנו את המגבלות הקשוחות על הגיל (14-99)
  // מקבלים כמחרוזת כדי להיות גמישים, ממירים למספר לצורך בדיקה בסיסית
  age: z.string().trim().min(1, "Age is required"),

  country: z.string().trim().min(1, "Country is required"),
  
  // שדות מיקום
  state: z.string().trim().optional(), // הפכנו לאופציונלי (כי לא לכולם יש State)
  city: z.string().trim().optional(),  // הוספנו את City שהיה חסר!
  
  source: z.string().trim().min(1, "Please select a source"),
  personal_message: z.string().trim().optional().default(""),

  /** Honeypot (bots fill it). Keep empty. */
  website: z.string().optional().default("")
});

export type LeadFormParsed = z.infer<typeof LeadFormSchema>;

/**
 * Server/API payload schema
 */
export const LeadPayloadSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().min(6).max(30),
  
  // כאן אנחנו מאפשרים גם מספר וגם סטרינג, כדי למנוע קריסות
  age: z.union([z.string(), z.number()]).transform(v => String(v)),

  country: z.string().trim().min(1),
  state: z.string().trim().optional(),
  city: z.string().trim().optional(), // הוספנו
  source: z.string().trim().min(1),
  personal_message: z.string().trim().optional().default(""),
  
  website: z.string().optional().default("")
});

export type LeadPayload = z.infer<typeof LeadPayloadSchema>;

// === הטיפוס לשמירה ב-Supabase ===
// חשוב מאוד: המפתחות כאן (צד שמאל) חייבים להיות זהים בול לשמות העמודות בטבלה
export type LeadInsert = {
  full_name: string;
  email: string;
  phone: string;
  age: string;         // ב-DB הגדרנו את זה כ-text
  country: string;
  state?: string;
  city?: string;       // הוספנו
  referral_source: string; // ב-DB קוראים לזה referral_source
  message?: string;    // ב-DB קוראים לזה message
};