import type { Metadata } from 'next';
import { Playfair_Display, Bebas_Neue, Syne, Space_Mono } from 'next/font/google';
import PaintBlob from '@/components/PaintBlob';
import './globals.css';

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
        {/*
         * SVG filter definitions — referenced via CSS filter: url('#id')
         * ink-rough: displaces text edges ±3px so they read like letterpress
         * print on rough canvas. Edges are ragged; fill stays solid/white.
         */}
        <svg aria-hidden style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', top: 0, left: 0 }}>
          <defs>
            <filter id="ink-rough" x="-5%" y="-10%" width="110%" height="120%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" seed="3" stitchTiles="stitch" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* Layered canvas background */}
        <div className="bg-canvas" aria-hidden />
        <div className="bg-stains" aria-hidden />

        {/*
         * bg-paint-marks: large SVG paint marks baked into the canvas.
         * These appear on every page, behind all content.
         * Low opacity — they're texture, not foreground elements.
         */}
        <div className="bg-paint-marks" aria-hidden>
          {/* Large red splatter — upper-left canvas mark */}
          <PaintBlob
            variant="splatter"
            color="var(--color-accent)"
            opacity={0.18}
            style={{
              position: 'absolute',
              width: '520px',
              height: '520px',
              top: '-100px',
              left: '-80px',
              transform: 'rotate(-30deg)',
            }}
          />
          {/* Teal field — right side, partial canvas stain */}
          <PaintBlob
            variant="field"
            color="var(--color-teal)"
            opacity={0.06}
            style={{
              position: 'absolute',
              width: '48%',
              height: '85%',
              right: '-60px',
              top: '-40px',
            }}
          />
          {/* Gold splatter — lower-right corner */}
          <PaintBlob
            variant="splatter"
            color="var(--color-gold)"
            opacity={0.14}
            style={{
              position: 'absolute',
              width: '380px',
              height: '380px',
              bottom: '-60px',
              right: '-40px',
              transform: 'rotate(18deg) scaleX(-1)',
            }}
          />
          {/* Red splatter — lower-left, offset from main one */}
          <PaintBlob
            variant="splatter"
            color="var(--color-accent)"
            opacity={0.10}
            style={{
              position: 'absolute',
              width: '280px',
              height: '280px',
              bottom: '20%',
              left: '5%',
              transform: 'rotate(45deg)',
            }}
          />
        </div>

        {children}
      </body>
    </html>
  );
}
