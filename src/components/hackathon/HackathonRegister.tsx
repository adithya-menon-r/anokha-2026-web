'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

export default function RegisterSection(): React.JSX.Element {
  return (
    <section id="register" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-black/40 backdrop-blur-xl p-8 sm:p-16 text-center overflow-hidden relative"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-purple-500/20 blur-[100px] -z-10 rounded-full" />

          <div className="inline-flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-white/5 border border-white/10 mb-6 sm:mb-8 text-purple-400">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>

          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 sm:mb-6">
            Ready to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 pr-1">
              Innovate?
            </span>
          </h2>

          <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed">
            Join thousands of students in this journey to build the future of
            Registration and idea submission are open from December 15th to
            30th, 2025.
          </p>

          <div className="flex flex-col items-center">
            <motion.a
              href="/hackathon/register"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-2 sm:gap-3 rounded-full px-8 py-4 text-sm sm:text-lg font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 overflow-hidden transition-all duration-200"
              style={{
                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                transform: 'perspective(500px) rotateX(2deg)',
              }}
            >
              <span
                className="absolute inset-0 rounded-full bg-gradient-to-b from-purple-500 via-purple-600 to-purple-800 transition-all duration-200 group-hover:from-purple-400 group-hover:via-purple-500 group-hover:to-purple-700"
                style={{
                  boxShadow:
                    '0 4px 0 #5b21b6, 0 6px 15px rgba(168, 85, 247, 0.3)',
                }}
              />

              <span
                className="relative z-10 tracking-wide"
                style={{ transform: 'translateY(-2px)' }}
              >
                Go to Registration Form
              </span>
              <ArrowRight className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.a>

            <div className="mt-6 flex flex-row items-center justify-center gap-3">
              <div className="flex flex-col items-center gap-2">
                <motion.a
                  href="https://drive.google.com/drive/folders/1dr4WsUlAMqPwlo6xukPHdXvf4fqcNtxz?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-zinc-400 hover:text-white hover:underline underline-offset-2 font-medium text-sm sm:text-base transition-colors"
                >
                  Submission Requirements
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
