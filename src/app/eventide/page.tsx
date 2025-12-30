import Image from 'next/image';
import HeroSection from '@/components/eventide/herosection';

const eventideNights = [
  {
    id: 1,
    title: 'Raagasudha',
    subtitle: 'Music that breathes emotion',
    description:
      'Raagasudha, the official music club of Amrita, sets the tone for Eventide with soul-stirring performances that blend melody, harmony, and emotion.',
    date: 'Eventide Night One',
    accent: 'from-emerald-400 to-teal-500',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
  },
  {
    id: 2,
    title: 'Natyasudha',
    subtitle: 'Where movement becomes magic',
    description:
      'Natyasudha, the official dance club, transforms the stage into a spectacle of rhythm and expression.',
    date: 'Eventide Night Two',
    accent: 'from-fuchsia-500 to-pink-600',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498',
  },
  {
    id: 3,
    title: 'Celebrity Proshow',
    subtitle: 'Naresh Iyer Live',
    description:
      'Eventide reaches its crescendo with a celebrity proshow that electrifies the campus.',
    date: 'Grand Finale',
    accent: 'from-amber-400 to-orange-500',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
  },
];

export default function EventidePage() {
  return (
    <main className=" text-white">
      {/* FULL SCREEN HERO */}
      <HeroSection />
      <section className="container mx-auto px-6 py-32 max-w-5xl">
        <p className="text-lg text-gray-300 leading-relaxed">
          Eventide is the heart and soul of{' '}
          <span className="text-white font-semibold">Anokha 2026</span>, the
          flagship techno-cultural festival of Amrita Vishwa Vidyapeetham.
        </p>

        <p className="mt-6 text-gray-400 leading-relaxed">
          By day, Anokha buzzes with workshops and competitions. By night,
          Eventide takes over — transforming the campus into a cultural
          carnival.
        </p>

        <p className="mt-6 text-gray-400 leading-relaxed">
          The first two evenings celebrate student talent, culminating in a
          grand celebrity finale.
        </p>
      </section>

      {/* EVENTIDE NIGHTS */}
      <section className="space-y-20 pb-32">
        {eventideNights.map((night, index) => {
          const overlayLeft = index % 2 === 0;

          return (
            <div key={night.id} className="container mx-auto px-6">
              <div className="relative h-[460px] rounded-3xl overflow-hidden group">
                <Image
                  src={night.image}
                  alt={night.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div
                  className={`absolute inset-0 ${
                    overlayLeft
                      ? 'bg-gradient-to-r from-black via-black/80 to-transparent'
                      : 'bg-gradient-to-l from-black via-black/80 to-transparent'
                  }`}
                />

                <div
                  className={`absolute inset-0 flex items-center ${
                    overlayLeft ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className="max-w-xl px-10 space-y-6">
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${night.accent}`}
                    >
                      {night.date}
                    </span>

                    <h2 className="text-4xl font-bold">{night.title}</h2>

                    <p className="text-lg text-gray-300">{night.subtitle}</p>

                    <p className="text-gray-400 leading-relaxed">
                      {night.description}
                    </p>

                    <button
                      className={`mt-4 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r ${night.accent}`}
                    >
                      Explore Night
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
