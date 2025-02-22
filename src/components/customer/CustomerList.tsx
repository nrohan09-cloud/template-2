'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Customer } from '@/lib/types';

interface CustomerListProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  selectedCustomerId?: string;
}

export function CustomerList({ customers, onSelectCustomer, selectedCustomerId }: CustomerListProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-2">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedCustomerId === customer.id
                    ? 'bg-primary/10'
                    : 'hover:bg-muted'
                }`}
                onClick={() => onSelectCustomer(customer)}
              >
                <Avatar>
                  <AvatarImage src={customer.avatar} />
                  <AvatarFallback>{customer.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {customer.email}
                  </div>
                </div>
                {/* Latest message preview */}
                {customer.messages.length > 0 && (
                  <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                    {customer.messages[customer.messages.length - 1].content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 