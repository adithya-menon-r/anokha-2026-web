import {
  Award,
  Coins,
  FileBadge,
  Globe,
  MessageSquare,
  Users,
} from 'lucide-react';

export default function TakeawaysSection() {
  const takeaways = [
    {
      icon: <Coins className="w-8 h-8" />,
      title: 'Prize Pool - ₹2,00,000',
      description: 'Attractive cash prizes and awards',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'YUKTI Nomination',
      description: 'Top ideas nominated to National Innovation Repository',
    },
    {
      icon: <FileBadge className="w-8 h-8" />,
      title: 'Certificates',
      description: 'For all participating teams in TechFair & Pre-Events',
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Expert Feedback',
      description: 'From academia and industry professionals',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Networking',
      description: 'With mentors, innovators, and institutions',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'National Exposure',
      description: 'To innovation and incubation ecosystems',
    },
  ];

  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 fade-in-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-nk57 text-3xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-300 to-amber-400 bg-clip-text text-transparent">
            Key Takeaways & Opportunities
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {takeaways.map((item, i) => (
            <div
              key={i}
              className="group relative bg-gradient-to-br from-orange-900/10 to-amber-900/10 backdrop-blur-md border border-orange-400/20 rounded-2xl p-6 hover:border-orange-400/40 transition-all duration-300 hover:scale-105"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-xl flex items-center justify-center mb-4 text-orange-300 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              <h3 className="font-notoSerif text-lg font-bold text-orange-300 mb-2 uppercase tracking-wider">
                {item.title}
              </h3>

              <p
                className="text-gray-400 text-sm leading-relaxed font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
