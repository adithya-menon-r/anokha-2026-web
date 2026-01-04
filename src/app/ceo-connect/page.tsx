'use client';

import gsap from 'gsap';
import {
  Briefcase,
  Calendar,
  Cloud,
  Cpu,
  Factory,
  Globe,
  Linkedin,
  Rocket,
  Shield,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface Speaker {
  name: string;
  designation: string;
  linkedin: string;
  expertise: string[];
  domains: string[];
}

type DayKey = 'day1' | 'day2' | 'day3';

const CEOConnect = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const ufoRef = useRef<HTMLImageElement>(null);
  const [activeDay, setActiveDay] = useState<DayKey>('day1');

  useEffect(() => {
    // Create stars animation
    const createStars = () => {
      const starsContainer = document.getElementById('stars');
      if (!starsContainer) return;

      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        starsContainer.appendChild(star);
      }
    };

    createStars();

    // Animate hero text content
    if (heroRef.current) {
      const heroContent = heroRef.current.querySelector('.hero-content');
      if (heroContent) {
        gsap.fromTo(
          heroContent,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            delay: 2,
            ease: 'power2.out',
          },
        );
      }
    }

    // GSAP Animation for UFO
    const loadGSAP = async () => {
      if (!ufoRef.current) return;

      const ufo = ufoRef.current;

      // Helper function to get responsive scale
      const getUFOScale = () => {
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 768) return 1.2;
        if (window.innerWidth < 1024) return 1.3;
        if (window.innerWidth < 1280) return 1.4;
        return 1.5; // Large desktop
      };

      // Helper function to get responsive position
      const getUFOPosition = () => {
        if (window.innerWidth < 640) return { x: 20, y: 40 };
        if (window.innerWidth < 768) return { x: 40, y: 80 };
        if (window.innerWidth < 1024) return { x: 20, y: 100 };
        if (window.innerWidth < 1280) return { x: 80, y: 120 };
        return { x: 20, y: 140 };
      };

      // Initial setup - UFO starts from top-left off-screen
      gsap.set(ufo, {
        x: -300,
        y: -300,
        scale: 0.3,
        opacity: 0,
        rotation: -45,
      });

      // Create timeline for UFO entrance
      const tl = gsap.timeline({ delay: 0.5 });

      const startPos = getUFOPosition();
      const startScale = getUFOScale();

      // Phase 1: Enter from top-left with glow effect
      tl.to(ufo, {
        x: startPos.x,
        y: startPos.y,
        scale: startScale,
        opacity: 1,
        rotation: 0,
        duration: 2.5,
        ease: 'power2.out',
      });

      // Responsive resize handler
      const handleResize = () => {
        const newScale = getUFOScale();
        const newPos = getUFOPosition();
        gsap.to(ufo, {
          scale: newScale,
          x: newPos.x,
          y: newPos.y,
          duration: 0.3,
        });
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    };

    loadGSAP();
  }, []);

  const speakers: Record<DayKey, Speaker[]> = {
    day1: [
      {
        name: 'Elango Narayanan',
        designation: 'MD, Polkart Logistics',
        linkedin: 'https://www.linkedin.com/in/elango-narayanan-2a2a027/',
        expertise: [
          'Supply Chain Optimization',
          'Logistics Digitization',
          'Business Analytics',
          'M&A-led Growth',
        ],
        domains: [
          'Industry 4.0 & Smart Manufacturing',
          'Cloud & Digital Transformation',
        ],
      },
      {
        name: 'Sharmila S',
        designation: 'CEO, Corefactors',
        linkedin: 'https://www.linkedin.com/in/sharmilasundaram/',
        expertise: [
          'CRM Platforms',
          'Revenue Operations (RevOps)',
          'SaaS Product Innovation',
          'Digital Business Leadership',
        ],
        domains: ['Cloud Computing & Digital Transformation', 'AI & Big Data'],
      },
      {
        name: 'C.R. Gopinath',
        designation: 'Global Practice Director, HCLTech',
        linkedin: 'https://www.linkedin.com/in/gopinath-c-r-698555347/',
        expertise: [
          'Enterprise Architecture',
          'CRM/ERP Platforms',
          'Program Management',
          'Digital Consulting',
        ],
        domains: ['Cloud Computing & Digital Transformation', 'AI & Big Data'],
      },
      {
        name: 'Dr. S. Devarajan',
        designation: 'Sr. VP, TVS Motors',
        linkedin:
          'https://www.linkedin.com/in/s-devarajan-ped-hos-devarajan-743677a3/',
        expertise: [
          'Advanced Manufacturing',
          'Digital Manufacturing',
          'Lean/TPM/JIT',
          'Production Engineering',
        ],
        domains: [
          'Industry 4.0 & Smart Manufacturing',
          'Robotics & Automation',
        ],
      },
      {
        name: 'A.N. Chandramouli',
        designation: 'CEO, ANCM Consultants',
        linkedin: 'https://www.linkedin.com/in/chandramouli-mouli-a82580107',
        expertise: [
          'Industry 4.0 Advisory',
          'Automation & Additive Manufacturing',
          'Precision Machining',
          'MSME Transformation',
        ],
        domains: [
          'Industry 4.0',
          'Robotics & Automation',
          'Smart Manufacturing',
        ],
      },
      {
        name: 'Jagannath V',
        designation: 'COO, m2nxt',
        linkedin:
          'https://www.linkedin.com/in/jagannath-varadaraja-iyengar-255555186/',
        expertise: [
          'CNC Automation',
          'Robotics & AGVs/AMRs',
          'Smart Factory MES Integration',
          'EV Manufacturing Transition',
        ],
        domains: [
          'Robotics & Automation',
          'IoT & Edge Computing',
          'Industry 4.0',
        ],
      },
    ],
    day2: [
      {
        name: 'Solomon Jones',
        designation: 'CEO, Terracarb',
        linkedin: 'https://www.linkedin.com/in/solomonjones2311/',
        expertise: [
          'Graphene Materials',
          'Sustainable Construction',
          'Advanced Materials Commercialization',
          'Decarbonization',
        ],
        domains: ['Electric Vehicles & Sustainable Mobility', 'Industry 4.0'],
      },
      {
        name: 'Sathish Kumar Krishna',
        designation: 'CEO, Intrcept Labs',
        linkedin: 'https://in.linkedin.com/in/satishkrishna21',
        expertise: [
          'Cybersecurity Strategy',
          'AI/ML for Security',
          'Digital Transformation',
          'M&A Integration',
        ],
        domains: ['Cybersecurity', 'AI & Big Data'],
      },
      {
        name: 'Satish Mohanram',
        designation: 'Sr. Director, SiMa.ai',
        linkedin: 'https://www.linkedin.com/in/satishmohanram/',
        expertise: [
          'Edge AI Semiconductors',
          'Energy-efficient ML Systems',
          'Go-to-Market Strategy',
          'Embedded AI Platforms',
        ],
        domains: ['IoT & Edge Computing', 'AI & Big Data', 'Embedded Systems'],
      },
      {
        name: 'P. Ramakrishnan',
        designation: 'Group Executive Director & CTO, DLF',
        linkedin: 'https://www.linkedin.com/in/p-ramakrishnan-79780923/',
        expertise: [
          'Digital Transformation in Real Estate',
          'Smart Infrastructure',
          'Project Management',
          'Technology Strategy',
        ],
        domains: ['Cloud & Digital Transformation', 'Industry 4.0'],
      },
      {
        name: 'Mr. Jay Nanduri',
        designation: 'CTO, Truveta',
        linkedin: 'https://www.linkedin.com/in/jaynanduri',
        expertise: [
          'Technology Leadership',
          'AI & ML',
          'Big Data',
          'Cloud Platforms',
          'Security',
          'Fraud Protection',
        ],
        domains: ['AI & ML', 'Fraud Protection', 'Data-driven Platforms'],
      },
      {
        name: 'Jaison John',
        designation: 'Marketing Director, MFAR Caron',
        linkedin: 'https://www.linkedin.com/in/jaison-john-28444124/',
        expertise: [
          'Software Engineering',
          'Full-stack & Backend Development',
          'ML & Data Quality',
          'Systems Integration',
        ],
        domains: ['Software Engineering', 'System Integration'],
      },
      {
        name: 'N. Ramachandran',
        designation: 'Chairman, MEL Systems',
        linkedin:
          'https://www.linkedin.com/in/ramachandran-natarajan-75279425/',
        expertise: [
          'Industrial Automation',
          'Defense Electronics',
          'Aerospace Systems',
          'Test & Measurement',
        ],
        domains: ['Robotics & Automation', 'Embedded Systems', 'Industry 4.0'],
      },
      {
        name: 'Raj Kishore Naik',
        designation: 'VP, Ashok Leyland',
        linkedin: 'https://www.linkedin.com/in/raj-kishore-naik-a02bb52b/',
        expertise: [
          'Automotive Product Engineering',
          'Supplier Development',
          'Quality Systems',
          'Supply Chain Resilience',
        ],
        domains: ['Electric Vehicles', 'Industry 4.0', 'Smart Manufacturing'],
      },
      {
        name: 'Sanjeev Jain',
        designation: 'COO, Wipro',
        linkedin: 'https://www.linkedin.com/in/sanjeevakjain/',
        expertise: [
          'Global Operations Leadership',
          'Operational Transformation',
          'Customer Advocacy',
          'Centers of Excellence',
        ],
        domains: ['Cloud & Digital Transformation', 'Enterprise IT Operations'],
      },
    ],
    day3: [
      {
        name: 'Dr. T.R. Parasuraman',
        designation: 'Executive Advisor, Toyota Group',
        linkedin: 'https://www.linkedin.com/in/parasuraman/',
        expertise: [
          'Lean Manufacturing',
          'TQM & TPM',
          'Automotive Supply Chains',
          'Japanese Manufacturing Practices',
        ],
        domains: ['Industry 4.0', 'Smart Manufacturing', 'Electric Vehicles'],
      },
    ],
  };

  const domains = [
    {
      icon: Rocket,
      name: 'Electric Vehicles',
      color: 'from-purple-500 to-pink-500',
    },
    { icon: Cpu, name: 'AI & IoT', color: 'from-blue-500 to-cyan-500' },
    {
      icon: Briefcase,
      name: 'Robotics',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Factory,
      name: 'Industry 4.0',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Cloud,
      name: 'Cloud & Digital',
      color: 'from-indigo-500 to-purple-500',
    },
    { icon: Shield, name: 'Cyber Security', color: 'from-red-500 to-pink-500' },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated Stars Background */}
      <div id="stars" className="fixed inset-0 z-0"></div>

      {/* Gradient Overlays */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-blue-900/20 z-0"></div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative z-10 min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8"
      >
        {/* UFO Element */}
        <img
          ref={ufoRef}
          src="/ceo/ufo.png"
          alt="UFO"
          className="justify-center pointer-events-none z-20 will-change-transform"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))',
            mixBlendMode: 'screen',
            width: 'auto',
            height: 'auto',
            maxWidth: '1000px',
          }}
        />

        {/* Animated light beams from UFO */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="light-beam"></div>
          <div className="light-beam-2"></div>
        </div>

        <div className="text-center space-y-4 max-w-5xl mx-auto relative z-30 hero-content -mt-8 sm:mt-0">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse px-4">
            CEO CONNECT
          </h1>

          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto px-4">
            A three-day flagship conclave connecting students with industry
            pioneers, founders, and technology leaders shaping tomorrow's
            innovations
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 pt-6 sm:pt-8 px-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-lg border border-purple-500/30 backdrop-blur-sm">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              <span className="text-sm sm:text-base text-purple-300">
                7-9 January 2026
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/30 backdrop-blur-sm">
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <span className="text-sm sm:text-base text-blue-300">
                16+ Industry Leaders
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-4xl mx-auto">
          {/* Main Box: Added 'shadow-purple-500/20 shadow-2xl' and 'backdrop-blur-md' for the frost effect */}
          <div className="relative group overflow-hidden bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-purple-400/30 backdrop-blur-md shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-500 hover:border-purple-400/50">
            {/* Glow Effect Overlay: Creates a frost/radial light source inside the box */}
            <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[140%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                About CEO Connect
              </h2>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                <span className="text-purple-300 font-semibold">
                  CEO Connect
                </span>{' '}
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
                <span className="text-pink-300">emerging technologies</span> and
                real-world innovation.
              </p>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                The conclave features talks, panel discussions, and interactive
                sessions that allow students to{' '}
                <span className="text-purple-200">
                  engage directly with leaders
                </span>{' '}
                and see how classroom learning translates into industry
                practice. Students get to meet these professionals live,
                interact with them in person, and hear first-hand accounts of{' '}
                <span className="text-white font-medium">
                  leadership journeys
                </span>
                , product development, and{' '}
                <span className="text-pink-300">
                  large-scale transformation
                </span>
                .
              </p>
            </div>

            {/* Decorative Corner Glow */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Thematic Domains */}
      <section className="relative z-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Thematic Domains
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {domains.map((domain, idx) => (
              <div
                key={idx}
                className="group relative bg-slate-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${domain.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}
                >
                  <domain.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {domain.name}
                </h3>
                <div
                  className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${domain.color} transition-all duration-300 rounded-full`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speaker Schedule */}
      <section className="relative z-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Speaker Schedule
          </h2>

          {/* Day Selector */}
          <div className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 flex-wrap px-2">
            {[
              {
                key: 'day1' as DayKey,
                label: '7th Jan',
                subtitle: 'Wednesday',
              },
              { key: 'day2' as DayKey, label: '8th Jan', subtitle: 'Thursday' },
              { key: 'day3' as DayKey, label: '9th Jan', subtitle: 'Friday' },
            ].map((day) => (
              <button
                key={day.key}
                onClick={() => setActiveDay(day.key)}
                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeDay === day.key
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105 shadow-lg shadow-purple-500/50'
                    : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50 border border-slate-700'
                }`}
              >
                <div className="text-base sm:text-lg">{day.label}</div>
                <div className="text-xs opacity-75">{day.subtitle}</div>
              </button>
            ))}
          </div>

          {/* Speaker Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {speakers[activeDay].map((speaker: Speaker, idx: number) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-102"
              >
                <div className="flex items-start justify-between mb-4 gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 break-words">
                      {speaker.name}
                    </h3>
                    <p className="text-purple-400 font-medium text-sm sm:text-base break-words">
                      {speaker.designation}
                    </p>
                  </div>
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-2 bg-blue-600/20 hover:bg-blue-600/40 rounded-lg transition-colors"
                  >
                    <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  </a>
                </div>

                <div className="mb-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-400 mb-2">
                    EXPERTISE
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {speaker.expertise.map((exp: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 sm:px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-xs sm:text-sm border border-purple-500/20"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-400 mb-2">
                    DOMAINS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {speaker.domains.map((domain: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 sm:px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-xs sm:text-sm border border-blue-500/20"
                      >
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`

        .light-beam {
          position: absolute;
          top: 0;
          left: 5%;
          width: 150px;
          height: 400px;
          background: linear-gradient(180deg, 
            rgba(168, 85, 247, 0.4) 0%,
            rgba(168, 85, 247, 0.2) 30%,
            rgba(168, 85, 247, 0.1) 60%,
            transparent 100%);
          filter: blur(20px);
          transform: skewX(-10deg);
          animation: beamPulse 3s ease-in-out infinite;
          pointer-events: none;
          z-index: 15;
        }

        .light-beam-2 {
          position: absolute;
          top: 0;
          left: 8%;
          width: 100px;
          height: 350px;
          background: linear-gradient(180deg, 
            rgba(236, 72, 153, 0.3) 0%,
            rgba(236, 72, 153, 0.15) 30%,
            rgba(236, 72, 153, 0.05) 60%,
            transparent 100%);
          filter: blur(15px);
          transform: skewX(5deg);
          animation: beamPulse 3s ease-in-out infinite 0.5s;
          pointer-events: none;
          z-index: 15;
        }

        @keyframes beamPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }

        @media (max-width: 640px) {
          .light-beam {
            width: 80px;
            height: 250px;
            left: 10%;
          }
          .light-beam-2 {
            width: 60px;
            height: 200px;
            left: 15%;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .light-beam {
            width: 120px;
            height: 320px;
            left: 8%;
          }
          .light-beam-2 {
            width: 80px;
            height: 280px;
            left: 12%;
          }
        }
      `}</style>
    </div>
  );
};

export default CEOConnect;
