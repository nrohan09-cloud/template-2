'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus, LineChart, Loader2, Upload } from 'lucide-react';
import { MealType } from '@/lib/types';
import { validateImages } from '@/lib/utils';
import { toast } from 'sonner';
import { useTranslation } from '@/lib/contexts/LanguageContext';

interface UploadEntryProps {
  onUpload: (mealType: MealType, files: FileList, type: 'food' | 'cgm') => Promise<void>;
}

export function UploadEntry({ onUpload }: UploadEntryProps) {
  const [selectedMealType, setSelectedMealType] = React.useState<MealType | ''>('');
  const [isUploading, setIsUploading] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<{ food?: FileList; cgm?: FileList }>({});
  const foodInputRef = React.useRef<HTMLInputElement>(null);
  const cgmInputRef = React.useRef<HTMLInputElement>(null);
  const t = useTranslation;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'food' | 'cgm') => {
    const files = e.target.files;
    if (!files || files.length === 0 || !selectedMealType) return;

    // Validate files
    const error = validateImages(files);
    if (error) {
      toast.error('Upload Error', {
        description: error,
      });
      return;
    }

    setSelectedFiles(prev => ({ ...prev, [type]: files }));
  };

  const handleUpload = async () => {
    if (!selectedMealType) {
      toast.error(t('Error'), { description: t('Please select a meal type') });
      return;
    }

    if (!selectedFiles.food && !selectedFiles.cgm) {
      toast.error(t('Error'), { description: t('Please select at least one file to upload') });
      return;
    }

    try {
      setIsUploading(true);

      // Upload food images if selected
      if (selectedFiles.food) {
        await onUpload(selectedMealType, selectedFiles.food, 'food');
      }

      // Upload CGM graph if selected
      if (selectedFiles.cgm) {
        await onUpload(selectedMealType, selectedFiles.cgm, 'cgm');
      }
      
      // Reset the form
      setSelectedMealType('');
      setSelectedFiles({});
      if (foodInputRef.current) {
        foodInputRef.current.value = '';
      }
      if (cgmInputRef.current) {
        cgmInputRef.current.value = '';
      }

      toast.success(t('Success'), {
        description: t('Files uploaded successfully'),
      });
    } catch (error) {
      toast.error(t('Upload Error'), {
        description: error instanceof Error ? error.message : t('Failed to upload files'),
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-3 sm:p-6">
        <div className="flex flex-col gap-3">
          <div className="w-full">
            <Select
              value={selectedMealType}
              onValueChange={(value) => setSelectedMealType(value as MealType)}
              disabled={isUploading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('Select meal type')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">{t('Breakfast')}</SelectItem>
                <SelectItem value="lunch">{t('Lunch')}</SelectItem>
                <SelectItem value="dinner">{t('Dinner')}</SelectItem>
                <SelectItem value="snack">{t('Snack')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Food Images Upload */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => foodInputRef.current?.click()}
                disabled={!selectedMealType || isUploading}
                className="w-full"
              >
                <ImagePlus className="h-4 w-4 mr-2" />
                {t('Choose Food Images')}
              </Button>
              {selectedFiles.food && (
                <span className="text-sm text-muted-foreground">
                  {selectedFiles.food.length} file(s)
                </span>
              )}
            </div>
            <input
              ref={foodInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic"
              multiple
              className="hidden"
              onChange={(e) => handleFileSelect(e, 'food')}
              disabled={!selectedMealType || isUploading}
            />
          </div>

          {/* CGM Graph Upload */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => cgmInputRef.current?.click()}
                disabled={!selectedMealType || isUploading}
                className="w-full"
              >
                <LineChart className="h-4 w-4 mr-2" />
                {t('Choose CGM Graph')}
              </Button>
              {selectedFiles.cgm && (
                <span className="text-sm text-muted-foreground">
                  1 file
                </span>
              )}
            </div>
            <input
              ref={cgmInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic"
              className="hidden"
              onChange={(e) => handleFileSelect(e, 'cgm')}
              disabled={!selectedMealType || isUploading}
            />
          </div>

          {/* Upload Button */}
          <Button 
            onClick={handleUpload}
            disabled={isUploading || !selectedMealType || (!selectedFiles.food && !selectedFiles.cgm)}
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t('Uploading...')}
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                {t('Upload Files')}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 