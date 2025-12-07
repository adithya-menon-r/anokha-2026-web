'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface HorizontalScrollItemProps {
  data: {
    id: string;
    title: string;
    description: string;
    mascot: string;
    images: {
      src: string;
      alt: string;
      size: 'small' | 'medium' | 'large';
    }[];
  };
  index: number;
}

export const HorizontalScrollItem: React.FC<HorizontalScrollItemProps> = ({
  data,
  index,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  const getSizeClasses = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small':
        return 'w-48 h-48 md:w-56 md:h-56';
      case 'medium':
        return 'w-56 h-56 md:w-64 md:h-64';
      case 'large':
        return 'w-64 h-64 md:w-80 md:h-80';
      default:
        return 'w-56 h-56 md:w-64 md:h-64';
    }
  };

  const getFloatAnimation = (imageIndex: number) => {
    const animations = ['float-slow', 'float-medium', 'float-fast'];
    return animations[imageIndex % 3];
  };

  return (
    <div
      ref={itemRef}
      className={`horizontal-scroll-item relative flex gap-8 items-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
      }`}
      style={{
        scrollSnapAlign: 'center',
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Frosted Text Container */}
      <div className="relative flex-shrink-0 w-[400px] md:w-[500px] backdrop-blur-md bg-white/10 border border-white/50 rounded-3xl shadow-xl p-8 md:p-12">
        {/* Corner Images */}
        <Image
          src="/top_left.png"
          alt=""
          width={60}
          height={60}
          className="absolute -top-2 -left-2 pointer-events-none w-12 h-12 md:w-[60px] md:h-[60px]"
        />
        <Image
          src="/top_right.png"
          alt=""
          width={60}
          height={60}
          className="absolute -top-2 -right-2 pointer-events-none w-12 h-12 md:w-[60px] md:h-[60px]"
        />
        <Image
          src="/bottom_left.png"
          alt=""
          width={60}
          height={60}
          className="absolute -bottom-2 -left-2 pointer-events-none w-12 h-12 md:w-[60px] md:h-[60px]"
        />
        <Image
          src="/bottom_right.png"
          alt=""
          width={60}
          height={60}
          className="absolute -bottom-2 -right-2 pointer-events-none w-12 h-12 md:w-[60px] md:h-[60px]"
        />

        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-bold tracking-wide text-white mb-6">
          {data.title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
          {data.description}
        </p>
      </div>

      {/* Floating Images Container */}
      <div className="relative flex gap-6 items-center flex-shrink-0">
        {data.images.map((image, imgIndex) => (
          <div
            key={imgIndex}
            className={`floating-image ${getSizeClasses(image.size)} ${getFloatAnimation(imgIndex)}`}
            style={{
              animationDelay: `${imgIndex * 0.5}s`,
            }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl glow-effect" />

              {/* Image */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 768px) 224px, 320px"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-orange-500/20 pointer-events-none rounded-2xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
