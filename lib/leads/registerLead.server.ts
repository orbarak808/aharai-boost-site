import "server-only";
import { LeadPayloadSchema, type LeadInsert, type LeadPayload } from "./schema";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { sendLeadWelcomeEmail } from "@/lib/email/sendLeadWelcomeEmail";

// טיפוס התשובה
export type RegisterLeadResult =
  | { ok: true; saved: true; emailSent: boolean }
  | { ok: true; saved: false; emailSent: false } 
  | { ok: false; error: "validation"; fieldErrors: Record<string, string[]> }
  | { ok: false; error: "db" | "unknown" };

export async function registerLeadFromPayload(payload: LeadPayload) {
  // בדיקת בוטים (Honeypot)
  if (payload.website && payload.website.trim().length > 0) {
    // הוספנו as const גם כאן ליתר ביטחון
    return { ok: true as const, saved: false as const, emailSent: false };
  }

  const supabase = getSupabaseAdmin();
  
  // === יצירת האובייקט לשמירה ב-Supabase ===
  const leadData: LeadInsert = {
    full_name: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    age: payload.age,
    country: payload.country,
    state: payload.state,
    city: payload.city,
    referral_source: payload.source,     
    message: payload.personal_message,   
  };

  // 1. שמירה ב-Supabase
  const { error } = await supabase.from("leads").insert(leadData);
  
  if (error) {
    console.error("Supabase Insert Error:", error);
    throw new Error("db");
  }

  // 2. שליחת המייל
  let emailSent = false;
  try {
    const res = await sendLeadWelcomeEmail({
      to: payload.email,
      fullName: payload.fullName,
      phone: payload.phone,
      age: payload.age,
      location: `${payload.city || ''}, ${payload.state || ''} ${payload.country || ''}`,
      source: payload.source,
      message: payload.personal_message
    });
    emailSent = res.sent;
  } catch (e) {
    console.error("Email Sending Error:", e);
  }

  // === התיקון הקריטי כאן ===
  // השימוש ב-as const אומר ל-TypeScript: "אני מבטיח שזה true ולא סתם boolean"
  return { ok: true as const, saved: true as const, emailSent };
}

// פונקציית העטיפה
export async function registerLeadFromUnknown(input: unknown): Promise<RegisterLeadResult> {
  const parsed = LeadPayloadSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "validation", fieldErrors: parsed.error.flatten().fieldErrors };
  }
  try {
    // @ts-ignore
    return await registerLeadFromPayload(parsed.data);
  } catch (e: any) {
    if (e.message === "db") return { ok: false, error: "db" };
    return { ok: false, error: "unknown" };
  }
}