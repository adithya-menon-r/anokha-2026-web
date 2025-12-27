'use client';

import React from 'react';
import type { AccommodationInstructionsProps } from '@/types/accommodationTypes';

const AccommodationInstructions: React.FC<AccommodationInstructionsProps> = ({
  instructions,
  checked,
  toggle,
  onNext,
  allChecked,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto mt-10">
      <div className="mx-auto w-full bg-gradient-to-br from-slate-900/60 via-slate-900/50 to-slate-800/40 border border-white/5 rounded-xl md:rounded-3xl px-6 md:px-10 py-10 shadow-2xl backdrop-blur-lg text-white text-left">
        <h2 className="text-3xl md:text-4xl font-semibold text-center">
          Important Points
        </h2>

        <p className="mt-4 text-left text-md text-white/80 mt-8 md:mt-6">
          Please read and select all the points to proceed:
        </p>

        <div className="mt-5 grid gap-4">
          {instructions.map((text, idx) => (
            <label key={idx} className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={checked[idx]}
                onChange={() => toggle(idx)}
                className="mt-1 h-5 w-5 rounded text-orange-500 bg-white/5 border-white/20 ring-offset-slate-900/30 focus:ring-orange-400"
              />
              <span className="text-md leading-relaxed">{text}</span>
            </label>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onNext}
            disabled={!allChecked}
            className={`inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none ${
              allChecked
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-orange-300/30 text-white/60 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default AccommodationInstructions;
