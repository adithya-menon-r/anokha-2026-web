import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthService } from '@/services/auth.service';
import { type SignUpFormValues, SignUpSchema } from '@/types/signUpTypes';

export function useSignUp() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: async (data: SignUpFormValues) => {
      return await AuthService.signUp(data);
    },
    onSuccess: () => {
      toast.success('Signup Successful! Verify your OTP...');
      router.push('/signup/verify');
    },
    onError: (error: any) => {
      toast.error('Signup Failed! Please try again...');
    },
  });

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      collegeName: '',
      collegeCity: '',
      isAmritaCB: false,
    },
    shouldFocusError: false,
  });

  const { watch, setValue, trigger } = form;

  const isAmritaCB = watch('isAmritaCB') ?? false;

  useEffect(() => {
    if (isAmritaCB) {
      setValue('collegeName', 'Amrita Vishwa Vidyapeetham');
      setValue('collegeCity', 'Coimbatore');
    } else {
      setValue('collegeName', '');
      setValue('collegeCity', '');
    }
  }, [isAmritaCB, setValue]);

  const onSubmit = (data: SignUpFormValues) => {
    signup(data);
  };

  const nextStep = async () => {
    let validated = true;

    if (step === 0) {
      validated = await trigger(['name', 'email', 'phone']);
    } else if (step === 1) {
      validated = await trigger(['isAmritaCB', 'collegeName', 'collegeCity']);
    } else if (step === 2) {
      validated = await trigger(['password', 'confirmPassword']);
    }

    if (validated) setStep((s) => Math.min(s + 1, 2));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return {
    form,
    step,
    isPending,
    isAmritaCB,
    onSubmit,
    nextStep,
    prevStep,
  };
}
