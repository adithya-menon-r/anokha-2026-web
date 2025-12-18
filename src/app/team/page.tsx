'use client';

import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Rocket, Star, Zap } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// --- 1. DATA (Unchanged) ---
const teams = {
  'Core Systems (Web Team)': [
    {
      name: 'Alice',
      role: 'Head',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      tagline: 'Charting the galaxy.',
    },
    {
      name: 'Charlie',
      role: 'Co-Head',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
      tagline: 'Engaging warp drive.',
    },
    {
      name: 'Bob',
      role: 'Member',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      tagline: 'Shields holding at 100%.',
    },
    {
      name: 'Fay',
      role: 'Member',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fay',
      tagline: 'Navigating asteroid fields.',
    },
    {
      name: 'Zoe',
      role: 'Member',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe',
      tagline: 'Maintaining life support.',
    },
    {
      name: 'Max',
      role: 'Member',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
      tagline: 'Optimizing engine output.',
    },
  ],
  'Nebula Ops (Comms)': [
    {
      name: 'Eve',
      role: 'Head',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eve',
      tagline: 'Analyzing star maps.',
    },
    {
      name: 'Dave',
      role: 'Member',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dave',
      tagline: 'Communications online.',
    },
    {
      name: 'Sam',
      role: 'Member',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
      tagline: 'Scanning frequencies.',
    },
    {
      name: 'Ria',
      role: 'Member',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ria',
      tagline: 'Decrypting signals.',
    },
  ],
  'Stellar Design (Creative)': [
    {
      name: 'Luna',
      role: 'Head',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
      tagline: 'Painting the nebula.',
    },
    {
      name: 'Sol',
      role: 'Member',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sol',
      tagline: 'Designing UI matrix.',
    },
  ],
};

