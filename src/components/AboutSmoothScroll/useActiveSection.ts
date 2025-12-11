'use client';

/**
 * This component acts as a hook to monitor the user's current view based on a DOM element in order to highlight the About tab in the Navbar(live).
 * @param sectionId The unique ID of the section to observe (e.g., 'about-section').
 * @param threshold The percentage of the target's visibility needed to trigger the observer (0.0 to 1.0).
 */

import { useEffect, useMemo, useRef } from 'react';
import { useAboutScrollStore } from '@/stores/useScrollState';

export function useActiveSection(sectionId: string, threshold: number = 0.5) {
  const { setActiveSection } = useAboutScrollStore();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observerOptions = useMemo(
    () => ({
      root: null,
      rootMargin: '0px',
      threshold: threshold,
    }),
    [threshold],
  );

  useEffect(() => {
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(sectionId);
        } else if (
          useAboutScrollStore.getState().activeSectionId === sectionId
        ) {
          setActiveSection(null);
        }
      });
    };

    observerRef.current = new IntersectionObserver(callback, observerOptions);
    observerRef.current.observe(targetElement);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionId, observerOptions, setActiveSection]);
}
