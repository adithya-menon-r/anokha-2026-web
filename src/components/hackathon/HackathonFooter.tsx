'use client';

import { Mail, MapPin } from 'lucide-react';
import React from 'react';

export default function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
          {/* Brand & Description */}
          <div className="text-center md:text-left max-w-lg">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
              <img
                src="/hackathon/logo_white.png"
                alt="Logo"
                className="h-10 w-10 transition-transform duration-500 hover:rotate-12"
              />
              <span className="text-xl font-bold tracking-tight">
                AI-Verse Hackathon
              </span>
            </div>
            <p className="text-zinc-300 mb-8">
              Empowering the next generation of AI innovators. Join us to build,
              learn, and shape the future of technology.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="#"
                className="mr-2 h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <img
                  src={`https://cdn.simpleicons.org/instagram/ffffff`}
                  alt="Social Logo"
                  className="h-4 w-4"
                />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="text-center md:text-right">
            <h3 className="font-bold text-white mb-6">Contact Us</h3>
            <div className="space-y-4 text-zinc-400">
              <a
                href="mailto:tensorclub@cb.amrita.edu"
                className="flex items-center justify-center md:justify-end gap-3 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <Mail className="h-4 w-4 text-purple-400" />
                <span>tensorclub@cb.amrita.edu</span>
              </a>
              <a
                href="https://maps.app.goo.gl/NQodXDV6G3ry9KEi6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-end gap-3 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <MapPin className="h-4 w-4 text-purple-400" />
                <span>Amrita Vishwa Vidyapeetham, Coimbatore</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            © 2025 AI-Verse Hackathon. All rights reserved.
          </p>
          <p className="text-sm text-zinc-500 flex items-center gap-1">
            Made with <span className="text-red-500">♥</span> by{' '}
            <span className="text-white font-medium">AI-Verse Web Team</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
