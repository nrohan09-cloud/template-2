'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Users, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageSettings } from '@/components/settings/LanguageSettings';
import { useTranslation } from '@/lib/contexts/LanguageContext';

export function MainNav() {
  const pathname = usePathname();
  const t = useTranslation;

  const navItems = [
    {
      href: '/customer',
      label: 'Customer',
      icon: Heart,
    },
    {
      href: '/employee',
      label: 'Employee',
      icon: Users,
    },
    {
      href: '/admin',
      label: 'Admin',
      icon: ShieldCheck,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex h-14 items-center px-4 md:container">
        <div className="mr-auto">
          <Link href="/" className="flex items-center">
            <span className="text-base font-semibold tracking-tight">Alamirap</span>
          </Link>
        </div>
        <div className="flex items-center justify-end gap-1">
          <div className="flex items-center">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex flex-col items-center justify-center px-4 py-1 transition-colors hover:text-primary min-w-[72px] h-14",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <span className="relative z-10 flex flex-col items-center gap-1">
                    <Icon className="h-5 w-5" />
                    <span className="text-[11px] font-medium tracking-tight">{t(item.label)}</span>
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 z-0 scale-100 bg-accent/50"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
          <div className="ml-1">
            <LanguageSettings />
          </div>
        </div>
      </nav>
    </header>
  );
} 