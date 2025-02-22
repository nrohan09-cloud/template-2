'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from 'next/image';
import { TimelineEntry } from '@/lib/types';

interface TimelineViewProps {
  entries: TimelineEntry[];
}

export function TimelineView({ entries }: TimelineViewProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Daily Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-8">
            {entries.map((entry) => (
              <div key={entry.id} className="relative">
                {/* Time indicator */}
                <div className="absolute left-0 w-16 text-sm text-muted-foreground">
                  {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                
                {/* Content */}
                <div className="ml-20 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{entry.mealType.charAt(0).toUpperCase() + entry.mealType.slice(1)}</span>
                    <span className="text-sm text-muted-foreground">
                      Sugar Level: {entry.sugarLevel} mg/dL
                    </span>
                  </div>
                  
                  {/* Food Images */}
                  {entry.foodImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {entry.foodImages.map((image, index) => (
                        <div key={index} className="relative aspect-square overflow-hidden rounded-md">
                          <Image
                            src={image}
                            alt={`Food image ${index + 1}`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* CGM Graph */}
                  <div className="relative aspect-[16/9] overflow-hidden rounded-md">
                    <Image
                      src={entry.cgmGraphImage}
                      alt="CGM Graph"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 