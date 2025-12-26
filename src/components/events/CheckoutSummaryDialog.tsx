'use client';

import { ArrowRight } from 'lucide-react';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { GST_RATE } from '@/lib/constants';
import { formatCurrency } from '@/lib/utilityFunctions';

interface CheckoutSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventName: string;
  unitPrice: number;
  quantity: number;
  unit?: string;
  onConfirm: () => void;
}

export default function CheckoutSummaryDialog({
  open,
  onOpenChange,
  eventName,
  unitPrice,
  quantity,
  unit = 'Item',
  onConfirm,
}: CheckoutSummaryDialogProps) {
  const subtotal = unitPrice * quantity;
  const gstAmount = +(subtotal * GST_RATE);
  const total = +(subtotal + gstAmount);

  const formattedUnit = quantity === 1 ? unit : `${unit}s`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[calc(100%-2rem)] mx-auto sm:max-w-3xl rounded-lg px-4 md:px-6">
        <DialogHeader>
          <DialogTitle className="font-bold">Checkout Summary</DialogTitle>
        </DialogHeader>

        <div className="bg-card border border-border rounded-lg p-4 space-y-4">
          <div className="flex flex-wrap min-w-0 items-center justify-between gap-x-2 gap-y-1 sm:grid sm:grid-cols-[2fr_1fr_1fr]">
            {/* Event Name & Details */}
            <div className="font-medium text-foreground text-lg truncate min-w-0 flex-1">
              {eventName}
            </div>

            <div className="text-right sm:text-center text-foreground/70 font-mono whitespace-nowrap ml-2">
              <span className="sm:hidden">x {quantity}</span>
              <span className="hidden sm:inline">
                x {quantity}
                {unit !== 'Individual' ? ` ${formattedUnit}` : ''}
              </span>
            </div>

            <div className="w-full sm:w-auto col-start-2 sm:col-start-auto text-right font-semibold text-foreground mt-1 sm:mt-0">
              {subtotal === 0 ? 'Free' : formatCurrency(subtotal)}
            </div>
          </div>

          {/* GST */}
          <div className="flex items-center justify-between text-sm text-foreground/80">
            <div>GST ({GST_RATE * 100}%)</div>
            <div>{gstAmount === 0 ? '₹0.00' : formatCurrency(gstAmount)}</div>
          </div>

          {/* Total */}
          <div className="border-t border-border pt-3 flex items-center justify-between">
            <div className="font-bold text-xl text-foreground">Total</div>
            <div className="font-bold text-xl text-foreground">
              {total === 0 ? 'Free' : formatCurrency(total)}
            </div>
          </div>

          <div className="flex gap-4 md:gap-8 pt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="w-full px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 rounded-md transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => {
                onConfirm();
              }}
              className="w-full px-4 py-2 bg-primary font-bold text-primary-foreground rounded-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors group"
            >
              <span className="hidden sm:inline">Confirm Checkout</span>
              <span className="sm:hidden">Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
