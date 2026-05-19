import type { Metadata } from 'next';
import { Playfair_Display, Bebas_Neue, Syne, Space_Mono } from 'next/font/google';
import './globals.css';

/*
 * Primary display: Playfair Display Black — high contrast serif, poster quality.
 * Accent / labels: Bebas Neue — condensed all-caps sans, clash with the serif.
 * Body: Syne — idiosyncratic but readable.
 * Meta: Space Mono — raw, technical.
 */
const playfairDisplay = Playfair_Display({
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const syne = Syne({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Luka Spelberg — Digital Designer',
  description: 'Portfolio van Luka Spelberg, digital designer.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="nl"
      className={`${playfairDisplay.variable} ${bebasNeue.variable} ${syne.variable} ${spaceMono.variable}`}
    >
      <body>
        {/* Layered canvas background system */}
        <div className="bg-canvas" aria-hidden />
        <div className="bg-stains" aria-hidden />
        {children}
      </body>
    </html>
  );
}
