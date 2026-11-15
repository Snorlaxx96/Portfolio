// Single source of truth for every word on the site.
// Projects marked `sample: true` are placeholders. Replace them with real work before launch.

export type CoverKind = "grid" | "glyph" | "plan" | "interface" | "orbit" | "stripe";

export type Project = {
  slug: string;
  title: string;
  client: string;
  discipline: string;
  year: number;
  summary: string;
  role: string[];
  cover: CoverKind;
  sample: boolean;
};

export const site = {
  name: "Mhyco Giselo P. Bunao",
  wordmark: "BUNAO",
  role: "Multidisciplinary designer",
  intro: "Identity, interface and space, drawn with the same pencil.",
  lede: "I build brands, products and rooms that hold their shape long after the first look.",
  availability: "Booking projects for early 2027",
  // Replace with your real address. example.com is a reserved domain and delivers nowhere.
  email: "hello@example.com",
  socials: [] as { label: string; href: string }[],
};

export const nav = [
  { id: "index", label: "Index" },
  { id: "philosophy", label: "Philosophy" },
  { id: "process", label: "Process" },
  { id: "works", label: "Works" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
] as const;

export const manifesto =
  "Good design is not louder. It is more certain. Every line I draw has to earn its place, survive a second look, and still make sense when the trend that inspired it is gone.";

export const helixWords = [
  "Form", "Rhythm", "Contrast", "Grid", "Signal", "Material",
  "Light", "Silence", "Scale", "Type", "Weight", "Edge",
];

export const principles = [
  {
    word: "Clarity",
    line: "Every decision should be able to explain itself in one sentence.",
    detail: "If I cannot say why a colour, a margin or a typeface is there, it goes. What stays is easier to build, easier to defend and easier to love.",
  },
  {
    word: "Tension",
    line: "A layout should pull at you, not just sit there.",
    detail: "Asymmetry, a scale jump, one colour where you expect none. Small risks placed with care are what make a system feel authored.",
  },
  {
    word: "Restraint",
    line: "Take things away until it breaks. Then put one back.",
    detail: "Quiet work lasts longer. I would rather ship four perfect components than forty that almost agree with each other.",
  },
];

export const process = [
  {
    step: "Listen",
    text: "Interviews, audits and a walk through what already exists. I write down what the project must feel like before deciding what it should look like.",
    out: ["Stakeholder interviews", "Brand and product audit", "One-page brief"],
  },
  {
    step: "Frame",
    text: "Structure first. Grids, hierarchies and flows get settled in grey so that the later decisions about colour and form have somewhere solid to land.",
    out: ["Positioning map", "Information architecture", "Grid and type system"],
  },
  {
    step: "Make",
    text: "Two or three directions, built far enough to judge honestly. We pick one, then I take it all the way: logo to layout, screen to signage.",
    out: ["Concept directions", "Identity and UI build", "Motion and prototypes"],
  },
  {
    step: "Refine",
    text: "Edge cases, handoff files and a guide your team can use without me. The last ten percent is where most of the quality lives.",
    out: ["Design system and tokens", "Production files", "Usage guidelines"],
  },
];

export const projects: Project[] = [
  {
    slug: "halden-type-foundry",
    title: "Halden",
    client: "Independent type foundry",
    discipline: "Identity",
    year: 2026,
    summary: "A visual identity for a two-person type foundry. The system is built from the foundry's own metrics: every margin is a multiple of the cap height.",
    role: ["Identity system", "Specimen book", "Website"],
    cover: "glyph",
    sample: true,
  },
  {
    slug: "ledger-banking",
    title: "Ledger Room",
    client: "Fintech start-up",
    discipline: "Product",
    year: 2026,
    summary: "A banking dashboard for small studios that tracks invoices against project budgets. It cut the time to close a month from two days to an afternoon.",
    role: ["Product design", "Design system", "Prototyping"],
    cover: "interface",
    sample: true,
  },
  {
    slug: "north-wing-gallery",
    title: "North Wing",
    client: "Contemporary art space",
    discipline: "Spatial",
    year: 2025,
    summary: "Wayfinding and exhibition graphics for a converted warehouse gallery, using one typeface and a single sightline rule throughout.",
    role: ["Wayfinding", "Exhibition design", "Signage"],
    cover: "plan",
    sample: true,
  },
  {
    slug: "orbit-festival",
    title: "Orbit 25",
    client: "Electronic music festival",
    discipline: "Identity / Motion",
    year: 2025,
    summary: "A generative identity in which every artist gets an orbit drawn from their set's tempo. One rule produced 140 unique posters.",
    role: ["Generative identity", "Motion", "Print"],
    cover: "orbit",
    sample: true,
  },
  {
    slug: "kiln-ceramics",
    title: "Kiln & Co.",
    client: "Ceramics studio",
    discipline: "Brand / E-commerce",
    year: 2024,
    summary: "Packaging and a storefront for hand-thrown tableware. Product photography, copy and checkout were all designed around a slow, tactile pace.",
    role: ["Packaging", "Storefront", "Art direction"],
    cover: "stripe",
    sample: true,
  },
  {
    slug: "civic-grid",
    title: "Civic Grid",
    client: "City planning office",
    discipline: "Information design",
    year: 2024,
    summary: "A public data portal that turns zoning permits into readable maps and timelines, so residents can follow a building from application to opening.",
    role: ["Data visualisation", "UX research", "Front-end prototype"],
    cover: "grid",
    sample: true,
  },
];

export const services = [
  {
    name: "Brand identity",
    blurb: "Names, marks and the systems that hold them together.",
    scope: ["Positioning and naming", "Logo and type system", "Colour and imagery rules", "Brand guidelines"],
  },
  {
    name: "Digital product",
    blurb: "Interfaces that feel as considered as the brand behind them.",
    scope: ["UX flows and wireframes", "UI design", "Design systems and tokens", "Interactive prototypes"],
  },
  {
    name: "Spatial & exhibition",
    blurb: "Graphics that work at the scale of a room.",
    scope: ["Wayfinding", "Exhibition graphics", "Retail and interior graphics", "Signage production"],
  },
  {
    name: "Motion",
    blurb: "Identity that moves with a reason.",
    scope: ["Logo animation", "UI motion specs", "Generative systems", "Launch films"],
  },
  {
    name: "Art direction",
    blurb: "One eye across photo, film, print and screen.",
    scope: ["Shoot direction", "Campaign concepts", "Editorial layout", "Vendor coordination"],
  },
];
