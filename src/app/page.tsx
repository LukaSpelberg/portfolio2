import PaintBlob from '@/components/PaintBlob';
import styles from './page.module.css';

export default function DesignSystemTest() {
  return (
    <div className={styles.root}>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  SECTION 1 — HERO / SCALE & LAYERING                             */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className={styles.hero}>

        {/* Ghost text — background typography as texture */}
        <span className={`${styles.ghostBg} ghost`} aria-hidden>SPELBERG</span>
        <span className={`${styles.ghostBgMid} ghost`} aria-hidden>PORTFOLIO</span>
        <span className={`${styles.ghostBgLow} ghost`} aria-hidden>DESIGN</span>

        {/* ── PAINT LAYER (z-index 1) ──── */}

        {/* Red field — dominant left region */}
        <PaintBlob variant="field" className={styles.heroField} />

        {/* Large red splatter — upper right, chaotic, violent */}
        <PaintBlob
          variant="splatter"
          className={styles.heroSplatBig}
          color="var(--color-accent)"
        />

        {/* Gold splatter — overlapping content area, mid-canvas */}
        <PaintBlob
          variant="splatter"
          className={styles.heroSplatGold}
          color="var(--color-gold)"
          opacity={0.7}
        />

        {/* Teal splatter — lower area, behind body text */}
        <PaintBlob
          variant="splatter"
          className={styles.heroSplatTeal}
          color="var(--color-teal)"
          opacity={0.5}
        />

        {/* Slash behind body intro */}
        <PaintBlob
          variant="slash"
          className={styles.heroSlash}
          color="var(--color-accent)"
          opacity={0.35}
        />

        {/* ── FOREGROUND CONTENT (z-index 2) ── */}
        <div className={styles.heroContent}>
          <p className={styles.sysLabel}>— ONTWERP SYSTEEM · DESIGN SYSTEM TEST</p>

          <div className={styles.nameBlock}>
            <h1 className={styles.nameTop}>LUKA</h1>
            <h1 className={styles.nameBottom}>SPELBERG</h1>
          </div>

          <div className={styles.subBlock}>
            <PaintBlob
              variant="stroke"
              className={styles.strokeUnder}
              color="var(--color-accent)"
            />
            <h2 className={styles.subhead}>Digital Designer</h2>
            <PaintBlob
              variant="splatter"
              className={styles.heroPunct}
              color="var(--color-gold)"
            />
          </div>

          <p className={styles.bodyIntro}>
            Ik ontwerp interfaces die ergens over gaan — niet netjes, maar raak.
            Gevonden via games. Gebouwd voor mensen.
          </p>

          <p className={styles.metaRow}>
            <span>Playfair Display</span>
            <span>·</span>
            <span>Bebas Neue</span>
            <span>·</span>
            <span>Space Mono</span>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  SECTION 2 — TYPOGRAPHY SCALE                                     */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className={styles.typeSection}>
        {/* Large accent splatter — right side, behind the type stack */}
        <PaintBlob
          variant="splatter"
          className={styles.typeSplatBig}
          color="var(--color-accent)"
          opacity={0.28}
        />
        {/* Gold splatter — lower-left corner accent */}
        <PaintBlob
          variant="splatter"
          className={styles.typeSplatGold}
          color="var(--color-gold)"
          opacity={0.22}
        />

        <p className={styles.sectionLabel}>01 — TYPOGRAFIE</p>

        <div className={styles.typeStack}>
          {/* 320px ghost level */}
          <div className={styles.typeRow}>
            <span className={styles.typeSize}>320px</span>
            <span className={styles.typeSizeLabel}>Achtergrond / textuur</span>
            <div className={styles.typeSample320}>ONTWERP</div>
          </div>

          {/* 160px hero */}
          <div className={styles.typeRow}>
            <span className={styles.typeSize}>160px</span>
            <span className={styles.typeSizeLabel}>Hero koptekst</span>
            <div className={styles.typeSample160}>
              CASES
              <PaintBlob variant="splatter" className={styles.inlineSplat} color="var(--color-accent)" />
            </div>
          </div>

          {/* 80px section heading */}
          <div className={styles.typeRow}>
            <span className={styles.typeSize}>80px</span>
            <span className={styles.typeSizeLabel}>Sectiekoptekst</span>
            <div className={styles.typeSample80}>PROJECTEN</div>
          </div>

          {/* 48px card title */}
          <div className={styles.typeRow}>
            <span className={styles.typeSize}>48px</span>
            <span className={styles.typeSizeLabel}>Kaart / project</span>
            <div className={styles.typeSample48}>DYNAMO</div>
          </div>

          {/* 18px body */}
          <div className={styles.typeRow}>
            <span className={styles.typeSize}>18px Syne</span>
            <span className={styles.typeSizeLabel}>Broodtekst</span>
            <p className={styles.typeSampleBody}>
              Een voetbal bordspel met een eigen universe en visuele identiteit,
              ontworpen als een volledig UX + game design project.
            </p>
          </div>

          {/* 13px mono */}
          <div className={styles.typeRow}>
            <span className={styles.typeSize}>13px Mono</span>
            <span className={styles.typeSizeLabel}>Metadata / labels</span>
            <p className={styles.typeSampleMono}>
              UX DESIGN · SEPTEMBER 2024 · 4 WEKEN · DYNAMO
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  SECTION 3 — PAINT LANGUAGE                                       */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className={styles.paintSection}>
        {/* Ghost text background */}
        <span className={`${styles.paintGhost} ghost`} aria-hidden>VERF</span>

        {/* Splatters overlaid on this section for texture */}
        <PaintBlob
          variant="splatter"
          className={styles.paintSplatHeader}
          color="var(--color-teal)"
          opacity={0.35}
        />
        <PaintBlob
          variant="splatter"
          className={styles.paintSplatCorner}
          color="var(--color-gold)"
          opacity={0.30}
        />

        <p className={styles.sectionLabel}>02 — VERF</p>

        <div className={styles.blobGrid}>

          {/* slash demo */}
          <div className={styles.blobDemo}>
            <p className={styles.blobLabel}>slash — achter koptekst</p>
            <div className={styles.slashDemo}>
              <PaintBlob variant="slash" className={styles.slashBlob} />
              <span className={styles.slashText}>PROJECTEN</span>
            </div>
          </div>

          {/* field demo */}
          <div className={styles.blobDemo}>
            <p className={styles.blobLabel}>field — sectie-achtergrond</p>
            <div className={styles.fieldDemo}>
              <PaintBlob variant="field" className={styles.fieldBlob} color="var(--color-accent)" />
              {/* Extra splatter on top of the field for chaos */}
              <PaintBlob
                variant="splatter"
                className={styles.fieldSplat}
                color="var(--color-gold)"
                opacity={0.7}
              />
              <div className={styles.fieldText}>
                <span className={styles.fieldNum}>01</span>
                <span className={styles.fieldTitle}>DYNAMO</span>
              </div>
            </div>
          </div>

          {/* splatter + stroke */}
          <div className={styles.blobRow2}>
            <div className={styles.blobDemo}>
              <p className={styles.blobLabel}>splatter — punctuatie</p>
              <div className={styles.splatterDemo}>
                <PaintBlob variant="splatter" className={styles.splatterBlob} color="var(--color-gold)" />
                <p className={styles.splatterLabel}>PUBLIC CITY<br />JAZZ</p>
              </div>
            </div>

            <div className={styles.blobDemo}>
              <p className={styles.blobLabel}>stroke — scheidingslijn</p>
              <div className={styles.strokeDemo}>
                <p className={styles.strokeText}>Dynamo</p>
                <PaintBlob variant="stroke" className={styles.strokeBlob} />
                <p className={styles.strokeTextSmall}>UX Design · 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  SECTION 4 — KLEUREN                                              */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className={styles.colorsSection}>
        <PaintBlob
          variant="splatter"
          className={styles.colorsSplat}
          color="var(--color-accent)"
          opacity={0.25}
        />
        <p className={styles.sectionLabel}>03 — KLEUREN</p>

        <div className={styles.colorGrid}>
          {([
            ['--color-bg',      '#0d201e', 'BG'],
            ['--color-surface', '#132c28', 'SURFACE'],
            ['--color-accent',  '#c0281a', 'ACCENT'],
            ['--color-gold',    '#d4a854', 'GOLD'],
            ['--color-teal',    '#3db8b0', 'TEAL'],
            ['--color-text',    '#f0ece0', 'TEXT'],
            ['--color-muted',   '#5e7870', 'MUTED'],
          ] as const).map(([v, hex, label]) => (
            <div key={v} className={styles.swatch}>
              <div className={styles.swatchBlock} style={{ background: `var(${v})` }} />
              <span className={styles.swatchName}>{label}</span>
              <span className={styles.swatchHex}>{hex}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
