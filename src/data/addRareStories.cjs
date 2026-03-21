/**
 * addRareStories.cjs
 *
 * Run this from the root of your project (where imageStories.json lives):
 *   node addRareStories.cjs
 *
 * It reads imageStories.json, appends 15 rare Indian heritage entries,
 * and writes the updated array back to the same file.
 */

const fs   = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'imageStories.json');

const newEntries = [
  {
    id: 31,
    media_type: "image",
    media_url: "/storypageimg/sp31.png",
    title: "Nongkrem Dance: Khasi Harvest Ritual",
    description: "Held in the Smit village of Meghalaya every November, Nongkrem is the most sacred festival of the Khasi tribe — a five-day thanksgiving to the goddess Ka Blei Synshar for a good harvest. Young women in silver crowns and silk jainsems dance in slow, hypnotic circles while men in warrior headdresses move outward. Tourists rarely find it; even most Shillong residents have never witnessed it.",
    location: { city: "Smit, Meghalaya" },
    likes_count: 112,
    comments_count: 14,
    tags: ["Meghalaya", "KhasiTribe", "NongkremDance", "HarvestFestival", "OffbeatNortheast"]
  },
  {
    id: 32,
    media_type: "image",
    media_url: "/storypageimg/sp32.png",
    title: "Pakhal Lake: Kakatiya's Forgotten Sea",
    description: "Built by the Kakatiya king Ganapati Deva in the 13th century, Pakhal Lake near Warangal in Telangana is an enormous artificial lake stretching over 30 sq km — built entirely without modern machinery. Crocodiles bask on its banks and migratory birds crowd its shores every winter, yet almost no one outside the region knows its name. The ruins of a Shiva temple half-submerged at its edge are visible only in dry summers.",
    location: { city: "Warangal, Telangana" },
    likes_count: 87,
    comments_count: 11,
    tags: ["Telangana", "KakatiyanHeritage", "HiddenLake", "AncientEngineering"]
  },
  {
    id: 33,
    media_type: "image",
    media_url: "/storypageimg/sp33.png",
    title: "Bastar Dussehra: 75 Days, No Rama",
    description: "While the rest of India celebrates Dussehra for ten days in honour of Rama's victory, Bastar in Chhattisgarh runs its own version for 75 days — and Rama doesn't appear at all. This is entirely a tribal festival of the Gondi goddess Danteshwari, managed by the Muria and Gond tribes. The rituals involve a sacred wooden chariot, a young girl chosen as the goddess's vessel, and centuries of unbroken protocol that outsiders rarely get to witness.",
    location: { city: "Jagdalpur, Chhattisgarh" },
    likes_count: 203,
    comments_count: 29,
    tags: ["Chhattisgarh", "BastatDussehra", "TribalFestival", "GondTribe", "HiddenIndia"]
  },
  {
    id: 34,
    media_type: "image",
    media_url: "/storypageimg/sp34.png",
    title: "Aranmula Kannadi: Mirror with No Glass",
    description: "Made only in Aranmula village in Kerala, the Aranmula Kannadi is the world's only metal surface mirror — it reflects without glass, using a secret bronze alloy formula held by just a handful of families for over 400 years. It is a GI-tagged craft, considered auspicious and given as gifts at weddings. The formula has never been written down — it passes only from father to son, lips to ear.",
    location: { city: "Aranmula, Kerala" },
    likes_count: 178,
    comments_count: 22,
    tags: ["Kerala", "AranmulaKannadi", "DyingCraft", "MetalMirror", "GITag"]
  },
  {
    id: 35,
    media_type: "image",
    media_url: "/storypageimg/sp35.png",
    title: "Singpho Phalap: India's First Tea",
    description: "Long before the British planted tea in Darjeeling, the Singpho tribe of Arunachal Pradesh and upper Assam were brewing Phalap — a fermented compressed tea aged inside bamboo shoots. It was the Singpho chief Bessa Gam who first introduced tea leaves to the British in 1823. Today, a handful of Singpho families in Margherita still make Phalap the ancient way, and you can drink it sitting on the porch of their bamboo longhouses.",
    location: { city: "Margherita, Assam" },
    likes_count: 94,
    comments_count: 13,
    tags: ["Assam", "SingphoTribe", "AncientTea", "PhalapTea", "TribalHeritage"]
  },
  {
    id: 36,
    media_type: "image",
    media_url: "/storypageimg/sp36.png",
    title: "Deodhani: When the Goddess Possesses the Dancer",
    description: "Performed in the Kamakhya temple region of Assam, Deodhani is a ritual dance where the performer enters a trance state and is believed to be possessed by the serpent goddess Manasa. The dancer moves barefoot over sharp objects, eyes glazed, to the thundering beat of dhols and cymbals. It is not a performance — it is a religious event. Cameras are often quietly asked to be put away.",
    location: { city: "Guwahati, Assam" },
    likes_count: 145,
    comments_count: 19,
    tags: ["Assam", "Deodhani", "SerpentGoddess", "RitualDance", "Kamakhya"]
  },
  {
    id: 37,
    media_type: "image",
    media_url: "/storypageimg/sp37.png",
    title: "Balpakram: Land of the Perpetual Wind",
    description: "The Garo tribe of Meghalaya believe that the souls of the dead rest in Balpakram — a dramatic plateau of gorges, carnivorous plants, and permanent gale-force winds in southern Meghalaya. It is a national park, but almost no tourists ever visit. The landscape shifts between dense forest and sudden cliffs dropping hundreds of metres, with ancient marine fossils embedded in its exposed rock faces — remnants of an ocean that once covered this land. The Garos still leave food offerings at its edge for their ancestors.",
    location: { city: "South Garo Hills, Meghalaya" },
    likes_count: 76,
    comments_count: 9,
    tags: ["Meghalaya", "GaroTribe", "Balpakram", "SacredLand", "HiddenNortheast"]
  },
  {
    id: 38,
    media_type: "image",
    media_url: "/storypageimg/sp38.png",
    title: "Kang Chingba: Manipur's Rath Yatra",
    description: "While Puri's Rath Yatra draws millions, Manipur has its own deeply local version. Every July, a towering 20-ft wooden chariot carrying Lord Jagannath, Balabhadra, and Subhadra is pulled by thousands of barefoot devotees through the streets of Imphal, with Sankirtana artists singing devotional Meitei hymns throughout the journey. Unlike Puri, every locality in Manipur builds its own smaller chariot — the procession ripples outward across the entire valley simultaneously. It is UNESCO-recognised Intangible Heritage, yet most Indians have never heard of it.",
    location: { city: "Imphal, Manipur" },
    likes_count: 119,
    comments_count: 16,
    tags: ["Manipur", "KangChingba", "RathYatra", "MeiteiCulture", "UNESCOHeritage"]
  },
  {
    id: 39,
    media_type: "image",
    media_url: "/storypageimg/sp39.png",
    title: "Siddi Dhamal: Africa Meets Gujarat",
    description: "The Siddi people of Gujarat and Karnataka are descendants of East African sailors, slaves, and traders brought to India between the 9th and 19th centuries. In the villages of Gir Somnath, they still perform Dhamal — a trance ritual dance with African drumming traditions fused with Sufi devotion to Bava Gor, their patron saint. The drumming patterns are unmistakably African in a completely Indian landscape. Almost no one outside the community knows this exists.",
    location: { city: "Gir Somnath, Gujarat" },
    likes_count: 162,
    comments_count: 21,
    tags: ["Gujarat", "SiddiCommunity", "AfricanHeritage", "DhamalDance", "HiddenIndia"]
  },
  {
    id: 40,
    media_type: "image",
    media_url: "/storypageimg/sp40.png",
    title: "Tattapani Mud Springs: Chhattisgarh's Boiling Earth",
    description: "In the Balrampur district of Chhattisgarh, natural hot mud springs bubble up through the earth at near-boiling temperatures — a geological rarity in peninsular India. Locals call them Tattapani ('hot water') and have used the mineral-rich mud for skin ailments for generations. There are no tourist facilities, no signage, no crowds. You reach them by asking a local. A cluster of tribal women usually sits nearby, quiet and unbothered.",
    location: { city: "Balrampur, Chhattisgarh" },
    likes_count: 58,
    comments_count: 7,
    tags: ["Chhattisgarh", "Tattapani", "HotSprings", "HiddenGem", "NaturalWonder"]
  },
  {
    id: 41,
    media_type: "image",
    media_url: "/storypageimg/sp41.png",
    title: "Channapatna Toys: The Lacquer Craft Hanging by a Thread",
    description: "In the town of Channapatna, 60 km from Bengaluru, artisans have been making brightly coloured lacquerware toys from soft ivory wood for over 200 years. Tipu Sultan once invited Persian craftsmen here, and the tradition they planted still survives — barely. Each toy is hand-turned on a lathe, lacquered with natural dyes of turmeric, indigo, and vermillion. The craft is GI-tagged, but with plastics flooding local markets, fewer than 300 families still practise it full-time.",
    location: { city: "Channapatna, Karnataka" },
    likes_count: 134,
    comments_count: 18,
    tags: ["Karnataka", "ChannapatnaToys", "DyingCraft", "LacquerArt", "GITag"]
  },
  {
    id: 42,
    media_type: "image",
    media_url: "/storypageimg/sp42.png",
    title: "Deoria Tal: The Lake That Mirrors the Himalayas",
    description: "At 2,438 metres in the Kedarnath Wildlife Sanctuary of Uttarakhand, Deoria Tal is a pristine alpine lake that perfectly mirrors the snow-capped Chaukhamba peaks at dawn. The 3 km trail from Sari village passes through oak and rhododendron forest, and the lake is sacred to the Mahabharata — it is said that the Yaksha tested Yudhishthira here. There is a small Forest Department hut for overnight stays, and the silence before sunrise is absolute.",
    location: { city: "Ukhimath, Uttarakhand" },
    likes_count: 221,
    comments_count: 31,
    tags: ["Uttarakhand", "DeoriaTal", "HiddenLake", "HimalayanReflection", "AlpineMagic"]
  },
  {
    id: 43,
    media_type: "image",
    media_url: "/storypageimg/sp43.png",
    title: "Kheer Bhawani: The Spring That Changes Colour",
    description: "Forty kilometres from Srinagar in a sacred grove of massive chinar trees, the spring of Kheer Bhawani is believed to change colour as an omen — clear when times are peaceful, darkening towards black when conflict approaches. Kashmiri Pandits swear this happened before the exodus of 1990. Devotees offer kheer (rice pudding) directly into the spring. The entire complex has a stillness that outsiders rarely disturb — it remains largely a community of faith, not tourism.",
    location: { city: "Tulmulla, Jammu & Kashmir" },
    likes_count: 189,
    comments_count: 26,
    tags: ["Kashmir", "KheerBhawani", "SacredSpring", "KashmiriPandit", "HiddenShrine"]
  },
  {
    id: 44,
    media_type: "image",
    media_url: "/storypageimg/sp44.png",
    title: "Ponung: The Harvest Song of the Adi Tribe",
    description: "In the Siang and Lohit valleys of Arunachal Pradesh, the Adi tribe performs Ponung — a slow, interlocking circle dance where women in woven cane headgear move with arms around each other's shoulders, singing in call-and-response about the harvest, the rivers, and the spirits of the forest. It is performed only at Porag, the Adi harvest festival in December. The songs are oral history — they contain navigational knowledge, genealogies, and medicinal plant lore embedded in melody.",
    location: { city: "Along, Arunachal Pradesh" },
    likes_count: 83,
    comments_count: 10,
    tags: ["ArunachalPradesh", "AdiTribe", "Ponung", "HarvestDance", "OralHeritage"]
  },
  {
    id: 45,
    media_type: "image",
    media_url: "/storypageimg/sp45.png",
    title: "Sandakphu's Sleeping Buddha Ridgeline",
    description: "From the summit of Sandakphu on the West Bengal-Nepal border — the highest point in West Bengal at 3,636 m — on a clear winter morning you can see four of the world's five highest peaks simultaneously: Everest, Kangchenjunga, Lhotse, and Makalu. Together their silhouette forms the profile of a reclining Buddha known to locals as the Sleeping Buddha. The trail passes through Singalila National Park's scarlet rhododendron forests, and the tea houses at Tumling are run by Sherpa families who have been here for generations.",
    location: { city: "Sandakphu, West Bengal" },
    likes_count: 317,
    comments_count: 43,
    tags: ["WestBengal", "Sandakphu", "SleepingBuddha", "Himalayan Trek", "OffbeatTrek"]
  }
];

// ── Read ──────────────────────────────────────────────────────────────────────
if (!fs.existsSync(FILE_PATH)) {
  console.error(`❌  Could not find imageStories.json at:\n    ${FILE_PATH}`);
  console.error('    Place this .cjs file in the same folder as imageStories.json and retry.');
  process.exit(1);
}

let existing;
try {
  existing = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
} catch (e) {
  console.error('❌  Failed to parse imageStories.json — is it valid JSON?');
  console.error(e.message);
  process.exit(1);
}

// ── Merge (skip any id that already exists) ───────────────────────────────────
const existingIds = new Set(existing.map(e => e.id));
const toAdd       = newEntries.filter(e => !existingIds.has(e.id));

if (toAdd.length === 0) {
  console.log('⚠️  All entries already exist in imageStories.json — nothing added.');
  process.exit(0);
}

const updated = [...existing, ...toAdd];

// ── Write ─────────────────────────────────────────────────────────────────────
fs.writeFileSync(FILE_PATH, JSON.stringify(updated, null, 2), 'utf8');

console.log(`✅  Done! Added ${toAdd.length} new entries (IDs: ${toAdd.map(e => e.id).join(', ')})`);
console.log(`    imageStories.json now has ${updated.length} total entries.`);
