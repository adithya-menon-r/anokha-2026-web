'use client';

import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';

interface FAQ {
  q: string;
  a: string;
}

interface FAQItemProps {
  q: string;
  a: string;
  isOpen: boolean;
  onClick: () => void;
}

const faqs: FAQ[] = [
  {
    q: 'What is AI-Verse Hackathon?',
    a: 'AI-Verse Hackathon is a flagship one-month AI hackathon of Amrita Vishwa Vidyapeetham, culminating in an on-campus pitching day during Anokha Tech Fest. It brings together passionate student developers, designers, and innovators to work on challenges in Generative AI, Agentic AI, and AIoT.',
  },
  {
    q: 'How to participate in AI-Verse Hackathon?',
    a: 'Register on the hackathon website between Dec 15–30, form a team of 2–4 members, pay ₹500 per team (excluding GST), choose a problem statement from the themes, and submit your idea within the same window. Shortlisted teams (announced on Dec 31) advance to the Grand Finale.',
  },
  {
    q: 'Where is the venue?',
    a: 'The Grand Finale pitching day is on-campus at Amrita Vishwa Vidyapeetham, Coimbatore, on January 8, 2026, from 9:00 AM to 6:00 PM.',
  },
  {
    q: 'Do I need prior experience?',
    a: 'No prior experience is required. All skill levels are welcome, with mentor support throughout the phases to guide participants.',
  },
  {
    q: 'Is there a fee?',
    a: 'Yes, there is a participation fee of ₹500 per team (excluding GST) during registration.',
  },
  {
    q: 'Who can participate? What are the eligibility criteria?',
    a: 'The hackathon is open to students from any college and any branch. Teams can consist of 2–4 members, and inter-college teams are allowed. The event follows an online-plus-offline format.',
  },
  {
    q: 'What support is provided to participants?',
    a: 'Refreshments and goodies will be provided for finalists and shortlisted teams. Further details about accommodation and food will be shared with the shortlisted teams via mail. There is no travel reimbursement. E-certificates are guaranteed for all valid submissions',
  },
];

function FAQItem({ q, a, isOpen, onClick }: FAQItemProps): React.JSX.Element {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        className="flex w-full items-center justify-between gap-4 py-6 text-left group"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span
          className={`text-base sm:text-lg font-medium transition-colors ${isOpen ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}
        >
          {q}
        </span>
        <div
          className={`shrink-0 flex items-center justify-center h-8 w-8 rounded-full border transition-all duration-300 ${isOpen ? 'bg-white text-black border-white rotate-180' : 'border-white/10 text-zinc-400 group-hover:border-white/30'}`}
        >
          <ChevronDown className="h-5 w-5" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-zinc-400 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection(): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faqs" className="py-20 lg:py-32 relative">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Frequently Asked <span className="text-zinc-500">Questions</span>
          </h2>
          <p className="text-lg text-zinc-400">
            Everything you need to know about the hackathon.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm px-6 sm:px-8"
        >
          {faqs.map((f, idx) => (
            <FAQItem
              key={idx}
              q={f.q}
              a={f.a}
              isOpen={idx === openIndex}
              onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
