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
    time: 'Dec 1–10',
    phase: 'Registration & PS Release',
    details:
      'Register, form teams (2–4), and choose problem statements. This period marks the beginning of the month-long online build phase. Problem statements are released, and teams finalize their theme selection and plan their initial architecture, workflow, and strategy.',
    extra:
      'Teams begin their ideation, set up repositories, and begin early prototyping. The phase concludes with the upcoming submission window where complete artefacts will be required.',
  },
  {
    time: 'Dec 11–20',
    phase: 'Prototype Submission',
    details:
      'Teams must submit a PPT outlining the project, a public GitHub repository link with code and readme file, and a demo video link either Youtube or OneDrive with view access (≈3 minutes) clearly explaining and showcasing at least 50% of the implemented prototype features. For hardware projects, a Wokwi simulation walkthrough is sufficient.',
    extra:
      'For Gen/Agentic AI teams, at least 70% of functional features should be completed. For AIoT/Edge teams, hardware simulation on Wokwi is mandatory,actual hardware demos can be completed after shortlisting.',
  },
  {
    time: 'Dec 23',
    phase: 'Shortlist Announcement',
    details:
      'Top 10 teams per problem statement selected for Grand Finale. Selections are based on innovation, completeness, architecture quality, and judging metrics.',
    extra:
      'Shortlisted teams receive instructions for the finale, judging panel details, and refinement guidelines. They are expected to improve reliability, UX and presentation quality before the finale.',
  },
  {
    time: 'Dec 24–Jan 7',
    phase: 'Prototype Refinement',
    details:
      'Mentorship sessions to refine reliability, UX, and evaluation metrics. Teams polish their models, edge deployments, workflows, and overall integration.',
    extra:
      'Mentors help troubleshoot issues, optimize pipelines, validate metrics, and guide final-stage improvements. All final repositories must be stable, well-documented and demo-ready.',
  },
  {
    time: 'Jan 8, 2026',
    phase: 'Grand Finale',
    details:
      'On-campus pitching at Amrita Coimbatore. Winners announced. Teams present final prototypes with demos in front of expert jury panels.',
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
