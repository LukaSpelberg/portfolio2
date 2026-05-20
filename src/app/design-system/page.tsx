import PaintBlob from '@/components/PaintBlob';
import PaintMark from '@/components/PaintMark';
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

        {/* Red field — dominant left region (SVG field, kept) */}
        <PaintBlob variant="field" className={styles.heroField} />

        {/*
         * Controlled chaos — three real-image marks:
         * 1. Dominant huge blob — upper-left, red, bleeds off edge. Main visual anchor.
         * 2. Counter-balance deco — upper-right, gold. Creates diagonal tension.
         * 3. Atmospheric — lower-right, teal, very low opacity. Depth/air.
         */}
        <PaintMark
          src="/splatters/splatter1HugeBlob.webp"
          color="var(--color-accent)"
          opacity={0.68}
          className={styles.heroMarkBig}
        />
        <PaintMark
          src="/splatters/splatter 1-deco.webp"
          color="var(--color-gold)"
          opacity={0.48}
          className={styles.heroMarkDeco}
        />
        {/* Slash behind body intro (SVG stroke, kept) */}
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
            <PaintMark
              src="/splatters/splatter2Deco.webp"
              color="var(--color-gold)"
              opacity={0.68}
              className={styles.heroPunct}
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
        {/* Red deco blob — right side, behind type stack */}
        <PaintMark
          src="/splatters/PaintDecoBlob.webp"
          color="var(--color-accent)"
          opacity={0.16}
          className={styles.typeMarkBig}
        />
        {/* Gold deco — lower-left corner accent */}
        <PaintMark
          src="/splatters/splatter5deco.webp"
          color="var(--color-gold)"
          opacity={0.15}
          className={styles.typeMarkGold}
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
              <PaintMark
                src="/splatters/splatter 1-deco.webp"
                color="var(--color-accent)"
                opacity={0.62}
                className={styles.inlineSplat}
              />
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

        {/* Gold mark — lower-left corner anchor */}
        <PaintMark
          src="/splatters/splatter4Deco.webp"
          color="var(--color-gold)"
          opacity={0.20}
          className={styles.paintMarkCorner}
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
              {/* Real image splatter on top of field for layered chaos */}
              <PaintMark
                src="/splatters/splatter1Headingthickstroke.webp"
                color="var(--color-gold)"
                opacity={0.58}
                className={styles.fieldSplat}
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
                <PaintMark
                  src="/splatters/splatter1HugeBlob.webp"
                  color="var(--color-gold)"
                  opacity={0.62}
                  className={styles.splatterBlob}
                />
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
        <PaintMark
          src="/splatters/splatter2Deco.webp"
          color="var(--color-accent)"
          opacity={0.16}
          className={styles.colorsMark}
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
