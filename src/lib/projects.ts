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
  num: string;            // '01', '02', '03' — used for card ghost text
  title: string;          // proper noun — no translation needed
  tags: string[];         // design discipline labels — universal enough
  date: string;           // e.g. 'September 2024' — format via Intl later
  duration: LocaleString; // e.g. { nl: '4 weken', en: '4 weeks' }
  featured?: boolean;
  heroImage: string;      // path inside /public, e.g. '/projects/dynamo/hero.webp'
  heroBg: string;         // fallback gradient for card background
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
    duration: { nl: '4 weken', en: '4 weeks' },
    featured: false,
    heroImage: '/projects/dynamo/hero.webp',
    heroBg: 'linear-gradient(135deg, #1a3a2e 0%, #0e2218 100%)',
    intro: {
      heading: {
        nl: 'Een bordspel ontworpen om de voetbalwereld in te stappen',
        en: 'A board game designed to step into the world of football',
      },
      body: {
        nl: 'Dynamo is een educatief bordspel dat jongeren kennis laat maken met de wereld van professioneel voetbal — van transfermarkten tot spelerscontracten. Het project combineerde UX-research, game design en visuele vormgeving tot één samenhangend ontwerp.',
        en: 'Dynamo is an educational board game that introduces young people to the world of professional football — from transfer markets to player contracts. The project combined UX research, game design and visual design into one cohesive product.',
      },
      links: [
        {
          label: { nl: 'Bekijk op GitHub', en: 'View on GitHub' },
          href: '#',
        },
      ],
    },
    sections: [
      {
        type: 'text-image',
        heading: {
          nl: 'Testing, testing en nog meer testing',
          en: 'Testing, testing and more testing',
        },
        text: {
          nl: 'We testten het spel in meerdere rondes met echte gebruikers. Elke iteratie bracht nieuwe inzichten over de spelbalans, de leesbaarheid van de kaarten en de flow van het spel. De feedback werd direct verwerkt in het volgende prototype.',
          en: 'We tested the game in multiple rounds with real users. Each iteration brought new insights about game balance, card readability and the flow of the game. Feedback was immediately incorporated into the next prototype.',
        },
        image: '/projects/dynamo/box.webp',
        imageAlt: { nl: 'Dynamo doos', en: 'Dynamo box' },
      },
      {
        type: 'full-image',
        src: '/projects/dynamo/overview.webp',
        alt: { nl: 'Dynamo spel overzicht', en: 'Dynamo game overview' },
      },
      {
        type: 'centered-text',
        heading: {
          nl: 'Testing, testing en nog meer testing',
          en: 'Testing, testing and more testing',
        },
        body: {
          nl: 'Na drie testrondes hadden we een spel dat intuïtief aanvoelde, visueel sterk was en een duidelijke leercurve had. De spelregels werden vereenvoudigd zonder de diepgang te verliezen.',
          en: 'After three test rounds we had a game that felt intuitive, looked visually strong and had a clear learning curve. The rules were simplified without losing depth.',
        },
      },
      {
        type: 'image-grid',
        images: [
          { src: '/projects/dynamo/box.webp', alt: { nl: 'Dynamo doos aanzicht 1', en: 'Dynamo box view 1' } },
          { src: '/projects/dynamo/box2.webp', alt: { nl: 'Dynamo doos aanzicht 2', en: 'Dynamo box view 2' } },
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
    duration: { nl: '5 weken', en: '5 weeks' },
    featured: true,
    heroImage: '/projects/myjam/myjamHero.png',
    heroBg: 'linear-gradient(135deg, #1a3a2e 0%, #0e2218 100%)',
    intro: {
      heading: {
        nl: 'MyJam biedt een gepersonaliseerd aanbod aan muziek om te leren op jouw instrument.',
        en: 'MyJam offers a personalised selection of music to learn on your instrument.',
      },
      body: {
        nl: 'MyJam is een platform dat beginnende tot gevorderde muzikanten helpt om muziek te vinden die past bij hun niveau en voorkeuren. Door de data van spotify te combineren met de input van de gebruiker, geeft MyJam een uniek aanbod aan muziek.',
        en: 'MyJam is a platform that helps beginner to advanced musicians find music that matches their level and preferences. By combining Spotify data with user input, MyJam provides a unique music selection.',
      },
      links: [
        {
          label: { nl: 'Bekijk op GitHub', en: 'View on GitHub' },
          href: 'https://github.com/Manueldh/MyJam',
        },
      ],
    },
    sections: [
      {
        type: 'text-image',
        heading: {
          nl: 'NodeJS, Express en Spotify API',
          en: 'NodeJS, Express and Spotify API',
        },
        text: {
          nl: 'Dit project werd geintroduceerd als kennismaking met backend development. We bouwden een server in NodeJS met Express, die communiceerde met onze Spotify Scraper om muziekdata op te halen en te verwerken. De frontend maakte gebruik van deze data om gepersonaliseerde aanbevelingen te tonen.',
          en: 'This project was introduced as a first step into backend development. We built a server in NodeJS with Express that communicated with our Spotify Scraper to fetch and process music data. The frontend used this data to display personalised recommendations.',
        },
        image: '/projects/myjam/myjamUi.jpg',
        imageAlt: { nl: 'MyJam interface', en: 'MyJam interface' },
      },
      {
        type: 'full-image',
        src: '/projects/myjam/myjamSongs.png',
        alt: { nl: 'MyJam platform overzicht', en: 'MyJam platform overview' },
      },
      {
        type: 'centered-text',
        heading: {
          nl: 'Nieuwe uitdagingen.',
          en: 'New challenges.',
        },
        body: {
          nl: 'Het nuttige aan dit project was dat het ons liet experimenteren met security, iets wat op de frontend niet aan bod komt. We implementeerden login, registratie met hashing, het resetten van wachtwoorden op een veilige manier, en we zorgden ervoor dat de sleutels niet in de frontend terechtkwamen.',
          en: 'The great thing about this project was that it let us experiment with security — something you rarely encounter on the frontend. We implemented login, registration with hashing, secure password reset flows, and made sure keys never ended up in the frontend.',
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
    duration: { nl: '6 weken', en: '6 weeks' },
    featured: true,
    heroImage: '/projects/coduet/CoduetChat.jpg',
    heroBg: 'linear-gradient(135deg, #182d3a 0%, #0b141a 100%)',
    intro: {
      heading: {
        nl: 'Meer grip op AI met Coduet',
        en: 'More control over AI with Coduet',
      },
      body: {
        nl: 'Coduet is een code editor die programmeren met AI op een nieuwe manier aanpakt. Waar de meeste tools stimuleren om zo min mogelijk input te vragen van de gebruiker doet Coduet het tegenovergestelde. Het houdt de human door het hele proces in de loop, zodat er consistente en bewuste resultaten uit komen.',
        en: 'Coduet is a code editor that approaches programming with AI in a new way. Where most tools aim to minimise user input, Coduet does the opposite. It keeps the human in the loop throughout the entire process, producing consistent and intentional results.',
      },
      links: [
        {
          label: { nl: 'Bekijk op GitHub', en: 'View on GitHub' },
          href: 'https://github.com/LukaSpelberg/Coduet',
        },
      ],
    },
    sections: [
      {
        type: 'text-image',
        heading: {
          nl: 'Locale- en API modellen',
          en: 'Local and API models',
        },
        text: {
          nl: 'Met Coduet heb ik onderzocht naar de kracht van lokale modellen en de voordelen van API modellen. Coduet gebruikt een hybride approach waar de simpele taken lokaal worden gedaan, terwijl de ingewikkelde taken via API\'s worden uitgevoerd.',
          en: 'With Coduet I explored the power of local models and the advantages of API models. Coduet uses a hybrid approach where simple tasks are handled locally, while more complex tasks are processed via APIs.',
        },
        image: '/projects/coduet/coduetOptions.jpg',
        imageAlt: { nl: 'Coduet optiescherm', en: 'Coduet options screen' },
      },
      {
        type: 'full-image',
        src: '/projects/coduet/CoduetResult.png',
        alt: { nl: 'Coduet eindresultaat', en: 'Coduet final result' },
      },
      {
        type: 'centered-text',
        heading: {
          nl: 'Reflecteren op gebruik AI',
          en: 'Reflecting on AI usage',
        },
        body: {
          nl: 'Naast dat dit project qua prototype erg ver is uitgewerkt heeft het ook oprecht geïnnoveerd in de manier van AI gebruiken in de workflow van coderen. Ik heb onderzocht hoe de huidige situatie was met AI en daar een kritische probleemstelling voor geschreven. Coduet is een prototype dat laat zien hoe je AI op een betere manier kan gebruiken.',
          en: 'Beyond being a well-developed prototype, this project genuinely innovated in how AI is used within a coding workflow. I researched the current state of AI-assisted coding and wrote a critical problem statement for it. Coduet is a prototype that shows how AI can be used in a more deliberate way.',
        },
      },
      {
        type: 'image-grid',
        images: [
          { src: '/projects/coduet/coduetStyleSheet.png', alt: { nl: 'Coduet stylesheet', en: 'Coduet stylesheet' } },
          { src: '/projects/coduet/CoduetChat.jpg', alt: { nl: 'Coduet chatscherm', en: 'Coduet chat screen' } },
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
    duration: { nl: '10 weken', en: '10 weeks' },
    featured: true,
    heroImage: '/projects/AppliedGameDesign/8survivorswristdeck.jpg',
    heroBg: 'linear-gradient(135deg, #2a2214 0%, #14110c 100%)',
    intro: {
      heading: {
        nl: 'Mijn eerste game, en mijn eerste game in teamverband.',
        en: 'My first game, and my first game as part of a team.',
      },
      body: {
        nl: 'Tijdens de minor applied game design zijn we op snelle sprints van 4 tot 5 weken gaan bouwen aan onze eigen games. Eerst helemaal alleen, en daarna in teams van 4. Ik voelde dat ik in deze periode best uitgekeken was op het technische vlak, daarom was mijn doel om vooral te oefenen op het visuele aspect.',
        en: 'During the Applied Game Design minor we built our own games in fast sprints of 4 to 5 weeks — first entirely alone, then in teams of four. I felt fairly confident on the technical side by then, so my goal was primarily to practise the visual aspect.',
      },
      links: [
        {
          label: { nl: 'Treescend op Itch', en: 'Treescend on Itch' },
          href: 'https://futtyprime.itch.io/treescend',
        },
        {
          label: { nl: '8 survivors op Itch', en: '8 Survivors on Itch' },
          href: 'https://futtyprime.itch.io/8survivors',
        },
      ],
    },
    sections: [
      {
        type: 'text-image',
        heading: {
          nl: 'Art direction en Audio.',
          en: 'Art direction and Audio.',
        },
        text: {
          nl: 'De twee spellen hebben totaal verschillende direction in art. 8Survivors probeert de PSX stijl te raken, terwijl Treescend eerder voor het charmante handgemaakt gevoel gaat. Ik ontdekte bij het maken van de spellen ook hoe belangrijk audio is in games. Hier begon ik ook met muziek componeren waar ik erg veel plezier uit haalde.',
          en: 'The two games have completely different art directions. 8Survivors aims for the PSX style, while Treescend goes for a charming handmade feel. Making the games also made me realise how important audio is in games. This is where I started composing music, which I found enormously enjoyable.',
        },
        image: '/projects/AppliedGameDesign/8survivorsAtmosphere.jpg',
        imageAlt: { nl: '8 Survivors atmosfeer', en: '8 Survivors atmosphere' },
      },
      {
        type: 'full-image',
        src: '/projects/AppliedGameDesign/treescendImage.png',
        alt: { nl: 'Treescend screenshot', en: 'Treescend screenshot' },
      },
      {
        type: 'centered-text',
        heading: {
          nl: 'Testen, testen en testen',
          en: 'Test, test and test again',
        },
        body: {
          nl: 'Bij het ontwikkelen van games staat een ding vast: je zult bugs tegenkomen. Daarom was het key om je game door zoveel mogelijk mensen te laten testen. Ik had mijn games op sociale media gedeeld, naar echte game developers gestuurd en door vrienden laten testen. Hierdoor had ik al snel richting de 100 plays, waardoor ik veel data had om verder te itereren.',
          en: 'When developing games, one thing is certain: you will run into bugs. That\'s why getting your game tested by as many people as possible is key. I shared my games on social media, sent them to actual game developers and had friends test them. This quickly brought me close to 100 plays, giving me plenty of data to iterate on.',
        },
      },
      {
        type: 'image-grid',
        images: [
          { src: '/projects/AppliedGameDesign/0_FUYA.png', alt: { nl: 'Applied Game Design aanzicht 1', en: 'Applied Game Design view 1' } },
          { src: '/projects/AppliedGameDesign/treescendEnd.jpg', alt: { nl: 'Applied Game Design aanzicht 2', en: 'Applied Game Design view 2' } },
        ],
      },
    ],
  },

  {
    slug: 'EP',
    num: '04',
    title: 'Game Muziek EP',
    tags: ['Audio'],
    date: 'mei 2025',
    duration: { nl: '4 weken', en: '4 weeks' },
    featured: false,
    heroImage: '/projects/EigenProject_EP/EPhappy.jpg',
    heroBg: 'linear-gradient(135deg, #201b2f 0%, #0f0d16 100%)',
    intro: {
      heading: {
        nl: 'Mijn eerste EP, Drafts on Emotion',
        en: 'My first EP, Drafts on Emotion',
      },
      body: {
        nl: 'Tijdens de Minor Applied game design heb ik me verdiept in audio. Elke week kregen we een emotie opgelegd waar we een track bij moesten maken. Ik heb geprobeerd om elke week op een aspect te letten en beter in te worden. Hierdoor ontstond een kort EP die veel verschillende richtingen onderzoekt binnen video game muziek.',
        en: 'During the Applied Game Design minor I dove deep into audio. Each week we were given an emotion and had to create a track for it. I tried to focus on a different aspect each week and improve at it. The result is a short EP that explores many different directions within video game music.',
      },
      links: [
        {
          label: { nl: 'Beluister op Bandcamp', en: 'Listen on Bandcamp' },
          href: 'https://futty.bandcamp.com/album/drafts-on-emotion',
        },
      ],
    },
    sections: [
      {
        type: 'text-image',
        heading: {
          nl: 'Dynamiek en arrangement',
          en: 'Dynamics and arrangement',
        },
        text: {
          nl: 'Ik had nog nooit eerder muziek gemaakt, dus veel fundamentele concepten zoals dynamiek waren nog onbekend voor mij. In week 3, bij de battle track, probeerde ik me hier echt op te focussen. Ik deed dit door instrumenten de main melodie te laten supporten, maar ook door bijvoorbeeld met call & response te werken.',
          en: 'I had never made music before, so many fundamental concepts like dynamics were still unknown to me. In week 3, on the battle track, I really tried to focus on this. I did so by having instruments support the main melody, and by working with call & response.',
        },
        image: '/projects/EigenProject_EP/EPbattle.jpg',
        imageAlt: { nl: 'EP battle track', en: 'EP battle track' },
      },
      {
        type: 'full-image',
        src: '/projects/EigenProject_EP/EPcover.jpg',
        alt: { nl: 'EP cover', en: 'EP cover' },
      },
      {
        type: 'centered-text',
        heading: {
          nl: 'Inspiraties.',
          en: 'Inspirations.',
        },
        body: {
          nl: 'Mijn liefde voor games en muziek kwamen hier perfect samen, omdat ik voor elke emotie al snel genoeg referentiemateriaal had. Elke week keek ik naar een aantal van mijn favoriete soundtracks om te zien hoe zij zo een emotie tackelen. Dit hielp heel erg in het componeren.',
          en: 'My love for games and music came together perfectly here, because for every emotion I already had plenty of reference material. Each week I would study some of my favourite soundtracks to see how they tackle a particular emotion. This was enormously helpful in the composing process.',
        },
      },
      {
        type: 'image-grid',
        images: [
          { src: '/projects/EigenProject_EP/EPhappy.jpg', alt: { nl: 'EP happy track cover', en: 'EP happy track cover' } },
          { src: '/projects/EigenProject_EP/EPSleepy.jpg', alt: { nl: 'EP sleepy track cover', en: 'EP sleepy track cover' } },
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
    duration: { nl: '3 weken', en: '3 weeks' },
    featured: false,
    heroImage: '/projects/publicCityJazz/cityjazzHero.png',
    heroBg: 'linear-gradient(135deg, #1e1a0e 0%, #2a1e08 100%)',
    intro: {
      heading: {
        nl: 'Een onepager voor een jazzfestival van de gemeente Rotterdam',
        en: 'A one-pager for a jazz festival by the municipality of Rotterdam',
      },
      body: {
        nl: 'Public City Jazz is een fictief jazzfestival voor de gemeente Rotterdam. In het project moest je een balans vinden tussen de huisstijl van de gemeente en de vrije stijl van een jazzfestival. Het resultaat is een mix van beide werelden.',
        en: 'Public City Jazz is a fictional jazz festival for the municipality of Rotterdam. The project required finding a balance between the municipality\'s house style and the free spirit of a jazz festival. The result is a blend of both worlds.',
      },
      links: [
        {
          label: { nl: 'Figma bestand', en: 'Figma file' },
          href: 'https://www.figma.com/design/bQSrG082KVxfQHhf9CEBXc/Untitled?node-id=0-1&t=2NoGHdd3FufgHCTy-0',
        },
        {
          label: { nl: 'Motion video', en: 'Motion video' },
          href: 'https://www.youtube.com/watch?v=5UczEn_jl9Y',
        },
      ],
    },
    sections: [
      {
        type: 'text-image',
        heading: {
          nl: 'Identiteit vanuit het ritme',
          en: 'Identity from the rhythm',
        },
        text: {
          nl: 'De visuele stijl is opgebouwd door tekstelementen met de groene kleur van Rotterdam te combineren met de gestructureerde chaos van jazz. De achtergrond zit vol met willekeurige vormen die samen een mooi geheel vormen.',
          en: 'The visual style was built by combining text elements with Rotterdam\'s green colour and the structured chaos of jazz. The background is filled with random shapes that together form a cohesive whole.',
        },
        image: '/projects/publicCityJazz/jazzlayout.jpg',
        imageAlt: { nl: 'Public City Jazz poster', en: 'Public City Jazz poster' },
      },
      {
        type: 'full-image',
        src: '/projects/publicCityJazz/schetsen.jpg',
        alt: { nl: 'Public City Jazz schetsen', en: 'Public City Jazz sketches' },
      },
    ],
  },
];

/* ── Helpers ────────────────────────────────────────────────────────────── */

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

/**
 * Returns a randomised selection of other projects for the "Meer projecten"
 * section. Uses a Fisher-Yates shuffle so the order varies each build.
 */
export function getRecommended(currentSlug: string, count = 2): Project[] {
  const others = projects.filter(p => p.slug !== currentSlug);
  // Fisher-Yates shuffle
  for (let i = others.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [others[i], others[j]] = [others[j], others[i]];
  }
  return others.slice(0, count);
}
