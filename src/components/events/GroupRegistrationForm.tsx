'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, Users } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import {
  createGroupFormSchema,
  GroupRegistrationFormProps,
  GroupRegistrationOutput,
} from '@/types/groupRegistration';

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

  const formSchema = createGroupFormSchema(
    minTeamSize,
    maxTeamSize,
    leaderEmail,
  );
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teammates: Array.from({ length: minTeammates }, () => ({
        name: '',
        email: '',
      })),
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'teammates',
  });

  const handleSubmit = (values: FormValues) => {
    const output: GroupRegistrationOutput = {
      name: leaderName,
      email: leaderEmail,
      role: 'LEADER',
      teammates: values.teammates.map((t) => ({
        ...t,
        role: 'MEMBER',
      })),
    };
    onSubmit(output);
  };

  return (
    <div className={cn('w-full max-w-2xl mx-auto space-y-6', className)}>
      <div className="flex items-center gap-2 text-xl font-semibold text-foreground">
        <Users className="w-5 h-5" />
        Team Registration
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Leader Section */}
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border/50">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
              Team Leader
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormLabel>Name</FormLabel>
                <Input
                  value={leaderName || ''}
                  disabled
                  className="bg-muted/50"
                />
              </div>
              <div className="space-y-2">
                <FormLabel>Email</FormLabel>
                <Input
                  value={leaderEmail || ''}
                  disabled
                  className="bg-muted/50"
                />
              </div>
            </div>
          </div>

          {/* Teammates Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                Team Size ({fields.length + 1} / {maxTeamSize})
              </h3>
              {fields.length < maxTeammates && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ name: '', email: '' })}
                  className="gap-2 hover:bg-primary/10 hover:text-primary transition-colors"
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
                  className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 transition-colors animate-in fade-in slide-in-from-top-2 items-end"
                >
                  <FormField
                    control={form.control}
                    name={`teammates.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full">
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
                      <FormItem className="flex-1 w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Teammate Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Delete Button */}
                  {fields.length > minTeammates && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0"
                      onClick={() => remove(index)}
                      title="Remove teammate"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="sr-only">Remove teammate</span>
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {form.formState.errors.teammates && (
              <p className="text-sm font-medium text-destructive mt-2">
                {(form.formState.errors.teammates as any).message ||
                  (form.formState.errors.teammates as any).root?.message}
              </p>
            )}
            {form.formState.errors.root && (
              <p className="text-sm font-medium text-destructive mt-2">
                {form.formState.errors.root.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Register Team
          </Button>
        </form>
      </Form>
    </div>
  );
}
