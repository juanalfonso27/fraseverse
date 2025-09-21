import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { Poppins, PT_Sans } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400','600','700'], display: 'swap' });
const ptSans = PT_Sans({ subsets: ['latin'], weight: ['400','700'], display: 'swap' });

export const metadata: Metadata = {
  title: 'FraseVerse',
  description: 'Frases inspiradoras y citas para compartir y reflexionar.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.className} ${ptSans.className}`} suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="bA8k5JYK2Vwaxc6G5_EyyyoOdwkVJaOnaD8vy2Pthes" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <AppHeader />
            <main className="flex-1 pb-20 md:pb-0">{children}</main>
            <AppFooter />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
