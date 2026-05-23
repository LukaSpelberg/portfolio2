import Link from 'next/link';
import PaintMark from '@/components/PaintMark';
import { projects } from '@/lib/projects';
import styles from './page.module.css';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const isEn = lang === 'en';
  return {
    title: isEn ? 'Projects — Luka Spelberg' : 'Projecten — Luka Spelberg',
    description: isEn
      ? 'All design cases by Luka Spelberg — UX, branding, game design and front-end.'
      : 'Alle design cases van Luka Spelberg — UX, branding, game design en front-end.',
  };
}

export default async function ProjectenPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const isEn = lang === 'en';
  const langSuffix = isEn ? '?lang=en' : '';

  return (
    <main className={styles.root}>

      {/* ══════════════════════════════ HEADER ═══════════════════════════════ */}
      <section className={styles.header}>
        {/* Background ghost word */}
        <span className={`${styles.ghostTitle} ghost`} aria-hidden>
          {isEn ? 'PROJECTS' : 'PROJECTEN'}
        </span>

        <PaintMark
          src="/splatters/splatter1HugeBlob.webp"
          color="var(--color-accent)"
          opacity={0.15}
          className={styles.headerMark}
        />

        <div className={styles.headerContent}>
          <span className={styles.headerLabel}>Cases</span>
          <h1 className={styles.headerHeading}>
            {isEn ? 'Projects' : 'Projecten'}
          </h1>
          <p className={styles.headerSub}>
            {isEn
              ? 'UX, branding, game design, front-end. an overview of what I have made.'
              : 'UX, branding, game design, front-end. een overzicht van wat ik heb gemaakt.'}
          </p>
        </div>
      </section>

      {/* ════════════════════════════ PROJECT LIST ════════════════════════════ */}
      <section className={styles.listSection}>
        <div className={styles.list}>
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projecten/${project.slug}${langSuffix}`}
              className={styles.card}
            >
              {/* Coloured / image background */}
              <div
                className={styles.cardBg}
                style={{ background: project.heroBg }}
              />

              {/* Film-effect image — cardImage if supplied, else heroImage */}
              {(project.cardImage ?? project.heroImage) && (
                <div className={styles.cardFilmImg} aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.cardImage ?? project.heroImage} alt="" />
                </div>
              )}

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
