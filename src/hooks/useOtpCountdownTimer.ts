import { useEffect, useState } from 'react';

type UseOtpCountdownOptions = {
  duration?: number; // in seconds, default = 120
  storageKey?: string;
  onResend?: () => void;
};

export function useOtpCountdownTimer({
  duration = 120,
  storageKey = 'resendStartTime',
  onResend,
}: UseOtpCountdownOptions) {
  const [countdown, setCountdown] = useState(duration);
  const [showResend, setShowResend] = useState(false);
  const [resendStartTime, setResendStartTime] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(storageKey);
      return stored ? parseInt(stored, 10) : 0;
    }
    return 0;
  });

  // Countdown logic
  useEffect(() => {
    if (resendStartTime === 0) {
      setCountdown(0);
      setShowResend(true);
      return;
    }

    const now = Date.now();
    const elapsed = Math.floor((now - resendStartTime) / 1000);
    const remaining = Math.max(duration - elapsed, 0);

    setCountdown(remaining);
    if (remaining === 0) {
      setShowResend(true);
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resendStartTime, duration]);

  // For Syncing with multiple tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        setResendStartTime(parseInt(e.newValue, 10));
        setShowResend(false);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [storageKey]);

  // Handle resend button
  const handleResend = () => {
    const now = Date.now();
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey, String(now));
    }
    setResendStartTime(now);
    setCountdown(duration);
    setShowResend(false);
    onResend?.();
  };

  return {
    countdown,
    showResend,
    handleResend,
  };
}
