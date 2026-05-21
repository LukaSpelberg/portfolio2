/* ─────────────────────────────────────────────────────────────────────────── */
/*  projects.ts — single source of truth for all project data                  */
/*                                                                             */
/*  To add a new project: append an object to the `projects` array below.     */
/*  The homepage cards, the detail page, and the "recommended" section all     */
/*  pull from this file — no other code changes needed.                        */
/* ─────────────────────────────────────────────────────────────────────────── */

/* ── i18n primitives ────────────────────────────────────────────────────── */

export type Locale = 'nl' | 'en';

/**
 * A text field that carries translations.
 * `nl` is always required. `en` is optional — omit it while English copy is
 * not yet written; the `t()` helper will fall back to Dutch automatically.
 */
export interface LocaleString {
  nl: string;
  en?: string;
}

/**
 * Resolve a locale-keyed field to a plain string.
 * Falls back to `nl` when the requested locale has no copy yet.
 *
 * Usage in pages (hardcode 'nl' for now; swap to Next.js locale param later):
 *   const locale: Locale = 'nl';
 *   <h2>{t(project.intro.heading, locale)}</h2>
 */
export function t(field: LocaleString, locale: Locale = 'nl'): string {
  return locale === 'en' && field.en ? field.en : field.nl;
}

/* ── Content section types ─────────────────────────────────────────────── */

export interface TextImageSection {
  type: 'text-image';
  heading?: LocaleString;
  text: LocaleString;
  image: string;
  imageAlt: LocaleString;
}

export interface FullImageSection {
  type: 'full-image';
  src: string;
  alt: LocaleString;
  caption?: LocaleString;
}

export interface CenteredTextSection {
  type: 'centered-text';
  heading: LocaleString;
  body: LocaleString;
}

/** Optional: 2-image side-by-side grid. Omit this section if not needed. */
export interface ImageGridSection {
  type: 'image-grid';
  images: { src: string; alt: LocaleString }[];
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
  title: string;        // proper noun — no translation needed
  tags: string[];       // design discipline labels — universal enough
  date: string;         // e.g. 'September 2024' — format via Intl later
  duration: LocaleString; // e.g. { nl: '4 weken', en: '4 weeks' }
  featured?: boolean;
  heroImage: string;    // path inside /public, e.g. '/projects/dynamo/hero.webp'
  heroBg: string;       // fallback gradient for card background
  intro: {
    heading: LocaleString;
    body: LocaleString;
    links?: { label: LocaleString; href: string }[];
  };
  sections: ContentSection[];
}

/* ── Project data ───────────────────────────────────────────────────────── */

