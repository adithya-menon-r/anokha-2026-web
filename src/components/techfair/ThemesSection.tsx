'use client';
import { gsap } from 'gsap';
import { useEffect } from 'react';

export default function ThemesSection() {
  useEffect(() => {
    gsap.utils.toArray<HTMLElement>('.float-card').forEach((card, i) => {
      gsap.to(card, {
        y: -20,
        x: i % 2 === 0 ? 6 : -6,
        duration: 2 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      });
    });
  }, []);

  return (
    <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 fade-in-section">
      {/* Dark overlay to separate content from stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="font-nk57 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-300 via-amber-300 to-orange-400 bg-clip-text text-transparent">
            Themes & Splits
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Organized into focused segments for inclusive participation across
            different age groups and backgrounds
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* College Fair */}
          <div className="float-card cosmic-card group relative bg-black/40 backdrop-blur-xl border border-orange-400/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(255,140,60,0.15)] hover:shadow-[0_0_80px_rgba(255,160,80,0.25)] hover:border-orange-400/50 transition-all duration-700">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-orange-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-orange-300 mb-4 group-hover:text-orange-200 transition-colors">
                College Fair
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Undergraduate and postgraduate students present technical
                projects, research work, and innovative prototypes. Focuses on
                practical engineering, interdisciplinary teamwork, and
                real-world problem solving with exposure to entrepreneurship and
                networking.
              </p>
            </div>
          </div>

          {/* School Fair */}
          <div className="float-card cosmic-card group relative bg-black/40 backdrop-blur-xl border border-orange-400/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(255,140,60,0.15)] hover:shadow-[0_0_80px_rgba(255,160,80,0.25)] hover:border-orange-400/50 transition-all duration-700">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-orange-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-orange-300 mb-4 group-hover:text-orange-200 transition-colors">
                School Fair
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Designed to spark interest and creativity among school students
                through hands-on demonstrations and simple working models. Helps
                students understand basic engineering concepts, sustainability,
                and real-life applications beyond textbooks.
              </p>
            </div>
          </div>

          {/* Exhibitions */}
          <div className="float-card cosmic-card group relative bg-black/40 backdrop-blur-xl border border-orange-400/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(255,140,60,0.15)] hover:shadow-[0_0_80px_rgba(255,160,80,0.25)] hover:border-orange-400/50 transition-all duration-700">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-orange-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-orange-300 mb-4 group-hover:text-orange-200 transition-colors">
                Exhibitions
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Showcases displays related to technology, sustainability, public
                awareness, and social impact. Institutions and teams present
                real-world solutions in healthcare, environment, governance, and
                industry, making technology accessible to all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
