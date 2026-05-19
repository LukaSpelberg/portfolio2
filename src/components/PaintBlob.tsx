import styles from './PaintBlob.module.css';

export type PaintBlobVariant = 'slash' | 'field' | 'splatter' | 'stroke';

interface PaintBlobProps {
  variant?: PaintBlobVariant;
  color?: string;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  slash — wide, violent horizontal brushstroke.                             */
/*  Use behind large headlines. Let it bleed past edges.                      */
/*  viewBox 0 0 1200 190                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */
function Slash() {
  return (
    <svg viewBox="0 0 1200 190" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden>
      <path d="
        M 0,92
        C 50,68 130,55 240,63
        L 310,60
        C 400,54 490,50 600,58
        L 660,56
        C 760,50 860,48 980,56
        C 1060,61 1130,60 1200,70
        L 1200,75
        C 1198,92 1188,118 1155,132
        C 1120,146 1040,150 940,144
        L 870,140
        C 780,135 690,148 600,143
        L 540,140
        C 450,135 360,148 270,143
        C 185,138 100,136 20,127
        C 6,124 0,115 0,104
        Z
      " />
      {/* Small drip off bottom edge */}
      <path d="
        M 680,143
        C 684,158 688,178 680,190
        C 674,198 666,196 664,183
        C 662,170 668,155 680,143
        Z
      " />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  field — large, dominant paint region. Fills sections.                     */
/*  Not a shape, a FIELD. Can occupy 40–60% of a section.                    */
/*  viewBox 0 0 680 820                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */
function Field() {
  return (
    /*
     * Field bleeds off the left/top edges when positioned with negative offsets.
     * The organic right+bottom edge is what shows — keep those the rough ones.
     * preserveAspectRatio="none" lets it stretch to fill whatever container.
     */
    <svg viewBox="0 0 680 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden>
      <path d="
        M 0,0
        L 640,0
        C 665,0 682,18 680,58
        L 672,120
        C 668,165 692,215 685,278
        L 678,330
        C 671,382 692,438 682,500
        C 672,558 648,612 608,658
        L 578,692
        C 542,728 492,758 432,775
        L 368,788
        C 302,800 230,800 162,782
        C 96,764 42,730 12,682
        C -8,650 0,608 0,558
        Z
      " />
      {/* Rough drip off the right edge — violent */}
      <path d="
        M 678,265
        C 695,262 720,270 728,290
        C 736,310 718,328 698,325
        C 682,322 670,305 678,265
        Z
      " />
      {/* Drip off bottom-right */}
      <path d="
        M 435,785
        C 440,808 432,828 420,832
        C 408,836 400,822 405,805
        C 410,790 428,782 435,785
        Z
      " />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  splatter — asymmetric impact mass + uneven trails + gravity drip.         */
/*  Real splatters: paint flung in ONE dominant direction, ricochet opposite, */
/*  gravity drip down. NO evenly-spaced arms (that reads as a sun).           */
/*  viewBox 0 0 340 340                                                        */
/* ─────────────────────────────────────────────────────────────────────────── */
function Splatter() {
  return (
    <svg viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" aria-hidden>

      {/* Central impact mass — elongated, irregular, off-center */}
      <path d="
        M 142,152
        C 150,136 170,130 186,140
        C 202,150 208,170 198,184
        C 188,196 168,202 152,194
        C 134,186 126,170 130,158
        C 132,148 136,158 142,152 Z
      " />

      {/* Secondary blob — paint that bounced back on impact */}
      <path d="
        M 124,162
        C 120,150 130,144 138,148
        C 146,152 146,166 137,168
        C 128,170 122,170 124,162 Z
      " />

      {/* Trail 1 — upper-right, longest. The main fling direction. */}
      <path d="
        M 188,144
        C 212,122 252,98 292,72
        C 299,67 303,75 297,81
        C 264,104 222,126 204,148
        C 197,156 188,152 188,144 Z
      " />

      {/* Blob at tip of Trail 1 — paint mass that flew and landed */}
      <path d="
        M 290,66
        C 296,58 308,56 314,65
        C 319,74 311,84 302,82
        C 293,80 286,74 290,66 Z
      " />

      {/* Trail 2 — right, shorter, droops with gravity */}
      <path d="
        M 200,174
        C 226,168 268,164 304,174
        C 313,176 312,186 303,188
        C 268,180 228,184 210,188
        C 202,190 196,184 200,174 Z
      " />

      {/* Trail 3 — lower-left, ricochet. Opposite the main fling. */}
      <path d="
        M 138,180
        C 122,202 94,236 62,272
        C 55,281 46,278 51,271
        C 70,250 100,218 130,186
        C 135,178 141,174 138,180 Z
      " />

      {/* Drip — straight down from mass. Gravity. */}
      <path d="
        M 163,196
        C 161,218 157,256 159,286
        C 159,295 150,295 149,287
        C 147,264 152,228 154,202
        C 155,192 163,190 163,196 Z
      " />

      {/* Satellite droplets — clustered in fling direction (upper-right) */}
      <circle cx="298" cy="96"  r="5" />
      <circle cx="274" cy="54"  r="4" />
      <circle cx="316" cy="126" r="3" />
      <circle cx="320" cy="74"  r="7" />
      <circle cx="254" cy="66"  r="3" />
      <circle cx="55"  cy="282" r="4" />
      <circle cx="42"  cy="264" r="3" />
      <circle cx="168" cy="300" r="3" />
      <circle cx="88"  cy="288" r="2" />
      <circle cx="306" cy="50"  r="4" />

    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  stroke — thin diagonal brushstroke divider.                               */
/*  Replaces <hr>. Tapers at ends.                                            */
/*  viewBox 0 0 340 62                                                        */
/* ─────────────────────────────────────────────────────────────────────────── */
function Stroke() {
  return (
    <svg viewBox="0 0 340 62" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden>
      <path d="
        M 6,32
        C 30,20 82,14 155,21
        C 212,27 272,24 320,37
        C 332,41 336,50 326,57
        C 312,65 260,67 198,61
        C 135,55 78,58 25,50
        C 11,48 3,44 6,34
        Z
      " />
    </svg>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────── */

const variants: Record<PaintBlobVariant, () => React.ReactElement> = {
  slash:    Slash,
  field:    Field,
  splatter: Splatter,
  stroke:   Stroke,
};

export default function PaintBlob({
  variant = 'slash',
  color = 'var(--color-accent)',
  opacity = 1,
  className = '',
  style,
}: PaintBlobProps) {
  const Shape = variants[variant];
  return (
    <span
      className={`${styles.blob} ${className}`}
      style={{ '--blob-color': color, '--blob-opacity': opacity, ...style } as React.CSSProperties}
      aria-hidden
    >
      <Shape />
    </span>
  );
}