// --- 2. SPACE CARD COMPONENT (Same as before) ---
const SpaceCard = ({ member }) => {
  const cardRef = useRef(null);

  const role = member.role.toLowerCase();
  const isHead = role.includes('head') && !role.includes('co');
  const isCoHead = role.includes('co-head');

  const theme = {
    head: {
      primary: 'text-amber-400',
      border: 'border-amber-500/50',
      glow: 'shadow-[0_0_20px_-5px_rgba(245,158,11,0.2)]',
      bg: 'bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-900/30 via-black to-slate-950',
      accent: 'bg-amber-500',
      icon: <Star size={14} className="text-amber-400 fill-amber-400/20" />,
    },
    coHead: {
      primary: 'text-cyan-400',
      border: 'border-purple-500/50',
      glow: 'shadow-[0_0_20px_-5px_rgba(6,182,212,0.15)]',
      bg: 'bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-900/30 via-black to-slate-950',
      accent: 'bg-cyan-500',
      icon: <Zap size={14} className="text-cyan-400 fill-cyan-400/20" />,
    },
    member: {
      primary: 'text-purple-400',
      border: 'border-cyan-500/50',
      glow: 'shadow-none',
      bg: 'bg-gradient-to-b from-slate-900/50 via-black to-slate-950',
      accent: 'bg-purple-500',
      icon: <Rocket size={14} className="text-purple-400" />,
    },
  };

  const style = isHead ? theme.head : isCoHead ? theme.coHead : theme.member;

  return (
    <div
      ref={cardRef}
      className={`relative group w-full max-w-sm h-[350px] rounded-[2rem] p-[1px] overflow-hidden ${style.glow} mx-auto`}
    >
      <div
        className={`relative h-full w-full rounded-[2rem] overflow-hidden flex flex-col ${style.bg} border ${style.border} backdrop-blur-xl`}
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div
          className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-${style.accent.replace('bg-', '')}/20 to-transparent z-0`}
        ></div>

        <div className="relative p-6 flex flex-col items-center z-10 pt-10 flex-grow justify-center">
          <div
            className={`absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg ${style.primary} opacity-40`}
          />
          <div
            className={`absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg ${style.primary} opacity-40`}
          />

          <div className="relative mb-6">
            <div
              className={`absolute -inset-2 rounded-full blur-md opacity-20 ${style.accent}`}
            />
            <div
              className={`relative w-32 h-32 rounded-full p-[2px] border-2 ${style.border} bg-black/50`}
            >
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div
              className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest border bg-black/90 backdrop-blur-md whitespace-nowrap flex items-center gap-2 shadow-lg ${style.primary} ${style.border}`}
            >
              {style.icon}
              <span>{member.role.replace('Co-Head', 'XO')}</span>
            </div>
          </div>

          <div className="relative mt-2 z-10">
            <div
              className={`absolute inset-0 bg-gradient-to-r from-transparent via-${style.accent.replace('bg-', '')}/10 to-transparent skew-x-[-12deg] blur-sm`}
            ></div>
            <h3 className="relative text-2xl font-black text-white font-orbitron tracking-wider text-center uppercase drop-shadow-md">
              {member.name}
            </h3>
          </div>
        </div>

        <div className="relative mt-auto bg-black/40 backdrop-blur-sm border-t border-white/5">
          <div className="p-4 flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-600 font-mono uppercase mb-1">
                STATUS
              </span>
              <div className="flex items-center gap-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full animate-pulse ${style.accent}`}
                />
                <span
                  className={`text-[10px] font-mono tracking-widest uppercase ${style.primary} opacity-70`}
                >
                  {isHead ? 'CMD_AUTH' : 'ONLINE'}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-slate-600 font-mono uppercase mb-1">
                LINK
              </span>
              <div className="flex gap-[2px]">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-2 rounded-[1px] ${style.accent} opacity-30`}
                    style={{
                      animation: `pulse 1.5s infinite ${i * 0.2}s alternate`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. MAIN TEAM PAGE LOGIC ---
const TeamPage = () => {
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);

  // Convert object to array for easier indexing
  const teamEntries = Object.entries(teams);
  const totalTeams = teamEntries.length;
  const [currentTeamName, currentMembers] = teamEntries[activeTeamIndex];

  // Animation handler for switching teams
  const handleTeamChange = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);

    // 1. Exit Animation (Fade out current)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // 2. Update State
          if (direction === 'next') {
            setActiveTeamIndex((prev) => (prev + 1) % totalTeams);
          } else {
            setActiveTeamIndex((prev) => (prev - 1 + totalTeams) % totalTeams);
          }

          // 3. Enter Animation (Will trigger via useEffect when state changes)
        },
      });

      tl.to(contentRef.current, {
        opacity: 0,
        x: direction === 'next' ? -50 : 50, // Move opposite to direction
        duration: 0.3,
        ease: 'power2.in',
      }).to(
        titleRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.2,
        },
        '<',
      );
    }, containerRef);
  };

  // Trigger Enter Animation when activeTeamIndex changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reset position immediately for 'from' animation
      gsap.set(contentRef.current, { x: 50, opacity: 0 }); // Default enter from right

      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      // Animate Title In
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'back.out' },
      );

      // Animate Grid In
      tl.fromTo(
        contentRef.current,
        { opacity: 0, x: 50, scale: 0.98 },
        { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.2',
      );

      // Stagger the cards inside
      tl.from(
        '.space-card-item',
        {
          y: 20,
          opacity: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.3',
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeTeamIndex]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white relative overflow-hidden pt-24 pb-20"
    >
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col min-h-[80vh]">
        {/* --- PAGE HEADER --- */}
        <div className="text-center mb-12">
          <div className="text-center space-y-4 px-4">
            <p className="text-orange-500 font-mono tracking-widest mb-2 text-sm animate-pulse">
              SYSTEM_STATUS: CREW_MANIFEST_LOADED
            </p>
            <h1 className="text-5xl md:text-7xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
              THE CREW
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              The architects of the Anokhaverse.
            </p>
          </div>
        </div>

        {/* --- NAVIGATION & TITLE BAR --- */}
        <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto w-full px-4">
          {/* Prev Button */}
          <button
            onClick={() => handleTeamChange('prev')}
            disabled={isAnimating}
            className="group p-4 rounded-full border border-white/10 bg-white/5 hover:bg-orange-500 hover:border-orange-400 text-white transition-all active:scale-95 disabled:opacity-50"
          >
            <ChevronLeft
              size={32}
              className="group-hover:-translate-x-1 transition-transform"
            />
          </button>

          {/* Current Team Title (Animated) */}
          <div ref={titleRef} className="text-center flex-grow px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-[0.1em] font-orbitron drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              {currentTeamName}
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mt-2"></div>
          </div>

          {/* Next Button */}
          <button
            onClick={() => handleTeamChange('next')}
            disabled={isAnimating}
            className="group p-4 rounded-full border border-white/10 bg-white/5 hover:bg-orange-500 hover:border-orange-400 text-white transition-all active:scale-95 disabled:opacity-50"
          >
            <ChevronRight
              size={32}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* --- TEAM GRID (Dynamic Content) --- */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 justify-items-center w-full"
        >
          {currentMembers.map((member, index) => (
            <div
              key={`${currentTeamName}-${member.name}`}
              className="space-card-item w-full flex justify-center"
            >
              <SpaceCard member={member} />
            </div>
          ))}
        </div>

        {/* --- FOOTER INDICATOR --- */}
        <div className="mt-auto pt-12 flex justify-center gap-2">
          {teamEntries.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeTeamIndex
                  ? 'w-12 bg-orange-500 shadow-[0_0_10px_orange]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
