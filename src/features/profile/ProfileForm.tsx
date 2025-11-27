'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createHash } from 'crypto';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorBlock } from '@/components/ErrorBlock';
import { GlassFormWrapper } from '@/components/GlassFormWrapper';
import { ProfileCard } from '@/components/Profile/ProfileCard';
import { ProfileCardSkeleton } from '@/components/Profile/ProfileCardSkeleton';
import TransactionList from '@/features/profile/TransactionList';
import { useUpdateProfile, useUserProfile } from '@/hooks/useProfile';
import { profileFormStore } from '@/stores/useProfileStore';
import {
  Profile,
  ProfileFormValues,
  profileFormSchema,
} from '@/types/profileTypes';
import RegisteredEvents from './RegisteredEventsList';

const PROFILE_TABS = [
  { id: 'profile', label: 'Profile' },
  { id: 'events', label: 'Events' },
  { id: 'transactions', label: 'Transactions' },
];

export function ProfileFeatureForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
  });

  // TODO : HASING FOR GRAVATAR
  const genSHA256 = (email: string) => {
    return createHash('sha256').update(email).digest('hex');
  };

  //TODO: TANSTACK CALL
  const { data, isLoading, error } = useUserProfile();
  const updateProfileMutation = useUpdateProfile();

  // TODO : ZUSTAND MANAGEMENT
  const { setAllFields, setActiveTab, activeTab } = profileFormStore();

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
    reset(values);
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
    <main className="min-h-screen py-20 px-4">
      <GlassFormWrapper className="max-w-6xl">
        <div className="flex justify-center mb-8 lg:ml-10 md:max-lg:ml-6">
          <div className="flex bg-card/20 backdrop-blur-sm rounded-lg p-1 border border-border/30 gap-2">
            {PROFILE_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex-1 text-center px-2 py-1 md:px-6 md:py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2
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
          {activeTab === 'profile' && (
            <ProfileCard
              avatarEmail={genSHA256(data.email)}
              email={data.email}
              name={data.name}
              phone={data.phone}
              collegeName={data.collegeName}
              collegeCity={data.collegeCity}
              register={register}
              reset={reset}
              errors={{
                name: errors.name?.message,
                phone: errors.phone?.message,
                collegeName: errors.collegeName?.message,
                collegeCity: errors.collegeCity?.message,
              }}
              onSubmit={onSubmit}
              isDirty={isDirty}
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
