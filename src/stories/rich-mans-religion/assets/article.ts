/**
 * Rich Man's Religion — article content.
 *
 * Generated from the source document (articles-doc/Rich Man.docx). Every
 * paragraph, quotation and attribution below is as filed, word for word,
 * including the source's own dashes and the parenthetical translations of
 * quotes given in Hindi. Do not hand-edit the text in this file: regenerate
 * it from the document instead.
 *
 * Interface copy (labels, captions, scene steps) is separate and is always
 * drawn from words the article already uses.
 */

/*
 * Photographs are never cropped. The full frame is shown, and how much
 * column it takes is decided per picture: landscape runs wide, portrait runs
 * beside the copy it belongs to.
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
  | { kind: "screen"; text: string; cite?: string; role?: string };

export interface SceneStep {
  k: string;
  v: string;
}

export type SceneRef = "kit" | "exclusions" | "divergence";

/*
 * Only figures whose content the article itself states. Anything that needed a
 * number the reporting does not print was cut rather than estimated.
 */
export type FigureRef = "knownNames" | "budgetPlanner" | "priceLadder" | "geography";

export type InterludeVariant =
  | "willow" | "blades" | "schools" | "selection" | "clock"
  | "fees" | "nets" | "comparison" | "sunrise";

/**
 * A proportion a reader can check at a glance: the value is printed as
 * text, the bar only restates it, and every pair is a figure the article
 * itself states.
 */
export interface InterludeBar {
  label: string;
  value: string;
  pct: number;
}

/**
 * Free-licence photographs (Wikimedia Commons) used where the article's
 * argument needs a picture the reporting did not ship. Each entry is
 * credited where it is placed; licenses are CC BY / CC BY-SA.
 */
export const IMAGE_CREDITS: Record<string, string> = {
  streetCricket: "Street cricket in Kerala. Vishnu gs, Wikimedia Commons, CC BY 3.0.",
  maidan: "Cricket pitches at Azad Maidan, Mumbai. David.Clay.Photography, Wikimedia Commons, CC BY-SA 4.0.",
  willowLogs: "Willow logs for making cricket bats. Mike Prince, Wikimedia Commons, CC BY 2.0.",
  batStore: "Cricket bats in a store, Bengaluru. Gpkp, Wikimedia Commons, CC BY-SA 4.0.",
  academy: "Abhimanyu Cricket Academy, Dehradun. Vjtechno, Wikimedia Commons, CC BY-SA.",
  eden: "Eden Gardens, Kolkata, before a match. Chippu Abraham, Wikimedia Commons, CC BY-SA.",
  playground: "A school playground in India. Teacher1943, Wikimedia Commons, CC BY-SA 4.0.",
  schoolKids: "School children at a rural government school in Kanchipuram, Tamil Nadu. McKay Savage, Wikimedia Commons, CC BY 2.0.",
};

export const SHOTS = {
  krantiGaud:
    "https://images.news18.com/ibnlive/uploads/2026/09/SaveClip.App_645690424_18072804986540873_5017737964892763456_n-2026-09-24edc84b94d68641ff6fbe500f3f45dd.jpg?impolicy=website&width=0&height=0",
  meerutPoster:
    "https://images.news18.com/ibnlive/uploads/2026/09/Untitled-design-2026-09-998ddac1fd544219a5183a6eb985c1b7.png?impolicy=website&width=0&height=0",
  gearHands:
    "https://images.news18.com/ibnlive/uploads/2026/09/WhatsApp-Image-2026-09-17-at-18.36.02-2026-09-4cfd8e674bb4d8edd5de92deb83cefe7.jpeg?impolicy=website&width=0&height=0",
  streetCricket:
    "https://upload.wikimedia.org/wikipedia/commons/2/21/Street_cricket.jpg",
  maidan:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Azad_Maidan_in_Mumbai.jpg/1280px-Azad_Maidan_in_Mumbai.jpg",
  willowLogs:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Willow_Logs_for_making_Cricket_Bats_%2814387643178%29.jpg/1280px-Willow_Logs_for_making_Cricket_Bats_%2814387643178%29.jpg",
  batStore:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Cricket_bats_in_a_store%2C_RR_Nagar%2C_Bangalore_%282026%29.jpg/1280px-Cricket_bats_in_a_store%2C_RR_Nagar%2C_Bangalore_%282026%29.jpg",
  academy:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Abhimanyu%20Cricket%20Academy%20%E2%80%93%20Dehradun.jpg?width=1280",
  eden: "https://commons.wikimedia.org/wiki/Special:FilePath/Eden%20Gardens%20Kolkata.jpg?width=1280",
  playground: "https://commons.wikimedia.org/wiki/Special:FilePath/Puranchandra%20Vidyaniketan.JPG?width=1280",
  schoolKids: "https://commons.wikimedia.org/wiki/Special:FilePath/Tamil%20Nadu%20school%20kids.jpg?width=1280",
} as const;

/* Scene step copy: drawn from sentences the article already contains. */
const KIT_STEPS: SceneStep[] = [
          { k: "The kit", v: "A youngster, aiming to become a professional batter, for instance, needs at least a couple of bats, a few pairs of gloves, batting pads, a helmet, spikes, other protective guards, and a kit bag to keep it all in." },
          { k: "What wears out", v: "For this cricketer, playing most days a week, each bat will last up to a year, and pads, gear (like the abdomen guard), spikes, and helmets will be fine for a few seasons." },
          { k: "The gloves", v: "Gloves last for a year if worn rotationally and can be pushed for two if meticulously taken care of." },
          { k: "The body", v: "Then, cricketers require extra investment in their bodies, like protein-rich nutrition and strength and conditioning work." },
          { k: "Being seen", v: "Add to it the actual cricket practice expenses, tournament fees, and travel, and the conservative costs of pursuing the sport professionally come to around ₹3,00,000 annually or about ₹25,000 a month." },
          { k: "The threshold", v: "In 2022, a ‘State of Inequality in India’ report released by the Economic Advisory Council to the Prime Minister said that a citizen earning a monthly income of ₹25,000 was in the top 10% of earners in India." },
        ];

