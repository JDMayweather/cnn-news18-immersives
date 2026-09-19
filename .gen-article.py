# Temporary: regenerate the article body verbatim from articles-doc/Rich Man.docx.
# Every paragraph is emitted as written; visual blocks are inserted between
# paragraphs by anchor. Nothing is paraphrased, nothing is dropped.
import io, re, json

RAW = io.open('.article-raw.txt', encoding='utf-8').read()
# One paragraph per line in the source extraction; blank lines are noise.
paras = [p.strip() for p in RAW.split('\n') if p.strip()]

HEADLINE = paras[0]
TITLE, SUBTITLE = [s.strip() for s in HEADLINE.split(':', 1)]

HEADINGS = {
    "The cost": ("02", "the-cost"),
    "Cricket\u2019s Support": ("03", "support"),
    "Cricket\u2019s Demand": ("04", "demand"),
    "Cricket\u2019s Exclusion": ("05", "exclusion"),
    "Cricket\u2019s Talent": ("06", "talent"),
    "Cricket\u2019s Optimism": ("07", "optimism"),
    "Cricket\u2019s Merit": ("08", "merit"),
}

# Visual blocks to place immediately AFTER the paragraph containing `anchor`.
# Screens, scenes, figures, interludes and photographs live here, never words.
INSERTIONS = [
    ("Somewhere in this merry-go-round hoorah", [
        '{ kind: "interlude", variant: "willow", label: "Twenty years to a bat", notes: ["English willow comes from specialised trees in England that take 20 years to be ready, even as their farmers fight pressure from housing companies and the like.", "Then, T20 requires lighter bats, which are brittle and break down easily."] }',
        '{ kind: "shot", w: 1280, h: 960, src: SHOTS.willowLogs, alt: "Cut willow logs stacked for curing, to be made into cricket bats", caption: IMAGE_CREDITS.willowLogs }',
    ]),
    ("Let\u2019s start with the cost of playing cricket", [
        '{ kind: "scene", ref: "kit", label: "What the bag has to hold", steps: KIT_STEPS }',
    ]),
    ("In 2022, a \u2018State of Inequality in India\u2019 report", [
        '{ kind: "figure", ref: "budgetPlanner" }',
    ]),
    ("That doesn\u2019t scream democratic, does it?", [
        '{ kind: "shot", layout: "float-right", w: 664, h: 1000, src: SHOTS.streetCricket, alt: "Boys playing street cricket with a tennis ball in Kerala", caption: IMAGE_CREDITS.streetCricket }',
    ]),
    ("The Annual Status of Education Report", [
        '{ kind: "interlude", variant: "schools", label: "Where play could start", sub: "Rural India, Annual Status of Education Report 2024", bars: [ { label: "Primary schools with no playground", value: "34%", pct: 34 }, { label: "Upper primary or higher schools with no playground", value: "28%", pct: 28 }, { label: "Schools with sports equipment available", value: "80%", pct: 80 }, { label: "Primary schools with a separate PE teacher", value: "under 5%", pct: 4 } ] }',
    ]),
    ("About 200 kids play in Haque\u2019s academy", [
        '{ kind: "interlude", variant: "blades", label: "Two hundred children, twenty on free places", notes: ["About 200 kids play in Haque\u2019s academy. 20 of them study in free-of-cost government schools, so Haque takes care of some of their expenses."] }',
    ]),
    ("What the BCCI has done well", [
        '{ kind: "interlude", variant: "fees", label: "What the game pays, to the few who reach it", bars: [ { label: "Ranji Trophy match fee, per day", value: "\u20b940,000\u201360,000", pct: 60 }, { label: "A season of selections, per year", value: "\u20b915\u201320 lakhs", pct: 100 }, { label: "Under-16 match fee, against a senior\u2019s", value: "about half", pct: 30 } ], notes: ["Even if one student from all cricket academies in Jaipur, one of the 41 districts in Rajasthan, were to make it to the state level, there would need to be 200 vacant spots, which don\u2019t exist."] }',
    ]),
    ("it\u2019s these coaches and their connections to rich philanthropists", [
        '{ kind: "panel", layout: "wide", w: 1600, h: 900, src: SHOTS.gearHands, alt: "Cricket equipment being manufactured at Apex Cricket (JS Enterprises) in Meerut", credit: "Apex Cricket (JS Enterprises), Meerut. (News18)" }',
    ]),
    ("has an AI-designed warning written over his business", [
        '{ kind: "panel", layout: "float-right", w: 853, h: 1280, src: SHOTS.meerutPoster, alt: "A warning written over the business poster at Apex Cricket (JS Enterprises) in Meerut, announcing a 35% increase in the rates of all cricket goods", line: "\u201cFrom today onwards, the rates of all cricket goods have been increased by 35% because raw material has gotten more expensive.\u201d", credit: "Apex Cricket (JS Enterprises), Meerut. (News18)" }',
    ]),
    ("Kumar explains that making a pair of gloves costs them", [
        '{ kind: "figure", ref: "priceLadder" }',
        '{ kind: "shot", w: 1280, h: 960, src: SHOTS.batStore, alt: "Cricket bats on display in a sports shop", caption: IMAGE_CREDITS.batStore }',
    ]),
    ("look at why so many talented poor people adopt football", [
        '{ kind: "interlude", variant: "comparison", label: "Seven to eight per cent of the people, seventy per cent of the wealth", notes: ["Historical estimates suggest that the white population of South Africa\u2014making up roughly 7% to 8% of the population\u2014owns a disproportionate 70% share of the country\u2019s wealth. It\u2019s one of the reasons why cricket in South Africa was for years dominated by white men."] }',
    ]),
    ("India has one of the highest populations of child laborers", [
        '{ kind: "panel", layout: "float-left", w: 1440, h: 1914, src: SHOTS.krantiGaud, alt: "Cricketer Kranti Gaud and her mother", line: "Kranti Gaud\u2019s mother sold her jewelry to buy her a cricket kit", credit: "Kranti Gaud. (Instagram, via News18)" }',
    ]),
    ("taking Adivasi representation in the league to be around 0.12%", [
        '{ kind: "scene", ref: "exclusions", label: "Two hundred children, read four ways", steps: EXCLUSION_STEPS }',
    ]),
    ("academics speculate it could relate to exposure to better nutrition", [
        '{ kind: "interlude", variant: "nets", label: "Diet is very important for any athlete", notes: ["A kid from a good family can maintain his diet\u2014he gets the required calories throughout the day, and he manages his post-workout nutrition.", "But a kid from a village cannot do that, for he doesn\u2019t have easy access to fruits, dry fruits, and the nutrients he needs.", "Because of this, they suffer more injuries and cramps while playing."] }',
    ]),
    ("give a one-year scholarship", [
        '{ kind: "interlude", variant: "selection", label: "A one-year scholarship, five hopefuls", bars: [ { label: "Registration for a trial", value: "about \u20b91,500", pct: 2 }, { label: "A year in a city: hostel, training, food", value: "\u20b91\u20131.5 lakhs", pct: 100 } ], notes: ["If a farmer has small land and no other source of income besides farming, how much can he give to a child?", "A farmer\u2019s entire year\u2019s income may not even be that much."] }',
    ]),
    ("keeps his tutelage free for 20% of his cohort", [
        '{ kind: "panel", layout: "wide", w: 1280, h: 617, src: SHOTS.maidan, alt: "Cricket pitches across the sports fields of Azad Maidan, Mumbai", credit: IMAGE_CREDITS.maidan }',
    ]),
    ("Pathak says that government schools allot", [
        '{ kind: "interlude", variant: "clock", label: "Forty-five minutes a day", bars: [ { label: "Physical Education in a government school, daily", value: "45 minutes", pct: 45 }, { label: "What athletics or football need", value: "1\u20131.5 hours", pct: 90 } ], notes: ["Children play cricket everywhere\u2014gully cricket, mohalla cricket, on the roads\u2014but organised cricket is expensive.", "You need a ground, proper pitch, equipment, bats, pads, and academy fees. Many children cannot afford these things.", "In comparison, athletics, football, and other sports require less time\u2014one or one-and-a-half hours, a fixed routine, and a ball that costs \u20b91,000."] }',
    ]),
    ("no IPL or Indian cricketer comes through until they migrate out", [
        '{ kind: "figure", ref: "geography" }',
    ]),
    ("is still struggling", [
        '{ kind: "scene", ref: "divergence", label: "The same start, two homes", steps: DIVERGENCE_STEPS }',
    ]),
    ("are still toiling hard for the same reward", [
        '{ kind: "interlude", variant: "sunrise", label: "The same opportunity, on paper", notes: ["On paper, all of them have the same opportunity, and only the best will prevail. But the time, emotional support, stress, fallback options, and the need to make it are vastly different."] }',
    ]),
]

