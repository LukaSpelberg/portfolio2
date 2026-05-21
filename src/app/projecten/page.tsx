import Link from 'next/link';
import PaintMark from '@/components/PaintMark';
import { projects } from '@/lib/projects';
import styles from './page.module.css';

export const metadata = {
  title: 'Projecten — Luka Spelberg',
  description: 'Alle design cases van Luka Spelberg — UX, branding, game design en front-end.',
};

export default function ProjectenPage() {
  return (
    <main className={styles.root}>

      {/* ══════════════════════════════ HEADER ═══════════════════════════════ */}
      <section className={styles.header}>
        {/* Background ghost word */}
        <span className={`${styles.ghostTitle} ghost`} aria-hidden>PROJECTEN</span>

        <PaintMark
          src="/splatters/splatter1HugeBlob.webp"
          color="var(--color-accent)"
          opacity={0.15}
          className={styles.headerMark}
        />

        <div className={styles.headerContent}>
          <span className={styles.headerLabel}>Cases</span>
          <h1 className={styles.headerHeading}>Projecten</h1>
          <p className={styles.headerSub}>
            UX, branding, game design, front-end — een overzicht van wat ik heb gemaakt.
          </p>
        </div>
      </section>

      {/* ════════════════════════════ PROJECT LIST ════════════════════════════ */}
      <section className={styles.listSection}>
        <div className={styles.list}>
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projecten/${project.slug}`}
              className={styles.card}
            >
              {/* Coloured / image background */}
              <div
                className={styles.cardBg}
                style={{ background: project.heroBg }}
              />

              {/* Dark gradient overlay */}
              <div className={styles.cardOverlay} />

              {/* Giant ghost number — background texture */}
              <span className={styles.ghostNum} aria-hidden>{project.num}</span>

              {/* Text content */}
              <div className={styles.cardContent}>
                <span className={styles.cardNum}>{project.num}</span>
                <span className={styles.cardName}>{project.title}</span>
                <span className={styles.cardMeta}>
                  {project.tags.join(' · ')} · {project.date.split(' ')[1]}
                </span>
              </div>

              {/* Red accent line on hover */}
              <div className={styles.cardAccent} />
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
