import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { hashPassword } from '@/lib/utils';
import { AuthService } from '@/services/auth.service';
import { type SignUpFormValues, SignUpSchema } from '@/types/signUpTypes';

export function useSignUp() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: async (data: SignUpFormValues) => {
      const hashedPassword = await hashPassword(data.password);
      const payload = {
        ...data,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      };
      return await AuthService.signUp(payload);
    },
    onSuccess: () => {
      toast.success('Signup Successful! Please verify the OTP.');
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          'signupResendStartTime',
          Date.now().toString(),
        );
      }
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
      phone_number: '',
      password: '',
      confirmPassword: '',
      college_name: '',
      college_city: '',
      is_amrita_student: false,
    },
    shouldFocusError: false,
  });

  const { watch, setValue, trigger } = form;

  const is_amrita_student = watch('is_amrita_student') ?? false;

  useEffect(() => {
    if (is_amrita_student) {
      setValue('college_name', 'Amrita Vishwa Vidyapeetham');
      setValue('college_city', 'Coimbatore');
    } else {
      setValue('college_name', '');
      setValue('college_city', '');
    }
  }, [is_amrita_student, setValue]);

  const onSubmit = (data: SignUpFormValues) => {
    signup(data);
  };

  const nextStep = async () => {
    let validated = true;

    if (step === 0) {
      validated = await trigger(['name', 'email', 'phone_number']);
    } else if (step === 1) {
      validated = await trigger([
        'is_amrita_student',
        'college_name',
        'college_city',
      ]);
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
    is_amrita_student,
    onSubmit,
    nextStep,
    prevStep,
  };
}
