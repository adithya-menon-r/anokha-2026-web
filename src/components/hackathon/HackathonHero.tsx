'use client';

import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import React from 'react';
import Logo3D from './Logo3D';
import RegisterButton from './RegisterButton';
import SplitText from './SplitText';

export default function HeroSection(): React.JSX.Element {
  const headingText = 'AI-Verse Hackathon';

  const typewriterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl z-0" />
      <div className="pointer-events-none absolute -right-24 -bottom-20 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl z-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div data-animate>
          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
            <span className="block">
              <motion.span
                className="inline-block"
                variants={typewriterVariants}
                initial="hidden"
                animate="visible"
              >
                {headingText.split('').map((char, index) => (
                  <motion.span key={index} variants={letterVariants}>
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </span>
            <SplitText
              text="Learn, Build, Innovate."
              className="text-purple-400 text-3xl md:text-6xl w-[150%]"
              delay={50}
              duration={1.0}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />
          </h1>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 mt-4">
            <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-400" />
            By Amrita Vishwa Vidyapetham, Coimbatore
          </div>
          <p className="mt-5 max-w-xl text-zinc-400">
            A one‑month hybrid AI hackathon with online building and a final
            on‑campus pitching round during Anokha Tech Fest, focused on
            Generative AI, Agentic AI, and AIoT.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/hackathon/register">
              <RegisterButton />
            </Link>
            <a
              href="#themes"
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-200 hover:bg-white/10 hover-glare"
            >
              <span className="relative z-10">View Themes</span>
              <ExternalLink className="relative z-10 h-4 w-4" />
            </a>
          </div>
        </div>
        {/* Hero visual - 3D Logo */}
        <div
          className="md:ml-20 mx-auto relative flex justify-center items-center"
          data-animate
        >
          <div
            className="relative z-10 w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
            style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
          >
            <Logo3D />
          </div>

          {/* Background glow for the logo */}
          <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full transform scale-75 -z-10" />
        </div>
      </div>
    </section>
  );
}
