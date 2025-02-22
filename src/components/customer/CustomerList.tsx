'use client';

import React from 'react';
import { Card } from "@/components/ui/card";
import { Customer } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface CustomerListProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  selectedCustomerId?: string;
}

export function CustomerList({ customers, onSelectCustomer, selectedCustomerId }: CustomerListProps) {
  const getLastMessage = (customer: Customer) => {
    return customer.messages[customer.messages.length - 1];
  };

  return (
    <div className="divide-y divide-border">
      {customers.map((customer) => {
        const lastMessage = getLastMessage(customer);
        const messagePreview = lastMessage?.content || '';
        const timestamp = lastMessage ? formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: true }) : '';

        return (
          <button
            key={customer.id}
            onClick={() => onSelectCustomer(customer)}
            className={`w-full text-left p-4 flex flex-col gap-1 hover:bg-accent/50 transition-colors relative ${
              selectedCustomerId === customer.id ? 'bg-accent' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-semibold">
                  {customer.name[0].toUpperCase()}
                </div>
                <span className="font-semibold">{customer.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{timestamp}</span>
            </div>
            {messagePreview && (
              <p className="text-sm text-muted-foreground line-clamp-1 pl-[52px]">
                {messagePreview}
              </p>
            )}
            {selectedCustomerId === customer.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
            )}
          </button>
        );
      })}
    </div>
  );
} 