# Step copy is quoted, not written: every `v` below is a sentence from the
# article, lifted whole. The `k` values are two-or-three word topic labels.
KIT_STEPS = """[
          { k: "The kit", v: "A youngster, aiming to become a professional batter, for instance, needs at least a couple of bats, a few pairs of gloves, batting pads, a helmet, spikes, other protective guards, and a kit bag to keep it all in." },
          { k: "What wears out", v: "For this cricketer, playing most days a week, each bat will last up to a year, and pads, gear (like the abdomen guard), spikes, and helmets will be fine for a few seasons." },
          { k: "The gloves", v: "Gloves last for a year if worn rotationally and can be pushed for two if meticulously taken care of." },
          { k: "The body", v: "Then, cricketers require extra investment in their bodies, like protein-rich nutrition and strength and conditioning work." },
          { k: "Being seen", v: "Add to it the actual cricket practice expenses, tournament fees, and travel, and the conservative costs of pursuing the sport professionally come to around \u20b93,00,000 annually or about \u20b925,000 a month." },
          { k: "The threshold", v: "In 2022, a \u2018State of Inequality in India\u2019 report released by the Economic Advisory Council to the Prime Minister said that a citizen earning a monthly income of \u20b925,000 was in the top 10% of earners in India." },
        ]"""

