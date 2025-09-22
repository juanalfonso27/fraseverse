import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";

export const metadata: Metadata = {
  title: 'FraseVerse | Frases motivadoras e inspiradoras para reflexionar',
  description: 'Frases motivadoras, inspiradoras, de amor y de la vida. Descubre citas únicas para reflexionar, inspirarte y compartir cada día.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'FraseVerse | Frases motivadoras e inspiradoras para reflexionar',
    description: 'Frases motivadoras, inspiradoras, de amor y de la vida. Descubre citas únicas para reflexionar, inspirarte y compartir cada día.',
    url: 'https://fraseverse.vercel.app',
    siteName: 'FraseVerse',
    images: [
      {
        url: '/logo.png', // 👉 te conviene crear una imagen atractiva para compartir
        width: 1200,
        height: 630,
        alt: 'FraseVerse - Frases motivadoras e inspiradoras',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FraseVerse | Frases motivadoras e inspiradoras para reflexionar',
    description: 'Frases motivadoras, inspiradoras y de amor para reflexionar y compartir.',
    images: ['/og-image.png'],
  },
};
