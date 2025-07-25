import { create } from 'zustand';
import { UpdateProfilePayload } from '@/types/profileTypes';

type ActiveTab = 'events' | 'transactions' | 'profile';

type profileFormStore = {
  fields: UpdateProfilePayload;
  setAllFields: (fields: UpdateProfilePayload) => void;

  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
};

const initialState: UpdateProfilePayload = {
  name: '',
  phone: '',
  collegeName: '',
  collegeCity: '',
};

export const profileFormStore = create<profileFormStore>((set) => ({
  fields: initialState,
  setAllFields: (fields) =>
    set((state) => ({
      fields: { ...state.fields, ...fields },
    })),

  activeTab: 'profile',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
