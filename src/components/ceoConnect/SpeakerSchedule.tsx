'use client';
import React, { useState } from 'react';
import { SPEAKERS_DATA } from './ceoData';

type DayKey = keyof typeof SPEAKERS_DATA;

const SpeakerSchedule = () => {
  const [activeDay, setActiveDay] = useState<DayKey>('day1');

  const dayTabs: { key: DayKey; label: string; subtitle: string }[] = [
    { key: 'day1', label: '7th Jan', subtitle: 'Wednesday' },
    { key: 'day2', label: '8th Jan', subtitle: 'Thursday' },
    { key: 'day3', label: '9th Jan', subtitle: 'Friday' },
  ];

  return (
    <section className="relative z-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Speaker Schedule
        </h2>

        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 px-2">
          {dayTabs.map((day) => (
            <button
              key={day.key}
              onClick={() => setActiveDay(day.key)}
              className={`flex-1 max-w-[180px] px-3 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 ${
                activeDay === day.key
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105 shadow-lg shadow-purple-500/50'
                  : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50 border border-slate-700'
              }`}
            >
              <div className="text-sm sm:text-base md:text-lg">{day.label}</div>
              <div className="text-xs opacity-75">{day.subtitle}</div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {SPEAKERS_DATA[activeDay].map((speaker, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-4 gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 break-words">
                    {speaker.name}
                  </h3>
                  <p className="text-purple-400 font-medium text-sm sm:text-base break-words">
                    {speaker.designation}
                  </p>
                </div>
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 p-2 bg-blue-600/20 hover:bg-blue-600/40 rounded-lg transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-gray-400 mb-2 uppercase">
                  Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {speaker.expertise.map((exp, i) => (
                    <span
                      key={i}
                      className="px-2 sm:px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-xs sm:text-sm border border-purple-500/20"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakerSchedule;
