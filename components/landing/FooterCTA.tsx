"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/useI18n";

export default function FooterCTA() {
  const { m } = useI18n();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    state: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add API call here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const states = m.usStates;

  return (
    <section className="w-full bg-brand-forest py-16 sm:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {m.footerCta.heading}
          </h2>
          <p className="text-lg sm:text-xl text-white/90">
            {m.footerCta.subheading}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-ui-night mb-2">
                {m.footerCta.form.labels.fullName}
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition"
                placeholder={m.footerCta.form.placeholders.fullName}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ui-night mb-2">
                {m.footerCta.form.labels.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition"
                placeholder={m.footerCta.form.placeholders.email}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-ui-night mb-2">
                {m.footerCta.form.labels.phone}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition"
                placeholder={m.footerCta.form.placeholders.phone}
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-ui-night mb-2">
                {m.footerCta.form.labels.age}
              </label>
              <input
                type="number"
                id="age"
                name="age"
                required
                min="13"
                max="19"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition"
                placeholder={m.footerCta.form.placeholders.age}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="state" className="block text-sm font-medium text-ui-night mb-2">
                {m.footerCta.form.labels.state}
              </label>
              <select
                id="state"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition bg-white"
              >
                <option value="">{m.footerCta.form.selectStatePlaceholder}</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-red hover:bg-brand-red/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
          >
            {m.footerCta.form.submit}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </section>
  );
}

