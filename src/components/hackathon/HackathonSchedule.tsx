'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import React, { useRef } from 'react';

interface SchedulePhase {
  time: string;
  phase: string;
  details: string;
  extra?: string;
}

const schedulePhases: SchedulePhase[] = [
  {
    time: 'Dec 15–30',
    phase: 'Registration & Idea Submission',
    details:
      'Register, form teams (2–4), and submit your ideas for the selected problem statements. This phase covers both registration and idea submission for all teams',
    extra:
      'Teams are expected to carefully read the problem statements, choose their theme, and submit a clear and concise idea/proposal by the end of this window.',
  },
  {
    time: 'Dec 31',
    phase: 'Shortlist Announcement',
    details:
      'Shortlisted teams are announced based on innovation, clarity of idea, feasibility, and alignment with the problem statement.',
    extra:
      'Selected teams receive detailed instructions for the Grand Finale, including evaluation criteria, logistics, and presentation guidelines.',
  },
  {
    time: 'Jan 8, 2026',
    phase: 'Grand Finale',
    details:
      'On-campus Grand Finale at Amrita Coimbatore with pitching and demos in front of expert jury panels.',
    extra:
      'The event runs from 9 AM to 6 PM with three parallel jury tracks, one for each theme (Generative AI, Agentic AI, AIoT/Edge). Final scoring includes innovation, functionality, metrics, feasibility, and presentation quality.',
  },
];

export default function ScheduleSection(): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.2'],
  });

  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <section id="schedule" className="py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-20" data-animate>
          <h2
            className="
            text-4xl sm:text-5xl 
            font-black tracking-tight
          "
          >
            <span className="text-white">Hackathon</span>{' '}
            <span
              className=" bg-gradient-to-r 
              from-purple-400 
              via-purple-500 
              to-purple-400 
              bg-clip-text 
              text-transparent"
            >
              Timeline
            </span>
          </h2>

          <p className="mt-3 text-zinc-300 text-xl italic">
            Roadmap to the Grand Finale
          </p>
        </div>

        <div ref={ref} className="relative pl-10 sm:pl-16 space-y-20">
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-[3px] bg-white/10 rounded-full"></div>

          <motion.div
            style={{ scaleY: lineProgress }}
            className="absolute left-4 sm:left-8 top-0 bottom-0 w-[3px] bg-purple-500 rounded-full origin-top shadow-[0_0_14px_2px_rgba(139,92,246,0.8)]"
          ></motion.div>

          {schedulePhases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.65,
                ease: 'easeOut',
                delay: index * 0.05,
              }}
              className="relative group"
            >
              <div className="absolute -left-[45px] sm:-left-[61px] top-2">
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-8 w-8 rounded-full bg-purple-500/20 animate-ping"></div>
                  <div className="h-5 w-5 rounded-full bg-purple-500 ring-4 ring-[#050505] shadow-[0_0_12px_3px_rgba(139,92,246,0.7)]"></div>
                </div>
              </div>

              <motion.div
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 150, damping: 12 }}
                className="
                  flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10
                  p-5 rounded-xl bg-white/[0.02] border border-white/5 
                  backdrop-blur-md transition-all duration-300
                  hover:bg-white/[0.04] hover:shadow-[0_0_25px_4px_rgba(139,92,246,0.25)]
                "
              >
                <div className="text-purple-400 font-bold text-sm w-28 shrink-0">
                  {item.time}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-purple-300">
                    {item.phase}
                  </h3>

                  <p className="mt-2 text-white leading-relaxed">
                    {item.details}
                  </p>
                  {item.extra && (
                    <p className="mt-3 text-zinc-500 leading-relaxed text-sm italic">
                      {item.extra}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
