"use client";
import { ShieldCheck, Users, Utensils } from 'lucide-react';

export default function SafetySection() {
  return (
    <section className="w-full py-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e293b] via-[#0f172a] to-[#020617]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
          Uncompromising Standards of <span className="text-[#fcd839]">Safety & Quality</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="mb-6 p-4 mx-auto w-fit rounded-full bg-[#fcd839]/10 text-[#fcd839]">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Safety First</h3>
            <p className="text-gray-400">
              A comprehensive security array, 24/7 situation room, and full coordination with all security authorities.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="mb-6 p-4 mx-auto w-fit rounded-full bg-[#fcd839]/10 text-[#fcd839]">
              <Users className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Our Team</h3>
            <p className="text-gray-400">
              Israel's finest counselors. Mature, experienced, and trained to lead educational processes with sensitivity.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="mb-6 p-4 mx-auto w-fit rounded-full bg-[#fcd839]/10 text-[#fcd839]">
              <Utensils className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">The Full Package</h3>
            <p className="text-gray-400">
              We take care of every detail - from nutritious, Kosher food tailored to individual needs, to meticulous logistics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}