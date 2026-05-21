'use client';

import Link from 'next/link';
import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import styles from './Nav.module.css';

/* ── Inner component — needs Suspense because it calls useSearchParams ── */
function NavContent() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const pathname     = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const isEn = searchParams.get('lang') === 'en';

  const switchLang = (newLang: 'nl' | 'en') => {
    const params = new URLSearchParams(searchParams.toString());
    if (newLang === 'nl') {
      params.delete('lang');          // clean URL for Dutch (the default)
    } else {
      params.set('lang', newLang);
    }
    const qs = params.toString();
    router.push(pathname + (qs ? `?${qs}` : ''));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Carry the lang param through nav links so the locale persists */
  const langSuffix = isEn ? '?lang=en' : '';

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <Link href={`/${langSuffix}`} className={styles.logo} aria-label="Home">
        LS
      </Link>

      <div className={styles.right}>
        <Link href={`/projecten${langSuffix}`} className={styles.projectsLink}>
          {isEn ? 'All projects' : 'Alle projecten'}
        </Link>

        <span className={styles.divider} aria-hidden>·</span>

        <div className={styles.langToggle} role="group" aria-label="Taal kiezen">
          <button
            className={`${styles.langBtn} ${!isEn ? styles.langActive : ''}`}
            onClick={() => switchLang('nl')}
            aria-pressed={!isEn}
          >
            NL
          </button>
          <span className={styles.langSep} aria-hidden>/</span>
          <button
            className={`${styles.langBtn} ${isEn ? styles.langActive : ''}`}
            onClick={() => switchLang('en')}
            aria-pressed={isEn}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ── Static fallback shown during Suspense hydration ── */
function NavFallback() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo} aria-label="Home">LS</Link>
      <div className={styles.right}>
        <Link href="/projecten" className={styles.projectsLink}>Alle projecten</Link>
        <span className={styles.divider} aria-hidden>·</span>
        <div className={styles.langToggle}>
          <span className={`${styles.langBtn} ${styles.langActive}`}>NL</span>
          <span className={styles.langSep} aria-hidden>/</span>
          <span className={styles.langBtn}>EN</span>
        </div>
      </div>
    </nav>
  );
}

/* ── Public export — wraps inner component in Suspense ── */
export default function Nav() {
  return (
    <Suspense fallback={<NavFallback />}>
      <NavContent />
    </Suspense>
  );
}
