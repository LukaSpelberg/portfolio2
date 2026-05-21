import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.name}>Luka Spelberg · 2026</span>

      <div className={styles.links}>
        <a
          href="mailto:luka.spelberg@outlook.com"
          className={styles.link}
        >
          luka.spelberg@outlook.com
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
