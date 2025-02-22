'use client';

import React from 'react';
import { EmployeeStats } from '@/components/employee/EmployeeStats';
import { CustomerList } from '@/components/customer/CustomerList';
import { TimelineView } from '@/components/timeline/TimelineView';
import { SugarLevelChart } from '@/components/sugar-levels/SugarLevelChart';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { dummyCustomers, dummyEmployees } from '@/lib/dummy-data';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Message } from '@/lib/types';
import { useTranslation } from '@/lib/contexts/LanguageContext';

export default function AdminPage() {
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<string | undefined>(
    dummyCustomers[0]?.id
  );
  const [showCustomerList, setShowCustomerList] = React.useState(true);
  const [messages, setMessages] = React.useState<{ [key: string]: Message[] }>({});
  const t = useTranslation;

  const selectedCustomer = dummyCustomers.find(
    (customer) => customer.id === selectedCustomerId
  );

  const handleCustomerSelect = (customer: typeof dummyCustomers[0]) => {
    setSelectedCustomerId(customer.id);
    setShowCustomerList(false);
    // Initialize messages for this customer if not exists
    if (!messages[customer.id]) {
      setMessages(prev => ({
        ...prev,
        [customer.id]: customer.messages
      }));
    }
  };

  const handleBackToList = () => {
    setShowCustomerList(true);
  };

  const handleSendMessage = (message: string) => {
    if (!selectedCustomerId) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "employee",
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => ({
      ...prev,
      [selectedCustomerId]: [...(prev[selectedCustomerId] || []), newMessage]
    }));
  };

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      {/* Mobile View */}
      <div className="block lg:hidden h-[calc(100vh-4rem)] flex flex-col">
        <Tabs defaultValue="employees" className="flex-1 flex flex-col">
          <div className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
            <div className="px-4 py-3">
              <h1 className="text-2xl font-semibold tracking-tight">{t('Admin Dashboard')}</h1>
            </div>
            <div className="px-4 pb-2">
              <TabsList className="w-full bg-muted/50">
                <TabsTrigger value="employees" className="flex-1 text-sm">{t('Employees')}</TabsTrigger>
                <TabsTrigger value="customers" className="flex-1 text-sm">{t('Customers')}</TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="employees" className="flex-1 p-4 pt-2">
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <div className="space-y-4">
                {dummyEmployees.map((employee) => (
                  <EmployeeStats key={employee.id} employee={employee} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="customers" className="flex-1">
            {showCustomerList ? (
              <ScrollArea className="h-[calc(100vh-10rem)]">
                <div className="p-4 pt-2">
                  <CustomerList
                    customers={dummyCustomers}
                    selectedCustomerId={selectedCustomerId}
                    onSelectCustomer={handleCustomerSelect}
                  />
                </div>
              </ScrollArea>
            ) : selectedCustomer ? (
              <div className="flex flex-col h-full">
                <div className="border-b bg-background/95 backdrop-blur-sm p-4 flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-accent transition-colors"
                    onClick={handleBackToList}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <div>
                    <h2 className="font-medium">{selectedCustomer.name}</h2>
                    <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                  </div>
                </div>
                <Tabs defaultValue="chat" className="flex-1 flex flex-col">
                  <div className="border-b px-4 bg-background/95 backdrop-blur-sm">
                    <TabsList className="border-0 bg-transparent h-12 p-0">
                      <TabsTrigger 
                        value="chat" 
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none relative h-full rounded-none px-4 font-medium"
                      >
                        {t('Chat')}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 transition-transform data-[state=active]:scale-x-100" />
                      </TabsTrigger>
                      <TabsTrigger 
                        value="data" 
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none relative h-full rounded-none px-4 font-medium"
                      >
                        {t('Data')}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 transition-transform data-[state=active]:scale-x-100" />
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="chat" className="flex-1 p-0 mt-0 border-0">
                    <ChatInterface
                      messages={messages[selectedCustomer.id] || selectedCustomer.messages}
                      onSendMessage={handleSendMessage}
                      viewType="employee"
                    />
                  </TabsContent>
                  <TabsContent value="data" className="flex-1 mt-0 border-0">
                    <ScrollArea className="h-[calc(100vh-15rem)]">
                      <div className="p-4 space-y-6">
                        <Card className="overflow-hidden border-none shadow-sm">
                          <div className="p-6">
                            <h3 className="text-lg font-medium tracking-tight mb-4">{t('Sugar Level Readings')}</h3>
                            <SugarLevelChart readings={selectedCustomer.sugarLevels} />
                          </div>
                        </Card>
                        <Card className="overflow-hidden border-none shadow-sm">
                          <div className="p-6">
                            <h3 className="text-lg font-medium tracking-tight mb-4">{t('Daily Timeline')}</h3>
                            <TimelineView entries={selectedCustomer.timeline} />
                          </div>
                        </Card>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>
            ) : null}
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block h-[calc(100vh-4rem)] overflow-hidden">
        <div className="h-full max-w-[1600px] mx-auto px-6 py-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-8">{t('Admin Dashboard')}</h1>

          <div className="grid grid-cols-12 gap-6 h-[calc(100%-5rem)]">
            {/* Left Column: Employee Stats */}
            <div className="col-span-4 overflow-auto">
              <h2 className="text-xl font-medium tracking-tight mb-4">{t('Employee Performance')}</h2>
              <div className="space-y-4 pr-2">
                {dummyEmployees.map((employee) => (
                  <EmployeeStats key={employee.id} employee={employee} />
                ))}
              </div>
            </div>

            {/* Middle Column: Customer List */}
            <div className="col-span-3 overflow-auto border-x px-4">
              <h2 className="text-xl font-medium tracking-tight mb-4">{t('Customers')}</h2>
              <CustomerList
                customers={dummyCustomers}
                selectedCustomerId={selectedCustomerId}
                onSelectCustomer={(customer) => setSelectedCustomerId(customer.id)}
              />
            </div>

            {/* Right Column: Customer Details */}
            <div className="col-span-5 overflow-hidden">
              {selectedCustomer ? (
                <div className="h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-semibold">
                      {selectedCustomer.name[0].toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-medium tracking-tight">{selectedCustomer.name}</h2>
                      <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                    </div>
                  </div>
                  <Tabs defaultValue="chat" className="flex-1 flex flex-col">
                    <TabsList className="border-b w-full rounded-none h-12 p-0 bg-transparent">
                      <TabsTrigger 
                        value="chat" 
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none relative h-full rounded-none px-6 font-medium"
                      >
                        {t('Chat')}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 transition-transform data-[state=active]:scale-x-100" />
                      </TabsTrigger>
                      <TabsTrigger 
                        value="data" 
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none relative h-full rounded-none px-6 font-medium"
                      >
                        {t('Data')}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 transition-transform data-[state=active]:scale-x-100" />
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="chat" className="flex-1 mt-0 border-0">
                      <ChatInterface
                        messages={messages[selectedCustomer.id] || selectedCustomer.messages}
                        onSendMessage={handleSendMessage}
                        viewType="employee"
                      />
                    </TabsContent>
                    <TabsContent value="data" className="flex-1 mt-0 border-0">
                      <ScrollArea className="h-full">
                        <div className="space-y-6 pr-4">
                          <Card className="overflow-hidden border-none shadow-sm">
                            <div className="p-6">
                              <h3 className="text-lg font-medium tracking-tight mb-4">{t('Sugar Level Readings')}</h3>
                              <SugarLevelChart readings={selectedCustomer.sugarLevels} />
                            </div>
                          </Card>
                          <Card className="overflow-hidden border-none shadow-sm">
                            <div className="p-6">
                              <h3 className="text-lg font-medium tracking-tight mb-4">{t('Daily Timeline')}</h3>
                              <TimelineView entries={selectedCustomer.timeline} />
                            </div>
                          </Card>
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <p className="text-muted-foreground">
                      {t('Select a customer to view their details and chat history')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 