EXCLUSION_STEPS = """[
          { k: "0.12%", v: "Minz is the only Adivasi cricketer to have ever played in the IPL, taking Adivasi representation in the league to be around 0.12% when they make up to 9% of India\u2019s population." },
          { k: "Five out of six", v: "According to the Global Multidimensional Poverty Index 2021, five out of six multidimensionally poor people in India live in households whose head is from a Scheduled Tribe (ST), a Scheduled Caste (SC), or Other Backward Class (OBC)." },
          { k: "34% and 28%", v: "The Annual Status of Education Report (ASER) 2024, a citizen-led survey, found that around 34% of the primary schools and 28% of the upper primary or higher level schools in rural India didn\u2019t have a playground." },
          { k: "Less than 5%", v: "About 80% of schools had sports equipment available, but less than 5% of primary schools had a separate Physical Education teacher." },
        ]"""

DIVERGENCE_STEPS = """[
          { k: "1988", v: "They are often cited as examples of merit \u2014 people remember their famous 1988 Harris Shield semi-final partnership and say both were equally talented, were almost at the same point in their lives, but one ended up becoming the greatest of all time and the other, labelled an alcoholic, is still struggling." },
          { k: "The same coach", v: "While he and Tendulkar were both equally supported by Ramakant Archrekar, Kambli used to travel from and back to a confrontational room of 17 others." },
          { k: "One start", v: "While Tendulkar was born to a poet-professor father and a government employee mother, Kambli\u2019s story is hidden in the fifth paragraph of this article, in Vikas\u2019 name, beginning with an abusive father, a mechanic, and a loving mother who died when he was 20." },
          { k: "What differed", v: "Dr. Dove\u2019s research found that parents\u2019 emotional support was crucial for talented cricketers, and only one of Tendulkar and Kambli had that, despite their arguably similar skill sets." },
        ]"""


def ts(s):
    return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'


def is_quote(p):
    return p[:1] in ('\u201c', '\u2018', '"')


SCREEN_PARAS = ["Why does it require a mother to sell her jewellery"]
LEAD_PARAS = ["Aman is an excellent batter"]


def block_for(p):
    if any(p.startswith(s) for s in SCREEN_PARAS):
        return '      { kind: "screen", text: %s },' % ts(p)
    if any(p.startswith(s) for s in LEAD_PARAS):
        return '      { kind: "lead", text: %s },' % ts(p)
    if is_quote(p):
        return '      { kind: "quote", text: %s },' % ts(p)
    return '      { kind: "p", text: %s },' % ts(p)


