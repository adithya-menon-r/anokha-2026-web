'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginForm } from '../../components/LoginForm';
import { LoginFormSkeleton } from '../../components/LoginFromSkeleton';
import { useLogin } from '../../hooks/uselogin';
import { loginFormSchema, LoginFormValues } from '../../types/login';
import Image from 'next/image';

export default function LoginPage() {
  const { mutate: login, isPending } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    login(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <div className="absolute top-8 left-0 w-full flex justify-center">
        <div className="flex items-center gap-4">
          <Image src="/anokha-logo.svg" alt="Anokha Logo" width={64} height={64} priority />
          <span
            className="text-4xl md:text-5xl font-bold text-black"
            style={{ fontFamily: 'Spinc, sans-serif', letterSpacing: '0.05em' }}
          >
            anokha 2025
          </span>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        {isPending ? (
          <LoginFormSkeleton />
        ) : (
          <LoginForm onSubmit={onSubmit} isSubmitting={isPending} form={form} />
        )}
      </div>
    </div>
  );
}
