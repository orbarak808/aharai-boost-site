import "server-only";

import { LeadPayloadSchema, type LeadInsert, type LeadPayload } from "./schema";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { sendLeadWelcomeEmail } from "@/lib/email/sendLeadWelcomeEmail";

export type RegisterLeadResult =
  | { ok: true; saved: true; emailSent: boolean }
  | { ok: true; saved: false; emailSent: false } // honeypot
  | { ok: false; error: "validation"; fieldErrors: Record<string, string[]> }
  | { ok: false; error: "db" | "unknown" };

type RegisterLeadSuccessResult = Extract<RegisterLeadResult, { ok: true }>;

export async function registerLeadFromPayload(
  payload: LeadPayload
): Promise<RegisterLeadSuccessResult> {
  // Honeypot (bots). Pretend success to avoid giving signals.
  if (payload.website && payload.website.trim().length > 0) {
    return { ok: true, saved: false, emailSent: false };
  }

  const supabase = getSupabaseAdmin();
  const lead: LeadInsert = {
    full_name: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    age: payload.age,
    state: payload.state,
    source: "website"
  };

  const { error } = await supabase.from("leads").insert(lead);
  if (error) throw new Error("db");

  let emailSent = false;
  try {
    const res = await sendLeadWelcomeEmail({
      to: payload.email,
      fullName: payload.fullName
    });
    emailSent = res.sent;
  } catch {
    emailSent = false;
  }

  return { ok: true, saved: true, emailSent };
}

export async function registerLeadFromUnknown(
  input: unknown
): Promise<RegisterLeadResult> {
  try {
    const parsed = LeadPayloadSchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        error: "validation",
        fieldErrors: parsed.error.flatten().fieldErrors
      };
    }

    try {
      return await registerLeadFromPayload(parsed.data);
    } catch (e) {
      if (e instanceof Error && e.message === "db") {
        return { ok: false, error: "db" };
      }
      return { ok: false, error: "unknown" };
    }
  } catch {
    return { ok: false, error: "unknown" };
  }
}
