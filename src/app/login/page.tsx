'use client';
import { LoginForm } from '@components/login/LoginForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@hooks/uselogin';
import { useForm } from 'react-hook-form';
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full flex items-center justify-center">
        <LoginForm onSubmit={onSubmit} isSubmitting={isPending} form={form} />
      </div>
    </div>
  );
}
