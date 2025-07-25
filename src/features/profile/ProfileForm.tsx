'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createHash } from 'crypto';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ErrorBlock } from '@/components/ErrorBlock';
import { ProfileCard } from '@/components/Profile/ProfileCard';
import { ProfileCardSkeleton } from '@/components/Profile/ProfileCardSkeleton';
import TransactionList from '@/features/profile/TransactionList';
import { useUpdateProfile, useUserProfile } from '@/hooks/useProfile';
import { profileFormStore } from '@/stores/useProfileStore';
import RegisteredEvents from './RegisteredEventsList';

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
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
  });

  const genSHA256 = (email: string) => {
    return createHash('sha256').update(email).digest('hex');
  };

  const { data, isLoading, error } = useUserProfile();
  const updateProfileMutation = useUpdateProfile();

  const { setAllFields, setActiveTab, activeTab, fields } = profileFormStore();

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

  const onSubmit = handleSubmit((values) => {
    setAllFields(values);
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
      <div className="w-full max-w-xs mx-auto mt-10">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-md">
          {/* Tab Headers */}
          <div className="flex">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-1/3 py-2 text-sm font-medium rounded-l-xl transition-all duration-300
                ${
                  activeTab === 'profile'
                    ? 'bg-orange-400 text-white shadow-inner'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
            >
              {' '}
              Profile
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`w-1/3 py-2 text-sm font-medium transition-all duration-300
                ${
                  activeTab === 'events'
                    ? 'bg-orange-400 text-white shadow-inner'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`w-1/3 py-2 text-sm font-medium rounded-r-xl transition-all duration-300
                ${
                  activeTab === 'transactions'
                    ? 'bg-orange-400 text-white shadow-inner'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
            >
              Transactions
            </button>
          </div>
        </div>
      </div>
      {activeTab === 'profile' && (
        <div className="max-w-10xl mx-auto mt-20">
          <ProfileCard
            avatarEmail={genSHA256(data.email)}
            email={data.email}
            name={fields.name}
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
      )}
      <div className="w-full max-w-4xl mx-auto mt-20">
        {activeTab === 'transactions' && (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-left">
              Transactions
            </h2>
            <TransactionList />
          </>
        )}
      </div>
      <div className="w-full max-w-4xl mx-auto mt-20">
        {activeTab === 'events' && (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-left">
              Registered Events
            </h2>
            <RegisteredEvents />
          </>
        )}
      </div>
    </main>
  );
}
