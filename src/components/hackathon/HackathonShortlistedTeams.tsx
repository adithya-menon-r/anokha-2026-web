'use client';

import { motion } from 'motion/react';
import React from 'react';

// Data Structure
type Team = {
  name: string;
  email: string;
};

type Track = {
  id: string;
  title: string;
  teams: Team[];
};

const shortlistedTeams: Track[] = [
  {
    id: 'aiot',
    title: 'AIoT Track',
    teams: [
      { name: 'VisionX', email: 'gollapudinandu13@gmail.com' },
      {
        name: 'Civilized Primitives',
        email: 'cb.ai.u4aid25062@cb.students.amrita.edu',
      },
      { name: 'Data Dynamos', email: 'siddharthsriram2005@gmail.com' },
      {
        name: 'ESP ROCKERS',
        email: 'cb.en.u4ece23206@cb.students.amrita.edu',
      },
      { name: 'ZenNet', email: 'cb.en.u4cce24156@cb.students.amrita.edu' },
      {
        name: 'Vishnu teja and team',
        email: 'cb.sc.u4aie24128@cb.students.amrita.edu',
      },
      { name: 'Sparkd', email: 'cb.sc.u4cse24535@cb.students.amrita.edu' },
      {
        name: 'Runtime Slayers',
        email: 'cb.ai.u4aim24131@cb.students.amrita.edu',
      },
      { name: 'SafeNet', email: 'vknsds@gmail.com' },
      {
        name: 'Team ResqNode',
        email: 'cb.en.u4elc24106@cb.students.amrita.edu',
      },
    ],
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI Track',
    teams: [
      {
        name: 'The Powerpuff Girls',
        email: 'cb.sc.u4cys24019@cb.students.amrita.edu',
      },
      {
        name: 'Rizzless Coders',
        email: 'cb.sc.u4cse23104@cb.students.amrita.edu',
      },
      { name: 'ERFOLG', email: 'rishiikeshsk@gmail.com' },
      { name: 'Thedal', email: 'nbknight23@gmail.com' },
      { name: 'Temu Warriors', email: 'nivedhmanoj@gmail.com' },
      { name: 'COSMO', email: 'skillihanshitha7@gmail.com' },
      { name: 'Code Storm', email: 'cb.en.u4elc23048@cb.students.amrita.edu' },
      { name: 'WE FOUR', email: 'cb.en.u4cce24105@cb.students.amrita.edu' },
      { name: 'Mountain Dew', email: 'madhan786819@gmail.com' },
      { name: 'Hello World', email: 'cb.sc.u4aie23340@cb.students.amrita.edu' },
    ],
  },
  {
    id: 'genai',
    title: 'GenAI Track',
    teams: [
      {
        name: 'RAG and Roll',
        email: 'cb.sc.u4cse23642@cb.students.amrita.edu',
      },
      {
        name: 'Byte Busters',
        email: 'cb.sc.u4aie24011@cb.students.amrita.edu',
      },
      { name: 'Gryffindors', email: 'uthekshan@gmai.com' },
      { name: 'Fight Club', email: 'cb.sc.u4cse24060@cb.students.amrita.edu' },
      { name: 'Sub Zero', email: 'cb.sc.u4aie24360@cb.students.amrita.edu' },
      { name: 'Zeus', email: 'karthikmatluru@gmail.com' },
      { name: 'Straw Hats', email: 'cb.sc.u4aie23072@cb.students.amrita.edu' },
      {
        name: 'Space Monkeys',
        email: 'yagavakhilesh.sr2023@vitstudent.ac.in',
      },
      { name: 'Felix Felicis', email: 'thewayitis07@gmail.com' },
      { name: 'The Eagles', email: 'harish0421mw@gmail.com' },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function HackathonShortlistedTeams() {
  return (
    <section className="py-20 lg:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            <span className="text-white">Shortlisted</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400">
              Teams
            </span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Congratulations to all the shortlisted teams! We look forward to
            seeing you at the hackathon.
          </p>
        </motion.div>

        <div className="space-y-16">
          {shortlistedTeams.map((track) => (
            <div key={track.id} className="relative">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-white mb-8 border-l-4 border-purple-500 pl-4"
              >
                {track.title}
              </motion.h3>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-zinc-400">
                    <thead className="bg-white/5 text-xs uppercase text-zinc-200">
                      <tr>
                        <th scope="col" className="px-6 py-4 font-bold">
                          Team Name
                        </th>
                        <th scope="col" className="px-6 py-4 font-bold">
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 font-bold text-right"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {track.teams.map((team, index) => (
                        <motion.tr
                          key={index}
                          variants={itemVariants}
                          className="hover:bg-white/[0.04] transition-colors"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-white">
                            {team.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {team.email}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right">
                            <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                              Selected
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
