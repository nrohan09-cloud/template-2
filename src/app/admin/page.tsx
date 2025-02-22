'use client';

import React from 'react';
import { EmployeeStats } from '@/components/employee/EmployeeStats';
import { CustomerList } from '@/components/customer/CustomerList';
import { TimelineView } from '@/components/timeline/TimelineView';
import { SugarLevelChart } from '@/components/sugar-levels/SugarLevelChart';
import { dummyCustomers, dummyEmployees } from '@/lib/dummy-data';

export default function AdminPage() {
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<string | undefined>(
    dummyCustomers[0]?.id
  );

  const selectedCustomer = dummyCustomers.find(
    (customer) => customer.id === selectedCustomerId
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Employee Statistics */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Employee Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {dummyEmployees.map((employee) => (
            <EmployeeStats key={employee.id} employee={employee} />
          ))}
        </div>
      </section>

      {/* Customer Overview */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Customer Overview</h2>
        <div className="grid grid-cols-12 gap-8">
          {/* Customer List - 1/4 width */}
          <div className="col-span-12 lg:col-span-3">
            <CustomerList
              customers={dummyCustomers}
              selectedCustomerId={selectedCustomerId}
              onSelectCustomer={(customer) => setSelectedCustomerId(customer.id)}
            />
          </div>

          {/* Customer Details - 3/4 width */}
          <div className="col-span-12 lg:col-span-9 space-y-8">
            {selectedCustomer ? (
              <>
                {/* Sugar Level Chart */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Sugar Level Readings</h3>
                  <SugarLevelChart readings={selectedCustomer.sugarLevels} />
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Daily Timeline</h3>
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
      </section>
    </div>
  );
} 