'use client';

import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { TeamCard } from '@/components/team/TeamsCard';
import UnifiedBackground from '@/components/UnifiedBackground';
import { teams } from '@/features/teams/data/team';

const TeamPage = () => {
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  const teamEntries = Object.entries(teams);
  const totalTeams = teamEntries.length;
  const [currentTeamName, currentMembers] = teamEntries[activeTeamIndex];

  const handleTeamChange = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (direction === 'next') {
            setActiveTeamIndex((prev) => (prev + 1) % totalTeams);
          } else {
            setActiveTeamIndex((prev) => (prev - 1 + totalTeams) % totalTeams);
          }
        },
      });

      tl.to(contentRef.current, {
        opacity: 0,
        x: direction === 'next' ? -50 : 50,
        duration: 0.3,
        ease: 'power2.in',
      }).to(titleRef.current, { opacity: 0, y: -20, duration: 0.2 }, '<');
    }, containerRef);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { x: 50, opacity: 0 });

      const tl = gsap.timeline({ onComplete: () => setIsAnimating(false) });

      // Animate title
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'back.out' },
      );

      // Animate grid
      tl.fromTo(
        contentRef.current,
        { opacity: 0, x: 50, scale: 0.98 },
        { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.2',
      );

      // Stagger cards
      tl.from(
        '.space-card-item',
        { y: 20, opacity: 0, stagger: 0.05, duration: 0.4, ease: 'power2.out' },
        '-=0.3',
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeTeamIndex]);

  return (
    <div
      ref={containerRef}
      className="min-h-scree text-white relative overflow-hidden pt-16 pb-20"
    >
      <div className="fixed inset-0 pointer-events-none">
        <UnifiedBackground />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col min-h-[80vh]">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="text-center space-y-4 px-4">
            {/* <p className="text-orange-500 font-mono tracking-widest mb-2 text-sm animate-pulse">
              SYSTEM_STATUS: CREW_MANIFEST_LOADED
            </p> */}
            <h1 className="text-5xl md:text-7xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
              THE CREW
            </h1>
            <p className="text-orange-500 font-mono tracking-widest max-w-2xl mx-auto text-lg animate-pulse">
              The architects of the Anokhaverse.
            </p>
          </div>
        </div>

        {/* Navigation & Title */}
        <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto w-full px-4">
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

          <div ref={titleRef} className="text-center flex-grow px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-[0.1em] font-orbitron drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              {currentTeamName}
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mt-2"></div>
          </div>

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

        {/* Team Grid */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 justify-items-center w-full"
        >
          {currentMembers.map((member) => (
            <div
              key={`${currentTeamName}-${member.name}`}
              className="space-card-item w-full flex justify-center"
            >
              <TeamCard member={member} />
            </div>
          ))}
        </div>

        {/* Footer Indicators */}
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
