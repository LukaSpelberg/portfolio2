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
            {/* Rough red paint disc — distressed via the site's #ink-rough filter */}
            <span className={styles.playDisc} />
            <svg className={styles.playTri} viewBox="0 0 22 26">
              <path d="M2 1.5 L21 13 L2 24.5 Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
