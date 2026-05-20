'use client';

/**
 * PageAnimations — GSAP wiring for the homepage.
 *
 * Uses @gsap/react's useGSAP hook which is React Strict Mode safe —
 * it handles the double-invocation in development without the flash/restart
 * bug that plain useEffect causes.
 *
 * Key rules to avoid opacity bugs:
 *  1. Ghost text: NEVER animate opacity — CSS owns it (0.04/0.05).
 *     We only animate scale.
 *  2. PaintMark opacity: React sets it via inline style. Use separate
 *     js- classes and animate to the exact component opacity value.
 *  3. Scroll reveals: gsap.set to hide first, gsap.to on trigger.
 *     Never gsap.from for scroll (causes visible flash before trigger).
 */

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PageAnimations() {
  useGSAP(() => {

    /* ─────────────────────────────── INITIAL STATES ───────────────────── */

    // Ghost text — scale only. Opacity is owned by CSS (0.04/0.05). NEVER set it.
    gsap.set('.js-ghost', { scale: 0.9, transformOrigin: 'center center' });

    // Hero paint — field fades in (preserves organic blob edges), marks burst in
    gsap.set('.js-hero-field',     { opacity: 0 });
    gsap.set('.js-hero-mark-red',  { opacity: 0 });
    gsap.set('.js-hero-mark-gold', { opacity: 0 });

    // Hero text
    gsap.set('.js-name-line', { y: 100, opacity: 0 });
    gsap.set('.js-subblock',  { x: -52, opacity: 0 });
    gsap.set('.js-hero-copy', { y: 24,  opacity: 0 });

    // Scroll sections — hidden until their trigger fires
    gsap.set('.js-projects-header > *', { y: 40,  opacity: 0 });
    gsap.set('.js-project-card',        { y: 110, opacity: 0 });
    gsap.set('.js-about-text > *',      { x: -56, opacity: 0 });
    gsap.set('.js-about-photo',         { scale: 0.9, opacity: 0, transformOrigin: 'top left' });

    /* ─────────────────────────────── HERO TIMELINE ────────────────────── */
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // 1 — Ghost text: scale up. Opacity stays at its CSS value.
    tl.to('.js-ghost', {
      scale: 1,
      duration: 1.0,
      stagger: 0.16,
      ease: 'power2.out',
    }, 0);

    // 2 — Red field fades in — organic blob edges preserved throughout
    tl.to('.js-hero-field', {
      opacity: 1,
      duration: 0.85,
      ease: 'power2.inOut',
    }, 0.1);

    // 3 — Paint marks burst in at their exact component opacity values
    tl.to('.js-hero-mark-red', {
      opacity: 0.68,
      duration: 0.55,
      ease: 'power3.out',
    }, 0.38);

    tl.to('.js-hero-mark-gold', {
      opacity: 0.48,
      duration: 0.55,
      ease: 'power3.out',
    }, 0.5);

    // 4 — LUKA / SPELBERG slam up — the headline moment
    tl.to('.js-name-line', {
      y: 0,
      opacity: 1,
      duration: 0.75,
      stagger: 0.22,
      ease: 'power4.out',
    }, 0.52);

    // 5 — "Digital Designer" drives in from left
    tl.to('.js-subblock', {
      x: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
    }, 0.88);

    // 6 — Body intro + meta stagger in
    tl.to('.js-hero-copy', {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.13,
      ease: 'power3.out',
    }, 1.04);

    /* ─────────────────────────────── PROJECTS SECTION ─────────────────── */

    gsap.to('.js-projects-header > *', {
      scrollTrigger: {
        trigger: '.js-projects-section',
        start: 'top 88%',
        once: true,
      },
      y: 0,
      opacity: 1,
      duration: 0.55,
      stagger: 0.14,
      ease: 'power3.out',
    });

    gsap.to('.js-project-card', {
      scrollTrigger: {
        trigger: '.js-projects-section',
        start: 'top 80%',
        once: true,
      },
      y: 0,
      opacity: 1,
      duration: 0.75,
      stagger: 0.18,
      ease: 'power4.out',
    });

    /* ─────────────────────────────── ABOUT SECTION ─────────────────────── */

    gsap.to('.js-about-text > *', {
      scrollTrigger: {
        trigger: '.js-about-section',
        start: 'top 86%',
        once: true,
      },
      x: 0,
      opacity: 1,
      duration: 0.62,
      stagger: 0.12,
      ease: 'power3.out',
    });

    gsap.to('.js-about-photo', {
      scrollTrigger: {
        trigger: '.js-about-section',
        start: 'top 86%',
        once: true,
      },
      scale: 1,
      opacity: 1,
      duration: 0.68,
      stagger: 0.2,
      ease: 'power3.out',
    });

  }, []);

  return null;
}
