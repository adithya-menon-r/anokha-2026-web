'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import AccommodationFormComponent from '@/components/Accommodation/AccommodationFormComponent';
import AccommodationInstructions from '@/components/Accommodation/AccommodationInstructions';
import { useAccommodationStatus } from '@/hooks/useAccommodationStatus';
import { useSubmitAccommodation } from '@/hooks/useSubmitAccommodation';
import { useAuthStore } from '@/stores/auth.store';
import type { AccommodationFormValues } from '@/types/accommodationTypes';
import {
  accommodationFormDefaultValues,
  accommodationFormSchema,
} from '@/types/accommodationTypes';

const instructions = [
  'Participants must carry their valid college ID during check-in (Both Amrita and Non-Amrita Students',
  'Accommodation allotment and payment will be done ON-SPOT at the campus entrance gate. Allotment is strictly on a first-come, first-served basis and is subject to availability.',
  'A strict Single-entry, Single-exit policy is in effect. Once an Anokha ID card is scanned for entry, participants will not be allowed to re-enter if they exit the Campus Gate.',
  'Food will be available in campus canteen and food stalls on the payment Basis.',
  'Accommodation will be available from 6th January and will conclude by 7:00 AM on 10th January.',
];

const AMRITA_CAMPUSES: string[] = [
  'Amrita Vishwa Vidyapeetham - Ettimadai',
  'Amrita Vishwa Vidyapeetham - Arasampalayam',
  'Amrita Vishwa Vidyapeetham - Chennai',
  'Amrita Vishwa Vidyapeetham - Amritapuri',
  'Amrita Vishwa Vidyapeetham - Bangalore',
  'Amrita Vishwa Vidyapeetham - Amaravati',
  'Amrita Vishwa Vidyapeetham - Faridabad',
  'Amrita Vishwa Vidyapeetham - Kochi',
  'Amrita Vishwa Vidyapeetham - Nagercoil',
  'Amrita Vishwa Vidyapeetham - Mysuru',
  'Amrita Vishwa Vidyapeetham - Haridwar',
];

const AccommodationForm: React.FC = () => {
  const user = useAuthStore((s) => s.user);

  const [checked, setChecked] = useState<boolean[]>(() =>
    instructions.map(() => false),
  );
  const [showForm, setShowForm] = useState(false);

  const form = useForm<AccommodationFormValues>({
    resolver: zodResolver(accommodationFormSchema),
    defaultValues: {
      ...accommodationFormDefaultValues,
      name: user?.name ?? '',
      email: user?.email ?? '',
    },
  });

  const submitMutation = useSubmitAccommodation();
  const {
    data: accommodationStatus,
    isLoading: accommodationStatusLoading,
    isFetched: accommodationStatusFetched,
  } = useAccommodationStatus();

  useEffect(() => {
    form.reset({
      ...form.getValues(),
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
  const agreeWatch = form.watch('agree_rules');

  const estimatedPrice = useMemo<number | null>(() => {
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
      const isJan10 =
        d.getFullYear() === eventYear &&
        d.getMonth() === 0 &&
        d.getDate() === 10;
      if (!isJan10) days += 1;
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

  const onSubmit = (data: AccommodationFormValues) => {
    submitMutation.mutate(data);
  };

  if (!accommodationStatusFetched || accommodationStatusLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="flex items-center gap-3 bg-transparent">
          <Loader2 className="h-10 w-10 animate-spin text-white" />
          <div className="text-white/80">Querying Accommodation Status...</div>
        </div>
      </div>
    );
  }

  if (accommodationStatus === 'NOT_REGISTERED') {
    return (
      <section className="w-full max-w-7xl mx-auto mt-10">
        <div className="mx-auto w-full px-4 py-6 text-white">
          <div className="bg-white/5 rounded-lg py-20 px-6">
            <h3 className="text-2xl font-bold text-white mb-3">
              No Event Registered!
            </h3>
            <p className="text-white/80 mb-6">
              Please register for an event to request accommodation.
            </p>
            <div>
              <Link
                href="/events"
                className="inline-flex items-center px-4 py-2 text-white rounded-md bg-anokha-orange/90 hover:bg-anokha-orange/100 backdrop-blur-md border border-white/10 shadow-md transition-transform duration-150 hover:scale-[1.02]"
              >
                Go to Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (accommodationStatus === 'FILLED_ACCOMMODATION') {
    return (
      <section className="w-full max-w-7xl mx-auto mt-10">
        <div className="mx-auto w-full px-4 py-6 text-white">
          <div className="bg-white/5 rounded-lg py-20 px-6">
            <h3 className="text-2xl font-bold text-white mb-3">
              Accommodation Form already submitted!
            </h3>
            <p className="text-white/80 mb-6">
              We have successfully received your request for accommodation. See
              you at Anokha!
            </p>
            <div>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 text-white rounded-md bg-anokha-orange/90 hover:bg-anokha-orange/100 backdrop-blur-md border border-white/10 shadow-md transition-transform duration-150 hover:scale-[1.02]"
              >
                Go Back Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (showForm) {
    return (
      <AccommodationFormComponent
        form={form}
        estimatedPrice={estimatedPrice}
        agreeWatch={agreeWatch}
        onSubmit={onSubmit}
        AMRITA_CAMPUSES={AMRITA_CAMPUSES}
        checkInMinDate={checkInMinDate}
        checkInMaxDate={checkInMaxDate}
        checkOutMinDate={checkOutMinDate}
        checkOutMaxDate={checkOutMaxDate}
      />
    );
  }

  return (
    <AccommodationInstructions
      instructions={instructions}
      checked={checked}
      toggle={toggle}
      onNext={onNext}
      allChecked={allChecked}
    />
  );
};

export default AccommodationForm;
