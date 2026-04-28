// src/app/layout.tsx
import type { Metadata } from 'next';
import { Syne, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['700', '800'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '600'],
});

export const metadata: Metadata = {
  title: 'SatoshiQuest Zambia — Learn Bitcoin, Earn Sats',
  description:
    'Gamified Bitcoin education for Zambians. Learn about Bitcoin and Lightning in English and Bemba. Earn satoshis as you level up.',
  manifest: '/manifest.json',
  themeColor: '#0A0A0F',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-surface-900 text-white font-body antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
