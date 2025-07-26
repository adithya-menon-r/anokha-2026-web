'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createHash } from 'crypto';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ErrorBlock } from '@/components/ErrorBlock';
import { GlassFormWrapper } from '@/components/GlassFormWrapper';
import { ProfileCard } from '@/components/Profile/ProfileCard';
import { ProfileCardSkeleton } from '@/components/Profile/ProfileCardSkeleton';
import TransactionList from '@/features/profile/TransactionList';
import { useUpdateProfile, useUserProfile } from '@/hooks/useProfile';
import { profileFormStore } from '@/stores/useProfileStore';
import RegisteredEvents from './RegisteredEventsList';

// Zod object creation for validation
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

  // Hashing of the email for Avatar
  const genSHA256 = (email: string) => {
    return createHash('sha256').update(email).digest('hex');
  };

  const { data, isLoading, error } = useUserProfile();
  const updateProfileMutation = useUpdateProfile();

  // Zustand state management for different fields and tabs
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
    <main className="min-h-screen py-4 px-4">
      <GlassFormWrapper className="max-w-6xl">
        {/* Enhanced Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-card/20 backdrop-blur-sm rounded-lg p-1 border border-border/30 gap-2">
            {[
              { id: 'profile', label: 'Profile' },
              { id: 'events', label: 'Events' },
              { id: 'transactions', label: 'Transactions' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  px-2 py-1 md:px-6 md:py-3 rounded-md font-medium transition-all duration-300 flex items-center gap-2
                  ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/50 text-orange-200 shadow-lg shadow-orange-500/25'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
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
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="w-full">
              <h2 className="text-2xl font-bold text-center text-foreground mb-8">
                Registered Events
              </h2>
              <RegisteredEvents />
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="w-full">
              <h2 className="text-2xl font-bold text-center text-foreground mb-8">
                Transaction History
              </h2>
              <TransactionList />
            </div>
          )}
        </div>
      </GlassFormWrapper>
    </main>
  );
}
