import React, { forwardRef } from 'react';
import { DOMAINS_DATA } from '@/components/ceoConnect/ceoData';

const ThematicDomains = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <section ref={ref} className="relative z-10 py-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(56,189,248,0.5)] filter brightness-125">
          Thematic Domains
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {DOMAINS_DATA.map((domain, idx) => {
            const Icon = domain.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <div className="relative flex flex-col items-center text-center">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${domain.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                    {domain.name}
                  </h3>
                  <div
                    className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${domain.color} transition-all duration-300 rounded-full`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

ThematicDomains.displayName = 'ThematicDomains';
export default ThematicDomains;
