'use client';

import React from 'react';
import { CustomerList } from '@/components/customer/CustomerList';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { TimelineView } from '@/components/timeline/TimelineView';
import { SugarLevelChart } from '@/components/sugar-levels/SugarLevelChart';
import { dummyCustomers } from '@/lib/dummy-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from '@/lib/contexts/LanguageContext';

export default function EmployeePage() {
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<string | undefined>();
  const [showCustomerList, setShowCustomerList] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const t = useTranslation;

  const selectedCustomer = dummyCustomers.find(
    (customer) => customer.id === selectedCustomerId
  );

  const handleCustomerSelect = (customer: typeof dummyCustomers[0]) => {
    setSelectedCustomerId(customer.id);
    // Add a small delay before hiding the list for a smoother transition
    setTimeout(() => setShowCustomerList(false), 50);
  };

  const handleBackToList = () => {
    setShowCustomerList(true);
  };

  const filteredCustomers = React.useMemo(() => {
    if (!searchQuery.trim()) return dummyCustomers;
    const query = searchQuery.toLowerCase();
    return dummyCustomers.filter(customer => 
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      {/* Mobile View */}
      <div className="block lg:hidden">
        <div className="flex flex-col h-[calc(100vh-4rem)]">
          {showCustomerList ? (
            <>
              {/* Customer List View */}
              <div className="border-b">
                <div className="px-4 py-3">
                  <h1 className="text-xl font-semibold">{t('Employee Dashboard')}</h1>
                </div>
                <div className="px-4 pb-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t('Search customers...')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
              <ScrollArea className="flex-1">
                <CustomerList
                  customers={filteredCustomers}
                  selectedCustomerId={selectedCustomerId}
                  onSelectCustomer={handleCustomerSelect}
                />
              </ScrollArea>
            </>
          ) : selectedCustomer ? (
            <Tabs defaultValue="chat" className="flex-1 flex flex-col">
              {/* Customer Detail View */}
              <div className="border-b bg-background sticky top-0 z-10">
                <div className="px-4 py-2 flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 transition-transform hover:scale-110 active:scale-95"
                    onClick={handleBackToList}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {selectedCustomer.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{selectedCustomer.name}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {selectedCustomer.email}
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-2">
                  <TabsList className="w-full">
                    <TabsTrigger value="chat" className="flex-1">{t('Chat')}</TabsTrigger>
                    <TabsTrigger value="data" className="flex-1">{t('Data')}</TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="chat" className="h-full">
                  <ChatInterface
                    messages={selectedCustomer.messages}
                    onSendMessage={(message) => {
                      console.log('Sending message:', message);
                    }}
                    viewType="employee"
                  />
                </TabsContent>

                <TabsContent value="data" className="h-full">
                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-4">
                      <Card className="shadow-sm">
                        <div className="p-4">
                          <h2 className="text-lg font-semibold mb-3">{t('Sugar Level Readings')}</h2>
                          <SugarLevelChart readings={selectedCustomer.sugarLevels} />
                        </div>
                      </Card>
                      <Card className="shadow-sm">
                        <div className="p-4">
                          <h2 className="text-lg font-semibold mb-3">{t('Daily Timeline')}</h2>
                          <TimelineView entries={selectedCustomer.timeline} />
                        </div>
                      </Card>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              {t('Select a customer to view their details')}
            </div>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex h-[calc(100vh-4rem)]">
        {/* Customer List - Fixed Width */}
        <div className="w-[380px] border-r flex flex-col">
          <div className="px-6 py-4 border-b">
            <h1 className="text-xl font-semibold mb-4">{t('Employee Dashboard')}</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('Search customers...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <CustomerList
              customers={filteredCustomers}
              selectedCustomerId={selectedCustomerId}
              onSelectCustomer={(customer) => setSelectedCustomerId(customer.id)}
            />
          </ScrollArea>
        </div>

        {/* Main Content Area - Flexible Width */}
        <div className="flex-1 flex flex-col">
          {selectedCustomer ? (
            <Tabs defaultValue="chat" className="flex-1 flex flex-col">
              <div className="border-b px-6 py-4 bg-background sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {selectedCustomer.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-lg">{selectedCustomer.name}</h2>
                    <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                  </div>
                </div>
                <TabsList className="mt-4">
                  <TabsTrigger value="chat">{t('Chat')}</TabsTrigger>
                  <TabsTrigger value="data">{t('Data')}</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="chat" className="h-full">
                  <ChatInterface
                    messages={selectedCustomer.messages}
                    onSendMessage={(message) => {
                      console.log('Sending message:', message);
                    }}
                    viewType="employee"
                  />
                </TabsContent>

                <TabsContent value="data" className="h-full">
                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-4">
                      <Card className="shadow-sm">
                        <div className="p-4">
                          <h2 className="text-lg font-semibold mb-3">{t('Sugar Level Readings')}</h2>
                          <SugarLevelChart readings={selectedCustomer.sugarLevels} />
                        </div>
                      </Card>
                      <Card className="shadow-sm">
                        <div className="p-4">
                          <h2 className="text-lg font-semibold mb-3">{t('Daily Timeline')}</h2>
                          <TimelineView entries={selectedCustomer.timeline} />
                        </div>
                      </Card>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              {t('Select a customer to view their details')}
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 