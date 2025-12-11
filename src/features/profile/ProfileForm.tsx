'use client';
/*
  Client side rendering,
  This component renders a 3 tab layout consisting Profile, Registered Events and Transactions.
*/

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
import { profileFormStore, useProfileStore } from '@/stores/useProfileStore';
import { ProfileFormValues, profileFormSchema } from '@/types/profileTypes';
import TicketSection from './TicketSection';

const PROFILE_TABS = [
  { id: 'profile', label: 'Profile' },
  { id: 'events', label: 'Tickets' },
  { id: 'transactions', label: 'Transactions' },
];

export function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
  });

  const isEditMode = useProfileStore((state) => state.isEditMode);
  const setIsEditMode = useProfileStore((state) => state.setIsEditMode);

  //  HASING FOR GRAVATAR
  const genSHA256 = (email: string) => {
    return createHash('sha256').update(email).digest('hex');
  };

  //TANSTACK CALL
  const { data, isLoading, error } = useUserProfile();
  const updateProfileMutation = useUpdateProfile();

  //ZUSTAND MANAGEMENT
  const { setAllFields, setActiveTab, activeTab } = profileFormStore();

  useEffect(() => {
    if (data) {
      setAllFields({
        name: data.name,
        phone_number: data.phone_number,
        college_name: data.college_name,
        college_city: data.college_city,
      });
      reset(data);
    }
  }, [data, setAllFields, reset]);

  const onSubmit = handleSubmit(async (values) => {
    setAllFields(values);
    try {
      await updateProfileMutation.mutateAsync(values);
      reset(values);
      setIsEditMode(false);
    } catch (e) {
      console.log(isEditMode);
      reset(data);
      setIsEditMode(false);
      console.log(isEditMode);
    }
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
    <main className="min-h-screen py-6 px-0 md:px-4">
      <GlassFormWrapper className="max-w-6xl">
        <div className="flex justify-center mb-8 lg:ml-10 md:max-lg:ml-6">
          <div className="flex bg-card/20 backdrop-blur-sm rounded-lg p-1 border border-border/30 gap-2">
            {PROFILE_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex-1 text-center px-1.5 py-1 md:px-6 md:py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-md
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
              phone_number={data.phone_number}
              college_name={data.college_name}
              college_city={data.college_city}
              register={register}
              reset={reset}
              errors={{
                name: errors.name?.message,
                phone_number: errors.phone_number?.message,
                college_name: errors.college_name?.message,
                college_city: errors.college_city?.message,
              }}
              onSubmit={onSubmit}
              isDirty={isDirty}
            />
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="w-full">
              <h2 className="text-2xl font-bold text-center text-foreground mb-2">
                Your Tickets
              </h2>
              <TicketSection />
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
