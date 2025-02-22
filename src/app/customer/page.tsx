'use client';

import React from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { TimelineView } from '@/components/timeline/TimelineView';
import { dummyCustomers } from '@/lib/dummy-data';

export default function CustomerPage() {
  // For demo, we'll use the first customer
  const customer = dummyCustomers[0];
  const [messages, setMessages] = React.useState(customer.messages);

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: String(messages.length + 1),
      content: message,
      sender: 'customer' as const,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Welcome, {customer.name}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chat Interface */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Chat with Your Advisor</h2>
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Daily Timeline</h2>
          <TimelineView entries={customer.timeline} />
        </div>
      </div>
    </div>
  );
} 