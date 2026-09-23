/**
 * Why Tamil Nadu Has No Navodaya Schools — article content.
 *
 * Generated from the source document. Every paragraph, quotation and
 * attribution below is as filed, word for word. Interface copy (labels,
 * captions, scene steps) is drawn from words the article already uses.
 */

export type PhotoLayout = "wide" | "float-left" | "float-right";

export type Block =
  | { kind: "lead"; text: string }
  | { kind: "p"; text: string; solo?: boolean }
  | { kind: "h3"; text: string }
  | { kind: "quote"; text: string; cite?: string; role?: string; bleed?: boolean; screen?: boolean }
  | { kind: "callout"; label: string; text: string }
  | { kind: "ledger"; label?: string; rows: { k: string; v?: string; n?: string }[] }
  | { kind: "figure"; ref: FigureRef }
  | { kind: "interlude"; variant: InterludeVariant; label: string; sub?: string; notes?: string[]; bars?: InterludeBar[] }
  | { kind: "shot"; layout?: PhotoLayout; w?: number; h?: number; src: string; alt: string; caption: string }
  | { kind: "note"; text: string }
  | { kind: "scene"; ref: SceneRef; label: string; steps: SceneStep[] }
  | { kind: "panel"; layout?: PhotoLayout; w?: number; h?: number; src: string; alt: string; line?: string; credit: string }
  | { kind: "duo"; label?: string; items: { src: string; alt: string; tag: string; credit: string }[] }
  | { kind: "screen"; text: string; cite?: string; role?: string; tone?: "light" | "dark" };

export interface SceneStep {
  k: string;
  v: string;
}

export type SceneRef = "language" | "timeline";

export type FigureRef = "loneMap" | "threeQuestions";

export type InterludeVariant = "reserve" | "kolam";

export interface InterludeBar {
  label: string;
  value: string;
  pct: number;
}

/**
 * Free-licence photographs (Wikimedia Commons), credited where placed.
 */
export const IMAGE_CREDITS: Record<string, string> = {
  supremeCourt: "The Supreme Court of India, New Delhi. (Image Courtesy: Subhashish Panigrahi/Wikimedia Commons, CC BY-SA 4.0)",
  jnvGate: "A Jawahar Navodaya Vidyalaya gate, Kottayam. (Image Courtesy: Vis M/Wikimedia Commons, CC BY-SA 4.0)",
  tnSchool: "School children at a government school in Tamil Nadu. (Image Courtesy: McKay Savage/Wikimedia Commons, CC BY 2.0)",
  madrasHC: "The Madras High Court, Chennai. (Image Courtesy: TuckDB/Wikimedia Commons, CC BY 4.0)",
  martyrs: "The memorial to the martyrs of the anti-Hindi language agitations, Tamil Nadu. (Image Courtesy: Surya Prakash S.A./Wikimedia Commons, CC BY-SA 3.0)",
  assembly: "The Tamil Nadu Legislative Assembly–Secretariat complex, Chennai. (Image Courtesy: Prateek Karandikar/Wikimedia Commons, CC BY-SA 4.0)",
};

export const SHOTS = {
  supremeCourt: "https://commons.wikimedia.org/wiki/Special:FilePath/Supreme%20Court%20of%20India%2001.jpg?width=1600",
  jnvGate: "https://commons.wikimedia.org/wiki/Special:FilePath/Jawahar%20Navodaya%20Vidyalaya,%20Kottayam%20-%20gate.jpg?width=1280",
  tnSchool: "https://commons.wikimedia.org/wiki/Special:FilePath/Tamil%20Nadu%20school%20kids.jpg?width=1280",
  madrasHC: "https://commons.wikimedia.org/wiki/Special:FilePath/Madras%20High%20Court%2C%20Chennai.jpg?width=1600",
  martyrs: "https://commons.wikimedia.org/wiki/Special:FilePath/Mozhip%20por%20Thiyaagigal%20mandabam%202.JPG?width=1600",
  assembly: "https://commons.wikimedia.org/wiki/Special:FilePath/Tamil%20Nadu%20legislative%20assembly-secretariat%20complex%20as%20seen%20from%20Chennai%20MRTS.JPG?width=1600",
} as const;

