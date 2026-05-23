import styles from './PaintMark.module.css';

interface PaintMarkProps {
  /** Path to image in /public, e.g. "/splatters/splatter1HugeBlob.webp" */
  src: string;
  /** CSS color value — the paint color that will be rendered */
  color: string;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * PaintMark — renders a real paint-splatter photo as a solid color shape.
 *
 * Pipeline:
 *   1. SVG <image> loads the photo normally (no feImage security restriction)
 *   2. feColorMatrix inverts its RGB: black paint → white, white bg → black
 *   3. Inverted image is used as a <mask> — SVG masks use luminance:
 *        white (lum=1) = shows masked content
 *        black (lum=0) = hides masked content
 *   4. A plain <rect fill={color}> is masked → paint areas show color, bg is transparent
 */
export default function PaintMark({
  src,
  color,
  opacity = 1,
  className = '',
  style,
}: PaintMarkProps) {
  // Derive IDs from the src path — stable across all render types (SSR, RSC,
  // client-side navigation) and guaranteed unique as long as each PaintMark
  // instance visible simultaneously uses a different image file.
  // useId() was replaced because its counter resets between the layout and page
  // RSC payloads in Next.js App Router, causing filter/mask ID collisions that
  // make PaintMarks steal each other's masks and show the wrong image on nav.
  const uid      = src.replace(/[^a-zA-Z0-9]/g, '');
  const maskId   = `pm-mask-${uid}`;
  const filterId = `pm-filter-${uid}`;

  return (
    <svg
      className={`${styles.base} ${className}`}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      preserveAspectRatio="none"
      style={{ ...style, opacity }}
    >
      <defs>
        {/*
         * Inversion filter — only processes pixel data, no external resources.
         * Black → white, white → black.
         * Applied to <image> via the filter="url()" attribute below.
         */}
        <filter
          id={filterId}
          x="0%" y="0%"
          width="100%" height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feColorMatrix
            type="matrix"
            values="-1  0  0  0  1
                     0 -1  0  0  1
                     0  0 -1  0  1
                     0  0  0  1  0"
          />
        </filter>

        {/*
         * SVG <image> inside <mask>:
         * — <image> loads same-origin photos the same way as <img>, no security block
         * — filter attribute inverts it: paint=white, bg=black
         * — SVG masks use luminance → white areas let the masked <rect> through
         */}
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="0" y="0"
          width="200" height="200"
        >
          <image
            href={src}
            x="0" y="0"
            width="200" height="200"
            preserveAspectRatio="none"
            filter={`url(#${filterId})`}
          />
        </mask>
      </defs>

      {/* This rect fills with the chosen color, masked to the paint silhouette */}
      <rect
        x="0" y="0"
        width="200" height="200"
        fill={color}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
