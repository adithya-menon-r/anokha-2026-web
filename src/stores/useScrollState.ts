import { create } from 'zustand';

interface AboutScrollState {
  targetSectionId: string | null;
  activeSectionId: string | null;

  setScrollTarget: (id: string | null) => void;
  clearScrollTarget: () => void;
  setActiveSection: (id: string | null) => void;
}

export const useAboutScrollStore = create<AboutScrollState>((set) => ({
  targetSectionId: null,
  activeSectionId: null,
  setScrollTarget: (id) => set({ targetSectionId: id }),
  clearScrollTarget: () => set({ targetSectionId: null }),
  setActiveSection: (id) => set({ activeSectionId: id }),
}));