# ---------------------------------------------------------------- build chapters
chapters = []
current = {"id": "prologue", "num": "01", "title": "", "blocks": []}
chapters.append(current)

for p in paras[1:]:
    if p in HEADINGS:
        num, cid = HEADINGS[p]
        current = {"id": cid, "num": num, "title": p, "blocks": []}
        chapters.append(current)
        continue
    current["blocks"].append(p)

# names paragraph becomes the figure that lists them, verbatim
NAMES_ANCHOR = "Here are some names you might know"
name_clauses = []
for ch in chapters:
    out = []
    for b in ch["blocks"]:
        if b.startswith(NAMES_ANCHOR):
            # The paragraph stays exactly as filed. The figure that follows it
            # is a visual index of the same names, not a replacement for it.
            out.append(b)
            out.append("<<KNOWNNAMES>>")
        else:
            out.append(b)
    ch["blocks"] = out

# ---------------------------------------------------------------- emit
lines = []
lines.append("/**")
lines.append(" * Rich Man's Religion — article content.")
lines.append(" *")
lines.append(" * Generated from the source document (articles-doc/Rich Man.docx). Every")
lines.append(" * paragraph, quotation and attribution below is as filed, word for word,")
lines.append(" * including the source's own dashes and the parenthetical translations of")
lines.append(" * quotes given in Hindi. Do not hand-edit the text in this file: regenerate")
lines.append(" * it from the document instead.")
lines.append(" *")
lines.append(" * Interface copy (labels, captions, scene steps) is separate and is always")
lines.append(" * drawn from words the article already uses.")
lines.append(" */")
lines.append("")
lines.append("/*")
lines.append(" * Photographs are never cropped. The full frame is shown, and how much")
lines.append(" * column it takes is decided per picture: landscape runs wide, portrait runs")
lines.append(" * beside the copy it belongs to.")
lines.append(" */")
lines.append('export type PhotoLayout = "wide" | "float-left" | "float-right";')
lines.append("")
lines.append("export type Block =")
lines.append('  | { kind: "lead"; text: string }')
lines.append('  | { kind: "p"; text: string }')
lines.append('  | { kind: "h3"; text: string }')
lines.append('  | { kind: "quote"; text: string; cite?: string; role?: string; bleed?: boolean; screen?: boolean }')
lines.append('  | { kind: "callout"; label: string; text: string }')
lines.append('  | { kind: "ledger"; label?: string; rows: { k: string; v?: string; n?: string }[] }')
lines.append('  | { kind: "figure"; ref: FigureRef }')
lines.append('  | { kind: "interlude"; variant: InterludeVariant; label: string; sub?: string; notes?: string[]; bars?: InterludeBar[] }')
lines.append('  | { kind: "shot"; layout?: PhotoLayout; w?: number; h?: number; src: string; alt: string; caption: string }')
lines.append('  | { kind: "note"; text: string }')
lines.append('  | { kind: "scene"; ref: SceneRef; label: string; steps: SceneStep[] }')
lines.append('  | { kind: "panel"; layout?: PhotoLayout; w?: number; h?: number; src: string; alt: string; line?: string; credit: string }')
lines.append('  | { kind: "screen"; text: string; cite?: string; role?: string };')
lines.append("")
lines.append("export interface SceneStep {")
lines.append("  k: string;")
lines.append("  v: string;")
lines.append("}")
lines.append("")
lines.append('export type SceneRef = "kit" | "exclusions" | "divergence";')
lines.append("")
lines.append("/*")
lines.append(" * Only figures whose content the article itself states. Anything that needed a")
lines.append(" * number the reporting does not print was cut rather than estimated.")
lines.append(" */")
lines.append('export type FigureRef = "knownNames" | "budgetPlanner" | "priceLadder" | "geography";')
lines.append("")
lines.append("export type InterludeVariant =")
lines.append("  | \"willow\" | \"blades\" | \"schools\" | \"selection\" | \"clock\"")
lines.append("  | \"fees\" | \"nets\" | \"comparison\" | \"sunrise\";")
lines.append("")
lines.append("/**")
lines.append(" * A proportion a reader can check at a glance: the value is printed as")
lines.append(" * text, the bar only restates it, and every pair is a figure the article")
lines.append(" * itself states.")
lines.append(" */")
lines.append("export interface InterludeBar {")
lines.append("  label: string;")
lines.append("  value: string;")
lines.append("  pct: number;")
lines.append("}")
lines.append("")
lines.append("/**")
lines.append(" * Free-licence photographs (Wikimedia Commons) used where the article's")
lines.append(" * argument needs a picture the reporting did not ship. Each entry is")
lines.append(" * credited where it is placed; licenses are CC BY / CC BY-SA.")
lines.append(" */")
lines.append("export const IMAGE_CREDITS: Record<string, string> = {")
lines.append('  streetCricket: "Street cricket in Kerala. Vishnu gs, Wikimedia Commons, CC BY 3.0.",')
lines.append('  maidan: "Cricket pitches at Azad Maidan, Mumbai. David.Clay.Photography, Wikimedia Commons, CC BY-SA 4.0.",')
lines.append('  willowLogs: "Willow logs for making cricket bats. Mike Prince, Wikimedia Commons, CC BY 2.0.",')
lines.append('  batStore: "Cricket bats in a store, Bengaluru. Gpkp, Wikimedia Commons, CC BY-SA 4.0.",')
lines.append("};")
lines.append("")
lines.append("export const SHOTS = {")
lines.append('  krantiGaud:')
lines.append('    "https://images.news18.com/ibnlive/uploads/2026/09/SaveClip.App_645690424_18072804986540873_5017737964892763456_n-2026-09-24edc84b94d68641ff6fbe500f3f45dd.jpg?impolicy=website&width=0&height=0",')
lines.append('  meerutPoster:')
lines.append('    "https://images.news18.com/ibnlive/uploads/2026/09/Untitled-design-2026-09-998ddac1fd544219a5183a6eb985c1b7.png?impolicy=website&width=0&height=0",')
lines.append('  gearHands:')
lines.append('    "https://images.news18.com/ibnlive/uploads/2026/09/WhatsApp-Image-2026-09-17-at-18.36.02-2026-09-4cfd8e674bb4d8edd5de92deb83cefe7.jpeg?impolicy=website&width=0&height=0",')
lines.append('  streetCricket:')
lines.append('    "https://upload.wikimedia.org/wikipedia/commons/2/21/Street_cricket.jpg",')
lines.append('  maidan:')
lines.append('        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Azad_Maidan_in_Mumbai.jpg/1280px-Azad_Maidan_in_Mumbai.jpg",')
lines.append('  willowLogs:')
lines.append('    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Willow_Logs_for_making_Cricket_Bats_%2814387643178%29.jpg/1280px-Willow_Logs_for_making_Cricket_Bats_%2814387643178%29.jpg",')
lines.append('  batStore:')
lines.append('    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Cricket_bats_in_a_store%2C_RR_Nagar%2C_Bangalore_%282026%29.jpg/1280px-Cricket_bats_in_a_store%2C_RR_Nagar%2C_Bangalore_%282026%29.jpg",')
lines.append("} as const;")
lines.append("")
lines.append("export const CHAPTERS: Chapter[] = [")

