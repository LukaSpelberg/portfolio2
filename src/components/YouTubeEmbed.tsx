'use client';

import { useState } from 'react';
import styles from './YouTubeEmbed.module.css';

/** Sentinel id — render a friendly placeholder instead of a broken iframe. */
export const PLACEHOLDER_VIDEO = 'PLACEHOLDER';

interface YouTubeEmbedProps {
  /** The YouTube video id, e.g. "lbi_bW-RJkM" (NOT the full URL).
   *  Use PLACEHOLDER_VIDEO to show the "add your video" placeholder. */
  youtubeId: string;
  /** Accessible title for the iframe. */
  title?: string;
}

/** Extract a video id from any common YouTube URL form, or pass an id through. */
export function youtubeIdFromUrl(input: string): string {
  // Already looks like a bare id (no slashes/dots)
  if (!/[/.]/.test(input)) return input;
  const patterns = [
    /[?&]v=([^&]+)/,            // watch?v=ID
    /youtu\.be\/([^?&/]+)/,     // youtu.be/ID
    /embed\/([^?&/]+)/,         // embed/ID
    /shorts\/([^?&/]+)/,        // shorts/ID
  ];
  for (const re of patterns) {
    const m = input.match(re);
    if (m) return m[1];
  }
  return input;
}

/**
 * YouTubeEmbed — responsive 16:9 privacy-enhanced YouTube embed.
 *
 * Uses youtube-nocookie.com and a click-to-load thumbnail so the heavy
 * YouTube iframe + tracking only loads once the user actually wants to play.
 */
export default function YouTubeEmbed({ youtubeId, title = 'Video' }: YouTubeEmbedProps) {
  const [active, setActive] = useState(false);
  const id = youtubeIdFromUrl(youtubeId);

  if (id === PLACEHOLDER_VIDEO) {
    return (
      <div className={`${styles.frame} ${styles.placeholder}`}>
        <span className={styles.placeholderLabel}>YouTube embed</span>
        <span className={styles.placeholderHint}>Voeg hier je video-link toe</span>
      </div>
    );
  }

  return (
    <div className={styles.frame}>
      {active ? (
        <iframe
          className={styles.iframe}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className={styles.poster}
          onClick={() => setActive(true)}
          aria-label={`Speel video af: ${title}`}
          style={{
            backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`,
          }}
        >
          <span className={styles.playButton} aria-hidden>
            <svg viewBox="0 0 68 48" width="68" height="48">
              <path
                className={styles.playBg}
                d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
              />
              <path d="M 45,24 27,14 27,34" fill="#fff" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
