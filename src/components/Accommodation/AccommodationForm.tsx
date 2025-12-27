'use client';

import { ArrowRight, Mars, Venus } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { useAuthStore } from '@/stores/auth.store';

const instructions = [
  'Participants must carry their valid college ID during check-in (Both Amrita and Non-Amrita Students).',
  'Accommodation allotment and payment will be done on the spot at the campus entrance gate. Allotment is strictly on a first-come, first-served basis and is subject to availability.',
  'A strict Single-entry, Single-exit policy is in effect. Once an Anokha ID card is scanned for entry, participants will not be allowed to re-enter if they exit the Campus Gate.',
  'Food will be available in campus canteen and food stalls on the payment basis.',
  'Accommodation will be available from 6:00 PM on 6th January and will conclude by 7:00 AM on 10th January.',
];

const AMRITA_CAMPUSES: string[] = [
  'Amrita Vishwa Vidyapeetham - Coimbatore',
  'Amrita Vishwa Vidyapeetham - Amritapuri',
  'Amrita Vishwa Vidyapeetham - Chennai',
  'Amrita Vishwa Vidyapeetham - Bangalore',
  'Amrita Vishwa Vidyapeetham - Amaravati',
  'Amrita Vishwa Vidyapeetham - Arasampalayam',
];