used = set()
for ch in chapters:
    lines.append("  {")
    lines.append('    id: %s,' % ts(ch["id"]))
    lines.append('    num: %s,' % ts(ch["num"]))
    lines.append('    title: %s,' % ts(ch["title"]))
    lines.append("    blocks: [")
    for b in ch["blocks"]:
        if b == "<<KNOWNNAMES>>":
            lines.append('      { kind: "figure", ref: "knownNames" },')
            continue
        lines.append(block_for(b))
        for anchor, inserts in INSERTIONS:
            if anchor in b and anchor not in used:
                used.add(anchor)
                lines.extend("      " + i + "," for i in inserts)
    lines.append("    ],")
    lines.append("  },")
lines.append("];")
lines.append("")
lines.append("export interface Chapter {")
lines.append("  id: string;")
lines.append("  num: string;")
lines.append("  /** The article's own section heading, verbatim. Empty where it has none. */")
lines.append("  title: string;")
lines.append("  blocks: Block[];")
lines.append("}")
lines.append("")
lines.append("export interface SourceRef {")
lines.append("  label: string;")
lines.append("  href?: string;")
lines.append("}")

lines.append("")
lines.append("/*")
lines.append(" * Publication furniture. The byline is the author recorded in the source")
lines.append(" * document's own properties (Rudransh Khurana); the reading time is the source's")
lines.append(" * own word count at 200 words a minute. Every entry in the reading list is a")
lines.append(" * document the article itself names, in the article's own words for it.")
lines.append(" */")
lines.append("export const META = {")
lines.append('  title: "Rich Man\u2019s Religion",')
lines.append('  subtitle: %s,' % ts(SUBTITLE))
lines.append('  byline: "Rudransh Khurana",')
lines.append('  published: "18 September 2026",')
lines.append('  readTime: "About 23 minutes",')
lines.append("  sources: [")
for label, href in [
    ("Devajit Saikia, BCCI secretary, in interview", "https://youtu.be/5j1r9X_DYsE"),
    ("Global Multidimensional Poverty Index 2021", "https://hdr.undp.org/content/2021-global-multidimensional-poverty-index-mpi"),
    ("Annual Status of Education Report (ASER) 2024", "https://asercentre.org/aser-2024/"),
    ("The United Nations, on child labour and caste, 2022", "https://www.thehindu.com/news/international/child-labour-caste-based-discrimination-poverty-closely-interlinked-in-india-un-special-rapporteur-tomoya-obokata/article65782342.ece"),
    ("The Wire, 2018", "https://m.thewire.in/article/caste/does-india-need-a-caste-based-quota-in-cricket"),
]:
    lines.append('    { label: %s, href: %s },' % (ts(label), ts(href)))
