import { create } from 'zustand';
import { EditProfileState, UpdateProfilePayload } from '@/types/profileTypes';

type ActiveTab = 'events' | 'transactions' | 'profile';

type profileFormStore = {
  fields: UpdateProfilePayload;
  setAllFields: (fields: UpdateProfilePayload) => void;

  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
};

const initialState: UpdateProfilePayload = {
  name: '',
  phone_number: '',
  college_name: '',
  college_city: '',
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

export const useProfileStore = create<EditProfileState>((set) => ({
  isEditMode: false,
  setIsEditMode: (mode) => set({ isEditMode: mode }),
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
}));
