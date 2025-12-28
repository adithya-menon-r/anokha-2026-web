'use client';

import { Mail, Phone } from 'lucide-react';
import React from 'react';

const AccommodationContactBox: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto mt-6">
      <div className="mx-auto w-full py-6 text-white">
        <div className="bg-white/5 rounded-xl overflow-hidden">
          <div className="w-full bg-white/10 px-6 py-3">
            <h4 className="text-center text-2xl font-bold text-slate">
              Anokha Hospitality Team
            </h4>
          </div>

          <div className="px-6 py-6">
            <div className="w-full flex flex-wrap items-center justify-center gap-12 text-white/80 lg:flex-nowrap lg:justify-center">
              <a
                href="mailto:anokhahosp@cb.amrita.edu"
                className="min-w-0 w-full md:w-1/2 lg:w-auto flex justify-center items-center gap-3 text-lg md:text-xl hover:text-white"
              >
                <Mail className="text-white/80" size={20} />
                <span className="underline break-words">
                  anokhahosp@cb.amrita.edu
                </span>
              </a>

              <a
                href="tel:+919384933996"
                className="min-w-0 w-full md:w-1/2 lg:w-auto flex justify-center items-center gap-3 text-lg md:text-xl hover:text-white"
              >
                <Phone className="text-white/80" size={20} />
                <span className="break-words">9384933996</span>
              </a>

              <a
                href="tel:+919363503434"
                className="min-w-0 w-full md:w-1/2 lg:w-auto flex justify-center items-center gap-3 text-lg md:text-xl hover:text-white"
              >
                <Phone className="text-white/80" size={20} />
                <span className="break-words">9363503434</span>
              </a>

              <a
                href="tel:+919655977880"
                className="min-w-0 w-full md:w-1/2 lg:w-auto flex justify-center items-center gap-3 text-lg md:text-xl hover:text-white"
              >
                <Phone className="text-white/80" size={20} />
                <span className="break-words">9655977880</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccommodationContactBox;
