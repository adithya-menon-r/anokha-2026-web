'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ErrorBlock } from '@/components/ErrorBlock';
import { ProfileCard } from '@/components/Profile/ProfileCard';
import { ProfileCardSkeleton } from '@/components/Profile/ProfileCardSkeleton';
import TransactionList from '@/features/profile/TransactionList';
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

  const { setAllFields, setField, setActiveTab, activeTab, fields } =
    profileFormStore();

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
  if (error) {
    return (
      <ErrorBlock
        title="Unable to load Profile"
        message="Please try again later"
      />
    );
  }

  if (!data) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <p className="text-gray-500 text-center">No data found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-4">
      <div className="max-w-10xl mx-auto">
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
      </div>
      <div className="w-full max-w-sm mx-auto mt-10">
        <div className="bg-white rounded-2xl shadow-md">
          {/* Tab Headers */}
          <div className="flex relative">
            <button
              id="tab-events"
              onClick={() => setActiveTab('events')}
              className={`w-1/2 py-3 text-center font-semibold rounded-2xl transition-all duration-300 ${
                activeTab === 'events'
                  ? 'bg-gray-700 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              Registered Events
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`w-1/2 py-3 text-center font-semibold rounded-2xl transition-all duration-300 ${
                activeTab === 'transactions'
                  ? 'bg-gray-700 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              Transactions
            </button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto mt-10">
        {activeTab === 'transactions' && <TransactionList />}
      </div>
    </main>
  );
}
