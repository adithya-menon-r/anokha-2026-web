// Profile Types

export interface Profile {
  name: string;
  email: string;
  phone: string;
  college: string;
  city: string;
  avatarUrl?: string;
}

export type UpdateProfilePayload = Omit<Profile, 'email' | 'avatarUrl'>;

export type EditableFields = 'name' | 'phone' | 'collegeName' | 'collegeCity';
