'use client';

import React, { useState } from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';

interface Criterion {
  title: string;
  weight: number;
  description: string;
}

interface TrackData {
  title: string;
  criteria: Criterion[];
}

interface CriteriaData {
  genAI: TrackData;
  agenticAI: TrackData;
  aiot: TrackData;
}

interface RadarDataPoint {
  name: string;
  value: number;
}

interface TickProps {
  payload?: { value: string };
  x?: number;
  y?: number;
  index?: number;
}

export default function JudgingCriteriaRadar(): React.JSX.Element {
  const [activeTrack, setActiveTrack] = useState<number>(0);

  const criteriaData: CriteriaData = {
    genAI: {
      title: 'Generative AI Track',
      criteria: [
        {
          title: 'Technical Merit',
          weight: 40,
          description:
            'Proper use of AI tools and platforms, effective application of the tech stack, coding quality, and scalability for sustainable adoption.',
        },
        {
          title: 'User Experience(UI)',
          weight: 20,
          description:
            'Intuitive interface design and seamless integration of AI features, ensuring accessibility, usability, and engaging interaction for end users.',
        },
        {
          title: 'Innovation & Creativity',
          weight: 20,
          description:
            'Originality of ideas and disruptive potential, showcasing fresh approaches that leverage AI tools to improve or transform existing processes.',
        },
        {
          title: 'Impact & Alignment',
          weight: 20,
          description:
            'Clear alignment with the chosen theme and tangible community benefit, demonstrating meaningful contributions through responsible AI solutions.',
        },
      ],
    },

    agenticAI: {
      title: 'Agentic AI Track',
      criteria: [
        {
          title: 'Architecture & Autonomy',
          weight: 40,
          description:
            'Strength of system architecture and effective use of agent protocols, AI tools, and platforms to enable autonomy and adaptive decision-making.',
        },
        {
          title: 'User Experience(UI)',
          weight: 20,
          description:
            'Smooth interaction flow and collaborative design, ensuring agentic systems remain intuitive, accessible, and easy to use across workflows.',
        },
        {
          title: 'Innovation & Adaptability',
          weight: 20,
          description:
            'Novel agentic approaches and flexibility to scale or evolve across domains, highlighting adaptability powered by AI platforms and multi-agent systems.',
        },
        {
          title: 'Impact & Alignment',
          weight: 20,
          description:
            'Alignment with the chosen theme and demonstration of meaningful industry or community impact through agentic AI capabilities.',
        },
      ],
    },

    aiot: {
      title: 'AIoT & Edge Track',
      criteria: [
        {
          title: 'Technical Merit',
          weight: 40,
          description:
            'Judges assess proper use of AI tools and IoT platforms, coding quality, and effective use of Wokwi simulation to validate hardware logic before deployment.',
        },
        {
          title: 'User Experience(UI)',
          weight: 20,
          description:
            'Evaluation focuses on intuitive interface design and smooth device interaction, ensuring solutions are accessible, user-friendly, and pleasant to operate across connected environments.',
        },
        {
          title: 'Innovation & Practicality',
          weight: 20,
          description:
            'Projects are judged on originality, creativity, and practical application of AIoT, highlighting novel approaches that solve real-world problems with intelligent edge devices.',
        },
        {
          title: 'Impact & Alignment',
          weight: 20,
          description:
            'Solutions must align with the chosen theme and demonstrate tangible benefits, showcasing meaningful community or industry impact through responsible AIoT innovation.',
        },
      ],
    },
  };

  const buildRadarData = (criteria: Criterion[]): RadarDataPoint[] =>
    criteria.map((criterion) => ({
      name: criterion.title,
      value: criterion.weight,
    }));

  const tracks = Object.values(criteriaData);
  const currentTrack = tracks[activeTrack];
  const radarData = buildRadarData(currentTrack.criteria);

  const wrapLabel = (label: string): React.JSX.Element => {
    const words = label.split(' ');
    const mid = Math.ceil(words.length / 2);

    return (
      <>
        <tspan x="0" dy="-6" textAnchor="middle">
          {words.slice(0, mid).join(' ')}
        </tspan>
        <tspan x="0" dy="12" textAnchor="middle">
          {words.slice(mid).join(' ')}
        </tspan>
      </>
    );
  };

  const getAdjustedMobileOffset = (
    x: number,
    y: number,
    index: number,
  ): { x: number; y: number } => {
    const cx = 150;
    const cy = 162;
    let OFFSET = 34;
    if (index === 0) {
    }
    if (index === 2) {
      OFFSET = 19;
    }

    const angle = Math.atan2(y - cy, x - cx);
    return {
      x: x + OFFSET * Math.cos(angle),
      y: y + OFFSET * Math.sin(angle),
    };
  };

  const getAdjustedLaptopOffset = (
    x: number,
    y: number,
    index: number,
  ): { x: number; y: number } => {
    const cx = 184;
    const cy = 170;

    let OFFSET = 46;

    if (index === 0) OFFSET = 20;
    if (index === 2) OFFSET = 26;

    const angle = Math.atan2(y - cy, x - cx);

    return {
      x: x + OFFSET * Math.cos(angle),
      y: y + OFFSET * Math.sin(angle),
    };
  };

  return (
    <section
      id="judging"
      className="relative overflow-hidden py-16 lg:py-24 border-t border-white/10"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            <span className="text-white">Judging</span>{' '}
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 text-transparent bg-clip-text">
              Criteria
            </span>
          </h2>

          <p className="mx-auto mt-4 text-lg text-zinc-400 max-w-2xl italic">
            Each radar chart visualizes how heavily each criterion influences
            your final score for that track.
          </p>
        </div>

        <div className="flex flex-nowrap overflow-x-auto no-scrollbar justify-center gap-3 mb-12">
          {tracks.map((track, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTrack(idx)}
              className={`px-2 py-2 rounded-lg font-semibold text-[11px] sm:text-xs border whitespace-nowrap transition-all ${
                activeTrack === idx
                  ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white border-purple-400'
                  : 'text-zinc-300 border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              {track.title}
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-13xl">
          <article className="relative rounded-2xl p-[1px] bg-gradient-to-b from-white/5 via-white/10 to-white/5">
            <div
              className="rounded-2xl h-full flex flex-col p-6 lg:p-8"
              style={{
                background:
                  'radial-gradient(circle at 0% 0%, rgba(56,189,248,0.08), transparent 55%), radial-gradient(circle at 100% 100%, rgba(168,85,247,0.24), rgba(12,10,24,1) 60%)',
                border: '1px solid rgba(248,250,252,0.05)',
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
                <div className="rounded-2xl bg-black/40 border border-white/5 pl-1 pr-2 pt-7 lg:w-[380px] mx-auto">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        data={radarData}
                        margin={{ top: 10, right: 99, bottom: 10, left: 70 }}
                      >
                        <PolarGrid
                          stroke="rgba(148,163,184,0.35)"
                          radialLines={false}
                        />

                        <PolarAngleAxis
                          dataKey="name"
                          tick={(props: any) => {
                            const { payload, x, y, index } = props;
                            if (
                              !payload ||
                              x === undefined ||
                              y === undefined ||
                              index === undefined
                            ) {
                              return <text />;
                            }
                            const label = payload.value;

                            const isMobile =
                              typeof window !== 'undefined' &&
                              window.innerWidth < 640;
                            const isLaptop =
                              typeof window !== 'undefined' &&
                              window.innerWidth >= 1024;

                            const words = label.split(' ');
                            const mid = Math.ceil(words.length / 2);
                            const line1 = words.slice(0, mid).join(' ');
                            const line2 = words.slice(mid).join(' ');
                            const pos = isMobile
                              ? getAdjustedMobileOffset(x, y, index)
                              : isLaptop
                                ? getAdjustedLaptopOffset(x, y, index)
                                : { x, y };

                            return (
                              <text
                                x={pos.x}
                                y={pos.y}
                                textAnchor="middle"
                                fill="#e5e7eb"
                                fontSize="11"
                                dominantBaseline="middle"
                              >
                                {isMobile ? (
                                  <>
                                    <tspan x={pos.x} dy="-6">
                                      {line1}
                                    </tspan>
                                    <tspan x={pos.x} dy="12">
                                      {line2}
                                    </tspan>
                                  </>
                                ) : (
                                  label
                                )}
                              </text>
                            );
                          }}
                        />
                        <PolarRadiusAxis
                          angle={50}
                          domain={[0, 40]}
                          ticks={[0, 20, 40] as any}
                          tickFormatter={(v) => `${v}`}
                          tick={{ fill: '#9ca3af', fontSize: 12 }}
                          axisLine={false}
                          tickCount={3}
                          tickSize={8}
                        />

                        <Radar
                          name="Weight (%)"
                          dataKey="value"
                          stroke="rgba(168,85,247,0.9)"
                          fill="rgba(168,85,247,0.35)"
                          fillOpacity={0.7}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <p className="mt-2 mr-2 ml-2 mb-4 text-xs text-center text-zinc-400">
                    The larger the area toward a point, the more that criterion
                    influences your score.
                  </p>
                </div>
                <div className="lg:col-span-2 space-y-4 pl-4">
                  {currentTrack.criteria.map(
                    (criterion: Criterion, index: number) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-3"
                      >
                        {/* Top Row: Number + Title + Percentage */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                              style={{
                                background:
                                  'radial-gradient(circle at 30% 0%, #e5e7eb, #a855f7)',
                                color: '#020617',
                              }}
                            >
                              {index + 1}
                            </div>

                            <h5 className="font-semibold text-base">
                              {criterion.title}
                            </h5>
                          </div>

                          <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/40">
                            {criterion.weight}%
                          </span>
                        </div>

                        {/* Full-width description */}
                        <p className="text-sm text-zinc-300 leading-relaxed w-full">
                          {criterion.description}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
