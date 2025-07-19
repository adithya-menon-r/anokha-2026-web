'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ProfileCard } from '@/components/Profile/ProfileCard';
import { ProfileCardSkeleton } from '@/components/Profile/ProfileCardSkeleton';
import { useUpdateProfile, useUserProfile } from '@/hooks/useProfile';
import { profileFormStore } from '@/stores/useProfileStore';

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least two characters')
    .max(747, 'Name cannot be longer than 747 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, {
    message: 'Please enter a valid 10 digit phone number',
  }),
  collegeName: z
    .string()
    .min(1, 'College Name is required')
    .regex(/^[a-zA-Z\s]+$/, 'Only alphabets')
    .max(600, 'College Name cannot exceed 600 characters'),
  collegeCity: z
    .string()
    .min(1, 'City is required')
    .regex(/^[a-zA-Z\s]+$/, 'Only alphabets')
    .max(200, 'City Name cannot be longer than 200 characters'),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileFeatureForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
  });

  const { data, isLoading, error } = useUserProfile();
  const updateProfileMutation = useUpdateProfile();

  const { setAllFields, setField, fields } = profileFormStore();

  useEffect(() => {
    if (data) {
      setAllFields({
        name: data.name,
        phone: data.phone,
        collegeName: data.collegeName,
        collegeCity: data.collegeCity,
      });
      reset(data);
    }
  }, [data, setAllFields, reset]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && value[name] !== undefined) {
        setField(name as keyof ProfileFormValues, value[name] as string);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setField]);

  const onSubmit = handleSubmit((values) => {
    updateProfileMutation.mutate(values);
  });

  if (isLoading) return <ProfileCardSkeleton />;
  if (error) return <p className="text-red-500">Failed to load data.</p>;
  if (!data) return <p className="text-gray-500">No data found.</p>;

  return (
    <ProfileCard
      avatarEmail={data.email}
      email={data.email}
      name={fields.name}
      phone={fields.phone}
      collegeName={fields.collegeName}
      collegeCity={fields.collegeCity}
      register={register}
      errors={{
        name: errors.name?.message,
        phone: errors.phone?.message,
        collegeName: errors.collegeName?.message,
        collegeCity: errors.collegeCity?.message,
      }}
      onSubmit={onSubmit}
    />
  );
}
