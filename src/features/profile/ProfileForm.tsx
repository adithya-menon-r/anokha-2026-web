import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ProfileCard } from '@/components/Profile/ProfileCard';
import { ProfileCardSkeleton } from '@/components/Profile/ProfileCardSkeleton';
import { useUpdateProfile, useUserProfile } from '@/hooks/useProfile';

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be atleast two characters')
    .max(747, 'Name cannot be longer than 747 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, {
    message: 'Please enter a valid 10 digit phone number',
  }),
  collegeName: z
    .string()
    .min(1, 'College Name is required')
    .regex(/^[a-zA-Z\s]+$/, 'Only alphabets')
    .max(600, 'College Name cannot exceed 600 charaters'),
  collegeCity: z
    .string()
    .min(1, 'City is required')
    .regex(/^[a-zA-Z\s]+$/, 'Only alphabets')
    .max(200, 'City Name cannot be longer than 200 charaters'),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileFeatureForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
  });

  //get Profile
  const { data, isLoading, error } = useUserProfile();

  if (data) if (isLoading) return <ProfileCardSkeleton />;

  if (error) return <p className="text-red-500">Failed to load data.</p>;

  if (!data) return <p className="text-gray-500">No data found.</p>;
}