lines.append('    { label: "Economic Advisory Council to the PM, State of Inequality in India, 2022" },')
lines.append("  ] as SourceRef[],")
lines.append("} as const;")
lines.append("")
lines.append("/*")
lines.append(" * The only product arithmetic in the article: a manufacturer's own numbers for")
lines.append(" * one pair of gloves, given to News18 on the record.")
lines.append(" */")
lines.append("export const PRICE_LADDER = {")
lines.append('  unit: "One pair of batting gloves",')
lines.append("  steps: [")
lines.append('    { k: "Raw material", v: 700, note: "\u20b9700 in raw material" },')
lines.append('    { k: "Labour", v: 350, note: "\u20b9350 in labor charges" },')
lines.append('    { k: "Electricity and rent", v: 150, note: "\u20b9150 in electricity and rent expenses" },')
lines.append('    { k: "Profit", v: 150, note: "a \u20b9100-200 profit on each pair" },')
lines.append("  ],")
lines.append("  mrp3: 3000,")
lines.append("  mrp4: 4000,")
lines.append("  mrp6: 6000,")
lines.append('  paidLabel: "\u20b92,500\u20133,000",')
lines.append("  factoryGate: 1400,")
lines.append("  discount: 25,")
lines.append("  paid: 3000,")
lines.append("  directPrice: 1600,")
lines.append("} as const;")

io.open('.generated-article.ts', 'w', encoding='utf-8').write("\n".join(lines) + "\n")

# define the step arrays at the end via a small prelude
text = io.open('.generated-article.ts', encoding='utf-8').read()
prelude = "/* Scene step copy: drawn from sentences the article already contains. */\n"
prelude += "const KIT_STEPS: SceneStep[] = %s;\n\n" % KIT_STEPS
prelude += "const EXCLUSION_STEPS: SceneStep[] = %s;\n\n" % EXCLUSION_STEPS
prelude += "const DIVERGENCE_STEPS: SceneStep[] = %s;\n\n" % DIVERGENCE_STEPS
text = text.replace("export const CHAPTERS: Chapter[] = [", prelude + "export const CHAPTERS: Chapter[] = [")
io.open('.generated-article.ts', 'w', encoding='utf-8').write(text)

print("paragraphs:", len(paras) - 1)
print("chapters:", len(chapters))
print("anchors used:", len(used), "of", len(INSERTIONS))
for anchor, _ in INSERTIONS:
    if anchor not in used:
        print("  UNUSED ANCHOR:", anchor)
print("block counts:", [len([b for b in c["blocks"]]) for c in chapters])
