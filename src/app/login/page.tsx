"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm } from "../../components/LoginForm";
import { LoginFormSkeleton } from "../../components/LoginFromSkeleton";
import { useLogin } from "../../hooks/uselogin";
import { loginFormSchema, LoginFormValues } from "../../types/login";
import { Suspense } from "react";

export default function LoginPage() {
  const { mutate: login, isLoading } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    login(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm
          onSubmit={onSubmit}
          isSubmitting={isPending}
          form={form}
        />
      </Suspense>
    </div>
  );
}