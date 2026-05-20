/* ─────────────────────────────────────────────────────────────────────────── */
/*  projects.ts — single source of truth for all project data                  */
/*                                                                             */
/*  To add a new project: append an object to the `projects` array below.     */
/*  The homepage cards, the detail page, and the "recommended" section all     */
/*  pull from this file — no other code changes needed.                        */
/* ─────────────────────────────────────────────────────────────────────────── */

/* ── Content section types ─────────────────────────────────────────────── */

export interface TextImageSection {
  type: 'text-image';
  heading?: string;
  text: string;
  image: string;
  imageAlt: string;
}

export interface FullImageSection {
  type: 'full-image';
  src: string;
  alt: string;
  caption?: string;
}

export interface CenteredTextSection {
  type: 'centered-text';
  heading: string;
  body: string;
}

/** Optional: 2-image side-by-side grid. Omit this section if not needed. */
export interface ImageGridSection {
  type: 'image-grid';
  images: { src: string; alt: string }[];
}

export type ContentSection =
  | TextImageSection
  | FullImageSection
  | CenteredTextSection
  | ImageGridSection;

/* ── Project type ───────────────────────────────────────────────────────── */

export interface Project {
  slug: string;
  num: string;          // '01', '02', '03' — used for card ghost text
  title: string;
  tags: string[];       // e.g. ['UX', 'Game Design']
  date: string;         // e.g. 'September 2024'
  duration: string;     // e.g. '4 weken'
  featured?: boolean;
  heroImage: string;    // path inside /public, e.g. '/projects/dynamo/hero.webp'
  heroBg: string;       // fallback gradient for card background
  intro: {
    heading: string;
    body: string;
    links?: { label: string; href: string }[];
  };
  sections: ContentSection[];
}

/* ── Project data ───────────────────────────────────────────────────────── */

