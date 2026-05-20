import Link from 'next/link';
import PaintBlob from '@/components/PaintBlob';
import PaintMark from '@/components/PaintMark';
import PageAnimations from '@/components/PageAnimations';
import { projects } from '@/lib/projects';
import styles from './page.module.css';

export default function HomePage() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <>
      {/* Client-side animation engine — renders nothing, wires up GSAP */}
      <PageAnimations />

      <main className={styles.root}>

        {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
        <section className={styles.hero}>

          {/* Ghost text — background typography as texture */}
          <span className={`${styles.ghostBg} ghost js-ghost`} aria-hidden>SPELBERG</span>
          <span className={`${styles.ghostBgMid} ghost js-ghost`} aria-hidden>PORTFOLIO</span>
          <span className={`${styles.ghostBgLow} ghost js-ghost`} aria-hidden>DESIGN</span>

          {/* Red field — left dominant region; GSAP wipes this in via clip-path */}
          <PaintBlob
            variant="field"
            className={`${styles.heroField} js-hero-field`}
          />

          {/* Dominant red mark — upper-left */}
          <PaintMark
            src="/splatters/splatter1HugeBlob.webp"
            color="var(--color-accent)"
            opacity={0.68}
            className={`${styles.heroMarkBig} js-hero-mark-red`}
          />

          {/* Gold deco — upper-right counter-balance */}
          <PaintMark
            src="/splatters/splatter 1-deco.webp"
            color="var(--color-gold)"
            opacity={0.48}
            className={`${styles.heroMarkDeco} js-hero-mark-gold`}
          />

          {/* Slash behind body copy */}
          <PaintBlob
            variant="slash"
            color="var(--color-accent)"
            opacity={0.35}
            className={styles.heroSlash}
          />

          {/* Foreground content */}
          <div className={styles.heroContent}>
            <div className={styles.nameBlock}>
              <span className={`${styles.nameTop} js-name-line`}>LUKA</span>
              <span className={`${styles.nameBottom} js-name-line`}>SPELBERG</span>
            </div>

            <div className={`${styles.subBlock} js-subblock`}>
              <span className={styles.subhead}>Digital Designer</span>
              <PaintBlob
                variant="splatter"
                color="var(--color-gold)"
                opacity={0.65}
                className={styles.heroPunct}
              />
            </div>

            <p className={`${styles.bodyIntro} js-hero-copy`}>
              Ik ontwerp digitale ervaringen die ergens over gaan. Games, posters,
              interfaces — zolang er een verhaal achter zit, ben ik erin.
            </p>

            <div className={`${styles.metaRow} js-hero-copy`}>
              <span>Rotterdam</span>
              <span>·</span>
              <span>Digital Design</span>
              <span>·</span>
              <span>2024</span>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ PROJECTS ══════════════════════════════ */}
        <section className={`${styles.projectsSection} js-projects-section`}>

          <PaintMark
            src="/splatters/splatter2Deco.webp"
            color="var(--color-accent)"
            opacity={0.14}
            className={styles.projectsMark}
          />

          <div className={`${styles.projectsHeader} js-projects-header`}>
            <span className={styles.sectionLabel}>// Projecten</span>
            <Link href="/projecten" className={styles.allProjectsBtn}>
              Bekijk alle projecten →
            </Link>
          </div>

          <div className={styles.projectsList}>
              {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projecten/${project.slug}`}
                className={`${styles.projectCard} js-project-card`}
              >
                <div
                  className={styles.projectCardBg}
                  style={{ background: project.heroBg }}
                />
                <div className={styles.projectCardOverlay} />
                <span className={styles.projectGhostNum} aria-hidden>
                  {project.num}
                </span>
                <div className={styles.projectCardContent}>
                  <span className={styles.projectCardNum}>{project.num}</span>
                  <span className={styles.projectCardName}>{project.title}</span>
                  <span className={styles.projectCardMeta}>{project.tags.join(' · ')} · {project.date.split(' ')[1]}</span>
                </div>
                <div className={styles.projectCardAccent} />
              </Link>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════ ABOUT ═══════════════════════════════ */}
        <section className={`${styles.aboutSection} js-about-section`}>

          <PaintMark
            src="/splatters/splatter4Deco.webp"
            color="var(--color-gold)"
            opacity={0.13}
            className={styles.aboutMark}
          />

          <div className={`${styles.aboutText} js-about-text`}>
            <span className={styles.aboutLabel}>// Over mij</span>
            <h2 className={styles.aboutHeading}>
              Ik ben<br />Luka Spelberg
            </h2>
            <p className={styles.aboutBody}>
              Design vond ik via games. De interfaces van Persona, de poster-energie
              van Metaphor, de systemen achter Cyberpunk — dat is wat me leerde dat
              visuele taal iets kan betekenen.
            </p>
            <p className={styles.aboutBody}>
              Ik studeer Digital Design en combineer UX, branding en front-end
              development. Ik speel piano. Ik houd van verhalen die ergens heen gaan.
            </p>
          </div>

          <div className={styles.aboutPhotos}>
            <div className={`${styles.photoTall} js-about-photo`} />
            <div className={styles.photosRightCol}>
              <div className={`${styles.photoThumb} js-about-photo`} />
              <div className={`${styles.photoThumb} js-about-photo`} />
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
