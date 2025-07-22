'use client';

import { Loader2 } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { SignUpFormValues } from '@/types/signUpTypes';

interface SignUpFormDesktopProps {
  form: UseFormReturn<SignUpFormValues>;
  isSubmitting: boolean;
  isAmritaCB: boolean;
}

export function SignUpFormDesktop({
  form,
  isSubmitting,
  isAmritaCB,
}: SignUpFormDesktopProps) {
  return (
    <div className="hidden md:block">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your full name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your phone number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="md:col-span-2">
          <FormField
            name="isAmritaCB"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="mr-2"
                  />
                </FormControl>
                <FormLabel>Are you from Amrita Coimbatore ?</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="collegeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>College Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your college name"
                  disabled={isAmritaCB}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="collegeCity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>College City</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your college city"
                  disabled={isAmritaCB}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter your password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Confirm your password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          type="submit"
          className="w-full max-w-xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" />
              Submitting...
            </div>
          ) : (
            'Sign Up'
          )}
        </Button>
      </div>
    </div>
  );
}