const AccommodationForm: React.FC = () => {
  const user = useAuthStore((s) => s.user);

  const [checked, setChecked] = useState<boolean[]>(() =>
    instructions.map(() => false),
  );
  const [showForm, setShowForm] = useState(false);

  type AccommodationFormValues = {
    name: string;
    email: string;
    is_male: boolean;
    is_amrita_campus: boolean;
    college_name: string;
    is_hosteller: boolean;
    college_roll_number: string;
    check_in_date: string;
    check_in_time: string;
    check_out_date: string;
    check_out_time: string;
    room_preference: 'single' | '4 sharing' | 'dormitory';
  };

  const form = useForm<AccommodationFormValues>({
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
    },
  });

  useEffect(() => {
    form.reset({
      name: user?.name ?? '',
      email: user?.email ?? '',
    });
  }, [user, form]);

  const gender = form.watch('is_male');
  useEffect(() => {
    const rp = form.getValues('room_preference');
    if (gender === true && rp === 'dormitory') {
      form.setValue('room_preference', 'single');
    }
    if (gender === false && rp === '4 sharing') {
      form.setValue('room_preference', 'single');
    }
  }, [gender, form]);

  const eventYear = 2026;

  const checkInMinDate = `${eventYear}-01-06`;
  const checkInMaxDate = `${eventYear}-01-09`;
  const checkOutMinDate = `${eventYear}-01-07`;
  const checkOutMaxDate = `${eventYear}-01-10`;

  useEffect(() => {
    const defaultArrivalDate = `${eventYear}-01-06`;
    const defaultArrivalTime = '18:00';
    const defaultDepartureDate = `${eventYear}-01-10`;
    const defaultDepartureTime = '07:00';

    if (!form.getValues('check_in_date'))
      form.setValue('check_in_date', defaultArrivalDate);
    if (!form.getValues('check_in_time'))
      form.setValue('check_in_time', defaultArrivalTime);
    if (!form.getValues('check_out_date'))
      form.setValue('check_out_date', defaultDepartureDate);
    if (!form.getValues('check_out_time'))
      form.setValue('check_out_time', defaultDepartureTime);
  }, [eventYear, form]);

  const roomPrefWatch = form.watch('room_preference');
  const isAmritaWatch = form.watch('is_amrita_campus');
  const isHostellerWatch = form.watch('is_hosteller');
  const inDateWatch = form.watch('check_in_date');
  const outDateWatch = form.watch('check_out_date');

  const estimatedPrice = React.useMemo<number | null>(() => {
    if (!roomPrefWatch) return null;

    if (isAmritaWatch === true && isHostellerWatch === true) return 0;

    let perDay = 0;
    if (roomPrefWatch === 'single') {
      perDay = isAmritaWatch ? 300 : 340;
    } else {
      perDay = isAmritaWatch ? 200 : 230;
    }

    const startDate = inDateWatch
      ? new Date(inDateWatch)
      : new Date(`${eventYear}-01-06`);
    const endDate = outDateWatch
      ? new Date(outDateWatch)
      : new Date(`${eventYear}-01-10`);
    if (endDate <= startDate) return perDay * 0;

    let days = 0;
    const d = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
    );
    while (d < endDate) {
      const isJan6 =
        d.getFullYear() === eventYear &&
        d.getMonth() === 0 &&
        d.getDate() === 6;
      const isJan10 =
        d.getFullYear() === eventYear &&
        d.getMonth() === 0 &&
        d.getDate() === 10;
      if (!isJan6 && !isJan10) days += 1;
      d.setDate(d.getDate() + 1);
    }

    return perDay * days;
  }, [
    roomPrefWatch,
    isAmritaWatch,
    isHostellerWatch,
    inDateWatch,
    outDateWatch,
    eventYear,
  ]);

  const allChecked = useMemo(() => checked.every(Boolean), [checked]);

  const toggle = (index: number) => {
    setChecked((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const onNext = () => {
    if (!allChecked) return;
    setShowForm(true);
  };

  const onSubmit = (data: any) => {
    // TODO: integrate API
    console.log('Registration submitted', data);
  };

  if (showForm) {
    return (
      <section className="w-full max-w-7xl mx-auto mt-10">
        <div className="mx-auto w-full bg-gradient-to-br from-slate-900/60 via-slate-900/50 to-slate-800/40 border border-white/5 rounded-xl md:rounded-2xl px-4 md:px-10 pt-2 md:pt-5 pb-8 shadow-2xl backdrop-blur-lg text-white text-left">
          <h2 className="text-lg md:text-3xl font-bold mb-4 mt-4">
            Registration
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Default Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-white/80">Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Default Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-white/80">Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-4">
                {/* Gender Field */}
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
                    </FormItem>
                  )}
                />
              </div>

              <div className="border-t border-white/10 my-6" />

              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div>
                    {/* Is Amrita Campus Field */}
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
                              variant="ghost"
                              onClick={() => {
                                field.onChange(true);
                                form.setValue('college_name', '');
                                form.setValue('college_roll_number', '');
                              }}
                              className={
                                `inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium focus:outline-none text-white ` +
                                (field.value === true
                                  ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/50 text-orange-200 hover:text-orange-100'
                                  : 'bg-white/5')
                              }
                            >
                              Yes
                            </Button>

                            <Button
                              variant="ghost"
                              onClick={() => {
                                field.onChange(false);
                                form.setValue('college_name', '');
                                form.setValue('college_roll_number', '');
                                form.setValue('is_hosteller', false);
                              }}
                              className={
                                `inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium focus:outline-none text-white ` +
                                (field.value === false
                                  ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/50 text-orange-200 hover:text-orange-100'
                                  : 'bg-white/5')
                              }
                            >
                              No
                            </Button>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    {form.watch('is_amrita_campus') ? (
                      // Is Hosteller Field
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
                                variant="ghost"
                                onClick={() => field.onChange(true)}
                                className={
                                  `inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium focus:outline-none text-white ` +
                                  (field.value === true
                                    ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/50 text-orange-200 hover:text-orange-100'
                                    : 'bg-white/5')
                                }
                              >
                                Hosteller
                              </Button>

                              <Button
                                variant="ghost"
                                onClick={() => field.onChange(false)}
                                className={
                                  `inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium focus:outline-none text-white ` +
                                  (field.value === false
                                    ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/50 text-orange-200 hover:text-orange-100'
                                    : 'bg-white/5')
                                }
                              >
                                Day Scholar
                              </Button>
                            </div>
                          </FormItem>
                        )}
                      />
                    ) : null}
                  </div>
                </div>

                {/* Second row: college name and roll number side-by-side */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    {form.watch('is_amrita_campus') ? (
                      // College Name Field (Select for Amrita campuses)
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
                          </FormItem>
                        )}
                      />
                    ) : (
                      // College Name Field (Input for Non-Amrita campuses)
                      <FormField
                        control={form.control}
                        name="college_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">
                              College Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Your College Name"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div>
                    {/* College Roll Number Field */}
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
                              onChange={(e) =>
                                field.onChange(e.target.value.toUpperCase())
                              }
                              value={field.value ?? ''}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="border-t border-white/10 my-6" />

                {/* Expected Arrival and Departure Fields */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm text-white/80 mb-2">
                      Expected Arrival
                    </h3>
                    <div className="flex flex-wrap gap-3 items-center">
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
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm text-white/80 mb-2">
                      Expected Departure
                    </h3>
                    <div className="flex flex-wrap gap-3 items-center">
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
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Room Preference Field */}
              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="room_preference"
                  render={({ field }) => {
                    const disableDorm =
                      field && form.getValues('is_male') === true;
                    const disable4Sharing =
                      field && form.getValues('is_male') === false;
                    return (
                      <FormItem>
                        <FormLabel className="text-white/80">
                          Room Preference
                        </FormLabel>
                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          <Button
                            variant="ghost"
                            onClick={() => !false && field.onChange('single')}
                            className={`w-full sm:w-auto inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md text-sm font-medium focus:outline-none text-white ${
                              field.value === 'single'
                                ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/50 text-orange-200'
                                : 'bg-white/5'
                            }`}
                          >
                            Single
                          </Button>

                          <Button
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
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="border-t border-white/10 my-6" />

              {/* Estimated price and Submit*/}
              <div className="mt-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-white/80">
                      Estimated Price:
                    </div>
                    <div className="text-lg font-semibold mt-1">
                      {estimatedPrice === null ? (
                        <span className="text-white/50">NA</span>
                      ) : estimatedPrice === 0 ? (
                        'Free'
                      ) : (
                        formatCurrency(estimatedPrice)
                      )}
                    </div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      variant="default"
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
  }

  return (
    <section className="w-full max-w-7xl mx-auto mt-10">
      <div className="mx-auto w-full bg-gradient-to-br from-slate-900/60 via-slate-900/50 to-slate-800/40 border border-white/5 rounded-xl md:rounded-3xl px-6 md:px-10 py-10 shadow-2xl backdrop-blur-lg text-white text-left">
        <h2 className="text-3xl md:text-4xl font-semibold text-center">
          Important Points
        </h2>

        <p className="mt-4 text-left text-md text-white/80 mt-8 md:mt-6">
          Please read and select all the points to proceed:
        </p>

        <div className="mt-5 grid gap-4">
          {instructions.map((text, idx) => (
            <label key={idx} className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={checked[idx]}
                onChange={() => toggle(idx)}
                className="mt-1 h-5 w-5 rounded text-orange-500 bg-white/5 border-white/20 ring-offset-slate-900/30 focus:ring-orange-400"
              />
              <span className="text-md leading-relaxed">{text}</span>
            </label>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onNext}
            disabled={!allChecked}
            className={`inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none ${
              allChecked
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-orange-300/30 text-white/60 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default AccommodationForm;
