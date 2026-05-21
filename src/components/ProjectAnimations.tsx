'use client';

/**
 * ProjectAnimations — GSAP wiring for project detail pages.
 *
 * Same rules as PageAnimations (homepage):
 *  1. Ghost text: NEVER animate opacity — CSS owns it (0.04). Scale only.
 *  2. PaintMark (heroMark): animate to the exact component opacity prop (0.18).
 *  3. Scroll reveals: gsap.set to hide first, gsap.to on trigger.
 *     Never gsap.from for scroll (causes visible flash before trigger fires).
 */

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ProjectAnimations() {
  useGSAP(() => {

    /* ────────────────────────────── INITIAL STATES ───────────────────────── */

    // Ghost title — scale only. CSS owns opacity (0.04). NEVER touch it.
    gsap.set('.js-proj-ghost', { scale: 0.9, transformOrigin: 'right top' });

    // Hero paint mark — start invisible, animate to exact component opacity
    gsap.set('.js-proj-hero-mark', { opacity: 0 });

    // Hero content
    gsap.set('.js-proj-title',    { y: 80,   opacity: 0 });
    gsap.set('.js-proj-meta',     { y: 20,   opacity: 0 });
    gsap.set('.js-proj-hero-img', { scale: 1.04, opacity: 0, transformOrigin: 'center center' });

    // Scroll targets — hidden until their trigger fires
    gsap.set('.js-proj-intro > *',  { y: 40, opacity: 0 });
    gsap.set('.js-proj-section',    { y: 70, opacity: 0 });
    gsap.set('.js-proj-rec-card',   { y: 90, opacity: 0 });
    gsap.set('.js-proj-rec-label',  { y: 20, opacity: 0 });

    /* ────────────────────────────── HERO TIMELINE ────────────────────────── */

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // 1 — Ghost title scales up — background texture lands first
    tl.to('.js-proj-ghost', {
      scale: 1,
      duration: 1.0,
      ease: 'power2.out',
    }, 0);

    // 2 — Paint mark bursts in at exact component opacity
    tl.to('.js-proj-hero-mark', {
      opacity: 0.18,
      duration: 0.55,
      ease: 'power3.out',
    }, 0.22);

    // 3 — Project title slams up — the headline moment
    tl.to('.js-proj-title', {
      y: 0,
      opacity: 1,
      duration: 0.72,
      ease: 'power4.out',
    }, 0.38);

    // 4 — Meta row (tags · date · duration) arrives after title settles
    tl.to('.js-proj-meta', {
      y: 0,
      opacity: 1,
      duration: 0.48,
      ease: 'power3.out',
    }, 0.72);

    // 5 — Hero image pulls into focus from a very slight zoom
    tl.to('.js-proj-hero-img', {
      scale: 1,
      opacity: 1,
      duration: 0.9,
      ease: 'power2.inOut',
    }, 0.5);

    /* ────────────────────────────── INTRO ────────────────────────────────── */

    gsap.to('.js-proj-intro > *', {
      scrollTrigger: {
        trigger: '.js-proj-intro',
        start: 'top 88%',
        once: true,
      },
      y: 0,
      opacity: 1,
      duration: 0.62,
      stagger: 0.14,
      ease: 'power3.out',
    });

    /* ────────────────────────────── CONTENT SECTIONS ─────────────────────── */

    // Each section gets its own trigger so they reveal progressively
    document.querySelectorAll<HTMLElement>('.js-proj-section').forEach(section => {
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 86%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.68,
        ease: 'power3.out',
      });
    });

    /* ────────────────────────────── RECOMMENDED ──────────────────────────── */

    gsap.to('.js-proj-rec-label', {
      scrollTrigger: {
        trigger: '.js-proj-rec-section',
        start: 'top 88%',
        once: true,
      },
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out',
    });

    gsap.to('.js-proj-rec-card', {
      scrollTrigger: {
        trigger: '.js-proj-rec-section',
        start: 'top 84%',
        once: true,
      },
      y: 0,
      opacity: 1,
      duration: 0.72,
      stagger: 0.16,
      ease: 'power4.out',
    });

  }, []);

  return null;
}
