"use server";

import { LeadFormSchema } from "@/lib/leads/schema";
import {
  registerLeadFromPayload,
  type RegisterLeadResult
} from "@/lib/leads/registerLead.server";

export type SubmitLeadResult =
  | RegisterLeadResult
  | { ok: false; error: "validation"; fieldErrors: Record<string, string[]> };

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

    // parsed.data.age is already transformed to number by LeadFormSchema
    return await registerLeadFromPayload(parsed.data);
  } catch {
    return { ok: false, error: "unknown" };
  }
}
