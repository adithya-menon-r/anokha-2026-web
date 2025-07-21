import { create } from 'zustand';
import { UpdateProfilePayload } from '@/types/profileTypes';

type ActiveTab = 'events' | 'transactions';

type profileFormStore = {
  fields: UpdateProfilePayload;
  setField: <K extends keyof UpdateProfilePayload>(
    key: K,
    value: UpdateProfilePayload[K],
  ) => void;
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
  setField: (key, value) =>
    set((state) => ({
      fields: { ...state.fields, [key]: value },
    })),
  setAllFields: (fields) =>
    set((state) => ({
      fields: { ...state.fields, ...fields },
    })),

  activeTab: 'events',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
