"use client";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/useI18n";
import { LeadFormSchema, type LeadFormParsed } from "@/lib/leads/schema";
import { toast } from "sonner";
import { submitLead } from "@/app/actions/submitLead";
import { AsYouType } from "libphonenumber-js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type LeadFormState = {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  state: string;
  /** Honeypot (bots fill it). */
  website: string;
};

type FieldErrors = Partial<Record<keyof LeadFormState, string>>;

export default function CTASection() {
  const { m } = useI18n();
  const [formData, setFormData] = useState<LeadFormState>({
    fullName: "",
    email: "",
    phone: "+1 ",
    age: "",
    state: "",
    website: ""
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isSubmitting = status === "submitting";
  const canSubmit = useMemo(() => !isSubmitting, [isSubmitting]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

    const parsed = LeadFormSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const nextErrors: FieldErrors = {};
      (Object.keys(fieldErrors) as Array<keyof LeadFormState>).forEach((k) => {
        const msg = fieldErrors[k]?.[0];
        if (msg) nextErrors[k] = msg;
      });
      setErrors(nextErrors);
      setStatus("error");
      toast.error(
        m.cta.errorAlert ?? "Something went wrong. Please try again."
      );
      return;
    }

    try {
      setStatus("submitting");
      const res = await submitLead(formData);

      if (!res.ok) {
        if (res.error === "validation") {
          const nextErrors: FieldErrors = {};
          (Object.keys(res.fieldErrors) as Array<keyof LeadFormState>).forEach(
            (k) => {
              const msg = res.fieldErrors[k]?.[0];
              if (msg) nextErrors[k] = msg;
            }
          );
          setErrors(nextErrors);
          setStatus("error");
          toast.error(
            m.cta.errorAlert ?? "Something went wrong. Please try again."
          );
          return;
        }

        setSubmitError(
          m.cta.errorAlert ?? "Something went wrong. Please try again."
        );
        setStatus("error");
        toast.error(
          m.cta.errorAlert ?? "Something went wrong. Please try again."
        );
        return;
      }

      // Success (even if email fails, lead is saved)
      setStatus("success");
      toast.success(
        m.cta.successAlert ?? "Thank you! We will be in touch soon."
      );
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        age: "",
        state: "",
        website: ""
      });
      setErrors({});
    } catch {
      setSubmitError(
        m.cta.errorAlert ?? "Something went wrong. Please try again."
      );
      setStatus("error");
      toast.error(
        m.cta.errorAlert ?? "Something went wrong. Please try again."
      );
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
          {/* Honeypot field (hidden from humans) */}
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
              {errors.fullName ? (
                <p className='mt-1 text-sm text-red-300'>{errors.fullName}</p>
              ) : null}
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
              {errors.email ? (
                <p className='mt-1 text-sm text-red-300'>{errors.email}</p>
              ) : null}
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
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
              {errors.phone ? (
                <p className='mt-1 text-sm text-red-300'>{errors.phone}</p>
              ) : null}
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
              {errors.age ? (
                <p className='mt-1 text-sm text-red-300'>{errors.age}</p>
              ) : null}
            </div>
            <div className='text-left'>
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
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state ? (
                <p className='mt-1 text-sm text-red-300'>{errors.state}</p>
              ) : null}
            </div>
          </div>
          {submitError ? (
            <p className='text-sm text-red-300'>{submitError}</p>
          ) : null}
          {/* Success is shown via toast */}

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
