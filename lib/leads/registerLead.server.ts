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

export async function registerLeadFromPayload(payload: LeadPayload): Promise<RegisterLeadResult> {
  
  // --- בדיקת בוטים (מנוטרלת זמנית לבדיקה) ---
  /*
  if (payload.website && payload.website.trim().length > 0) {
    return { ok: true as const, saved: false as const, emailSent: false };
  }
  */

  const supabase = getSupabaseAdmin();
  
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

  // 2. שליחת המייל (עם מעקב שגיאות מחמיר)
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
    
    if (!res.sent) {
       // אם המייל חזר עם תשובה שלילית מהשרת
       throw new Error(`Email provider failed to send: ${JSON.stringify(res)}`);
    }

    return { ok: true as const, saved: true as const, emailSent: true };

  } catch (e: any) {
    // הדפסה מפורטת ללוגים של Vercel
    console.error("!!! CRITICAL EMAIL ERROR !!!", {
      message: e.message,
      stack: e.stack,
      env_user: process.env.GMAIL_USER ? "Defined" : "MISSING",
      env_pass: process.env.GMAIL_APP_PASSWORD ? "Defined" : "MISSING"
    });
    
    // זריקת השגיאה הלאה כדי שוורסל יציג "Error 500" והלוג יהיה אדום
    throw e; 
  }
}

export async function registerLeadFromUnknown(input: unknown): Promise<RegisterLeadResult> {
  const parsed = LeadPayloadSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "validation", fieldErrors: parsed.error.flatten().fieldErrors };
  }
  try {
    return await registerLeadFromPayload(parsed.data);
  } catch (e: any) {
    console.error("Error in registerLeadFromUnknown:", e);
    if (e.message === "db") return { ok: false, error: "db" };
    // אנחנו מחזירים unknown כדי שהמשתמש יראה הודעת שגיאה במקום "הצלחה" שקרית
    return { ok: false, error: "unknown" };
  }
}