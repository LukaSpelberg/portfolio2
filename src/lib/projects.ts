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

/**
 * A YouTube embed. `youtube` may be a bare video id ("lbi_bW-RJkM") or any
 * full YouTube URL — the YouTubeEmbed component normalises it.
 */
export interface VideoEmbed {
  youtube: string;
  title?: LocaleString;
}

export interface TextImageSection {
  type: 'text-image';
  heading?: LocaleString;
  text: LocaleString;
  /** Provide EITHER an image… */
  image?: string;
  imageAlt?: LocaleString;
  /** …OR a video. If `video` is set it renders instead of the image. */
  video?: VideoEmbed;
}

/** Full-width YouTube embed, optionally captioned. */
export interface VideoSection {
  type: 'video';
  youtube: string;
  title?: LocaleString;
  caption?: LocaleString;
}

/** 2-up grid of YouTube embeds side by side (mirrors image-grid). */
export interface VideoGridSection {
  type: 'video-grid';
  videos: { youtube: string; title?: LocaleString; caption?: LocaleString }[];
}

/**
 * Tabbed deep-dive — a "game/character select" switcher. Each variant has its
 * own label and its own stack of sections; clicking a tab swaps the content.
 * Use for a project that bundles multiple distinct sub-projects.
 */
export interface VariantSwitchSection {
  type: 'variants';
  label?: LocaleString;   // small heading above the switcher
  variants: {
    id: string;           // stable key, e.g. '8survivors'
    label: string;        // tab text (proper noun — no translation needed)
    thumb?: string;       // selector-card thumbnail
    tag?: string;         // small label under the name, e.g. 'PSX horror'
    links?: { label: LocaleString; href: string }[];  // per-game CTAs (e.g. Itch)
    sections: ContentSection[];
  }[];
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

/** 2-up side-by-side grid. Each cell is an image OR a YouTube video, so you
 *  can pack e.g. a screenshot next to a trailer on the same line. */
export type GridItem =
  | { src: string; alt: LocaleString }
  | { video: string; title?: LocaleString };

export interface ImageGridSection {
  type: 'image-grid';
  images: GridItem[];
}

export type ContentSection =
  | TextImageSection
  | FullImageSection
  | CenteredTextSection
  | ImageGridSection
  | VideoSection
  | VideoGridSection
  | VariantSwitchSection;

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
  cardImage?: string;     // optional darker/atmospheric image for card film effect — falls back to heroImage
  heroImageNatural?: boolean; // show hero at its natural aspect instead of the 5:2 cover crop
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
    slug: 'dome-divers',
    num: '01',
    title: 'Planetarium Artis - Dome Divers',
    tags: ['Applied Game Design', 'Asset Design'],
    date: 'Mei 2026',
    duration: { nl: '5 weken', en: '5 weeks' },
    featured: true,
    heroImage: '/projects/DomeDivers/sfeerfotoDome.webp',
    heroImageNatural: true,
    heroBg: 'linear-gradient(135deg, #18183a 0%, #0b141a 100%)',
    intro: {
      heading: {
        nl: 'Een game voor het Artis Planetarium',
        en: 'A game for the Artis Planetarium',
      },
      body: {
        nl: 'Dome Divers is een game die is ontworpen voor het planetarium van Artis. De opdracht was vrij breed: maak een game voor een jonge doelgroep die de waardes van Artis reflecteert. Wij hebben een game gemaakt die de impact van de mens op de oceaan laat zien, en de speler laat reflecteren op zijn rol daarin.',
        en: 'Dome Divers is a game designed for the Artis Planetarium. The brief was quite broad: create a game for a young audience that reflects the values of Artis. We have created a game that shows the impact of humans on the ocean, and encourages players to reflect on their role in it.',
      },
      links: [
        {
          label: { nl: 'Bekijk de DesignRationale', en: 'View the DesignRationale' },
          href: 'https://docs.google.com/document/d/1opFDAsGA1EDJSLZXDtCzWEcVZtQgOLCDgFfcWiWjYjg/edit?tab=t.0#heading=h.buamc98bkldi',
        },
      ],
    },
    sections: [
      {
        type: 'text-image',
        heading: {
          nl: 'Designen voor een dome',
          en: 'Designing for a dome',
        },
        text: {
          nl: 'Designen voor een dome was een uitdaging waar weinig referentiemateriaal voor was. Er zaten veel unieke design challenges aan verbonden. Hoe zorg je ervoor dat het voor elke zitplaats goed zichtbaar is? Hoe zorg je ervoor dat assets niet vervormen door de projectie? Hoe creeer je een gevoel van diepte in een projectie? Dit waren allemaal uitdagingen die we moesten tackelen.',
          en: 'Designing for a dome was a challenge with little reference material. There were many unique design challenges involved. How do you ensure that it is visible from every seat? How do you prevent assets from distorting due to projection? How do you create a sense of depth in a projection? These were all challenges we had to tackle.',
        },
        image: '/projects/DomeDivers/scenepicture.png',
        imageAlt: { nl: 'Dome Divers — scenepicture', en: 'Dome Divers — scenepicture' },
      },
      { 
      type: 'video',
      youtube: 'https://youtu.be/cCfBLPOqoxY',  
      title:   { nl: 'planetarium gameplay', en: 'planetarium gameplay' },
      },
      {
        type: 'centered-text',
        heading: {
          nl: 'Assets en contrast',
          en: 'Assets and contrast',
        },
        body: {
          nl: 'Het planetarium van Artis heeft een laag contrast en een lage helderheid. Daarom moesten we hier constant rekening mee houden bij het maken van de assets. We hebben alle assets getexture paint en met shader graphs gewerkt. We hadden tenslotte met een Dome Calibrator ultieme controle over de kleuren en het contrast van onze assets',
          en: 'The Artis planetarium has low contrast and low brightness. Therefore, we had to constantly take this into account when creating the assets. We texture painted all assets and worked with shader graphs. After all, with a self-made Dome Calibrator, we had ultimate control over the colors and contrast of our assets.',
        },
      },
      {
        type: 'image-grid',
        images: [
          { src: '/projects/DomeDivers/nacht.png', alt: { nl: 'Dome Divers — nacht', en: 'Dome Divers — night' } },
          { src: '/projects/DomeDivers/dag.png', alt: { nl: 'Dome Divers — dag', en: 'Dome Divers — day' } },
        ],
      },
    ],
  },

  {
    slug: 'applied-gamedesign',
    num: '02',
    title: 'Applied GameDesign',
    tags: ['Game Design', 'Prototyping'],
    date: 'Mei 2026',
    duration: { nl: '10 weken', en: '10 weeks' },
    featured: true,
    heroImage: '/projects/AppliedGameDesign/8survivorswristdeck.jpg',
    cardImage: '/projects/AppliedGameDesign/games.png',
    heroBg: 'linear-gradient(135deg, #2a2214 0%, #14110c 100%)',
    intro: {
      heading: {
        nl: 'Mijn eerste games.',
        en: 'My first games.',
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
          label: { nl: '8 Survivors op Itch', en: '8 Survivors on Itch' },
          href: 'https://futtyprime.itch.io/8survivors',
        },
      ],
    },
    sections: [
      {
        // ── Game switcher — two self-contained games ──────────────────────
        // Each game follows the standard rhythm: paragraph + picture →
        // paragraph → picture(s) → trailer. The shared "asset design" and
        // "testing" themes are folded into each game's second paragraph.
        type: 'variants',
        label: { nl: 'Kies een game', en: 'Select a game' },
        variants: [
          {
            id: '8survivors',
            label: '8 Survivors',
            thumb: '/projects/AppliedGameDesign/8survivorswristdeck.jpg',
            tag: 'PSX cautionary tale',
            sections: [
              {
                type: 'text-image',
                heading: { nl: 'PSX-stijl & sfeer', en: 'PSX style & atmosphere' },
                text: {
                  nl: 'Met een strakke deadline van 4 weken was het belangrijk dat dit project goed gescoped werd. Met de PSX stijl als uitgangspunt kan je met vrij simpele assets toch een hele sterke sfeer neerzetten. Daardoor konden we in korte tijd veel content maken wat de storyline versterkte.',
                  en: 'With a tight 4-week deadline, it was important to scope this project well. Using the PSX style as a starting point, you can create a strong atmosphere with relatively simple assets. This allowed us to produce a lot of content in a short time that reinforced the storyline.',
                },
                image: '/projects/AppliedGameDesign/8survivorsatmosphere.jpg',
                imageAlt: { nl: '8 Survivors sfeerbeeld', en: '8 Survivors atmosphere' },
              },
              {
                type: 'full-image',
                src: '/projects/AppliedGameDesign/Frame3.png',
                alt: { nl: '8 Survivors screenshot', en: '8 Survivors screenshot' },
              },
              {
                type: 'centered-text',
                heading: { nl: 'Veder dan 3D assets', en: 'More than 3D assets' },
                body: {
                  nl: 'In dit project ontdekte ik dat assets verder gaan dan puur 3d modellen. Dingen zoals lighting en post-processing zijn minstens net zo belangrijk. Deze onderdelen hebben dit project dan ook naar een hoger niveau getilt.',
                  en: 'In this project I discovered that assets go beyond just 3D models. Elements like lighting and post-processing are equally important. These components elevated this project to a higher level.',
                },
              },
              {
                type: 'image-grid',
                images: [
                  { src: '/projects/AppliedGameDesign/sfeerfoto.png', alt: { nl: '8 Survivors aanzicht', en: '8 Survivors view' } },
                  { video: 'https://www.youtube.com/watch?v=_2Voyxx44sM', title: { nl: '8 Survivors — walkthrough', en: '8 Survivors — walkthrough' } },
                ],
              },
            ],
          },
          {
            id: 'treescend',
            label: 'Treescend',
            thumb: '/projects/AppliedGameDesign/treescendImage.png',
            tag: 'Handgemaakte platformer',
            sections: [
              {
                type: 'text-image',
                heading: { nl: 'Mijn eeerste game', en: 'My first game' },
                text: {
                  nl: 'Treescend was mijn eerste game. De briefing was vrij simpel: maak een 2D platformer game. Dit was expres zo vrij, zodat je experimenteerde met elke rol en ontdekte wat jij leuk vond. Ik heb ervoor gekozen om een puzzle platformer te maken, met een art style geinspireerd op Neva en GRIS.',
                  en: 'Treescend was my first game. The brief was quite simple: create a 2D platformer game. This was intentionally open-ended, allowing you to experiment with every role and discover what you enjoyed. I chose to create a puzzle platformer, with an art style inspired by Neva and GRIS.',
                },
                image: '/projects/AppliedGameDesign/treescendImage.png',
                imageAlt: { nl: 'Treescend screenshot', en: 'Treescend screenshot' },
              },
              {
                type: 'full-image',
                src: '/projects/AppliedGameDesign/treescendEnd.jpg',
                alt: { nl: 'Treescend eindscherm', en: 'Treescend end screen' },
              },
              {
                type: 'centered-text',
                heading: { nl: 'Testen, testen en testen', en: 'Test, test and test again' },
                body: {
                  nl: 'Treescend leerde me hoe belangrijk testen is. Ik deelde het op sociale media, stuurde het naar echte game developers en liet vrienden spelen. Richting de 100 plays gaf me genoeg data om te blijven itereren op allerij verschillende dingen. Daarnaast vond ik het ook een leuk proces om het te delen met de wereld.',
                  en: 'Treescend taught me the importance of testing. I shared it on social media, sent it to real game developers, and had friends play it. By the time I reached 100 plays, I had enough data to continue iterating on various aspects. Additionally, I found it enjoyable to share the process with the world.',
                },
              },
              {
                type: 'video',
                youtube: 'https://www.youtube.com/watch?v=fBbrcejkDuI',
                title: { nl: 'Treescend — walkthrough', en: 'Treescend — walkthrough' },
                caption: { nl: 'Treescend — walkthrough', en: 'Treescend — walkthrough' },
              },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'coduet',
    num: '03',
    title: 'Coduet',
    tags: ['AI', 'Prototype'],
    date: 'Januari 2026',
    duration: { nl: '6 weken', en: '6 weeks' },
    featured: true,
    heroImage: '/projects/coduet/coduetposter.png',
    heroImageNatural: true,
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
        {
          label: { nl: 'bekijk de demo', en: 'View the demo' },
          href: 'https://youtu.be/lbi_bW-RJkM',
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
    slug: 'myjam',
    num: '04',
    title: 'MyJam',
    tags: ['UX/UI', 'Backend'],
    date: 'April 2025',
    duration: { nl: '5 weken', en: '5 weeks' },
    featured: false,
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
          en: 'The great thing about this project was that it let us experiment with security, something you rarely encounter on the frontend. We implemented login, registration with hashing, secure password reset flows, and made sure keys never ended up in the frontend.',
        },
      },
    ],
  },

  {
    slug: 'EP',
    num: '05',
    title: 'Game Muziek EP',
    tags: ['Audio'],
    date: 'mei 2026',
    duration: { nl: '4 weken', en: '4 weeks' },
    featured: false,
    heroImage: '/projects/EigenProject_EP/happy.jpg',
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
          { src: '/projects/EigenProject_EP/happy.jpg', alt: { nl: 'EP happy track cover', en: 'EP happy track cover' } },
          { src: '/projects/EigenProject_EP/EPSleepy.jpg', alt: { nl: 'EP sleepy track cover', en: 'EP sleepy track cover' } },
        ],
      },
    ],
  },

   {
    slug: 'dynamo',
    num: '06',
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
        nl: 'Dynamo is een bordspel dat mensen introduceerd tot de wereld van voetbal. Maak kennis met spelers, clubs en echte verhalen uit de voetbalwereld. Bij het ontwikkelen van het spel hadden we verschillende doelgroepen, wat het een interessante UX uitdaging maakte.',
        en: 'Dynamo is a board game that introduces people to the world of football. Get to know players, clubs and real stories from the football world. Developing the game involved different target audiences, which made it an interesting UX challenge.',
      },
      links: [
        {
          label: { nl: 'bekijk Figma bestand', en: 'View Figma File' },
          href: 'https://www.figma.com/design/dYkh6eVfgBgPHogDFbzNJA/Untitled?node-id=0-1&t=wmH9B7RoUBhB7Pm2-1',
        },
      ],
    },
    sections: [
      {
        type: 'text-image',
        heading: {
          nl: 'De introductie van de voetbalwereld.',
          en: 'Introducing the world of football.',
        },
        text: {
          nl: 'Om nieuwe mensen in de voetbalwereld te introduceren, hebben we bij het ontwerpen van de kaarten allemaal echte verhalen uit de voetbalwereld gebruikt. Door deze verhalen te gebruiken ontdekken spelers direct de leuke en interessante kanten van voetbal.',
          en: 'To introduce new people to the world of football, we used real stories from the football world in the design of the cards. By using these stories, players immediately discover the fun and interesting sides of football.',
        },
        image: '/projects/dynamo/box.jpg',
        imageAlt: { nl: 'Dynamo doos', en: 'Dynamo box' },
      },
      {
        type: 'full-image',
        src: '/projects/dynamo/overview.jpg',
        alt: { nl: 'Dynamo spel overzicht', en: 'Dynamo game overview' },
      },
      {
        type: 'centered-text',
        heading: {
          nl: 'Gameplay Loop en iteraties.',
          en: 'Gameplay Loop and iterations.',
        },
        body: {
          nl: 'Het ontwikkelen van de gameplay loop was een iteratief proces. We begonnen met een voetbal versie van monopoly, maar al snel groeide het uit tot een uniek spel dat elementen van de videogame Football Manager intregreerd in een bordspel. We hebben veel iteraties gedaan om het spel zo leuk mogelijk te maken.',
          en: 'The development of the gameplay loop was an iterative process. We started with a football version of Monopoly, but it quickly evolved into a unique game that integrates elements of the video game Football Manager into a board game. We did many iterations to make the game as fun as possible.',
        },
      },
      {
        type: 'image-grid',
        images: [
          { src: '/projects/dynamo/box.jpg', alt: { nl: 'Dynamo doos aanzicht 1', en: 'Dynamo box view 1' } },
          { src: '/projects/dynamo/box2.jpg', alt: { nl: 'Dynamo doos aanzicht 2', en: 'Dynamo box view 2' } },
        ],
      },
    ],
  },

  {
    slug: 'public-city-jazz',
    num: '07',
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
