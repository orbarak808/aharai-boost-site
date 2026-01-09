"use client";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/useI18n";
import { LeadFormSchema } from "@/lib/leads/schema"; // הורדתי את ה-Type המיותר
import { toast } from "sonner";
import { AsYouType } from "libphonenumber-js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// הגדרת ה-Type המקומי עם שמות זהים ל-DB
type LeadFormState = {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  country: string;        // תואם ל-DB
  state: string;          // תואם ל-DB
  source: string;         // תואם ל-DB
  personal_message: string; // תואם ל-DB (עם קו תחתון)
  website: string;        // Honeypot
};

// רשימת מקורות הגעה
const SOURCES = [
  "Instagram",
  "Facebook",
  "Google Search",
  "Friend / Family",
  "Community Center",
  "Other"
];

async function registerLead(payload: any) {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const json = await res.json().catch(() => null);
  if (!json || typeof json.ok !== "boolean") {
    return { ok: false, error: "unknown" };
  }
  return json;
}

export default function CTASection() {
  const { m } = useI18n();
  
  const [formData, setFormData] = useState<LeadFormState>({
    fullName: "",
    email: "",
    phone: "+1 ",
    age: "",
    country: "",
    state: "",
    source: "",
    personal_message: "",
    website: ""
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isSubmitting = status === "submitting";
  const canSubmit = useMemo(() => !isSubmitting, [isSubmitting]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, "");
    const national = digits.startsWith("1") ? digits.slice(1) : digits;
    const limited = national.slice(0, 10);
    const formatted =
      limited.length === 0 ? "+1 " : new AsYouType("US").input(`+1${limited}`);
    const next = formatted === "+1" ? "+1 " : formatted;
    setErrors((prev) => ({ ...prev, phone: undefined }));
    setFormData((prev) => ({ ...prev, phone: next }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setStatus("idle");

    // === התיקון: אנחנו בודקים עכשיו את כל האובייקט המלא ===
    const parsed = LeadFormSchema.safeParse({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        state: formData.state,
        website: formData.website,
        // הוספנו את השדות החדשים לבדיקה כדי שלא ניכשל בולידציה
        country: formData.country,
        source: formData.source,
        personal_message: formData.personal_message
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const nextErrors: any = {};
      Object.keys(fieldErrors).forEach((k) => {
        const msg = fieldErrors[k as keyof typeof fieldErrors]?.[0];
        if (msg) nextErrors[k] = msg;
      });
      setErrors(nextErrors);
      setStatus("error");
      
      // הדפסה לקונסול כדי שתדע בדיוק איזה שדה חסר
      console.log("Validation Failed:", fieldErrors);
      
      toast.error(m.cta.errorAlert ?? "Something went wrong. Please check the form.");
      return;
    }

    try {
      setStatus("submitting");
      
      // אין צורך לבנות fullPayload מחדש, יש לנו את parsed.data
      const res = await registerLead(parsed.data);

      if (!res.ok) {
        setSubmitError(m.cta.errorAlert ?? "Something went wrong.");
        setStatus("error");
        toast.error(m.cta.errorAlert ?? "Something went wrong.");
        return;
      }

      // הצלחה!
      setStatus("success");
      toast.success(m.cta.successAlert ?? "Thank you! We will be in touch soon.");
      
      setFormData({
        fullName: "",
        email: "",
        phone: "+1 ",
        age: "",
        country: "",
        state: "",
        source: "",
        personal_message: "",
        website: ""
      });
      setErrors({});
    } catch {
      setSubmitError(m.cta.errorAlert ?? "Connection error.");
      setStatus("error");
      toast.error(m.cta.errorAlert ?? "Connection error.");
    }
  };

  return (
    <section
      id='apply'
      className='w-full py-24 scroll-mt-24 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#3f0a0f] via-[#1a0204] to-black'
    >
      <div className='max-w-4xl mx-auto px-4 sm:px-6 text-center'>
        <h2 className='text-4xl md:text-5xl font-bold text-white mb-6 leading-tight'>
          {m.cta.heading}
        </h2>
        <p className='text-xl md:text-2xl text-[#fcd839] font-medium mb-12'>
          {m.cta.subheading}
        </p>

        <form onSubmit={handleSubmit} className='max-w-2xl mx-auto space-y-4'>
          {/* Honeypot field */}
          <div className='hidden' aria-hidden='true'>
            <label>
              Website
              <input
                type='text'
                name='website'
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete='off'
              />
            </label>
          </div>

          {/* שורה 1: שם ואימייל */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='text-left'>
              <Input
                type='text'
                name='fullName'
                value={formData.fullName}
                placeholder={m.cta.form.placeholders.fullName}
                onChange={handleChange}
                autoComplete='name'
                required
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName ? <p className='mt-1 text-sm text-red-300'>{errors.fullName}</p> : null}
            </div>
            <div className='text-left'>
              <Input
                type='email'
                name='email'
                value={formData.email}
                placeholder={m.cta.form.placeholders.email}
                onChange={handleChange}
                autoComplete='email'
                required
                aria-invalid={!!errors.email}
              />
              {errors.email ? <p className='mt-1 text-sm text-red-300'>{errors.email}</p> : null}
            </div>
          </div>

          {/* שורה 2: טלפון וגיל */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='text-left'>
              <Input
                type='tel'
                name='phone'
                value={formData.phone}
                placeholder={m.cta.form.placeholders.phone}
                onChange={handlePhoneChange}
                inputMode='tel'
                autoComplete='tel'
                required
                aria-invalid={!!errors.phone}
              />
              {errors.phone ? <p className='mt-1 text-sm text-red-300'>{errors.phone}</p> : null}
            </div>
            <div className='text-left'>
              <Input
                type='number'
                name='age'
                value={formData.age}
                placeholder={m.cta.form.placeholders.age}
                onChange={handleChange}
                inputMode='numeric'
                autoComplete='age'
                required
                aria-invalid={!!errors.age}
              />
              {errors.age ? <p className='mt-1 text-sm text-red-300'>{errors.age}</p> : null}
            </div>
          </div>

          {/* שורה 3: מדינה ומיקום ספציפי */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='text-left'>
              <Select
                value={formData.country}
                onValueChange={(value) => {
                  setErrors((prev) => ({ ...prev, country: undefined }));
                  setFormData((prev) => ({ ...prev, country: value, state: "" }));
                }}
              >
                <SelectTrigger className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USA">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="Israel">Israel</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='text-left'>
               {formData.country === 'USA' ? (
                  <Select
                    value={formData.state}
                    onValueChange={(value) => {
                      setErrors((prev) => ({ ...prev, state: undefined }));
                      setFormData((prev) => ({ ...prev, state: value }));
                    }}
                  >
                    <SelectTrigger aria-invalid={!!errors.state}>
                      <SelectValue placeholder={m.cta.form.placeholders.state} />
                    </SelectTrigger>
                    <SelectContent>
                      {m.usStates.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
               ) : (
                  <Input
                    type='text'
                    name='state'
                    value={formData.state}
                    placeholder={formData.country === 'Israel' ? "City (e.g. Tel Aviv)" : "City / Region"}
                    onChange={handleChange}
                    required={!!formData.country}
                    disabled={!formData.country}
                  />
               )}
              {errors.state ? <p className='mt-1 text-sm text-red-300'>{errors.state}</p> : null}
            </div>
          </div>

          {/* שורה 4: מקור הגעה */}
          <div className='text-left'>
             <Select
                value={formData.source}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, source: value }));
                }}
              >
                <SelectTrigger className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50">
                  <SelectValue placeholder="How did you hear about us?" />
                </SelectTrigger>
                <SelectContent>
                  {SOURCES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
          </div>

          {/* שורה 5: הודעה אישית */}
          <div className='text-left'>
            <textarea
              name="personal_message"
              rows={3}
              value={formData.personal_message}
              onChange={handleChange}
              placeholder="Personal Message (Optional)..."
              className="flex w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#fcd839] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {submitError ? <p className='text-sm text-red-300'>{submitError}</p> : null}

          <button
            type='submit'
            disabled={!canSubmit}
            className='w-full mt-8 py-4 px-8 rounded-lg bg-[#fcd839] hover:bg-white disabled:opacity-60 disabled:hover:bg-[#fcd839] text-black font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2'
          >
            {isSubmitting
              ? m.cta.form.submitting ?? "Submitting..."
              : m.cta.form.submit}{" "}
            <ArrowRight className='w-5 h-5' />
          </button>
        </form>
      </div>
    </section>
  );
}