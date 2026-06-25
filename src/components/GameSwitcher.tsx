'use client';

import { useState, useRef, type ReactNode } from 'react';
import styles from './GameSwitcher.module.css';

interface Variant {
  id: string;
  label: string;
  thumb?: string;
  tag?: string;
  content: ReactNode;   // server-rendered sections for this variant
}

/**
 * GameSwitcher — a "select your game" card picker. Two thumbnail cards make it
 * an obvious, deliberate choice; clicking one crossfades to that game's
 * sections. Content nodes are server-rendered and passed in as props.
 */
export default function GameSwitcher({
  label,
  variants,
}: {
  label?: string;
  variants: Variant[];
}) {
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const next = (active + 1) % variants.length;

  function goToNext() {
    // Native smooth scroll is unreliable here (GSAP ScrollTrigger blocks it),
    // so animate the scroll manually with rAF. Scroll up to the selector
    // first, then swap the content as we arrive — no jarring "flash".
    const el = wrapRef.current;
    const duration = 460;

    if (el) {
      const startY = window.scrollY;
      const targetY = startY + el.getBoundingClientRect().top - 90; // clear fixed nav
      const start = performance.now();
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        window.scrollTo(0, startY + (targetY - startY) * easeOutCubic(t));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }

    // Swap just as the scroll settles so the new game fades in on arrival.
    window.setTimeout(() => setActive(next), duration - 40);
  }

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.header}>
        <span className={styles.headerLine} aria-hidden />
        <span className={styles.label}>{label ?? 'Kies een game'}</span>
        <span className={styles.headerLine} aria-hidden />
      </div>

      <div className={styles.cards} role="tablist" aria-label={label}>
        {variants.map((v, i) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`${styles.card} ${i === active ? styles.cardActive : ''}`}
            onClick={() => setActive(i)}
          >
            {v.thumb && (
              <span
                className={styles.cardThumb}
                style={{ backgroundImage: `url(${v.thumb})` }}
                aria-hidden
              />
            )}
            <span className={styles.cardBar}>
              <span className={styles.cardNum}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.cardText}>
                <span className={styles.cardName}>{v.label}</span>
                {v.tag && <span className={styles.cardTag}>{v.tag}</span>}
              </span>
              <span className={styles.cardState} aria-hidden>
                {i === active ? 'Geselecteerd' : 'Bekijk'}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* All panels stay mounted (images preloaded) — we only toggle which is
          visible. This avoids the remount that reloaded images and flashed. */}
      <div className={styles.panels}>
        {variants.map((v, i) => (
          <div
            key={v.id}
            className={`${styles.panel} ${i === active ? styles.panelActive : styles.panelHidden}`}
            aria-hidden={i !== active}
          >
            {v.content}
          </div>
        ))}
      </div>

      {/* Hand-off — jump straight to the next game without scrolling back up */}
      {variants.length > 1 && (
        <button type="button" className={styles.nextBtn} onClick={goToNext}>
          {variants[next].thumb && (
            <span
              className={styles.nextThumb}
              style={{ backgroundImage: `url(${variants[next].thumb})` }}
              aria-hidden
            />
          )}
          <span className={styles.nextScrim} aria-hidden />
          <span className={styles.nextInner}>
            <span className={styles.nextLabel}>Volgende game</span>
            <span className={styles.nextName}>{variants[next].label}</span>
          </span>
          <span className={styles.nextArrow} aria-hidden>
            <svg viewBox="0 0 44 16" width="44" height="16" fill="none">
              <path
                d="M2 8 H40 M33 2 L40 8 L33 14"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
