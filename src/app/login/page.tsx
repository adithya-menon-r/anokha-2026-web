"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginForm } from '../../components/login/LoginForm';
import { LoginFormSkeleton } from '../../components/login/LoginFormSkeleton';
import { useLogin } from '../../hooks/uselogin';
import { type LoginFormValues, loginFormSchema } from '../../types/login';

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
