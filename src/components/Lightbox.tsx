'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import styles from './Lightbox.module.css';

/**
 * Lightbox — mount once per page. Uses event delegation: any <img> (or element)
 * carrying the class `js-zoomable` becomes clickable and opens a fullscreen,
 * zoomable/pannable overlay. No need to convert individual images to components.
 *
 * Controls:
 *   - Click a zoomable image → open
 *   - Click image / scroll → zoom in/out (toggles 1× ↔ 2.5× on click, wheel = fine)
 *   - Drag → pan when zoomed
 *   - Esc or click backdrop → close
 */
export default function Lightbox() {
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState('');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const close = useCallback(() => {
    setSrc(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  /* ── Open on click of any .js-zoomable image (event delegation) ───────────── */
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement)?.closest('.js-zoomable') as HTMLImageElement | null;
      if (!el) return;
      const imageSrc = el.getAttribute('src') || el.dataset.src;
      if (!imageSrc) return;
      e.preventDefault();
      setSrc(imageSrc);
      setAlt(el.getAttribute('alt') || '');
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  /* ── Esc to close + lock body scroll while open ───────────────────────────── */
  useEffect(() => {
    if (!src) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [src, close]);

  if (!src) return null;

  /* ── Wheel zoom ───────────────────────────────────────────────────────────── */
  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    setZoom((z) => {
      const next = Math.min(5, Math.max(1, z - e.deltaY * 0.0015 * z));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }

  /* ── Click image: toggle zoom ─────────────────────────────────────────────── */
  function onImageClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (dragging.current) return;
    setZoom((z) => {
      if (z > 1) {
        setPan({ x: 0, y: 0 });
        return 1;
      }
      return 2.5;
    });
  }

  /* ── Drag to pan (only meaningful when zoomed) ────────────────────────────── */
  function onPointerDown(e: React.PointerEvent) {
    if (zoom <= 1) return;
    dragging.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!e.buttons || zoom <= 1) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragging.current = true;
    setPan({ x: dragStart.current.panX + dx, y: dragStart.current.panY + dy });
  }
  function onPointerUp() {
    // Reset the drag flag on the next tick so the click handler can read it
    setTimeout(() => { dragging.current = false; }, 0);
  }

  return (
    <div className={styles.backdrop} onClick={close} role="dialog" aria-modal="true" aria-label="Afbeelding vergroot">
      <button className={styles.closeBtn} onClick={close} aria-label="Sluiten">✕</button>

      <div className={styles.stage} onWheel={onWheel}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={styles.image}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            cursor: zoom > 1 ? 'grab' : 'zoom-in',
          }}
          onClick={onImageClick}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          draggable={false}
        />
      </div>

      <span className={styles.hint}>
        {zoom > 1 ? 'Sleep om te bewegen · klik om uit te zoomen' : 'Klik of scroll om in te zoomen · Esc om te sluiten'}
      </span>
    </div>
  );
}
