"use server";

import { LeadFormSchema, type LeadInsert } from "@/lib/leads/schema";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { sendLeadWelcomeEmail } from "@/lib/email/sendLeadWelcomeEmail";

export type SubmitLeadResult =
  | { ok: true; saved: true; emailSent: boolean }
  | { ok: true; saved: false; emailSent: false } // honeypot
  | { ok: false; error: "validation"; fieldErrors: Record<string, string[]> }
  | { ok: false; error: "db" | "unknown" };

type LeadFormInput = {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  state: string;
  website?: string;
};

export async function submitLead(
  input: LeadFormInput
): Promise<SubmitLeadResult> {
  try {
    const parsed = LeadFormSchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        error: "validation",
        fieldErrors: parsed.error.flatten().fieldErrors
      };
    }

    // Honeypot (bots). Pretend success to avoid giving signals.
    if (parsed.data.website && parsed.data.website.trim().length > 0) {
      return { ok: true, saved: false, emailSent: false };
    }

    const supabase = getSupabaseAdmin();
    const lead: LeadInsert = {
      full_name: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      age: parsed.data.age,
      state: parsed.data.state,
      source: "website"
    };

    const { error } = await supabase.from("leads").insert(lead);
    if (error) return { ok: false, error: "db" };

    let emailSent = false;
    try {
      const res = await sendLeadWelcomeEmail({
        to: parsed.data.email,
        fullName: parsed.data.fullName
      });
      emailSent = res.sent;
    } catch {
      emailSent = false;
    }

    return { ok: true, saved: true, emailSent };
  } catch {
    return { ok: false, error: "unknown" };
  }
}