/* Scene steps: drawn from sentences the article already contains. */
const LANGUAGE_STEPS: SceneStep[] = [
  { k: "Classes 6–8", v: "The medium of instruction in Classes 6 to 8 is the regional language." },
  { k: "Classes 9–10", v: "In Classes 9 and 10, the regional language remains the first language, with English as the second." },
  { k: "The third language", v: "The third language is linked to the school’s language and student-exchange arrangements." },
  { k: "Tamil Nadu’s model", v: "Tamil and English subsequently became the foundation of the state’s school language policy, in contrast to the three-language formula followed at the national level." },
];

const TIMELINE_STEPS: SceneStep[] = [
  { k: "The 1960s", v: "Opposition to Hindi imposition was central to the Dravidian movement and became particularly powerful during the anti-Hindi agitations of the 1960s." },
  { k: "2006", v: "The Tamil Nadu Tamil Learning Act, 2006, gave statutory backing to the state’s language framework." },
  { k: "2017", v: "In 2017, the Madras High Court examined Tamil Nadu’s objection to Navodaya schools." },
  { k: "September 17", v: "On September 17, the Supreme Court refused to recall its earlier direction requiring Tamil Nadu to identify suitable land in every district for setting up Jawahar Navodaya Vidyalayas, while giving the state another three months to comply." },
];

export const THREE_QUESTIONS: string[] = [
  "How much room should states have to determine education policy?",
  "How should regional languages coexist with a national three-language framework?",
  "And can a central education scheme be introduced in a state that has consistently rejected that framework?",
];

