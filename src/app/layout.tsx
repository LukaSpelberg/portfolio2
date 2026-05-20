import type { Metadata } from 'next';
import { Playfair_Display, Bebas_Neue, Courier_Prime } from 'next/font/google';
import PaintMark from '@/components/PaintMark';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
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


const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-courier',
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
      className={`${playfairDisplay.variable} ${bebasNeue.variable} ${courierPrime.variable}`}
    >
      <head>
        {/* Cambria via Adobe Fonts — used as body/UI text */}
        <link rel="stylesheet" href="https://use.typekit.net/bjz0cor.css" />
      </head>
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
         * bg-paint-marks: real paint-photo marks baked into the canvas.
         * These appear on every page, behind all content.
         * Low opacity — they're canvas-level texture, not foreground elements.
         *
         * Controlled chaos composition:
         * - Upper-left: dominant red deco blob — the main canvas "accident"
         * - Right side: teal field, atmospheric, very low opacity
         * - Lower-right: gold deco, anchors the corner
         * - Mid-left: secondary red, lower opacity, off the main blob
         */}
        <div className="bg-paint-marks" aria-hidden>
          {/* Dominant red deco blob — upper-left, large, bleeds off edge */}
          <PaintMark
            src="/splatters/PaintDecoBlob.webp"
            color="var(--color-accent)"
            opacity={0.12}
            style={{
              position: 'absolute',
              width: '540px',
              height: '540px',
              top: '-120px',
              left: '-100px',
              transform: 'rotate(-28deg)',
            }}
          />
          {/* Gold deco — lower-right corner, loose rotation */}
          <PaintMark
            src="/splatters/splatter4DecoBackground.webp"
            color="var(--color-gold)"
            opacity={0.09}
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              bottom: '-80px',
              right: '-60px',
              transform: 'rotate(22deg) scaleX(-1)',
            }}
          />
          {/* Secondary red deco — lower-left, offset from dominant blob */}
          <PaintMark
            src="/splatters/splatter3DecoBackground.webp"
            color="var(--color-accent)"
            opacity={0.07}
            style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              bottom: '18%',
              left: '4%',
              transform: 'rotate(40deg)',
            }}
          />
        </div>

        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
