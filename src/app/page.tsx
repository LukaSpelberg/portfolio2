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
              Ik ben Luka, een Digital Designer uit Amsterdam. Ik werk nu anderhalf jaar als Designer & developer, en studeer momenteel aan mijn derde jaar bij de HVA. Met specialisatie in Techniek kan ik op veel verschillende velden uit de voeten, wat je ook terugziet op dit portfolio.
            </p>

            <div className={`${styles.metaRow} js-hero-copy`}>
              <span>Amsterdam</span>
              <span>·</span>
              <span>Digital Design</span>
              <span>·</span>
              <span>2026</span>
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
            <span className={styles.sectionLabel}>Projecten</span>
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
            <span className={styles.aboutLabel}>Over mij</span>
            <h2 className={styles.aboutHeading}>
              Ik ben<br />Luka Spelberg
            </h2>
            <p className={styles.aboutBody}>
               Ik was al sinds vrij jonge leeftijd geinteresseerd in de digitale wereld, en dat zie je ook terug in mijn hobbies.
              Ik speel namelijk veel games, die voornamelijk narratief gedreven zijn. Naast games heb ik ook een passie voor muziek, ik speel zelf piano en ben sinds kort begonnen aan eigen muziek schrijven.
            </p>
            <p className={styles.aboutBody}>
              Ik ben inmiddels in mijn derde jaar van CMD. In het derde jaar heb ik gekozen om de minor Emerging technologies en Applied Game Design te volgen. Vooral bij die laatste heb ik ontdekt hoe leuk ik
              het vind om dingen te maken. Creatief zijn is voor mij heel belangrijk.
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
