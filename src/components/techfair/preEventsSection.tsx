import { Lightbulb, MessageSquareText } from 'lucide-react';

export default function PreEventsSection() {
  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 fade-in-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-full text-amber-300 text-sm font-semibold tracking-wider uppercase mb-6">
            Exclusive Sessions
          </div>
          <h2 className="font-nk57 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-orange-300 to-amber-400 bg-clip-text text-transparent">
            Anokha Pre Events
          </h2>
          <p className=" font-tech text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            In collaboration with the Institution's Innovation Council (IIC)
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Workshop */}
          <div className="group relative bg-gradient-to-br from-orange-900/10 to-amber-900/10 backdrop-blur-md border border-orange-400/20 rounded-3xl p-8 sm:p-10 hover:border-orange-400/40 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-8 h-8 text-orange-300" />
                </div>
              </div>
              <h3 className="font-notoSerif text-2xl sm:text-3xl font-bold text-orange-300 mb-4 leading-tight">
                Workshop on Design Thinking, Creative Thinking & Innovation
                Design
              </h3>
              <div className="px-4 py-1 bg-orange-500/20 border border-orange-400/30 rounded-full text-orange-300 text-xs font-semibold w-fit mb-6">
                Date: TBA
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                This workshop guides participants through a structured approach
                to understanding problems, exploring user needs, and shaping
                ideas into well-defined solutions. It helps students move from
                raw ideas to refined concepts with clarity, feasibility, and
                innovation readiness, making them suitable for presentation at
                the TechFair.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Design Thinking',
                  'Creative Problem Solving',
                  'Innovation',
                  'Prototype Development',
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-orange-500/10 border border-orange-400/20 rounded-full text-orange-300/80 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Expert Talk */}
          <div className="group relative bg-gradient-to-br from-orange-900/10 to-amber-900/10 backdrop-blur-md border border-orange-400/20 rounded-3xl p-8 sm:p-10 hover:border-orange-400/40 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MessageSquareText className="w-8 h-8 text-orange-300" />
                </div>
              </div>
              <h3 className="font-notoSerif text-2xl sm:text-3xl font-bold text-orange-300 mb-4 leading-tight">
                Expert Talk on TRL, MRL, IRL, IP Commercialisation & Technology
                Transfer
              </h3>
              <div className="px-4 py-1 bg-orange-500/20 border border-orange-400/30 rounded-full text-orange-300 text-xs font-semibold w-fit mb-6">
                Date: TBA
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                This expert session provides insights into Technology Readiness
                Level (TRL), Manufacturing Readiness Level (MRL), Innovation
                Readiness Level (IRL), along with IP commercialization and
                technology transfer processes. The parameters discussed will
                also be considered during project scrutiny, offering
                participants clarity on innovation assessment standards defined
                by the Ministry of Education (MoE).
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'TRL/MRL/IRL',
                  'IP Rights',
                  'Commercialization',
                  'Tech Transfer',
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-orange-500/10 border border-orange-400/20 rounded-full text-orange-300/80 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-400/30 rounded-2xl backdrop-blur-sm">
            <p className="text-amber-200 text-sm sm:text-base">
              <span className="font-semibold">Bonus:</span> Participation in
              these pre-events serves as an added advantage for students
              preparing for{' '}
              <span className="text-orange-300 font-semibold">
                Smart India Hackathon (SIH)
              </span>{' '}
              and other innovation-driven initiatives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
