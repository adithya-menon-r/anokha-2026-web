/**
 * Title case (capitalize each word)
 */
export function toTitleCase(str: string): string {
  return str.replace(/\b\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

/**
 * Apply GST (18%) to a base amount
 */
export function applyGst(amount: number, rate = 0.18): number {
  return +(amount * (1 + rate)).toFixed(2);
}

/**
 * Format currency ₹xx.xx
 */
export function formatCurrency(amount: number): string {
  return `₹${amount.toFixed(2)}`;
}

/**
 * Format date (DD MMM YYYY, hh:mm AM/PM)
 */
import { format } from 'date-fns';
export function formatDate(d: string | Date): string {
  return format(new Date(d), 'dd MMM yyyy, hh:mm a');
}
