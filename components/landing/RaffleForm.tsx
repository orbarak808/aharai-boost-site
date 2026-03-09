"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function RaffleForm() {
  const [formData, setFormData] = useState({ fullName: "", email: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // שליחה לטבלה בסופאבייס (רק שם ומייל)
    const { error } = await supabase
      .from("raffle_entries")
      .insert([
        { 
          full_name: formData.fullName, 
          email: formData.email 
        }
      ]);

    setIsLoading(false);

    if (!error) {
      setIsSubmitted(true);
    } else {
      setErrorMsg("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-8 bg-white text-black rounded-xl border-2 border-green-500">
        <h3 className="text-3xl font-bold text-green-600 mb-4">You're In! 🎉</h3>
        <p className="text-lg text-gray-700 mb-6">Your registration is complete. Don't forget to complete steps 2 and 3 above to be fully eligible for the raffle.</p>
        <a 
          href="https://chat.whatsapp.com/B8gP6bDnCCgAgCpad3CDDp?mode=gi_t" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block bg-[#25D366] text-white px-8 py-3 rounded-full font-bold hover:bg-[#128C7E] transition-colors"
        >
          Join WhatsApp Group
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <h3 className="text-2xl font-bold text-[#951744] mb-2 text-center">Enter the Raffle</h3>
      
      {errorMsg && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{errorMsg}</div>}

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
        <input 
          type="text" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#951744] focus:outline-none text-black"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
        <input 
          type="email" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#951744] focus:outline-none text-black"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <button 
        type="submit" 
        disabled={isLoading}
        className="mt-4 bg-[#951744] text-white px-6 py-4 rounded-full font-bold text-lg hover:bg-red-800 transition-colors disabled:opacity-50"
      >
        {isLoading ? "Submitting..." : "Submit Entry"}
      </button>
    </form>
  );
}