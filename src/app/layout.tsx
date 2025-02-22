import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/contexts/LanguageContext';
import { MainNav } from '@/components/navigation/MainNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Health Monitoring POC',
  description: 'A proof of concept for health monitoring application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <MainNav />
          <main>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