const EXCLUSION_STEPS: SceneStep[] = [
          { k: "0.12%", v: "Minz is the only Adivasi cricketer to have ever played in the IPL, taking Adivasi representation in the league to be around 0.12% when they make up to 9% of India’s population." },
          { k: "Five out of six", v: "According to the Global Multidimensional Poverty Index 2021, five out of six multidimensionally poor people in India live in households whose head is from a Scheduled Tribe (ST), a Scheduled Caste (SC), or Other Backward Class (OBC)." },
          { k: "34% and 28%", v: "The Annual Status of Education Report (ASER) 2024, a citizen-led survey, found that around 34% of the primary schools and 28% of the upper primary or higher level schools in rural India didn’t have a playground." },
          { k: "Less than 5%", v: "About 80% of schools had sports equipment available, but less than 5% of primary schools had a separate Physical Education teacher." },
        ];

const DIVERGENCE_STEPS: SceneStep[] = [
          { k: "1988", v: "They are often cited as examples of merit — people remember their famous 1988 Harris Shield semi-final partnership and say both were equally talented, were almost at the same point in their lives, but one ended up becoming the greatest of all time and the other, labelled an alcoholic, is still struggling." },
          { k: "The same coach", v: "While he and Tendulkar were both equally supported by Ramakant Archrekar, Kambli used to travel from and back to a confrontational room of 17 others." },
          { k: "One start", v: "While Tendulkar was born to a poet-professor father and a government employee mother, Kambli’s story is hidden in the fifth paragraph of this article, in Vikas’ name, beginning with an abusive father, a mechanic, and a loving mother who died when he was 20." },
          { k: "What differed", v: "Dr. Dove’s research found that parents’ emotional support was crucial for talented cricketers, and only one of Tendulkar and Kambli had that, despite their arguably similar skill sets." },
        ];

