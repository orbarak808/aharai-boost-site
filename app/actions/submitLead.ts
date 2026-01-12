"use server";

import { LeadFormSchema } from "@/lib/leads/schema";
import {
  registerLeadFromPayload,
  type RegisterLeadResult
} from "@/lib/leads/registerLead.server";

export type SubmitLeadResult =
  | RegisterLeadResult
  | { ok: false; error: "validation"; fieldErrors: Record<string, string[]> };

export async function submitLead(
  input: any // השתמשנו ב-any זמנית כדי למנוע בעיות של Type מול הטופס
): Promise<SubmitLeadResult> {
  console.log("🚀 Server Action Triggered with input:", input);
  
  try {
    const parsed = LeadFormSchema.safeParse(input);
    if (!parsed.success) {
      console.log("❌ Validation failed:", parsed.error.flatten().fieldErrors);
      return {
        ok: false,
        error: "validation",
        fieldErrors: parsed.error.flatten().fieldErrors
      };
    }

    console.log("✅ Validation passed, calling registerLeadFromPayload...");
    const result = await registerLeadFromPayload(parsed.data);
    console.log("🏁 Final result from server:", result);
    return result;
    
  } catch (error) {
    console.error("🔥 CRITICAL ACTION ERROR:", error);
    return { ok: false, error: "unknown" };
  }
}