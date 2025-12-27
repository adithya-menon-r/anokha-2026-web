'use client';

import { CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { GroupRegistrationForm } from '@/components/events/GroupRegistrationForm';
import { useBookGroupEvent } from '@/hooks/useBooking';
import { usePaymentFromBooking } from '@/hooks/usePaymentFromBooking';
import { useAuthStore } from '@/stores/auth.store';
import type { GroupBookingPayload } from '@/types/bookingTypes';
import type { GroupRegistrationOutput } from '@/types/groupRegistration';

const EVENT_ID = '4c613718-fe01-45dd-a2fd-1c5885c60256';
const REGISTRATION_FEE = 500;

const PROBLEM_STATEMENTS = [
  {
    id: 'generative_ai',
    title: 'Generative AI',
    description:
      'Build innovative solutions using generative models such as GPT, diffusion, or retrieval-augmented generation.',
  },
  {
    id: 'agentic_ai',
    title: 'Agentic AI',
    description:
      'Create autonomous agents that can plan, reason, and act to accomplish end-to-end tasks reliably.',
  },
  {
    id: 'aiot',
    title: 'AIoT (AI + IoT)',
    description:
      'Blend edge devices and cloud intelligence to deliver smart, connected experiences with real-time insights.',
  },
] as const;

export default function HackathonRegisterPage(): React.JSX.Element {
  const router = useRouter();
  const { user } = useAuthStore();
  const { redirectToPayment } = usePaymentFromBooking();
  const bookGroupMutation = useBookGroupEvent();

  const [selectedPs, setSelectedPs] = useState<string | null>(null);

  const selectedPsLabel = useMemo(() => {
    const ps = PROBLEM_STATEMENTS.find((item) => item.id === selectedPs);
    return ps?.title || 'Not selected';
  }, [selectedPs]);

  const handleSubmit = (data: GroupRegistrationOutput) => {
    if (!user) {
      toast.error('Please log in to register');
      router.push('/login');
      return;
    }

    if (!selectedPs) {
      toast.error('Please choose a problem statement');
      return;
    }

    const payload: GroupBookingPayload = {
      ...data,
      ps: selectedPs,
    };

    bookGroupMutation.mutate(
      { eventId: EVENT_ID, payload },
      {
        onSuccess: (bookingData) => {
          toast.success(
            'Team registered successfully! Redirecting to payment...',
          );
          if (bookingData.hash && bookingData.txnId) {
            setTimeout(() => redirectToPayment(bookingData), 600);
          }
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0615] to-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16 space-y-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-200">
                <Sparkles className="h-4 w-4" /> Hackathon Registration
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                Register your team
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-300">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Team size: 2 - 4 members
                </span>
                <span className="rounded-full border border-purple-500/40 bg-gradient-to-r from-purple-600/30 to-fuchsia-600/30 px-4 py-1 text-white font-semibold shadow-[0_0_30px_rgba(168,85,247,0.35)]">
                  Fee: ₹{REGISTRATION_FEE} + GST per team
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1 items-start sm:items-end text-sm mt-4 md:mt-0 lg:mt-0 text-zinc-300">
              <p className="font-semibold text-white">
                Selected problem statement
              </p>
              <p className="text-purple-200">{selectedPsLabel}</p>
            </div>
          </div>
        </div>

        {/* Problem statements (inline, no modal) */}
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-10 space-y-4">
          <h2 className="text-xl font-semibold">
            Choose your problem statement
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROBLEM_STATEMENTS.map((ps) => {
              const isSelected = ps.id === selectedPs;
              return (
                <button
                  key={ps.id}
                  type="button"
                  onClick={() => setSelectedPs(ps.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                    isSelected
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isSelected ? (
                      <CheckCircle2 className="h-5 w-5 text-purple-400 mt-1" />
                    ) : (
                      <Circle className="h-5 w-5 text-zinc-400 mt-1" />
                    )}
                    <div>
                      <p className="text-xs uppercase text-zinc-400">{ps.id}</p>
                      <h3 className="text-lg font-semibold">{ps.title}</h3>
                      <p className="text-sm text-zinc-300 mt-1">
                        {ps.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {user ? (
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-10">
            <GroupRegistrationForm
              leaderName={user?.name || ''}
              leaderEmail={user?.email || ''}
              minTeamSize={2}
              maxTeamSize={4}
              onSubmit={handleSubmit}
              className="text-white"
            />
          </div>
        ) : (
          <div className="rounded-3xl bg-black/40 p-6 sm:p-10 flex items-center justify-center">
            <button
              type="button"
              onClick={() => router.push('/login')}
              className={
                'w-full md:w-1/4 py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors'
              }
            >
              Login to Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
