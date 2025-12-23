export default function InitiativesSection() {
  return (
    /* Added font-bento class here to cover all nested text */
    <section className="font-michroma py-20 lg:py-32 px-4 sm:px-6 lg:px-8 fade-in-section parallax-slow">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-400/30 rounded-full text-orange-300 text-sm font-semibold tracking-wider uppercase mb-6">
            What's New
          </div>
          <h2 className="font-nk57 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-300 via-amber-300 to-orange-400 bg-clip-text text-transparent">
            New Initiatives 2026
          </h2>
        </div>

        <div className="space-y-8 lg:space-y-12">
          {/* Club Corner */}
          <div className="group relative bg-gradient-to-br from-orange-900/10 to-amber-900/10 backdrop-blur-md border border-orange-400/20 rounded-3xl p-8 sm:p-12 hover:border-orange-400/40 transition-all duration-500">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-10 h-10 text-orange-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-tech text-3xl sm:text-4xl font-bold text-orange-300 mb-4">
                  Club Corner
                </h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  A dedicated space that brings together technical and
                  innovation-driven student clubs to showcase their journey,
                  achievements, and impact. Clubs present their flagship
                  projects, working prototypes, research outcomes, and
                  competition successes, highlighting hands-on learning and
                  collaboration. This initiative reflects the vibrant student
                  innovation ecosystem and allows visitors to explore how
                  club-led activities contribute to real-world problem solving
                  and technical excellence.
                </p>
              </div>
            </div>
          </div>

          {/* Mentor-Mentee Matchup */}
          <div className="group relative bg-gradient-to-br from-orange-900/10 to-amber-900/10 backdrop-blur-md border border-orange-400/20 rounded-3xl p-8 sm:p-12 hover:border-orange-400/40 transition-all duration-500">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-10 h-10 text-orange-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-tech text-3xl sm:text-4xl font-bold text-orange-300 mb-4">
                  Mentor–Mentee Matchup
                </h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Enables meaningful interactions between students and
                  experienced mentors from academia, industry, and incubation
                  ecosystems. Participants are matched with mentors based on
                  domain interests and project focus, ensuring relevant and
                  focused guidance. These sessions help refine ideas, strengthen
                  projects, and provide insights into research, startups, and
                  career pathways, while also offering valuable networking
                  opportunities for external participants.
                </p>
              </div>
            </div>
          </div>

          {/* Innovation Tree */}
          <div className="group relative bg-gradient-to-br from-orange-900/10 to-amber-900/10 backdrop-blur-md border border-orange-400/20 rounded-3xl p-8 sm:p-12 hover:border-orange-400/40 transition-all duration-500">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-10 h-10 text-orange-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-tech text-3xl sm:text-4xl font-bold text-orange-300 mb-4">
                  Innovation Tree
                </h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  An interactive idea-generation platform where participants
                  share innovative ideas and real-world problem statements
                  aligned with the event theme. By visually contributing ideas,
                  it encourages creative thinking, cross-domain perspectives,
                  and community-driven innovation. The collected ideas serve as
                  a living repository that helps mentors and institutions
                  identify promising concepts for further mentoring, hackathons,
                  or incubation support.
                </p>
              </div>
            </div>
          </div>

          {/* Daily Quizzes */}
          <div className="group relative bg-gradient-to-br from-orange-900/10 to-amber-900/10 backdrop-blur-md border border-orange-400/20 rounded-3xl p-8 sm:p-12 hover:border-orange-400/40 transition-all duration-500">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-10 h-10 text-orange-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-tech text-3xl sm:text-4xl font-bold text-orange-300 mb-4">
                  Daily Quizzes
                </h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-orange-400/50 pl-6">
                    <h4 className="text-xl sm:text-2xl font-semibold text-orange-200 mb-2">
                      Day 1: Find Fake Tech Myth Buster
                    </h4>
                    <p className="text-gray-300">
                      A fun, fast-paced, and educational exhibit where
                      participants are presented with three tech-related
                      statements — two of which are true and one that's a myth.
                      Their challenge is to identify the false one.
                    </p>
                  </div>
                  <div className="border-l-4 border-amber-400/50 pl-6">
                    <h4 className="text-xl sm:text-2xl font-semibold text-amber-200 mb-2">
                      Day 2: Tech or Trick? Real vs. Sci-Fi
                    </h4>
                    <p className="text-gray-300">
                      An engaging and thought-provoking exhibit where
                      participants are presented with futuristic-sounding
                      technologies and must decide whether each one is real or
                      just science fiction.
                    </p>
                  </div>
                  <div className="border-l-4 border-orange-400/50 pl-6">
                    <h4 className="text-xl sm:text-2xl font-semibold text-orange-200 mb-2">
                      Day 3: Which Tech Am I? Guess the Gadget
                    </h4>
                    <p className="text-gray-300">
                      One participant wears a tag on their forehead or screen
                      with the name of a tech (like "Drone," "VR Headset," "3D
                      Printer") and asks yes/no questions to guess what it is.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
