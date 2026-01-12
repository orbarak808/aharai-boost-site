"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/useI18n";
// שינינו את השם מ-supabase ל-supabaseClient
import { submitLead } from "@/app/actions/submitLead";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

export default function ContactSection() {
  const { m } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // רשימת מדינות ארה"ב
  const usStates = m.usStates || [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", 
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", 
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", 
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    country: "",
    state: "",
    city: "",
    referralSource: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // במקום לפנות ישירות ל-Supabase, אנחנו פונים ל-Action שלנו
      const result = await submitLead({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        source: formData.referralSource,
        personal_message: formData.message
      });

      if (!result.ok) {
        throw new Error(result.error === "validation" ? "Please check your details" : "Server error");
      }

      toast.success("Application sent successfully! We'll be in touch soon.");
      
      // איפוס הטופס
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        age: "",
        country: "",
        state: "",
        city: "",
        referralSource: "",
        message: ""
      });

    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isUS = formData.country === "US";

  return (
    <section id="apply" className="w-full py-16 sm:py-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a0a10] via-[#1a0505] to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Space is limited for the Founding <br />
            Cohort (Summer 2026).
          </h2>
          <p className="text-lg sm:text-xl text-[#fcd839] font-medium">
            Don't wait. Interviews for the program are starting soon.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto">
          
          {/* שורה 1: שם מלא + אימייל */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-[#fcd839] focus:ring-1 focus:ring-[#fcd839] outline-none transition-all disabled:opacity-50"
                placeholder="Full Name"
              />
            </div>
            <div className="space-y-1">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-[#fcd839] focus:ring-1 focus:ring-[#fcd839] outline-none transition-all disabled:opacity-50"
                placeholder="Email Address"
              />
            </div>
          </div>

          {/* שורה 2: טלפון + גיל */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-[#fcd839] focus:ring-1 focus:ring-[#fcd839] outline-none transition-all disabled:opacity-50"
                placeholder="Phone"
              />
            </div>
            <div>
              {/* תיקון: הסרנו את ה-min וה-max כדי לאפשר כל גיל */}
              <input
                type="number"
                name="age"
                required
                value={formData.age}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-[#fcd839] focus:ring-1 focus:ring-[#fcd839] outline-none transition-all disabled:opacity-50"
                placeholder="Age"
              />
            </div>
          </div>

          {/* שורה 3: מדינה + State/City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <select
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/90 focus:border-[#fcd839] focus:ring-1 focus:ring-[#fcd839] outline-none transition-all [&>option]:bg-black [&>option]:text-white disabled:opacity-50"
              >
                <option value="" disabled>Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="IL">Israel</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {isUS ? (
              <div>
                <select
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/90 focus:border-[#fcd839] focus:ring-1 focus:ring-[#fcd839] outline-none transition-all [&>option]:bg-black [&>option]:text-white disabled:opacity-50"
                >
                  <option value="" disabled>Select State</option>
                  {usStates.map((state: string) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            ) : (
                <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-[#fcd839] focus:ring-1 focus:ring-[#fcd839] outline-none transition-all disabled:opacity-50"
                placeholder="City / Region"
              />
            )}
          </div>

          {/* שורה 4: שדה City עבור ארה"ב */}
          {isUS && (
             <div>
               <input
                 type="text"
                 name="city"
                 required
                 value={formData.city}
                 onChange={handleChange}
                 disabled={isSubmitting}
                 className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-[#fcd839] focus:ring-1 focus:ring-[#fcd839] outline-none transition-all disabled:opacity-50"
                 placeholder="City / Region"
               />
             </div>
          )}

          {/* שורה 5: מקור הגעה */}
          <div>
            <select
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/90 focus:border-[#fcd839] focus:ring-1 focus:ring-[#fcd839] outline-none transition-all [&>option]:bg-black [&>option]:text-white disabled:opacity-50"
            >
              <option value="" disabled>How did you hear about us?</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="Friend">Friend / Family</option>
              <option value="School">School / Organization</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* שורה 6: הודעה */}
          <div>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-[#fcd839] focus:ring-1 focus:ring-[#fcd839] outline-none transition-all resize-none disabled:opacity-50"
              placeholder="Personal Message (Optional)..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#fcd839] hover:bg-[#e3c02f] text-black font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mt-6 shadow-[0_0_20px_rgba(252,216,57,0.2)] hover:shadow-[0_0_30px_rgba(252,216,57,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Me Details
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

        </form>
      </div>
    </section>
  );
}