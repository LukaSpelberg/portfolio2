'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Nav.module.css';

export default function Nav() {
  const [lang, setLang] = useState<'NL' | 'EN'>('NL');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Bar appears once you've scrolled ~80% of the viewport height
      // — hero is fully visible below that point
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <Link href="/" className={styles.logo} aria-label="Home">
        LS
      </Link>

      <div className={styles.right}>
        <Link href="/projecten" className={styles.projectsLink}>
          Alle projecten
        </Link>

        <span className={styles.divider} aria-hidden>·</span>

        <div className={styles.langToggle} role="group" aria-label="Taal kiezen">
          <button
            className={`${styles.langBtn} ${lang === 'NL' ? styles.langActive : ''}`}
            onClick={() => setLang('NL')}
            aria-pressed={lang === 'NL'}
          >
            NL
          </button>
          <span className={styles.langSep} aria-hidden>/</span>
          <button
            className={`${styles.langBtn} ${lang === 'EN' ? styles.langActive : ''}`}
            onClick={() => setLang('EN')}
            aria-pressed={lang === 'EN'}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
}