export const projects: Project[] = [
  {
    slug: 'dynamo',
    num: '05',
    title: 'Dynamo',
    tags: ['UX', 'Game Design'],
    date: 'September 2024',
    duration: { nl: '4 weken' },
    featured: false,
    heroImage: '/projects/dynamo/hero.webp',
    heroBg: 'linear-gradient(135deg, #1a3a2e 0%, #0e2218 100%)',
    intro: {
      heading: {
        nl: 'Een bordspel ontworpen om de voetbalwereld in te stappen',
      },
      body: {
        nl: 'Dynamo is een educatief bordspel dat jongeren kennis laat maken met de wereld van professioneel voetbal — van transfermarkten tot spelerscontracten. Het project combineerde UX-research, game design en visuele vormgeving tot één samenhangend ontwerp.',
      },
      links: [
        { label: { nl: 'Bekijk op GitHub' }, href: '#' },
      ],
    },
    sections: [
      {
        type: 'text-image',
        heading: { nl: 'Testing, testing en nog meer testing' },
        text: {
          nl: 'We testten het spel in meerdere rondes met echte gebruikers. Elke iteratie bracht nieuwe inzichten over de spelbalans, de leesbaarheid van de kaarten en de flow van het spel. De feedback werd direct verwerkt in het volgende prototype.',
        },
        image: '/projects/dynamo/box.webp',
        imageAlt: { nl: 'Dynamo doos' },
      },
      {
        type: 'full-image',
        src: '/projects/dynamo/overview.webp',
        alt: { nl: 'Dynamo spel overzicht' },
      },
      {
        type: 'centered-text',
        heading: { nl: 'Testing, testing en nog meer testing' },
        body: {
          nl: 'Na drie testrondes hadden we een spel dat intuïtief aanvoelde, visueel sterk was en een duidelijke leercurve had. De spelregels werden vereenvoudigd zonder de diepgang te verliezen.',
        },
      },
      {
        type: 'image-grid',
        images: [
          { src: '/projects/dynamo/box.webp', alt: { nl: 'Dynamo doos aanzicht 1' } },
          { src: '/projects/dynamo/box2.webp', alt: { nl: 'Dynamo doos aanzicht 2' } },
        ],
      },
    ],
  },

  {
    slug: 'myjam',
    num: '01',
    title: 'MyJam',
    tags: ['UX/UI', 'Backend'],
    date: 'April 2025',
    duration: { nl: '5 weken' },
    featured: true,
    heroImage: '/projects/myjam/myjamHero.png',
    heroBg: 'linear-gradient(135deg, #1a3a2e 0%, #0e2218 100%)',
    intro: {
      heading: {
        nl: 'MyJam biedt een gepersonaliseerd aanbod aan muziek om te leren op jouw instrument.',
      },
      body: {
        nl: 'MyJam is een platform dat beginnende tot gevorderde muzikanten helpt om muziek te vinden die past bij hun niveau en voorkeuren. Door de data van spotify te combineren met de input van de gebruiker, geeft MyJam een uniek aanbod aan muziek.',
      },
      links: [
        { label: { nl: 'Bekijk op GitHub' }, href: 'https://github.com/Manueldh/MyJam' },
      ],
    },
    sections: [
      {
        type: 'text-image',
        heading: { nl: 'NodeJS, Express en Spotify API' },
        text: {
          nl: 'Dit project werd geintroduceerd als kennismaking met backend development. We bouwden een server in NodeJS met Express, die communiceerde met onze Spotify Scraper om muziekdata op te halen en te verwerken. De frontend maakte gebruik van deze data om gepersonaliseerde aanbevelingen te tonen.',
        },
        image: '/projects/myjam/myjamUi.jpg',
        imageAlt: { nl: 'MyJam interface' },
      },
      {
        type: 'full-image',
        src: '/projects/myjam/myjamSongs.png',
        alt: { nl: 'MyJam platform overzicht' },
      },
      {
        type: 'centered-text',
        heading: { nl: 'Nieuwe uitdagingen.' },
        body: {
          nl: 'Het nuttige aan dit project was dat het ons liet experimenteren met security, iets wat op de frontend niet aan bod komt. We implementeerden login, registratie met hashing, het resetten van wachtwoorden op een veilige manier, en we zorgden ervoor dat de sleutels niet in de frontend terechtkwamen.',
        },
      },
    ],
  },

  {
    slug: 'coduet',
    num: '02',
    title: 'Coduet',
    tags: ['AI', 'Prototype'],
    date: 'Januari 2026',
    duration: { nl: '6 weken' },
    featured: true,
    heroImage: '/projects/coduet/CoduetChat.jpg',
    heroBg: 'linear-gradient(135deg, #182d3a 0%, #0b141a 100%)',
    intro: {
      heading: {
        nl: 'Meer grip op AI met Coduet',
      },
      body: {
        nl: 'Coduet is een code editor die programmeren met AI op een nieuwe manier aanpakt. Waar de meeste tools stimuleren om zo min mogelijk input te vragen van de gebruiker doet Coduet het tegenovergestelde. Het houdt de human door het hele proces in de loop, zodat er consistente en bewuste resultaten uit komen.',
      },
      links: [
         { label: { nl: 'Bekijk op GitHub' }, href: 'https://github.com/LukaSpelberg/Coduet' },
      ],
    },
    sections: [
      {
        type: 'text-image',
        heading: { nl: 'Locale- en API modellen' },
        text: {
          nl: 'Met Coduet heb ik onderzocht naar de kracht van lokale modellen en de voordelen van API modellen. Coduet gebruikt een hybride approach waar de simpele taken lokaal worden gedaan, terwijl deingewikkelde taken via API’s worden uitgevoerd.',
        },
        image: '/projects/coduet/coduetOptions.jpg',
        imageAlt: { nl: 'Coduet optiescherm' },
      },
      {
        type: 'full-image',
        src: '/projects/coduet/CoduetResult.png',
        alt: { nl: 'Coduet eindresultaat' },
      },
      {
        type: 'centered-text',
        heading: { nl: 'Reflecteren op gebruik AI' },
        body: {
          nl: 'Naast dat dit project qua prototype erg ver is uitgewerkt heeft het ook oprecht geinnoveert in de manier van AI gebruiken in de workflow van coderen. Ik heb onderzocht hoe de huidige situatie was met AI  en daar een kritische probleemstelling voor geschreven. Coduet is een prototype dat laat zien hoe je aI op een betere manier kan gebruiken.',
        },
      },
      {
        type: 'image-grid',
        images: [
          { src: '/projects/coduet/coduetStyleSheet.png', alt: { nl: 'Coduet stylesheet' } },
          { src: '/projects/coduet/CoduetChat.jpg', alt: { nl: 'Coduet chatscherm' } },
        ],
      },
    ],
  },

  {
    slug: 'applied-gamedesign',
    num: '03',
    title: 'Applied GameDesign',
    tags: ['Game Design', 'Prototyping'],
    date: 'Mei 2025',
    duration: { nl: '10 weken' },
    featured: true,
    heroImage: '/projects/AppliedGameDesign/8survivorswristdeck.jpg',
    heroBg: 'linear-gradient(135deg, #2a2214 0%, #14110c 100%)',
    intro: {
      heading: {
        nl: 'Mijn eerste game, en mijn eerste game in team verband.',
      },
      body: {
        nl: 'Tijdens de minor applied game design zijn we op snelle sprints van 4 tot 5 weken gaan bouwen aanonze eigen games. Eerst helemaal alleen, en daarna in teams van 4.  Ik voelde dat ik in deze periodebest uitgekeken was op het technische vlak, daarom was mijn doel om vooral te oefenen op het visuele aspect.',
      },
      links: [
        { label: { nl: 'Treescend op Itch' }, href: 'https://futtyprime.itch.io/treescend' },
        { label: { nl: '8 survivors op Itch' }, href: 'https://futtyprime.itch.io/8survivors' },
      ],
    },
    sections: [
      {
        type: 'text-image',
        heading: { nl: 'Art direction en Audio.' },
        text: {
          nl: 'De twee spellen hebben totaal verschillende direction in art. 8Survivors probeert de PSX stijl te raken, terwijl Treescend eerder voor het charmante handgemaakt gevoel gaat. Ik ontdekte bij hetmaken van de spellen ook hoe belangrijk audio is in games. Hier begon ik ook met muziek componeren waar ik erg veel plezier uit haalde.',
        },
        image: '/projects/AppliedGameDesign/8survivorsAtmosphere.jpg',
        imageAlt: { nl: '8 Survivors atmosfeer' },
      },
      {
        type: 'full-image',
        src: '/projects/AppliedGameDesign/treescendImage.png',
        alt: { nl: 'Applied Game Design placeholder visual' },
      },
      {
        type: 'centered-text',
        heading: { nl: 'Testen, testen en testen' },
        body: {
          nl: 'Bij het ontwikkelen van games staat een ding vast: je zult bugs tegekomen. Daarom was hetkey om je game door zoveel mogelijk mensen te laten testen. Ik had mijn games op sociale media gedeeld, naar echte game developers gestuurd en door vrienden laten testen. Hierdoor had ik al snel richting de 100 plays, waardoor ik veel data had om verder te itereren.',
        },
      },
      {
        type: 'image-grid',
        images: [
          { src: '/projects/AppliedGameDesign/0_FUYA.png', alt: { nl: 'Applied Game Design aanzicht 1' } },
          { src: '/projects/AppliedGameDesign/treescendEnd.jpg', alt: { nl: 'Applied Game Design aanzicht 2' } },
        ],
      },
    ],
  },

  {
    slug: 'EP',
    num: '04',
    title: 'Game Muziek EP',
    tags: ['Audio',],
    date: 'mei 2025',
    duration: { nl: '4 weken' },
    featured: false,
    heroImage: '/projects/EigenProject_EP/EPhappy.jpg',
    heroBg: 'linear-gradient(135deg, #201b2f 0%, #0f0d16 100%)',
    intro: {
      heading: {
        nl: 'Mijn eerste EP, Drafts on emotion',
      },
      body: {
        nl: 'Tijdens de Minor Applied game design heb ik me verdiept in audio. Elke week kregen we een emotie opgelegd waar we een track bij moesten maken. Ik heb geprobeerd om elke week op een aspect te letten en beter in te worden. Hierdoor ontstond een kort ep die veel verschillenderichtingen onderzoekt binnen video game muziek.',
      },
      links: [
        { label: { nl: 'Beluister op bandcamp' }, href: 'https://futty.bandcamp.com/album/drafts-on-emotion' }
      ],
    },
    sections: [
      {
        type: 'text-image',
        heading: { nl: 'Dynamiek en arrangemen' },
        text: {
          nl: 'Ik had nog nooit eerder muziek gemaakt, dus veel fundamentele concepten zoals dynamiek waren nog onbekent voor mij. In week 3, bij de battle track, probeerde ik me hier echt op te focussen. Ik deed dit door instrumenten de main melodie te laten supporten, maar ook door bijvoorbeeld met call & response te werken.',
        },
        image: '/projects/EigenProject_EP/EPbattle.jpg',
        imageAlt: { nl: 'EigenProject EP wristdeck' },
      },
      {
        type: 'full-image',
        src: '/projects/EigenProject_EP/EPcover.jpg',
        alt: { nl: 'EigenProject EP overzicht' },
      },
      {
        type: 'centered-text',
        heading: { nl: 'Inspiraties.' },
        body: {
          nl: 'Mijn liefde voor games en muziek kwamen hier perfect samen, omdat ik voor elke emotie al snel genoeg referentie materiaal had. Elke week keek ik naar een aantal van mijn favoriete soundtracks om te zien hoe zij zo een emotie tackelen. Dit hielp heel erg in het componeren .',
        },
      },
      {
        type: 'image-grid',
        images: [
          { src: '/projects/EigenProject_EP/EPhappy.jpg', alt: { nl: 'EigenProject EP cover' } },
          { src: '/projects/EigenProject_EP/EPSleepy.jpg', alt: { nl: 'EigenProject EP slaapbeeld' } },
        ],
      },
    ],
  },

  {
    slug: 'public-city-jazz',
    num: '06',
    title: 'Public City Jazz',
    tags: ['Branding', 'UI'],
    date: 'November 2024',
    duration: { nl: '3 weken' },
    featured: false,
    heroImage: '/projects/publicCityJazz/cityjazzHero.png',
    heroBg: 'linear-gradient(135deg, #1e1a0e 0%, #2a1e08 100%)',
    intro: {
      heading: { nl: 'Een onepager voor een jazzfestival van de gemeente Rotterdam' },
      body: {
        nl: 'Public City Jazz is een fictief jazzfestival voor de gemeente Rotterdam. In het project moest je een balans vinden tussen de huisstijl van de gemeente en de vrije stijl van een jazzfestival. Het resultaat is een mix van beide werelden.',
      },
      links: [
        { label: { nl: 'Figma bestand' }, href: 'https://www.figma.com/design/bQSrG082KVxfQHhf9CEBXc/Untitled?node-id=0-1&t=2NoGHdd3FufgHCTy-0' },
        { label: { nl: 'Motion video' }, href: 'https://www.youtube.com/watch?v=5UczEn_jl9Y' }
      ],
    },
    sections: [
      {
        type: 'text-image',
        heading: { nl: 'Identiteit vanuit het ritme' },
        text: {
          nl: 'De visuele stijl is opgebouwd door tekst elementen met de groene kleur van Rotterdam te combineren met de structureerde chaos van jazz. De achtergrond zit vol met willekeurige vormen die samen een mooi geheel vormen.',
        },
        image: '/projects/publicCityJazz/jazzlayout.jpg',
        imageAlt: { nl: 'Public City Jazz poster' },
      },
      {
        type: 'full-image',
        src: '/projects/publicCityJazz/schetsen.jpg',
        alt: { nl: 'Public City Jazz merkidentiteit overzicht' },
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
