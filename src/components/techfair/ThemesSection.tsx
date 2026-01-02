'use client';
import { gsap } from 'gsap';
import { BookOpen, Cpu, School } from 'lucide-react';
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="font-nk57 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-orange-300 via-amber-300 to-orange-400 bg-clip-text text-transparent">
            Themes & Splits
          </h2>
          <p className="font-tech text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Organized into focused segments for inclusive participation across
            different age groups and backgrounds
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* College Fair */}
          <div className="float-card group relative bg-gradient-to-br from-orange-900/10 to-amber-900/10 backdrop-blur-md border border-orange-400/20 rounded-3xl p-8 transition-all duration-500 hover:border-orange-400/50 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-orange-400/20">
                <School className="w-8 h-8 text-orange-300" strokeWidth={2} />
              </div>
              <h3 className="font-notoSerif text-3xl sm:text-4xl font-bold text-orange-300 mb-4 group-hover:text-orange-200 transition-colors">
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
          <div className="float-card group relative bg-gradient-to-br from-orange-900/10 to-amber-900/10 backdrop-blur-md border border-orange-400/20 rounded-3xl p-8 transition-all duration-500 hover:border-orange-400/50 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-orange-400/20">
                <BookOpen className="w-8 h-8 text-orange-300" strokeWidth={2} />
              </div>
              <h3 className="font-notoSerif text-3xl sm:text-4xl font-bold text-orange-300 mb-4 group-hover:text-orange-200 transition-colors">
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
          <div className="float-card group relative bg-gradient-to-br from-orange-900/10 to-amber-900/10 backdrop-blur-md border border-orange-400/20 rounded-3xl p-8 transition-all duration-500 hover:border-orange-400/50 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-orange-400/20">
                <Cpu className="w-8 h-8 text-orange-300" strokeWidth={2} />
              </div>
              <h3 className="font-notoSerif text-3xl sm:text-4xl font-bold text-orange-300 mb-4 group-hover:text-orange-200 transition-colors">
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
