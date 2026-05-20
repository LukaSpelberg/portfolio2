import { notFound } from 'next/navigation';
import Link from 'next/link';
import PaintMark from '@/components/PaintMark';
import { projects, getProject, getRecommended } from '@/lib/projects';
import styles from './page.module.css';

/* ── Static params — tells Next.js which slugs to pre-render ── */
export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

/* ── Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Luka Spelberg`,
    description: project.intro.heading,
  };
}

/* ── Page ── */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const recommended = getRecommended(slug);

  return (
    <main className={styles.root}>

      {/* ══════════════════════════════ HERO ══════════════════════════════ */}
      <section className={styles.hero}>
        <span className={`${styles.ghostTitle} ghost`} aria-hidden>
          {project.title.toUpperCase()}
        </span>

        <PaintMark
          src="/splatters/splatter1HugeBlob.webp"
          color="var(--color-accent)"
          opacity={0.18}
          className={styles.heroMark}
        />

        <div className={styles.heroContent}>
          <h1 className={styles.title}>{project.title}</h1>

          <div className={styles.metaRow}>
            {project.tags.flatMap((tag, i) => [
              i > 0 ? <span key={`sep-${i}`} aria-hidden>·</span> : null,
              <span key={tag}>{tag}</span>,
            ])}
            <span aria-hidden>·</span>
            <span>{project.date}</span>
            <span aria-hidden>·</span>
            <span>{project.duration}</span>
          </div>
        </div>

        {/* Hero image — full content width, sits tight below the title */}
        {project.heroImage && (
          <div className={styles.heroImageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.heroImage}
              alt={project.title}
              className={styles.heroImg}
            />
          </div>
        )}
      </section>

      {/* ═══════════════════════════ INTRO ════════════════════════════════ */}
      <section className={styles.intro}>
        <h2 className={styles.introHeading}>{project.intro.heading}</h2>
        <p className={styles.introBody}>{project.intro.body}</p>

        {project.intro.links && project.intro.links.length > 0 && (
          <div className={styles.introLinks}>
            {project.intro.links.map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.introLink}
              >
                {link.label} →
              </a>
            ))}
          </div>
        )}
      </section>

      {/* ══════════════════════ CONTENT SECTIONS ══════════════════════════ */}
      <div className={styles.sections}>
        {project.sections.map((section, i) => {

          /* Text left + image right */
          if (section.type === 'text-image') return (
            <section key={i} className={styles.sectionTextImage}>
              <div className={styles.sectionText}>
                {section.heading && (
                  <h3 className={styles.sectionHeading}>{section.heading}</h3>
                )}
                <p className={styles.sectionBody}>{section.text}</p>
              </div>
              <div className={styles.sectionImageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={section.image} alt={section.imageAlt} className={styles.sectionImg} />
              </div>
            </section>
          );

          /* Full-width image */
          if (section.type === 'full-image') return (
            <section key={i} className={styles.sectionFullImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={section.src} alt={section.alt} />
              {section.caption && (
                <p className={styles.caption}>{section.caption}</p>
              )}
            </section>
          );

          /* Centered text */
          if (section.type === 'centered-text') return (
            <section key={i} className={styles.sectionCentered}>
              <h3 className={styles.centeredHeading}>{section.heading}</h3>
              <p className={styles.centeredBody}>{section.body}</p>
            </section>
          );

          /* Optional 2-image grid */
          if (section.type === 'image-grid') return (
            <section key={i} className={styles.sectionGrid}>
              {section.images.map((img, j) => (
                <div key={j} className={styles.gridImage}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} />
                </div>
              ))}
            </section>
          );

          return null;
        })}
      </div>

      {/* ══════════════════════ RECOMMENDED ═══════════════════════════════ */}
      <section className={styles.recommended}>
        <div className={styles.recommendedHeader}>
          <span className={styles.recommendedLabel}>Meer projecten</span>
        </div>

        <div className={styles.recList}>
          {recommended.map(p => (
            <Link
              key={p.slug}
              href={`/projecten/${p.slug}`}
              className={styles.recCard}
            >
              <div
                className={styles.recCardBg}
                style={{ background: p.heroBg }}
              />
              <div className={styles.recCardOverlay} />
              <span className={styles.recGhostNum} aria-hidden>{p.num}</span>
              <div className={styles.recCardContent}>
                <span className={styles.recCardNum}>{p.num}</span>
                <span className={styles.recCardName}>{p.title}</span>
                <span className={styles.recCardMeta}>
                  {p.tags.join(' · ')} · {p.date.split(' ')[1]}
                </span>
              </div>
              <div className={styles.recCardAccent} />
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
