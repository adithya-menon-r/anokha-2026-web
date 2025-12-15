'use client';

import { motion } from 'motion/react';
import React, { useMemo } from 'react';

interface PartnerLogo {
  name: string;
  src: string;
}

export default function PartnersSection(): React.JSX.Element {
  const partnerLogos = useMemo<PartnerLogo[]>(
    () => [
      { name: 'Google', src: 'https://cdn.simpleicons.org/google/ffffff' },
      { name: 'NVIDIA', src: 'https://cdn.simpleicons.org/nvidia/ffffff' },
      { name: 'Meta', src: 'https://cdn.simpleicons.org/meta/ffffff' },
      { name: 'OpenAI', src: 'https://cdn.simpleicons.org/openai/ffffff' },
      { name: 'GitHub', src: 'https://cdn.simpleicons.org/github/ffffff' },
      { name: 'Vercel', src: 'https://cdn.simpleicons.org/vercel/ffffff' },
      {
        name: 'Cloudflare',
        src: 'https://cdn.simpleicons.org/cloudflare/ffffff',
      },
      { name: 'Stripe', src: 'https://cdn.simpleicons.org/stripe/ffffff' },
      { name: 'Discord', src: 'https://cdn.simpleicons.org/discord/ffffff' },
      { name: 'Supabase', src: 'https://cdn.simpleicons.org/supabase/ffffff' },
      { name: 'Notion', src: 'https://cdn.simpleicons.org/notion/ffffff' },
      { name: 'Linear', src: 'https://cdn.simpleicons.org/linear/ffffff' },
      { name: 'Slack', src: 'https://cdn.simpleicons.org/slack/ffffff' },
    ],
    [],
  );

  return (
    <section id="partners" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight pb-1">
            <span className="text-white">Our</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400">
              Partners
            </span>
          </h2>

          <p className="mx-auto mt-4 text-lg text-zinc-400 max-w-2xl italic">
            Supported by industry leaders and global innovators.
          </p>
        </motion.div>
      </div>

      <div
        className="relative flex overflow-hidden"
        aria-label="Partners logos"
      >
        {/* gradient masks */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10" />

        <div className="partners-marquee flex gap-16 py-4">
          <div className="partners-track flex gap-16 items-center">
            {partnerLogos.map((p) => (
              <div
                key={p.name}
                className="h-12 w-auto flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                title={p.name}
              >
                <img
                  src={p.src}
                  alt={p.name}
                  className="h-8 sm:h-10 w-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div
            className="partners-track flex gap-16 items-center"
            aria-hidden="true"
          >
            {partnerLogos.map((p) => (
              <div
                key={`${p.name}-dup`}
                className="h-12 w-auto flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                title={p.name}
              >
                <img
                  src={p.src}
                  alt=""
                  className="h-8 sm:h-10 w-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .partners-marquee {
          width: fit-content;
        }
        .partners-track {
          animation: scroll 40s linear infinite;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </section>
  );
}
