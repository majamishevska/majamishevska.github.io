import { documents } from "./documents";

export type Paper = {
  id: string;
  title: string;
  titleSuffix?: string;
  detail?: string;
  description?: string;
  contributors?: { name: string; href?: string }[];
  detailEmphasis?: string;
  detailEmphasisHref?: string;
  format?: string;
  topic?: string;
  venues?: { label: string; href?: string }[];
  year: string;
  href?: string;
  cursorLabel?: string;
  category?: "program" | "resource";
};

export const papers: Paper[] = [
  {
    id: "steinhaus-zisson-grant",
    format: "Gender Studies senior capstone",
    title:
      "Prompting Without Consent: Gendered Practices of AI-Generated Intimate Imagery on X",
    detail: "Maja Mishevska",
    detailEmphasis:
      "Steinhaus/Zisson Research Grant awarded by the Pembroke Center for Teaching and Research on Women at Brown University",
    detailEmphasisHref:
      "https://pembroke.brown.edu/funding-opportunities/steinhauszisson-pembroke-center-research-grants-undergraduate-and-graduate",
    year: "Forthcoming",
  },
  {
    id: "ai-gender-based-harms-white-paper",
    format: "White paper",
    title: "Understanding and Addressing AI-Facilitated Gender-Based Harms",
    year: "Forthcoming",
    venues: [
      {
        label:
          "Key findings from the 2026 inaugural AI & Gender-Based Harms Conference: Implications for Policy and Practice",
        href: "https://cs.brown.edu/news/2026/07/14/diana-freed-co-founds-the-inaugural-ai-gender-based-harms-implications-for-policy-and-practice-conference/",
      },
    ],
  },
  {
    id: "ncii-ecosystem",
    topic: "AI-generated abuse",
    category: "resource",
    title: "NCII Ecosystem",
    detail: "Michelle L. Ding, Haya Bugshan, and Maja Mishevska",
    contributors: [
      { name: "Michelle L. Ding", href: "https://michelle-ding.github.io/" },
      {
        name: "Haya Bugshan",
        href: "https://hayafaisalbugshan.github.io/#projects",
      },
      { name: "Maja Mishevska" },
    ],
    description:
      "A visual storytelling project and living evidence database translating research on the technologies enabling AI-generated non-consensual intimate imagery into a public resource for understanding and intervention.",
    year: "2026",
    href: "https://ncii-ecosystem.org/",
  },
  {
    id: "impact-afghanistan",
    topic: "Policy research",
    category: "resource",
    title: "Impact Afghanistan",
    titleSuffix: "UTRA Fellowship",
    detail: "Product team",
    description:
      "Built in collaboration with the United Nations and Brown CS, this AI-assisted platform supports Afghanistan policy research through semantic search and article summaries.",
    year: "2026",
    href: "https://impactafghanistan.brown.edu/",
  },
  {
    id: "src-handbook",
    topic: "Computing education",
    category: "resource",
    title: "Socially Responsible Computing Handbook",
    detail: "Product team",
    description:
      "A community-built handbook bringing sociotechnical perspectives into computing education. I worked on improving accessibility and developing a case study library.",
    year: "2026",
    href: "https://srch.cs.brown.edu/",
  },
  {
    id: "paper-postpartum-ai-2026",
    format: "Workshop paper and presentation",
    title: "Rethinking How We Evaluate Postpartum AI",
    detail: "Maja Mishevska and Diana Freed",
    // description: 'Argues for evaluating postpartum AI within fragmented care systems, examining how it shapes women’s navigation of advice and responsibility for seeking care.',
    venues: [
      {
        label:
          "29th ACM Conference on Computer-Supported Cooperative Work and Social Computing (CSCW)",
        href: "https://cscw.acm.org/2026/",
      },
    ],
    year: "2026",
  },
  {
    id: "paper-youthxai-2026",
    format: "Workshop paper and presentation",
    title:
      "Structured Gains, Unstructured Risks: The Dual Impact of AI for Youth with ADHD",
    detail: "Mateo Campoverde-Fordon, Maja Mishevska, and Diana Freed",
    contributors: [
      { name: "Mateo Campoverde-Fordon", href: "https://mateo.ooo/" },
      { name: "Maja Mishevska" },
      { name: "Diana Freed" },
    ],
    // description: 'Argues for evaluating AI’s benefits and risks for youth with ADHD across structured and unstructured use, with privacy safeguards tailored to their needs.',
    venues: [
      {
        label:
          "Safe and Accessible AI for Youth with Disabilities and Neurodivergence — ASSETS Workshop",
        href: "https://assets-conference.github.io/assets2026/",
      },
    ],
    year: "2026",
  },
  {
    id: "paper-2",
    format: "Paper and poster presentation",
    title:
      "“Let’s Get Back to Flirting”: Gendered Privacy Risks in AI Boyfriend Apps",
    detail: "Maja Mishevska, Elif Cebe, and Neel Rehayee",
    // description: 'A privacy audit of 15 AI boyfriend apps finds policy inconsistencies in every app and examines how gendered language obscures disclosures.',
    venues: [
      {
        label: "3rd Annual Boston Security Usability Research Day (ABSURD)",
        href: "https://absurd.cs.tufts.edu/index.html",
      },
      {
        label: "Brown CS Undergraduate Research Symposium",
        href: "https://cs.brown.edu/degrees/undergrad/research/symposium/",
      },
    ],
    year: "2026",
    href: documents.genderedPrivacyRisksPdf,
    cursorLabel: "open",
  },
  {
    id: "paper-3",
    category: "program",
    title: "Randy Pausch Undergraduate Research Fellowship",
    detail: "awarded to 1 / 1200 students per year",
    year: "2026",
  },
  {
    id: "davis-uwc-scholar",
    category: "program",
    title: "Davis UWC Scholar",
    detail: "Brown University · Davis UWC Scholars Program",
    year: "2023–2027",
  },

  {
    id: "pit-ne-fellowship",
    category: "program",
    title: "Public Interest Technology New England (PIT-NE) Fellowship",
    detail: "First and only Brown University student in the 2025 cohort",
    year: "2025",
  },
  {
    id: "paper-8",
    category: "program",
    title: "Tech Career Exploration Trek – NYC",
    detail: "Fully funded participant · 12 / 70 students selected",
    year: "2025",
  },
  {
    id: "paper-7",
    format: "Journal article",
    title:
      "Shielding Choice in Silence: The Women’s Escort Service in Providence (1980s–1990s)",
    detail: "Maja Mishevska",
    venues: [
      { label: "Brown History Journal, The Journey Issue · Vol. XVII, No. 1" },
    ],
    // description: 'Draws on oral histories and archives to show how Brown’s Women’s Escort Service supported abortion access through non-confrontational activism.',
    year: "2025",
    href: documents.brownJournalHistoryPdf,
    cursorLabel: "open",
  },
];
