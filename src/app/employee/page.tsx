'use client';

import React from 'react';
import { CustomerList } from '@/components/customer/CustomerList';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { TimelineView } from '@/components/timeline/TimelineView';
import { SugarLevelChart } from '@/components/sugar-levels/SugarLevelChart';
import { dummyCustomers } from '@/lib/dummy-data';

export default function EmployeePage() {
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<string | undefined>(
    dummyCustomers[0]?.id
  );

  const selectedCustomer = dummyCustomers.find(
    (customer) => customer.id === selectedCustomerId
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Employee Dashboard</h1>

      <div className="grid grid-cols-12 gap-8">
        {/* Customer List - 1/4 width */}
        <div className="col-span-12 lg:col-span-3">
          <CustomerList
            customers={dummyCustomers}
            selectedCustomerId={selectedCustomerId}
            onSelectCustomer={(customer) => setSelectedCustomerId(customer.id)}
          />
        </div>

        {/* Main Content Area - 3/4 width */}
        <div className="col-span-12 lg:col-span-9 space-y-8">
          {selectedCustomer ? (
            <>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Chat Interface */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Chat with {selectedCustomer.name}
                  </h2>
                  <ChatInterface
                    messages={selectedCustomer.messages}
                    onSendMessage={(message) => {
                      console.log('Sending message:', message);
                      // In a real app, this would send the message to the backend
                    }}
                  />
                </div>

                {/* Sugar Level Chart */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Sugar Level Readings</h2>
                  <SugarLevelChart readings={selectedCustomer.sugarLevels} />
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Daily Timeline</h2>
                <TimelineView entries={selectedCustomer.timeline} />
              </div>
            </>
          ) : (
            <div className="text-center text-muted-foreground">
              Select a customer to view their details
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 