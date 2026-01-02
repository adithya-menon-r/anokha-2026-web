import { Lightbulb, Repeat, Users } from 'lucide-react';
export default function InitiativesSection() {
  const initiatives = [
    {
      title: 'Club Corner',
      icon: <Users className="w-10 h-10 text-orange-300" />,
      desc: `A dedicated space that brings together technical and innovation-driven student clubs to showcase their journey, achievements, and impact. Clubs present their flagship projects, working prototypes, research outcomes, and competition successes, highlighting hands-on learning and collaboration. This initiative reflects the vibrant student innovation ecosystem and allows visitors to explore how club-led activities contribute to real-world problem solving and technical excellence.`,
    },
    {
      title: 'Mentor-Mentee Matchup',
      icon: <Repeat className="w-10 h-10 text-orange-300" />,
      desc: `Enables meaningful interactions between students and experienced mentors from academia, industry, and incubation ecosystems. Participants are matched with mentors based on domain interests and project focus, ensuring relevant and focused guidance. These sessions help refine ideas, strengthen projects, and provide insights into research, startups, and career pathways, while also offering valuable networking opportunities for external participants.`,
    },
    {
      title: 'Innovation Tree',
      icon: <Lightbulb className="w-10 h-10 text-orange-300" />,
      desc: `An interactive idea-generation platform where participants share innovative ideas and real-world problem statements aligned with the event theme. By visually contributing ideas, it encourages creative thinking, cross-domain perspectives, and community-driven innovation. The collected ideas serve as a living repository that helps mentors and institutions identify promising concepts for further mentoring, hackathons, or incubation support.`,
    },
  ];

  return (
    <section className="font-michroma py-20 lg:py-32 px-4 sm:px-6 lg:px-8 fade-in-section parallax-slow">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-400/30 rounded-full text-orange-300 text-sm font-semibold tracking-wider uppercase mb-6">
            What's New
          </div>
          <h2 className="font-nk57 text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight sm:tracking-tighter bg-gradient-to-r from-orange-300 via-amber-300 to-orange-400 bg-clip-text text-transparent leading-none">
            New Initiatives 2026
          </h2>
        </div>

        <div className="space-y-8 lg:space-y-12">
          {initiatives.map(({ title, icon, desc }) => (
            <div
              key={title}
              className="group relative bg-gradient-to-br from-orange-900/10 to-amber-900/10 backdrop-blur-md border border-orange-400/20 rounded-3xl p-8 sm:p-12 hover:border-orange-400/40 transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-10 h-10 text-orange-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {icon}
                    </svg>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-notoSerif text-3xl sm:text-4xl font-bold text-orange-300 mb-4">
                    {title}
                  </h3>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
