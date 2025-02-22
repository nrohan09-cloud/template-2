'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from 'next/image';
import { TimelineEntry } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { ImageIcon, LineChart } from 'lucide-react';
import { useTranslation } from '@/lib/contexts/LanguageContext';

interface TimelineViewProps {
  entries: TimelineEntry[];
}

export function TimelineView({ entries }: TimelineViewProps) {
  const [failedImages, setFailedImages] = React.useState<string[]>([]);
  const t = useTranslation;

  const handleImageError = (url: string) => {
    setFailedImages(prev => prev.includes(url) ? prev : [...prev, url]);
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="p-3 sm:p-6">
        <CardTitle>{t('Daily Timeline')}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-20rem)] lg:h-[600px]">
          <div className="space-y-4 p-3 sm:p-6">
            {entries.map((entry) => (
              <div key={entry.id} className="relative">
                {/* Time and Meal Info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    {formatDate(entry.timestamp)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{t(entry.mealType.charAt(0).toUpperCase() + entry.mealType.slice(1))}</span>
                    <span className="text-xs text-muted-foreground">
                      {t('Sugar Level')}: {entry.sugarLevel} mg/dL
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  {/* Food Images */}
                  {entry.foodImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {entry.foodImages.map((image, index) => (
                        <div key={index} className="relative aspect-square overflow-hidden rounded-md bg-muted/30">
                          <Image
                            src={image}
                            alt={`Food image ${index + 1}`}
                            fill
                            className="object-cover"
                            unoptimized={image.startsWith('blob:')}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            onError={() => handleImageError(image)}
                          />
                          {failedImages.includes(image) && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* CGM Graph */}
                  {entry.cgmGraphImage && (
                    <div className="relative aspect-video overflow-hidden rounded-md bg-muted/30">
                      <Image
                        src={entry.cgmGraphImage}
                        alt="CGM Graph"
                        fill
                        className="object-contain"
                        unoptimized={entry.cgmGraphImage.startsWith('blob:')}
                        sizes="100vw"
                        onError={() => handleImageError(entry.cgmGraphImage)}
                      />
                      {failedImages.includes(entry.cgmGraphImage) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <LineChart className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 