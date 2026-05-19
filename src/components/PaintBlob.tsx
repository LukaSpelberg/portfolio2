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
/*  splatter — central mass + 7 radiating arms (thin, tapered) + droplets.   */
/*  Built like real paint impact: arms flung outward, drops catch air.        */
/*  viewBox 0 0 340 340, center ≈ (165, 165)                                  */
/* ─────────────────────────────────────────────────────────────────────────── */
function Splatter() {
  return (
    <svg viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" aria-hidden>

      {/* Central irregular mass */}
      <path d="
        M 168,138
        C 180,124 198,120 210,132
        C 224,146 220,168 205,180
        C 194,188 178,190 164,183
        C 146,174 138,158 144,144
        C 148,134 160,148 168,138 Z
      " />

      {/* Arm 1 — upper-right, long */}
      <path d="
        M 208,134
        C 220,120 244,100 274,82
        C 280,78 284,82 280,88
        C 266,102 240,120 218,138
        C 212,142 206,140 208,134 Z
      " />

      {/* Arm 2 — right, medium */}
      <path d="
        M 220,162
        C 236,156 266,148 300,140
        C 308,138 310,144 306,150
        C 288,160 256,166 228,172
        C 220,174 214,168 220,162 Z
      " />

      {/* Arm 3 — lower-right, long drip */}
      <path d="
        M 204,182
        C 214,196 228,232 236,268
        C 238,276 232,280 226,274
        C 216,256 202,220 196,188
        C 194,180 200,176 204,182 Z
      " />

      {/* Arm 4 — downward, thin drip */}
      <path d="
        M 168,186
        C 166,202 162,234 164,264
        C 164,272 156,274 154,266
        C 152,246 156,212 158,188
        C 159,182 168,180 168,186 Z
      " />

      {/* Arm 5 — lower-left */}
      <path d="
        M 146,182
        C 136,196 112,222 88,250
        C 82,258 74,256 76,248
        C 88,228 114,204 136,182
        C 140,176 148,176 146,182 Z
      " />

      {/* Arm 6 — left, medium */}
      <path d="
        M 140,160
        C 124,154 92,146 58,136
        C 50,133 48,139 54,144
        C 70,156 104,162 132,168
        C 140,170 144,166 140,160 Z
      " />

      {/* Arm 7 — upper-left, short */}
      <path d="
        M 150,138
        C 138,124 118,100 96,78
        C 90,72 94,66 100,72
        C 118,90 138,114 154,136
        C 158,142 154,146 150,138 Z
      " />

      {/* Satellite droplets — scattered by the impact */}
      <circle cx="288" cy="196" r="8" />
      <circle cx="242" cy="284" r="6" />
      <circle cx="62"  cy="218" r="5" />
      <circle cx="270" cy="66"  r="9" />
      <circle cx="78"  cy="270" r="4" />
      <circle cx="316" cy="148" r="5" />
      <circle cx="158" cy="278" r="6" />
      <circle cx="38"  cy="155" r="4" />
      <circle cx="252" cy="108" r="4" />
      <circle cx="100" cy="58"  r="5" />

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
