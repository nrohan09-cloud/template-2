'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from 'lucide-react';
import { useLanguage, useTranslation } from '@/lib/contexts/LanguageContext';

export function LanguageSettings() {
  const { language, setLanguage } = useLanguage();
  const t = useTranslation;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Languages className="h-4 w-4" />
          <span className="sr-only">{t('Language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setLanguage('english')}
          className={language === 'english' ? 'bg-muted' : ''}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('kannada')}
          className={language === 'kannada' ? 'bg-muted' : ''}
        >
          ಕನ್ನಡ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 