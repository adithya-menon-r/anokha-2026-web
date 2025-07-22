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

interface SignUpFormMobileProps {
  form: UseFormReturn<SignUpFormValues>;
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitting: boolean;
  isAmritaCB: boolean;
}

export function SignUpFormMobile({
  form,
  step,
  nextStep,
  prevStep,
  isSubmitting,
  isAmritaCB,
}: SignUpFormMobileProps) {
  return (
    <div className="md:hidden">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${((step + 1) / 3) * 100}%` }}
          />
        </div>
        <span className="text-sm text-gray-500">{step + 1}/3</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {step === 0 && (
          <>
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
          </>
        )}

        {step === 1 && (
          <>
            <div className="col-span-1">
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
          </>
        )}

        {step === 2 && (
          <>
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
          </>
        )}
      </div>

      <div className="flex justify-between pt-4 gap-2">
        {step > 0 ? (
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            className="w-full"
          >
            Back
          </Button>
        ) : (
          <div className="w-full" />
        )}

        {step < 2 ? (
          <Button type="button" onClick={nextStep} className="w-full">
            Next
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              'Sign Up'
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
