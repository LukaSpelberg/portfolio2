import Link from 'next/link';
import PaintBlob from '@/components/PaintBlob';
import PaintMark from '@/components/PaintMark';
import PageAnimations from '@/components/PageAnimations';
import { projects } from '@/lib/projects';
import styles from './page.module.css';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const isEn = lang === 'en';
  const langSuffix = isEn ? '?lang=en' : '';

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

          {/* Red field — left dominant region; real splatter photo masked to accent color.
               opacity={0} here so SSR renders invisible — GSAP animates it to 0.92 on load. */}
          <PaintMark
            src="/splatters/splatter1HugeBlob.webp"
            color="var(--color-accent)"
            opacity={0}
            className={`${styles.heroField} js-hero-field`}
          />

          {/* Gold deco — upper-right counter-balance.
               opacity={0} here so SSR renders invisible — GSAP animates it to 0.48 on load. */}
          <PaintMark
            src="/splatters/splatter 1-deco.webp"
            color="var(--color-gold)"
            opacity={0}
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
            </div>

            <p className={`${styles.bodyIntro} js-hero-copy`}>
              {isEn
                ? "I'm Luka, a Digital Designer from Amsterdam. I've been working as a Designer & Developer for a year and a half, and I'm currently in my third year CMD at the HVA. With a specialisation in Technology I can work across many different fields, which you can also see in this portfolio."
                : 'Ik ben Luka, een Digital Designer uit Amsterdam. Ik werk nu anderhalf jaar als Designer & developer, en studeer momenteel aan mijn derde jaar CMD bij de HVA. Met specialisatie in Techniek kan ik op veel verschillende velden uit de voeten, wat je ook terugziet op dit portfolio.'}
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
            <span className={styles.sectionLabel}>
              {isEn ? 'Projects' : 'Projecten'}
            </span>
            <Link href={`/projecten${langSuffix}`} className={styles.allProjectsBtn}>
              {isEn ? 'View all projects →' : 'Bekijk alle projecten →'}
            </Link>
          </div>

          <div className={styles.projectsList}>
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projecten/${project.slug}${langSuffix}`}
                className={`${styles.projectCard} js-project-card`}
              >
                <div
                  className={styles.projectCardBg}
                  style={{ background: project.heroBg }}
                />
                {/* Film-effect image — flashes in on hover like an old projector */}
                {project.heroImage && (
                  <div className={styles.projectCardFilmImg} aria-hidden>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={project.heroImage} alt="" />
                  </div>
                )}
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
            <span className={styles.aboutLabel}>
              {isEn ? 'About me' : 'Over mij'}
            </span>
            <h2 className={styles.aboutHeading}>
              {isEn ? <>I&apos;m<br />Luka Spelberg</> : <>Ik ben<br />Luka Spelberg</>}
            </h2>
            <p className={styles.aboutBody}>
              {isEn
                ? "I've been interested in the digital world from a fairly young age, and you can also see that in my hobbies. I play a lot of games, which are mainly story-driven. Besides games I also have a passion for music, I play piano myself and have recently started writing my own music."
                : 'Ik was al sinds vrij jonge leeftijd geinteresseerd in de digitale wereld, en dat zie je ook terug in mijn hobbies. Ik speel namelijk veel games, die voornamelijk narratief gedreven zijn. Naast games heb ik ook een passie voor muziek, ik speel zelf piano en ben sinds kort begonnen aan eigen muziek schrijven.'}
            </p>
            <p className={styles.aboutBody}>
              {isEn
                ? "I'm now in my third year of CMD. In my third year I chose to follow the Emerging Technologies and Applied Game Design minors. Especially with the latter I discovered how much I enjoy making things. Being creative is very important to me."
                : 'Ik ben inmiddels in mijn derde jaar van CMD. In het derde jaar heb ik gekozen om de minor Emerging technologies en Applied Game Design te volgen. Vooral bij die laatste heb ik ontdekt hoe leuk ik het vind om dingen te maken. Creatief zijn is voor mij heel belangrijk.'}
            </p>
          </div>

          <div className={styles.aboutPhotos}>
            <div className={`${styles.photoTall} js-about-photo`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/lukapiano.png" alt={isEn ? 'Luka portrait' : 'Luka portret'} />
            </div>
            <div className={styles.photosRightCol}>
              <div className={`${styles.photoThumb} js-about-photo`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lukabureau.jpg" alt={isEn ? 'Luka at his desk' : 'Luka aan het bureau'} />
              </div>
              <div className={`${styles.photoThumb} js-about-photo`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lukadak.jpg" alt={isEn ? 'Luka on the rooftop' : 'Luka achter de piano'} />
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
