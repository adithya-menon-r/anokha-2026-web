'use client';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

export default function RegistrationCTA() {
  const bulbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bulbRef.current) {
      const bulbTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: bulbRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      bulbTimeline
        .to(bulbRef.current, { opacity: 0, duration: 0.1 })
        .to(bulbRef.current, { opacity: 1, duration: 0.1 })
        .to(bulbRef.current, { opacity: 0, duration: 0.1 })
        .to(bulbRef.current, { opacity: 1, duration: 0.1 })
        .to(bulbRef.current, { opacity: 0, duration: 0.1 })
        .to(bulbRef.current, { opacity: 1, duration: 0.1 })
        .to(bulbRef.current, { opacity: 0, duration: 0.1 })
        .to(bulbRef.current, { opacity: 1, duration: 0.1 })
        .to(bulbRef.current, { opacity: 0, duration: 0.1 })
        .to(bulbRef.current, { opacity: 1, duration: 0.2 })
        .to(bulbRef.current, {
          filter: 'brightness(1.5) drop-shadow(0 0 30px rgba(251,191,36,0.8))',
          duration: 0.5,
        });
    }
  }, []);

  const handleRegistrationClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toast.loading('Registration will open soon', {
      duration: 3000,
      position: 'bottom-center',
    });
  };

  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 fade-in-section">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-amber-700/20 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTEsMTQ2LDYwLDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />

          {/* Bulb on the right */}
          <div
            ref={bulbRef}
            className="absolute top-6 right-0 md:right-6 sm:top-8 z-20"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
              <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-xl animate-pulse-glow" />
              <svg
                viewBox="0 0 100 100"
                className="relative z-10 w-full h-full drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]"
              >
                <path
                  d="M50 10 C35 10, 25 20, 25 35 C25 45, 30 52, 32 58 L68 58 C70 52, 75 45, 75 35 C75 20, 65 10, 50 10 Z"
                  fill="url(#bulbGradient)"
                  stroke="#fbbf24"
                  strokeWidth="1.5"
                />
                <path
                  d="M45 25 Q50 30, 55 25 M45 30 Q50 35, 55 30 M45 35 Q50 40, 55 35"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.8"
                />
                <rect x="40" y="58" width="20" height="3" fill="#d97706" />
                <rect x="40" y="62" width="20" height="3" fill="#d97706" />
                <rect x="40" y="66" width="20" height="3" fill="#d97706" />
                <rect
                  x="38"
                  y="70"
                  width="24"
                  height="8"
                  rx="2"
                  fill="#b45309"
                />
                <circle cx="20" cy="20" r="1.5" fill="#fbbf24" opacity="0.8">
                  <animate
                    attributeName="opacity"
                    values="0.3;1;0.3"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="80" cy="25" r="1" fill="#fbbf24" opacity="0.6">
                  <animate
                    attributeName="opacity"
                    values="0.2;0.8;0.2"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="15" cy="45" r="1.2" fill="#fbbf24" opacity="0.7">
                  <animate
                    attributeName="opacity"
                    values="0.4;1;0.4"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="85" cy="50" r="1" fill="#fbbf24" opacity="0.5">
                  <animate
                    attributeName="opacity"
                    values="0.3;0.9;0.3"
                    dur="2.8s"
                    repeatCount="indefinite"
                  />
                </circle>
                <path
                  d="M50 8 L50 2"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  opacity="0.6"
                  strokeLinecap="round"
                />
                <path
                  d="M65 15 L70 10"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  opacity="0.6"
                  strokeLinecap="round"
                />
                <path
                  d="M75 30 L82 30"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  opacity="0.6"
                  strokeLinecap="round"
                />
                <path
                  d="M35 15 L30 10"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  opacity="0.6"
                  strokeLinecap="round"
                />
                <path
                  d="M25 30 L18 30"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  opacity="0.6"
                  strokeLinecap="round"
                />
                {/* Gradient definitions */}
                <defs>
                  <radialGradient id="bulbGradient" cx="50%" cy="30%">
                    <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-8 sm:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              {/* Left column: badge, headings, text, CTA */}
              <div className="space-y-8">
                {/* Badge */}
                <div className="flex lg:justify-start justify-center">
                  <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-400/30 rounded-full text-orange-300 text-sm font-semibold tracking-wider uppercase">
                    Join the Innovation
                  </div>
                </div>
                {/* Headline */}
                <div className="space-y-4 text-center lg:text-left">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Got an idea?
                  </h2>
                </div>
                {/* Core description */}
                <div className="max-w-xl mx-auto lg:mx-0">
                  <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed text-center lg:text-left">
                    Anokha 2026 – TechFair &amp; Exhibitions is opening its
                    doors to ideas in all stages from rough concepts to refined
                    prototypes.
                  </p>
                </div>
                {/* CTA */}
                <div className="text-center lg:text-left">
                  <a
                    href="#register"
                    id="register"
                    onClick={handleRegistrationClick}
                    className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-[#0a0a0f] bg-gradient-to-r from-orange-400 to-amber-500 rounded-full hover:scale-105 transition-all duration-300 hover:shadow-[0_0_50px_rgba(251,146,60,0.8)] group cursor-pointer"
                  >
                    <span>Throw Your Hat in the Ring</span>
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right column: highlight + reassurance */}
              <div className="space-y-8">
                {/* Highlight box */}
                <div className="bg-orange-900/20 border border-orange-400/20 rounded-2xl p-6 backdrop-blur-sm text-center lg:text-left">
                  <p className="text-base sm:text-lg text-orange-200/90 leading-relaxed">
                    If you've ever scribbled{' '}
                    <span className="text-orange-300 italic font-semibold">
                      "what if…"
                    </span>{' '}
                    in a notebook or hacked together a solution for fun,{' '}
                    <span className="text-amber-300 font-semibold">
                      we want YOU
                    </span>
                    .
                  </p>
                </div>
                {/* Supporting reassurance */}
                <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left space-y-3">
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    This isn't a commitment - just a shout into the void to see
                    who shouts back.
                  </p>
                  <p className="text-sm sm:text-base text-gray-400/80 italic">
                    No pressure, no perfection required - just a quick "I'm
                    curious" to get the ball rolling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
