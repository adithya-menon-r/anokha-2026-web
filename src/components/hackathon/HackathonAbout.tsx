'use client';

import { Clock, MapPin } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const EVENT_START = new Date('2026-01-08T09:00:00+05:30');

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useCountdown(targetDate: Date): CountdownTime {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const now = new Date().getTime();
    return Math.max(0, targetDate.getTime() - now);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      setTimeLeft(Math.max(0, targetDate.getTime() - now));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function AboutSection(): React.JSX.Element {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_START);
  const prevValuesRef = useRef<CountdownTime>({
    days,
    hours,
    minutes,
    seconds,
  });

  const valuesChanged =
    prevValuesRef.current.days !== days ||
    prevValuesRef.current.hours !== hours ||
    prevValuesRef.current.minutes !== minutes ||
    prevValuesRef.current.seconds !== seconds;

  useEffect(() => {
    prevValuesRef.current = { days, hours, minutes, seconds };
  }, [days, hours, minutes, seconds]);

  return (
    <section
      id="about"
      className="py-16 lg:py-24 border-t border-white/10"
      style={{ background: '#050505' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-center mb-16">
          <span className="text-white">About </span>
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 bg-clip-text text-transparent">
            AI-Verse Hackathon
          </span>
        </h2>

        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <div
            className="flex flex-col gap-6 items-center -mt-6 order-1 lg:order-2"
            data-animate
          >
            <p className="text-white leading-relaxed text-justify max-w-[95%]">
              AI-Verse is a flagship one-month AI hackathon of Amrita Vishwa
              Vidyapeetham, culminating in an on-campus, single-day pitching
              round on the{' '}
              <b className="text-purple-500">8th of January 2026</b>​ during
              Anokha Tech Fest. Designed as a world-class competitive arena, it
              brings together passionate student innovators to build solutions
              in Generative AI, Agentic AI, and AIoT. The event offers an
              immersive, rigorous month-long building journey that leads into a
              high-stakes Grand Finale, where participants work with foundation
              models, multi-agent systems, and intelligent edge devices. More
              than a contest, AI-Verse celebrates innovation and collaboration
              showcasing young talent, fostering peer and industry connections,
              and reinforcing Amrita's role as a hub for impactful and
              responsible AI innovation.
            </p>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
                <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300">
                  <Clock className="h-4 w-4 text-purple-400" />
                  One-Month Online + On-Campus Finale
                </div>

                <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300">
                  <MapPin className="h-4 w-4 text-purple-400" />
                  Amrita Vishwa Vidyapeetham, Coimbatore
                </div>
              </div>

              <div className="flex justify-center md:justify-end">
                <img
                  src="/hackathon/Amrita_logo/amrita-vishwa-vidyapeetham-white-logo.svg"
                  alt="Amrita Vishwa Vidyapeetham Logo"
                  className="w-48 md:mt-7 md:w-60 lg:w-64 lg:mr-5 lg:mt-9 h-auto opacity-90 md:self-center"
                />
              </div>
            </div>
          </div>

          <div
            data-animate
            className="w-full flex justify-center order-2 md:order-1 md:-mt-16"
          >
            <div className="rounded-2xl overflow-hidden w-[90%] sm:w-[65%] md:w-[55%] lg:w-[95%] xl:w-[85%]">
              <img
                src="/hackathon/Gif/Purple-Geomentry.gif"
                alt="AI Verse Hackathon"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        <div
          className="mt-12 rounded-2xl bg-white/[0.04] backdrop-blur ring-1 ring-purple-500/30 p-6 relative shadow-[0_0_30px_8px_rgba(139,92,246,0.15)]"
          aria-live="polite"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/20 via-purple-400/10 to-purple-600/20 rounded-2xl blur-2xl"></div>

          <div className="text-2xl sm:text-3xl font-black tracking-tight text-white text-center">
            Grand Finale In
          </div>

          <div className="mt-6 grid grid-cols-4 gap-2">
            {[
              { label: 'Days', value: days },
              { label: 'Hours', value: hours },
              { label: 'Minutes', value: minutes },
              { label: 'Seconds', value: seconds },
            ].map((t) => (
              <div
                key={t.label}
                className="relative group rounded-xl border border-purple-500/10 bg-black/60 p-2 sm:p-4 text-center transition-all duration-300 hover:shadow-[0_0_25px_6px_rgba(139,92,246,0.45)] hover:border-purple-400/60 hover:scale-105"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/40 to-indigo-800/20 blur-xl opacity-30 rounded-xl"></div>

                <div
                  key={`${t.label}-${t.value}`}
                  className="text-xl sm:text-3xl font-black tabular-nums bg-gradient-to-r from-purple-300 via-purple-500 to-indigo-300 bg-clip-text text-transparent animate-pop"
                >
                  {String(t.value).padStart(2, '0')}
                </div>

                <div className="mt-1 text-[10px] sm:text-xs text-zinc-400">
                  {t.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-pop {
          animation: pop 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