export const CHAPTERS: Chapter[] = [
  {
    id: "prologue",
    num: "01",
    title: "",
    blocks: [
      { kind: "lead", text: "On September 17, the Supreme Court refused to recall its earlier direction requiring Tamil Nadu to identify suitable land in every district for setting up Jawahar Navodaya Vidyalayas, while giving the state another three months to comply. The court also urged Tamil Nadu and the Centre to resolve their differences through dialogue. During the hearing, the bench questioned the state’s opposition to the three-language policy followed by Navodaya schools and said “it could not be that Hindi would never be taught\" in Tamil Nadu." },
      { kind: "p", text: "Thursday’s developments in the top court point to a question that has remained unusually persistent in India’s education policy." },
      { kind: "screen", text: "Why is Tamil Nadu the only state that has not accepted the Navodaya Vidyalaya scheme?" },
      { kind: "p", text: "While the answer lies in language partly, the full story is much bigger than Tamil Nadu’s opposition to Hindi. At its heart is a clash between the three-language structure followed by Navodaya schools and Tamil Nadu’s longstanding two-language policy of Tamil and English. It is also a matter of state autonomy and, increasingly, the political importance of language to a new government that has chosen to continue the policy." },
    ],
  },
  {
    id: "lone-exception",
    num: "02",
    title: "Tamil Nadu: The Lone Exception",
    blocks: [
      { kind: "p", text: "Jawahar Navodaya Vidyalayas, or JNVs, were conceived as residential schools providing quality education to talented children, particularly from rural areas. The scheme envisages one JNV in each district, with at least 75 per cent of seats reserved for students selected from rural areas." },
      { kind: "panel", layout: "wide", src: SHOTS.jnvGate, alt: "The gate of a Jawahar Navodaya Vidyalaya", line: "Residential schools for talented children, particularly from rural areas", credit: IMAGE_CREDITS.jnvGate },
      { kind: "interlude", variant: "reserve", label: "One school per district, most seats rural", notes: ["The scheme envisages one JNV in each district, with at least 75 per cent of seats reserved for students selected from rural areas."] },
      { kind: "figure", ref: "loneMap" },
      { kind: "p", text: "Tamil Nadu, however, never accepted the scheme. Government records have repeatedly identified it as the sole state that has not done so. The Centre has also said that setting up a JNV requires a proposal from the concerned state government or Union Territory administration, and that Tamil Nadu has not consented to the implementation of the scheme." },
      { kind: "p", solo: true, text: "So why has Chennai consistently said no? The answer takes us back to the language question." },
    ],
  },
  {
    id: "language-policy",
    num: "03",
    title: "What Navodaya’s Language Policy Says",
    blocks: [
      { kind: "p", text: "Navodaya schools follow a three-language formula, but the arrangement is more nuanced than the shorthand often suggests. The medium of instruction in Classes 6 to 8 is the regional language. In Classes 9 and 10, the regional language remains the first language, with English as the second. The third language is linked to the school’s language and student-exchange arrangements." },
      { kind: "scene", ref: "language", label: "Two languages, or three", steps: LANGUAGE_STEPS },
      { kind: "p", text: "This distinction became important during an earlier round of litigation. In 2017, the Madras High Court examined Tamil Nadu’s objection to Navodaya schools. The Centre told the court that in Tamil-speaking areas, Tamil would be the medium of instruction in Classes 6 to 8 and the first language in Classes 9 and 10, with English as the second language." },
      { kind: "panel", layout: "wide", src: SHOTS.madrasHC, alt: "The Madras High Court, Chennai", line: "The Madras High Court, 2017 — the scheme could accommodate Tamil", credit: IMAGE_CREDITS.madrasHC },
      { kind: "p", text: "The court found that the scheme could accommodate Tamil and did not, on that basis, violate Tamil Nadu’s Tamil Learning Act. Yet, Tamil Nadu continued to resist the scheme. That is because the state’s objection is not simply about whether Tamil can be taught. It is about the three-language framework itself." },
      { kind: "interlude", variant: "kolam", label: "Kolam", sub: "The threshold floor-art of the Tamil household — a cultural interleaf." },
    ],
  },
  {
    id: "two-language",
    num: "04",
    title: "Why The Two-Language Policy Matters So Much",
    blocks: [
      { kind: "p", text: "Tamil Nadu’s two-language policy has deep roots in the state’s political history. Opposition to Hindi imposition was central to the Dravidian movement and became particularly powerful during the anti-Hindi agitations of the 1960s." },
      { kind: "panel", layout: "wide", src: SHOTS.martyrs, alt: "The memorial to the martyrs of the anti-Hindi language agitations in Tamil Nadu", line: "The anti-Hindi agitations of the 1960s", credit: IMAGE_CREDITS.martyrs },
      { kind: "p", text: "Tamil and English subsequently became the foundation of the state’s school language policy, in contrast to the three-language formula followed at the national level. The Tamil Nadu Tamil Learning Act, 2006, gave statutory backing to the state’s language framework." },
      { kind: "scene", ref: "timeline", label: "A standoff, decade by decade", steps: TIMELINE_STEPS },
      { kind: "panel", layout: "wide", src: SHOTS.tnSchool, alt: "School children at a government school in Tamil Nadu", line: "Tamil Nadu runs its own schools, and its own syllabus", credit: IMAGE_CREDITS.tnSchool },
      { kind: "p", text: "It is in this backdrop that the Navodaya dispute acquires a political dimension that goes well beyond one school scheme with its political relevance carrying into Tamil Nadu’s new government led by chief Minister C Joseph Vijay." },
      { kind: "p", text: "The TVK government has retained the state’s two-language policy and opposed the National Education Policy’s three-language approach since coming into power. The state government’s position reflected in the Governor’s address to the Assembly in June. The government has also recently asserted Tamil’s place in another sphere." },
      { kind: "p", text: "In September, the Tamil Nadu Assembly unanimously passed a resolution seeking recognition of Tamil as the principal language of proceedings, judgments, decrees and orders in the Madras High Court. Chief Minister Vijay himself moved the resolution." },
      { kind: "panel", layout: "wide", src: SHOTS.assembly, alt: "The Tamil Nadu Legislative Assembly and Secretariat complex in Chennai", line: "Chennai asserts Tamil’s place", credit: IMAGE_CREDITS.assembly },
      { kind: "p", text: "That makes the Navodaya dispute particularly relevant now. For the Vijay government, agreeing to a central school system that follows a three-language structure would sit uneasily alongside its stated commitment to the existing language policy." },
    ],
  },
  {
    id: "about-hindi",
    num: "05",
    title: "Is This Really About Hindi?",
    dark: true,
    blocks: [
      { kind: "p", text: "Partly, but not entirely. Hindi is clearly at the centre of the current dispute. The Supreme Court itself focussed on the issue during the hearing Thursday. But reducing the controversy to a “Tamil Nadu does not want Hindi\" narrative misses two other dimensions." },
      { kind: "p", text: "The first is the language policy. Tamil Nadu follows a two-language model, while Navodaya follows a three-language structure. The second is federalism. Tamil Nadu has argued that it cannot be compelled to accept an optional central scheme and has questioned whether the state can be directed to provide land for it." },
      { kind: "p", text: "There is also the question of educational opportunity. The Centre’s argument is that JNVs offer free residential education, particularly to talented rural students, and that Tamil Nadu’s students should not be denied access to the scheme. The Centre has also maintained that Tamil can be accommodated in the schools and that the state’s existing education system would continue unaffected." },
      { kind: "p", text: "This tension is what lies at the heart of the dispute." },
      { kind: "screen", tone: "dark", text: "Tamil Nadu sees the three-language structure as conflicting with a policy it has deliberately chosen to follow. The Centre sees Navodaya as an additional educational opportunity that need not displace the state’s own schools or syllabus." },
    ],
  },
  {
    id: "supreme-court",
    num: "06",
    title: "What Supreme Court’s Intervention Means",
    blocks: [
      { kind: "p", text: "The Supreme Court’s latest intervention seeks to move the dispute towards accommodation. The court has refused to withdraw its direction to Tamil Nadu to identify land in every district, but has given the state three more months to do so. It has also urged Chennai and the Centre to resolve their differences through dialogue." },
      { kind: "p", text: "The court’s position appears to suggest that the two systems can coexist. Tamil Nadu can continue to run its own schools and follow its own syllabus, while Navodaya schools can provide an additional option." },
      { kind: "p", text: "Tamil Nadu, however, has maintained that the issue is not merely about adding another category of school. Its objection is tied to the language model attached to those schools and to the larger question of the state’s educational autonomy." },
      { kind: "p", text: "The latest Supreme Court intervention may have changed the immediate equation, but it has not resolved the underlying disagreement. Tamil Nadu remains committed to its two-language policy, and the new government has made it clear that this remains part of its broader position on education and language." },
      { kind: "p", text: "The Navodaya dispute, therefore, throws three questions that are unlikely to disappear soon." },
      { kind: "figure", ref: "threeQuestions" },
      { kind: "screen", tone: "dark", text: "For Tamil Nadu, the answer has so far been no. The Supreme Court has now asked the state and the Centre to find a way forward. Whether Navodaya finally enters Tamil Nadu may therefore depend on whether both sides can separate the question of access to a national education scheme from the much older and politically sensitive battle over language." },
    ],
  },
];

export interface Chapter {
  id: string;
  num: string;
  title: string;
  dark?: boolean;
  blocks: Block[];
}

export interface SourceRef {
  label: string;
  href?: string;
}

export const META = {
  title: "Why Tamil Nadu Has No Navodaya Schools",
  subtitle: "The ‘Hindi’ Question Behind A Decades-Old Standoff",
  byline: "Parimal Peeyush",
  published: "September 2026",
  readTime: "About 7 minutes",
  sources: [
    { label: "Supreme Court of India, hearing of September 17" },
    { label: "Madras High Court, 2017, on Tamil Nadu’s objection to Navodaya schools" },
    { label: "The Tamil Nadu Tamil Learning Act, 2006" },
    { label: "National Education Policy — the three-language formula" },
    { label: "Tamil Nadu Assembly resolution on Tamil in the Madras High Court, September" },
  ] as SourceRef[],
} as const;
