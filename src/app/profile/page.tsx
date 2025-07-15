'use client';

import { useState } from 'react';
import { z } from 'zod';
import { ProfileCard } from '@/components/Profile/ProfileCard';

// Zod validation schema
const profileSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .regex(/^[a-zA-Z\s]+$/, 'No special characters'),
  phone: z.string().regex(/^\d{10}$/, 'Should contain 10 digits'),
  collegeName: z
    .string()
    .min(1, 'College Name is required')
    .regex(/^[a-zA-Z\s]+$/, 'Only alphabets'),
  collegeCity: z
    .string()
    .min(1, 'College City is required')
    .regex(/^[a-zA-Z\s]+$/, 'Only alphabets'),
});

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    collegeName: '',
    collegeCity: '',
    email: 'anokhapr@cb.amrita.edu',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = () => {
    const result = profileSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof typeof formData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof formData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsDisabled(true);
    console.log('Submitting:', result.data);
    // simulate submission
    setTimeout(() => {
      setIsDisabled(false);
      alert('Profile saved!');
    }, 1000);
  };

  return (
    <main className="min-h-screen py-10 bg-gradient-to-br from-[#1a1a1a] via-[#2c2c2c] to-[#1f1f1f]">
      <div className="container mx-auto px-4 pt-14">
        <ProfileCard
          avatarEmail="Amascac"
          name={formData.name}
          phone={formData.phone}
          collegeName={formData.collegeName}
          collegeCity={formData.collegeCity}
          email={formData.email}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}
