import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

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
        <nav className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold">Health Monitor</div>
              <div className="flex gap-6">
                <Link 
                  href="/customer"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Customer View
                </Link>
                <Link 
                  href="/employee"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Employee View
                </Link>
                <Link 
                  href="/admin"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Admin View
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
