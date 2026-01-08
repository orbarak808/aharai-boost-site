import { z } from "zod";

/**
 * Client-side form schema (age is captured as a string input).
 * Parsed output has `age: number`.
 */
export const LeadFormSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(80),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().min(6, "Phone is required").max(30),
  age: z
    .string()
    .trim()
    .min(1, "Age is required")
    .refine((v) => /^\d+$/.test(v), "Age must be a number")
    .transform((v) => Number(v))
    .refine((n) => Number.isInteger(n), "Age must be a whole number")
    .refine((n) => n >= 14 && n <= 99, "Age must be between 14 and 99"),
  state: z.string().trim().min(2, "State is required").max(50),
  /** Honeypot (bots fill it). Keep empty. */
  website: z.string().optional().default("")
});

export type LeadFormParsed = z.infer<typeof LeadFormSchema>;

/**
 * Server/API payload schema (age arrives as a number).
 */
export const LeadPayloadSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().min(6).max(30),
  age: z.number().int().min(14).max(99),
  state: z.string().trim().min(2).max(50),
  website: z.string().optional().default("")
});

export type LeadPayload = z.infer<typeof LeadPayloadSchema>;

export type LeadInsert = {
  full_name: string;
  email: string;
  phone: string;
  age: number;
  state: string;
  source: "website";
};
