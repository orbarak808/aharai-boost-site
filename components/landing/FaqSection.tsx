"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    category: "🛡️ Security & Safety",
    questions: [
      {
        q: "How do you handle safety and security?",
        a: "Safety is our absolute top priority. We operate in full coordination with the official 'Situation Room' of the Ministry of Education and relevant security authorities. Our itinerary is dynamic; if a specific area is deemed unsafe, we adjust our plans immediately."
      },
      {
        q: "Is the group accompanied by security personnel?",
        a: "Yes. In accordance with Israeli regulations for educational groups, we are accompanied by armed security personnel and a medic at all times during field activities and travel."
      },
      {
        q: "What happens in case of an emergency?",
        a: "We have a comprehensive emergency protocol in place. Our staff is highly experienced in field management, and we have direct access to evacuation vehicles and medical support 24/7. Parents will be notified immediately in any exceptional event."
      }
    ]
  },
  {
    category: "🎒 The Program Experience",
    questions: [
      {
        q: "How physically demanding is the program?",
        a: "You don’t need to be an Olympic athlete, but you do need a positive mindset. The program is designed to be challenging—this is how we build Resilience (Hosen). There will be hiking and outdoor navigation, but everything is built on a 'gradient of difficulty' to ensure everyone can succeed."
      },
      {
        q: "What are the accommodation arrangements?",
        a: "The program offers a balanced mix. Part of the experience involves field accommodation (sleeping in tents under the stars) to foster connection with nature. On other nights, we stay in organized hostels or educational centers with full facilities."
      },
      {
        q: "Will this program help with my College Application?",
        a: "Absolutely. Universities are looking for candidates who demonstrate leadership, grit, and cross-cultural communication skills. A certificate from 'Aharai!' is a powerful addition to any resume."
      }
    ]
  },
  {
    category: "🇮🇱 The Israeli Connection",
    questions: [
      {
        q: "How much time do we spend with Israelis?",
        a: "This is not a 'meet-up'. The Israeli participants are full members of the group. You will hike, volunteer, eat, and sleep in the same tents together for the entire journey. This creates a genuine, unmediated bond."
      },
      {
        q: "Who are the staff members?",
        a: "Our staff consists of hand-picked 'Aharai!' professionals. They are experienced educators and veterans of IDF combat and field units, who serve as role models for responsibility and leadership."
      }
    ]
  },
  {
    category: "✈️ Logistics & Religion",
    questions: [
      {
        q: "Is the food Kosher? How is Shabbat observed?",
        a: "Yes, all food is Kosher. We maintain a pluralistic environment. There is no travel or operational activity on Shabbat, and we create a special atmosphere that respects both observant and secular participants."
      },
      {
        q: "What is the policy regarding phones?",
        a: "We believe in 'disconnecting to reconnect.' To allow participants to truly bond, mobile phone usage will be limited to specific windows of time (usually in the evenings)."
      },
      {
        q: "Is the flight included?",
        a: "Flights are not included. Participants book their own travel, and we meet at a designated point at Ben Gurion Airport."
      }
    ]
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about the journey
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-[#d32f2f] mb-4 border-b pb-2">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.questions.map((item, qIndex) => {
                  const uniqueId = `${catIndex}-${qIndex}`;
                  const isOpen = openIndex === uniqueId;

                  return (
                    <div key={qIndex} className="border rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(uniqueId)}
                        className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-semibold text-gray-900">{item.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="p-4 bg-white text-gray-600 leading-relaxed border-t">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}