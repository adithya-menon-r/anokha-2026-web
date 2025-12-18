'use client';

import {
  ArrowRight,
  Brain,
  ChevronRight,
  LucideIcon,
  Settings,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';

interface Theme {
  key: string;
  title: string;
  desc: string;
  fullDesc: string;
  submissions: string[];
  icon: LucideIcon;
  image: string;
  color: string;
}

const themesData: Theme[] = [
  {
    key: 'generative-ai',
    title: 'Generative AI',
    desc: 'Build RAG-powered copilots and AI systems that reason over real-world data with reliability and strong grounding.',
    fullDesc:
      'The startup ecosystem generates millions of data points daily—funding announcements, investor theses, policy changes, and market signals—yet this information is scattered across news sites, PDFs, and unstructured reports. Founders waste weeks manually researching compatible investors while VCs struggle to cut through noise and discover the next breakout startup. Your challenge in the Generative AI track is to build a production-grade RAG system that turns this fragmented data into actionable intelligence. Design an AI-powered investment analyst that ingests real-world startup and funding data, uses strict citation and provenance to avoid hallucinations, and delivers hyper-accurate, context-aware insights that help founders find the right investors and VCs spot their next portfolio winner—backed by clear evaluation metrics that prove your system works in practice.\n\nProblem statement provided by v18hub ([v18hub.in](https://v18hub.in)).',
    submissions: [],
    icon: Sparkles,
    image: '/hackathon/Themes/genai.png',
    color: 'from-purple-500 to-purple-600',
  },
  {
    key: 'agentic-ai',
    title: 'Agentic AI',
    desc: 'Design autonomous AI agents that can plan, act, and learn toward long-term user goals.',
    fullDesc:
      "Many students struggle to translate skills into real opportunities due to scattered resources, weak guidance, and no structured feedback loop after job or internship rejections. In the Agentic AI track, your mission is to build an Agentic AI Career Development System that continuously understands a user's profile, reasons over market and skill demands, and plans personalized learning and opportunity roadmaps. Your system should autonomously surface and, where appropriate, apply to relevant jobs, internships, and hackathons; track outcomes and feedback; and adapt strategies over time. The expected solution behaves like a career co-pilot—proactive, goal-driven, and capable of continuous planning, action, and learning that moves users from confusion to job readiness.",
    submissions: [],
    icon: Brain,
    image: '/hackathon/Themes/agentai.png',
    color: 'from-purple-600 to-purple-700',
  },
  {
    key: 'aiot',
    title: 'AIoT (AI at the Edge)',
    desc: 'Design intelligent edge AIoT systems that sense, reason, and act in real time for safer, smarter cities.',
    fullDesc:
      'Rapid urbanization is straining healthcare systems, child safety mechanisms, and urban infrastructure. Existing IoT solutions are fragmented, cloud-dependent, and often reactive, leading to challenges with latency, privacy, and scalability. In the AIoT (AI at the Edge) track, your challenge is to design Edge AI and TinyML–powered AIoT solutions that proactively monitor, predict, and respond across urban healthcare, child well-being, and smart infrastructure. Your systems should leverage on-device intelligence, multi-modal sensing, and adaptive decision-making to enhance safety, efficiency, and quality of life while minimizing cloud reliance and preserving privacy.',
    submissions: [],
    icon: Settings,
    image: '/hackathon/Themes/aiot.png',
    color: 'from-purple-700 to-purple-800',
  },
];

export default function ThemesSection(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const openModal = (theme: Theme): void => {
    setSelectedTheme(theme);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedTheme(null);
  };

  return (
    <section id="themes" className="py-20 lg:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-6 mb-16"
        >
          <div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight pb-1">
              <span className="text-white">Themes</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 pr-1">
                Overview
              </span>
            </h2>

            <p className="mt-4 text-lg text-zinc-400 max-w-2xl italic">
              Explore the domain themes and choose the one that excites you.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {themesData.map((t, index) => {
            const Icon = t.icon;
            return (
              <motion.article
                key={t.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col h-full rounded-3xl border border-white/10 bg-white/5 overflow-hidden hover:border-white/20 transition-colors cursor-pointer"
                onClick={() => openModal(t)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={t.image}
                    alt={`${t.title} theme`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                    {t.desc}
                  </p>

                  <div className="flex items-center text-sm font-medium text-white group/link">
                    <span className="bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent group-hover/link:text-white transition-colors -mt-0.5">
                      Explore Theme
                    </span>
                    <ChevronRight className="h-4 w-4 ml-1 text-purple-400 transition-transform group-hover/link:translate-x-1 group-hover/link:text-white" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-transparent p-8 sm:p-10 backdrop-blur-sm flex flex-col items-center text-center gap-8"
        >
          <div className="max-w-2xl">
            <div className="text-2xl font-bold text-white mb-2">
              Build with Cutting-Edge AI Technologies
            </div>
            <p className="text-zinc-400">
              Participants will work with foundation models, multi-agent
              systems, and intelligent edge devices, cultivating technical
              depth, creativity, and problem-solving discipline.
            </p>
          </div>
          <a
            href="/hackathon/register"
            className="group relative inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white focus:outline-none transition-all duration-200 active:translate-y-0.5"
            style={{
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            {/* Main purple gradient background */}
            <span
              className="absolute inset-0 rounded-full bg-gradient-to-b from-purple-500 via-purple-600 to-purple-800"
              style={{
                boxShadow:
                  '0 4px 0 #5b21b6, 0 6px 15px rgba(168, 85, 247, 0.3)',
              }}
            />

            {/* Top highlight/glare */}
            <span className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/40 via-white/20 to-transparent opacity-80" />

            {/* White edge glow */}
            <span className="absolute inset-x-2 top-0.5 h-0.5 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-90 blur-sm" />

            {/* Purple glow */}
            <span
              className="absolute inset-0 rounded-full bg-purple-500/50 blur-md"
              style={{
                transform: 'translateY(2px)',
              }}
            />

            {/* Inner shadow */}
            <span
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: 'inset 0 -1px 3px rgba(0,0,0,0.3)',
              }}
            />

            {/* Content */}
            <span
              className="relative z-10 tracking-wide"
              style={{ transform: 'translateY(-2px)' }}
            >
              Register Now
            </span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedTheme && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {selectedTheme.title}
            </h3>
            <p className="text-zinc-300 mb-6 leading-relaxed">
              {selectedTheme.fullDesc}
            </p>
            <button
              onClick={closeModal}
              className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white focus:outline-none transition-all duration-200 active:translate-y-0.5"
              style={{
                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
              }}
            >
              {/* Main purple gradient background */}
              <span
                className="absolute inset-0 rounded-full bg-gradient-to-b from-purple-500 via-purple-600 to-purple-800"
                style={{
                  boxShadow:
                    '0 4px 0 #5b21b6, 0 6px 15px rgba(168, 85, 247, 0.3)',
                }}
              />

              {/* Top highlight/glare */}
              <span className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/40 via-white/20 to-transparent opacity-80" />

              {/* White edge glow */}
              <span className="absolute inset-x-2 top-0.5 h-0.5 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-90 blur-sm" />

              {/* Purple glow */}
              <span
                className="absolute inset-0 rounded-full bg-purple-500/50 blur-md"
                style={{
                  transform: 'translateY(2px)',
                }}
              />

              {/* Inner shadow */}
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: 'inset 0 -1px 3px rgba(0,0,0,0.3)',
                }}
              />

              {/* Content */}
              <span
                className="relative z-10 tracking-wide"
                style={{ transform: 'translateY(-2px)' }}
              >
                Close
              </span>
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
