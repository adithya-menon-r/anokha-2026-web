import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

export default function RegisterButton(): React.JSX.Element {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 overflow-hidden transition-all duration-200 active:translate-y-0.5 cursor-pointer"
      style={{
        textShadow: '0 1px 3px rgba(0,0,0,0.5)',
        transform: 'perspective(500px) rotateX(2deg)',
      }}
    >
      {/* Main purple gradient background */}
      <span
        className="absolute inset-0 rounded-full bg-gradient-to-b from-purple-500 via-purple-600 to-purple-800 transition-all duration-200 group-hover:from-purple-400 group-hover:via-purple-500 group-hover:to-purple-700"
        style={{
          boxShadow: '0 4px 0 #5b21b6, 0 6px 15px rgba(168, 85, 247, 0.3)',
        }}
      />

      {/* Top highlight/glare */}
      <span className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/40 via-white/20 to-transparent opacity-80" />

      {/* White edge glow on top */}
      <span className="absolute inset-x-2 top-0.5 h-0.5 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-90 blur-sm" />

      {/* Sharper white edge line */}
      <span className="absolute inset-x-3 top-0.5 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

      {/* Purple glow effect */}
      <span
        className="absolute inset-0 rounded-full bg-purple-500/50 blur-md transition-all duration-300 group-hover:blur-lg group-hover:bg-purple-400/60"
        style={{
          transform: 'translateY(2px)',
        }}
      />

      {/* Inner shadow for depth */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: 'inset 0 -1px 3px rgba(0,0,0,0.3)',
        }}
      />

      {/* Bottom darker edge */}
      <span className="absolute inset-x-0 bottom-0 h-2 rounded-b-full bg-gradient-to-b from-transparent to-black/30" />

      {/* Content */}
      <span
        className="relative z-10 tracking-wide"
        style={{ transform: 'translateY(-2px)' }}
      >
        Go to Registration Form
      </span>
      <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 translate-y-[-2px]" />
    </motion.button>
  );
}