export const CHAPTERS: Chapter[] = [
  {
    id: "prologue",
    num: "01",
    title: "",
    blocks: [
      { kind: "lead", text: "Aman is an excellent batter. He wakes up at 6 am, works at a kirana shop until 10 am for a daily wage of ₹200, then goes to cricket practice. Hours later, he returns home, makes lunch, and goes back again." },
      { kind: "p", text: "Harmandeep, a quality all-rounder, delivers food for a mess and earns three meals in return. He spends most of the rest of his time practicing cricket." },
      { kind: "p", text: "Hussain is a teenage fast-bowler who already bowls at 125-130 kph. In the evening after 4:30, he sets up a stall selling bhunja, a popular street snack. Whenever he is on the ground, he just bowls and bowls." },
      { kind: "p", text: "Priya’s father doesn’t approve of her playing cricket. Her mother took up sewing, in addition to being a homemaker, just so she can fund her daughter’s daily travel to the academy, which is 10 kilometres away from their home." },
      { kind: "p", text: "Vikas lives in a single-room, one-bathroom chawl with 17 other joint-family members, including a father who physically assaults him. The food is always scarce at the end of the month, so Vikas often survives on rotis and bananas or chillis. He stole and sold some auto parts to buy his first bat, and did just enough to catch the eye of a famous coach." },
      { kind: "p", text: "You didn’t know these people until now because they are not real — the names are made up to safeguard their identities. But their stories are factual." },
      { kind: "p", text: "Here are some names you might know: Kranti Gaud’s mother sold her jewelry to buy her a cricket kit; Sakib Hussain’s mother sold her jewelry so he could finally own a pair of spikes and stop playing in slippers; Mukul Choudhary’s father sold his house to fund his cricket career; Yashasvi Jaiswal sold pani puri to make ends meet after he left his Uttar Pradesh home to live in Mumbai; Tilak Varma played with a broken bat for weeks until his coach chipped in because he couldn’t afford a replacement." },
      { kind: "figure", ref: "knownNames" },
      { kind: "p", text: "Every IPL and WPL auction brings with it a few such rags-to-riches stories. Local and national media make their base outside the house of these protagonists, celebrating them for their hardships and praising Indian cricket for the opportunity and democracy. That is, until payday comes for an even poorer cricketer, emerging from even worse circumstances." },
      { kind: "p", solo: true, text: "Somewhere in this merry-go-round hoorah, we miss the point — why is it so difficult?" },
      { kind: "interlude", variant: "willow", label: "Twenty years to a bat", notes: ["English willow comes from specialised trees in England that take 20 years to be ready, even as their farmers fight pressure from housing companies and the like.", "Then, T20 requires lighter bats, which are brittle and break down easily."] },
      { kind: "shot", w: 1280, h: 960, src: SHOTS.willowLogs, alt: "Cut willow logs stacked for curing, to be made into cricket bats", caption: IMAGE_CREDITS.willowLogs },
      { kind: "screen", text: "Why does it require a mother to sell her jewellery, or a father his house, or a son to leave his home forever, or work menial jobs, or steal, not even to educate himself in the best colleges, but to play a sport, and take the chance at making a career out of it?" },
    ],
  },
  {
    id: "the-cost",
    num: "02",
    title: "The cost",
    blocks: [
      { kind: "p", text: "In a recent interview, the Board of Control for Cricket in India (BCCI) secretary Devajit Saikia was asked about cricket being an expensive sport and how most of the current crop of international stars in India come from humble backgrounds." },
      { kind: "quote", text: "“He comes from a humble background and is at the highest level of cricket, driving the most posh vehicles; how is this possible?\" Saikia retorted. “Having a posh apartment in prime areas in the metropolises. How is it possible? … There is a concrete support system, and I’ll not disclose any further. Whoever has talent, whoever has merit, a lot of people are supporting. I haven’t heard a single complaint that a boy can’t play because he doesn’t have boots, a bat, or pads. All the associations and clubs are doing a good job. The BCCI is very benevolent, very liberally supporting all the state associations, and the associations are in turn helping the districts, who are helping the clubs. If there’s a good or amazing cricketer, there is no hurdle in his pathway.\"" },
      { kind: "p", text: "The ground reality, as News18 has discovered after conversations with several coaches, cricketers, cricket parents, academics and those working around the sport, is different. A support system does exist for those who can’t afford cricket, but the lines of it are blurrier than concrete, and few go through the BCCI’s benevolence." },
      { kind: "p", text: "Let’s start with the cost of playing cricket. A youngster, aiming to become a professional batter, for instance, needs at least a couple of bats, a few pairs of gloves, batting pads, a helmet, spikes, other protective guards, and a kit bag to keep it all in." },
      { kind: "scene", ref: "kit", label: "What the bag has to hold", steps: KIT_STEPS },
      { kind: "p", text: "For this cricketer, playing most days a week, each bat will last up to a year, and pads, gear (like the abdomen guard), spikes, and helmets will be fine for a few seasons. Gloves last for a year if worn rotationally and can be pushed for two if meticulously taken care of." },
      { kind: "p", text: "Then, cricketers require extra investment in their bodies, like protein-rich nutrition and strength and conditioning work. Add to it the actual cricket practice expenses, tournament fees, and travel, and the conservative costs of pursuing the sport professionally come to around ₹3,00,000 annually or about ₹25,000 a month." },
      { kind: "p", text: "In 2022, a ‘State of Inequality in India’ report released by the Economic Advisory Council to the Prime Minister said that a citizen earning a monthly income of ₹25,000 was in the top 10% of earners in India. This means a family of two working people, which can afford one kid’s pursuit of cricket professionally after likely cutting down on several basic expenses, would belong to the most privileged 10% of the country." },
      { kind: "figure", ref: "budgetPlanner" },
      { kind: "p", solo: true, text: "That doesn’t scream democratic, does it?" },
    ],
  },
  {
    id: "support",
    num: "03",
    title: "Cricket’s Support",
    blocks: [
      { kind: "quote", text: "“Cricket bahut mahanga khel hai, bahut mahanga khel, (Cricket is a very expensive sport, a very expensive sport),\" Ashif Haque, a coach at the Sonnett club in Ranchi, who played a pivotal role in the rise of the first Adivasi cricketer in the IPL, Robin Minz, tells News18." },
      { kind: "p", text: "About 200 kids play in Haque’s academy. 20 of them study in free-of-cost government schools, so Haque takes care of some of their expenses." },
      { kind: "interlude", variant: "blades", label: "Two hundred children, twenty on free places", notes: ["About 200 kids play in Haque’s academy. 20 of them study in free-of-cost government schools, so Haque takes care of some of their expenses."] },
      { kind: "quote", text: "“How will a child pay the academy fee when his family cannot even afford his school fees?\" he asks. “For such children, admission, match travel and tournament entry are free. We try to provide everything.\"" },
      { kind: "shot", w: 1280, h: 720, src: SHOTS.academy, alt: "Young cricketers training at a cricket academy", caption: IMAGE_CREDITS.academy },
      { kind: "p", text: "In Lucknow, entrepreneur Saroj Yadhuvanshi runs a scholarship program. They visit villages and small towns in Uttar Pradesh to invite children to give trials (after a registration fee of around ₹1,500) and, after what they describe as a rigorous and fair selection process, give a one-year scholarship — including gear, accommodation, and food — to five hopefuls." },
      { kind: "interlude", variant: "selection", label: "A one-year scholarship, five hopefuls", bars: [ { label: "Registration for a trial", value: "about ₹1,500", pct: 2 }, { label: "A year in a city: hostel, training, food", value: "₹1–1.5 lakhs", pct: 100 } ], notes: ["If a farmer has small land and no other source of income besides farming, how much can he give to a child?", "A farmer’s entire year’s income may not even be that much."] },
      { kind: "quote", text: "“If a farmer has small land and no other source of income besides farming, how much can he give to a child?\" Yadhuvanshi says. “If the child comes to a city like Lucknow and stays in a hostel and trains properly, the annual expense is easily ₹1–1.5 lakhs. A farmer’s entire year’s income may not even be that much.\"" },
      { kind: "p", text: "In Jaipur, coach Surendra Rathore, who has coached Kamlesh Nagarkoti and several other Rajasthan-level players, keeps his tutelage free for 20% of his cohort." },
      { kind: "panel", layout: "wide", w: 1280, h: 617, src: SHOTS.maidan, alt: "Cricket pitches across the sports fields of Azad Maidan, Mumbai", credit: IMAGE_CREDITS.maidan },
      { kind: "quote", text: "“For a child from an average family, it has become very difficult to purchase cricket equipment,\" he says. “If he can’t even buy the equipment, how will he showcase his talent?\"" },
      { kind: "p", text: "Rathore says that this has a direct effect on the kids’ confidence and progress." },
      { kind: "quote", text: "“You see, a less talented player with a very good bat can hit sixes and fours with just a little power,\" he says. “A very talented child, if he can’t compare with his teammates because of his kit, will be emotionally and mentally disturbed, and that will definitely affect his game.\"" },
      { kind: "p", text: "Badruddin Siddiqui, the coach of Mohammed Shami and Mohsin Khan, also says that the costs beyond academy fees deter parents of talented cricketers the most." },
      { kind: "quote", text: "“For parents, it is a huge struggle,\" Siddiqui asserts. “They get told that their kid has a lot of talent and, like everyone, they naturally want them to do well. They try everything, try so hard, but if it stretches on for a few years, they break. And a child needs at least two or three years of continuous cricket to develop.\"" },
      { kind: "p", text: "This is not a unanimous view. Some coaches that this website speaks to say, like Saikia, that they have never seen a talented player left behind because he couldn’t afford to play, insisting that once coaches spot the talent, they do all in their power to help them, from using their contacts to arrange gear to bearing some of the expenses themselves." },
      { kind: "quote", text: "“An IAS aspirant from Bihar studies under a lamp on the road, and still becomes an officer,\" Sukhwinder Bawa, a former cricketer, coach and father of Mumbai Indians all-rounder Raj Angad, says. “Business requires capital. Cricket is the biggest industry, and it is highly paid; to reach there, you have to invest something. If a talented player comes through, we find some or the other arrangement to make sure they have every piece of equipment they need.\"" },
      { kind: "p", text: "Mohul Bhowmick, a cricketer in Hyderabad who also works part-time, has a different opinion when apprised of this. “There are lakhs of kids from poor backgrounds trying to make it; how many could a few coaches help?\" he says." },
      { kind: "p", text: "Moreover, if, as Siddiqui believes, it requires a few years for kids to showcase their true skill, then even if money can’t buy them talent and hard work, it at least permits them this time to develop." },
      { kind: "quote", text: "“Two or three families who sacrifice a lot see their kids get the chance early and make it count,\" Siddiqui says. “But there are so many more whose kids don’t even get that opportunity. Their parents make the initial investment, but after a point, they have to choose between cricket and studies because they can only afford one. They think that a good education has a higher odds of success and choose that.\"" },
      { kind: "p", text: "What the BCCI has done well is distribute its cricket earnings to national tournaments. Match fees in the Ranji Trophy alone could range from ₹ 40,000 to ₹ 60,000 per day, which means that cricketers of decent stature can earn upwards of ₹15-20 lakhs per year by working hard enough to get selected in multiple tournaments." },
      { kind: "interlude", variant: "fees", label: "What the game pays, to the few who reach it", bars: [ { label: "Ranji Trophy match fee, per day", value: "₹40,000–60,000", pct: 60 }, { label: "A season of selections, per year", value: "₹15–20 lakhs", pct: 100 }, { label: "Under-16 match fee, against a senior’s", value: "about half", pct: 30 } ], notes: ["Even if one student from all cricket academies in Jaipur, one of the 41 districts in Rajasthan, were to make it to the state level, there would need to be 200 vacant spots, which don’t exist."] },
      { kind: "p", text: "And earnings begin as early as under-16 cricket, where match fees are about half of those of senior players. Some coaches rightly point out how there aren’t many professions where 16-year-olds earn this much and get fame for good measure." },
      { kind: "p", text: "That also lures families because while most of the fame and prestige is in playing for India and the IPL, getting to a level or two below that is enough to build a life." },
      { kind: "p", text: "But, again, those who earn are exceptions, dwarfed by the sheer number of aspirants — Rathore explains that even if one student from all cricket academies in Jaipur, one of the 41 districts in Rajasthan, were to make it to the state level, there would need to be 200 vacant spots, which don’t exist." },
      { kind: "quote", text: "“Suppose a child starts playing cricket at eight or nine, and his first board tournament is Under-16,\" Rathore adds. “He’ll get three or four matches — even if you calculate ₹40,000 per match, that makes about ₹2 lakhs for four matches. But his yearly fees, equipment, diet, training, it all costs two lakh rupees a year. Where is the earning? There is no return on investment. If he spends ₹1.5-2 lakhs yearly from age eight to fifteen, that’s ₹14-15 lakhs spent just to reach that level.\"" },
      { kind: "p", text: "In either case, in urban India, it’s these coaches and their connections to rich philanthropists that form the cricket support system. The state boards are hardly involved in it." },
      { kind: "panel", layout: "wide", w: 1600, h: 900, src: SHOTS.gearHands, alt: "Cricket equipment being manufactured at Apex Cricket (JS Enterprises) in Meerut", credit: "Apex Cricket (JS Enterprises), Meerut. (News18)" },
      { kind: "p", text: "Of course, some coaches are also driven by the recognition and the possibility of getting more enrollments even if one of their pupils reaches the IPL. But with a bit more backing, several are willing to forego their profits." },
      { kind: "quote", text: "“Not just me, many people are doing this,\" Rathore says of helping cricketers. “But we can only do so much; we also have no backup. We haven’t received any government aid. If we had a scheme where the government allotted us land so we didn’t have to pay rent for the academy, we could make many more children’s costs free. Many things could be done to lower the cost, but we need that authorised support.\"" },
    ],
  },
  {
    id: "demand",
    num: "04",
    title: "Cricket’s Demand",
    blocks: [
      { kind: "p", text: "Some reasons why cricket is so expensive, and thus elitist, are conspicuous in this love. It’s India’s favorite sport to watch, and for many, it’s a genuine gamble, because even if the floor might not be great, the ceiling of success is gigantic." },
      { kind: "shot", src: SHOTS.eden, alt: "Eden Gardens stadium in Kolkata before a match", caption: IMAGE_CREDITS.eden },
      { kind: "p", text: "Yadhuvanshi says that the demand is on such a rise that his scholarship in Lucknow is receiving applicants from beyond Uttar Pradesh, from Assam, West Bengal and even Nepal." },
      { kind: "p", text: "Rathore, on the flip side, blames parents’ over-enthusiasm in pushing their kids into cricket." },
      { kind: "p", text: "He argues that not many parents want to accept it as just recreation, so even those kids who are indifferent about it, or have physiques that don’t match the sport’s needs, are pushed into seeing it as a career path, which inflates the prices." },
      { kind: "quote", text: "“And the cricket businessmen don’t focus on the local kids; their biggest business comes from the middle class and local cricket,\" Siddiqui adds. “They give free equipment to the top-level players, who don’t even need it because they get paid to use the brand. So then they have to recover their money from the children. It’s a difficult cycle to break.\"" },
      { kind: "p", text: "Several of the interviewees also mentioned how the prices of bats and gear have skyrocketed in recent months." },
      { kind: "p", text: "Varun Kumar of Apex Cricket (JS Enterprises) in Meerut, who has been in the manufacturing and wholesale business of cricket equipment for years, has an AI-designed warning written over his business’ poster: ‘From today onwards, the rates of all cricket goods have been increased by 35% because raw material has gotten more expensive’." },
      { kind: "panel", layout: "float-right", w: 853, h: 1280, src: SHOTS.meerutPoster, alt: "A warning written over the business poster at Apex Cricket (JS Enterprises) in Meerut, announcing a 35% increase in the rates of all cricket goods", line: "“From today onwards, the rates of all cricket goods have been increased by 35% because raw material has gotten more expensive.”", credit: "Apex Cricket (JS Enterprises), Meerut. (News18)" },
      { kind: "p", text: "He tells News18 that this relates to a rise in import costs for petroleum-based raw materials like nylon and synthetic leather, which are used for gloves, pads and other safety equipment. That, in turn, stems from the ongoing war in West Asia." },
      { kind: "p", text: "But its impact is relatively small. The lion’s share of exorbitant costs goes into retailers’ margins." },
      { kind: "p", text: "Kumar explains that making a pair of gloves costs them ₹700 in raw material, ₹350 in labor charges, and ₹150 in electricity and rent expenses, on which they take a ₹100-200 profit." },
      { kind: "figure", ref: "priceLadder" },
      { kind: "shot", w: 1280, h: 960, src: SHOTS.batStore, alt: "Cricket bats on display in a sports shop", caption: IMAGE_CREDITS.batStore },
      { kind: "quote", text: "“We manufacture products for shops and academies under their own names,\" he says. “They take the same glove that cost them ₹1,400 from us, put an MRP of ₹3,000, ₹4,000, even ₹6,000 on it, then offer a 25% discount, so the customer happily pays ₹2,500–3,000. If I sold that same glove directly to a customer, my genuine price would be ₹1,600. Even big academies sell those products at a high price to their students. The demand is there, and retailers know that if a customer arrives in a big car, they will pay.\"" },
      { kind: "p", text: "As for bats, the costs have been going up worldwide because of a severe crunch in English and Kashmir willows, which is being described as a ‘bat emergency’." },
      { kind: "p", text: "English willow comes from specialised trees in England that take 20 years to be ready, even as their farmers fight pressure from housing companies and the like. Then, T20 requires lighter bats, which are brittle and break down easily." },
      { kind: "p", text: "Yet it’s the professionals playing at the highest level who hoard the best wood, just because they can." },
      { kind: "p", text: "Climate change is making it more difficult by the day, which also affects Kashmir Willow’s production. The Marylebone Cricket Club (MCC) has had to amend the Laws of Cricket to permit laminated bats — made as a combination of different types of wood — in open-age recreational cricket to alleviate some pressure on high-quality willow." },
      { kind: "p", text: "The ICC hasn’t yet woken up to the irony, but it has a sponsorship agreement which involves ‘donating’ ten cricket kits to grassroots levels for every 100 runs scored in an ICC tournament. Until a long-term solution is found, the most basic cricket need, the equipment, will continue to offer undue advantage to those who can afford it." },
    ],
  },
  {
    id: "exclusion",
    num: "05",
    title: "Cricket’s Exclusion",
    blocks: [
      { kind: "p", text: "So far, we have talked about class. But in India’s context, it’s almost impossible to untangle it from caste and religion." },
      { kind: "p", text: "Minz is the only Adivasi cricketer to have ever played in the IPL, taking Adivasi representation in the league to be around 0.12% when they make up to 9% of India’s population. There have been claims of some cricketers belonging to the Dalit community playing for the Indian men’s team, but none accept it as their identity publicly, and even the reported ones make up a fraction of the total." },
      { kind: "scene", ref: "exclusions", label: "Two hundred children, read four ways", steps: EXCLUSION_STEPS },
      { kind: "p", text: "There has been negligible research on this under-representation. But it has been academically ascertained that India’s caste system is a major driver of economic disparity between different population groups." },
      { kind: "p", text: "According to the Global Multidimensional Poverty Index 2021, five out of six multidimensionally poor people in India live in households whose head is from a Scheduled Tribe (ST), a Scheduled Caste (SC), or Other Backward Class (OBC)." },
      { kind: "p", text: "India has one of the highest populations of child laborers. The United Nations in 2022 found that most belong to the marginalised communities. Global research has found that a significant portion of child laborers don’t attend school, the first place where they can be exposed to cricket or other sports." },
      { kind: "panel", layout: "float-left", w: 1440, h: 1914, src: SHOTS.krantiGaud, alt: "Cricketer Kranti Gaud and her mother", line: "Kranti Gaud’s mother sold her jewelry to buy her a cricket kit", credit: "Kranti Gaud. (Instagram, via News18)" },
      { kind: "p", text: "Sports are known to uplift people from such social barriers all around the world, but cricket is rarely the choice for rural India, where most of the population still resides." },
      { kind: "p", text: "For example, in 2009, Sanjay Pathak, a geography teacher in a government school in Bihar, took it upon himself to teach athletics to the girls in his school." },
      { kind: "p", text: "Clearing ancestral land to establish a club, he fought brickbats from colleagues (who don’t consider sports a career), trespassing from village boys, caste barriers, and patriarchy to polish dozens of talents who are now playing at the national level." },
      { kind: "quote", text: "“Children play cricket everywhere—gully cricket, mohalla cricket, on the roads—but organised cricket is expensive,\" Pathak says now. “You need a ground, proper pitch, equipment, bats, pads, and academy fees. Many children cannot afford these things. In comparison, athletics, football, and other sports require less time—one or one-and-a-half hours, a fixed routine, and a ball that costs ₹1,000.\"" },
      { kind: "p", text: "Pathak says that government schools allot about 45 minutes daily for Physical Education, which can be used for athletics but is nowhere near enough to train cricket." },
      { kind: "interlude", variant: "clock", label: "Forty-five minutes a day", bars: [ { label: "Physical Education in a government school, daily", value: "45 minutes", pct: 45 }, { label: "What athletics or football need", value: "1–1.5 hours", pct: 90 } ], notes: ["Children play cricket everywhere—gully cricket, mohalla cricket, on the roads—but organised cricket is expensive.", "You need a ground, proper pitch, equipment, bats, pads, and academy fees. Many children cannot afford these things.", "In comparison, athletics, football, and other sports require less time—one or one-and-a-half hours, a fixed routine, and a ball that costs ₹1,000."] },
      { kind: "quote", text: "“The sports curriculum should be made compulsory, and special hours should be fixed for children who are serious about sports,\" he says. “We have Eklavya centres in Bihar for Olympic sports—children live, eat, and train in the same school. For cricket, unless the government creates a similar structure, the real talent, which comes from our villages, won’t emerge and large-scale progress is impossible.\"" },
      { kind: "p", text: "Dr. Biju Philip, an academic and lecturer at La Trobe University, Australia, has spent years studying how sport can be used as a vehicle for social inclusion in rural India, working with multiple tribal communities. His choice of sport was also football." },
      { kind: "quote", text: "“A few years ago, someone asked me, ‘Why not cricket?’ I said clearly that cricket is mostly for the rich,\" he remembers. “An ordinary person has to buy a bat, pad, top, shorts, and boots. How do they afford that? For these communities, football was already a stretch. Cricket would be out of the question.\"" },
      { kind: "p", text: "There are more reasons for India’s marginalised castes and communities to remain so far from cricket — like active discrimination, which needs to be studied — but the sheer expense to play has been damaging enough." },
    ],
  },
  {
    id: "talent",
    num: "06",
    title: "Cricket’s Talent",
    blocks: [
      { kind: "p", text: "All countries, including England and Australia, are still grappling with making the sport more inclusive among their downtrodden masses. But a congruous comparison for India could be found in South Africa, which carries similar scars of colonisation and inequality." },
      { kind: "p", text: "Historical estimates suggest that the white population of South Africa—making up roughly 7% to 8% of the population—owns a disproportionate 70% share of the country’s wealth. It’s one of the reasons why cricket in South Africa was for years dominated by white men." },
      { kind: "p", text: "Dr. Mary Ann Dove, a researcher with a PhD in Sport and Exercise Science from the University of Cape Town, has worked abundantly in understanding the socio-ecological factors in cricketers’ talent development in South Africa." },
      { kind: "quote", text: "“The fundamental issue my research found was that access to opportunities and competition is probably the most central aspect in talent development,\" she says." },
      { kind: "p", text: "The first part of ‘access’ is education. Children who attend better-resourced schools with cricket facilities have an advantage." },
      { kind: "p", text: "In India, about half of the school students study in government schools, and most belong to the rural regions and marginalised communities." },
      { kind: "p", text: "The Annual Status of Education Report (ASER) 2024, a citizen-led survey, found that around 34% of the primary schools and 28% of the upper primary or higher level schools in rural India didn’t have a playground. About 80% of schools had sports equipment available, but less than 5% of primary schools had a separate Physical Education teacher." },
      { kind: "shot", w: 1280, h: 960, src: SHOTS.playground, alt: "A school playground in India", caption: IMAGE_CREDITS.playground },
      { kind: "interlude", variant: "schools", label: "Where play could start", sub: "Rural India, Annual Status of Education Report 2024", bars: [ { label: "Primary schools with no playground", value: "34%", pct: 34 }, { label: "Upper primary or higher schools with no playground", value: "28%", pct: 28 }, { label: "Schools with sports equipment available", value: "80%", pct: 80 }, { label: "Primary schools with a separate PE teacher", value: "under 5%", pct: 4 } ] },
      { kind: "p", text: "Although not an audit of government schools per se, it paints a grim picture." },
      { kind: "p", text: "Financial heft impacts almost every aspect of cricket. Most of the Black Africans to have played for South Africa in men’s and women’s cricket have been bowlers, while Asians tend to be spinners. Batting has been almost exclusively reserved for white." },
      { kind: "p", text: "Coaches in India have also observed that those from financially weaker families tend to lean towards bowling over batting. Siddiqui says his students from rural areas choose bowling because it only requires them to invest in shoes, and not the specialised batting gear." },
      { kind: "screen", text: "“It’s not just in South Africa; look at why so many talented poor people adopt football,\" Rathore points out. “You buy one pair of studs, it lasts many days, and you play with just one ball. Wherever equipment becomes expensive for the talented and hardworking, that game moves further away. The best example: does everyone play golf? Does everyone play polo? To play polo, you need the capacity to keep a horse, space to keep it, and caretakers. The common public cannot play these games. But cricket — cricket humaare yahaan pe toh religion hai, cricket toh India mein puja jaata hai (Cricket shouldn’t be like this; it’s a religion here; it is worshipped in India!).\"" },
      { kind: "interlude", variant: "comparison", label: "Seven to eight per cent of the people, seventy per cent of the wealth", notes: ["Historical estimates suggest that the white population of South Africa—making up roughly 7% to 8% of the population—owns a disproportionate 70% share of the country’s wealth. It’s one of the reasons why cricket in South Africa was for years dominated by white men."] },
      { kind: "p", text: "In South Africa, Dr. Dove’s research says that this relates to cricket centres being farther from poorer neighborhoods and parents with long working hours and little savings struggling to find time for dropping and picking up their children from academies, forcing them to sleep less. India is no different, and examples of parents taking early retirements to commit to the kid’s cricket are quite common." },
      { kind: "p", text: "In another example, Dr. Dove’s research found that family responsibilities don’t allow some cricketers the choice to play cricket freely. In India, Yashasvi wasn’t the only Jaiswal who left UP for Mumbai in 2012 — his brother, Tejasvi, also did, but shifted to Delhi in just over a year to work as a salesman because their family back home was struggling financially." },
      { kind: "p", text: "Tejasvi only resumed his career after Yashasvi had made it." },
      { kind: "p", text: "A separate study for Cricket South Africa (CSA) found a ‘casual link’ between poor upbringing and diminished visual-motor skills which are paramount for batting. While more investment is required in the matter, academics speculate it could relate to exposure to better nutrition and something as simple as better toys at an early age." },
      { kind: "interlude", variant: "nets", label: "Diet is very important for any athlete", notes: ["A kid from a good family can maintain his diet—he gets the required calories throughout the day, and he manages his post-workout nutrition.", "But a kid from a village cannot do that, for he doesn’t have easy access to fruits, dry fruits, and the nutrients he needs.", "Because of this, they suffer more injuries and cramps while playing."] },
      { kind: "quote", text: "“Diet is very important for any athlete,\" Yadhuvanshi says, with observations from his scholarship. “A kid from a good family can maintain his diet—he gets the required calories throughout the day, and he manages his post-workout nutrition. But a kid from a village cannot do that, for he doesn’t have easy access to fruits, dry fruits, and the nutrients he needs. Because of this, they suffer more injuries and cramps while playing.\"" },
      { kind: "p", text: "Then there are role models. If no one playing a sport looks like you or comes from a similar background, it’s hard to believe that you can do it." },
      { kind: "quote", text: "“I sometimes call it a soup of factors,\" Dr. Dove says. “We found that people want a role model who looks like them and plays the same discipline.\"" },
      { kind: "p", text: "Haque adds that Minz’ rise to the IPL has caused a wave of cricket love in the Adivasi community of Ranchi, but an aspiring Dalit cricketer elsewhere will still need to squint to find an idol." },
      { kind: "p", text: "Affirmative action in South Africa, namely quotas from age-group cricket to the international level, where some spots are reserved for Black and Brown South Africans, was partially aimed at solving this problem." },
      { kind: "p", text: "It has sometimes been proposed as a solution to India’s cricket inequality, too. There are positive examples of it working: a report in The Wire in 2018 noted that India’s women’s cricket team has been more representative of marginalised communities than men." },
      { kind: "p", text: "Women’s cricket is mainly supported by the Railways department of the Indian government, which, unlike private corporates, hires across qualification levels and offers reservations." },
      { kind: "p", text: "But Dr. Dove and other researchers have regularly found that although quotas can be helpful at the age group level to create equal opportunities and undo some of the historical wrongs, the application needs to be more nuanced." },
      { kind: "screen", text: "“Quotas don’t necessarily develop players holistically; they don’t change family lives, financial situations, or the mindset of coaches who don’t like being forced in picking specific players,\" Dr. Dove says. “Psychologically, the vast majority of players don’t want to be a quota pick. They don’t want to think they’re in the team because of their skin colour—or, in your case, their caste. They want to be there on merit, but they want to be allowed to prove themselves alongside proper development: coaching, facilities, nutrition, access to medical care when injured.\"" },
    ],
  },
  {
    id: "optimism",
    num: "07",
    title: "Cricket’s Optimism",
    blocks: [
      { kind: "p", text: "Some of those who have been there are adamant that bank accounts are only a small obstruction in the grand scheme of things. Irfan Sait of Bengaluru, one of the most renowned coaches in the country, says his years of experience have convinced him that ‘the number of hours will outweigh the number of rupees you spend’." },
      { kind: "quote", text: "“Haven’t we seen so many come from very ordinary financial backgrounds and go on to become better?\" he asks. “I think their level of focus, their desire, and the fire that burns in the belly to become something is stronger than what money can buy.\"" },
      { kind: "p", text: "Manzoor Pandav, the former Punjab Kings player, who worked as a part-time night watchman when he was building his cricket career in Kashmir, adds that ‘Anything is possible if you work hard and honestly’, and that ‘God also helps the hard workers’." },
      { kind: "p", text: "One common comment from the optimists is that playing even some cricket is good enough to build a career around it. Sait points out how coaches, journalists and officials can earn more than a decent living, while Pandav says there are exponentially more opportunities to play and earn from cricket in the valley, which he and a few hundred others are using." },
      { kind: "quote", text: "“Cricket has grown a lot now,\" Waseem Mirza, an Aligarh-based cricketer who plays in the UP T20 league, says in agreement. “There is so much exposure, and so many leagues have started. Even at the smaller levels, there is decent money. You may not earn a huge amount, but you can earn enough to spend your life well.\"" },
      { kind: "p", text: "But only a few kilometres of difference matters. In the middle of Pandav and Mirza’s states, in Uttarakhand, no IPL or Indian cricketer comes through until they migrate out in their development years, as Rishabh Pant did." },
      { kind: "figure", ref: "geography" },
      { kind: "p", text: "Locals say that the facilities like grounds, coaches, and private leagues are just not at a comparable level to traditional centres, though it doesn’t stop them from trying, in the hope of being the exceptions." },
      { kind: "quote", text: "“If you don’t reach the state level, your options for earning money are coaching, umpiring for corporate leagues, or becoming a scorer, but even those professions pay more in bigger cities,\" Ashwini Maurya, a cricketer in Haridwar, says." },
    ],
  },
  {
    id: "merit",
    num: "08",
    title: "Cricket’s Merit",
    blocks: [
      { kind: "p", text: "It all circles around to ‘merit’. While celebrating every success story, we make ourselves believe that sport is inherently meritorious, that if you are good, you’d be successful. The right yardstick, instead, is opportunity." },
      { kind: "p", text: "Just look at Sachin Tendulkar and Vinod Kambli. They are often cited as examples of merit — people remember their famous 1988 Harris Shield semi-final partnership and say both were equally talented, were almost at the same point in their lives, but one ended up becoming the greatest of all time and the other, labelled an alcoholic, is still struggling." },
      { kind: "scene", ref: "divergence", label: "The same start, two homes", steps: DIVERGENCE_STEPS },
      { kind: "p", text: "But being at the same place at one point in life doesn’t mean that both had the same start. While Tendulkar was born to a poet-professor father and a government employee mother, Kambli’s story is hidden in the fifth paragraph of this article, in Vikas’ name, beginning with an abusive father, a mechanic, and a loving mother who died when he was 20." },
      { kind: "p", text: "While he and Tendulkar were both equally supported by Ramakant Archrekar, Kambli used to travel from and back to a confrontational room of 17 others. Dr. Dove’s research found that parents’ emotional support was crucial for talented cricketers, and only one of Tendulkar and Kambli had that, despite their arguably similar skill sets." },
      { kind: "p", text: "So, it begs the question: even if BCCI selectors and IPL owners don’t look at anything but performance, do all the players in the pool of selection have had the same opportunity?" },
      { kind: "p", text: "The poorer you are, the more likely you are to grow up in a dysfunctional home, to either not study at all or study in a government school without a PT teacher, to live in a village with no cricket facilities, to not have the right diet to avoid injuries in the future, and to not be able to show your talent to a coach who can teach you and might help you with expensive gear." },
      { kind: "p", text: "There’s nothing in a name, just like age is just a number in sports. But your name depends on where you come from — your state, district, village, and caste — and so does the time you have to become a cricketer in India." },
      { kind: "p", text: "Three of the five cricketers mentioned in the introduction belong to the same academy, which has produced one IPL star and, in credit to its coaches, half a dozen state-level players. But over a hundred, rich and poor, are still toiling hard for the same reward, with similar dedication." },
      { kind: "interlude", variant: "sunrise", label: "The same opportunity, on paper", notes: ["On paper, all of them have the same opportunity, and only the best will prevail. But the time, emotional support, stress, fallback options, and the need to make it are vastly different."] },
      { kind: "p", text: "On paper, all of them have the same opportunity, and only the best will prevail. But the time, emotional support, stress, fallback options, and the need to make it are vastly different." },
    ],
  },
];

