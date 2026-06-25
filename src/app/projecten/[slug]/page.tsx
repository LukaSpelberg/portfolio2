import type { Key, ReactNode } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PaintMark from '@/components/PaintMark';
import ProjectAnimations from '@/components/ProjectAnimations';
import Lightbox from '@/components/Lightbox';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import GameSwitcher from '@/components/GameSwitcher';
import { projects, getProject, getRecommended, t } from '@/lib/projects';
import type { Locale, ContentSection } from '@/lib/projects';
import styles from './page.module.css';

/* ──────────────────────────────────────────────────────────────────────────
 * renderSection — renders a single content section. Shared by the main page
 * flow (animate=true → scroll-reveal) and the GameSwitcher panels
 * (animate=false → they fade in via the switcher's own transition).
 * 'variants' is handled by the caller, not here.
 * ────────────────────────────────────────────────────────────────────────── */
function renderSection(
  section: ContentSection,
  key: Key,
  locale: Locale,
  animate: boolean,
): ReactNode {
  const anim = animate ? ' js-proj-section' : '';

  switch (section.type) {
    case 'text-image':
      return (
        <section key={key} className={`${styles.sectionTextImage}${anim}`}>
          <div className={styles.sectionText}>
            {section.heading && (
              <h3 className={styles.sectionHeading}>{t(section.heading, locale)}</h3>
            )}
            <p className={styles.sectionBody}>{t(section.text, locale)}</p>
          </div>
          <div className={styles.sectionImageWrap}>
            {section.video ? (
              <YouTubeEmbed
                youtubeId={section.video.youtube}
                title={section.video.title ? t(section.video.title, locale) : undefined}
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={section.image}
                alt={section.imageAlt ? t(section.imageAlt, locale) : ''}
                className={`${styles.sectionImg} js-zoomable`}
              />
            )}
          </div>
        </section>
      );

    case 'full-image':
      return (
        <section key={key} className={`${styles.sectionFullImage}${anim}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={section.src} alt={t(section.alt, locale)} className="js-zoomable" />
          {section.caption && <p className={styles.caption}>{t(section.caption, locale)}</p>}
        </section>
      );

    case 'video':
      return (
        <section key={key} className={`${styles.sectionVideo}${anim}`}>
          <YouTubeEmbed
            youtubeId={section.youtube}
            title={section.title ? t(section.title, locale) : undefined}
          />
          {section.caption && <p className={styles.caption}>{t(section.caption, locale)}</p>}
        </section>
      );

    case 'video-grid':
      return (
        <section key={key} className={`${styles.sectionGrid}${anim}`}>
          {section.videos.map((v, j) => (
            <div key={j} className={styles.gridVideo}>
              <YouTubeEmbed
                youtubeId={v.youtube}
                title={v.title ? t(v.title, locale) : undefined}
              />
              {v.caption && <p className={styles.gridCaption}>{t(v.caption, locale)}</p>}
            </div>
          ))}
        </section>
      );

    case 'centered-text':
      return (
        <section key={key} className={`${styles.sectionCentered}${anim}`}>
          <h3 className={styles.centeredHeading}>{t(section.heading, locale)}</h3>
          <p className={styles.centeredBody}>{t(section.body, locale)}</p>
        </section>
      );

    case 'image-grid':
      return (
        <section key={key} className={`${styles.sectionGrid}${anim}`}>
          {section.images.map((item, j) =>
            'video' in item ? (
              <div key={j} className={styles.gridVideo}>
                <YouTubeEmbed
                  youtubeId={item.video}
                  title={item.title ? t(item.title, locale) : undefined}
                />
              </div>
            ) : (
              <div key={j} className={styles.gridImage}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={t(item.alt, locale)} className="js-zoomable" />
              </div>
            ),
          )}
        </section>
      );

    default:
      // 'variants' is rendered by the caller; nothing else to handle here.
      return null;
  }
}

/* ── Static params — tells Next.js which slugs to pre-render ── */
export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

/* ── Metadata ── */
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const locale: Locale = lang === 'en' ? 'en' : 'nl';
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Luka Spelberg`,
    description: t(project.intro.heading, locale),
  };
}

/* ── Page ── */
export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const { lang } = await searchParams;

  const locale: Locale = lang === 'en' ? 'en' : 'nl';
  const langSuffix = locale === 'en' ? '?lang=en' : '';

  const project = getProject(slug);
  if (!project) notFound();

  const recommended = getRecommended(slug, 3);

  return (
    <main className={styles.root}>

      {/* Client-side animation engine — renders nothing, wires up GSAP */}
      <ProjectAnimations />

      {/* Click any .js-zoomable image to open the zoomable lightbox */}
      <Lightbox />

      {/* ══════════════════════════════ HERO ══════════════════════════════ */}
      <section className={styles.hero}>
        <span className={`${styles.ghostTitle} ghost js-proj-ghost`} aria-hidden>
          {project.title.toUpperCase()}
        </span>

        <PaintMark
          src="/splatters/splatter1HugeBlob.webp"
          color="var(--color-accent)"
          opacity={0.18}
          className={`${styles.heroMark} js-proj-hero-mark`}
        />

        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1 className={`${styles.title} js-proj-title`}>{project.title}</h1>

            <div className={`${styles.metaRow} js-proj-meta`}>
              {project.tags.flatMap((tag, i) => [
                i > 0 ? <span key={`sep-${i}`} aria-hidden>·</span> : null,
                <span key={tag}>{tag}</span>,
              ])}
              <span aria-hidden>·</span>
              <span>{project.date}</span>
              <span aria-hidden>·</span>
              <span>{t(project.duration, locale)}</span>
            </div>
          </div>

          {project.heroImage && (
            <div className={`${styles.heroImageWrap} js-proj-hero-img`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.heroImage}
                alt={project.title}
                className={`${styles.heroImg}${project.heroImageNatural ? ` ${styles.heroImgNatural}` : ''} js-zoomable`}
              />
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════ INTRO ════════════════════════════════ */}
      <section className={styles.intro}>
        <div className={`${styles.introInner} js-proj-intro`}>
          <h2 className={styles.introHeading}>{t(project.intro.heading, locale)}</h2>
          <p className={styles.introBody}>{t(project.intro.body, locale)}</p>

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
                  {t(link.label, locale)} →
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════ CONTENT SECTIONS ══════════════════════════ */}
      <div className={styles.sections}>
        {project.sections.map((section, i) => {
          // The game/character-select switcher renders each variant's sections
          // (without scroll-reveal — the switcher fades them in itself).
          if (section.type === 'variants') return (
            <div key={i} className={`${styles.sectionVariants} js-proj-section`}>
              <GameSwitcher
                label={section.label ? t(section.label, locale) : undefined}
                variants={section.variants.map((v) => ({
                  id: v.id,
                  label: v.label,
                  thumb: v.thumb,
                  tag: v.tag,
                  content: <>{v.sections.map((s, j) => renderSection(s, j, locale, false))}</>,
                }))}
              />
            </div>
          );

          return renderSection(section, i, locale, true);
        })}
      </div>

      {/* ══════════════════════ RECOMMENDED ═══════════════════════════════ */}
      <section className={`${styles.recommended} js-proj-rec-section`}>
        <div className={styles.recommendedHeader}>
          <span className={`${styles.recommendedLabel} js-proj-rec-label`}>
            {locale === 'en' ? 'More projects' : 'Meer projecten'}
          </span>
        </div>

        <div className={styles.recList}>
          {recommended.map(p => (
            <Link
              key={p.slug}
              href={`/projecten/${p.slug}${langSuffix}`}
              className={`${styles.recCard} js-proj-rec-card`}
            >
              <div
                className={styles.recCardBg}
                style={{ background: p.heroBg }}
              />
              {/* Film-effect image — cardImage if supplied, else heroImage */}
              {(p.cardImage ?? p.heroImage) && (
                <div className={styles.recCardFilmImg} aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.cardImage ?? p.heroImage} alt="" />
                </div>
              )}
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
