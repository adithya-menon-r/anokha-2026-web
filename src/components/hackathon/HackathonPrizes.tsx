'use client';

import { cubicBezier } from 'motion';
import { motion } from 'motion/react';
import React from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
};

export default function PrizesSection(): React.JSX.Element {
  return (
    <section id="prizes" className="py-20 lg:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-6 mb-16"
        >
          <div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight pb-1">
              <span className="text-white">Prizes</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 pr-1">
                & Rewards
              </span>
            </h2>

            <p className="mt-4 text-lg text-zinc-400 max-w-2xl italic mx-auto">
              Win cash prizes and unlock prestigious career opportunities across
              Generative AI, Agentic AI, and AIoT.
            </p>

            {/* Glimmering Total Prize Pool */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl lg:text-3xl text-white tracking-normal mt-4"
            >
              <style>{`
                @keyframes shimmer {
                  0%, 100% {
                    background-position: 0% 50%;
                  }
                  50% {
                    background-position: 100% 50%;
                  }
                }
                
                .glimmer-text {
                  background: linear-gradient(
                    90deg,
                    #ffd700,
                    #ffed4e,
                    #ffc107,
                    #ffed4e,
                    #ffd700
                  );
                  background-size: 200% auto;
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                  animation: shimmer 3s ease-in-out infinite;
                  filter: drop-shadow(0 0 12px rgba(255, 215, 0, 0.6));
                  font-bold;
                }
              `}</style>
              <span className="font-thin">Total Prize Pool: </span>
              <span className="glimmer-text font-extrabold">₹1,80,000</span>
              <span className="font-thin"> Across All Domains</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Prize Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Winner */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.04 }}
            className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-1 shadow-xl hover:shadow-amber-500/20 transition-all"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative rounded-[22px] bg-black/40 p-10 flex flex-col items-center text-center">
              {/* Image Placeholder */}
              <div className="mb-6 h-24 w-24 rounded-2xl overflow-hidden shadow-[0_0_25px_-5px_rgba(245,158,11,0.4)] group-hover:scale-110 transition-transform duration-300">
                <img
                  src="/hackathon/Prizes/winner.png"
                  alt="Winner"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-xl font-bold text-white mb-1">Winner</div>
              <div className="text-sm text-zinc-400 mb-6 italic">
                Per Domain
              </div>
              <div className="text-4xl font-black text-white tracking-tight">
                ₹30,000
              </div>
            </div>
          </motion.div>

          {/* 1st Runner-Up */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.04 }}
            className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-1 shadow-xl hover:shadow-slate-400/20 transition-all"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-slate-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative rounded-[22px] bg-black/40 p-10 flex flex-col items-center text-center">
              {/* Image Placeholder */}
              <div className="mb-6 h-24 w-24 rounded-2xl overflow-hidden shadow-[0_0_25px_-5px_rgba(148,163,184,0.4)] group-hover:scale-110 transition-transform duration-300">
                <img
                  src="/hackathon/Prizes/runnerup1.png"
                  alt="1st Runner Up"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-xl font-bold text-white mb-1">
                1st Runner-Up
              </div>
              <div className="text-sm text-zinc-400 mb-6 italic">
                Per Domain
              </div>
              <div className="text-4xl font-black text-white tracking-tight">
                ₹20,000
              </div>
            </div>
          </motion.div>

          {/* 2nd Runner-Up */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.04 }}
            className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-1 shadow-xl hover:shadow-orange-500/20 transition-all"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative rounded-[22px] bg-black/40 p-10 flex flex-col items-center text-center">
              {/* Image Placeholder */}
              <div className="mb-6 h-24 w-24 rounded-2xl overflow-hidden shadow-[0_0_25px_-5px_rgba(249,115,22,0.4)] group-hover:scale-110 transition-transform duration-300">
                <img
                  src="/hackathon/Prizes/runnerup2.png"
                  alt="2nd Runner Up"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-xl font-bold text-white mb-1">
                2nd Runner-Up
              </div>
              <div className="text-sm text-zinc-400 mb-6 italic">
                Per Domain
              </div>
              <div className="text-4xl font-black text-white tracking-tight">
                ₹10,000
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Extra Info */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid md:grid-cols-2 gap-8"
        >
          <div className="flex items-start gap-6 p-6 rounded-3xl bg-white/5 hover:bg-white/[0.08] transition-colors backdrop-blur-xl shadow-lg">
            {/* Image Placeholder */}
            <div className="flex-shrink-0 h-16 w-16">
              <img
                src="/hackathon/Prizes/internship.png"
                alt="Internship Opportunities"
                className="h-full w-full"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Internship Opportunities
              </h3>
              <p className="text-zinc-400 mt-1 leading-relaxed">
                Top performers unlock exclusive internship or interview
                opportunities from our partners.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6 p-6 rounded-3xl bg-white/5 hover:bg-white/[0.08] transition-colors backdrop-blur-xl shadow-lg">
            {/* Image Placeholder */}
            <div className="flex-shrink-0 h-16 w-16">
              <img
                src="/hackathon/Prizes/goodies.png"
                alt="Additional Perks"
                className="h-full w-full"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Additional Perks</h3>
              <p className="text-zinc-400 mt-1 leading-relaxed">
                E-certificates for all valid submissions;{' '}
                <span className="text-white font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  goodies and on-stage recognition
                </span>{' '}
                for all shortlisted teams.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
