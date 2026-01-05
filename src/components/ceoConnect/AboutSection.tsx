import React, { forwardRef } from 'react';

const AboutSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <section
      ref={ref}
      className="relative max-md:py-44 lg:-mt-30  z-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <div className="relative group overflow-hidden bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 max-sm:mb-0 max-lg:-mt-20 lg:p-12 border border-purple-400/30 backdrop-blur-md shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-500 hover:border-purple-400/50">
          <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[140%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              About CEO Connect
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              <span className="text-purple-300 font-semibold">CEO Connect</span>{' '}
              is a new{' '}
              <span className="text-white font-medium border-b border-purple-500/40">
                flagship conclave
              </span>{' '}
              at Anokha 2026, created to enable meaningful interaction between{' '}
              <span className="text-purple-200">
                students and industry leaders
              </span>
              . Held across all three days of the fest, it brings together
              founders, CEOs, CTOs, and senior executives for focused
              conversations on{' '}
              <span className="text-blue-400">emerging technologies</span> and
              real-world innovation.
            </p>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              The conclave features talks, panel discussions, and interactive
              sessions that allow students to{' '}
              <span className="text-blue-400">
                engage directly with leaders
              </span>{' '}
              and see how classroom learning translates into industry practice.
              Students get to meet these professionals live, interact with them
              in person, and hear first-hand accounts of{' '}
              <span className="text-white font-medium">
                leadership journeys
              </span>
              , product development, and{' '}
              <span className="text-pink-300">large-scale transformation</span>.
            </p>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full"></div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
export default AboutSection;