export const projects: Project[] = [
  {
    slug: 'dynamo',
    num: '01',
    title: 'Dynamo',
    tags: ['UX', 'Game Design'],
    date: 'September 2024',
    duration: '4 weken',
    featured: true,
    heroImage: '/projects/dynamo/hero.webp',
    heroBg: 'linear-gradient(135deg, #1a3a2e 0%, #0e2218 100%)',
    intro: {
      heading: 'Een bordspel ontworpen om de voetbalwereld in te stappen',
      body: 'Dynamo is een educatief bordspel dat jongeren kennis laat maken met de wereld van professioneel voetbal — van transfermarkten tot spelerscontracten. Het project combineerde UX-research, game design en visuele vormgeving tot één samenhangend ontwerp.',
      links: [
        { label: 'Bekijk op GitHub', href: '#' },
      ],
    },
    sections: [
      {
        type: 'text-image',
        heading: 'Testing, testing en nog meer testing',
        text: 'We testten het spel in meerdere rondes met echte gebruikers. Elke iteratie bracht nieuwe inzichten over de spelbalans, de leesbaarheid van de kaarten en de flow van het spel. De feedback werd direct verwerkt in het volgende prototype.',
        image: '/projects/dynamo/box.webp',
        imageAlt: 'Dynamo doos',
      },
      {
        type: 'full-image',
        src: '/projects/dynamo/overview.webp',
        alt: 'Dynamo spel overzicht',
      },
      {
        type: 'centered-text',
        heading: 'Testing, testing en nog meer testing',
        body: 'Na drie testrondes hadden we een spel dat intuïtief aanvoelde, visueel sterk was en een duidelijke leercurve had. De spelregels werden vereenvoudigd zonder de diepgang te verliezen.',
      },
      {
        type: 'image-grid',
        images: [
          { src: '/projects/dynamo/box.webp', alt: 'Dynamo doos aanzicht 1' },
          { src: '/projects/dynamo/box2.webp', alt: 'Dynamo doos aanzicht 2' },
        ],
      },
    ],
  },

  {
    slug: 'MyJam',
    num: '01',
    title: 'MyJam',
    tags: ['UX/UI', 'Backend'],
    date: 'April 2025',
    duration: '5 weken',
    featured: true,
    heroImage: '/projects/myjam/hero.webp',
    heroBg: 'linear-gradient(135deg, #1a3a2e 0%, #0e2218 100%)',
    intro: {
      heading: 'MyJam biedt een gepersonaliseerd aanbod aan muziek om te leren op jouw instrument.',
      body: 'MyJam is een platform dat beginnende tot gevorderde muzikanten helpt om muziek te vinden die past bij hun niveau en voorkeuren. Door de data van spotify te combineren met de input van de gebruiker, geeft MyJam een uniek aanbod aan muziek.',
      links: [
        { label: 'Bekijk op GitHub', href: '#https://github.com/Manueldh/MyJam' },
      ],
    },
    sections: [
      {
        type: 'text-image',
        heading: 'NodeJS, Express en Spotify API',
        text: 'Dit project werd geintroduceerd als kennismaking met backend development. We bouwden een server in NodeJS met Express, die communiceerde met onze Spotify Scraper om muziekdata op te halen en te verwerken. De frontend maakte gebruik van deze data om gepersonaliseerde aanbevelingen te tonen.',
        image: '/projects/myjam/box.webp',
        imageAlt: 'myjam interface',
      },
      {
        type: 'full-image',
        src: '/projects/myjam/overview.webp',
        alt: 'myjam platform overzicht',
      },
      {
        type: 'centered-text',
        heading: 'Nieuwe uitdagingen.',
        body: 'Het nuttige aan dit project was dat het ons liet experimenteren met security, iets wat op de frontend niet aan bod komt. We implementeerden login, registratie met hashing, het resetten van wachtwoorden op een veilige manier, en we zorgden ervoor dat de sleutels niet in de frontend terechtkwamen.',
      },
      {
        type: 'image-grid',
        images: [
          { src: '/projects/myjam/box.webp', alt: 'myjam interface aanzicht 1' },
          { src: '/projects/myjam/box2.webp', alt: 'myjam interface aanzicht 2' },
        ],
      },
    ],
  },

  {
    slug: 'public-city-jazz',
    num: '02',
    title: 'Public City Jazz',
    tags: ['Branding', 'UX'],
    date: 'November 2024',
    duration: '6 weken',
    featured: true,
    heroImage: '/projects/pcj/hero.webp',
    heroBg: 'linear-gradient(135deg, #1e1a0e 0%, #2a1e08 100%)',
    intro: {
      heading: 'Een jazzfestival dat de stad wakker schudt',
      body: 'Public City Jazz is een fictief jazzfestival voor de gemeente Rotterdam. Het project omvatte de volledige branding — van visuele identiteit tot poster en digitale uitingen — met als doel een festival dat de stad en de muziek met elkaar verbindt.',
      links: [],
    },
    sections: [
      {
        type: 'text-image',
        heading: 'Identiteit vanuit het ritme',
        text: 'De visuele taal is opgebouwd vanuit de energie van jazz: improviserend, gedurfd, en altijd in beweging. Typografie als instrument — lettervormen die botsen en resoneren, net als de noten in een sessie.',
        image: '/projects/pcj/poster.webp',
        imageAlt: 'Public City Jazz poster',
      },
      {
        type: 'full-image',
        src: '/projects/pcj/overview.webp',
        alt: 'Public City Jazz merkidentiteit overzicht',
      },
      {
        type: 'centered-text',
        heading: 'Van poster tot digitaal',
        body: 'De identiteit werd doorgetrokken naar een digitale omgeving: een festivalwebsite met programma, kaartverkoop en artiestenpagina\'s. Consistent maar levendig.',
      },
    ],
  },

  {
    slug: 'persona3-reload',
    num: '03',
    title: 'Persona 3 Reload',
    tags: ['Frontend', 'Web'],
    date: 'Januari 2023',
    duration: '3 weken',
    featured: true,
    heroImage: '/projects/p3r/hero.webp',
    heroBg: 'linear-gradient(135deg, #0e1a30 0%, #0a1220 100%)',
    intro: {
      heading: 'Een frontend replica van de officiële Persona 3 Reload website',
      body: 'Dit project is een pixel-accurate replica van de officiële Persona 3 Reload promotiepagina. Gebouwd puur in HTML, CSS en JavaScript — geen frameworks. Het doel: leren van een professionele UI door hem helemaal na te bouwen.',
      links: [
        { label: 'Bekijk live', href: '#' },
        { label: 'GitHub', href: '#' },
      ],
    },
    sections: [
      {
        type: 'text-image',
        heading: 'Reconstructie als leermethode',
        text: 'Door elke animatie, elke overgang en elk detail handmatig na te bouwen leerde ik hoe professionele game-UI werkt. Van de parallax-achtergronden tot de dramatische tekst-animaties — alles is met de hand geschreven.',
        image: '/projects/p3r/detail.webp',
        imageAlt: 'Persona 3 Reload website detail',
      },
      {
        type: 'full-image',
        src: '/projects/p3r/overview.webp',
        alt: 'Persona 3 Reload website overzicht',
      },
      {
        type: 'centered-text',
        heading: 'Wat ik meenam',
        body: 'CSS custom properties, scroll-driven animaties, clip-path composities en complexe hover-states. Maar bovenal: een diep respect voor de ontwerpers van Persona\'s UI.',
      },
    ],
  },
];

/* ── Helpers ────────────────────────────────────────────────────────────── */

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

/** Returns other projects to show in the "Meer projecten" section. */
export function getRecommended(currentSlug: string, count = 2): Project[] {
  return projects.filter(p => p.slug !== currentSlug).slice(0, count);
}
