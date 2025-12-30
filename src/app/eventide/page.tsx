'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import HeroSection from '@/components/eventide/herosection';

gsap.registerPlugin(ScrollTrigger);

const eventideNights = [
  {
    id: 1,
    title: 'Raagasudha',
    subtitle: 'Music that breathes emotion',
    description:
      'Raagasudha, the official music club of Amrita, sets the tone for Eventide with soul-stirring performances.',
    date: 'Eventide Night One',
    accent: 'from-emerald-400 to-teal-500',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
  },
  {
    id: 2,
    title: 'Natyasudha',
    subtitle: 'Where movement becomes magic',
    description:
      'Natyasudha transforms the stage into a spectacle of rhythm and expression.',
    date: 'Eventide Night Two',
    accent: 'from-fuchsia-500 to-pink-600',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498',
  },
  {
    id: 3,
    title: 'Celebrity Proshow',
    subtitle: 'Naresh Iyer Live',
    description:
      'Eventide reaches its crescendo with a grand celebrity finale.',
    date: 'Grand Finale',
    accent: 'from-amber-400 to-orange-500',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
  },
];

export default function EventidePage() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      if (!section) return;

      const image = section.querySelector('.bg-image');
      const content = section.querySelector('.content');
      const button = section.querySelector('.cta');

      // Parallax background
      gsap.fromTo(
        image,
        { y: '-10%' },
        {
          y: '10%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );

      // Content reveal
      gsap.from(content, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      });

      // Button delayed rise
      gsap.from(button, {
        y: 30,
        opacity: 0,
        delay: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <main className="text-white bg-black">
      {/* HERO */}
      <HeroSection />

      {/* INTRO */}
      <section className="container mx-auto px-6 py-32 max-w-5xl">
        <p className="text-lg text-gray-300">
          Eventide is the heart of{' '}
          <span className="text-white font-semibold">Anokha 2026</span>.
        </p>
        <p className="mt-6 text-gray-400">
          By day, Anokha thrives on innovation. By night, Eventide transforms
          the campus into a cultural carnival.
        </p>
      </section>

      {/* FULL SCREEN EVENT SECTIONS */}
      {eventideNights.map((night, index) => {
        const alignLeft = index % 2 === 0;

        return (
          <section
            key={night.id}
            ref={(el) => (sectionsRef.current[index] = el)}
            className="relative h-[100svh] w-full overflow-hidden"
          >
            {/* Background Image */}
            <Image
              src={night.image}
              alt={night.title}
              fill
              className="bg-image object-cover"
            />

            {/* Overlay */}
            <div
              className={`absolute inset-0 ${
                alignLeft
                  ? 'bg-gradient-to-r from-black/90 via-black/60 to-transparent'
                  : 'bg-gradient-to-l from-black/90 via-black/60 to-transparent'
              }`}
            />

            {/* Content */}
            <div
              className={`relative z-10 h-full flex items-center ${
                alignLeft ? 'justify-start' : 'justify-end'
              }`}
            >
              <div className="content max-w-xl px-10 md:px-24 space-y-6">
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${night.accent}`}
                >
                  {night.date}
                </span>

                <h2 className="text-5xl md:text-6xl font-extrabold">
                  {night.title}
                </h2>

                <p className="text-xl text-gray-300">{night.subtitle}</p>

                <p className="text-gray-400">{night.description}</p>

                <button
                  className={`cta mt-6 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r ${night.accent}`}
                >
                  Explore Night
                </button>
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
