import { useEffect, useRef, useState } from 'react';

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
  const inMemoryStartRef = useRef<number>(0);

  const [resendStartTime, setResendStartTime] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(storageKey);
      const val = stored ? parseInt(stored, 10) : 0;
      inMemoryStartRef.current = val;
      return val;
    }
    return 0;
  });

  const [countdown, setCountdown] = useState(duration);
  const [showResend, setShowResend] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!resendStartTime) {
      const now = Date.now();
      window.localStorage.setItem(storageKey, String(now));
      inMemoryStartRef.current = now;
      setResendStartTime(now);
    }
  }, []);
  useEffect(() => {
    const startTime = resendStartTime || inMemoryStartRef.current;

    if (!startTime) return;

    const updateRemaining = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      const remaining = Math.max(duration - elapsed, 0);

      setCountdown(remaining);
      setShowResend(remaining === 0);
    };

    updateRemaining();

    if (countdown === 0) return;

    const interval = setInterval(updateRemaining, 1000);
    return () => clearInterval(interval);
  }, [resendStartTime, duration]);
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === storageKey) {
        if (e.newValue) {
          const newTime = parseInt(e.newValue, 10);
          inMemoryStartRef.current = newTime;
          setResendStartTime(newTime);
          setShowResend(false);
        } else {
          setShowResend(false);
          setResendStartTime(inMemoryStartRef.current);
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [storageKey]);

  const handleResend = () => {
    const now = Date.now();
    window.localStorage.setItem(storageKey, String(now));
    inMemoryStartRef.current = now;
    setResendStartTime(now);
    setCountdown(duration);
    setShowResend(false);
    onResend?.();
  };

  return { countdown, showResend, handleResend };
}
