import { Rocket, Star, Zap } from 'lucide-react';
import { useRef } from 'react';
import { TeamMember } from '@/types/team';

type TeamCardProps = {
  member: TeamMember;
};

export function TeamCard({ member }: TeamCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

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
      className={`relative group w-full max-w-sm h-[350px] rounded-[2rem] p-[1px] overflow-hidden ${style.glow}`}
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
              <span>{member.role}</span>
            </div>
          </div>

          <div className="relative mt-2 z-10">
            <div
              className={`absolute inset-0 bg-gradient-to-r from-transparent via-${style.accent.replace('bg-', '')}/10 to-transparent skew-x-[-12deg] blur-sm`}
            ></div>
            <h3 className="relative text-2xl font-black text-white font-orbitron tracking-wider text-center uppercase drop-shadow-md">
              {member.name}
            </h3>

            <p className="mt-1 text-[11px] font-mono tracking-widest text-slate-300 uppercase text-center">
              {member.rollNumber}
            </p>
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
}
