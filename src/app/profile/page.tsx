'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ProfileCard } from '@/components/Profile/ProfileCard';
import RegisteredEvents from '@/features/profile/RegisteredEventsList';
import TransactionList from '@/features/profile/TransactionList';
import { profileFormStore } from '@/stores/useProfileStore';

const profileFormSchema = z.object({
  name: z.string().min(2).max(747),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  collegeName: z.string().min(1).max(600),
  collegeCity: z.string().min(1).max(200),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
  });

  const { setAllFields, setField, setActiveTab, activeTab, fields } =
    profileFormStore();

  const mockData: ProfileFormValues & { email: string } = {
    name: 'Jane Doe',
    phone: '9876543210',
    collegeName: 'National Institute of Technology',
    collegeCity: 'Delhi',
    email: 'jane.doe@example.com',
  };

  useEffect(() => {
    setAllFields({
      name: mockData.name,
      phone: mockData.phone,
      collegeName: mockData.collegeName,
      collegeCity: mockData.collegeCity,
    });
    reset(mockData);
  }, [reset, setAllFields]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && value[name] !== undefined) {
        setField(name as keyof ProfileFormValues, value[name] as string);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setField]);

  const onSubmit = handleSubmit((values) => {
    console.log('Mock Submit:', values);
    alert('Mock submit successful! Check console.');
  });

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-4">
      <div className="max-w-10xl mx-auto">
        <ProfileCard
          avatarEmail={mockData.email}
          email={mockData.email}
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
      <div className="w-full max-w-4xl mx-auto mt-10 mb-20">
        {activeTab === 'events' && <RegisteredEvents />}
      </div>
    </main>
  );
}

// 'use client';

// import { ProfileFeatureForm } from '@/features/profile/ProfileForm';

// export default function ProfilePage() {
//   return (
//     <main className="min-h-screen py-10 px-4 md:px-8">
//       <ProfileFeatureForm />
//     </main>
//   );
// }
