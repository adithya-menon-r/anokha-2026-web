import { create } from 'zustand';

interface NavbarStore {
  isNavbarHidden: boolean;
  setNavbarHidden: (hidden: boolean) => void;
}

export const useNavbarStore = create<NavbarStore>((set) => ({
  isNavbarHidden: false,
  setNavbarHidden: (hidden) => set({ isNavbarHidden: hidden }),
}));
