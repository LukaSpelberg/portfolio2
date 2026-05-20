import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.name}>Luka Spelberg · 2024</span>

      <div className={styles.links}>
        <a
          href="mailto:hallo@lukaspelberg.nl"
          className={styles.link}
        >
          hallo@lukaspelberg.nl
        </a>
        <span className={styles.sep} aria-hidden>·</span>
        <a
          href="https://linkedin.com/in/lukaspelberg"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          LinkedIn →
        </a>
      </div>
    </footer>
  );
}