export interface Chapter {
  id: string;
  num: string;
  /** The article's own section heading, verbatim. Empty where it has none. */
  title: string;
  blocks: Block[];
}

export interface SourceRef {
  label: string;
  href?: string;
}

/*
 * Publication furniture. The byline is the author recorded in the source
 * document's own properties (Rudransh Khurana); the reading time is the source's
 * own word count at 200 words a minute. Every entry in the reading list is a
 * document the article itself names, in the article's own words for it.
 */
export const META = {
  title: "Rich Man’s Religion",
  subtitle: "How Cricket's Cost Makes It Out-Of-Reach To Half Of India",
  byline: "Rudransh Khurana",
  published: "18 September 2026",
  readTime: "About 26 minutes",
  sources: [
    { label: "Devajit Saikia, BCCI secretary, spoke about cricket's expenses in an interview.", href: "https://youtu.be/5j1r9X_DYsE" },
    { label: "Global Multidimensional Poverty Index 2021", href: "https://hdr.undp.org/content/2021-global-multidimensional-poverty-index-mpi" },
    { label: "Annual Status of Education Report (ASER) 2024", href: "https://asercentre.org/aser-2024/" },
    { label: "The United Nations, on child labour and caste, 2022", href: "https://www.thehindu.com/news/international/child-labour-caste-based-discrimination-poverty-closely-interlinked-in-india-un-special-rapporteur-tomoya-obokata/article65782342.ece" },
    { label: "The Wire, 2018", href: "https://m.thewire.in/article/caste/does-india-need-a-caste-based-quota-in-cricket" },
    { label: "Economic Advisory Council to the PM, State of Inequality in India, 2022" },
  ] as SourceRef[],
} as const;

/*
 * The only product arithmetic in the article: a manufacturer's own numbers for
 * one pair of gloves, given to News18 on the record.
 */
export const PRICE_LADDER = {
  unit: "One pair of batting gloves",
  steps: [
    { k: "Raw material", v: 700, note: "₹700 in raw material" },
    { k: "Labour", v: 350, note: "₹350 in labor charges" },
    { k: "Electricity and rent", v: 150, note: "₹150 in electricity and rent expenses" },
    { k: "Profit", v: 150, note: "a ₹100-200 profit on each pair" },
  ],
  mrp3: 3000,
  mrp4: 4000,
  mrp6: 6000,
  paidLabel: "₹2,500–3,000",
  factoryGate: 1400,
  discount: 25,
  paid: 3000,
  directPrice: 1600,
} as const;
