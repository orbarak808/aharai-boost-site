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

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!domain) return "***";
  const safeName = name.length <= 2 ? `${name}***` : `${name.slice(0, 2)}***`;
  return `${safeName}@${domain}`;
}

function errInfo(e: unknown) {
  if (e instanceof Error) {
    return {
      message: e.message,
      stack: process.env.NODE_ENV === "production" ? undefined : e.stack
    };
  }
  return { message: String(e) };
}

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
  if (error) {
    console.error("[leads] insert failed", {
      email: maskEmail(payload.email),
      code: (error as any).code,
      message: (error as any).message,
      details: (error as any).details,
      hint: (error as any).hint
    });
    throw new Error("db");
  }

  let emailSent = false;
  try {
    const res = await sendLeadWelcomeEmail({
      to: payload.email,
      fullName: payload.fullName
    });
    emailSent = res.sent;
    if (!emailSent) {
      console.error("[leads] welcome email not sent (returned sent:false)", {
        email: maskEmail(payload.email)
      });
    }
  } catch (e) {
    console.error("[leads] welcome email send threw", {
      email: maskEmail(payload.email),
      error: errInfo(e)
    });
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
      console.warn("[leads] validation failed", {
        fieldErrors: parsed.error.flatten().fieldErrors
      });
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
      console.error("[leads] unknown error", { error: errInfo(e) });
      return { ok: false, error: "unknown" };
    }
  } catch (e) {
    console.error("[leads] unexpected top-level error", { error: errInfo(e) });
    return { ok: false, error: "unknown" };
  }
}
