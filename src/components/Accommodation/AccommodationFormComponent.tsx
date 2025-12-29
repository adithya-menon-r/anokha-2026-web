'use client';

import { ArrowRight, Mars, Venus } from 'lucide-react';
import React from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatCurrency } from '@/lib/utilityFunctions';
import type { AccommodationFormComponentProps } from '@/types/accommodationTypes';

const AccommodationFormComponent: React.FC<AccommodationFormComponentProps> = ({
  form,
  estimatedPrice,
  agreeWatch,
  onSubmit,
  AMRITA_CAMPUSES,
  checkInMinDate,
  checkInMaxDate,
  checkOutMinDate,
  checkOutMaxDate,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto mt-10">
      <div className="mx-auto w-full bg-gradient-to-br from-slate-900/60 via-slate-900/50 to-slate-800/40 border border-white/5 rounded-xl md:rounded-2xl px-4 md:px-10 pt-2 md:pt-5 pb-8 shadow-2xl backdrop-blur-lg text-white text-left">
        <h2 className="text-lg md:text-3xl font-bold mb-4 mt-4">
          Registration
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-white/80">Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-white/80">Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4">
              <FormField
                control={form.control}
                name="is_male"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Gender</FormLabel>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => field.onChange(true)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none text-white ${
                          field.value === true
                            ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/50 text-orange-200 hover:text-orange-100'
                            : 'bg-white/5'
                        }`}
                      >
                        <Mars size={16} />
                        Male
                      </button>

                      <button
                        type="button"
                        onClick={() => field.onChange(false)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none text-white ${
                          field.value === false
                            ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/50 text-orange-200 hover:text-orange-100'
                            : 'bg-white/5'
                        }`}
                      >
                        <Venus size={16} />
                        Female
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border-t border-white/10 my-6" />

            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div>
                  <FormField
                    control={form.control}
                    name="is_amrita_campus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">
                          Are you from any of the Amrita campuses?
                        </FormLabel>
                        <div className="mt-2 flex items-center gap-3">
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                              field.onChange(true);
                              form.setValue('college_name', '');
                              form.setValue('college_roll_number', '');
                              form.setValue('is_hosteller', undefined);
                            }}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium focus:outline-none text-white ${
                              field.value === true
                                ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/50 text-orange-200 hover:text-orange-100'
                                : 'bg-white/5'
                            }`}
                          >
                            Yes
                          </Button>

                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                              field.onChange(false);
                              form.setValue('college_name', '');
                              form.setValue('college_roll_number', '');
                              form.setValue('is_hosteller', undefined);
                            }}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium focus:outline-none text-white ${
                              field.value === false
                                ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/50 text-orange-200 hover:text-orange-100'
                                : 'bg-white/5'
                            }`}
                          >
                            No
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  {form.watch('is_amrita_campus') ? (
                    <FormField
                      control={form.control}
                      name="is_hosteller"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/80">
                            Hosteller / Day Scholar
                          </FormLabel>
                          <div className="mt-2 flex items-center gap-3">
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => field.onChange(true)}
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium focus:outline-none text-white ${
                                field.value === true
                                  ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/50 text-orange-200 hover:text-orange-100'
                                  : 'bg-white/5'
                              }`}
                            >
                              Hosteller
                            </Button>

                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => field.onChange(false)}
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium focus:outline-none text-white ${
                                field.value === false
                                  ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/50 text-orange-200 hover:text-orange-100'
                                  : 'bg-white/5'
                              }`}
                            >
                              Day Scholar
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : null}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  {form.watch('is_amrita_campus') ? (
                    <FormField
                      control={form.control}
                      name="college_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/80">
                            College Name
                          </FormLabel>
                          <FormControl>
                            <Select
                              value={field.value ?? ''}
                              onValueChange={(v) => field.onChange(v)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select campus" />
                              </SelectTrigger>
                              <SelectContent>
                                {AMRITA_CAMPUSES.map((c) => (
                                  <SelectItem key={c} value={c}>
                                    {c}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      control={form.control}
                      name="college_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/80">
                            College Name
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Your College Name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="college_roll_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">
                          College Roll Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Your College Roll Number"
                            onChange={(e) => field.onChange(e.target.value)}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="border-t border-white/10 my-6" />

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm text-white/80 mb-2">
                    Expected Arrival
                  </h3>
                  <div className="flex flex-wrap gap-3 items-start">
                    <FormField
                      control={form.control}
                      name="check_in_date"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="sr-only">
                            Expected Arrival Date
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="date"
                              min={checkInMinDate}
                              max={checkInMaxDate}
                              className="w-full"
                            />
                          </FormControl>
                          <div className="ml-2 md:ml-1">
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="check_in_time"
                      render={({ field }) => (
                        <FormItem className="w-full sm:w-40">
                          <FormLabel className="sr-only">
                            Expected Arrival Time
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="time" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-white/80 mb-2">
                    Expected Departure
                  </h3>
                  <div className="flex flex-wrap gap-3 items-start">
                    <FormField
                      control={form.control}
                      name="check_out_date"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="sr-only">
                            Expected Departure Date
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="date"
                              min={checkOutMinDate}
                              max={checkOutMaxDate}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="check_out_time"
                      render={({ field }) => (
                        <FormItem className="w-full sm:w-40">
                          <FormLabel className="sr-only">
                            Expected Departure Time
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="time" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <FormField
                control={form.control}
                name="room_preference"
                render={({ field }) => {
                  const disableDorm =
                    field && form.getValues('is_male') === true;
                  const disable4Sharing =
                    field && form.getValues('is_male') === false;
                  const disableSingle =
                    field && form.getValues('is_hosteller') === true;
                  return (
                    <FormItem>
                      <FormLabel className="text-white/80">
                        Room Preference
                      </FormLabel>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <Button
                          type="button"
                          variant="ghost"
                          disabled={disableSingle}
                          onClick={() => {
                            if (disableSingle) return;
                            field.onChange('single');
                          }}
                          className={`w-full sm:w-auto inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md text-sm font-medium focus:outline-none text-white ${
                            field.value === 'single'
                              ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/50 text-orange-200'
                              : 'bg-white/5'
                          } ${disableSingle ? 'opacity-40 cursor-not-allowed' : ''}`}
                        >
                          Single
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          disabled={disable4Sharing}
                          onClick={() => {
                            if (disable4Sharing) return;
                            field.onChange('4 sharing');
                          }}
                          className={`w-full sm:w-auto inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md text-sm font-medium focus:outline-none text-white ${
                            field.value === '4 sharing'
                              ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/50 text-orange-200'
                              : 'bg-white/5'
                          } ${disable4Sharing ? 'opacity-40 cursor-not-allowed' : ''}`}
                        >
                          4 Sharing
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          disabled={disableDorm}
                          onClick={() => {
                            if (disableDorm) return;
                            field.onChange('dormitory');
                          }}
                          className={`w-full sm:w-auto inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md text-sm font-medium focus:outline-none text-white ${
                            field.value === 'dormitory'
                              ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/50 text-orange-200'
                              : 'bg-white/5'
                          } ${disableDorm ? 'opacity-40 cursor-not-allowed' : ''}`}
                        >
                          Dormitory
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="border-t border-white/10 my-6" />

            <div className="mt-4 mb-4">
              <FormField
                control={form.control}
                name="agree_rules"
                render={({ field }) => (
                  <FormItem>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="h-4 w-4 rounded text-orange-500 bg-white/5 border-white/20 focus:ring-orange-400"
                      />
                      <div className="text-md text-white/80 leading-tight">
                        I have read and agree with the rules and guidelines.{' '}
                        <a
                          href="https://amritavishwavidyapeetham-my.sharepoint.com/:b:/g/personal/anokhahosp_cb_amrita_edu/IQBpCU_wTItwQKp4oQZwIYuWAQYip7dL_wURcmcNGJgzpY4?e=0BmHR6"
                          target="_blank"
                          rel="noreferrer"
                          className="text-orange-400 underline ml-1"
                        >
                          Rules &amp; Guidelines
                        </a>
                      </div>
                    </label>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="border-t border-white/10 my-4" />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  {/* For Desktop */}
                  <div className="hidden md:block text-sm text-white/80">
                    Estimated Price (Refer to the Guidelines for Price Breakup):
                  </div>

                  {/* For Mobile */}
                  <div className="md:hidden">
                    <div className="text-sm text-white/80">
                      Estimated Price:
                    </div>
                    <div className="text-xs text-white/70">
                      (Refer to the Guidelines for Price Breakup)
                    </div>
                  </div>
                  <div className="text-lg font-semibold mt-1">
                    {estimatedPrice === null ? (
                      <span className="text-white/50">NA</span>
                    ) : estimatedPrice === 0 ? (
                      'No Cost'
                    ) : (
                      formatCurrency(estimatedPrice)
                    )}
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    variant="default"
                    disabled={!agreeWatch}
                    className="group inline-flex items-center gap-2"
                  >
                    <span>Submit</span>
                    <ArrowRight className="h-4 w-4 transition-transform transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default AccommodationFormComponent;
