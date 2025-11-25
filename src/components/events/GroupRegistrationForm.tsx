'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, Users } from 'lucide-react';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const teammateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

const createGroupFormSchema = (minTeamSize: number, maxTeamSize: number) =>
  z.object({
    teammates: z
      .array(teammateSchema)
      .min(
        minTeamSize - 1,
        `You must add at least ${minTeamSize - 1} teammate(s)`,
      )
      .max(
        maxTeamSize - 1,
        `You can add at most ${maxTeamSize - 1} teammate(s)`,
      ),
  });

interface GroupRegistrationFormProps {
  leaderName: string;
  leaderEmail: string;
  maxTeamSize: number;
  minTeamSize?: number;
  onSubmit: (data: { teammates: { name: string; email: string }[] }) => void;
  className?: string;
}

export function GroupRegistrationForm({
  leaderName,
  leaderEmail,
  maxTeamSize,
  minTeamSize = 2,
  onSubmit,
  className,
}: GroupRegistrationFormProps) {
  // Calculate how many teammates are needed (excluding leader)
  const minTeammates = Math.max(0, minTeamSize - 1);
  const maxTeammates = Math.max(0, maxTeamSize - 1);

  const formSchema = createGroupFormSchema(minTeamSize, maxTeamSize);
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teammates: Array.from({ length: minTeammates }, () => ({ name: '', email: '' })),
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'teammates',
  });

  // Ensure we always have the minimum number of fields
  // Removed useEffect to prevent potential render loops.
  // We rely on defaultValues for initial state and UI controls/Zod validation for maintenance.

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Card className={cn('w-full max-w-2xl mx-auto', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Users className="w-5 h-5" />
          Team Registration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Leader Section */}
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border/50">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                Team Leader
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel>Name</FormLabel>
                  <Input value={leaderName} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <FormLabel>Email</FormLabel>
                  <Input value={leaderEmail} disabled className="bg-muted" />
                </div>
              </div>
            </div>

            {/* Teammates Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Teammates ({fields.length} / {maxTeammates})
                </h3>
                {fields.length < maxTeammates && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ name: '', email: '' })}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Member
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="relative grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border border-border/50 animate-in fade-in slide-in-from-top-2"
                  >
                    <FormField
                      control={form.control}
                      name={`teammates.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Teammate Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`teammates.${index}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Teammate Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Delete Button - Only show if we have more than minimum required */}
                    {fields.length > minTeammates && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm md:top-4 md:-right-10 md:h-8 md:w-8 md:bg-transparent md:text-destructive md:shadow-none md:hover:bg-destructive/10"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="sr-only">Remove teammate</span>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {form.formState.errors.teammates && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.teammates.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Register Team
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
