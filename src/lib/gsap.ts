import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (
  typeof window !== 'undefined' &&
  typeof gsap.registerPlugin === 'function'
) {
  try {
    gsap.registerPlugin(ScrollTrigger);
  } catch (e) {
    // ignore if already registered or in non-browser env
  }
}

export default gsap;
