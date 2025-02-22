'use client';

import React, { useState } from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { TimelineView } from '@/components/timeline/TimelineView';
import { UploadEntry } from '@/components/timeline/UploadEntry';
import { dummyCustomers } from '@/lib/dummy-data';
import { MealType, TimelineEntry, Message } from '@/lib/types';
import { generateTimelineId, sortTimelineEntries } from '@/lib/utils';
import { Toaster } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from '@/lib/contexts/LanguageContext';

export default function CustomerPage() {
  // For demo, we'll use the first customer
  const customer = dummyCustomers[0];
  const [messages, setMessages] = useState<Message[]>(customer.messages);
  const [timelineEntries, setTimelineEntries] = useState<TimelineEntry[]>(() => 
    sortTimelineEntries(customer.timeline)
  );
  const t = useTranslation;

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "customer",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // Function to cleanup URLs that are no longer needed
  const cleanupUrls = (urls: string[]) => {
    urls.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
  };

  const handleUpload = async (mealType: MealType, files: FileList, type: 'food' | 'cgm') => {
    const timestamp = new Date().toISOString();
    const today = timestamp.split('T')[0];
    
    if (type === 'food') {
      // Create object URLs for the uploaded food images
      const foodUrls = Array.from(files).map(file => URL.createObjectURL(file));

      // Find existing entry for today's meal type
      const existingEntry = timelineEntries.find(entry => 
        entry.mealType === mealType && 
        entry.date === today
      );

      if (existingEntry) {
        // Update existing entry with new food images
        setTimelineEntries(prevEntries => {
          const entries = [...prevEntries];
          const index = entries.findIndex(e => e.id === existingEntry.id);
          if (index !== -1) {
            // Store old URLs for cleanup after state update
            const oldUrls = [...existingEntry.foodImages];
            
            entries[index] = {
              ...existingEntry,
              foodImages: foodUrls,
              timestamp,
            };

            // Cleanup old URLs after ensuring new ones are set
            setTimeout(() => cleanupUrls(oldUrls), 1000);
          }
          return sortTimelineEntries(entries);
        });
      } else {
        // Create new entry
        const newEntry: TimelineEntry = {
          id: generateTimelineId(),
          date: today,
          mealType,
          foodImages: foodUrls,
          cgmGraphImage: '',
          sugarLevel: Math.floor(Math.random() * (180 - 70) + 70),
          timestamp,
        };

        setTimelineEntries(prevEntries => 
          sortTimelineEntries([newEntry, ...prevEntries])
        );
      }
    } else {
      // Create object URL for the CGM graph
      const cgmUrl = URL.createObjectURL(files[0]);

      setTimelineEntries(prevEntries => {
        const entries = [...prevEntries];
        const latestEntry = entries.find(entry => 
          entry.mealType === mealType && 
          entry.date === today
        );

        if (latestEntry) {
          // Store old URL for cleanup after state update
          const oldUrl = latestEntry.cgmGraphImage;
          
          // Update existing entry
          latestEntry.cgmGraphImage = cgmUrl;
          latestEntry.sugarLevel = Math.floor(Math.random() * (180 - 70) + 70);
          latestEntry.timestamp = timestamp;

          // Cleanup old URL after ensuring new one is set
          if (oldUrl) {
            setTimeout(() => cleanupUrls([oldUrl]), 1000);
          }
        } else {
          // Create new entry if none exists for today
          entries.unshift({
            id: generateTimelineId(),
            date: today,
            mealType,
            foodImages: [],
            cgmGraphImage: cgmUrl,
            sugarLevel: Math.floor(Math.random() * (180 - 70) + 70),
            timestamp,
          });
        }

        return sortTimelineEntries(entries);
      });
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  // Cleanup object URLs when component unmounts
  React.useEffect(() => {
    return () => {
      timelineEntries.forEach(entry => {
        const urlsToCleanup = [
          ...entry.foodImages,
          entry.cgmGraphImage
        ].filter(Boolean);
        cleanupUrls(urlsToCleanup);
      });
    };
  }, []);

  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Mobile View: Tabs */}
      <div className="block lg:hidden h-[calc(100vh-4rem)]">
        <Tabs defaultValue="chat" className="h-full flex flex-col">
          <TabsList className="mx-4 mt-4">
            <TabsTrigger value="chat" className="flex-1">{t('Chat')}</TabsTrigger>
            <TabsTrigger value="timeline" className="flex-1">{t('Timeline')}</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="flex-1 p-4 pt-2">
            <div className="h-full">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                viewType="customer"
              />
            </div>
          </TabsContent>
          <TabsContent value="timeline" className="flex-1 p-4 pt-2">
            <div className="space-y-3">
              <UploadEntry onUpload={handleUpload} />
              <TimelineView entries={timelineEntries} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop View: Side by Side */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-6 h-[calc(100vh-4rem)]">
        <div className="col-span-1 p-6">
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            viewType="customer"
          />
        </div>
        <div className="col-span-1 p-6 space-y-4 overflow-auto">
          <UploadEntry onUpload={handleUpload} />
          <TimelineView entries={timelineEntries} />
        </div>
      </div>
      <Toaster position="bottom-right" />
    </main>
  );
} 