import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Customer } from '@/lib/types';

interface CustomerListProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  selectedCustomerId?: string;
}

export function CustomerList({ customers, onSelectCustomer, selectedCustomerId }: CustomerListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {customers.map((customer) => (
            <button
              key={customer.id}
              className={`w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left ${
                selectedCustomerId === customer.id ? 'bg-muted' : ''
              }`}
              onClick={() => onSelectCustomer(customer)}
            >
              <Avatar>
                <AvatarFallback>{customer.name[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{customer.name}</div>
                <div className="text-sm text-muted-foreground">{customer.email}</div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 