// Profile Types

export interface Profile {
  name: string;
  email: string;
  phone: string;
  collegeName: string;
  collegeCity: string;
  avatarUrl?: string;
}

export type UpdateProfilePayload = Omit<Profile, 'email' | 'avatarUrl'>;

export type EditableFields = 'name' | 'phone' | 'collegeName' | 'collegeCity';
