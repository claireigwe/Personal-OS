type CurriculumRequest = {
  level: string;
  learningStyle: string;
};

export type GeneratedLesson = {
  title: string;
  summary: string;
  content: {
    objective: string;
    sections: Array<{ heading: string; body: string }>;
    practice: string[];
    groups?: Array<{
      label: string;
      items: Array<{ dutch: string; guide: string; meaning: string }>;
    }>;
    comparisons?: Array<{
      english: string;
      dutch: string;
      pronunciation: string;
      note?: string;
    }>;
  };
  examples?: Array<{ dutch: string; guide: string; meaning: string }>;
  exercises?: Array<{
    type: "multiple-choice" | "translation" | "listen-choose";
    question: string;
    data: Record<string, unknown>;
  }>;
};

export type GeneratedCurriculum = {
  slug: string;
  title: string;
  description: string;
  language: string;
  level: string;
  learningStyle: string;
  modules: Array<{
    title: string;
    description: string;
    lessons: GeneratedLesson[];
  }>;
};

export async function generateCurriculum(
  language: string,
  request: CurriculumRequest
): Promise<GeneratedCurriculum> {
  if (language.toLowerCase() !== "dutch") {
    throw new Error("Version 1 only includes Dutch curriculum generation.");
  }

  return {
    slug: "dutch-complete-beginner-to-fluency",
    title: "Complete Dutch from Sounds to Fluency",
    description:
      "An 11-phase journey from absolute beginner to confident Dutch speaker. Start with sound awareness and pronunciation, build sentence structure, then expand into vocabulary, conversation, and native content.",
    language,
    level: request.level,
    learningStyle: request.learningStyle,
    modules: [
      // ============================================================
      // PHASE 1: Sound Mastery
      // ============================================================
      {
        title: "1.1 Dutch Alphabet & Letter Names",
        description: "Learn the Dutch alphabet and how each letter sounds.",
        lessons: [
          {
            title: "The Dutch Alphabet",
            summary: "Meet the 26 letters of the Dutch alphabet and their names.",
            content: {
              objective: "Say the Dutch alphabet from A to Z with correct letter names.",
              sections: [
                {
                  heading: "Same letters, different names",
                  body: "Dutch uses the Latin alphabet like English, but many letters have different names. The vowels (a, e, i, o, u) are especially important to get right."
                },
                {
                  heading: "The tricky ones",
                  body: "G, R, W, and Y sound noticeably different in Dutch. G is guttural, R is rolled or tapped, W is between an English W and V, and Y is called 'Griekse ij'."
                },
                {
                  heading: "Spelling aloud",
                  body: "Dutch speakers often spell words aloud for clarity, especially on the phone. Learning letter names helps you understand spellings and write down names correctly."
                }
              ],
              practice: [
                "Recite the alphabet twice: once slowly, once at normal speed.",
                "Spell your own name aloud in Dutch letter names.",
                "Listen to a Dutch alphabet song or video and repeat after it.",
                "Have someone say a word and try to spell it back using Dutch letter names."
              ]
            },
            examples: [
              { dutch: "A a", guide: "ah", meaning: "like 'father'" },
              { dutch: "B b", guide: "bay", meaning: "like 'bay'" },
              { dutch: "C c", guide: "say", meaning: "like 'say'" },
              { dutch: "D d", guide: "day", meaning: "like 'day'" },
              { dutch: "E e", guide: "ay", meaning: "like 'say' (short)" },
              { dutch: "F f", guide: "ef", meaning: "like 'eff'" },
              { dutch: "G g", guide: "khay", meaning: "guttural, throat sound" },
              { dutch: "H h", guide: "hah", meaning: "like 'ha'" },
              { dutch: "I i", guide: "ee", meaning: "like 'see' (short)" },
              { dutch: "J j", guide: "yay", meaning: "like English Y" },
              { dutch: "K k", guide: "kah", meaning: "like 'ka'" },
              { dutch: "L l", guide: "el", meaning: "like 'ell'" },
              { dutch: "M m", guide: "em", meaning: "like 'em'" },
              { dutch: "N n", guide: "en", meaning: "like 'en'" },
              { dutch: "O o", guide: "oh", meaning: "like 'oh'" },
              { dutch: "P p", guide: "pay", meaning: "like 'pay'" },
              { dutch: "Q q", guide: "kuu", meaning: "like 'koo'" },
              { dutch: "R r", guide: "ehr", meaning: "rolled/tapped" },
              { dutch: "S s", guide: "es", meaning: "like 'ess'" },
              { dutch: "T t", guide: "tay", meaning: "like 'tay'" },
              { dutch: "U u", guide: "uu", meaning: "rounded, say 'ee' with lips rounded" },
              { dutch: "V v", guide: "vay", meaning: "like 'vay'" },
              { dutch: "W w", guide: "vay", meaning: "between w and v" },
              { dutch: "X x", guide: "iks", meaning: "like 'iks'" },
              { dutch: "Y y", guide: "ay (Griekse ij)", meaning: "like 'ay', called 'Greek ij'" },
              { dutch: "Z z", guide: "zet", meaning: "like 'zet'" }
            ],
            exercises: [
              {
                type: "multiple-choice",
                question: "What is the Dutch name for the letter G?",
                data: { options: ["gee", "khay", "gay", "ghee"], correctIndex: 1 }
              },
              {
                type: "multiple-choice",
                question: "Which letter is called 'Griekse ij' in Dutch?",
                data: { options: ["J", "W", "Y", "IJ"], correctIndex: 2 }
              },
              {
                type: "translation",
                question: "How do you say the letter A in Dutch? (spell it phonetically)",
                data: { correctAnswer: "ah", acceptableAnswers: ["aa", "aah"] }
              }
            ]
          },
          {
            title: "Letter Sounds vs English",
            summary: "Understand which Dutch letters sound different from English.",
            content: {
              objective: "Identify the 8 Dutch letters that differ most from their English sounds.",
              sections: [
                {
                  heading: "Vowels are the key",
                  body: "Dutch vowels are cleaner and more precise than English. There is no 'schwa glide' at the end of words. A Dutch 'a' is always pure, never becoming 'uh'."
                },
                {
                  heading: "Consonants to watch",
                  body: "G and CH are guttural (back of throat). R can be rolled or tapped. W uses both lips. V and Z are voiced, and final consonants often lose their voice."
                },
                {
                  heading: "The J is different",
                  body: "Dutch J is always pronounced like English Y in 'yes'. Ja is 'yah', not 'jah'. This is one of the most common beginner mistakes."
                }
              ],
              practice: [
                "Say a, e, i, o, u in English, then in Dutch. Notice the difference.",
                "Practice the Dutch G by saying 'acht' with a relaxed throat.",
                "Say 'wij' (we) and notice the W sound between English W and V.",
                "Record yourself saying the alphabet and compare with a native recording.",
                "Find a Dutch word for each letter that differs from English (G, R, W, Y, J).",
                "Spell your city and country aloud using Dutch letter names."
              ],
              comparisons: [
                { english: "a (in 'father')", dutch: "a (in 'kat')", pronunciation: "ah, clipped short", note: "Dutch a is crisp, no glide" },
                { english: "e (in 'say')", dutch: "e (in 'pet')", pronunciation: "eh, shorter and opener", note: "Dutch e is pure, not a diphthong" },
                { english: "g (in 'go')", dutch: "g (in 'goed')", pronunciation: "kh — guttural, throat friction", note: "The most different sound from English" },
                { english: "r (in 'red')", dutch: "r (in 'rood')", pronunciation: "tapped or rolled r", note: "Tongue taps roof of mouth once" },
                { english: "w (in 'we')", dutch: "w (in 'wij')", pronunciation: "between w and v", note: "Both lips together, no rounding" },
                { english: "j (in 'yes')", dutch: "j (in 'ja')", pronunciation: "y sound, like English y", note: "Never like English j in 'jump'" },
                { english: "v (in 'very')", dutch: "v (in 'vijf')", pronunciation: "voiced v", note: "At end of words, v becomes f" },
                { english: "z (in 'zoo')", dutch: "z (in 'zon')", pronunciation: "voiced z", note: "At end of words, z becomes s" }
              ]
            },
            exercises: [
              {
                type: "multiple-choice",
                question: "How is the Dutch 'G' pronounced?",
                data: { options: ["Like English G in 'go'", "Guttural, from the throat", "Silent", "Like English H"], correctIndex: 1 }
              },
              {
                type: "multiple-choice",
                question: "What sound does the Dutch 'J' make?",
                data: { options: ["Like English J in 'jump'", "Like English Y in 'yes'", "Like English G in 'gym'", "Like English CH in 'cheese'"], correctIndex: 1 }
              },
              {
                type: "listen-choose",
                question: "Listen to the Dutch word and choose its meaning:",
                data: { audioText: "ja", options: ["yes", "no", "maybe", "hello"], correctIndex: 0 }
              }
            ]
          },
          {
            title: "Vowels vs Consonants",
            summary: "Learn the difference between short vowels, long vowels, and consonants.",
            content: {
              objective: "Distinguish between short vowels, long vowels, and consonant sounds in spoken Dutch.",
              sections: [
                {
                  heading: "Short vowels are clipped",
                  body: "Short vowels in Dutch are brief and crisp. They occur in closed syllables (ending with a consonant). The mouth position is relaxed."
                },
                {
                  heading: "Long vowels are held",
                  body: "Long vowels are held slightly longer. They can appear as double letters (aa, ee, oo, uu) or as single letters in open syllables."
                },
                {
                  heading: "Consonants are mostly familiar",
                  body: "Most Dutch consonants sound like their English counterparts, except G, CH, R, and W. Final consonants (b, d, z, v) are often devoiced."
                }
              ],
              practice: [
                "Say 'man' and 'maan' — feel the vowel length difference.",
                "Tap your finger once for short vowels, twice for long vowels.",
                "Listen to 'pet' (cap) vs 'peet' (godfather) and hear the length change.",
                "Say 'heb' (have) and notice the final b sounds like p.",
                "Find three more minimal pairs (words that differ by one sound).",
                "Clap once for each syllable and identify vowel length in each."
              ],
              groups: [
                {
                  label: "Short Vowels",
                  items: [
                    { dutch: "kat", guide: "kaht", meaning: "cat" },
                    { dutch: "pet", guide: "pet", meaning: "cap" },
                    { dutch: "pit", guide: "pit", meaning: "seed" },
                    { dutch: "bot", guide: "bot", meaning: "bone" },
                    { dutch: "put", guide: "put", meaning: "well (water)" }
                  ]
                },
                {
                  label: "Long Vowels",
                  items: [
                    { dutch: "maan", guide: "maahn", meaning: "moon" },
                    { dutch: "raam", guide: "rahm", meaning: "window" },
                    { dutch: "boot", guide: "boht", meaning: "boat" },
                    { dutch: "vuur", guide: "vuur", meaning: "fire" },
                    { dutch: "diep", guide: "deep", meaning: "deep" }
                  ]
                },
                {
                  label: "Tricky Consonants",
                  items: [
                    { dutch: "goed", guide: "khoot", meaning: "good" },
                    { dutch: "rood", guide: "roht", meaning: "red" },
                    { dutch: "wij", guide: "vay", meaning: "we" },
                    { dutch: "ja", guide: "yah", meaning: "yes" },
                    { dutch: "heb", guide: "hep", meaning: "have" }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        title: "1.2 Vowels and Diphthongs",
        description: "Master Dutch vowel sounds and common vowel combinations.",
        lessons: [
          {
            title: "Short Vowels",
            summary: "Learn the five short vowel sounds of Dutch.",
            content: {
              objective: "Produce and recognize the five short Dutch vowels: a, e, i, o, u.",
              sections: [
                {
                  heading: "Short a — like 'father' but brief",
                  body: "The short a is like the a in English 'father' but clipped short. It appears in words like 'man', 'kat', 'dag'."
                },
                {
                  heading: "Short e and i — close but distinct",
                  body: "Short e (as in 'pet') and short i (as in 'pit') are different sounds. Many beginners confuse them. Short e is more open, short i is more closed."
                },
                {
                  heading: "Short o and u",
                  body: "Short o is like the o in 'pot'. Short u is like the u in 'put' (not 'cup'). Dutch short u never sounds like the English 'uh'."
                }
              ],
              practice: [
                "Say these minimal pairs: man/men, pit/pet, bot/but.",
                "Record yourself saying each short vowel in isolation.",
                "Read aloud: kat, vis, boom (short vowels only).",
                "Listen to a native speaker say 'kappen' and 'kat' — feel the vowel difference.",
                "Write five Dutch words with short vowels and five with long vowels.",
                "Practice the difference between 'pet' (cap) and 'piet' (Peter) — short e vs long ie."
              ]
            },
            examples: [
              { dutch: "kat", guide: "kaht", meaning: "cat" },
              { dutch: "pet", guide: "pet", meaning: "cap" },
              { dutch: "pit", guide: "pit", meaning: "pit/seed" },
              { dutch: "bot", guide: "bot", meaning: "bone" },
              { dutch: "put", guide: "put (not 'putt')", meaning: "well (water)" },
              { dutch: "man", guide: "mahn", meaning: "man" },
              { dutch: "vis", guide: "vis", meaning: "fish" },
              { dutch: "dak", guide: "dak", meaning: "roof" }
            ]
          },
          {
            title: "Long Vowels",
            summary: "Learn the five long Dutch vowel sounds and how they are written.",
            content: {
              objective: "Produce and recognize the five long Dutch vowels: aa, ee, ie, oo, uu.",
              sections: [
                {
                  heading: "Long vowels are doubled",
                  body: "In closed syllables, long vowels are written as double letters: aa, ee, oo, uu. In open syllables, they are written as single letters but stay long."
                },
                {
                  heading: "The ie sound",
                  body: "Dutch ie is a special long vowel. It sounds like English 'ee' in 'see'. It is always written as ie, never ii."
                },
                {
                  heading: "Uu — the rounded front vowel",
                  body: "Dutch uu has no English equivalent. Round your lips as if saying 'oo' but say 'ee' instead. This sound takes practice."
                }
              ],
              practice: [
                "Contrast: man/maan, pet/peet, bot/boot, put/puur.",
                "Practice the uu sound: say 'ee' then round your lips while holding the sound.",
                "Read aloud: raam, been, diep, boot, vuur.",
                "Record yourself and check your vowel length.",
                "Find five double-vowel words in a Dutch text and read them aloud.",
                "Explain why 'raam' keeps two a's but 'ramen' has only one."
              ]
            },
            examples: [
              { dutch: "raam", guide: "rahm", meaning: "window" },
              { dutch: "been", guide: "bayn", meaning: "leg" },
              { dutch: "diep", guide: "deep", meaning: "deep" },
              { dutch: "boot", guide: "boht", meaning: "boat" },
              { dutch: "vuur", guide: "vuur (rounded lips)", meaning: "fire" },
              { dutch: "maan", guide: "maahn", meaning: "moon" },
              { dutch: "rood", guide: "roht", meaning: "red" },
              { dutch: "muur", guide: "muur", meaning: "wall" }
            ]
          },
          {
            title: "Short vs Long Vowel Contrast",
            summary: "Practice hearing and producing the difference between short and long vowels.",
            content: {
              objective: "Reliably distinguish and produce short vs long vowel pairs in any word.",
              sections: [
                {
                  heading: "Minimal pairs train your ear",
                  body: "A minimal pair is two words that differ by only one sound. Practicing these trains your brain to hear the difference automatically."
                },
                {
                  heading: "Vowel length changes meaning",
                  body: "In Dutch, vowel length is phonemic — it changes the word. 'Man' (man) and 'maan' (moon) are completely different words."
                },
                {
                  heading: "Common mistakes",
                  body: "Beginners often make vowels too long or too short. English speakers tend to drawl vowels. Dutch vowels are crisp — hold long vowels but don't glide them."
                }
              ],
              practice: [
                "Practice these pairs aloud: man/maan, pet/peet, bot/boot, pit/piet, put/puur.",
                "Have someone say one of each pair and identify which you heard.",
                "Read a list of words alternating short and long vowels.",
                "Record 'man' and 'maan' and check your vowel length difference.",
                "Create your own list of five minimal pairs and practice them.",
                "Listen to a Dutch audio clip and write down words with long vowels."
              ]
            },
            examples: [
              { dutch: "man / maan", guide: "mahn / maahn", meaning: "man / moon" },
              { dutch: "pet / peet", guide: "pet / payt", meaning: "cap / godparent" },
              { dutch: "bot / boot", guide: "bot / boht", meaning: "bone / boat" },
              { dutch: "pit / piet", guide: "pit / peet", meaning: "seed / Peter" },
              { dutch: "put / puur", guide: "put / vuur", meaning: "well / pure" },
              { dutch: "zak / zaak", guide: "zak / zaak", meaning: "bag / business" },
              { dutch: "hol / hool", guide: "hol / hohl", meaning: "hollow / hooligan" },
              { dutch: "vis / vies", guide: "vis / vees", meaning: "fish / dirty" }
            ]
          },
          {
            title: "Diphthongs",
            summary: "Learn the Dutch diphthongs: two vowels that combine into one sound.",
            content: {
              objective: "Recognize and pronounce the six Dutch diphthongs: ui, ij, ei, au, ou, eu.",
              sections: [
                {
                  heading: "Ui — the most Dutch sound",
                  body: "Ui is the sound foreigners associate with Dutch. It starts like 'uh' and glides to 'ee'. Practice: 'huis' (house), 'muis' (mouse)."
                },
                {
                  heading: "IJ and EI — the same sound",
                  body: "IJ and ei are pronounced identically, like English 'eye' but slightly rounded. This is a spelling challenge but not a pronunciation one."
                },
                {
                  heading: "AU, OU, and EU",
                  body: "Au and ou sound the same (like English 'ow'). Eu is unique to Dutch — start like 'uh' and glide toward 'oo' with rounded lips."
                }
              ],
              practice: [
                "Practice ui: say 'uh-ee' quickly until it becomes one sound.",
                "Contrast ij/ei with Dutch words: kijk, klei, meisje.",
                "Practice eu: round lips and say 'uh-oo' smoothly.",
                "Read aloud: huis, kijk, auto, koud, deur.",
                "Find five words with ui and five words with ij in a Dutch text.",
                "Listen to 'ui' vs 'eu' and feel the mouth position difference."
              ]
            },
            examples: [
              { dutch: "huis", guide: "hows (ui sound)", meaning: "house" },
              { dutch: "kijk", guide: "kike (ij sound)", meaning: "look" },
              { dutch: "auto", guide: "ow-toh", meaning: "car" },
              { dutch: "koud", guide: "kowt", meaning: "cold" },
              { dutch: "deur", guide: "duhr (eu sound)", meaning: "door" },
              { dutch: "muis", guide: "mows", meaning: "mouse" },
              { dutch: "ijs", guide: "ays", meaning: "ice" },
              { dutch: "neus", guide: "nuhs", meaning: "nose" }
            ]
          }
        ]
      },
      {
        title: "1.3 Consonants & Pronunciation Patterns",
        description: "Master the Dutch consonants that feel unfamiliar and learn word stress patterns.",
        lessons: [
          {
            title: "The G and CH Sounds",
            summary: "Approach the guttural sounds that make Dutch feel distinctive.",
            content: {
              objective: "Produce a comfortable guttural G and CH without straining your throat.",
              sections: [
                {
                  heading: "Gentle friction, not force",
                  body: "The Dutch G and CH are made with gentle friction at the back of the throat. Think of a soft 'h' with a little scrape, not a harsh gargle."
                },
                {
                  heading: "G vs CH — same sound",
                  body: "In standard Dutch, G and CH are the same sound. G is used at the start of syllables, CH at the end. Both are guttural."
                },
                {
                  heading: "The northern G",
                  body: "In northern Netherlands, the G is softer (more like a breathy h). In the south (Belgium), it is softer still. Find a version that feels comfortable."
                }
              ],
              practice: [
                "Start by breathing out gently while saying 'h'.",
                "Add a little friction at the back: 'kh' like clearing your throat softly.",
                "Practice: goed, acht, liggen, zacht.",
                "Don't force it — comfort is more important than perfection at this stage.",
                "Record yourself saying \"Goedemorgen, hoe gaat het?\" and listen for the G sounds.",
                "Read a Dutch text aloud and underline every G and CH — check your pronunciation."

              ]
            },
            examples: [
              { dutch: "goed", guide: "khoot (soft g)", meaning: "good" },
              { dutch: "acht", guide: "akht", meaning: "eight" },
              { dutch: "liggen", guide: "li-khen", meaning: "to lie down" },
              { dutch: "zacht", guide: "zakht", meaning: "soft" },
              { dutch: "gek", guide: "khek", meaning: "crazy" },
              { dutch: "gezellig", guide: "khe-ze-lekh", meaning: "cozy" },
              { dutch: "licht", guide: "likht", meaning: "light" },
              { dutch: "gewicht", guide: "khe-wikht", meaning: "weight" },

            ]
          },
          {
            title: "The R Sound",
            summary: "Learn the various R sounds in Dutch and find one that works for you.",
            content: {
              objective: "Produce an acceptable Dutch R using a tapped, rolled, or guttural approach.",
              sections: [
                {
                  heading: "R variations by region",
                  body: "Dutch R varies widely. The northern tapped R (like Spanish/Italian), the southern rolled R, and the guttural R (like French) are all acceptable."
                },
                {
                  heading: "The tapped R is safest",
                  body: "A single tap of the tongue against the roof of the mouth (like the tt in 'butter' in American English) is the most common and neutral R."
                },
                {
                  heading: "R at the end of words",
                  body: "In some regions, the final R is barely pronounced or becomes a schwa sound. In standard Dutch, it is still pronounced but lightly."
                }
              ],
              practice: [
                "Practice the tapped R by saying 'butter' quickly (American English).",
                "Isolate the sound: say 'r-r-r' with a single tongue tap each time.",
                "Practice words: rood, straat, groot, verrassen.",
                "Listen to different Dutch regions and notice the R variations.",
                "Say 'rood brood' five times fast — focus on the tapped R each time.",
                "Listen to a Dutch speaker and try to identify which R variant they use."

              ]
            },
            examples: [
              { dutch: "rood", guide: "roht (tapped r)", meaning: "red" },
              { dutch: "straat", guide: "straht", meaning: "street" },
              { dutch: "groot", guide: "khroht", meaning: "big" },
              { dutch: "maar", guide: "mahr (light final r)", meaning: "but" },
              { dutch: "vier", guide: "veer", meaning: "four" },
              { dutch: "rennen", guide: "re-nen (tapped r)", meaning: "to run" },
              { dutch: "park", guide: "park (light final r)", meaning: "park" },
              { dutch: "deur", guide: "duhr", meaning: "door" },

            ]
          },
          {
            title: "IJ vs EI and Word Stress",
            summary: "Master the ij/ei spelling confusion and learn where to put stress.",
            content: {
              objective: "Spell words correctly with ij/ei and place stress on the right syllable.",
              sections: [
                {
                  heading: "Same sound, different spelling",
                  body: "IJ and ei sound identical. You must memorize which words use which spelling. IJ is more common in native Dutch words, ei in loanwords."
                },
                {
                  heading: "Word stress basics",
                  body: "Dutch stress usually falls on the first syllable. Prefixes like be-, ge-, ver- are unstressed. Compound words stress the first part."
                },
                {
                  heading: "Stress changes meaning",
                  body: "Some words change meaning based on stress. 'Vóórkomen' (to occur) vs 'voorkómen' (to prevent). Listen for stress differences."
                }
              ],
              practice: [
                "Make a list of 10 ij words and 10 ei words. Notice any patterns.",
                "Read multisyllable words and mark the stressed syllable.",
                "Practice minimal pairs: zijn/zei, lijken/leiken (spelling only).",
                "Listen to compound words and identify which part is stressed.",
                "Write 10 sentences using a mix of ij and ei words, then check spelling.",
                "Read a Dutch paragraph and mark the stressed syllable in every word with three or more syllables."

              ]
            },
            examples: [
              { dutch: "zijn", guide: "zayn (ij)", meaning: "to be" },
              { dutch: "zei", guide: "zay (ei)", meaning: "said" },
              { dutch: "vóórkomen", guide: "vohr-koh-men", meaning: "to occur" },
              { dutch: "voorkómen", guide: "vohr-koh-men (different stress)", meaning: "to prevent" },
              { dutch: "fiets", guide: "feets", meaning: "bicycle" },
              { dutch: "blij", guide: "blay (ij)", meaning: "happy" },
              { dutch: "klein", guide: "klayn (ei)", meaning: "small" },
              { dutch: "buitengewoon", guide: "boy-ten-khe-wohn (stress on woon)", meaning: "extraordinary" },

            ]
          }
        ]
      },

      // ============================================================
      // PHASE 2: Reading & Decoding
      // ============================================================
      {
        title: "2.1 Dutch Spelling Rules",
        description: "Learn how Dutch spelling guides pronunciation.",
        lessons: [
          {
            title: "Open and Closed Syllables",
            summary: "Use syllable shape to predict vowel length.",
            content: {
              objective: "Predict whether a written vowel is short or long based on syllable structure.",
              sections: [
                {
                  heading: "Closed syllables keep vowels short",
                  body: "A closed syllable ends with a consonant: man, pet, bot. The vowel inside is always short. Double the consonant to keep the vowel short in longer words."
                },
                {
                  heading: "Open syllables make vowels long",
                  body: "An open syllable ends with a vowel: ma-ken, le-ven. The single vowel at the end of a syllable is pronounced long, even though it is written with one letter."
                },
                {
                  heading: "The spelling dance",
                  body: "When adding endings, Dutch adjusts spelling to preserve pronunciation. 'Man' becomes 'mannen' (double n to keep a short). 'Maand' becomes 'manen' (single n because a is already long)."
                }
              ],
              practice: [
                "Mark the syllables in: maken, lopen, vallen, wonen.",
                "Compare 'man' and 'mannen' — why does n double?",
                "Compare 'maan' and 'manen' — why does a stay single?",
                "Read aloud: bom, bomen, ramen, vissen, katten.",
                "Take a 100-word Dutch text and mark every syllable as open or closed.",
                "Explain in Dutch why 'kat' becomes 'katten' but 'maat' becomes 'maten'."

              ]
            },
            examples: [
              { dutch: "man / mannen", guide: "mahn / mah-nen", meaning: "man / men" },
              { dutch: "maan / manen", guide: "maahn / mah-nen", meaning: "moon / moons" },
              { dutch: "bom / bomen", guide: "bom / boh-men", meaning: "bomb / bombs" },
              { dutch: "vis / vissen", guide: "vis / vi-sen", meaning: "fish / fishes" },
              { dutch: "raam / ramen", guide: "rahm / rah-men", meaning: "window / windows" },
              { dutch: "kat / katten", guide: "kaht / kah-ten", meaning: "cat / cats" },
              { dutch: "maat / maten", guide: "maht / mah-ten", meaning: "size / sizes" },
              { dutch: "bel / bellen", guide: "bel / be-len", meaning: "bell / bells" },

            ]
          },
          {
            title: "Sound-Letter Relationships",
            summary: "Connect Dutch sounds to their written forms.",
            content: {
              objective: "Know which letter or letter combination produces each Dutch sound.",
              sections: [
                {
                  heading: "One sound, multiple spellings",
                  body: "Dutch has several sounds that can be written multiple ways: ij/ei (same sound), au/ou (same sound), ch/g (same sound). Know the common patterns."
                },
                {
                  heading: "Consonant combinations",
                  body: "Dutch uses consonant combinations that look different than English: sch (at the start of words), ng (like 'sing'), nk (like 'sink')."
                },
                {
                  heading: "The schwa is everywhere",
                  body: "The schwa (uh sound) is the most common vowel sound in unstressed syllables. It is written as e, i, or ij in unstressed positions: 'lopen', 'kennis', 'lelijk'."
                }
              ],
              practice: [
                "Read aloud: schip, school, mens, angst, koning.",
                "Identify the schwa sound in: lopen, regen, vader, moeder.",
                "Practice the ng sound: zingen, bang, lang, ding.",
                "Create a sound-spelling chart for all Dutch vowels.",
                "Write five Dutch words that use 'sch' at the beginning and five that use 'ng'.",
                "Identify the schwa sound in a sentence read aloud by a native speaker."

              ]
            },
            examples: [
              { dutch: "schip", guide: "skhip", meaning: "ship" },
              { dutch: "zingen", guide: "zing-en", meaning: "to sing" },
              { dutch: "regen", guide: "ray-khen", meaning: "rain" },
              { dutch: "vader", guide: "vah-der", meaning: "father" },
              { dutch: "lelijk", guide: "lay-lek", meaning: "ugly" },
              { dutch: "schrijven", guide: "skray-ven", meaning: "to write" },
              { dutch: "koning", guide: "koh-ning", meaning: "king" },
              { dutch: "bezig", guide: "bay-zekh", meaning: "busy" },

            ]
          },
          {
            title: "Silent Letters",
            summary: "Learn which Dutch letters are sometimes silent.",
            content: {
              objective: "Recognize common silent letters and patterns in Dutch spelling.",
              sections: [
                {
                  heading: "The silent n",
                  body: "At the end of many words, especially -en endings, the n is pronounced but the e is a schwa. In rapid speech, the n may also disappear: 'lopen' sounds like 'lo-puh'."
                },
                {
                  heading: "W at the end",
                  body: "When W appears at the end of a word or before a consonant, it is barely pronounced. 'Leeuw' sounds like 'lay-oo'. 'Nieuw' sounds like 'nee-oo'."
                },
                {
                  heading: "T at the end of words",
                  body: "The final t in some words can be very soft or dropped in rapid speech, especially when the next word starts with a consonant: 'niet' (not)."
                }
              ],
              practice: [
                "Say 'lopen' and 'lopen' slowly — notice the final -en.",
                "Say 'nieuw' — feel your lips round for w but don't fully close them.",
                "Listen to 'niet goed' in rapid speech — the t may disappear.",
                "Read aloud: leeuw, duw, eeuw, nieuw, rauw.",
                "Find five Dutch words with silent letters and practice saying them correctly.",
                "Record 'nieuw, leeuw, duw, eeuw' and check if the w is properly softened."

              ]
            },
            examples: [
              { dutch: "lopen", guide: "loh-puh (soft n)", meaning: "to walk" },
              { dutch: "nieuw", guide: "nee-oo (soft w)", meaning: "new" },
              { dutch: "leeuw", guide: "lay-oo", meaning: "lion" },
              { dutch: "niet", guide: "neet (soft t)", meaning: "not" },
              { dutch: "goed", guide: "khoot (soft d)", meaning: "good" },
              { dutch: "duw", guide: "duw (barely pronounce w)", meaning: "push" },
              { dutch: "eeuw", guide: "ay-oo", meaning: "century" },
              { dutch: "hout", guide: "hout (silent t in some dialects)", meaning: "wood" },

            ]
          }
        ]
      },
      {
        title: "2.2 Word Structure",
        description: "Understand how Dutch words are built from smaller parts.",
        lessons: [
          {
            title: "Compound Words",
            summary: "Learn how Dutch creates long words by combining shorter ones.",
            content: {
              objective: "Break compound words into their parts to understand meaning.",
              sections: [
                {
                  heading: "Dutch loves compounds",
                  body: "Dutch creates new words by gluing existing words together. 'Fiets' (bike) + 'bel' (bell) = 'fietsbel' (bike bell). The last word determines the grammatical gender."
                },
                {
                  heading: "Reading long words",
                  body: "Don't be intimidated by long Dutch words. Break them into components: 'werknemersverzekering' = 'werk' (work) + 'nemers' (takers) + 'verzekering' (insurance)."
                },
                {
                  heading: "Linking sounds",
                  body: "Some compounds use linking sounds: -e-, -en-, -s-. 'Stad' (city) + 'huis' (house) = 'stadhuis' (city hall) — no linking sound. 'Dorp' (village) + 'huis' = 'dorpshuis' (village hall) — linking s."
                }
              ],
              practice: [
                "Break these compounds into parts: keukentafel, ziekenhuis, schoolplein.",
                "Find three compounds in a Dutch text and identify their components.",
                "Practice reading long compound words aloud from the end.",
                "Create your own compound and check if it's a real Dutch word.",
                "Create three of your own compound words from known Dutch words.",
                "Read a long compound word like 'arbeidsongeschiktheidsverzekering' and break it into parts."

              ]
            },
            examples: [
              { dutch: "fietsbel", guide: "feets-bel", meaning: "bicycle bell" },
              { dutch: "keukentafel", guide: "kuh-ken-tah-fel", meaning: "kitchen table" },
              { dutch: "ziekenhuis", guide: "zee-ken-huis", meaning: "hospital (sick house)" },
              { dutch: "schoolplein", guide: "skhole-playn", meaning: "schoolyard" },
              { dutch: "werknemer", guide: "werk-nay-mer", meaning: "employee (work-taker)" },
              { dutch: "boekenkast", guide: "boo-ken-kast", meaning: "bookcase" },
              { dutch: "voordeur", guide: "vohr-duhr", meaning: "front door" },
              { dutch: "zonneschijn", guide: "zo-ne-skayn", meaning: "sunshine" },

            ]
          },
          {
            title: "Common Word Endings",
            summary: "Recognize common Dutch suffixes to expand your vocabulary.",
            content: {
              objective: "Identify common Dutch suffixes and understand how they change a word's meaning.",
              sections: [
                {
                  heading: "Noun suffixes",
                  body: "-ing (like English -ing), -heid (like -ness), -er (like -er), -aar (person who does something). 'Werk' (work) + 'er' = 'werker' (worker)."
                },
                {
                  heading: "Adjective suffixes",
                  body: "-lijk (like -ly/-able), -ig (-ish), -loos (-less). 'Verschrikken' (to frighten) + 'lijk' = 'verschrikkelijk' (terrible)."
                },
                {
                  heading: "Verb endings",
                  body: "-en is the default infinitive ending. Prefixes like be-, ver-, ont-, ge- change verb meanings. 'Komen' (come) vs 'bekomen' (recover)."
                }
              ],
              practice: [
                "Take 'werk' and add: -er, -ing, -loos, -zaam. What do they mean?",
                "Find five Dutch words ending in -heid and match them to English words in -ness.",
                "Identify the suffix in: vriendelijk, hopeloos, blijheid, tekenaar.",
                "Create new words by adding familiar suffixes to known words.",
                "Take the word 'vriend' and add all possible suffixes you know, explaining each meaning.",
                "Find a Dutch text and circle all words ending in -lijk, -ig, -heid, or -ing."

              ]
            },
            examples: [
              { dutch: "werker", guide: "wer-ker", meaning: "worker" },
              { dutch: "vrijheid", guide: "vray-hayt", meaning: "freedom (free + ness)" },
              { dutch: "vriendelijk", guide: "vreend-eh-lek", meaning: "friendly" },
              { dutch: "hoopvol", guide: "hohp-vol", meaning: "hopeful" },
              { dutch: "hopeloos", guide: "hoh-puh-lohs", meaning: "hopeless" },
              { dutch: "eenzaamheid", guide: "ayn-zahm-hayt", meaning: "loneliness" },
              { dutch: "moeilijk", guide: "moo-yuh-lek", meaning: "difficult" },
              { dutch: "tekenaar", guide: "tay-ken-ahr", meaning: "draughtsman" },

            ]
          },
          {
            title: "Plural Formation",
            summary: "Learn how to make Dutch nouns plural.",
            content: {
              objective: "Form plurals correctly using the -en and -s endings.",
              sections: [
                {
                  heading: "The -en plural",
                  body: "Most Dutch nouns form the plural with -en. This often changes the spelling: 'man' becomes 'mannen' (double consonant to keep short vowel)."
                },
                {
                  heading: "The -s plural",
                  body: "Nouns ending in -el, -er, -en, -em, -je usually add -s. Loanwords often use -s: 'tafel' becomes 'tafels', 'computer' becomes 'computers'."
                },
                {
                  heading: "Irregular plurals",
                  body: "Some nouns have irregular plurals: 'kind' becomes 'kinderen', 'ei' becomes 'eieren', 'stad' becomes 'steden'. These are common and worth memorizing."
                }
              ],
              practice: [
                "Make these nouns plural: boek, huis, tafel, kind, stad.",
                "Explain why 'man' becomes 'mannen' but 'maan' becomes 'manen'.",
                "Find three loanwords that take -s plural in Dutch.",
                "Practice reading: de boeken, de huizen, de kinderen, de steden.",
                "Take 20 common nouns and write their plural forms, sorting by -en vs -s.",
                "Practice: 'De kinderen spelen in de tuinen' — identify all plurals and their formation rules."

              ]
            },
            examples: [
              { dutch: "boek / boeken", guide: "book / boo-ken", meaning: "book / books" },
              { dutch: "tafel / tafels", guide: "tah-fel / tah-fels", meaning: "table / tables" },
              { dutch: "kind / kinderen", guide: "kint / kin-der-en", meaning: "child / children" },
              { dutch: "stad / steden", guide: "staht / stay-den", meaning: "city / cities" },
              { dutch: "ei / eieren", guide: "ay / ay-er-en", meaning: "egg / eggs" },
              { dutch: "deur / deuren", guide: "duhr / duh-ren", meaning: "door / doors" },
              { dutch: "taart / taarten", guide: "taart / tah-ren", meaning: "cake / cakes" },
              { dutch: "appel / appels", guide: "ah-pel / ah-pels", meaning: "apple / apples" },

            ]
          }
        ]
      },
      {
        title: "2.3 Reading Practice",
        description: "Apply your decoding skills to real Dutch texts.",
        lessons: [
          {
            title: "Reading Simple Sentences",
            summary: "Practice reading simple Dutch sentences aloud.",
            content: {
              objective: "Read a simple Dutch sentence aloud with correct pronunciation.",
              sections: [
                {
                  heading: "Start with short sentences",
                  body: "Read sentences you already understand. Focus on pronunciation, not comprehension. Sound out each word based on the spelling rules you learned."
                },
                {
                  heading: "Read aloud every time",
                  body: "Always read Dutch aloud. Silent reading does not train your pronunciation muscles. Your mouth needs to learn the movements."
                },
                {
                  heading: "Use a pointer",
                  body: "Point to each word as you read. This keeps your eyes from skipping ahead and forces you to process every letter."
                }
              ],
              practice: [
                "Read aloud: 'Ik ben een man. Zij is een vrouw. Het is een kind.'",
                "Read aloud: 'De kat zit op de mat. De hond loopt in het park.'",
                "Record yourself reading five simple sentences and compare with a native recording.",
                "Read the same sentence three times: slow, normal, fast.",
                "Read aloud: 'Ik heb een hond. De hond is blij. Wij spelen in het park.'",
                "Record yourself reading five sentences and check your pronunciation of each word."

              ]
            },
            examples: [
              { dutch: "Ik ben een man.", guide: "ik ben un mahn", meaning: "I am a man." },
              { dutch: "Zij is een vrouw.", guide: "zay is un vrow", meaning: "She is a woman." },
              { dutch: "De kat zit op de mat.", guide: "de kat zit op de maht", meaning: "The cat sits on the mat." },
              { dutch: "De hond loopt in het park.", guide: "de hont lohpt in het park", meaning: "The dog walks in the park." },
              { dutch: "Het is een kind.", guide: "het is un kint", meaning: "It is a child." },
              { dutch: "Ik heb een hond.", guide: "ik hep un hont", meaning: "I have a dog." },
              { dutch: "De hond is blij.", guide: "de hont is blay", meaning: "The dog is happy." },
              { dutch: "Wij spelen in het park.", guide: "vay spay-len in het park", meaning: "We play in the park." },

            ]
          },
          {
            title: "Children's Texts",
            summary: "Read simple Dutch texts designed for children.",
            content: {
              objective: "Read a short children's story aloud with understanding.",
              sections: [
                {
                  heading: "Children's books are ideal",
                  body: "Children's books use simple vocabulary, short sentences, and pictures to support understanding. Start with picture books for ages 4-6."
                },
                {
                  heading: "Repetition is your friend",
                  body: "Children's books repeat words and sentence patterns. This is excellent for building automaticity. Read each page multiple times."
                },
                {
                  heading: "Picture support",
                  body: "Use pictures to guess unfamiliar words. This mimics how children learn their first language. Don't reach for a dictionary immediately."
                }
              ],
              practice: [
                "Find a Dutch children's book online or at a library.",
                "Read one page aloud three times before moving to the next.",
                "Write down five new words from each page and review them.",
                "Read the entire book once for pronunciation, then once for comprehension.",
                "Find a Dutch picture book PDF online and read one page per day.",
                "Create a mini picture dictionary of 10 words you learned from children's books."

              ]
            },
            examples: [
              { dutch: "Kijk eens! Een rode bal.", guide: "kike ayns! un roh-de bal", meaning: "Look! A red ball." },
              { dutch: "De bal is groot en rond.", guide: "de bal is khroht en ront", meaning: "The ball is big and round." },
              { dutch: "Het meisje speelt met de bal.", guide: "het may-she spehlt met de bal", meaning: "The girl plays with the ball." },
              { dutch: "Waar is de bal?", guide: "wahr is de bal", meaning: "Where is the ball?" },
              { dutch: "De bal is onder de tafel.", guide: "de bal is on-der de tah-fel", meaning: "The ball is under the table." },
              { dutch: "Kijk! Een mooie bloem.", guide: "kike! un moy-e bloom", meaning: "Look! A beautiful flower." },
              { dutch: "De bloem is rood en geel.", guide: "de bloom is roht en khayl", meaning: "The flower is red and yellow." },
              { dutch: "Het vogeltje zingt een liedje.", guide: "het voh-khel-tje zingt un leet-ye", meaning: "The little bird sings a song." },

            ]
          },
          {
            title: "Signs and Labels",
            summary: "Read real Dutch signs, labels, and announcements.",
            content: {
              objective: "Understand common Dutch signs and labels encountered in daily life.",
              sections: [
                {
                  heading: "Signs are high-frequency",
                  body: "You see the same signs repeatedly: 'ingang' (entrance), 'uitgang' (exit), 'open' (open), 'gesloten' (closed). Learn these visually."
                },
                {
                  heading: "Product labels",
                  body: "Supermarket labels are excellent reading practice. They use common words with pictures: 'melk' (milk), 'brood' (bread), 'kaas' (cheese)."
                },
                {
                  heading: "Announcements",
                  body: "Train announcements, store hours, and warning signs use predictable language. Learn the patterns and you will understand them instantly."
                }
              ],
              practice: [
                "Find Dutch signs online or take photos when you see them.",
                "Read each sign aloud and guess the meaning from context.",
                "Make flashcards of the 20 most common Dutch signs.",
                "Visit a Dutch website and identify all the signs/labels/buttons.",
                "Take photos of signs in your area and translate them into Dutch equivalents.",
                "Visit a Dutch website (e.g., bol.com) and identify 10 common button/interface labels."

              ]
            },
            examples: [
              { dutch: "Ingang", guide: "in-gang", meaning: "Entrance" },
              { dutch: "Uitgang", guide: "oyt-gang", meaning: "Exit" },
              { dutch: "Gesloten", guide: "khe-sloh-ten", meaning: "Closed" },
              { dutch: "Verboden te roken", guide: "fer-boh-den te roh-ken", meaning: "No smoking" },
              { dutch: "Kassa", guide: "kah-sah", meaning: "Checkout" },
              { dutch: "Open", guide: "oh-pen", meaning: "Open" },
              { dutch: "Verboden toegang", guide: "fer-boh-den toh-gang", meaning: "No entry" },
              { dutch: "Kassa", guide: "kah-sah", meaning: "Checkout" },

            ]
          }
        ]
      },

      // ============================================================
      // PHASE 3: Core Sentence Building
      // ============================================================
      {
        title: "3.1 Building Blocks",
        description: "Learn the essential parts of Dutch sentences.",
        lessons: [
          {
            title: "Pronouns",
            summary: "Learn Dutch subject pronouns and their use.",
            content: {
              objective: "Use all Dutch subject pronouns correctly in simple sentences.",
              sections: [
                {
                  heading: "Subject pronouns",
                  body: "Ik (I), jij/je (you), hij (he), zij/ze (she), het (it), wij/we (we), jullie (you plural), zij/ze (they). Je/ze are the informal spoken forms."
                },
                {
                  heading: "Formal and informal",
                  body: "Dutch distinguishes between informal 'jij' and formal 'u'. Use 'u' with strangers, older people, and in professional settings. 'Jij' is for friends and family."
                },
                {
                  heading: "Pronoun placement",
                  body: "Subject pronouns come before the verb in statements. In questions, they follow the verb: 'Jij komt' (you come) vs 'Kom jij?' (do you come?)."
                }
              ],
              practice: [
                "Replace English pronouns in sentences: I walk, you walk, he walks, etc.",
                "Practice the difference: 'Jij loopt' vs 'U loopt' — when to use each.",
                "Create sentences with each pronoun: Ik ben..., Jij bent..., Hij is...",
                "Listen for pronoun use in Dutch conversations — notice formal vs informal.",
                "Replace every subject in a short paragraph with the correct Dutch pronoun.",
                "Practice formal vs informal: write two versions of the same question, one with 'u' and one with 'jij'."

              ]
            },
            examples: [
              { dutch: "Ik ben Claire.", guide: "ik ben Claire", meaning: "I am Claire." },
              { dutch: "Jij bent Tom.", guide: "yay bent Tom", meaning: "You are Tom." },
              { dutch: "Hij is leraar.", guide: "hay is le-rahr", meaning: "He is a teacher." },
              { dutch: "U komt uit Egypte?", guide: "uw komt owt ay-khip-te", meaning: "You are from Egypt? (formal)" },
              { dutch: "Wij leren Nederlands.", guide: "vay lay-ren Nay-der-lahnts", meaning: "We learn Dutch." },
              { dutch: "Zij is mijn zus.", guide: "zay is mayn zus", meaning: "She is my sister." },
              { dutch: "Jullie zijn welkom.", guide: "ju-lee zayn wel-kom", meaning: "You all are welcome." },
              { dutch: "Het is mooi weer.", guide: "het is moy wayr", meaning: "It is nice weather." },

            ]
          },
          {
            title: "Present Tense Verbs (Regular)",
            summary: "Conjugate regular Dutch verbs in the present tense.",
            content: {
              objective: "Conjugate regular -en verbs for all persons in the present tense.",
              sections: [
                {
                  heading: "The infinitive and stem",
                  body: "Most Dutch infinitives end in -en: 'leren' (to learn). Remove -en to get the stem: 'ler'. The stem is the ik form."
                },
                {
                  heading: "The conjugation pattern",
                  body: "Ik = stem, jij/hij/zij = stem + t, wij/jullie/zij = infinitive. Example: ik leer, jij leert, hij leert, wij leren, jullie leren, zij leren."
                },
                {
                  heading: "Spelling changes for sound",
                  body: "If the stem ends in a tricky letter, Dutch adjusts spelling. 'Leven' (to live) becomes 'ik leef' (v becomes f). 'Reizen' (to travel) becomes 'ik reis' (z becomes s)."
                }
              ],
              practice: [
                "Conjugate: werken (to work), wonen (to live), maken (to make).",
                "Create a sentence for each person: ik werk, jij werkt, etc.",
                "Practice the spelling change: 'leven' — why does v become f?",
                "Write five sentences using regular verbs in present tense.",
                "Conjugate 'lopen', 'eten', and 'drinken' for all persons in a table.",
                "Write five sentences using different regular verbs and swap the subject to see conjugations change."

              ]
            },
            examples: [
              { dutch: "Ik leer Nederlands.", guide: "ik layr Nay-der-lahnts", meaning: "I learn Dutch." },
              { dutch: "Jij werkt thuis.", guide: "yay werkt tuis", meaning: "You work at home." },
              { dutch: "Hij woont in Rotterdam.", guide: "hay wohnt in Ro-ter-dam", meaning: "He lives in Rotterdam." },
              { dutch: "Wij maken eten.", guide: "vay mah-ken ay-ten", meaning: "We make food." },
              { dutch: "Zij reizen veel.", guide: "zay ray-zen vayl", meaning: "They travel a lot." },
              { dutch: "Ik loop naar school.", guide: "ik lohp naar skhole", meaning: "I walk to school." },
              { dutch: "Hij eet een appel.", guide: "hay ayt un ah-pel", meaning: "He eats an apple." },
              { dutch: "Wij drinken koffie.", guide: "vay drin-ken koh-fee", meaning: "We drink coffee." },

            ]
          },
          {
            title: "Present Tense Verbs (Common Irregular)",
            summary: "Learn the most important irregular verbs in the present tense.",
            content: {
              objective: "Conjugate zijn (to be), hebben (to have), and four other common irregular verbs.",
              sections: [
                {
                  heading: "Zijn — the most important verb",
                  body: "Zijn is completely irregular: ik ben, jij bent, hij is, wij zijn, jullie zijn, zij zijn. You will use this verb in every conversation."
                },
                {
                  heading: "Hebben — to have",
                  body: "Hebben is less irregular: ik heb, jij hebt, hij heeft, wij hebben, jullie hebben, zij hebben. Note the hij/she/it form: heeft (not hebbt)."
                },
                {
                  heading: "Kunnen, willen, zullen, mogen",
                  body: "These modal verbs are irregular in the singular: ik kan/wil/zal/mag (no -t ending). Jij/hij can use either stem or stem+t: jij kan/kunt, jij wil/wilt."
                }
              ],
              practice: [
                "Conjugate zijn in all persons: ik ben, jij bent, hij is...",
                "Create five sentences with hebben: ik heb een boek, etc.",
                "Practice modals: ik kan, jij kan/kunt, hij kan, wij kunnen.",
                "Write a short paragraph about yourself using zijn, hebben, and a modal.",
                "Create a mnemonic for the conjugation of 'zijn' and 'hebben'.",
                "Write a dialogue between two people using zijn, hebben, and at least one modal verb."

              ]
            },
            examples: [
              { dutch: "Ik ben moe.", guide: "ik ben moo", meaning: "I am tired." },
              { dutch: "Hij heeft een hond.", guide: "hay hayft un hont", meaning: "He has a dog." },
              { dutch: "Wij kunnen zwemmen.", guide: "vay kun-nen zweh-men", meaning: "We can swim." },
              { dutch: "Ik wil koffie.", guide: "ik wil koh-fee", meaning: "I want coffee." },
              { dutch: "Zij mogen binnenkomen.", guide: "zay moh-khen bi-nen-koh-men", meaning: "They may come in." },
              { dutch: "Ik heb honger.", guide: "ik hep hong-er", meaning: "I am hungry." },
              { dutch: "Zij is lerares.", guide: "zay is le-ra-res", meaning: "She is a teacher (female)." },
              { dutch: "Jullie hebben geluk.", guide: "ju-lee hey-ben khe-luk", meaning: "You all are lucky." },

            ]
          },
          {
            title: "Articles (de, het, een)",
            summary: "Learn the Dutch article system and noun genders.",
            content: {
              objective: "Use de, het, and een correctly with common nouns.",
              sections: [
                {
                  heading: "Two definite articles",
                  body: "Dutch has two definite articles: de and het. De is for masculine/feminine nouns (about 2/3 of nouns). Het is for neuter nouns. You must memorize the gender with each noun."
                },
                {
                  heading: "The indefinite article",
                  body: "Een (a/an) is used for all genders. In spoken Dutch, een is often pronounced as 'un'. 'Een man', 'een kind' — no gender distinction."
                },
                {
                  heading: "Tips for remembering gender",
                  body: "Nouns ending in -ing, -heid, -ie, -ij, -teit are always de. Diminutives (-je) are always het. Abstract concepts are often het."
                }
              ],
              practice: [
                "Sort these nouns by gender: huis, tafel, boek, kat, hond, kind.",
                "Practice: de man, het huis, de tafel, het boek.",
                "Use een with all genders: een man, een huis, een kat.",
                "Learn five noun gender rules and test yourself with 20 nouns.",
                "Create a chart of 30 nouns sorted by de/het with their indefinite forms.",
                "Practice: 'Dit is de man' -> 'Dit is een man'. Do this for 10 nouns of each gender."

              ]
            },
            examples: [
              { dutch: "de man", guide: "de mahn", meaning: "the man" },
              { dutch: "het huis", guide: "het huis", meaning: "the house" },
              { dutch: "een boek", guide: "un book", meaning: "a book" },
              { dutch: "de vrouw", guide: "de vrow", meaning: "the woman" },
              { dutch: "het kind", guide: "het kint", meaning: "the child" },
              { dutch: "de tafel / een tafel", guide: "de tah-fel / un tah-fel", meaning: "the table / a table" },
              { dutch: "het raam / een raam", guide: "het rahm / un rahm", meaning: "the window / a window" },
              { dutch: "de kat / een kat", guide: "de kat / un kat", meaning: "the cat / a cat" },

            ]
          }
        ]
      },
      {
        title: "3.2 Sentence Structure",
        description: "Understand how Dutch sentences are organized.",
        lessons: [
          {
            title: "Basic Sentence Order (V2)",
            summary: "Learn the Dutch V2 (verb second) rule.",
            content: {
              objective: "Construct simple Dutch statements with the verb in the correct second position.",
              sections: [
                {
                  heading: "Verb second is the rule",
                  body: "In Dutch main clauses, the finite verb is always the second element. The first position can be the subject, a time phrase, or another element — but the verb comes second."
                },
                {
                  heading: "First position flexibility",
                  body: "You can start with the subject: 'Ik leer Nederlands.' Or with a time phrase: 'Vandaag leer ik Nederlands.' The verb stays second."
                },
                {
                  heading: "Practice the pattern",
                  body: "Subject + verb + rest: 'Ik + leer + Nederlands.' Time + verb + subject + rest: 'Vandaag + leer + ik + Nederlands.' The verb never moves from second position."
                }
              ],
              practice: [
                "Write three sentences starting with the subject (SVO order).",
                "Rewrite the same sentences starting with a time word.",
                "Identify the verb in each sentence and confirm it is in second position.",
                "Read aloud: 'Ik eet brood.' → 'Vandaag eet ik brood.' Notice verb position.",
                "Write a sentence starting with each of these: subject, time, place, object — verb must stay second.",
                "Transform 'Ik eet brood.' by fronting 'brood', then 'vandaag', then 'thuis' — keep verb second."

              ]
            },
            examples: [
              { dutch: "Ik leer Nederlands.", guide: "ik layr Nay-der-lahnts", meaning: "I learn Dutch." },
              { dutch: "Vandaag leer ik Nederlands.", guide: "vahn-daakh layr ik Nay-der-lahnts", meaning: "Today I learn Dutch." },
              { dutch: "Morgen werk ik thuis.", guide: "mor-khen werk ik tuis", meaning: "Tomorrow I work at home." },
              { dutch: "Nu drink ik koffie.", guide: "nu drink ik koh-fee", meaning: "Now I drink coffee." },
              { dutch: "Altijd eet hij brood.", guide: "al-tayt ayt hay broht", meaning: "He always eats bread." },
              { dutch: "Brood eet ik elke dag.", guide: "broht ayt ik el-ke dakh", meaning: "Bread I eat every day." },
              { dutch: "Thuis werk ik morgen.", guide: "tuis werk ik mor-khen", meaning: "At home I work tomorrow." },
              { dutch: "Koffie drinkt hij 's ochtends.", guide: "koh-fee drinkt hay sokh-tents", meaning: "Coffee he drinks in the morning." },

            ]
          },
          {
            title: "Yes/No Questions",
            summary: "Form questions that can be answered with ja or nee.",
            content: {
              objective: "Turn any statement into a yes/no question by inverting verb and subject.",
              sections: [
                {
                  heading: "The inversion rule",
                  body: "To form a yes/no question, swap the verb and subject. Statement: 'Jij werkt.' Question: 'Werk jij?' The verb comes first."
                },
                {
                  heading: "No question words needed",
                  body: "Unlike wh- questions, yes/no questions only need inversion. The intonation rises at the end, just like in English."
                },
                {
                  heading: "Answering yes/no questions",
                  body: "Answer with 'ja' (yes) or 'nee' (no). You can repeat the verb for clarity: 'Ja, ik werk.' 'Nee, ik werk niet.'"
                }
              ],
              practice: [
                "Turn these statements into questions: 'Jij leert.' 'Hij werkt.' 'Wij komen.'",
                "Answer each question with ja or nee and a full sentence.",
                "Practice the intonation — your voice should rise at the end.",
                "Have a mini-dialogue using only yes/no questions.",
                "Convert five statements to yes/no questions, record yourself, and check the rising intonation.",
                "Have a mini conversation using only yes/no questions: 'Werk je?', 'Woon je hier?', 'Spreek je Nederlands?'"

              ]
            },
            examples: [
              { dutch: "Werk jij?", guide: "werk yay", meaning: "Do you work?" },
              { dutch: "Leert hij Nederlands?", guide: "layrt hay Nay-der-lahnts", meaning: "Does he learn Dutch?" },
              { dutch: "Komt zij ook?", guide: "komt zay ohk", meaning: "Is she coming too?" },
              { dutch: "Ben je moe?", guide: "ben yuh moo", meaning: "Are you tired?" },
              { dutch: "Hebben jullie honger?", guide: "heh-ben ju-lee hong-er", meaning: "Are you all hungry?" },
              { dutch: "Regent het?", guide: "ray-khent het (rising)", meaning: "Is it raining?" },
              { dutch: "Heb je kinderen?", guide: "hep yuh kin-der-en", meaning: "Do you have children?" },
              { dutch: "Kom je morgen?", guide: "kom yuh mor-khen", meaning: "Are you coming tomorrow?" },

            ]
          },
          {
            title: "Wh- Questions",
            summary: "Form questions using question words: wie, wat, waar, wanneer, hoe, waarom.",
            content: {
              objective: "Construct wh- questions with correct word order.",
              sections: [
                {
                  heading: "Question words",
                  body: "Wie (who), wat (what), waar (where), wanneer (when), hoe (how), waarom (why). These always come first in the sentence."
                },
                {
                  heading: "Word order after question words",
                  body: "After the question word, the verb comes next (position 2), then the subject. 'Waar woon jij?' — question word + verb + subject."
                },
                {
                  heading: "Wat vs. wat voor",
                  body: "'Wat' asks for a general thing: 'Wat is dat?' (What is that?). 'Wat voor' asks for a type: 'Wat voor boek is dat?' (What kind of book is that?)."
                }
              ],
              practice: [
                "Create questions with each question word: wie, wat, waar, wanneer, hoe.",
                "Answer each question with a complete sentence.",
                "Practice 'wat' vs 'wat voor' with objects around you.",
                "Ask and answer five wh- questions in a row without pausing.",
                "Ask a partner five wh- questions about their daily life and write down their answers.",
                "Practice the difference: 'Wat is dat?' vs 'Wat voor boek is dat?' — create three examples of each."

              ]
            },
            examples: [
              { dutch: "Wie ben jij?", guide: "wee ben yay", meaning: "Who are you?" },
              { dutch: "Wat is dat?", guide: "wat is daht", meaning: "What is that?" },
              { dutch: "Waar woon je?", guide: "wahr wohn yuh", meaning: "Where do you live?" },
              { dutch: "Hoe gaat het?", guide: "hoo khaht het", meaning: "How are you?" },
              { dutch: "Waarom leer je Nederlands?", guide: "wah-rom layr yuh Nay-der-lahnts", meaning: "Why are you learning Dutch?" },
              { dutch: "Wanneer vertrek je?", guide: "wah-ner fer-trek yuh", meaning: "When do you leave?" },
              { dutch: "Wat voor weer is het?", guide: "wat vor wayr is het", meaning: "What kind of weather is it?" },
              { dutch: "Hoeveel kost dat?", guide: "hoo-vayl kost daht", meaning: "How much does that cost?" },

            ]
          }
        ]
      },
      {
        title: "3.3 Expanding Sentences",
        description: "Add detail and nuance to your Dutch sentences.",
        lessons: [
          {
            title: "Negatives (niet, geen)",
            summary: "Learn how to make Dutch sentences negative.",
            content: {
              objective: "Correctly use niet and geen to negate Dutch sentences.",
              sections: [
                {
                  heading: "Niet for verbs and adjectives",
                  body: "Use 'niet' to negate verbs, adjectives, and adverbs. It comes at the end of the sentence or before the word it negates: 'Ik werk niet.' 'Hij is niet groot.'"
                },
                {
                  heading: "Geen for nouns",
                  body: "Use 'geen' instead of 'niet een' to negate nouns with the indefinite article. 'Ik heb een boek' becomes 'Ik heb geen boek' (not 'niet een boek')."
                },
                {
                  heading: "Position of niet",
                  body: "Niet usually comes at the end of the sentence: 'Ik kom niet.' With time words, it comes before the time: 'Ik kom morgen niet.' With two verbs, it comes before the second verb: 'Ik kan niet komen.'"
                }
              ],
              practice: [
                "Negate: 'Ik werk.' → 'Ik werk niet.' 'Ik heb een hond.' → 'Ik heb geen hond.'",
                "Practice the difference: 'niet' vs 'geen' with 10 sentences.",
                "Move 'niet' to different positions and see how the meaning changes.",
                "Write three negative sentences about things you do not do or have.",
                "Take 10 sentences with 'een' and convert them to negative using 'geen'.",
                "Write three negative sentences and three positive sentences, then read them aloud contrasting the intonation."

              ]
            },
            examples: [
              { dutch: "Ik werk niet.", guide: "ik werk neet", meaning: "I do not work." },
              { dutch: "Ik heb geen hond.", guide: "ik hep khayn hont", meaning: "I do not have a dog." },
              { dutch: "Hij is niet groot.", guide: "hay is neet khroht", meaning: "He is not big." },
              { dutch: "Ik kan niet komen.", guide: "ik kan neet koh-men", meaning: "I cannot come." },
              { dutch: "Zij heeft geen tijd.", guide: "zay hayft khayn tayt", meaning: "She has no time." },
              { dutch: "Ik heb geen geld.", guide: "ik hep khayn khelt", meaning: "I have no money." },
              { dutch: "Hij woont niet hier.", guide: "hay wohnt neet heer", meaning: "He does not live here." },
              { dutch: "Zij lust geen vis.", guide: "zay lust khayn vis", meaning: "She does not like fish." },

            ]
          },
          {
            title: "Adjectives (Basic)",
            summary: "Learn how to use adjectives before nouns in Dutch.",
            content: {
              objective: "Place adjectives correctly before nouns with proper endings.",
              sections: [
                {
                  heading: "Adjectives before nouns get -e",
                  body: "When an adjective comes before a de-word, add -e: 'de grote man'. Before het-words with definite article, also add -e: 'het grote huis'."
                },
                {
                  heading: "Het-words with indefinite article",
                  body: "After 'een' with het-words, the adjective does NOT get -e: 'een groot huis'. But with de-words it does: 'een grote man'."
                },
                {
                  heading: "Adjectives after verbs",
                  body: "When the adjective comes after the verb (predicative), no ending is needed: 'De man is groot.' 'Het huis is groot.' This is simpler."
                }
              ],
              practice: [
                "Add -e or not: een (groot) huis, de (groot) man, een (mooi) vrouw.",
                "Practice: 'De man is groot' vs 'de grote man' — why the difference?",
                "Describe objects around you using adjective + noun phrases.",
                "Write five sentences with adjectives in both positions.",
                "Describe five objects in your room using adjective + noun with correct endings.",
                "Explain the rule: why 'een groot huis' but 'het grote huis' — use your own words."

              ]
            },
            examples: [
              { dutch: "de grote man", guide: "de khroh-te mahn", meaning: "the big man" },
              { dutch: "een groot huis", guide: "un khroht huis", meaning: "a big house" },
              { dutch: "de mooie vrouw", guide: "de moy-e vrow", meaning: "the beautiful woman" },
              { dutch: "een mooi meisje", guide: "un moy may-she", meaning: "a beautiful girl" },
              { dutch: "Het huis is groot.", guide: "het huis is khroht", meaning: "The house is big." },
              { dutch: "een kleine kat", guide: "un klay-ne kat", meaning: "a small cat" },
              { dutch: "het kleine kind", guide: "het klay-ne kint", meaning: "the small child" },
              { dutch: "De soep is warm.", guide: "de soop is warm", meaning: "The soup is warm." },

            ]
          },
          {
            title: "Prepositions (Common)",
            summary: "Learn the most common Dutch prepositions.",
            content: {
              objective: "Use in, op, onder, naast, voor, achter, tussen, met, and zonder correctly.",
              sections: [
                {
                  heading: "Location prepositions",
                  body: "In (in), op (on), onder (under), naast (next to), voor (in front of), achter (behind), tussen (between). These are used exactly like in English."
                },
                {
                  heading: "Other common prepositions",
                  body: "Met (with), zonder (without), voor (for), door (through/by), bij (at/near), tegen (against). Learn these in phrases, not in isolation."
                },
                {
                  heading: "Prepositions with verbs",
                  body: "Some Dutch verbs pair with specific prepositions: 'wachten op' (wait for), 'houden van' (love), 'denken aan' (think about). Learn verb-preposition combinations together."
                }
              ],
              practice: [
                "Describe where objects are in your room using locational prepositions.",
                "Create sentences with: met, zonder, voor, bij.",
                "Learn three verb-preposition combinations: wachten op, houden van, denken aan.",
                "Practice: 'Ik wacht op de bus.' 'Ik hou van jou.' 'Ik denk aan jou.'",
                "Describe your room layout using at least 5 different prepositions in Dutch.",
                "Write sentences for each of these verb-preposition pairs: wachten op, houden van, denken aan, geloven in."

              ]
            },
            examples: [
              { dutch: "Het boek is op de tafel.", guide: "het book is op de tah-fel", meaning: "The book is on the table." },
              { dutch: "De kat zit onder de stoel.", guide: "de kat zit on-der de stool", meaning: "The cat sits under the chair." },
              { dutch: "Ik wacht op de bus.", guide: "ik wacht op de bus", meaning: "I wait for the bus." },
              { dutch: "Ik hou van jou.", guide: "ik hou van yow", meaning: "I love you." },
              { dutch: "Zij woont bij haar moeder.", guide: "zay wohnt by hahr moo-der", meaning: "She lives at her mother's." },
              { dutch: "De hond ligt onder de tafel.", guide: "de hont likht on-der de tah-fel", meaning: "The dog lies under the table." },
              { dutch: "Ik denk aan je.", guide: "ik denk aan yuh", meaning: "I am thinking of you." },
              { dutch: "Zij gelooft in sprookjes.", guide: "zay khe-looft in sproh-kjes", meaning: "She believes in fairy tales." },

            ]
          }
        ]
      },

      // ============================================================
      // PHASE 4: Survival Dutch
      // ============================================================
      {
        title: "4.1 First Encounters",
        description: "Handle introductions, numbers, and time.",
        lessons: [
          {
            title: "Greetings and Introductions",
            summary: "Meet people and introduce yourself in Dutch.",
            content: {
              objective: "Greet someone, introduce yourself, and respond to introductions.",
              sections: [
                {
                  heading: "Formal and informal greetings",
                  body: "Informal: 'Hoi' (hi), 'Hallo' (hello). Formal: 'Goedemorgen' (good morning), 'Goedemiddag' (good afternoon), 'Goedenavond' (good evening). Time of day matters."
                },
                {
                  heading: "Introducing yourself",
                  body: "Say 'Ik ben [name]' or 'Mijn naam is [name]'. Respond with 'Aangenaam' (pleased to meet you). Ask 'Hoe heet jij?' (What is your name?) informally or 'Hoe heet u?' formally."
                },
                {
                  heading: "How are you?",
                  body: "Ask 'Hoe gaat het?' informally or 'Hoe gaat het met u?' formally. Common answers: 'Goed' (good), 'Prima' (fine), 'Niet zo goed' (not so good), and always ask back: 'En met jou/u?'"
                }
              ],
              practice: [
                "Practice a full introduction: greeting, name, how-are-you, response.",
                "Role-play: introduce yourself to someone formally and informally.",
                "Record yourself doing five introductions with different names.",
                "Practice the response chain: 'Hoi, ik ben... Hoe gaat het?' 'Goed, en met jou?'",
                "Practice the full greeting sequence for morning, afternoon, and evening.",
                "Role-play meeting someone for the first time and exchanging contact information."

              ]
            },
            examples: [
              { dutch: "Hallo, ik ben Sam.", guide: "hah-loh, ik ben Sam", meaning: "Hello, I am Sam." },
              { dutch: "Goedemorgen, mevrouw.", guide: "khoo-de-mor-khen, me-vrow", meaning: "Good morning, madam." },
              { dutch: "Hoe heet jij?", guide: "hoo hayt yay", meaning: "What is your name?" },
              { dutch: "Aangenaam.", guide: "ahn-khe-nahm", meaning: "Pleased to meet you." },
              { dutch: "Hoe gaat het?", guide: "hoo khaht het", meaning: "How are you?" },
              { dutch: "Goedemiddag, meneer.", guide: "khoo-de-mi-dakh, me-nayr", meaning: "Good afternoon, sir." },
              { dutch: "Dag, ik ben Lisa. Aangenaam.", guide: "dakh, ik ben Lisa. ahn-khe-nahm", meaning: "Hi, I am Lisa. Pleased to meet you." },
              { dutch: "Tot ziens en bedankt!", guide: "tot zeens en be-dankt", meaning: "See you later and thanks!" },

            ],
            exercises: [
              {
                type: "multiple-choice",
                question: "How do you say 'good morning' formally in Dutch?",
                data: { options: ["Goedenavond", "Goedemorgen", "Goedemiddag", "Goedenacht"], correctIndex: 1 }
              },
              {
                type: "multiple-choice",
                question: "What does 'Aangenaam' mean?",
                data: { options: ["Goodbye", "Please", "Pleased to meet you", "Thank you"], correctIndex: 2 }
              },
              {
                type: "translation",
                question: "How do you ask 'How are you?' informally in Dutch?",
                data: { correctAnswer: "Hoe gaat het", acceptableAnswers: ["hoe gaat het", "hoe gaat het?"] }
              },
              {
                type: "listen-choose",
                question: "Listen and choose the correct meaning:",
                data: { audioText: "Hallo, ik ben Sam", options: ["Hello, I am Sam", "Goodbye, Sam", "How are you, Sam", "See you later, Sam"], correctIndex: 0 }
              }
            ]
          },
          {
            title: "Numbers 1–100",
            summary: "Count, say numbers, and understand prices.",
            content: {
              objective: "Say and understand numbers from 1 to 100 in Dutch.",
              sections: [
                {
                  heading: "Numbers 1–20",
                  body: "Een (1), twee (2), drie (3), vier (4), vijf (5), zes (6), zeven (7), acht (8), negen (9), tien (10), elf (11), twaalf (12), dertien (13), veertien (14), vijftien (15), zestien (16), zeventien (17), achttien (18), negentien (19), twintig (20)."
                },
                {
                  heading: "Tens and beyond",
                  body: "Dertig (30), veertig (40), vijftig (50), zestig (60), zeventig (70), tachtig (80), negentig (90). For 21-99, Dutch says the unit first then the ten: 'eenentwintig' (21), 'tweeëndertig' (32)."
                },
                {
                  heading: "Prices and amounts",
                  body: "Prices use 'euro' (€) and 'cent' (c). 'Dat kost vijf euro' (that costs 5 euros). 'Heb je kleingeld?' (do you have change?). Numbers are essential for shopping."
                }
              ],
              practice: [
                "Count from 1 to 20 without looking at the written forms.",
                "Say numbers 21-30 aloud — notice the reversed order.",
                "Read prices aloud: €4,50, €12,75, €99,99.",
                "Practice understanding numbers by listening to Dutch number recordings.",
                "Say your phone number digit by digit in Dutch.",
                "Practice saying ages: 'Ik ben 27 jaar oud. Mijn moeder is 62.' Repeat for 5 different people."

              ]
            },
            examples: [
              { dutch: "een", guide: "ayn", meaning: "one" },
              { dutch: "twaalf", guide: "twahlf", meaning: "twelve" },
              { dutch: "eenentwintig", guide: "ay-nen-twin-tikh", meaning: "twenty-one" },
              { dutch: "vijftig", guide: "vayf-tikh", meaning: "fifty" },
              { dutch: "Dat kost vijf euro.", guide: "daht kost vayf uh-roh", meaning: "That costs five euros." },
              { dutch: "zevenenzestig", guide: "zay-ven-en-zes-tikh", meaning: "sixty-seven" },
              { dutch: "drieëntachtig", guide: "dree-en-takh-tikh", meaning: "eighty-three" },
              { dutch: "Dat kost achtenveertig euro.", guide: "daht kost akh-ten-vayf-tikh uh-roh", meaning: "That costs forty-eight euros." },

            ]
          },
          {
            title: "Telling Time and Dates",
            summary: "Ask and tell the time, and say dates in Dutch.",
            content: {
              objective: "Tell the time and say today's date in Dutch.",
              sections: [
                {
                  heading: "Telling time",
                  body: "Use 'Het is...' followed by the time. 'Het is drie uur' (it is three o'clock). For half hours: 'half vier' means 3:30 (halfway to four). For minutes past: 'vijf over drie' (3:05). For minutes to: 'vijf voor half vier' (3:25)."
                },
                {
                  heading: "Days of the week",
                  body: "Maandag (Monday), dinsdag (Tuesday), woensdag (Wednesday), donderdag (Thursday), vrijdag (Friday), zaterdag (Saturday), zondag (Sunday). Note: all days are masculine (de)."
                },
                {
                  heading: "Months and dates",
                  body: "Months are similar to English: januari, februari, maart, april, mei, juni, juli, augustus, september, oktober, november, december. Say dates as: 'een januari tweeduizendvijfentwintig' (1 January 2025)."
                }
              ],
              practice: [
                "Practice telling the time: 2:00, 2:15, 2:30, 2:45.",
                "Say today's day, date, and time in Dutch.",
                "Practice the confusing 'half vier' = 3:30 logic.",
                "Ask and answer: 'Hoe laat is het?' at five different times.",
                "Set your watch to Dutch time — say every hour change in Dutch for one day.",
                "Practice: say 'It is 12:00, 12:15, 12:30, 12:45, 12:55' in Dutch without looking."

              ]
            },
            examples: [
              { dutch: "Het is drie uur.", guide: "het is dree uur", meaning: "It is three o'clock." },
              { dutch: "Het is half vier.", guide: "het is half veer", meaning: "It is 3:30." },
              { dutch: "Vandaag is het maandag.", guide: "vahn-daakh is het mahn-dakh", meaning: "Today is Monday." },
              { dutch: "Mijn verjaardag is in mei.", guide: "mayn fer-yahr-dakh is in may", meaning: "My birthday is in May." },
              { dutch: "Hoe laat is het?", guide: "hoo laht is het", meaning: "What time is it?" },
              { dutch: "Het is kwart over twee.", guide: "het is kwart oh-ver tvey", meaning: "It is 2:15." },
              { dutch: "Het is vijf voor half zes.", guide: "het is vayf vor half zays", meaning: "It is 5:25." },
              { dutch: "Morgen is het donderdag de derde.", guide: "mor-khen is het don-der-dakh de der-de", meaning: "Tomorrow is Thursday the 3rd." },

            ]
          }
        ]
      },
      {
        title: "4.2 Daily Life",
        description: "Handle shopping, food, directions, and transport.",
        lessons: [
          {
            title: "Shopping and Food",
            summary: "Shop for food and common items in Dutch.",
            content: {
              objective: "Ask for items, understand prices, and complete a purchase.",
              sections: [
                {
                  heading: "Asking for items",
                  body: "Use 'Ik wil graag...' (I would like...) or 'Heeft u...?' (Do you have...?). 'Ik wil graag een brood' (I would like a bread). Point and ask 'Wat is dat?' (What is that?)."
                },
                {
                  heading: "Quantities",
                  body: "Learn packaging words: 'een fles' (bottle), 'een pak' (carton), 'een doos' (box), 'een kilo' (kilo), 'een ons' (100g), 'een stuk' (piece)."
                },
                {
                  heading: "At the checkout",
                  body: "The cashier will say the total. Listen for euro and cent. Say 'Hoeveel kost dit?' (How much is this?). Pay with 'Contant' (cash) or 'Met pin' (card)."
                }
              ],
              practice: [
                "Write a shopping list in Dutch for five items.",
                "Role-play: ask for three items at a shop and pay.",
                "Practice quantities: 'een fles water', 'een kilo appels'.",
                "Listen for prices in Dutch audio and write them down.",
                "Write a shopping list for a week's groceries, all in Dutch.",
                "Role-play returning an item to a shop: explain why you want to return it."

              ]
            },
            examples: [
              { dutch: "Ik wil graag een brood.", guide: "ik wil khrahkh un broht", meaning: "I would like a bread." },
              { dutch: "Heeft u melk?", guide: "hayft uw melk", meaning: "Do you have milk?" },
              { dutch: "Hoeveel kost dit?", guide: "hoo-vayl kost dit", meaning: "How much is this?" },
              { dutch: "Dat is duur.", guide: "daht is duur", meaning: "That is expensive." },
              { dutch: "Ik betaal met pin.", guide: "ik be-tahl met pin", meaning: "I pay with card." },
              { dutch: "Heeft u vers fruit?", guide: "hayft uw fers fruyt", meaning: "Do you have fresh fruit?" },
              { dutch: "Ik zoek een goede rode wijn.", guide: "ik zook un krhoo-de roh-de wyn", meaning: "I am looking for a good red wine." },
              { dutch: "Mag ik een bonnetje?", guide: "makh ik un bo-ne-tje", meaning: "May I have a receipt?" },

            ]
          },
          {
            title: "Ordering at Restaurants",
            summary: "Order food and drinks at a Dutch café or restaurant.",
            content: {
              objective: "Order a meal, ask questions about the menu, and pay the bill.",
              sections: [
                {
                  heading: "Getting attention",
                  body: "Say 'Ober' (waiter) or 'Serveerster' (waitress). More politely: 'Meneer' (sir) or 'Mevrouw' (ma'am). Catch their eye and nod."
                },
                {
                  heading: "Ordering",
                  body: "Use 'Ik wil graag...' (I would like...) or 'Voor mij...' (For me...). 'Ik wil graag de tomatensoep' (I would like the tomato soup). For drinks: 'Een koffie, alstublieft' (A coffee, please)."
                },
                {
                  heading: "The bill",
                  body: "Ask 'De rekening, alstublieft' (The bill, please). In the Netherlands, splitting the bill is common: 'We gaan apart betalen' (we will pay separately). Tipping is not required but rounding up is appreciated."
                }
              ],
              practice: [
                "Role-play ordering a three-course meal in Dutch.",
                "Practice asking: 'Wat is dit?' 'Heeft u vegetarische opties?'",
                "Learn five Dutch dishes and practice ordering them.",
                "Practice the bill conversation: 'De rekening, alstublieft. Samen of apart?'",
                "Role-play a full restaurant visit: enter, order, eat, pay, leave — all in Dutch.",
                "Learn how to handle special requests: 'Zonder ui, alstublieft' and 'Ik heb een allergie.'"

              ]
            },
            examples: [
              { dutch: "Ik wil graag een koffie.", guide: "ik wil khrahkh un koh-fee", meaning: "I would like a coffee." },
              { dutch: "Voor mij de tomatensoep.", guide: "vor may de toh-mah-ten-soop", meaning: "For me the tomato soup." },
              { dutch: "Heeft u vegetarische opties?", guide: "hayft uw vay-khe-tah-ree-se op-tees", meaning: "Do you have vegetarian options?" },
              { dutch: "De rekening, alstublieft.", guide: "de ray-ke-ning, al-stu-bleeft", meaning: "The bill, please." },
              { dutch: "Het was heerlijk!", guide: "het was hayr-lek", meaning: "It was delicious!" },
              { dutch: "Ik wil graag een biertje.", guide: "ik wil khrahkh un beer-tje", meaning: "I would like a beer." },
              { dutch: "Heeft u een aanbeveling?", guide: "hayft uw un ahn-bay-ve-ling", meaning: "Do you have a recommendation?" },
              { dutch: "Het eten was voortreffelijk.", guide: "het ay-ten was vohr-tre-fe-lek", meaning: "The food was excellent." },

            ]
          },
          {
            title: "Asking for Directions",
            summary: "Ask for and understand directions in Dutch.",
            content: {
              objective: "Ask where a place is and understand the response.",
              sections: [
                {
                  heading: "Asking the way",
                  body: "Use 'Waar is...' (Where is...) or 'Hoe kom ik bij...' (How do I get to...). 'Waar is het station?' (Where is the station?). 'Hoe kom ik bij het museum?' (How do I get to the museum?)."
                },
                {
                  heading: "Understanding responses",
                  body: "Key direction words: 'linksaf' (left), 'rechtsaf' (right), 'rechtdoor' (straight ahead), 'bij' (at/near), 'tegenover' (opposite), 'de hoek om' (around the corner)."
                },
                {
                  heading: "Asking for clarification",
                  body: "If you do not understand, say 'Kunt u dat herhalen?' (Can you repeat that?) or 'Kunt u langzamer praten?' (Can you speak slower?). People are usually happy to help."
                }
              ],
              practice: [
                "Learn and practice eight direction words: links, rechts, rechtdoor, etc.",
                "Role-play: ask for directions to the station, museum, and supermarket.",
                "Practice understanding by listening to direction phrases.",
                "Give directions from your home to a nearby landmark in Dutch.",
                "Draw a simple map and give directions in Dutch from point A to point B.",
                "Practice asking for clarification: 'Links of rechts?' 'Eerste of tweede straat?'"

              ]
            },
            examples: [
              { dutch: "Waar is het station?", guide: "wahr is het stah-shon", meaning: "Where is the station?" },
              { dutch: "Ga linksaf.", guide: "khah links-ahf", meaning: "Go left." },
              { dutch: "Het is rechtdoor.", guide: "het is rekht-dohr", meaning: "It is straight ahead." },
              { dutch: "Neem de tweede straat rechts.", guide: "naym de tvey-de straht rekhts", meaning: "Take the second street right." },
              { dutch: "Het is tegenover het museum.", guide: "het is tay-khen-oh-ver het mu-zay-um", meaning: "It is opposite the museum." },
              { dutch: "Loop rechtdoor tot aan het plein.", guide: "lohp rekht-dohr tot aan het playn", meaning: "Walk straight ahead to the square." },
              { dutch: "Neem de derde afslag.", guide: "naym de der-de af-slakh", meaning: "Take the third exit." },
              { dutch: "Het is naast de kerk.", guide: "het is nahst de kerk", meaning: "It is next to the church." },

            ]
          },
          {
            title: "Public Transport",
            summary: "Use Dutch trains, buses, and trams with confidence.",
            content: {
              objective: "Buy a ticket, find the right platform, and understand announcements.",
              sections: [
                {
                  heading: "Buying tickets",
                  body: "Use the ticket machine or ask at the counter: 'Een ticket naar Amsterdam, alstublieft.' (A ticket to Amsterdam, please). In cities, use an OV-chipkaart (public transport card)."
                },
                {
                  heading: "Platforms and tracks",
                  body: "Trains depart from 'perron' (platform). Listen for: 'Uw trein naar Utrecht vertrekt van perron 3' (Your train to Utrecht departs from platform 3). Buses/trams have 'halte' (stop)."
                },
                {
                  heading: "Announcements",
                  body: "Common phrases: 'Vertraging' (delay), 'uitvalt' (cancelled), 'overstappen' (transfer), 'eindbestemming' (final destination). If your train is delayed, listen for how many minutes: 'vijftien minuten vertraging'."
                }
              ],
              practice: [
                "Practice buying a ticket: 'Een retourtje Den Haag, alstublieft.'",
                "Learn the difference between 'perron' and 'halte'.",
                "Listen to Dutch train announcements and write what you hear.",
                "Role-play: ask for help when your train is delayed.",
                "Plan a multi-leg journey in Dutch: from your house to a museum using train + bus.",
                "Practice listening to Dutch station announcements online and write down what you hear."

              ]
            },
            examples: [
              { dutch: "Een ticket naar Utrecht, alstublieft.", guide: "un ti-ket naar U-trekht, al-stu-bleeft", meaning: "A ticket to Utrecht, please." },
              { dutch: "Van welk perron vertrekt de trein?", guide: "van welk per-ron fer-trekt de trayn", meaning: "From which platform does the train depart?" },
              { dutch: "De trein heeft vertraging.", guide: "de trayn hayft fer-trah-ging", meaning: "The train is delayed." },
              { dutch: "Moet ik overstappen?", guide: "moot ik oh-ver-stah-pen", meaning: "Do I need to transfer?" },
              { dutch: "Waar is de bushalte?", guide: "wahr is de bus-hal-te", meaning: "Where is the bus stop?" },
              { dutch: "Moet ik de sprinter of intercity nemen?", guide: "moot ik de sprin-ter of in-ter-si-tee nay-men", meaning: "Do I need to take the sprinter or intercity?" },
              { dutch: "Deze trein rijdt niet verder.", guide: "day-ze trayn rayt neet fer-der", meaning: "This train does not continue further." },
              { dutch: "Waar kan ik een OV-chipkaart kopen?", guide: "wahr kan ik un oh-vay-chip-kaart koh-pen", meaning: "Where can I buy an OV-chipkaart?" },

            ]
          }
        ]
      },
      {
        title: "4.3 Personal Situations",
        description: "Handle family, emergencies, and practice conversations.",
        lessons: [
          {
            title: "Family and Relationships",
            summary: "Talk about your family and relationships in Dutch.",
            content: {
              objective: "Describe your family members and relationships using simple sentences.",
              sections: [
                {
                  heading: "Family members",
                  body: "Vader (father), moeder (mother), broer (brother), zus (sister), zoon (son), dochter (daughter), opa (grandpa), oma (grandma), oom (uncle), tante (aunt)."
                },
                {
                  heading: "Possessives",
                  body: "Mijn (my), jouw/je (your), zijn (his), haar (her), ons/onze (our), jullie (your pl), hun (their). 'Mijn vader', 'jouw moeder', 'zijn broer'."
                },
                {
                  heading: "Talking about relationships",
                  body: "Use 'Ik heb...' (I have...) and 'Ik ben...' (I am...). 'Ik heb een broer en een zus.' (I have a brother and a sister.) 'Ik ben getrouwd' (I am married). 'Ik woon alleen' (I live alone)."
                }
              ],
              practice: [
                "Draw your family tree and label everyone in Dutch.",
                "Describe your family using: 'Ik heb een... Mijn vader heet...'",
                "Practice possessive: mijn, jouw, zijn, haar with family words.",
                "Tell someone about your relationship status and living situation.",
                "Describe your extended family (aunts, uncles, cousins) using possessive pronouns.",
                "Write a short paragraph about a family celebration in Dutch."

              ]
            },
            examples: [
              { dutch: "Ik heb een broer.", guide: "ik hep un broor", meaning: "I have a brother." },
              { dutch: "Mijn moeder heet Anna.", guide: "mayn moo-der hayt Ah-nah", meaning: "My mother is called Anna." },
              { dutch: "Heb jij kinderen?", guide: "hep yay kin-der-en", meaning: "Do you have children?" },
              { dutch: "Ik ben getrouwd.", guide: "ik ben khe-trowt", meaning: "I am married." },
              { dutch: "Zij woont bij haar oma.", guide: "zay wohnt by hahr oh-mah", meaning: "She lives with her grandma." },
              { dutch: "Mijn oom en tante wonen in België.", guide: "mayn ohm en tahn-te woh-nen in Bel-khee", meaning: "My uncle and aunt live in Belgium." },
              { dutch: "Heb jij een broer of zus?", guide: "hep yay un broor of zus", meaning: "Do you have a brother or sister?" },
              { dutch: "Onze familie eet elke zondag samen.", guide: "on-ze fah-mee-lee ayt el-ke zon-dakh sah-men", meaning: "Our family eats together every Sunday." },

            ]
          },
          {
            title: "Emergency and Help Phrases",
            summary: "Know what to say in urgent or difficult situations.",
            content: {
              objective: "Ask for help and communicate essential information in an emergency.",
              sections: [
                {
                  heading: "Getting attention",
                  body: "Say 'Help!' (Help!), 'Let op!' (Watch out!), or 'Ik heb hulp nodig' (I need help). Approach someone and say 'Kunt u mij helpen?' (Can you help me?)."
                },
                {
                  heading: "Medical emergencies",
                  body: "Learn: 'Ik ben ziek' (I am sick), 'Ik heb pijn' (I have pain), 'Bel een ambulance' (Call an ambulance). 'Waar is het ziekenhuis?' (Where is the hospital?). Apotheek (pharmacy) is for non-emergency medicine."
                },
                {
                  heading: "Lost items and problems",
                  body: "If something is lost: 'Ik ben mijn paspoort kwijt' (I lost my passport). 'Ik heb mezelf buitengesloten' (I locked myself out). 'Mijn telefoon is leeg' (My phone is dead)."
                }
              ],
              practice: [
                "Memorize the emergency number: 112 (same as EU, free).",
                "Practice saying 'Ik heb hulp nodig' with clear pronunciation.",
                "Role-play reporting a lost passport.",
                "Learn: 'Spreekt u Engels?' (Do you speak English?) for backup.",
                "Memorize the emergency number (112) and practice saying what help you need.",
                "Role-play: you lost your bag. Ask a police officer for help in Dutch."

              ]
            },
            examples: [
              { dutch: "Help!", guide: "help", meaning: "Help!" },
              { dutch: "Ik heb hulp nodig.", guide: "ik hep hulp noh-dikh", meaning: "I need help." },
              { dutch: "Bel een ambulance!", guide: "bel un ahm-bu-lahn-se", meaning: "Call an ambulance!" },
              { dutch: "Ik ben mijn paspoort kwijt.", guide: "ik ben mayn pahs-pohrt kvayt", meaning: "I lost my passport." },
              { dutch: "Spreekt u Engels?", guide: "spraykt uw Eng-els", meaning: "Do you speak English?" },
              { dutch: "Er is een ongeluk gebeurd.", guide: "er is un on-khe-luk khe-buurt", meaning: "There has been an accident." },
              { dutch: "Ik ben beroofd.", guide: "ik ben be-rohft", meaning: "I have been robbed." },
              { dutch: "Kunt u een dokter bellen?", guide: "kunt uw un dok-ter be-len", meaning: "Can you call a doctor?" },

            ]
          },
          {
            title: "Role-Playing Practice",
            summary: "Combine survival phrases into real-life scenarios.",
            content: {
              objective: "Handle a complete survival scenario in Dutch from start to finish.",
              sections: [
                {
                  heading: "Scenario 1: At the market",
                  body: "Greet the vendor, ask for tomatoes, ask the price, buy one kilo, pay, and say thank you. All in one continuous interaction."
                },
                {
                  heading: "Scenario 2: Lost in the city",
                  body: "Approach someone, apologize, ask for directions to the station, repeat the directions to confirm, thank them. If you get lost again, ask another person."
                },
                {
                  heading: "Scenario 3: At a restaurant",
                  body: "Enter, greet, ask for a table, order a drink and a meal, ask for the bill, pay, compliment the food, and say goodbye."
                }
              ],
              practice: [
                "Act out the market scenario with a partner or recording.",
                "Act out the lost-in-the-city scenario with a map.",
                "Act out the restaurant scenario from start to finish.",
                "Write a script for each scenario and practice until smooth.",
                "Create your own scenario: a visit to the dentist, and act it out in Dutch.",
                "Record all three scenarios (market, lost, restaurant) and listen for areas to improve."

              ]
            },
            examples: [
              { dutch: "Goedemorgen, ik wil graag tomaten.", guide: "khoo-de-mor-khen, ik wil khrahkh toh-mah-ten", meaning: "Good morning, I would like tomatoes." },
              { dutch: "Pardon, waar is het station?", guide: "par-don, wahr is het stah-shon", meaning: "Excuse me, where is the station?" },
              { dutch: "Een tafel voor twee, alstublieft.", guide: "un tah-fel vor tvey, al-stu-bleeft", meaning: "A table for two, please." },
              { dutch: "Dank u wel!", guide: "dank uw wel", meaning: "Thank you very much!" },
              { dutch: "Tot ziens!", guide: "tot zeens", meaning: "See you later!" },
              { dutch: "Mag ik een kilo appels, alstublieft?", guide: "makh ik un kee-loh ah-pels, al-stu-bleeft", meaning: "May I have a kilo of apples, please?" },
              { dutch: "Kunt u mij de weg wijzen naar het station?", guide: "kunt uw may de wekh way-zen naar het stah-shon", meaning: "Can you show me the way to the station?" },
              { dutch: "De rekening graag, en een doggybag.", guide: "de ray-ke-ning khrahkh, en un doh-gee-bag", meaning: "The bill please, and a doggy bag." },

            ]
          }
        ]
      },

      // ============================================================
      // PHASE 5: Listening Foundation
      // ============================================================
      {
        title: "5.1 Understanding Speech",
        description: "Bridge the gap between written Dutch and spoken Dutch.",
        lessons: [
          {
            title: "Slow Speech Patterns",
            summary: "Learn how Dutch sounds change in slow, careful speech.",
            content: {
              objective: "Recognize Dutch sounds in slow, clearly spoken sentences.",
              sections: [
                {
                  heading: "Careful speech is your friend",
                  body: "When people speak slowly for you, they pronounce every syllable clearly. This is the ideal learning stage. Notice how each sound matches the spelling."
                },
                {
                  heading: "Word boundaries are clear",
                  body: "In slow speech, words are separate with clear pauses. Listen for where one word ends and the next begins. This is harder in fast speech."
                },
                {
                  heading: "Practice with learner materials",
                  body: "Use resources labeled 'langzaam Nederlands' (slow Dutch). News for learners and beginner podcasts speak at a reduced speed with clear articulation."
                }
              ],
              practice: [
                "Find a slow Dutch audio clip and listen three times.",
                "Write down every word you hear in the first sentence.",
                "Compare what you heard to the transcript.",
                "Repeat each sentence immediately after the speaker.",
                "Find a YouTube video labeled 'Langzaam Nederlands' and transcribe the first 30 seconds.",
                "Slow down a Dutch audio to 0.75x speed and write down every word you hear."

              ]
            },
            examples: [
              { dutch: "Mijn naam is...", guide: "mayn nahm is (slow, clear)", meaning: "My name is..." },
              { dutch: "Ik woon in...", guide: "ik wohn in (clear syllables)", meaning: "I live in..." },
              { dutch: "Het is vandaag mooi weer.", guide: "het is vahn-daakh moy wayr", meaning: "The weather is nice today." },
              { dutch: "Spreekt u een beetje Nederlands?", guide: "spraykt uw un bay-tje Nay-der-lahnts", meaning: "Do you speak a little Dutch?" },
              { dutch: "Kunt u dat herhalen?", guide: "kunt uw daht her-hah-len", meaning: "Can you repeat that?" },
              { dutch: "Kunt u langzamer spreken, alstublieft?", guide: "kunt uw lang-zah-mer spray-ken, al-stu-bleeft", meaning: "Can you speak more slowly, please?" },
              { dutch: "Ik ben aan het leren.", guide: "ik ben aan het lay-ren (slow, clear)", meaning: "I am learning." },
              { dutch: "Nederlands is een mooie taal.", guide: "Nay-der-lahnts is un moy-e taal", meaning: "Dutch is a beautiful language." },

            ]
          },
          {
            title: "Connected Speech",
            summary: "Learn how Dutch words link together in normal speech.",
            content: {
              objective: "Recognize how words change when spoken in natural connected speech.",
              sections: [
                {
                  heading: "Linking sounds",
                  body: "Dutch adds linking sounds between words that end and start with vowels: 'Zij is' becomes 'zij-is' with a linking y sound. 'Hoe is het?' flows together."
                },
                {
                  heading: "Words disappear",
                  body: "In fast speech, small words like 'er', 'te', and 'het' can reduce or disappear. 'Ik moet het doen' becomes 'Ik moet 't doen'. Listen for the reduced forms."
                },
                {
                  heading: "Consonant blends",
                  body: "The end of one word and start of the next combine: 'Wat zeg je?' becomes 'Wat zeg je?' with the t of 'wat' blending into 'zeg'. Final consonants carry over."
                }
              ],
              practice: [
                "Listen to a sentence in slow speech, then the same sentence at normal speed.",
                "Practice linking: 'Hoe is het?' — say it smoothly, not word by word.",
                "Identify where words blend in a Dutch dialogue.",
                "Record yourself saying a sentence slowly, then naturally.",
                "Take a sentence and practice saying it word by word, then linked together smoothly.",
                "Record 'Wat zeg je?' slowly (word by word) and then naturally (linked) — compare the difference."

              ]
            },
            examples: [
              { dutch: "Hoe is het?", guide: "hoo-is-het (linked)", meaning: "How are you?" },
              { dutch: "Wat zegt u?", guide: "wat-secht-u (blended)", meaning: "What do you say?" },
              { dutch: "Ik moet het doen.", guide: "ik moet 't doen", meaning: "I must do it." },
              { dutch: "Zij is er niet.", guide: "zay-is-er neet", meaning: "She is not there." },
              { dutch: "Dat is goed.", guide: "dat-s-khroot (blended)", meaning: "That is good." },
              { dutch: "Zeg het nog eens?", guide: "zekh-et nokh ayns (linked)", meaning: "Say it again?" },
              { dutch: "Waar ga je heen?", guide: "wahr-kha-yuh-hayn (linked)", meaning: "Where are you going?" },
              { dutch: "Ik weet het niet.", guide: "ik-wayt-et neet (linked)", meaning: "I don't know." },

            ]
          },
          {
            title: "Reduced Pronunciation",
            summary: "Learn common reductions in everyday Dutch speech.",
            content: {
              objective: "Understand common reduced forms that differ from written Dutch.",
              sections: [
                {
                  heading: "Common reductions",
                  body: "'Het' becomes ''t'. 'Ik' becomes 'k'. 'Even' becomes 'effe'. 'Niets' becomes 'niks'. 'Een' becomes 'n'. Learners who only study written Dutch are confused by these."
                },
                {
                  heading: "Verbs reduce too",
                  body: "'Heb je' becomes 'Hebbe'. 'Ben je' becomes 'Benne'. 'Moet je' becomes 'Moete'. The final -t disappears before je: 'Wat moet je?' sounds like 'Wat moe je?'"
                },
                {
                  heading: "Word-final dropping",
                  body: "Final -n in -en endings is often dropped: 'lopen' → 'lope'. Final -t before consonants: 'niet' → 'nie'. Final -d: 'goed' → 'goeie' or 'goe'."
                }
              ],
              practice: [
                "Listen for 'k' instead of 'ik', 't' instead of 'het' in natural speech.",
                "Practice saying: 'Moet je' as 'Moeje', 'Heb je' as 'Hejje'.",
                "Compare written Dutch with spoken reductions in a dialogue.",
                "Record yourself saying a sentence in full form, then reduced form.",
                "Take five full-form sentences and write their reduced spoken versions.",
                "Record yourself saying: 'Moet je naar huis?' first formally, then as 'Moeje naar huis?'"

              ]
            },
            examples: [
              { dutch: "'t is mooi.", guide: "t-is moy (reduced 'het')", meaning: "It is nice." },
              { dutch: "K weet 't niet.", guide: "k-wayt neet (reduced ik/het)", meaning: "I don't know." },
              { dutch: "Moet je gaan?", guide: "moe-je khahn (t dropped)", meaning: "Do you have to go?" },
              { dutch: "Effe wachten.", guide: "eh-feh wahch-ten (even → effe)", meaning: "Wait a moment." },
              { dutch: "Da's goed.", guide: "dahs khroot (dat is)", meaning: "That's good." },
              { dutch: "Weet je dat niet?", guide: "way-je daht neet (weet je reduced)", meaning: "Don't you know that?" },
              { dutch: "Ik heb geen idee.", guide: "k-hep khayn ie-day (ik reduced)", meaning: "I have no idea." },
              { dutch: "Hoe heet ie?", guide: "hoo hayt ie (hij reduced)", meaning: "What is his name?" },

            ]
          }
        ]
      },
      {
        title: "5.2 Spoken Dutch",
        description: "Learn the expressions and patterns of real spoken Dutch.",
        lessons: [
          {
            title: "Common Spoken Expressions",
            summary: "Learn expressions you will hear in everyday Dutch conversations.",
            content: {
              objective: "Recognize and use 10 common Dutch spoken expressions.",
              sections: [
                {
                  heading: "Reactions and fillers",
                  body: "Dutch speakers use many fillers: 'even' (just/a moment), 'gewoon' (just/simply), 'toch' (after all), 'maar' (but/just), 'even kijken' (let me see). These make speech flow naturally."
                },
                {
                  heading: "Agreement and disagreement",
                  body: "'Inderdaad' (indeed), 'Precies' (exactly), 'Zeker weten' (definitely), 'Nou, nee' (well, no), 'Eigenlijk niet' (actually not). These soften responses."
                },
                {
                  heading: "Common interjections",
                  body: "'Hè?' (huh?), 'Nou!' (well!), 'O ja' (oh right), 'Ach zo' (oh I see), 'Wat zeg je?' (what do you say?). These keep conversations flowing."
                }
              ],
              practice: [
                "Listen for 'even', 'gewoon', 'toch' in a Dutch conversation.",
                "Practice using fillers in your own speech.",
                "Learn three ways to agree and three ways to disagree politely.",
                "Practice the interjections until they feel natural.",
                "Listen to a Dutch conversation and tally how many times 'even', 'gewoon', 'toch' are used.",
                "Practice reacting to statements using 'Inderdaad!', 'Precies!', 'Echt waar?' in a natural way."

              ]
            },
            examples: [
              { dutch: "Even kijken.", guide: "ay-ven kay-ken", meaning: "Let me see." },
              { dutch: "Dat is gewoon leuk.", guide: "daht is khe-wohn luhk", meaning: "That is just fun." },
              { dutch: "Inderdaad!", guide: "in-der-daht", meaning: "Indeed!" },
              { dutch: "Nou, weet je...", guide: "now, wayt yuh", meaning: "Well, you know..." },
              { dutch: "Ach zo, ik begrijp het.", guide: "akh zoh, ik be-khrayp het", meaning: "Oh I see, I understand." },
              { dutch: "Echt waar? Dat wist ik niet.", guide: "ekht wahr? daht wist ik neet", meaning: "Really? I did not know that." },
              { dutch: "Nou, mooi zo!", guide: "now, moy zoh", meaning: "Well, that's nice!" },
              { dutch: "Zeker weten!", guide: "zay-ker way-ten", meaning: "Definitely!" },

            ]
          },
          {
            title: "Fillers and Reactions",
            summary: "Use Dutch fillers to sound more natural in conversation.",
            content: {
              objective: "Use Dutch fillers and reaction words to participate in conversations naturally.",
              sections: [
                {
                  heading: "Buying thinking time",
                  body: "Use fillers to pause while thinking: 'Even denken...' (let me think), 'Laat me even nadenken' (let me think about it), 'Hoe zeg je dat?' (how do you say that?)."
                },
                {
                  heading: "Showing you are listening",
                  body: "Dutch listeners show engagement: 'Ja', 'Oh?', 'Echt?', 'Hmm', 'Wat interessant'. These short words tell the speaker you are following."
                },
                {
                  heading: "Asking for repetition",
                  body: "'Wat zei je?' (What did you say?), 'Kun je dat herhalen?' (Can you repeat that?), 'Zeg dat nog eens?' (Say that again?). Use these instead of pretending to understand."
                }
              ],
              practice: [
                "Practice thinking fillers: 'Even denken...', 'Laat me even zien...'",
                "Practice listening reactions: 'Oh? Echt? Wat interessant!'",
                "Role-play a conversation where you need to ask for repetition.",
                "Count how many fillers Dutch speakers use in a 1-minute clip.",
                "Practice a 1-minute monologue using at least three different thinking fillers.",
                "React to five different statements using appropriate Dutch reaction words."

              ]
            },
            examples: [
              { dutch: "Even denken...", guide: "ay-ven den-ken", meaning: "Let me think..." },
              { dutch: "Oh, echt?", guide: "oh, ekht", meaning: "Oh, really?" },
              { dutch: "Wat interessant!", guide: "wat in-te-re-sant", meaning: "How interesting!" },
              { dutch: "Hoe zeg je dat in het Nederlands?", guide: "hoo zeh yuh daht in het Nay-der-lahnts", meaning: "How do you say that in Dutch?" },
              { dutch: "Kun je dat herhalen?", guide: "kun yuh daht her-hah-len", meaning: "Can you repeat that?" },
              { dutch: "Wat zeg je nou?", guide: "wat zekh yuh now", meaning: "What did you just say?" },
              { dutch: "Hmm, interessant...", guide: "hmm, in-te-re-sant", meaning: "Hmm, interesting..." },
              { dutch: "O ja, natuurlijk!", guide: "oh yah, na-tuur-lek", meaning: "Oh yes, of course!" },

            ]
          },
          {
            title: "Formal vs Informal Speech",
            summary: "Know when to use formal and informal Dutch.",
            content: {
              objective: "Switch appropriately between formal 'u' and informal 'jij' in conversation.",
              sections: [
                {
                  heading: "When to use u (formal)",
                  body: "Use 'u' for strangers, older people, authority figures (police, doctors), in shops/restaurants, and in professional settings. When in doubt, start with 'u'."
                },
                {
                  heading: "When to use jij (informal)",
                  body: "Use 'jij/je' with friends, family, colleagues of equal level, children, and in casual social settings. The Dutch will tell you when to switch: 'Zeg maar jij' (just say jij)."
                },
                {
                  heading: "Other formal/informal differences",
                  body: "Formal: 'Uw' (your), 'Meneer/Mevrouw' (sir/madam), 'Alstublieft' (please). Informal: 'Je' (your), 'Jouw' (your), 'Alsjeblieft' (please). Verb forms also change slightly."
                }
              ],
              practice: [
                "Practice the same request in formal and informal Dutch.",
                "Listen for when people switch from u to jij in conversations.",
                "Role-play: talk to a doctor (formal) then a friend (informal).",
                "Learn to say 'Zeg maar jij' so others can invite you to be informal.",
                "Write the same request (ask for directions) in three registers: formal, neutral, informal.",
                "Practice switching: answer a question with 'u', then be invited to use 'jij'."

              ]
            },
            examples: [
              { dutch: "Hoe heet u?", guide: "hoo hayt uw", meaning: "What is your name? (formal)" },
              { dutch: "Hoe heet jij?", guide: "hoo hayt yay", meaning: "What is your name? (informal)" },
              { dutch: "Alstublieft.", guide: "al-stu-bleeft", meaning: "Please / Here you are (formal)" },
              { dutch: "Alsjeblieft.", guide: "al-shuh-bleeft", meaning: "Please / Here you are (informal)" },
              { dutch: "Zeg maar jij.", guide: "zekh mahr yay", meaning: "Just call me jij (you informal)." },
              { dutch: "Kan ik u helpen, mevrouw?", guide: "kan ik uw hel-pen, me-vrow", meaning: "Can I help you, ma'am? (formal)" },
              { dutch: "Kan ik je helpen?", guide: "kan ik yuh hel-pen", meaning: "Can I help you? (informal)" },
              { dutch: "Doe maar gewoon je jas uit.", guide: "doo mahr khe-wohn yuh jas oyt", meaning: "Just take off your coat (informal)." },

            ]
          }
        ]
      },
      {
        title: "5.3 Listening Practice",
        description: "Practice listening with structured exercises.",
        lessons: [
          {
            title: "Short Clips and Dictation",
            summary: "Improve listening accuracy with short clips and dictation.",
            content: {
              objective: "Write down a short Dutch audio clip with 80% accuracy.",
              sections: [
                {
                  heading: "Dictation method",
                  body: "Listen to a 10-second clip. Write what you hear. Listen again and fill gaps. Listen a third time and correct. Compare to the transcript. This is the best listening exercise."
                },
                {
                  heading: "Start with known content",
                  body: "Dictate sentences you already understand. The goal is connecting sounds to spelling, not learning new words. Use sentences from your current phase."
                },
                {
                  heading: "Gradually increase difficulty",
                  body: "Start with slow, single sentences. Progress to two sentences, then short paragraphs. Finally, move to natural-speed clips. Always use the three-listen method."
                }
              ],
              practice: [
                "Find a 5-second Dutch clip and write what you hear.",
                "Do the three-listen dictation method with a new sentence.",
                "Check your accuracy — what did you miss and why?",
                "Repeat the same clip until you get 100% accuracy.",
                "Use the dictation method on a 15-second news clip — three listens, then check transcript.",
                "Create your own dictation exercise: record yourself reading a Dutch sentence, then transcribe it later."

              ]
            },
            examples: [
              { dutch: "De zon schijnt vandaag.", guide: "de zon skhaynt vahn-daakh", meaning: "The sun is shining today." },
              { dutch: "Ik ga naar de markt.", guide: "ik khah naar de markt", meaning: "I am going to the market." },
              { dutch: "Hij heeft een nieuwe fiets.", guide: "hay hayft un nee-uwe feets", meaning: "He has a new bicycle." },
              { dutch: "Wij eten om zes uur.", guide: "vay ay-ten om zes uur", meaning: "We eat at six o'clock." },
              { dutch: "Zij woont al tien jaar in Den Haag.", guide: "zay wohnt al teen yaar in Den Hahkh", meaning: "She has lived in The Hague for ten years." },
              { dutch: "Hij is naar de markt geweest.", guide: "hay is naar de markt khe-wayst", meaning: "He has been to the market." },
              { dutch: "Zij heeft een nieuwe jas gekocht.", guide: "zay hayft un nee-uwe yas khe-kokht", meaning: "She bought a new coat." },
              { dutch: "Wij gaan vanavond uit eten.", guide: "vay khahn vah-nah-vont oyt ay-ten", meaning: "We are going out for dinner tonight." },

            ]
          },
          {
            title: "Dialogues",
            summary: "Understand short dialogues between two speakers.",
            content: {
              objective: "Follow a short dialogue between two Dutch speakers and answer questions about it.",
              sections: [
                {
                  heading: "Listen for context first",
                  body: "Before understanding every word, identify: who is speaking, where they are, and what they want. Context carries meaning."
                },
                {
                  heading: "Listen for known words",
                  body: "Pick out the words you know. Even if you miss many, the known words will give you the topic. Names, numbers, and question words are anchors."
                },
                {
                  heading: "Listen multiple times",
                  body: "First listen: get the topic. Second listen: catch more words. Third listen: understand the exchange. Fourth listen: shadow each speaker."
                }
              ],
              practice: [
                "Listen to a 30-second dialogue and identify who and where.",
                "Listen again and write down all the words you understand.",
                "Listen a third time and try to understand the full exchange.",
                "Shadow (repeat) each speaker's lines immediately after hearing them.",
                "Listen to a dialogue three times: first for context, second for words, third for full meaning.",
                "Write your own short dialogue (8-10 lines) on a topic of your choice."

              ]
            },
            examples: [
              { dutch: "Hallo, kan ik u helpen?", guide: "hah-loh, kan ik uw hel-pen", meaning: "Hello, can I help you?" },
              { dutch: "Ja, ik zoek een boek over Amsterdam.", guide: "yah, ik zook un book oh-ver Am-ster-dam", meaning: "Yes, I am looking for a book about Amsterdam." },
              { dutch: "Die staat in de hoek bij de kassa.", guide: "dee staht in de hook bij de kah-sah", meaning: "That one is in the corner by the checkout." },
              { dutch: "Dank u wel!", guide: "dank uw wel", meaning: "Thank you very much!" },
              { dutch: "Graag gedaan.", guide: "khrahkh khe-dahn", meaning: "You are welcome." },
              { dutch: "Ik zoek een cadeau voor mijn vriendin.", guide: "ik zook un kah-dow vor mayn vreen-din", meaning: "I am looking for a gift for my girlfriend." },
              { dutch: "Wat voor iets zoekt u?", guide: "wat vor eets zookt uw", meaning: "What kind of thing are you looking for?" },
              { dutch: "Iets kleins en persoonlijks.", guide: "eets klayns en per-sohn-leks", meaning: "Something small and personal." },

            ]
          },
          {
            title: "Shadowing Basics",
            summary: "Repeat after native speakers to improve listening and pronunciation together.",
            content: {
              objective: "Shadow a short Dutch audio clip with correct timing and intonation.",
              sections: [
                {
                  heading: "What is shadowing?",
                  body: "Shadowing means repeating immediately after hearing, like an echo. You match the speaker's speed, intonation, and rhythm. This trains your ear and mouth simultaneously."
                },
                {
                  heading: "Start with slow shadowing",
                  body: "Use audio that is slightly slower than natural speed. Pause after each phrase and repeat. Focus on matching the intonation, not just the words."
                },
                {
                  heading: "Progress to simultaneous",
                  body: "Gradually reduce the gap between hearing and speaking until you are speaking at the same time as the audio. This builds automaticity."
                }
              ],
              practice: [
                "Take one sentence and shadow it 5 times.",
                "Focus on intonation — does your voice rise and fall like the speaker's?",
                "Shadow a 30-second audio clip without pausing.",
                "Record your shadowing and compare with the original.",
                "Shadow a 15-second audio clip: first phrase by phrase, then continuously.",
                "Record your shadowing and compare your intonation to the original — mark where you differ."

              ]
            },
            examples: [
              { dutch: "Hoe gaat het met jou?", guide: "hoo khaht het met yow (rising intonation)", meaning: "How are you?" },
              { dutch: "Het gaat goed, dank je.", guide: "het khaht khroot, dank yuh", meaning: "I am fine, thanks." },
              { dutch: "Wat ga je doen vandaag?", guide: "wat khah yuh doen vahn-daakh", meaning: "What are you doing today?" },
              { dutch: "Ik ga naar de film.", guide: "ik khah naar de film", meaning: "I am going to the movies." },
              { dutch: "Veel plezier!", guide: "vayl ple-zeer", meaning: "Have fun!" },
              { dutch: "Ik vind het leuk om Nederlands te leren.", guide: "ik vint het luhk om Nay-der-lahnts te lay-ren", meaning: "I enjoy learning Dutch." },
              { dutch: "Hoe meer je oefent, hoe beter het gaat.", guide: "hoo mayr yuh oo-fent, hoo bay-ter het khaht", meaning: "The more you practice, the better it goes." },
              { dutch: "Blijf gemotiveerd en geef niet op!", guide: "blayf khe-moh-tee-veert en khayf neet op", meaning: "Stay motivated and do not give up!" },

            ]
          }
        ]
      },

      // ============================================================
      // PHASE 6: Functional Vocabulary
      // ============================================================
      {
        title: "6.1 Home and Daily Life",
        description: "Build vocabulary for your home and daily routines.",
        lessons: [
          {
            title: "Home and Household Items",
            summary: "Learn the Dutch names for rooms, furniture, and household objects.",
            content: {
              objective: "Name 30 common household items and rooms in Dutch.",
              sections: [
                {
                  heading: "Rooms of the house",
                  body: "De keuken (kitchen), de woonkamer (living room), de slaapkamer (bedroom), de badkamer (bathroom), de gang (hallway), de tuin (garden). Each room has its own vocabulary set."
                },
                {
                  heading: "Furniture and appliances",
                  body: "De tafel (table), de stoel (chair), het bed (bed), de koelkast (refrigerator), de oven (oven), de wasmachine (washing machine). Know the de/het genders."
                },
                {
                  heading: "Small household objects",
                  body: "Het bestek (cutlery), de sleutel (key), de lamp (lamp), de handdoek (towel), het glas (glass), de vaas (vase). Practice these in context, not as isolated lists."
                }
              ],
              practice: [
                "Label five rooms in your home with Dutch name cards.",
                "Describe your living room: 'In de woonkamer staat een tafel en een stoel.'",
                "Make a flashcard deck of 20 household items with de/het.",
                "Write a short paragraph describing your dream house in Dutch.",
                "Take a photo of each room in your home and label 10 items in each in Dutch.",
                "Describe your dream home: 'Mijn droomhuis heeft een grote keuken en een mooie tuin.'"

              ]
            },
            examples: [
              { dutch: "de keuken", guide: "de kuh-ken", meaning: "the kitchen" },
              { dutch: "het bed", guide: "het bed", meaning: "the bed" },
              { dutch: "de koelkast", guide: "de kool-kast", meaning: "the refrigerator" },
              { dutch: "de handdoek", guide: "de hand-dook", meaning: "the towel" },
              { dutch: "Het bestek ligt in de la.", guide: "het be-stek likht in de lah", meaning: "The cutlery is in the drawer." },
              { dutch: "de wastafel", guide: "de was-tah-fel", meaning: "the sink" },
              { dutch: "het fornuis", guide: "het for-nuis", meaning: "the stove" },
              { dutch: "de stofzuiger", guide: "de stof-zu-ger", meaning: "the vacuum cleaner" },

            ]
          },
          {
            title: "Daily Routines",
            summary: "Talk about your daily activities from morning to night.",
            content: {
              objective: "Describe your daily routine using 15 common daily activity verbs.",
              sections: [
                {
                  heading: "Morning routine",
                  body: "Word wakker (wake up), sta op (get up), poets mijn tanden (brush my teeth), kleed me aan (get dressed), eet ontbijt (eat breakfast). Use reflexive verbs for personal care."
                },
                {
                  heading: "During the day",
                  body: "Ga naar werk/school (go to work/school), lunch (have lunch), werk/leer (work/study), kom thuis (come home). Time words help: 's ochtends (in the morning), 's middags (in the afternoon)."
                },
                {
                  heading: "Evening routine",
                  body: "Maak eten (prepare food), eet avondeten (eat dinner), kijk tv (watch TV), lees een boek (read a book), ga naar bed (go to bed). Learn the order for storytelling."
                }
              ],
              practice: [
                "Write your daily routine in Dutch from wake-up to bedtime.",
                "Practice sentence order: 'Ik word wakker om zeven uur.'",
                "Learn the time-of-day words: 's ochtends, 's middags, 's avonds, 's nachts.",
                "Record yourself describing your day and listen for errors.",
                "Write your complete daily routine in Dutch from wake-up to bedtime (minimum 10 steps).",
                "Practice reflexive verbs: 'Ik was me, jij wast je, hij wast zich' for three verbs."

              ]
            },
            examples: [
              { dutch: "Ik word om zeven uur wakker.", guide: "ik wort om zay-ven uur wah-ker", meaning: "I wake up at seven o'clock." },
              { dutch: "Ik poets mijn tanden.", guide: "ik poots mayn tahn-den", meaning: "I brush my teeth." },
              { dutch: "Hij gaat naar zijn werk.", guide: "hay khaht naar zayn werk", meaning: "He goes to his work." },
              { dutch: "Wij eten avondeten om half zeven.", guide: "vay ay-ten ah-vont-ay-ten om half zay-ven", meaning: "We eat dinner at 6:30." },
              { dutch: "Ik ga naar bed om tien uur.", guide: "ik khah naar bet om teen uur", meaning: "I go to bed at ten o'clock." },
              { dutch: "Ik kleed me aan om acht uur.", guide: "ik klect me ahn om akht uur", meaning: "I get dressed at eight o'clock." },
              { dutch: "Hij scheert zich elke ochtend.", guide: "hay skhayrt zikh el-ke okh-tent", meaning: "He shaves every morning." },
              { dutch: "Wij kijken tv na het avondeten.", guide: "vay kay-ken tay-vay na het ah-vont-ay-ten", meaning: "We watch TV after dinner." },

            ]
          },
          {
            title: "Food and Drinks",
            summary: "Expand your food and drink vocabulary.",
            content: {
              objective: "Name 30 foods and drinks and form sentences about eating and drinking.",
              sections: [
                {
                  heading: "Common foods",
                  body: "Het brood (bread), de kaas (cheese), het vlees (meat), de kip (chicken), de vis (fish), de groente (vegetables), het fruit (fruit), de rijst (rice), de aardappel (potato)."
                },
                {
                  heading: "Drinks",
                  body: "Het water (water), de koffie (coffee), de thee (tea), het sap (juice), de melk (milk), het bier (beer), de wijn (wine). 'Ik drink graag...' (I like to drink...)."
                },
                {
                  heading: "Describing food",
                  body: "Het is lekker (it is tasty), het is zout (salty), het is zoet (sweet), het is pittig (spicy), het is vers (fresh). 'Dit smaakt goed' (this tastes good)."
                }
              ],
              practice: [
                "Write your weekly shopping list in Dutch.",
                "Describe your favorite meal: 'Mijn favoriete maaltijd is...'",
                "Learn 10 adjectives for describing food taste.",
                "Practice ordering: 'Ik wil graag...' for foods and drinks.",
                "Describe your favorite three dishes in Dutch with ingredients and preparation.",
                "Practice ordering breakfast, lunch, and dinner in a restaurant — three different scenarios."

              ]
            },
            examples: [
              { dutch: "Ik eet graag kaas.", guide: "ik ayt khrahkh kahs", meaning: "I like to eat cheese." },
              { dutch: "Zij drinkt elke dag koffie.", guide: "zay drinkt el-ke dahk koh-fee", meaning: "She drinks coffee every day." },
              { dutch: "Het brood is vers.", guide: "het broht is fers", meaning: "The bread is fresh." },
              { dutch: "Dit is erg lekker!", guide: "dit is erkh leh-ker", meaning: "This is very tasty!" },
              { dutch: "Ik hou niet van vis.", guide: "ik hou neet van vis", meaning: "I do not like fish." },
              { dutch: "Ik lust geen spruitjes.", guide: "ik lust khayn spruyt-jes", meaning: "I do not like Brussels sprouts." },
              { dutch: "Dit gerecht is typisch Nederlands.", guide: "dit khe-rekht is tee-pish Nay-der-lahnts", meaning: "This dish is typically Dutch." },
              { dutch: "Mag ik een glas rode wijn?", guide: "makh ik un khlahs roh-de wyn", meaning: "May I have a glass of red wine?" },

            ]
          }
        ]
      },
      {
        title: "6.2 Work and Technology",
        description: "Learn vocabulary for professional and digital life.",
        lessons: [
          {
            title: "Work and Office",
            summary: "Learn vocabulary for jobs, workplaces, and office items.",
            content: {
            objective: "Name 20 common professions and describe your work or study in simple terms.",
              sections: [
                {
                  heading: "Professions",
                  body: "De leraar (teacher), de dokter (doctor), de ingenieur (engineer), de student (student), de manager (manager), de schrijver (writer). For women: lerares, dokteres, etc."
                },
                {
                  heading: "Office vocabulary",
                  body: "Het bureau (desk), de computer (computer), het papier (paper), de telefoon (telephone), de vergadering (meeting), het project (project). Combine with action verbs."
                },
                {
                  heading: "Talking about your work",
                  body: "'Ik werk als...' (I work as...), 'Ik studeer...' (I study...), 'Ik ben...' (I am...). 'Waar werk je?' (Where do you work?). 'Bij welk bedrijf?' (At which company?)."
                }
              ],
              practice: [
                "Tell someone what you do: 'Ik ben... / Ik werk als...'",
                "Describe your workspace in Dutch using five location sentences.",
                "Learn 10 job titles and practice saying what each person does.",
                "Write a short introduction about your professional background.",
                "Describe your ideal job in Dutch, including responsibilities and work environment.",
                "Practice the question chain: 'Wat doe je?', 'Waar werk je?', 'Hoe lang al?', 'Vind je het leuk?'"

              ]
            },
            examples: [
              { dutch: "Ik werk als leraar.", guide: "ik werk als le-rahr", meaning: "I work as a teacher." },
              { dutch: "Zij is dokter in het ziekenhuis.", guide: "zay is dok-ter in het zee-ken-huis", meaning: "She is a doctor in the hospital." },
              { dutch: "Ik heb een vergadering om drie uur.", guide: "ik hep un fer-khah-de-ring om dree uur", meaning: "I have a meeting at three o'clock." },
              { dutch: "Mijn bureau staat bij het raam.", guide: "mayn bu-roh staht bij het rahm", meaning: "My desk is by the window." },
              { dutch: "Waar werk jij?", guide: "wahr werk yay", meaning: "Where do you work?" },
              { dutch: "Ik ben projectmanager bij een groot bedrijf.", guide: "ik ben proh-jekt-mah-nah-jer bij un khroht be-drayf", meaning: "I am a project manager at a large company." },
              { dutch: "Mijn collega's zijn erg vriendelijk.", guide: "mayn ko-lay-khahs zayn erkh vreen-de-lek", meaning: "My colleagues are very friendly." },
              { dutch: "We hebben elke maandag een teamoverleg.", guide: "we hey-ben el-ke maan-dakh un taym-oh-ver-lekh", meaning: "We have a team meeting every Monday." },

            ]
          },
          {
            title: "Technology and Digital",
            summary: "Learn vocabulary for computers, phones, and the internet.",
            content: {
              objective: "Talk about technology use with 15 common tech-related words.",
              sections: [
                {
                  heading: "Devices",
                  body: "De computer/laptop, de telefoon/mobiel, de tablet, het scherm (screen), het toetsenbord (keyboard), de muis (mouse), de oplader (charger)."
                },
                {
                  heading: "Digital actions",
                  body: "Downloaden (to download), uploaden (to upload), opslaan (to save), printen (to print), scrollen (to scroll), inloggen (to log in), uitloggen (to log out). Many tech verbs are English-based."
                },
                {
                  heading: "Internet and apps",
                  body: "Het internet, de website, de app, het wachtwoord (password), de e-mail, het bericht (message), de verbinding (connection). 'Het wifi-wachtwoord, alstublieft?' (The wifi password, please?)."
                }
              ],
              practice: [
                "Change your phone language to Dutch for one day.",
                "Describe how to do a simple task on a computer in Dutch.",
                "Learn tech verbs and their past tense forms.",
                "Role-play: ask for help with a computer problem in Dutch.",
                "Describe step by step how to send an email in Dutch.",
                "Translate the settings menu of your favorite app into Dutch."

              ]
            },
            examples: [
              { dutch: "Mijn telefoon is leeg.", guide: "mayn te-le-fohn is laykh", meaning: "My phone is dead." },
              { dutch: "Kun je mij helpen met de computer?", guide: "kun yuh may hel-pen met de kom-pyoo-ter", meaning: "Can you help me with the computer?" },
              { dutch: "Ik moet dit bestand opslaan.", guide: "ik moet dit be-stant op-slahn", meaning: "I need to save this file." },
              { dutch: "Het wachtwoord is niet juist.", guide: "het wahcht-wohrt is neet juist", meaning: "The password is incorrect." },
              { dutch: "De verbinding is slecht.", guide: "de fer-bin-ding is slekht", meaning: "The connection is bad." },
              { dutch: "Ik heb een nieuw wachtwoord nodig.", guide: "ik hep un nee-uw wahcht-wohrt noh-dikh", meaning: "I need a new password." },
              { dutch: "De batterij van mijn laptop is bijna leeg.", guide: "de ba-te-ray vahn mayn lep-top is bay-nah laykh", meaning: "My laptop battery is almost dead." },
              { dutch: "Kun je het bestand als PDF opslaan?", guide: "kun yuh het be-stant als PDF op-slahn", meaning: "Can you save the file as a PDF?" },

            ]
          },
          {
            title: "Communication",
            summary: "Learn vocabulary for phone calls, emails, and messaging.",
            content: {
              objective: "Make a simple phone call and write a basic email in Dutch.",
              sections: [
                {
                  heading: "Phone calls",
                  body: "'Met [naam]' (this is [name] — answering phone), 'Wie is er aan de lijn?' (Who is on the line?), 'Ik bel later terug' (I will call back later). Keep it simple."
                },
                {
                  heading: "Email basics",
                  body: "'Beste...' (Dear...), 'Met vriendelijke groet' (Sincerely), 'Ik schrijf u over...' (I am writing to you about...). Formal emails use 'u', informal use 'je'."
                },
                {
                  heading: "Messaging",
                  body: "Dutch messaging is casual: 'Hey! Wat doe je?' (Hey! What are you doing?), 'Kom je ook?' (Are you coming too?), 'Later!' (Later!). Acronyms: 'ff' (even), 'mss' (misschien)."
                }
              ],
              practice: [
                "Write a short email to a teacher or colleague in Dutch.",
                "Practice answering the phone: 'Met [jouw naam].'",
                "Send a message to a language partner in Dutch.",
                "Role-play: call a restaurant to make a reservation.",
                "Write a formal email to request information about a Dutch course.",
                "Practice leaving a voicemail message in Dutch: state your name, purpose, and callback number."

              ]
            },
            examples: [
              { dutch: "Met Claire.", guide: "met Claire", meaning: "Claire speaking." },
              { dutch: "Ik bel later terug.", guide: "ik bel lah-ter te-ruk", meaning: "I will call back later." },
              { dutch: "Beste meneer Jansen, ...", guide: "bes-te me-nayr Yahn-sen", meaning: "Dear Mr. Jansen, ..." },
              { dutch: "Met vriendelijke groet,", guide: "met vreen-de-le-ke khroot", meaning: "Sincerely," },
              { dutch: "Hey! Wat ga je doen vanavond?", guide: "hay! wat khah yuh doen vah-nah-vont", meaning: "Hey! What are you doing tonight?" },
              { dutch: "Ik probeer u te bereiken over een factuur.", guide: "ik pro-bayr uw te be-ray-ken oh-ver un fak-tuur", meaning: "I am trying to reach you about an invoice." },
              { dutch: "Kunt u mij terugbellen op 06-12345678?", guide: "kunt uw may te-ruk-be-len op 06-12345678", meaning: "Can you call me back at 06-12345678?" },
              { dutch: "Ik stuur u een e-mail met de details.", guide: "ik stuur uw un ee-mayl met de day-tahls", meaning: "I will send you an email with the details." },

            ]
          }
        ]
      },
      {
        title: "6.3 Health, Education, Travel",
        description: "Build vocabulary for important life domains.",
        lessons: [
          {
            title: "Health and Body",
            summary: "Learn body parts, health terms, and how to describe symptoms.",
            content: {
              objective: "Describe common symptoms and body parts to a doctor in Dutch.",
              sections: [
                {
                  heading: "Body parts",
                  body: "Het hoofd (head), de arm (arm), het been (leg), de hand (hand), de voet (foot), de rug (back), de maag (stomach). Use 'mijn' (my) + body part for descriptions."
                },
                {
                  heading: "Symptoms",
                  body: "'Ik heb pijn aan mijn...' (I have pain in my...), 'Ik heb hoofdpijn' (headache), 'Ik ben verkouden' (I have a cold), 'Ik heb koorts' (I have a fever), 'Het doet pijn' (it hurts)."
                },
                {
                  heading: "At the pharmacy",
                  body: "'Heeft u iets tegen hoofdpijn?' (Do you have something for headache?), 'Ik zoek een pleister' (I am looking for a band-aid), 'Is dit op recept?' (Is this prescription?)."
                }
              ],
              practice: [
                "Label a diagram of the human body with Dutch words.",
                "Describe three symptoms you might tell a doctor.",
                "Role-play: visit the pharmacy and ask for medicine.",
                "Learn five common medicine-related words: pil, zalf, pleister, etc.",
                "Label a diagram of the human body with 15 Dutch words.",
                "Role-play a full doctor's visit: describe symptoms, answer questions, get a prescription."

              ]
            },
            examples: [
              { dutch: "Ik heb hoofdpijn.", guide: "ik hep hohf-payn", meaning: "I have a headache." },
              { dutch: "Het doet pijn aan mijn been.", guide: "het doot payn aan mayn bayn", meaning: "My leg hurts." },
              { dutch: "Ik ben verkouden.", guide: "ik ben fer-kou-den", meaning: "I have a cold." },
              { dutch: "Heeft u iets tegen koorts?", guide: "hayft uw eets tay-khen kohrts", meaning: "Do you have something for fever?" },
              { dutch: "Ik moet rusten.", guide: "ik moet rus-ten", meaning: "I need to rest." },
              { dutch: "Ik heb pijn in mijn schouder.", guide: "ik hep payn in mayn skhou-der", meaning: "I have pain in my shoulder." },
              { dutch: "Ik ben misselijk.", guide: "ik ben mi-se-lek", meaning: "I feel nauseous." },
              { dutch: "Heeft u dit medicijn op recept?", guide: "hayft uw dit may-dee-sayn op ray-sept", meaning: "Is this medication on prescription?" },

            ]
          },
          {
            title: "Education and Learning",
            summary: "Talk about studying, school subjects, and learning Dutch.",
            content: {
              objective: "Discuss your learning journey and educational background in Dutch.",
              sections: [
                {
                  heading: "School subjects",
                  body: "De taal (language), de geschiedenis (history), de wiskunde (math), de natuurwetenschap (science), de kunst (art), de muziek (music). 'Ik studeer...' (I study...)."
                },
                {
                  heading: "Learning Dutch",
                  body: "'Ik leer Nederlands' (I learn Dutch), 'Ik oefen de uitspraak' (I practice pronunciation), 'Ik begrijp het' (I understand), 'Ik snap het niet' (I don't get it)."
                },
                {
                  heading: "Study tools",
                  body: "Het boek (book), de cursus (course), het woordenboek (dictionary), de app (app), de oefening (exercise), de les (lesson). 'Ik heb een vraag' (I have a question)."
                }
              ],
              practice: [
                "Tell someone about your experience learning Dutch.",
                "Describe your study routine: how often, where, and what you practice.",
                "Learn the question: 'Hoe lang leer je al Nederlands?'",
                "Write three sentences about your education background.",
                "Write a short paragraph about why you are learning Dutch and your goals.",
                "Practice asking your teacher: 'Kunt u dit uitleggen?' 'Hoe spreek je dit woord uit?'"

              ]
            },
            examples: [
              { dutch: "Ik leer al drie maanden Nederlands.", guide: "ik layr al dree maahn-den Nay-der-lahnts", meaning: "I have been learning Dutch for three months." },
              { dutch: "Ik snap het niet.", guide: "ik snap het neet", meaning: "I don't understand." },
              { dutch: "Kun je dat uitleggen?", guide: "kun yuh daht oyt-le-khen", meaning: "Can you explain that?" },
              { dutch: "Ik oefen elke dag de uitspraak.", guide: "ik oo-fen el-ke dahk de oyt-spraak", meaning: "I practice pronunciation every day." },
              { dutch: "Heb je een woordenboek voor mij?", guide: "hep yuh un wohr-den-book vor may", meaning: "Do you have a dictionary for me?" },
              { dutch: "Ik volg een online cursus Nederlands.", guide: "ik volk un on-layn kur-sus Nay-der-lahnts", meaning: "I am taking an online Dutch course." },
              { dutch: "De uitspraak van het Nederlands vind ik moeilijk.", guide: "de oyt-spraak van het Nay-der-lahnts vint ik moy-lek", meaning: "I find Dutch pronunciation difficult." },
              { dutch: "Elke dag leer ik vijf nieuwe woorden.", guide: "el-ke dahk layr ik vayf nee-uwe wohr-den", meaning: "Every day I learn five new words." },

            ]
          },
          {
            title: "Travel and Transport",
            summary: "Build vocabulary for traveling in Dutch-speaking countries.",
            content: {
              objective: "Handle travel situations: hotel, airport, and sightseeing in Dutch.",
              sections: [
                {
                  heading: "At the hotel",
                  body: "'Ik heb een reservering' (I have a reservation), 'Heeft u een kamer vrij?' (Do you have a room available?), 'Voor één nacht' (for one night), 'Hoeveel kost het per nacht?' (How much per night?)."
                },
                {
                  heading: "At the airport",
                  body: "De vlucht (flight), de incheckbalie (check-in desk), de gate, het boarden (boarding), de bagage (luggage), de paspoortcontrole (passport control). 'Waar is gate B3?' (Where is gate B3?)."
                },
                {
                  heading: "Sightseeing",
                  body: "Het museum (museum), het park (park), het plein (square), het stadhuis (city hall), de kerk (church), de brug (bridge). 'Wat is er te zien?' (What is there to see?)."
                }
              ],
              practice: [
                "Role-play: check into a hotel in Dutch.",
                "Practice airport vocabulary: 'Waar is de bagageband?'",
                "Describe a tourist attraction in your city in Dutch.",
                "Plan a day trip and describe what you will do and see.",
                "Plan a weekend trip to Amsterdam in Dutch: hotel, transport, activities.",
                "Role-play: check into a hotel, ask about breakfast times and checkout."

              ]
            },
            examples: [
              { dutch: "Ik heb een reservering voor twee nachten.", guide: "ik hep un ray-zer-ve-ring vor tvey nach-ten", meaning: "I have a reservation for two nights." },
              { dutch: "Waar is de bagageband?", guide: "wahr is de bah-khah-zhe-bant", meaning: "Where is the baggage claim?" },
              { dutch: "Hoeveel kost een kaartje voor het museum?", guide: "hoo-vayl kost un kaart-je vor het mu-zay-um", meaning: "How much is a ticket for the museum?" },
              { dutch: "Is het ver van het centrum?", guide: "is het fer van het sen-trum", meaning: "Is it far from the center?" },
              { dutch: "Kunt u een foto van ons maken?", guide: "kunt uw un foh-toh van ons mah-ken", meaning: "Can you take a photo of us?" },
              { dutch: "Hoe laat is het ontbijt?", guide: "hoo laht is het ont-bayt", meaning: "What time is breakfast?" },
              { dutch: "Heeft u een kamer met uitzicht op zee?", guide: "hayft uw un kah-mer met oyt-zikht op zay", meaning: "Do you have a room with a sea view?" },
              { dutch: "Kan ik hier een fiets huren?", guide: "kan ik heer un feets hu-ren", meaning: "Can I rent a bike here?" },

            ]
          }
        ]
      },
      {
        title: "6.4 Relationships and Finance",
        description: "Vocabulary for social life, emotions, and money.",
        lessons: [
          {
            title: "Relationships and Social Life",
            summary: "Talk about friends, relationships, and social activities.",
            content: {
              objective: "Describe your relationships and make social plans in Dutch.",
              sections: [
                {
                  heading: "Relationships",
                  body: "De vriend/vriendin (friend), de partner, de man/vrouw (husband/wife), de kennis (acquaintance), de collega (colleague). 'We zijn al tien jaar samen' (We have been together for ten years)."
                },
                {
                  heading: "Making plans",
                  body: "'Heb je zin om...?' (Do you feel like...?), 'Zullen we...?' (Shall we...?), 'Ik heb geen tijd' (I have no time), 'Afgesproken!' (Deal/Agreed!)."
                },
                {
                  heading: "Social activities",
                  body: "Uit eten gaan (eat out), een drankje doen (have a drink), wandelen (walk), een feestje (party), naar de film (to the movies), thuis blijven (stay home)."
                }
              ],
              practice: [
                "Invite a friend to do something in Dutch.",
                "Describe your best friend: 'Mijn beste vriend heet...'",
                "Practice accepting and declining invitations politely.",
                "Role-play: plan a weekend activity with a friend.",
                "Plan a weekend with friends in Dutch: suggest activities, times, and places.",
                "Practice declining an invitation politely: 'Ik heb al andere plannen, maar bedankt!'"

              ]
            },
            examples: [
              { dutch: "Zullen we morgen afspreken?", guide: "zu-le-nuh mor-khen af-spray-ken", meaning: "Shall we meet tomorrow?" },
              { dutch: "Heb je zin om naar de film te gaan?", guide: "hep yuh zin om naar de film te khahn", meaning: "Do you feel like going to the movies?" },
              { dutch: "Ik heb geen tijd vanavond.", guide: "ik hep khayn tayt vah-nah-vont", meaning: "I have no time tonight." },
              { dutch: "Afgesproken!", guide: "af-khe-spraw-ken", meaning: "Deal!" },
              { dutch: "Wat gezellig!", guide: "wat khe-ze-lekh", meaning: "How cozy/nice!" },
              { dutch: "Zullen we zaterdag naar het strand gaan?", guide: "zu-le-nuh zah-ter-dakh naar het strand khahn", meaning: "Shall we go to the beach on Saturday?" },
              { dutch: "Ik kan helaas niet, ik moet werken.", guide: "ik kan he-lahs neet, ik moet wer-ken", meaning: "Unfortunately I cannot, I have to work." },
              { dutch: "Het was een geweldig feest!", guide: "het was un khe-wel-dikh fayst", meaning: "It was an amazing party!" },

            ]
          },
          {
            title: "Money and Finance",
            summary: "Learn vocabulary for money, banking, and transactions.",
            content: {
              objective: "Handle basic financial conversations: prices, banking, and payments.",
              sections: [
                {
                  heading: "Money basics",
                  body: "Het geld (money), de euro (euro), de cent (cent), het wisselgeld (change), de portemonnee (wallet), de pinpas (debit card), de creditcard (credit card)."
                },
                {
                  heading: "Banking",
                  body: "De bank (bank), de rekening (account), het saldo (balance), geld opnemen (withdraw money), geld storten (deposit money), de pincode (PIN code). 'Ik wil geld overmaken' (I want to transfer money)."
                },
                {
                  heading: "Budgeting",
                  body: "Het budget, de prijs (price), de korting (discount), de aanbieding (offer/sale), te duur (too expensive), betaalbaar (affordable). 'Hebt u iets goedkopers?' (Do you have something cheaper?)."
                }
              ],
              practice: [
                "Role-play: buy an item and negotiate the price.",
                "Practice bank phrases: 'Ik wil graag geld opnemen.'",
                "Compare prices of two items in Dutch.",
                "Write your monthly budget in Dutch with income and expenses.",
                "Create a simple budget in Dutch: income, expenses, savings.",
                "Practice comparing prices: 'Deze is duurder dan die, maar die is beter.'"

              ]
            },
            examples: [
              { dutch: "Hoeveel geld heb je nodig?", guide: "hoo-vaylt khelt hep yuh noh-dikh", meaning: "How much money do you need?" },
              { dutch: "Ik wil graag geld opnemen.", guide: "ik wil khrahkh khelt op-nay-men", meaning: "I would like to withdraw money." },
              { dutch: "Heeft u iets goedkopers?", guide: "hayft uw eets khoot-koh-pers", meaning: "Do you have something cheaper?" },
              { dutch: "Deze is in de aanbieding.", guide: "day-ze is in de ahn-bee-ding", meaning: "This one is on sale." },
              { dutch: "Kunt u met pin betalen?", guide: "kunt uw met pin be-tah-len", meaning: "Can you pay with card?" },
              { dutch: "Ik wil graag een rekening openen.", guide: "ik wil khrahkh un ray-ke-ning oh-pe-nen", meaning: "I would like to open an account." },
              { dutch: "Wat is de wisselkoers?", guide: "wat is de wi-sel-koers", meaning: "What is the exchange rate?" },
              { dutch: "Kunt u het bonnetje megeven?", guide: "kunt uw het bo-ne-tje may-khay-ven", meaning: "Can you give me the receipt?" },

            ]
          },
          {
            title: "Hobbies and Interests",
            summary: "Talk about what you enjoy doing in your free time.",
            content: {
              objective: "Describe your hobbies and interests in Dutch with detail.",
              sections: [
                {
                  heading: "Common hobbies",
                  body: "Lezen (reading), sporten (exercising), koken (cooking), reizen (traveling), fotograferen (photography), schilderen (painting), muziek maken (making music). 'Mijn hobby is...' (My hobby is...)."
                },
                {
                  heading: "Sports",
                  body: "Voetbal (soccer), tennis, hardlopen (running), zwemmen (swimming), fietsen (cycling), wandelen (hiking). 'Ik speel...' (I play...), 'Ik doe aan...' (I do...)."
                },
                {
                  heading: "Expressing preferences",
                  body: "'Ik vind... leuk' (I like...), 'Ik hou van...' (I love...), 'Ik heb een hekel aan...' (I hate...), 'Het is niet mijn ding' (It's not my thing)."
                }
              ],
              practice: [
                "Describe three of your hobbies with complete sentences.",
                "Ask someone about their hobbies: 'Wat doe je in je vrije tijd?'",
                "Practice expressing likes and dislikes for five activities.",
                "Write a short paragraph about your ideal weekend.",
                "Interview a partner about their hobbies using open-ended Dutch questions.",
                "Write a paragraph about why you love your favorite hobby in Dutch."

              ]
            },
            examples: [
              { dutch: "Mijn hobby is fotograferen.", guide: "mayn hoh-bee is foh-toh-khrah-fay-ren", meaning: "My hobby is photography." },
              { dutch: "Ik hou van reizen.", guide: "ik hou van ray-zen", meaning: "I love traveling." },
              { dutch: "Wat doe je in je vrije tijd?", guide: "wat doo yuh in yuh vray-e tayt", meaning: "What do you do in your free time?" },
              { dutch: "Ik speel graag tennis.", guide: "ik speyl khrahkh te-nis", meaning: "I like to play tennis." },
              { dutch: "Wandelen vind ik ontspannend.", guide: "wan-de-len vint ik ont-spah-nent", meaning: "I find walking relaxing." },
              { dutch: "Ik brei graag truien in de winter.", guide: "ik bray khrahkh truy-en in de win-ter", meaning: "I like knitting sweaters in the winter." },
              { dutch: "Mijn favoriete bezigheid is koken.", guide: "mayn fah-voh-ree-te be-zikh-hayt is koh-ken", meaning: "My favorite activity is cooking." },
              { dutch: "Vind je het leuk om te reizen?", guide: "vint yuh het luhk om te ray-zen", meaning: "Do you like traveling?" },

            ]
          }
        ]
      },

      // ============================================================
      // PHASE 7: Intermediate Grammar
      // ============================================================
      {
        title: "7.1 Past and Future",
        description: "Talk about the past and future in Dutch.",
        lessons: [
          {
            title: "Simple Past (Imperfectum)",
            summary: "Learn when and how to use the simple past tense.",
            content: {
              objective: "Form and use the simple past tense for regular and common irregular verbs.",
              sections: [
                {
                  heading: "Regular simple past",
                  body: "Add -te(n) or -de(n) to the stem. Use -te for stems ending in voiceless consonants (p, t, k, f, s, ch): 'werken' → 'ik werkte'. Use -de for others: 'wonen' → 'ik woonde'."
                },
                {
                  heading: "Strong verbs change vowels",
                  body: "Many common verbs change their vowel in the past: 'lopen' → 'liep', 'eten' → 'at', 'geven' → 'gaf', 'zien' → 'zag'. These must be memorized."
                },
                {
                  heading: "When to use simple past",
                  body: "Dutch uses the simple past more in writing and storytelling. In spoken Dutch, the present perfect is more common. But 'was' (was), 'had' (had) are very frequent in speech."
                }
              ],
              practice: [
                "Conjugate regular verbs in simple past: werken, wonen, maken, leren.",
                "Learn the simple past of: zijn (was/waren), hebben (had/hadden).",
                "Rewrite present tense sentences in simple past.",
                "Read a short Dutch story and identify all simple past verbs.",
                "Write a short story (150 words) about your last holiday using simple past tense.",
                "Create a table of 10 strong verbs with their present and simple past forms."

              ]
            },
            examples: [
              { dutch: "Ik werkte gisteren thuis.", guide: "ik werk-te ghis-ter-en tuis", meaning: "I worked at home yesterday." },
              { dutch: "Hij woonde in Rotterdam.", guide: "hay wohn-de in Ro-ter-dam", meaning: "He lived in Rotterdam." },
              { dutch: "Zij was ziek.", guide: "zay was zeek", meaning: "She was sick." },
              { dutch: "Wij hadden honger.", guide: "vay ha-den hong-er", meaning: "We were hungry." },
              { dutch: "Ik liep naar het station.", guide: "ik leep naar het stah-shon", meaning: "I walked to the station." },
              { dutch: "Ik at een broodje kaas.", guide: "ik aht un broht-je kahs", meaning: "I ate a cheese sandwich." },
              { dutch: "Zij gaf hem een cadeau.", guide: "zay khaf hem un kah-dow", meaning: "She gave him a gift." },
              { dutch: "Het was een koude dag.", guide: "het was un kou-de dakh", meaning: "It was a cold day." },

            ]
          },
          {
            title: "Present Perfect (Voltooid Tegenwoordige Tijd)",
            summary: "Learn the most common Dutch past tense for speaking.",
            content: {
              objective: "Form the present perfect tense using hebben/zijn + past participle.",
              sections: [
                {
                  heading: "Formation",
                  body: "Use the present tense of hebben or zijn + past participle. Regular participles add ge- + stem + -t/-d: 'werken' → 'gewerkt', 'wonen' → 'gewoond'."
                },
                {
                  heading: "When to use zijn",
                  body: "Most verbs use hebben. Zijn is used for movement and change of state: 'gaan' → 'ben gegaan', 'komen' → 'ben gekomen', 'worden' → 'ben geworden'."
                },
                {
                  heading: "Irregular participles",
                  body: "Many common verbs have irregular participles: 'doen' → 'gedaan', 'zien' → 'gezien', 'krijgen' → 'gekregen', 'helpen' → 'geholpen'. These end in -en, not -t/-d."
                }
              ],
              practice: [
                "Form participles for: koken, leren, maken, werken, spelen.",
                "Practice: 'Ik heb een boek gekocht' — identify the parts.",
                "Learn the zijn verbs: gaan, komen, worden, blijven, sterven.",
                "Tell someone what you did today using present perfect.",
                "Tell someone everything you did today using present perfect in Dutch.",
                "Practice zijn vs hebben: sort 20 common verbs into which auxiliary they use."

              ]
            },
            examples: [
              { dutch: "Ik heb een boek gekocht.", guide: "ik hep un book khe-kokht", meaning: "I have bought a book." },
              { dutch: "Zij is naar huis gegaan.", guide: "zay is naar huis khe-khahn", meaning: "She has gone home." },
              { dutch: "Heb je dat gedaan?", guide: "hep yuh daht khe-dahn", meaning: "Have you done that?" },
              { dutch: "Wij hebben gisteren gegeten.", guide: "vay hey-ben ghis-ter-en khe-ghay-ten", meaning: "We ate yesterday." },
              { dutch: "Ik ben thuis gebleven.", guide: "ik ben tuis khe-blay-ven", meaning: "I stayed home." },
              { dutch: "Ik heb mijn sleutels verloren.", guide: "ik hep mayn sluh-tels fer-loh-ren", meaning: "I have lost my keys." },
              { dutch: "Zij is gisteren aangekomen.", guide: "zay is ghis-ter-en ahn-khe-koh-men", meaning: "She arrived yesterday." },
              { dutch: "Heb je het nieuws gehoord?", guide: "hep yuh het nee-us khe-hohrt", meaning: "Have you heard the news?" },

            ]
          },
          {
            title: "Future Tense",
            summary: "Learn how to talk about the future in Dutch.",
            content: {
              objective: "Express future actions using zullen, gaan, and present tense with time words.",
              sections: [
                {
                  heading: "Using zullen",
                  body: "'Zullen' is the formal future auxiliary: 'Ik zal morgen komen' (I will come tomorrow). It is like English 'shall'. Often replaced by gaan in speech."
                },
                {
                  heading: "Using gaan",
                  body: "'Gaan' + infinitive is the common future form: 'Ik ga morgen werken' (I am going to work tomorrow). This is the most natural spoken form."
                },
                {
                  heading: "Present tense for future",
                  body: "Like English, Dutch uses the present tense with a future time word: 'Morgen werk ik' (Tomorrow I work/I will work). No special future verb needed."
                }
              ],
              practice: [
                "Make three future sentences with 'gaan'.",
                "Rewrite those sentences using the present tense with time words.",
                "Practice: 'Ik ga...' for plans, 'Ik zal...' for promises.",
                "Tell someone your plans for next week using multiple future forms.",
                "Write five predictions about your future using 'zullen'.",
                "Plan your next vacation using all three future forms: gaan, zullen, and present tense with time words."

              ]
            },
            examples: [
              { dutch: "Ik ga morgen naar de markt.", guide: "ik khah mor-khen naar de markt", meaning: "I am going to the market tomorrow." },
              { dutch: "Zij zal je later bellen.", guide: "zay zal yuh lah-ter be-len", meaning: "She will call you later." },
              { dutch: "Volgende week begin ik met mijn cursus.", guide: "vol-khen-de wayk be-gin ik met mayn kur-sus", meaning: "Next week I start my course." },
              { dutch: "Gaan jullie ook komen?", guide: "khah-n ju-lee ohk koh-men", meaning: "Are you all coming too?" },
              { dutch: "Ik zal het doen.", guide: "ik zal het doen", meaning: "I will do it." },
              { dutch: "Volgend jaar ga ik in Nederland wonen.", guide: "vol-khent yaar khah ik in Nay-der-lant woh-nen", meaning: "Next year I am going to live in the Netherlands." },
              { dutch: "Ik zal je morgen bellen.", guide: "ik zal yuh mor-khen be-len", meaning: "I will call you tomorrow." },
              { dutch: "Over twee uur begint de film.", guide: "oh-ver tvey uur be-gint de film", meaning: "The film starts in two hours." },

            ]
          }
        ]
      },
      {
        title: "7.2 Modal Verbs",
        description: "Master Dutch modal verbs for nuanced expression.",
        lessons: [
          {
            title: "Kunnen and Willen",
            summary: "Learn to express ability and desire with kunnen and willen.",
            content: {
              objective: "Use kunnen and willen correctly in present and past tenses.",
              sections: [
                {
                  heading: "Kunnen (can/to be able)",
                  body: "Ik kan, jij kan/kunt, hij kan, wij kunnen. In past: ik kon, wij konden. 'Ik kan zwemmen' (I can swim). 'Ik kon niet komen' (I could not come)."
                },
                {
                  heading: "Willen (to want)",
                  body: "Ik wil, jij wil/wilt, hij wil, wij willen. In past: ik wilde/wou, wij wilden/wouden. 'Ik wil koffie' (I want coffee). 'Ik wilde gaan' (I wanted to go)."
                },
                {
                  heading: "Word order with modals",
                  body: "Modal verbs push the main verb to the end of the sentence. 'Ik kan morgen niet komen' — 'kan' is in position 2, 'komen' goes to the end."
                }
              ],
              practice: [
                "Make sentences: Ik kan..., Jij kunt..., Hij kan...",
                "Practice past tense: Ik kon, ik wilde / ik wou.",
                "Write three sentences with a modal + infinitive at the end.",
                "Ask questions: 'Kun je mij helpen?' 'Wil je koffie?'",
                "Describe three things you can do and three things you want to do using kunnen/willen.",
                "Practice the past tense: 'Ik kon vroeger niet zwemmen, maar nu wel.'"

              ]
            },
            examples: [
              { dutch: "Ik kan goed zwemmen.", guide: "ik kan khroot zweh-men", meaning: "I can swim well." },
              { dutch: "Kun je mij helpen?", guide: "kun yuh may hel-pen", meaning: "Can you help me?" },
              { dutch: "Ik wil graag een ijsje.", guide: "ik wil khrahkh un aysh-ye", meaning: "I would like an ice cream." },
              { dutch: "Ik kon niet slapen.", guide: "ik kon neet slah-pen", meaning: "I could not sleep." },
              { dutch: "Wij willen morgen vertrekken.", guide: "vay wi-len mor-khen fer-tre-ken", meaning: "We want to leave tomorrow." },
              { dutch: "Ik wil graag een afspraak maken.", guide: "ik wil khrahkh un af-spraak mah-ken", meaning: "I would like to make an appointment." },
              { dutch: "Zij kan heel goed zingen.", guide: "zay kan hayl khroot zing-en", meaning: "She can sing very well." },
              { dutch: "Ik wilde komen, maar ik was te laat.", guide: "ik wil-de koh-men, mahr ik was te laht", meaning: "I wanted to come, but I was too late." },

            ]
          },
          {
            title: "Moeten and Mogen",
            summary: "Learn to express obligation and permission.",
            content: {
              objective: "Use moeten (must) and mogen (may) in present, past, and polite forms.",
              sections: [
                {
                  heading: "Moeten (must/have to)",
                  body: "Ik moet, jij moet, hij moet, wij moeten. Past: ik moest, wij moesten. 'Ik moet naar huis' (I must go home). 'Ik moest vroeg opstaan' (I had to get up early)."
                },
                {
                  heading: "Mogen (may/be allowed to)",
                  body: "Ik mag, jij mag, hij mag, wij mogen. Past: ik mocht, wij mochten. 'Mag ik binnenkomen?' (May I come in?). 'Ik mocht niet roken' (I was not allowed to smoke)."
                },
                {
                  heading: "Softening with modal verbs",
                  body: "Use 'zou' + infinitive to soften requests: 'Zou ik...?' (Could I...?). 'Zou u mij kunnen helpen?' (Could you help me?). This is very polite."
                }
              ],
              practice: [
                "Make sentences: Ik moet..., Jij moet..., Wij moeten...",
                "Practice polite requests: 'Mag ik...?' 'Zou ik...?'",
                "Compare: 'ik kan' vs 'ik mag' — ability vs permission.",
                "Transform commands into polite requests using zou.",
                "List five things you must do today and five things you are allowed to do.",
                "Practice the difference: 'ik moet niet' vs 'ik hoef niet' — create example sentences for each."

              ]
            },
            examples: [
              { dutch: "Ik moet naar de dokter.", guide: "ik moet naar de dok-ter", meaning: "I must go to the doctor." },
              { dutch: "Mag ik een vraag stellen?", guide: "makh ik un vraakh ste-len", meaning: "May I ask a question?" },
              { dutch: "Je mag hier niet roken.", guide: "yuh makh heer neet roh-ken", meaning: "You may not smoke here." },
              { dutch: "Zou u mij kunnen helpen?", guide: "zow uw may kun-nen hel-pen", meaning: "Could you help me?" },
              { dutch: "Ik moest gisteren overwerken.", guide: "ik moest ghis-ter-en oh-ver-wer-ken", meaning: "I had to work overtime yesterday." },
              { dutch: "Je moet je huiswerk maken.", guide: "yuh moet yuh huis-werk mah-ken", meaning: "You must do your homework." },
              { dutch: "Mag ik hier parkeren?", guide: "makh ik heer par-kay-ren", meaning: "May I park here?" },
              { dutch: "U mag niet roken in het gebouw.", guide: "uw makh neet roh-ken in het khe-bouw", meaning: "You may not smoke in the building." },

            ]
          },
          {
            title: "Zullen and Hoeven",
            summary: "Learn zullen (shall/will) and hoef + niet (don't need to).",
            content: {
              objective: "Use zullen for future/suggestions and hoef + niet for lack of necessity.",
              sections: [
                {
                  heading: "Zullen for suggestions",
                  body: "Use zullen to make suggestions: 'Zullen we gaan?' (Shall we go?). 'Zal ik je helpen?' (Shall I help you?). This is very common in friendly Dutch."
                },
                {
                  heading: "Hoeven + niet (don't need to)",
                  body: "'Hoeven' is used only in negative: 'Ik hoef niet te werken' (I don't need to work). It always needs 'niet' and 'te' before the infinitive."
                },
                {
                  heading: "Comparing modal nuances",
                  body: "'Ik moet niet' (I must not/prohibition). 'Ik hoef niet' (I don't need to/no obligation). 'Ik kan niet' (I cannot/unable). These express different degrees of necessity."
                }
              ],
              practice: [
                "Make suggestions: 'Zullen we...?' with five different activities.",
                "Practice 'hoeven niet': 'Ik hoef vandaag niet te werken.'",
                "Compare: 'ik moet' vs 'ik hoef' vs 'ik kan' in negative.",
                "Role-play: make plans using 'Zullen we...?' and respond.",
                "Make five suggestions with 'Zullen we...?' and respond to each affirmatively.",
                "Practice: 'Ik hoef niet' in five different contexts (cook, work, leave, etc.)."

              ]
            },
            examples: [
              { dutch: "Zullen we gaan wandelen?", guide: "zu-le-nuh khahn wan-day-len", meaning: "Shall we go for a walk?" },
              { dutch: "Zal ik het raam open doen?", guide: "zal ik het rahm oh-pen doen", meaning: "Shall I open the window?" },
              { dutch: "Je hoeft niet te betalen.", guide: "yuh hooft neet te be-tah-len", meaning: "You don't need to pay." },
              { dutch: "Ik hoef vandaag niet te koken.", guide: "ik hooft vahn-daakh neet te koh-ken", meaning: "I don't need to cook today." },
              { dutch: "Hoeven jullie niet te werken?", guide: "hoo-ven ju-lee neet te wer-ken", meaning: "Don't you all need to work?" },
              { dutch: "Zullen we een spelletje doen?", guide: "zu-le-nuh un spe-le-tje doen", meaning: "Shall we play a game?" },
              { dutch: "Je hoeft geen haast te maken.", guide: "yuh hooft khayn hahst te mah-ken", meaning: "You don't need to hurry." },
              { dutch: "Zal ik het raam opendoen?", guide: "zal ik het rahm oh-pen-doen", meaning: "Shall I open the window?" },

            ]
          }
        ]
      },
      {
        title: "7.3 Complex Sentences",
        description: "Build longer, more sophisticated Dutch sentences.",
        lessons: [
          {
            title: "Subordinate Clauses",
            summary: "Learn how to connect ideas with subordinate clauses.",
            content: {
              objective: "Form subordinate clauses using dat, omdat, als, toen, and terwijl with correct word order.",
              sections: [
                {
                  heading: "The verb goes to the end",
                  body: "In subordinate clauses, ALL verbs go to the end. 'Ik denk dat hij morgen komt.' (I think that he comes tomorrow.) Notice 'komt' is at the end, not after 'hij'."
                },
                {
                  heading: "Connecting words",
                  body: "Common connecting words: 'dat' (that), 'omdat' (because), 'als' (if/when), 'toen' (when, past), 'terwijl' (while), 'hoewel' (although). Each pushes verbs to the end."
                },
                {
                  heading: "Because: want vs omdat",
                  body: "'Want' (because) does NOT push verbs to the end — it is like English. 'Omdat' DOES push verbs to the end. 'Ik ga naar huis, want ik ben moe' vs 'Ik ga naar huis omdat ik moe ben.'"
                }
              ],
              practice: [
                "Connect: 'Ik denk...' + 'Hij komt morgen.' → 'Ik denk dat hij morgen komt.'",
                "Practice omdat: 'Ik leer Nederlands omdat...' and finish the sentence.",
                "Rewrite want sentences as omdat sentences and move the verb.",
                "Write three complex sentences with different connecting words.",
                "Write three sentences using 'omdat' and three using 'want' — notice the word order difference.",
                "Combine five pairs of simple sentences using 'dat', 'omdat', 'als', 'toen', 'terwijl'."

              ]
            },
            examples: [
              { dutch: "Ik denk dat hij morgen komt.", guide: "ik denk daht hay mor-khen komt", meaning: "I think that he comes tomorrow." },
              { dutch: "Ik ga naar huis omdat ik moe ben.", guide: "ik khah naar huis om-dat ik moo ben", meaning: "I go home because I am tired." },
              { dutch: "Als ik tijd heb, ga ik naar de film.", guide: "als ik tayt hep, khah ik naar de film", meaning: "If I have time, I will go to the movies." },
              { dutch: "Toen ik jong was, woonde ik in Groningen.", guide: "toon ik yong was, wohn-de ik in Khroh-ning-en", meaning: "When I was young, I lived in Groningen." },
              { dutch: "Ik lees een boek terwijl zij kookt.", guide: "ik lays un book ter-vayl zay kohkt", meaning: "I read a book while she cooks." },
              { dutch: "Hij zei dat hij niet kon komen.", guide: "hay zay daht hay neet kon koh-men", meaning: "He said that he could not come." },
              { dutch: "Omdat ik ziek ben, blijf ik thuis.", guide: "om-dat ik zeek ben, blayf ik tuis", meaning: "Because I am sick, I stay home." },
              { dutch: "Terwijl ik kookte, luisterde ik naar muziek.", guide: "ter-vayl ik kohk-te, luis-ter-de ik naar mu-zeek", meaning: "While I cooked, I listened to music." },

            ]
          },
          {
            title: "Separable Verbs",
            summary: "Master separable prefix verbs in Dutch.",
            content: {
              objective: "Use separable verbs correctly in main clauses and subordinate clauses.",
              sections: [
                {
                  heading: "How separable verbs work",
                  body: "The prefix separates from the verb in main clauses and goes to the end. 'Ik sta om zeven uur op' (I get up at seven). 'Opstaan' — 'op' goes to the end."
                },
                {
                  heading: "Common separable verbs",
                  body: "Opstaan (get up), aankomen (arrive), meenemen (bring along), uitgaan (go out), schoonmaken (clean), terugkomen (come back), bellen naar (call)."
                },
                {
                  heading: "In subordinate clauses",
                  body: "In subordinate clauses, the prefix stays attached and the verb goes to the end: 'Ik zei dat ik om zeven uur opsta.' Everything is together at the end."
                }
              ],
              practice: [
                "Practice: 'Ik sta op' → 'Ik zei dat ik opsta.'",
                "Learn 10 common separable verbs and their meanings.",
                "Create sentences: 'Ik kom morgen aan.' 'Ik ga vanavond uit.'",
                "Rewrite main clause sentences with separable verbs into subordinate clauses.",
                "Find 10 separable verbs in a Dutch text and identify the prefix and base verb.",
                "Write a paragraph using at least five separable verbs in main clauses."

              ]
            },
            examples: [
              { dutch: "Ik sta elke dag om zeven uur op.", guide: "ik sta el-ke dahk om zay-ven uur op", meaning: "I get up at seven every day." },
              { dutch: "Wanneer kom je aan?", guide: "wah-ner kom yuh ahn", meaning: "When do you arrive?" },
              { dutch: "Ik neem mijn laptop mee.", guide: "ik naym mayn lep-top may", meaning: "I am bringing my laptop." },
              { dutch: "Ik zei dat ik om zeven uur opsta.", guide: "ik zay daht ik om zay-ven uur op-stah", meaning: "I said that I get up at seven." },
              { dutch: "Hij maakt zijn kamer schoon.", guide: "hay mahkt zayn kah-mer skhohn", meaning: "He cleans his room." },
              { dutch: "Ik zeg het reis af.", guide: "ik zekh het rays af", meaning: "I cancel the trip." },
              { dutch: "Hij doet de deur dicht.", guide: "hay doot de duur dikht", meaning: "He closes the door." },
              { dutch: "Wij komen morgen terug.", guide: "vay koh-men mor-khen te-ruk", meaning: "We will come back tomorrow." },

            ]
          },
          {
            title: "Relative Clauses",
            summary: "Add extra information to nouns using relative clauses.",
            content: {
              objective: "Form relative clauses using die, dat, and waar + preposition.",
              sections: [
                {
                  heading: "Die for de-words, dat for het-words",
                  body: "Use 'die' for de-words (de man die...), and 'dat' for het-words (het huis dat...). The verb goes to the end of the relative clause."
                },
                {
                  heading: "Relative clauses with prepositions",
                  body: "When the relative clause involves a preposition, Dutch uses 'waar' + preposition: 'Het boek waar ik over sprak' (The book I spoke about). This replaces 'over hetwelk'."
                },
                {
                  heading: "Voor wie and tot wie",
                  body: "For people, use 'wie' with prepositions: 'De man voor wie ik dit doe' (The man for whom I do this). 'De vriend met wie ik reis' (The friend with whom I travel)."
                }
              ],
              practice: [
                "Create relative clauses: 'De man' + 'Hij woont hier' → 'De man die hier woont'.",
                "Practice die vs dat with five de-words and five het-words.",
                "Transform 'Het boek over dat ik sprak' → 'Het boek waar ik over sprak'.",
                "Write three complex sentences with relative clauses.",
                "Take five simple sentences and add a relative clause to provide more detail.",
                "Practice waar + preposition: transform 'Het boek over ik sprak' into 'Het boek waar ik over sprak'."

              ]
            },
            examples: [
              { dutch: "De man die daar loopt, is mijn vader.", guide: "de mahn dee dahr lohpt, is mayn vah-der", meaning: "The man walking there is my father." },
              { dutch: "Het huis dat ik heb gekocht, is klein.", guide: "het huis daht ik hep khe-kokht, is klayn", meaning: "The house I bought is small." },
              { dutch: "Het boek waar ik over sprak.", guide: "het book wahr ik oh-ver sprak", meaning: "The book I spoke about." },
              { dutch: "De vriend met wie ik reis.", guide: "de vreent met wee ik rays", meaning: "The friend with whom I travel." },
              { dutch: "Het meisje dat daar staat, is zijn zus.", guide: "het may-she daht dahr staht, is zayn zus", meaning: "The girl standing there is his sister." },
              { dutch: "De vrouw die naast me woont, is aardig.", guide: "de vrow dee nahst me wohnt, is aar-dekh", meaning: "The woman who lives next door is nice." },
              { dutch: "Het cadeau dat ik kreeg, was prachtig.", guide: "het kah-dow daht ik kraykh, was prakh-tikh", meaning: "The gift I received was beautiful." },
              { dutch: "De stad waar ik geboren ben.", guide: "de staht wahr ik khe-boh-ren ben", meaning: "The city where I was born." },

            ]
          }
        ]
      },
      {
        title: "7.4 Grammar in Practice",
        description: "Combine advanced grammar into natural speech.",
        lessons: [
          {
            title: "Word Order Variations",
            summary: "Master flexible Dutch word order for emphasis and style.",
            content: {
              objective: "Use different sentence openings and inversion for emphasis.",
              sections: [
                {
                  heading: "Fronting for emphasis",
                  body: "Put any element first to emphasize it: object first ('Dat boek heb ik gelezen'), time first ('Morgen ga ik'), place first ('In Amsterdam woon ik'). The verb stays second."
                },
                {
                  heading: "Inversion with adverbs",
                  body: "Adverbs like 'misschien' (maybe), 'waarschijnlijk' (probably), 'gelukkig' (luckily) cause inversion when at the start: 'Misschien komt hij morgen' (Maybe he comes tomorrow)."
                },
                {
                  heading: "Double verb constructions",
                  body: "With modals + perfect: 'Ik had moeten gaan' (I should have gone). 'Ik heb kunnen komen' (I have been able to come). This feels strange for English speakers."
                }
              ],
              practice: [
                "Take one sentence and rewrite it five times with different fronted elements.",
                "Practice misschien/waarschijnlijk inversion.",
                "Build a perfect modal: 'Ik heb...' + infinitive.",
                "Read a Dutch paragraph and analyze why each sentence starts as it does.",
                "Write one neutral sentence and then rewrite it four times with different elements fronted.",
                "Analyze a Dutch paragraph: explain why each sentence starts with a particular element."

              ]
            },
            examples: [
              { dutch: "Dat boek heb ik al gelezen.", guide: "daht book hep ik al khe-lay-zen", meaning: "That book I have already read." },
              { dutch: "Misschien komt hij morgen.", guide: "mi-skhayn komt hay mor-khen", meaning: "Maybe he will come tomorrow." },
              { dutch: "Gelukkig heb ik mijn sleutels gevonden.", guide: "khe-lu-kekh hep ik mayn sluh-tels khe-fon-den", meaning: "Luckily I found my keys." },
              { dutch: "Ik had moeten gaan.", guide: "ik hahd moo-ten khahn", meaning: "I should have gone." },
              { dutch: "In Nederland regent het vaak.", guide: "in Nay-der-lant ray-khent het vaak", meaning: "In the Netherlands it rains often." },
              { dutch: "Nooit heb ik zoiets moois gezien.", guide: "nooyt hep ik zoy-eets moys khe-zeen", meaning: "Never have I seen something so beautiful." },
              { dutch: "Alleen daarom doe ik het.", guide: "ah-layn dah-rom doo ik het", meaning: "Only for that reason I do it." },
              { dutch: "In de zomer gaan we altijd naar zee.", guide: "in de zo-mer khahn we al-tayt naar zay", meaning: "In the summer we always go to the sea." },

            ]
          },
          {
            title: "Comparatives and Superlatives",
            summary: "Compare people, things, and ideas in Dutch.",
            content: {
              objective: "Form and use comparative and superlative adjectives correctly.",
              sections: [
                {
                  heading: "Comparative formation",
                  body: "Add -er to the adjective: 'groot' → 'groter' (bigger), 'klein' → 'kleiner' (smaller). For adjectives ending in -r, add -der: 'duur' → 'duurder'."
                },
                {
                  heading: "Superlative formation",
                  body: "Add -st: 'grootst' (biggest), 'kleinst' (smallest). Use 'de/het...st(e)': 'de grootste man', 'het kleinste huis'. In predicates: 'Zij is het grootst.'"
                },
                {
                  heading: "Irregular comparatives",
                  body: "'Goed' → 'beter' (better) → 'best' (best). 'Veel' → 'meer' (more) → 'meest' (most). 'Graag' → 'liever' (prefer) → 'liefst' (prefer most)."
                }
              ],
              practice: [
                "Form comparatives for: groot, klein, duur, mooi, snel.",
                "Compare two cities using comparative adjectives.",
                "Use 'dan' (than): 'Amsterdam is groter dan Utrecht.'",
                "Practice superlatives: 'De lekkerste koffie', 'Het mooiste meisje'.",
                "Compare three cities using comparative and superlative adjectives in complete sentences.",
                "Practice irregulars: goed/beter/best, veel/meer/meest, graag/liever/liefst."

              ]
            },
            examples: [
              { dutch: "Amsterdam is groter dan Utrecht.", guide: "Am-ster-dam is khroh-ter dan U-trekht", meaning: "Amsterdam is bigger than Utrecht." },
              { dutch: "Dit boek is beter dan dat boek.", guide: "dit book is bay-ter dan daht book", meaning: "This book is better than that book." },
              { dutch: "Zij is de beste student.", guide: "zay is de bes-te stu-dent", meaning: "She is the best student." },
              { dutch: "Ik ga het liefst naar zee.", guide: "ik khah het leefst naar zay", meaning: "I prefer going to the sea." },
              { dutch: "Welke is het goedkoopst?", guide: "wel-ke is het khoot-kohpst", meaning: "Which one is the cheapest?" },
              { dutch: "Deze telefoon is duurder dan die.", guide: "day-ze te-le-fohn is duur-der dan dee", meaning: "This phone is more expensive than that one." },
              { dutch: "Dat is de lekkerste taart die ik ooit heb gegeten.", guide: "daht is de le-kers-te taart dee ik ooyt hep khe-khay-ten", meaning: "That is the tastiest cake I have ever eaten." },
              { dutch: "Ik ga het liefst op vakantie naar de bergen.", guide: "ik khah het leefst op vah-kahn-tee naar de ber-gen", meaning: "I prefer to go on holiday to the mountains." },

            ]
          },
          {
            title: "Combining Structures",
            summary: "Combine everything into natural, complex sentences.",
            content: {
              objective: "Create compound-complex sentences using multiple grammar structures.",
              sections: [
                {
                  heading: "Sentence combining",
                  body: "Take two or more ideas and combine them using connecting words. Start simple: 'Ik ga naar huis. Ik ben moe.' → 'Ik ga naar huis omdat ik moe ben.'"
                },
                {
                  heading: "Multiple clauses",
                  body: "Combine main + subordinate + relative: 'De man die ik gisteren ontmoette, zei dat hij in Amsterdam woont, waar hij al tien jaar werkt.' This is advanced but achievable."
                },
                {
                  heading: "Natural complexity",
                  body: "Don't write like a textbook. Dutch speakers use a mix of short and long sentences. Vary your sentence length for natural rhythm. Notice how native speakers connect ideas."
                }
              ],
              practice: [
                "Take three short sentences and combine them into one complex sentence.",
                "Write a paragraph about your weekend using 3-4 combined sentences.",
                "Identify the main clause, subordinate clause, and relative clauses in your sentences.",
                "Read your paragraph aloud — does it sound natural or forced?",
                "Write a paragraph combining main, subordinate, and relative clauses on the topic of 'mijn weekend'.",
                "Read a complex Dutch sentence and diagram its structure: main clause, sub clauses, relative clauses."

              ]
            },
            examples: [
              { dutch: "Ik ga naar huis omdat ik moe ben.", guide: "ik khah naar huis om-dat ik moo ben", meaning: "I go home because I am tired." },
              { dutch: "De man die ik gisteren ontmoette, woont in Amsterdam.", guide: "de mahn dee ik ghis-ter-en ont-moo-te, wohnt in Am-ster-dam", meaning: "The man I met yesterday lives in Amsterdam." },
              { dutch: "Toen ik jong was, dacht ik dat ik later in Frankrijk zou wonen.", guide: "toon ik yong was, dakht ik daht ik lah-ter in Frank-ryk zow woh-nen", meaning: "When I was young, I thought I would live in France later." },
              { dutch: "Ik heb het boek dat je me aanraadde eindelijk uitgelezen.", guide: "ik hep het book daht yuh me ahn-rah-de ayn-de-lek oyt-khe-lay-zen", meaning: "I finally finished the book you recommended." },
              { dutch: "Hoewel het regende, zijn we toch gaan wandelen.", guide: "hoo-wel het rey-khen-de, zayn we tok khahn wan-day-len", meaning: "Although it rained, we went for a walk anyway." },
              { dutch: "De film die we gisteren zagen, vond ik erg goed, hoewel hij lang was.", guide: "de film dee we ghis-ter-en zah-gen, font ik erkh khroot, hoo-wel hay lang was", meaning: "The film we saw yesterday, I thought was very good, although it was long." },
              { dutch: "Ik heb besloten dat ik volgend jaar, als ik genoeg geld heb, naar Australië zal reizen.", guide: "ik hep be-slo-ten daht ik vol-khent yaar, als ik khe-nookh khelt hep, naar Aus-trah-lee zal ray-zen", meaning: "I have decided that next year, if I have enough money, I will travel to Australia." },
              { dutch: "De docent zei dat we ons huiswerk op tijd moeten inleveren.", guide: "de doh-sent zay daht we ons huis-werk op tayt moe-ten in-lay-ve-ren", meaning: "The teacher said we must hand in our homework on time." }
            ]
          }
        ]
      },

      // ============================================================
      // PHASE 8: Real Conversation
      // ============================================================
      {
        title: "8.1 Speaking Practice",
        description: "Practice speaking through structured exercises.",
        lessons: [
          {
            title: "AI Conversation Prompts",
            summary: "Practice Dutch conversations with AI using structured prompts.",
            content: {
              objective: "Hold a 3-minute conversation on a familiar topic using Dutch only.",
              sections: [
                {
                  heading: "Setting up AI conversations",
                  body: "Use an AI language tool set to Dutch. Start with basic topics: yourself, your day, your hobbies. Tell the AI to keep responses simple and ask you questions."
                },
                {
                  heading: "Conversation strategy",
                  body: "Prepare before you start: know 3-5 key phrases for the topic. Don't worry about mistakes. If stuck, say 'Hoe zeg je... in het Nederlands?' (How do you say... in Dutch?)."
                },
                {
                  heading: "Post-conversation review",
                  body: "After the conversation, review the transcript. Note new words and phrases. Identify 2-3 mistakes and practice the correct versions. Repeat the same conversation the next day."
                }
              ],
              practice: [
                "Have an AI conversation about your daily routine (3 minutes).",
                "Have a conversation about your weekend plans.",
                "Review the transcript and correct your mistakes.",
                "Repeat the same conversation and try to improve your speed.",
                "Ask an AI language tutor to correct your sentences and explain each correction.",
                "Have an AI conversation where you only speak Dutch for at least 5 exchanges."

              ]
            },
            examples: [
              { dutch: "Kun je me vragen stellen over mijn dag?", guide: "kun yuh me vrah-gen ste-len oh-ver mayn dakh", meaning: "Can you ask me questions about my day?" },
              { dutch: "Ik wil oefenen met praten over mijn werk.", guide: "ik wil oo-feh-nen met prah-ten oh-ver mayn werk", meaning: "I want to practice talking about my work." },
              { dutch: "Hoe zeg ik dit in het Nederlands?", guide: "hoo zekh ik dit in het Nay-der-lahnts", meaning: "How do I say this in Dutch?" },
              { dutch: "Kun je langzamer praten?", guide: "kun yuh lang-zah-mer prah-ten", meaning: "Can you speak slower?" },
              { dutch: "Ik begrijp het. Kun je doorgaan?", guide: "ik be-khrayp het. kun yuh dohr-khahn", meaning: "I understand. Can you continue?" },
              { dutch: "Kun je mijn Nederlands verbeteren?", guide: "kun yuh mayn Nay-der-lahnts fer-bay-te-ren", meaning: "Can you improve my Dutch?" },
              { dutch: "Ik wil oefenen met de verleden tijd.", guide: "ik wil oo-feh-nen met de ver-lay-den tayt", meaning: "I want to practice the past tense." },
              { dutch: "Geef me een onderwerp om over te praten.", guide: "khayf me un on-der-werp om oh-ver te prah-ten", meaning: "Give me a topic to talk about." },

            ]
          },
          {
            title: "Voice Recording Exercises",
            summary: "Record yourself speaking and analyze your performance.",
            content: {
              objective: "Record a 2-minute monologue and identify areas for improvement.",
              sections: [
                {
                  heading: "Choose your topic",
                  body: "Pick a familiar topic: describe your home, tell a story, explain your opinion. Prepare a few bullet points in Dutch, but don't write a script."
                },
                {
                  heading: "Record and evaluate",
                  body: "Record yourself speaking for 2 minutes without stopping. Listen back. Rate: fluency (did you pause?), pronunciation (clear?), grammar (correct?), vocabulary (varied?)."
                },
                {
                  heading: "The improvement cycle",
                  body: "Identify the top 2-3 problems. Practice those specific areas. Re-record the same topic and compare. Track your progress over time with weekly recordings."
                }
              ],
              practice: [
                "Record yourself describing your home for 2 minutes.",
                "Listen and identify your biggest pronunciation issue.",
                "Practice that issue and re-record the same description.",
                "Compare your first and second recording — what improved?",
                "Record a 2-minute description of your kitchen, then listen and count your hesitations.",
                "Create a weekly recording log: same topic, recorded every Friday for a month."

              ]
            },
            examples: [
              { dutch: "Ik woon in een klein appartement in de stad.", guide: "ik wohn in un klayn a-par-te-ment in de staht", meaning: "I live in a small apartment in the city." },
              { dutch: "Mijn kamer is niet groot, maar wel gezellig.", guide: "mayn kah-mer is neet khroht, mahr wel khe-ze-lekh", meaning: "My room is not big, but it is cozy." },
              { dutch: "Het leukste aan mijn huis is het balkon.", guide: "het luhk-ste aan mayn huis is het bal-kon", meaning: "The nicest thing about my home is the balcony." },
              { dutch: "Ik wil graag beter worden in Nederlands spreken.", guide: "ik wil khrahkh bay-ter wor-den in Nay-der-lahnts spray-ken", meaning: "I want to get better at speaking Dutch." },
              { dutch: "Ik oefen elke dag met praten.", guide: "ik oo-fen el-ke dahk met prah-ten", meaning: "I practice speaking every day." },
              { dutch: "Ik merk dat ik steeds minder fouten maak.", guide: "ik merk daht ik stayts min-der fou-ten maak", meaning: "I notice I make fewer and fewer mistakes." },
              { dutch: "Mijn uitspraak is veel beter dan vorige maand.", guide: "mayn oyt-spraak is vayl bay-ter dan voh-ri-khe maand", meaning: "My pronunciation is much better than last month." },
              { dutch: "Door op te nemen, hoor ik mijn eigen fouten.", guide: "dohr op te nay-men, hohr ik mayn ay-gen fou-ten", meaning: "By recording, I hear my own mistakes." },

            ]
          },
          {
            title: "Shadowing Practice",
            summary: "Improve fluency and pronunciation through advanced shadowing.",
            content: {
              objective: "Shadow a 1-minute Dutch audio clip with 90% accuracy in timing and intonation.",
              sections: [
                {
                  heading: "Advanced shadowing technique",
                  body: "Listen to a 30-60 second clip. First, understand the content. Second, shadow word-by-word. Third, shadow phrase-by-phrase. Fourth, shadow continuously without pause."
                },
                {
                  heading: "Focus on intonation",
                  body: "Dutch intonation patterns differ from English. Dutch questions often rise earlier. Statements fall at the end. Exclamations have a wider pitch range."
                },
                {
                  heading: "Tracking progress",
                  body: "Record your shadowing and overlay it with the original. Compare timing, intonation, and clarity. Focus on one aspect per week: week 1 = timing, week 2 = intonation."
                }
              ],
              practice: [
                "Find a 30-second Dutch dialogue and shadow it continuously.",
                "Record your shadowing and compare with the original.",
                "Focus on intonation — does your voice match the speaker's?",
                "Practice the same clip daily for one week and compare day 1 to day 7.",
                "Shadow a news anchor for 60 seconds — match their speed, tone, and rhythm.",
                "Practice shadowing a dialogue where two people speak: switch between their voices."

              ]
            },
            examples: [
              { dutch: "Ik vind het belangrijk om elke dag te oefenen.", guide: "ik vint het be-lang-rik om el-ke dahk te oo-feh-nen", meaning: "I find it important to practice every day." },
              { dutch: "Hoe langer je oefent, hoe beter je wordt.", guide: "hoo lang-er yuh oo-fent, hoo bay-ter yuh wort", meaning: "The longer you practice, the better you get." },
              { dutch: "Het gaat niet om perfectie, maar om vooruitgang.", guide: "het khaht neet om per-fek-see, mah-rom vor-oyt-khang", meaning: "It is not about perfection, but about progress." },
              { dutch: "Luister en herhaal na elke zin.", guide: "luis-ter en her-hahl na el-ke zin", meaning: "Listen and repeat after each sentence." },
              { dutch: "Probeer dezelfde intonatie te gebruiken.", guide: "pro-bayr de-zelf-de in-toh-nah-tsee te khe-bruy-ken", meaning: "Try to use the same intonation." },
              { dutch: "De uitspraak verbetert door elke dag te oefenen.", guide: "de oyt-spraak fer-bay-tert dohr el-ke dahk te oo-feh-nen", meaning: "Pronunciation improves by practicing every day." },
              { dutch: "Door te shadowen leer je de natuurlijke intonatie.", guide: "dohr te shah-dow-en layr yuh de na-tuur-le-khe in-toh-nah-tsee", meaning: "By shadowing you learn the natural intonation." },
              { dutch: "Blijf oefenen, ook als het moeilijk is.", guide: "blayf oo-feh-nen, ohk als het moy-lek is", meaning: "Keep practicing, even when it is difficult." },

            ]
          }
        ]
      },
      {
        title: "8.2 Conversation Topics",
        description: "Build vocabulary and confidence for specific conversation topics.",
        lessons: [
          {
            title: "Hobbies and Free Time",
            summary: "Discuss what you enjoy doing in your free time.",
            content: {
              objective: "Hold a 5-minute conversation about hobbies and free time activities.",
              sections: [
                {
                  heading: "Describing your hobbies",
                  body: "'In mijn vrije tijd...' (In my free time...), 'Ik besteed veel tijd aan...' (I spend a lot of time on...), 'Het is een leuke manier om te ontspannen' (It is a nice way to relax)."
                },
                {
                  heading: "Asking about others",
                  body: "'Wat doe jij in je vrije tijd?' (What do you do in your free time?), 'Heb je een hobby?' (Do you have a hobby?), 'Sinds wanneer doe je dat?' (Since when do you do that?)."
                },
                {
                  heading: "Showing interest",
                  body: "'Dat klinkt interessant!' (That sounds interesting!), 'Hoe vaak doe je dat?' (How often do you do that?), 'Zou ik dat ook kunnen leren?' (Could I learn that too?)."
                }
              ],
              practice: [
                "Describe three hobbies in detail: what, when, why you enjoy them.",
                "Ask a partner about their hobbies and respond with interest.",
                "Role-play: meet someone new and discuss free time activities.",
                "Record a 3-minute conversation about hobbies.",
                "Prepare a 3-minute presentation about your favorite hobby and record it.",
                "Practice asking follow-up questions: 'Hoe vaak?', 'Sinds wanneer?', 'Waarom?'"

              ]
            },
            examples: [
              { dutch: "In mijn vrije tijd lees ik graag boeken.", guide: "in mayn vray-e tayt lays ik khrahkh boo-ken", meaning: "In my free time I like to read books." },
              { dutch: "Wat doe jij om te ontspannen?", guide: "wat doo yay om te ont-spah-nen", meaning: "What do you do to relax?" },
              { dutch: "Dat klinkt heel leuk!", guide: "daht klinkt hayl luhk", meaning: "That sounds very nice!" },
              { dutch: "Hoe lang doe je al aan fotografie?", guide: "hoo lang doo yuh al aan foh-toh-khrah-fee", meaning: "How long have you been doing photography?" },
              { dutch: "Ik zou dat ook graag willen proberen.", guide: "ik zow daht ohk khrahkh wi-len proh-bay-ren", meaning: "I would like to try that too." },
              { dutch: "Ik verzamel postzegels uit de hele wereld.", guide: "ik fer-zah-melt post-zay-khels oyt de hay-le way-reld", meaning: "I collect stamps from all over the world." },
              { dutch: "Sinds wanneer schilder je?", guide: "sints wah-ner skil-der yuh", meaning: "Since when do you paint?" },
              { dutch: "Ik vind het heerlijk om te wandelen in het bos.", guide: "ik font het hayr-lek om te wan-de-len in het bos", meaning: "I love walking in the forest." },

            ]
          },
          {
            title: "Work and Study",
            summary: "Discuss your professional and educational life.",
            content: {
              objective: "Hold a 5-minute conversation about your work or studies.",
              sections: [
                {
                  heading: "Describing your job",
                  body: "'Ik werk als...' (I work as...), 'Ik ben verantwoordelijk voor...' (I am responsible for...), 'Mijn taken zijn...' (My tasks are...). Use present tense for daily activities."
                },
                {
                  heading: "Talking about your studies",
                  body: "'Ik studeer...' (I study...), 'Ik volg een cursus...' (I am taking a course...), 'Mijn studie gaat over...' (My study is about...)."
                },
                {
                  heading: "Workplace conversations",
                  body: "'Hoe bevalt je werk?' (How is your work?), 'Ik werk samen met...' (I work with...), 'We hebben een teamvergadering op...' (We have a team meeting on...)."
                }
              ],
              practice: [
                "Describe your job or studies in 5 sentences.",
                "Ask a partner about their work and follow up with questions.",
                "Practice workplace small talk: 'Hoe was je weekend?'",
                "Role-play: a networking conversation where you discuss your professions.",
                "Practice a networking introduction: your name, role, company, and what you do.",
                "Describe your study program or career path in 5 connected sentences."

              ]
            },
            examples: [
              { dutch: "Ik werk als docent op een middelbare school.", guide: "ik werk als doh-sent op un mi-del-bah-re skhole", meaning: "I work as a teacher at a secondary school." },
              { dutch: "Hoe bevalt je nieuwe baan?", guide: "hoo be-valt yuh nee-uwe baan", meaning: "How is your new job?" },
              { dutch: "Ik studeer economie aan de universiteit.", guide: "ik stu-deer ay-koh-noh-mee aan de u-nee-ver-si-tayt", meaning: "I study economics at the university." },
              { dutch: "Hoe lang werk je al bij dit bedrijf?", guide: "hoo lang werk yuh al bij dit be-drayf", meaning: "How long have you been working at this company?" },
              { dutch: "Ik ben verantwoordelijk voor de marketing.", guide: "ik ben fer-ant-wohr-de-lek vor de mar-ke-ting", meaning: "I am responsible for marketing." },
              { dutch: "Ik werk in de IT-sector als ontwikkelaar.", guide: "ik werk in de IT-sek-tor als ont-wik-ke-lahr", meaning: "I work in IT as a developer." },
              { dutch: "Mijn studie richt zich op duurzame energie.", guide: "mayn stu-dee rikht zikh op duur-zah-me en-er-khee", meaning: "My study focuses on sustainable energy." },
              { dutch: "Hoe bevalt je stage bij dat bedrijf?", guide: "hoo be-valt yuh stah-je bij daht be-drayf", meaning: "How is your internship at that company?" },

            ]
          },
          {
            title: "Current Events",
            summary: "Discuss news and current events in Dutch.",
            content: {
              objective: "Share and discuss an opinion about a current event in Dutch.",
              sections: [
                {
                  heading: "Introducing a topic",
                  body: "'Heb je het nieuws gehoord over...?' (Did you hear the news about...?), 'Ik las vandaag dat...' (I read today that...), 'Wat vind jij van...?' (What do you think about...?)."
                },
                {
                  heading: "Expressing opinions",
                  body: "'Ik vind dat...' (I think that...), 'Naar mijn mening...' (In my opinion...), 'Ik ben het ermee eens/oneens' (I agree/disagree), 'Het is een ingewikkeld probleem' (It is a complex issue)."
                },
                {
                  heading: "Simple news vocabulary",
                  body: "Het nieuws (news), de krant (newspaper), het artikel (article), de regering (government), de verkiezingen (elections), het milieu (environment)."
                }
              ],
              practice: [
                "Read a short Dutch news article and summarize it aloud.",
                "Share your opinion on a local news topic.",
                "Practice agreeing and disagreeing politely.",
                "Role-play: discuss a current event with someone who disagrees with you.",
                "Read a Dutch news headline and give your opinion in 2-3 sentences.",
                "Debate a simple topic: 'Is social media goed of slecht?' — give arguments for both sides."

              ]
            },
            examples: [
              { dutch: "Heb je het nieuws gehoord?", guide: "hep yuh het nee-us khe-hohrt", meaning: "Did you hear the news?" },
              { dutch: "Wat vind jij van de nieuwe wet?", guide: "wat vint yay van de nee-uwe wet", meaning: "What do you think about the new law?" },
              { dutch: "Ik ben het er niet mee eens.", guide: "ik ben het er neet may ayns", meaning: "I do not agree with it." },
              { dutch: "Het is een belangrijk onderwerp.", guide: "het is un be-lang-rik on-der-werp", meaning: "It is an important topic." },
              { dutch: "Daar heb ik nog niet over nagedacht.", guide: "dahr hep ik nok neet oh-ver nah-khe-dakht", meaning: "I have not thought about that yet." },
              { dutch: "De economie groeit langzamer dan verwacht.", guide: "de ay-koh-noh-mee krhoot lang-zah-mer dan fer-wahkt", meaning: "The economy is growing slower than expected." },
              { dutch: "Wat vind jij van de nieuwe regels?", guide: "wat vint yay van de nee-uwe ray-khels", meaning: "What do you think of the new rules?" },
              { dutch: "Het is een ingewikkeld probleem zonder makkelijke oplossing.", guide: "het is un in-khe-wi-kelt proh-bleem zon-der ma-ke-le-ke op-lo-sing", meaning: "It is a complex problem without an easy solution." },

            ]
          }
        ]
      },
      {
        title: "8.3 Building Fluency",
        description: "Practice extended speaking without preparation.",
        lessons: [
          {
            title: "Expressing Opinions",
            summary: "Learn to express and defend your opinions in Dutch.",
            content: {
              objective: "Express your opinion on a topic and give two supporting reasons.",
              sections: [
                {
                  heading: "Stating your opinion",
                  body: "'Wat mij betreft...' (As far as I am concerned...), 'Persoonlijk vind ik...' (Personally I think...), 'Ik ben ervan overtuigd dat...' (I am convinced that...)."
                },
                {
                  heading: "Giving reasons",
                  body: "Use 'omdat' (because), 'aangezien' (since), 'namelijk' (namely) to give reasons. 'Ik vind dit goed omdat het beter is voor het milieu.'"
                },
                {
                  heading: "Acknowledging other views",
                  body: "'Ik begrijp wat je zegt, maar...' (I understand what you say but...), 'Dat is een goed punt, echter...' (That is a good point, however...), 'Aan de andere kant...' (On the other hand...)."
                }
              ],
              practice: [
                "State your opinion on three topics with two reasons each.",
                "Practice the structure: opinion → reason 1 → reason 2 → conclusion.",
                "Acknowledge an opposing view and respond to it.",
                "Record a 2-minute opinion speech on a topic of your choice.",
                "Take a controversial topic and prepare a 2-minute opinion with three supporting arguments.",
                "Practice acknowledging the other side: 'Ik begrijp dat standpunt, maar ik denk dat...'"

              ]
            },
            examples: [
              { dutch: "Wat mij betreft, is dit de beste oplossing.", guide: "wat mayn be-treft, is dit de bes-te op-lo-sing", meaning: "As far as I am concerned, this is the best solution." },
              { dutch: "Ik ben ervan overtuigd dat we moeten veranderen.", guide: "ik ben er-fan oh-ver-tuykt daht we moe-ten fer-an-de-ren", meaning: "I am convinced that we must change." },
              { dutch: "Aan de andere kant heeft het ook nadelen.", guide: "aan de an-de-re kant hayft het ohk nah-day-len", meaning: "On the other hand, it also has disadvantages." },
              { dutch: "Ik begrijp je punt, maar ik ben het niet eens.", guide: "ik be-khrayp yuh punt, mahr ik ben het neet ayns", meaning: "I understand your point, but I do not agree." },
              { dutch: "Kortom, ik denk dat we het moeten proberen.", guide: "kort-om, ik denk daht we het moe-ten proh-bay-ren", meaning: "In short, I think we should try it." },
              { dutch: "Persoonlijk geloof ik dat onderwijs de hoogste prioriteit moet hebben.", guide: "per-sohn-lek khe-lohf ik daht on-der-wijs de krohkh-ste pri-oh-ri-tayt moet he-ben", meaning: "Personally I believe that education should have the highest priority." },
              { dutch: "Hoewel er nadelen zijn, wegen de voordelen zwaarder.", guide: "hoo-wel er nah-day-len zayn, way-gen de vohr-day-len zwahr-der", meaning: "Although there are disadvantages, the advantages outweigh them." },
              { dutch: "Ik ben tot de conclusie gekomen dat verandering nodig is.", guide: "ik ben tot de kon-klu-zee khe-koh-men daht fer-an-de-ring noh-dikh is", meaning: "I have come to the conclusion that change is needed." },

            ]
          },
          {
            title: "5-Minute Conversations",
            summary: "Sustain a conversation on a topic for 5 minutes.",
            content: {
              objective: "Hold a 5-minute conversation without significant pauses or switching to English.",
              sections: [
                {
                  heading: "Conversation flow",
                  body: "Start with an opening question. Listen to the answer and ask a follow-up. Share your own experience. Invite the other person to continue. This creates natural flow."
                },
                {
                  heading: "Handling silence",
                  body: "If you get stuck, use fillers: 'Even denken...', 'Dat is een goede vraag...', 'Laat me even nadenken...'. This buys time without breaking the conversation."
                },
                {
                  heading: "Recovering from mistakes",
                  body: "If you make a mistake, just continue. Do not apologize or correct yourself excessively. Say 'Of beter gezegd...' (Or rather...) and keep going."
                }
              ],
              practice: [
                "Have a 5-minute conversation about a topic you prepared.",
                "Practice recovery phrases for when you get stuck.",
                "Have a conversation on a topic you did NOT prepare.",
                "Record a conversation and count how many times you used English.",
                "Prepare three topics and practice transitioning between them smoothly.",
                "Practice the '5-minute rule': speak for 5 minutes without stopping, even if you repeat yourself."

              ]
            },
            examples: [
              { dutch: "Vertel eens over jezelf.", guide: "fer-tel ayns oh-ver yay-self", meaning: "Tell me about yourself." },
              { dutch: "Dat is een goede vraag. Even denken...", guide: "daht is un krhoo-de vraakh. ay-ven den-ken...", meaning: "That is a good question. Let me think..." },
              { dutch: "Of beter gezegd, ik bedoel...", guide: "of bay-ter khe-zekht, ik be-dool", meaning: "Or rather, I mean..." },
              { dutch: "Wat vind jij daarvan?", guide: "wat vint yay dahr-vahn", meaning: "What do you think of that?" },
              { dutch: "Daar wil ik graag nog iets aan toevoegen.", guide: "dahr wil ik khrahkh nok eets aan too-voo-khen", meaning: "I would like to add something to that." },
              { dutch: "Wat vond je van de presentatie?", guide: "wat font yuh van de pray-zen-tah-tsee", meaning: "What did you think of the presentation?" },
              { dutch: "Daar sluit ik me helemaal bij aan.", guide: "dahr sluyt ik may hay-le-mahl bij aan", meaning: "I completely agree with that." },
              { dutch: "Kun je daar meer over vertellen?", guide: "kun yuh dahr mayr oh-ver fer-te-len", meaning: "Can you tell me more about that?" },

            ]
          },
          {
            title: "10-Minute Conversations",
            summary: "Build stamina for extended conversations in Dutch.",
            content: {
              objective: "Hold a 10-minute conversation covering multiple topics.",
              sections: [
                {
                  heading: "Topic transitions",
                  body: "Use phrases to change topics smoothly: 'Overigens...' (By the way...), 'Dat doet me denken aan...' (That reminds me of...), 'Laten we het over iets anders hebben' (Let's talk about something else)."
                },
                {
                  heading: "Deepening the conversation",
                  body: "Ask 'waarom' questions to go deeper. 'Waarom vind je dat?' (Why do you think that?), 'Hoe ben je daarbij gekomen?' (How did you come to that?), 'Kun je een voorbeeld geven?' (Can you give an example?)."
                },
                {
                  heading: "Ending the conversation",
                  body: "'Het was leuk om met je te praten' (It was nice talking to you), 'We moeten dit snel weer doen' (We should do this again soon), 'Ik spreek je later' (I will talk to you later)."
                }
              ],
              practice: [
                "Talk about three different topics in one conversation.",
                "Practice smooth topic transitions without awkward pauses.",
                "Deepen the conversation with 'waarom' questions.",
                "Record a 10-minute conversation and identify your weak points.",
                "Plan a 10-minute conversation with three topic shifts and a natural conclusion.",
                "Practice ending a conversation politely: summary, thanks, future plan, goodbye."

              ]
            },
            examples: [
              { dutch: "Overigens, heb je al plannen voor het weekend?", guide: "oh-ver-khens, hep yuh al plah-nen vor het way-kent", meaning: "By the way, do you have plans for the weekend?" },
              { dutch: "Dat doet me denken aan mijn reis naar België.", guide: "daht doot may den-ken aan mayn rays naar Bel-khee", meaning: "That reminds me of my trip to Belgium." },
              { dutch: "Het was leuk om met je te praten.", guide: "het was luhk om met yuh te prah-ten", meaning: "It was nice talking to you." },
              { dutch: "Kun je een voorbeeld geven?", guide: "kun yuh un vor-bayrt khay-ven", meaning: "Can you give an example?" },
              { dutch: "Laten we snel weer afspreken!", guide: "lah-ten we snel wayr af-spray-ken", meaning: "Let's meet again soon!" },
              { dutch: "Voordat ik vergeet: heb je mijn e-mail gezien?", guide: "vohr-daht ik fer-kheet: hep yuh mayn ee-mayl khe-zeen", meaning: "Before I forget: did you see my email?" },
              { dutch: "Daar wil ik later nog op terugkomen.", guide: "dahr wil ik lah-ter nok op te-ruk-koh-men", meaning: "I want to come back to that later." },
              { dutch: "Laten we binnenkort weer afspreken!", guide: "lah-ten we bi-nen-kort wayr af-spray-ken", meaning: "Let's meet again soon!" },

            ]
          }
        ]
      },

      // ============================================================
      // PHASE 9: Writing Mastery
      // ============================================================
      {
        title: "9.1 Everyday Writing",
        description: "Learn to write everyday Dutch texts.",
        lessons: [
          {
            title: "Emails and Messages",
            summary: "Write formal and informal emails and messages in Dutch.",
            content: {
              objective: "Write a short email and a text message in Dutch appropriate for the context.",
              sections: [
                {
                  heading: "Email structure",
                  body: "Start with 'Beste [name],' (formal) or 'Hi/Hey [name],' (informal). State your purpose clearly. End with 'Met vriendelijke groet' (formal) or 'Groetjes' (informal)."
                },
                {
                  heading: "Message writing",
                  body: "Dutch messages are direct but polite. 'Kun je me laten weten of je komt?' (Can you let me know if you are coming?). Use 'alsjeblieft' (please) for polite requests."
                },
                {
                  heading: "Common email phrases",
                  body: "'Ik schrijf je over...' (I am writing about...), 'Kun je mij meer informatie geven over...' (Can you give me more info about...), 'Ik hoor graag van je' (I look forward to hearing from you)."
                }
              ],
              practice: [
                "Write a formal email to a teacher asking for information.",
                "Write an informal message to a friend making plans.",
                "Practice both formal and informal sign-offs.",
                "Send a real message in Dutch to a language partner.",
                "Write a formal email to a Dutch company asking for a quote.",
                "Write an informal WhatsApp message inviting a friend to a party."

              ]
            },
            examples: [
              { dutch: "Beste meneer Jansen, ik heb een vraag over de cursus.", guide: "bes-te me-nayr Yahn-sen, ik hep un vraakh oh-ver de kur-sus", meaning: "Dear Mr. Jansen, I have a question about the course." },
              { dutch: "Hi! Zullen we morgen afspreken?", guide: "hi! zu-le-nuh mor-khen af-spray-ken", meaning: "Hi! Shall we meet tomorrow?" },
              { dutch: "Kun je mij meer informatie sturen?", guide: "kun yuh may mayr in-for-mah-tsee stu-ren", meaning: "Can you send me more information?" },
              { dutch: "Met vriendelijke groet, Claire", guide: "met vreen-de-le-ke khroot, Claire", meaning: "Sincerely, Claire" },
              { dutch: "Groetjes! Tot morgen.", guide: "khroot-jes! tot mor-khen", meaning: "Cheers! See you tomorrow." },
              { dutch: "Ik bevestig hierbij mijn afspraak voor morgen.", guide: "ik be-fes-tikh heer-bay mayn af-spraak vor mor-khen", meaning: "I hereby confirm my appointment for tomorrow." },
              { dutch: "Kun je even laten weten of het gelukt is?", guide: "kun yuh ay-ven lah-ten way-ten of het khe-lukt is", meaning: "Can you let me know if it worked out?" },
              { dutch: "Bij voorbaat dank voor uw reactie.", guide: "bay vor-baht dank vor uw ray-ak-see", meaning: "Thank you in advance for your response." },

            ]
          },
          {
            title: "Personal Stories",
            summary: "Write short personal stories and anecdotes.",
            content: {
              objective: "Write a 150-word personal story using past and present tenses.",
              sections: [
                {
                  heading: "Story structure",
                  body: "A good story has: introduction (who, where, when), main event (what happened), and conclusion (how it ended or how you felt). Use time words to show the sequence."
                },
                {
                  heading: "Adding detail",
                  body: "Use adjectives and adverbs to make your story vivid. 'Het was een prachtige, zonnige dag' (It was a beautiful, sunny day). Describe colors, sounds, feelings."
                },
                {
                  heading: "Showing emotion",
                  body: "Use emotional vocabulary: 'Ik was blij/verdrietig/zenuwachtig' (I was happy/sad/nervous). 'Het was geweldig/verschrikkelijk' (It was amazing/terrible). Readers connect with emotions."
                }
              ],
              practice: [
                "Write a 100-word story about a memorable experience.",
                "Use at least three different tenses: present, past, future.",
                "Add descriptive details to make the story vivid.",
                "Read your story aloud and revise for natural flow.",
                "Write about a childhood memory using past tense and sensory details.",
                "Read your story aloud to a partner and ask them to summarize it back to you."

              ]
            },
            examples: [
              { dutch: "Vorige week ging ik naar Amsterdam.", guide: "voh-ri-khe week ging ik naar Am-ster-dam", meaning: "Last week I went to Amsterdam." },
              { dutch: "Het was een prachtige dag met veel zon.", guide: "het was un prakh-ti-khe dakh met vayl zon", meaning: "It was a beautiful day with lots of sun." },
              { dutch: "Ik heb een vriendin ontmoet en we hebben koffie gedronken.", guide: "ik hep un vreen-din ont-moot en we hey-ben koh-fee khe-dron-ken", meaning: "I met a friend and we drank coffee." },
              { dutch: "We hebben door de stad gewandeld.", guide: "we hey-ben door de staht khe-wan-delt", meaning: "We walked through the city." },
              { dutch: "Het was een geweldige dag!", guide: "het was un khe-wel-di-khe dakh", meaning: "It was an amazing day!" },
              { dutch: "Ik herinner me nog goed dat ik leerde fietsen.", guide: "ik he-ri-ner me nok khroot daht ik layr-de feet-sen", meaning: "I still remember well when I learned to cycle." },
              { dutch: "Mijn moeder maakte elke zondag pannenkoeken.", guide: "mayn moo-der mahk-te el-ke zon-dakh pah-nen-koo-ken", meaning: "My mother made pancakes every Sunday." },
              { dutch: "Het was een ervaring die ik nooit zal vergeten.", guide: "het was un er-vah-ring dee ik nooyt zal fer-khay-ten", meaning: "It was an experience I will never forget." },

            ]
          },
          {
            title: "Describing Events",
            summary: "Write clear descriptions of events and experiences.",
            content: {
              objective: "Write a 200-word description of an event using chronological order.",
              sections: [
                {
                  heading: "Chronological order",
                  body: "Use time markers: 'eerst' (first), 'daarna' (after that), 'vervolgens' (then), 'uiteindelijk' (finally). This helps the reader follow the sequence."
                },
                {
                  heading: "Describing the scene",
                  body: "Set the scene with sensory details: 'Er waren veel mensen' (There were many people), 'De muziek was luid' (The music was loud), 'Het eten rook heerlijk' (The food smelled delicious)."
                },
                {
                  heading: "Reflecting on the event",
                  body: "End with your reflection: 'Ik vond het...' (I thought it was...), 'Het was een ervaring die ik niet snel zal vergeten' (It was an experience I won't quickly forget)."
                }
              ],
              practice: [
                "Write about a party, celebration, or event you attended.",
                "Use five time markers to structure your description.",
                "Include sensory details: what you saw, heard, smelled, felt.",
                "End with your personal reflection on the event.",
                "Write about a recent celebration or party using chronological order.",
                "Describe the same event twice: once factually, once emotionally."

              ]
            },
            examples: [
              { dutch: "Eerst hebben we elkaar begroet.", guide: "ayrst hey-ben we el-kahr khe-khroot", meaning: "First we greeted each other." },
              { dutch: "Daarna zijn we naar het restaurant gegaan.", guide: "dahr-nah zayn we naar het res-toh-rant khe-khahn", meaning: "After that we went to the restaurant." },
              { dutch: "Het eten was heerlijk en de sfeer was gezellig.", guide: "het ay-ten was hayr-lek en de sfayr was khe-ze-lekh", meaning: "The food was delicious and the atmosphere was cozy." },
              { dutch: "Ik vond het een heel bijzondere avond.", guide: "ik font het un hayl bay-zon-de-re ah-vont", meaning: "I thought it was a very special evening." },
              { dutch: "Het was een ervaring die ik niet snel zal vergeten.", guide: "het was un er-vah-ring dee ik neet snel zal fer-khay-ten", meaning: "It was an experience I won't quickly forget." },
              { dutch: "De ceremonie begon om twee uur.", guide: "de say-re-moh-nee be-gon om tvey uur", meaning: "The ceremony began at two o'clock." },
              { dutch: "Daarna was er een receptie met hapjes en drankjes.", guide: "dahr-nah was er un ray-sep-see met hap-jes en drank-jes", meaning: "After there was a reception with snacks and drinks." },
              { dutch: "Iedereen danste tot middernacht.", guide: "ee-der-ayn dahn-ste tot mi-der-nakht", meaning: "Everyone danced until midnight." },

            ]
          }
        ]
      },
      {
        title: "9.2 Structured Writing",
        description: "Write structured texts including summaries and opinions.",
        lessons: [
          {
            title: "Summaries",
            summary: "Write concise summaries of texts you have read or heard.",
            content: {
              objective: "Summarize a 300-word Dutch text in 100 words using your own words.",
              sections: [
                {
                  heading: "Summary structure",
                  body: "Start with the main idea: 'Dit artikel gaat over...' (This article is about...). Include only the key points. Omit examples and details. Use your own words."
                },
                {
                  heading: "Condensing information",
                  body: "Change direct quotes to reported speech: 'Hij zei dat...' (He said that...). Combine multiple sentences into one. Remove adjectives and adverbs."
                },
                {
                  heading: "Summary language",
                  body: "Use neutral language. 'De auteur betoogt dat...' (The author argues that...), 'Het belangrijkste punt is...' (The main point is...), 'Concluderend...' (In conclusion...)."
                }
              ],
              practice: [
                "Read a short Dutch news article and summarize it in 50 words.",
                "Reduce your summary to 25 words — what do you keep?",
                "Summarize a conversation you had in Dutch.",
                "Practice different summary openings: 'Dit gaat over...', 'De tekst beschrijft...'",
                "Read a short article, then summarize it in 50 words without looking at the original.",
                "Practice summarizing a Dutch conversation you had with a friend."

              ]
            },
            examples: [
              { dutch: "Dit artikel gaat over de nieuwe milieuwet.", guide: "dit ar-ti-kel khaht oh-ver de nee-uwe mi-li-eu-wet", meaning: "This article is about the new environmental law." },
              { dutch: "Het belangrijkste punt is dat de regering maatregelen neemt.", guide: "het be-lang-rik-ste punt is daht de ray-ke-ring mah-tray-khe-len naymt", meaning: "The main point is that the government is taking measures." },
              { dutch: "De auteur betoogt dat dit niet genoeg is.", guide: "de ow-tur be-tohkt daht dit neet khe-nookh is", meaning: "The author argues that this is not enough." },
              { dutch: "Concluderend kunnen we zeggen dat er meer actie nodig is.", guide: "kon-klu-day-rend kun-nen we ze-khen daht er mayr ak-see noh-dikh is", meaning: "In conclusion, we can say that more action is needed." },
              { dutch: "Samengevat gaat dit over de toekomst van onze planeet.", guide: "sah-men-khe-vaht khaht dit oh-ver de too-komst van on-ze plah-nayt", meaning: "In summary, this is about the future of our planet." },
              { dutch: "Kort samengevat gaat het verhaal over verlies en hoop.", guide: "kort sah-men-khe-vaht khaht het fer-haal oh-ver fer-lees en hohp", meaning: "Briefly summarized, the story is about loss and hope." },
              { dutch: "De kern van het probleem is een gebrek aan communicatie.", guide: "de kern van het pro-bleem is un khe-brek aan ko-mu-ni-kah-tsee", meaning: "The core of the problem is a lack of communication." },
              { dutch: "Ik heb de tekst teruggebracht tot de hoofdpunten.", guide: "ik hep de tekst te-ruk-khe-brakht tot de hohft-pun-ten", meaning: "I reduced the text to the main points." },

            ]
          },
          {
            title: "Opinions and Arguments",
            summary: "Write persuasive texts expressing and supporting an opinion.",
            content: {
              objective: "Write a 200-word opinion piece with an introduction, arguments, and conclusion.",
              sections: [
                {
                  heading: "Structure of an argument",
                  body: "Introduction: state your opinion clearly. Body: give 2-3 arguments with examples. Conclusion: restate your opinion and summarize your reasoning."
                },
                {
                  heading: "Strengthening arguments",
                  body: "Use data and examples: 'Uit onderzoek blijkt dat...' (Research shows that...), 'Een voorbeeld hiervan is...' (An example of this is...). This makes your writing persuasive."
                },
                {
                  heading: "Counter-arguments",
                  body: "Acknowledge the other side: 'Sommige mensen zeggen dat...' (Some people say that...), 'Toch geloof ik dat...' (Yet I believe that...). This shows balanced thinking."
                }
              ],
              practice: [
                "Write an opinion piece on a topic you care about.",
                "Include two arguments and one counter-argument.",
                "Use data or examples to support each argument.",
                "Read your piece aloud and check if it is persuasive.",
                "Write a persuasive paragraph arguing for or against a local issue.",
                "Use at least two data points or examples to strengthen your argument."

              ]
            },
            examples: [
              { dutch: "Naar mijn mening is dit de beste aanpak.", guide: "naar mayn may-ning is dit de bes-te ahn-pak", meaning: "In my opinion, this is the best approach." },
              { dutch: "Uit onderzoek blijkt dat fietsen gezond is.", guide: "oyt on-der-zook blaykt daht feetsen khe-zont is", meaning: "Research shows that cycling is healthy." },
              { dutch: "Een voorbeeld hiervan is de stad Utrecht.", guide: "un vor-bayrt heer-vahn is de staht U-trekht", meaning: "An example of this is the city of Utrecht." },
              { dutch: "Sommige mensen zeggen dat het te duur is.", guide: "so-mi-khe men-zen ze-khen daht het te duur is", meaning: "Some people say that it is too expensive." },
              { dutch: "Toch geloof ik dat de voordelen groter zijn.", guide: "tokh khe-lohf ik daht de vohr-day-len khroh-ter zayn", meaning: "Yet I believe that the advantages are greater." },
              { dutch: "Ik ben ervan overtuigd dat fietsen gestimuleerd moet worden.", guide: "ik ben er-fan oh-ver-tuykt daht feet-sen khe-sti-mu-leert moe-ten wor-den", meaning: "I am convinced that cycling should be encouraged." },
              { dutch: "Uit cijfers blijkt dat het aantal fietsers stijgt.", guide: "oyt say-vers blaykt daht het ahn-tal feet-sers staygt", meaning: "Figures show that the number of cyclists is rising." },
              { dutch: "Ondanks de kritiek denk ik dat dit de juiste richting is.", guide: "on-danks de kri-teek denk ik daht dit de juis-te rik-ting is", meaning: "Despite the criticism, I think this is the right direction." },

            ]
          },
          {
            title: "Short Reports",
            summary: "Write factual reports in Dutch.",
            content: {
              objective: "Write a 250-word report on a factual topic with clear sections.",
              sections: [
                {
                  heading: "Report structure",
                  body: "Use clear sections with headings: Inleiding (Introduction), Methode (Method), Resultaten (Results), Conclusie (Conclusion). Each section should be 2-4 sentences."
                },
                {
                  heading: "Objective language",
                  body: "Reports use neutral, factual language. Avoid personal opinions. Use passive voice: 'Er werd gemeten dat...' (It was measured that...), 'De resultaten tonen aan dat...' (The results show that...)."
                },
                {
                  heading: "Data presentation",
                  body: "Describe data simply: 'Het percentage is gestegen van 20 naar 35 procent' (The percentage rose from 20 to 35 percent). 'De meerderheid van de deelnemers koos voor...' (The majority of participants chose...)."
                }
              ],
              practice: [
                "Write a short report about a topic you researched.",
                "Use at least three section headings.",
                "Include one data point or statistic.",
                "Keep the language neutral and factual.",
                "Write a report on a simple topic: 'The effects of reading daily' in 150 words.",
                "Practice using passive voice in three sentences relevant to a report."

              ]
            },
            examples: [
              { dutch: "Deze rapport gaat over de luchtkwaliteit in Amsterdam.", guide: "day-ze ra-port khaht oh-ver de lukht-kwa-li-tayt in Am-ster-dam", meaning: "This report is about air quality in Amsterdam." },
              { dutch: "Uit de metingen blijkt dat de luchtkwaliteit verbetert.", guide: "oyt de may-ting-en blaykt daht de lukht-kwa-li-tayt fer-bay-tert", meaning: "The measurements show that air quality is improving." },
              { dutch: "Het percentage fijnstof is met 15 procent gedaald.", guide: "het per-sen-tah-je fayn-stof is met vayf-tien proh-sent khe-dahlt", meaning: "The percentage of fine dust has decreased by 15 percent." },
              { dutch: "De meerderheid van de bewoners is tevreden.", guide: "de mayr-der-hayt van de be-woh-ners is te-fray-den", meaning: "The majority of residents are satisfied." },
              { dutch: "Concluderend kunnen we stellen dat de maatregelen werken.", guide: "kon-klu-day-rend kun-nen we ste-len daht de mah-tray-khe-len wer-ken", meaning: "In conclusion, we can state that the measures are working." },
              { dutch: "Er werd een enquête gehouden onder 100 deelnemers.", guide: "er werd un en-kweh-te khe-hou-den on-der hondert dayl-nay-mers", meaning: "A survey was conducted among 100 participants." },
              { dutch: "De gegevens werden geanalyseerd met behulp van statistiek.", guide: "de khe-khay-vens wer-den khe-ah-nah-lee-zayrt met be-hulp van sta-tis-teek", meaning: "The data were analyzed using statistics." },
              { dutch: "Aanbevolen wordt om verder onderzoek te doen.", guide: "ahn-be-voh-len wort om fer-der on-der-zook te doen", meaning: "It is recommended to conduct further research." },

            ]
          }
        ]
      },
      {
        title: "9.3 Writing Practice",
        description: "Sustained writing practice with self-correction.",
        lessons: [
          {
            title: "Daily Journal Prompts",
            summary: "Build a daily writing habit with structured prompts.",
            content: {
              objective: "Write a daily journal entry of 150 words for five consecutive days.",
              sections: [
                {
                  heading: "What to write about",
                  body: "Describe your day: what you did, how you felt, what you learned. Use prompts: 'Vandaag heb ik...' (Today I...), 'Ik voelde me...' (I felt...), 'Morgen ga ik...' (Tomorrow I will...)."
                },
                {
                  heading: "Building the habit",
                  body: "Write at the same time every day — morning or evening. Set a timer for 10 minutes. Don't edit while writing. Quantity matters more than quality for building the habit."
                },
                {
                  heading: "Reviewing your entries",
                  body: "Once a week, read your last 7 entries. Highlight patterns: common mistakes, words you overuse, progress you have made. This is motivating."
                }
              ],
              practice: [
                "Write a journal entry every day for one week.",
                "Use the day's prompt: what happened, how you felt, what's next.",
                "Do not edit while writing — just get words on the page.",
                "At the end of the week, review all entries and note your progress.",
                "Write for 5 minutes without stopping: describe your day, your feelings, your plans.",
                "After a week of journaling, circle 5 new words you used and check their spelling."

              ]
            },
            examples: [
              { dutch: "Vandaag heb ik Nederlands geoefend met een podcast.", guide: "vahn-daakh hep ik Nay-der-lahnts khe-oo-fent met un pot-kast", meaning: "Today I practiced Dutch with a podcast." },
              { dutch: "Ik voelde me zelfverzekerder dan gisteren.", guide: "ik voel-de me zelf-fer-zay-ker-dan ghis-ter-en", meaning: "I felt more confident than yesterday." },
              { dutch: "Ik heb drie nieuwe woorden geleerd.", guide: "ik hep dree nee-uwe wohr-den khe-layrt", meaning: "I learned three new words." },
              { dutch: "Morgen ga ik een gesprek oefenen met een vriend.", guide: "mor-khen khah ik un khe-sprek oo-feh-nen met un vreent", meaning: "Tomorrow I am going to practice a conversation with a friend." },
              { dutch: "Het was een goede dag.", guide: "het was un krhoo-de dakh", meaning: "It was a good day." },
              { dutch: "Vandaag heb ik een nieuwe stap gezet in mijn Nederlands.", guide: "vahn-daakh hep ik un nee-uwe stap khe-zet in mayn Nay-der-lahnts", meaning: "Today I took a new step in my Dutch." },
              { dutch: "Ik voel me steeds zekerder als ik Nederlands spreek.", guide: "ik voel me stayts zay-ker-der als ik Nay-der-lahnts sprayk", meaning: "I feel more and more confident when I speak Dutch." },
              { dutch: "Morgen wil ik proberen om alleen Nederlands te denken.", guide: "mor-khen wil ik pro-bay-ren om al-layn Nay-der-lahnts te den-ken", meaning: "Tomorrow I want to try to think only in Dutch." },

            ]
          },
          {
            title: "Self-Correction",
            summary: "Learn to find and fix your own writing mistakes.",
            content: {
              objective: "Identify and correct 80% of your own grammar and spelling errors.",
              sections: [
                {
                  heading: "Review method",
                  body: "Wait at least one hour after writing before correcting. Read your text aloud — errors often sound wrong. Use a checklist: word order, articles, verb conjugation, prepositions."
                },
                {
                  heading: "Common error patterns",
                  body: "Track your mistakes. Most learners repeat the same 5-10 errors. Create a personal error list. Before each writing session, review your list and focus on avoiding those errors."
                },
                {
                  heading: "Using tools wisely",
                  body: "Use spell-check and grammar tools, but understand WHY a correction is made. If the tool changes something, study the rule. Don't accept corrections blindly."
                }
              ],
              practice: [
                "Write a paragraph, wait one hour, then correct it yourself.",
                "Create a checklist of your top 5 common mistakes.",
                "Use a grammar tool and study every correction it makes.",
                "Re-write a corrected paragraph without looking at the corrections.",
                "Take a piece you wrote yesterday and correct it using a different colored pen (or font).",
                "Create a personal Top 5 error list and review it before each writing session."

              ]
            },
            examples: [
              { dutch: "Ik heb mijn tekst gecontroleerd op fouten.", guide: "ik hep mayn tekst khe-kon-troh-layrt op fou-ten", meaning: "I checked my text for errors." },
              { dutch: "Ik maak vaak dezelfde fout met de lidwoorden.", guide: "ik maak vaak de-zelf-de fout met de lit-wohr-den", meaning: "I often make the same mistake with articles." },
              { dutch: "Ik moet letten op de woordvolgorde.", guide: "ik moet le-ten op de wohrt-vol-khor-de", meaning: "I must pay attention to word order." },
              { dutch: "Ik heb deze zin herschreven.", guide: "ik hep day-ze zin her-skray-ven", meaning: "I rewrote this sentence." },
              { dutch: "Volgende keer zal ik beter opletten.", guide: "vol-khen-de kayr zal ik bay-ter op-le-ten", meaning: "Next time I will pay more attention." },
              { dutch: "Ik heb ontdekt dat ik vaak de verkeerde voorzetsels gebruik.", guide: "ik hep ont-dekt daht ik vaak de fer-kayr-de vor-zet-sels khe-bruyk", meaning: "I have discovered that I often use the wrong prepositions." },
              { dutch: "Door mijn fouten bij te houden, maak ik ze steeds minder.", guide: "dohr mayn fou-ten bij te hou-den, maak ik ze stayts min-der", meaning: "By tracking my mistakes, I make them less and less." },
              { dutch: "Ik lees mijn tekst altijd hardop voor ik hem verstuur.", guide: "ik lays mayn tekst al-tayt har-dop vor ik hem fer-stuur", meaning: "I always read my text aloud before sending it." },

            ]
          },
          {
            title: "Peer Review Techniques",
            summary: "Learn to give and receive feedback on writing.",
            content: {
              objective: "Review another learner's Dutch writing and provide constructive feedback.",
              sections: [
                {
                  heading: "Giving feedback",
                  body: "Start with what is good: 'Je hebt een duidelijke structuur gebruikt' (You used a clear structure). Suggest improvements: 'Probeer deze zin korter te maken' (Try making this sentence shorter)."
                },
                {
                  heading: "Receiving feedback",
                  body: "Do not take corrections personally. Ask questions: 'Waarom is dit fout?' (Why is this wrong?), 'Hoe kan ik dit beter zeggen?' (How can I say this better?)."
                },
                {
                  heading: "Focus areas",
                  body: "When reviewing, focus on one area at a time: session 1 = only word order, session 2 = only articles, session 3 = only vocabulary choice. This is less overwhelming."
                }
              ],
              practice: [
                "Exchange a written text with a language partner.",
                "Give feedback on one specific area (e.g., word order).",
                "Receive feedback and ask one follow-up question.",
                "Re-write your text incorporating the feedback.",
                "Exchange a text with a language partner and give feedback on just one aspect.",
                "Receive feedback and rewrite the text incorporating all suggestions."

              ]
            },
            examples: [
              { dutch: "Je tekst is goed gestructureerd.", guide: "yuh tekst is khroot khe-struk-tu-rayrt", meaning: "Your text is well structured." },
              { dutch: "Probeer deze zin korter te maken.", guide: "pro-bayr day-ze zin kor-ter te mah-ken", meaning: "Try making this sentence shorter." },
              { dutch: "Waarom is dit fout?", guide: "wah-rom is dit fout", meaning: "Why is this wrong?" },
              { dutch: "Hoe kan ik dit beter zeggen?", guide: "hoo kan ik dit bay-ter ze-khen", meaning: "How can I say this better?" },
              { dutch: "Bedankt voor je feedback!", guide: "be-dankt vor yuh feet-bak", meaning: "Thanks for your feedback!" },
              { dutch: "Je gebruikt een goede variatie in zinsstructuren.", guide: "yuh khe-bruykt un krhoo-de vah-ree-ah-tsee in zins-struk-tuur-en", meaning: "You use good variation in sentence structures." },
              { dutch: "Let op: bij 'omdat' moet het werkwoord aan het einde.", guide: "let op: bij om-dat moet het werk-wohrt aan het ayn-de", meaning: "Note: with 'omdat' the verb must go to the end." },
              { dutch: "Wil je dat ik dezelfde feedback in het Engels geef?", guide: "wil yuh daht ik de-zelf-de feet-bak in het Eng-els khayf", meaning: "Do you want me to give the same feedback in English?" },

            ]
          }
        ]
      },

      // ============================================================
      // PHASE 10: Native Content
      // ============================================================
      {
        title: "10.1 Audio Content",
        description: "Learn to understand Dutch audio content for native speakers.",
        lessons: [
          {
            title: "Podcasts for Learners",
            summary: "Use Dutch podcasts to improve listening comprehension.",
            content: {
              objective: "Listen to a learner-level Dutch podcast and understand 80% of the content.",
              sections: [
                {
                  heading: "Choosing the right podcast",
                  body: "Start with podcasts made for learners (slower speed, clear pronunciation). Gradually move to native podcasts. Look for podcasts with transcripts."
                },
                {
                  heading: "Active listening method",
                  body: "First listen: understand the topic without transcript. Second listen: read the transcript and note new words. Third listen: shadow the host. Fourth listen: listen without transcript again."
                },
                {
                  heading: "Building a podcast habit",
                  body: "Listen for 15-20 minutes daily during commuting or chores. Consistency matters more than duration. Listen to the same episode multiple times over several days."
                }
              ],
              practice: [
                "Find a Dutch learner podcast and listen to one episode.",
                "Do the four-step active listening method.",
                "Write down 10 new words from the episode.",
                "Listen to the same episode the next day without the transcript.",
                "Find a podcast transcript and read along while listening — mark words you don't know.",
                "Create a vocabulary list from one podcast episode and review it before listening again."

              ]
            },
            examples: [
              { dutch: "Ik luister elke dag naar een Nederlandse podcast.", guide: "ik luis-ter el-ke dahk naar un Nay-der-lahn-se pot-kast", meaning: "I listen to a Dutch podcast every day." },
              { dutch: "De spreker praat duidelijk en niet te snel.", guide: "de spray-ker praat duy-de-lek en neet te snel", meaning: "The speaker talks clearly and not too fast." },
              { dutch: "Ik gebruik de transcriptie om moeilijke woorden op te zoeken.", guide: "ik khe-bruyk de tran-skrip-tsee om moy-le-ke wohr-den op te zoo-ken", meaning: "I use the transcript to look up difficult words." },
              { dutch: "Na drie keer luisteren begrijp ik bijna alles.", guide: "na dree kayr luis-ter-en be-khrayp ik bay-nah ah-les", meaning: "After listening three times, I understand almost everything." },
              { dutch: "Ik raad deze podcast aan iedereen aan.", guide: "ik raad day-ze pot-kast aan ee-der-ayn ahn", meaning: "I recommend this podcast to everyone." },
              { dutch: "Ik luister naar 'Een Beetje Nederlands' in de auto.", guide: "ik luis-ter naar 'Een Bay-tje Nay-der-lahnts' in de ow-toh", meaning: "I listen to 'A Bit of Dutch' in the car." },
              { dutch: "De podcast heeft ook een transcriptie — dat helpt enorm.", guide: "de pot-kast hayft ohk un tran-skrip-tsee — daht helpt ay-norm", meaning: "The podcast also has a transcript — that helps enormously." },
              { dutch: "Ik raad deze podcast aan beginners aan.", guide: "ik raad day-ze pot-kast aan be-gin-ners ahn", meaning: "I recommend this podcast to beginners." },

            ]
          },
          {
            title: "Dutch Music and Lyrics",
            summary: "Learn Dutch through songs and music.",
            content: {
              objective: "Understand the lyrics of a simple Dutch song and explain its meaning.",
              sections: [
                {
                  heading: "Why music works",
                  body: "Songs repeat phrases, use emotional language, and stick in your memory. The melody helps you remember pronunciation and rhythm better than spoken text."
                },
                {
                  heading: "How to use music",
                  body: "Listen to the song without lyrics first. Read the lyrics and translate. Listen again while reading. Listen without reading until you understand. Finally, sing along."
                },
                {
                  heading: "Finding Dutch music",
                  body: "Popular Dutch artists: Marco Borsato, BLØF, Racoon, Suzan & Freek, Davina Michelle. Start with slower songs. Children's songs are also excellent for learning."
                }
              ],
              practice: [
                "Find one Dutch song and learn its lyrics.",
                "Listen five times: without lyrics, with lyrics, sing along.",
                "Write down 10 new words from the song.",
                "Explain what the song is about in Dutch.",
                "Find the lyrics of a Dutch song online and translate the chorus.",
                "Sing along to a Dutch song and record yourself — compare your pronunciation."

              ]
            },
            examples: [
              { dutch: "Dit is een mooi liedje.", guide: "dit is un moy leet-ye", meaning: "This is a beautiful song." },
              { dutch: "Ik zing graag mee met Nederlandse muziek.", guide: "ik zing khrahkh may met Nay-der-lahn-se mu-zeek", meaning: "I like to sing along with Dutch music." },
              { dutch: "De tekst gaat over liefde en verlies.", guide: "de tekst khaht oh-ver leef-de en fer-lees", meaning: "The lyrics are about love and loss." },
              { dutch: "Ik kan dit liedje bijna uit mijn hoofd.", guide: "ik kan dit leet-ye bay-nah oyt mayn hohft", meaning: "I know this song almost by heart." },
              { dutch: "Door muziek leer ik nieuwe woorden sneller onthouden.", guide: "dohr mu-zeek layr ik nee-uwe wohr-den sne-ler ont-hou-den", meaning: "Through music I remember new words faster." },
              { dutch: "Het liedje 'Hallo' van Marco Borsato is een klassieker.", guide: "het leet-ye 'Hallo' van Marco Borsato is un kla-see-ker", meaning: "The song 'Hallo' by Marco Borsato is a classic." },
              { dutch: "Door naar muziek te luisteren, leer ik de intonatie.", guide: "dohr naar mu-zeek te luis-ter-en, layr ik de in-toh-nah-tsee", meaning: "By listening to music, I learn intonation." },
              { dutch: "Kinderliedjes zijn makkelijk om te beginnen.", guide: "kin-der-leet-jes zayn ma-ke-lek om te be-gin-nen", meaning: "Children's songs are easy to start with." },

            ]
          },
          {
            title: "YouTube Channels",
            summary: "Use Dutch YouTube content for listening practice.",
            content: {
              objective: "Watch a Dutch YouTube video and summarize its content.",
              sections: [
                {
                  heading: "Content types",
                  body: "Vlogs (daily life), educational channels (explaining topics), comedy sketches, cooking shows, travel vlogs. Each uses different vocabulary and speaking styles."
                },
                {
                  heading: "Using subtitles",
                  body: "Start with Dutch subtitles on. Watch once with subtitles, then again without. Note 5-10 new expressions per video. Pause and repeat interesting phrases."
                },
                {
                  heading: "Building a watchlist",
                  body: "Subscribe to 3-5 Dutch channels. Watch at least one video daily. Watch videos on topics you already enjoy — the interest will carry you through the difficulty."
                }
              ],
              practice: [
                "Find a Dutch YouTuber who makes content you enjoy.",
                "Watch one video with Dutch subtitles, then without.",
                "Write a 50-word summary of the video in Dutch.",
                "Comment on the video in Dutch (even a simple sentence).",
                "Subscribe to three Dutch YouTube channels and watch at least one video per day.",
                "Leave a comment in Dutch on a Dutch YouTube video."

              ]
            },
            examples: [
              { dutch: "Ik kijk elke dag naar Nederlandse YouTubers.", guide: "ik kike el-ke dahk naar Nay-der-lahn-se YouTubers", meaning: "I watch Dutch YouTubers every day." },
              { dutch: "Deze vlogger praat duidelijk en is grappig.", guide: "day-ze vlo-gher praat duy-de-lek en is khra-pikh", meaning: "This vlogger speaks clearly and is funny." },
              { dutch: "Ik leer veel over de Nederlandse cultuur.", guide: "ik layr vayl oh-ver de Nay-der-lahn-se kul-tuur", meaning: "I learn a lot about Dutch culture." },
              { dutch: "Kun je een goede Nederlandse YouTuber aanraden?", guide: "kun yuh un krhoo-de Nay-der-lahn-se YouTuber ahn-rah-den", meaning: "Can you recommend a good Dutch YouTuber?" },
              { dutch: "Ik heb een nieuwe uitdrukking geleerd van deze video.", guide: "ik hep un nee-uwe oyt-dru-king khe-layrt van day-ze vee-dee-oh", meaning: "I learned a new expression from this video." },
              { dutch: "Ik kijk graag naar Nederlandse YouTubers.", guide: "ik kike khrahkh naar Nay-der-lahn-se YouTubers", meaning: "I like watching Dutch YouTubers." },
              { dutch: "Deze YouTuber legt grammatica heel duidelijk uit.", guide: "day-ze YouTuber lekt khra-mah-tee-kah hayl duy-de-lek oyt", meaning: "This YouTuber explains grammar very clearly." },
              { dutch: "Ik gebruik de ondertiteling om moeilijke woorden te begrijpen.", guide: "ik khe-bruyk de on-der-tee-te-ling om moy-le-ke wohr-den te be-khray-pen", meaning: "I use subtitles to understand difficult words." },

            ]
          }
        ]
      },
      {
        title: "10.2 Reading Content",
        description: "Read Dutch content created for native speakers.",
        lessons: [
          {
            title: "News Articles",
            summary: "Read Dutch news articles for comprehension and vocabulary.",
            content: {
              objective: "Read a Dutch news article and discuss its main points.",
              sections: [
                {
                  heading: "News sources",
                  body: "NOS (public broadcaster), NU.nl, AD.nl, Trouw, Volkskrant. Start with NOS — their language is clear and neutral. Use the NOS Jeugdjournaal (youth news) for simpler content."
                },
                {
                  heading: "Reading strategy",
                  body: "Read the headline and first paragraph first — these contain the main facts. Then read the full article. Look up only essential words. Try to guess meaning from context."
                },
                {
                  heading: "Building a news habit",
                  body: "Read one article daily. Spend 10-15 minutes. Write a one-sentence summary in Dutch. Note 3-5 new words. This builds both reading skill and general knowledge."
                }
              ],
              practice: [
                "Read one NOS article and write a one-sentence summary.",
                "Identify the five Ws: wie, wat, waar, wanneer, waarom.",
                "Note five new words and create sentences with them.",
                "Discuss the article with a language partner.",
                "Read one NOS article daily and write down the 5 Ws (wie, wat, waar, wanneer, waarom).",
                "Compare how the same news story is reported in Dutch vs English media."

              ]
            },
            examples: [
              { dutch: "Ik lees elke dag het nieuws op NOS.", guide: "ik lays el-ke dahk het nee-us op NOS", meaning: "I read the news on NOS every day." },
              { dutch: "Het hoofdartikel gaat over de verkiezingen.", guide: "het hohft-ar-ti-kel khaht oh-ver de fer-kee-sing-en", meaning: "The main article is about the elections." },
              { dutch: "Ik vind het moeilijk om lange artikelen te lezen.", guide: "ik font het moy-lek om lang-e ar-ti-kay-len te lay-zen", meaning: "I find it difficult to read long articles." },
              { dutch: "Deze zin begrijp ik niet. Kun je hem uitleggen?", guide: "day-ze zin be-khrayp ik neet. kun yuh hem oyt-le-khen", meaning: "I don't understand this sentence. Can you explain it?" },
              { dutch: "Ik heb mijn woordenschat uitgebreid met nieuwsartikelen.", guide: "ik hep mayn wohr-den-skhat oyt-khe-brayt met nee-us-ar-ti-kay-len", meaning: "I have expanded my vocabulary with news articles." },
              { dutch: "Volgens het NOS-journaal stijgt de werkloosheid niet.", guide: "vol-khens het NOS-zjoor-naal staygt de werk-lohs-hayt neet", meaning: "According to the NOS news, unemployment is not rising." },
              { dutch: "Het artikel bespreekt de oorzaken van het tekort.", guide: "het ar-ti-kel be-spraykt de ohr-zah-ken van het te-kort", meaning: "The article discusses the causes of the shortage." },
              { dutch: "De kop van het artikel is: 'Economie herstelt langzaam'.", guide: "de kop van het ar-ti-kel is: 'Ay-koh-noh-mee her-stelt lang-zaam'", meaning: "The headline is: 'Economy recovers slowly'." },

            ]
          },
          {
            title: "Short Stories and Books",
            summary: "Read Dutch literature at your level.",
            content: {
              objective: "Read a Dutch short story or graded reader and understand the plot.",
              sections: [
                {
                  heading: "Finding the right level",
                  body: "Start with graded readers (A2/B1 level). Move to children's books (ages 10-12). Then young adult fiction. Finally, adult literature. Each step increases complexity."
                },
                {
                  heading: "Reading without a dictionary",
                  body: "Try to read a page without stopping. Guess unfamiliar words from context. Only look up words that appear multiple times or block understanding of the plot."
                },
                {
                  heading: "Active reading",
                  body: "Underline sentences with new grammar structures. Highlight effective phrases. Write a short summary after each chapter. This turns passive reading into active learning."
                }
              ],
              practice: [
                "Find a Dutch graded reader at your level.",
                "Read one chapter without stopping to look up words.",
                "Write a two-sentence summary of each chapter.",
                "Read the same chapter aloud the next day.",
                "Read one chapter of a Dutch graded reader and summarize it in 3 sentences.",
                "Find a Dutch book that has an English translation — read a page in Dutch, then check."

              ]
            },
            examples: [
              { dutch: "Ik lees nu een boek van een Nederlandse schrijver.", guide: "ik lays nu un book van un Nay-der-lahn-se skray-ver", meaning: "I am now reading a book by a Dutch writer." },
              { dutch: "Het verhaal gaat over een jongen die naar een nieuwe stad verhuist.", guide: "het fer-haal khaht oh-ver un yong-en dee naar un nee-uwe staht fer-huis-t", meaning: "The story is about a boy who moves to a new city." },
              { dutch: "Ik lees elke avond tien pagina's.", guide: "ik lays el-ke ah-vont teen pah-khee-nahs", meaning: "I read ten pages every evening." },
              { dutch: "Sommige woorden begrijp ik niet, maar ik kan het verhaal volgen.", guide: "so-mi-khe wohr-den be-khrayp ik neet, mahr ik kan het fer-haal vol-khen", meaning: "I don't understand some words, but I can follow the story." },
              { dutch: "Het boek wordt steeds interessanter.", guide: "het book wort stayts in-te-re-san-ter", meaning: "The book is getting more and more interesting." },
              { dutch: "Ik lees 'Korte Verhalen in het Nederlands' voor beginners.", guide: "ik lays 'Kor-te Fer-ha-len in het Nay-der-lahnts' vor be-gin-ners", meaning: "I read 'Short Stories in Dutch' for beginners." },
              { dutch: "Het verhaal speelt zich af in een klein dorpje.", guide: "het fer-haal speelt zikh af in un klayn dor-pje", meaning: "The story is set in a small village." },
              { dutch: "Elk hoofdstuk eindigt met een cliffhanger, dus ik blijf lezen.", guide: "elk hohf-stuk ayn-dikt met un klif-han-ger, dus ik blayf lay-zen", meaning: "Each chapter ends with a cliffhanger, so I keep reading." },

            ]
          },
          {
            title: "Social Media",
            summary: "Use Dutch social media for authentic reading practice.",
            content: {
              objective: "Follow Dutch social media accounts and engage with content in Dutch.",
              sections: [
                {
                  heading: "Finding Dutch accounts",
                  body: "Follow Dutch news accounts, influencers, brands, and public figures on Twitter, Instagram, LinkedIn. Change your Reddit feed to Dutch subreddits."
                },
                {
                  heading: "Social media language",
                  body: "Social media uses informal, abbreviated Dutch. 'Gaaf!' (Cool!), 'Eens!' (Agreed!), 'LOL' (same as English), 'Ikr' (I know right?). This is authentic modern Dutch."
                },
                {
                  heading: "Engaging with content",
                  body: "Like, comment, and share in Dutch. Even a simple 'Mooi!' (Beautiful!) or 'Eens!' (Agreed!) is practice. Replying to posts forces you to produce the language."
                }
              ],
              practice: [
                "Follow five Dutch accounts on your preferred platform.",
                "Read 10 Dutch posts and comment on three of them.",
                "Change one app's language to Dutch for one week.",
                "Write a Dutch post about your language learning journey.",
                "Write a Dutch post about your language learning journey and post it on social media.",
                "Change your Twitter/Instagram language to Dutch and interact with posts in Dutch."

              ]
            },
            examples: [
              { dutch: "Ik volg nu Nederlandse accounts op Instagram.", guide: "ik volk nu Nay-der-lahn-se ah-kownts op Instagram", meaning: "I now follow Dutch accounts on Instagram." },
              { dutch: "De reacties zijn vaak grappig en informeel.", guide: "de ray-ahk-sees zayn vaak khra-pikh en in-for-mayl", meaning: "The comments are often funny and informal." },
              { dutch: "Ik reageer op berichten in het Nederlands.", guide: "ik ray-ahk-gayr op be-rik-ten in het Nay-der-lahnts", meaning: "I reply to posts in Dutch." },
              { dutch: "Wat betekent dit woord in deze context?", guide: "wat be-tay-kent dit wohrt in day-ze kon-tekst", meaning: "What does this word mean in this context?" },
              { dutch: "Social media helpt mij om alledaags Nederlands te leren.", guide: "soh-shal mee-dee-ah helpt may om al-e-dahks Nay-der-lahnts te lay-ren", meaning: "Social media helps me learn everyday Dutch." },
              { dutch: "Net een maand Nederlands geleerd. Ik maak vorderingen!", guide: "net un maand Nay-der-lahnts khe-layrt. Ik maak vor-day-rin-gen", meaning: "Just learned Dutch for a month. I am making progress!" },
              { dutch: "Wie volgt nog meer Nederlandse accounts?", guide: "wee volkt nok mayr Nay-der-lahn-se ah-kownts", meaning: "Who else follows Dutch accounts?" },
              { dutch: "Deze post is in het Nederlands — corrigeer me alsjeblieft!", guide: "day-ze post is in het Nay-der-lahnts — ko-ri-khayr me al-shuh-bleeft", meaning: "This post is in Dutch — please correct me!" },

            ]
          }
        ]
      },
      {
        title: "10.3 Immersion",
        description: "Create a Dutch immersion environment around you.",
        lessons: [
          {
            title: "TV Shows and Films",
            summary: "Watch Dutch TV shows and films with active learning techniques.",
            content: {
              objective: "Watch a Dutch TV episode and understand the main storyline without subtitles.",
              sections: [
                {
                  heading: "Choosing what to watch",
                  body: "Start with Dutch-dubbed versions of shows you already know. Move to original Dutch content: 'Flikken Maastricht', 'Goede Tijden, Slechte Tijden', Dutch films on Netflix."
                },
                {
                  heading: "Subtitle strategy",
                  body: "Phase 1: Dutch audio + English subtitles. Phase 2: Dutch audio + Dutch subtitles. Phase 3: Dutch audio + no subtitles. Spend 2-3 weeks in each phase."
                },
                {
                  heading: "Active watching",
                  body: "Pause and repeat interesting lines. Write down 5 new expressions per episode. Watch the same episode multiple times. Discuss it afterwards with someone."
                }
              ],
              practice: [
                "Watch one episode of a Dutch show with Dutch subtitles.",
                "Write down five new expressions from the episode.",
                "Re-watch the same scene without subtitles.",
                "Describe the episode plot in Dutch in 3-4 sentences.",
                "Watch one episode of a Dutch series with Dutch subtitles and write down 10 new expressions.",
                "Describe the plot of a Dutch film in 5 sentences using present tense."

              ]
            },
            examples: [
              { dutch: "Ik kijk een Nederlandse serie op Netflix.", guide: "ik kike un Nay-der-lahn-se say-ree op Netflix", meaning: "I am watching a Dutch series on Netflix." },
              { dutch: "De ondertiteling helpt mij om de dialoog te volgen.", guide: "de on-der-tee-te-ling helpt may om de dee-ah-lohkh te vol-khen", meaning: "The subtitles help me follow the dialogue." },
              { dutch: "Ik probeer zonder ondertiteling te kijken.", guide: "ik pro-bayr zon-der on-der-tee-te-ling te kay-ken", meaning: "I try to watch without subtitles." },
              { dutch: "Deze acteur spreekt heel duidelijk.", guide: "day-ze ak-tur spraykt hayl duy-de-lek", meaning: "This actor speaks very clearly." },
              { dutch: "Ik heb de hele aflevering begrepen!", guide: "ik hep de hay-le af-lay-ve-ring be-khray-pen", meaning: "I understood the entire episode!" },
              { dutch: "Ik kijk 'Flikken Maastricht' op NPO Start.", guide: "ik kike 'Fli-ken Maas-trikht' op NPO Start", meaning: "I watch 'Flikken Maastricht' on NPO Start." },
              { dutch: "De serie gaat over twee rechercheurs in Maastricht.", guide: "de say-ree khaht oh-ver tvey re-sher-shuurs in Maas-trikht", meaning: "The series is about two detectives in Maastricht." },
              { dutch: "Zonder ondertiteling is het nog lastig, maar ik oefen.", guide: "zon-der on-der-tee-te-ling is het nok las-tikh, mahr ik oo-fen", meaning: "Without subtitles it is still difficult, but I am practicing." },

            ]
          },
          {
            title: "Audiobooks",
            summary: "Use Dutch audiobooks for advanced listening practice.",
            content: {
              objective: "Listen to a Dutch audiobook chapter and follow the narrative.",
              sections: [
                {
                  heading: "Choosing audiobooks",
                  body: "Start with books you already know in English. The familiar story helps you understand without catching every word. Gradually move to books new to you."
                },
                {
                  heading: "Combined listening and reading",
                  body: "Listen to the audiobook while reading the text. This connects sound to spelling. Then listen without the text. Then read without audio. Each mode strengthens different skills."
                },
                {
                  heading: "Pacing yourself",
                  body: "Listen to one chapter per day. Adjust speed to 0.75x or 0.9x if needed. Rewind and relisten to difficult sections. Track vocabulary in a notebook."
                }
              ],
              practice: [
                "Find a Dutch audiobook of a book you know well.",
                "Listen to one chapter while reading along.",
                "Listen to the same chapter again without the text.",
                "Write a summary of what happened in the chapter.",
                "Listen to the same chapter of an audiobook three days in a row.",
                "Read a page of the book first, then listen to that page in the audiobook."

              ]
            },
            examples: [
              { dutch: "Ik luister naar een Nederlands audioboek.", guide: "ik luis-ter naar un Nay-der-lahnts ow-dee-oh-book", meaning: "I am listening to a Dutch audiobook." },
              { dutch: "Ik ken het verhaal al in het Engels, dat helpt.", guide: "ik ken het fer-haal al in het Eng-els, daht helpt", meaning: "I already know the story in English, that helps." },
              { dutch: "De voorlezer spreekt langzaam en duidelijk.", guide: "de vohr-lay-zer spraykt lang-zahm en duy-de-lek", meaning: "The narrator speaks slowly and clearly." },
              { dutch: "Ik luister elk hoofdstuk twee keer.", guide: "ik luis-ter elk hohf-stuk tvey kayr", meaning: "I listen to each chapter twice." },
              { dutch: "Na een paar hoofdstukken ga ik sneller begrijpen.", guide: "na un pahr hohf-stu-ken khah ik sne-ler be-khray-pen", meaning: "After a few chapters I understand faster." },
              { dutch: "Ik luister naar Harry Potter in het Nederlands.", guide: "ik luis-ter naar Harry Potter in het Nay-der-lahnts", meaning: "I am listening to Harry Potter in Dutch." },
              { dutch: "De stemacteur geeft elk personage een eigen stem.", guide: "de stem-ak-tuur khayft elk per-so-nah-zhe un ay-gen stem", meaning: "The voice actor gives each character their own voice." },
              { dutch: "Door de combinatie van lezen en luisteren leer ik het beste.", guide: "dohr de kom-bi-nah-tsee van lay-zen en luis-ter-en layr ik het bes-te", meaning: "Through the combination of reading and listening I learn best." },

            ]
          },
          {
            title: "Building an Immersion Environment",
            summary: "Surround yourself with Dutch everywhere.",
            content: {
              objective: "Create a daily environment where you encounter Dutch in at least five different ways.",
              sections: [
                {
                  heading: "Device settings",
                  body: "Change your phone, laptop, and app languages to Dutch. This forces you to read Dutch daily for basic tasks. Start with one device, then add more."
                },
                {
                  heading: "Daily Dutch touchpoints",
                  body: "Create at least five daily Dutch moments: morning news, music during commute, lunch podcast, evening reading, social media before bed. Consistency beats intensity."
                },
                {
                  heading: "Thinking in Dutch",
                  body: "Narrate your day in Dutch: 'Ik sta op. Ik poets mijn tanden. Ik drink koffie.' Describe what you see: 'De lucht is blauw. De kat zit op de stoel.' This builds automaticity."
                }
              ],
              practice: [
                "Change your phone language to Dutch for one day.",
                "Create a schedule with five daily Dutch touchpoints.",
                "Narrate your morning routine in Dutch out loud.",
                "Describe five things you see around you in Dutch.",
                "Create a daily schedule with at least 5 Dutch moments: morning, commute, lunch, evening, before bed.",
                "Change the language on 3 devices/apps to Dutch and keep it for one week."

              ]
            },
            examples: [
              { dutch: "Mijn telefoon staat nu ingesteld op Nederlands.", guide: "mayn te-le-fohn staht nu in-khe-stelt op Nay-der-lahnts", meaning: "My phone is now set to Dutch." },
              { dutch: "Ik denk steeds vaker in het Nederlands.", guide: "ik denk stayts vah-ker in het Nay-der-lahnts", meaning: "I increasingly think in Dutch." },
              { dutch: "Nederlands is geen vak meer, het is een deel van mijn dag.", guide: "Nay-der-lahnts is khayn vak mayr, het is un dayl van mayn dakh", meaning: "Dutch is no longer a subject, it is part of my day." },
              { dutch: "Ik zoek bewust naar Nederlandse content.", guide: "ik zook be-wust naar Nay-der-lahn-se kon-tent", meaning: "I actively seek out Dutch content." },
              { dutch: "Hoe meer ik omringd ben door Nederlands, hoe sneller ik leer.", guide: "hoo mayr ik om-ringt ben dohr Nay-der-lahnts, hoo sne-ler ik layr", meaning: "The more I am surrounded by Dutch, the faster I learn." },
              { dutch: "Ik begin mijn dag met Nederlands nieuws.", guide: "ik be-gin mayn dakh met Nay-der-lahnts nee-us", meaning: "I start my day with Dutch news." },
              { dutch: "Nederlands is niet iets wat ik doe, het is iets wat ik ben.", guide: "Nay-der-lahnts is neet eets wat ik doe, het is eets wat ik ben", meaning: "Dutch is not something I do, it is something I am." },
              { dutch: "Ik droom in het Nederlands — dat is een goed teken!", guide: "ik drohm in het Nay-der-lahnts — daht is un khroot tay-ken", meaning: "I dream in Dutch — that is a good sign!" },

            ]
          }
        ]
      },

      // ============================================================
      // PHASE 11: Fluency Development
      // ============================================================
      {
        title: "11.1 Speed and Precision",
        description: "Speak faster and more precisely in Dutch.",
        lessons: [
          {
            title: "Speaking Speed",
            summary: "Increase your speaking speed while maintaining clarity.",
            content: {
              objective: "Speak Dutch at a natural pace on familiar topics without hesitation.",
              sections: [
                {
                  heading: "Why speed matters",
                  body: "Slow speech makes conversations awkward. Native speakers may switch to English. At B2 level, you should be able to respond quickly without long pauses."
                },
                {
                  heading: "Speed drills",
                  body: "Use timed speaking: describe a topic in 1 minute, then 45 seconds, then 30 seconds. This forces you to organize thoughts faster. Record and compare."
                },
                {
                  heading: "Balancing speed and accuracy",
                  body: "Don't sacrifice clarity for speed. It is better to speak at 80% speed with correct grammar than 100% speed with errors. Increase speed gradually."
                }
              ],
              practice: [
                "Describe your weekend in 1 minute, then 30 seconds.",
                "Record yourself and count hesitations. Aim for fewer each time.",
                "Practice rapid responses to common questions.",
                "Do the 'just keep talking' exercise: speak for 2 minutes without pausing.",
                "Time yourself describing a picture: first at normal speed, then try to do it in half the time.",
                "Practice the 'just keep talking' exercise: speak for 3 minutes without stopping."

              ]
            },
            examples: [
              { dutch: "Ik merk dat ik steeds sneller kan reageren.", guide: "ik merk daht ik stayts sne-ler kan ray-ah-khe-ren", meaning: "I notice that I can respond faster and faster." },
              { dutch: "Vroeger moest ik lang nadenken voor ik sprak.", guide: "vroo-ger moest ik lang nah-den-ken vor ik sprak", meaning: "I used to have to think for a long time before speaking." },
              { dutch: "Nu komen de zinnen sneller uit mijn mond.", guide: "nu koh-men de zi-nen sne-ler oyt mayn mont", meaning: "Now the sentences come out faster." },
              { dutch: "Ik oefen met praten tegen een timer.", guide: "ik oo-fen met prah-ten tay-khen un tee-mer", meaning: "I practice speaking against a timer." },
              { dutch: "Mijn doel is om vijf minuten vloeiend te praten.", guide: "mayn dool is om vif mi-nu-ten vloo-yent te prah-ten", meaning: "My goal is to speak fluently for five minutes." },
              { dutch: "Vroeger zocht ik naar elk woord, nu komen de zinnen vanzelf.", guide: "vroo-ger zokht ik naar elk wohrt, nu koh-men de zi-nen van-zelf", meaning: "I used to search for every word, now sentences come naturally." },
              { dutch: "Ik merk dat ik sneller kan praten zonder na te denken.", guide: "ik merk daht ik sne-ler kan prah-ten zon-der nah te den-ken", meaning: "I notice I can talk faster without thinking." },
              { dutch: "Nog vijf minuten oefenen per dag maakt een groot verschil.", guide: "nok vif mi-nu-ten oo-feh-nen per dakh maakt un khroot fer-skhel", meaning: "Just five more minutes of practice per day makes a big difference." },

            ]
          },
          {
            title: "Nuance and Precision",
            summary: "Choose the exact right word for every situation.",
            content: {
              objective: "Use nuanced vocabulary to express precise meanings and emotions.",
              sections: [
                {
                  heading: "Beyond basic vocabulary",
                  body: "Replace basic words with more precise alternatives. Instead of 'leuk' (nice), use 'geweldig' (amazing), 'prachtig' (beautiful), 'fantastisch' (fantastic), 'bijzonder' (special)."
                },
                {
                  heading: "Register awareness",
                  body: "Know which words are formal, neutral, or informal. 'Aanvangen' (formal/begin) vs 'beginnen' (neutral) vs 'starten' (informal). Using the right register shows sophistication."
                },
                {
                  heading: "Connotation",
                  body: "Words carry emotional weight. 'Slank' (slim) is positive, 'mager' (thin) can be negative. 'Vrijgevig' (generous) vs 'spilziek' (wasteful). Choose words that match your intent."
                }
              ],
              practice: [
                "Take five basic words and find three precise alternatives for each.",
                "Rewrite a paragraph replacing basic words with more nuanced ones.",
                "Identify the register of words in a Dutch article (formal/neutral/informal).",
                "Keep a 'nuance journal' with words organized by emotional tone.",
                "Take five basic words (leuk, groot, mooi, lekker, goed) and find 3 synonyms for each.",
                "Rewrite a simple paragraph using more precise vocabulary — compare the difference."

              ]
            },
            examples: [
              { dutch: "Het was een geweldige ervaring.", guide: "het was un khe-wel-di-khe er-vah-ring", meaning: "It was an amazing experience." },
              { dutch: "Ik vind het bijzonder dat je dat zegt.", guide: "ik font het bay-zon-der daht yuh daht zekht", meaning: "I find it special that you say that." },
              { dutch: "Zij is een vrijgevige en warme persoon.", guide: "zay is un vray-khay-vi-khe en war-me per-sohn", meaning: "She is a generous and warm person." },
              { dutch: "Dit is een uitstekend voorstel.", guide: "dit is un oyt-stay-kent vor-stel", meaning: "This is an excellent proposal." },
              { dutch: "Ik ben niet alleen tevreden, ik ben enthousiast.", guide: "ik ben neet al-layn te-fray-den, ik ben en-tu-zee-ast", meaning: "I am not just satisfied, I am enthusiastic." },
              { dutch: "Het uitzicht was adembenemend.", guide: "het oyt-zikht was ah-dem-be-nay-mend", meaning: "The view was breathtaking." },
              { dutch: "Ik ben niet alleen tevreden, ik ben opgetogen.", guide: "ik ben neet al-layn te-fray-den, ik ben op-tuh-kho-ghen", meaning: "I am not just satisfied, I am delighted." },
              { dutch: "Hij is een uitmuntende professional.", guide: "hay is un oyt-mun-ten-de proh-fes-sjo-nahl", meaning: "He is an outstanding professional." },

            ]
          },
          {
            title: "Avoiding Common Mistakes",
            summary: "Identify and eliminate persistent errors in your Dutch.",
            content: {
              objective: "Recognize your top 10 recurring errors and actively avoid them in speech and writing.",
              sections: [
                {
                  heading: "Error analysis",
                  body: "Review your recent writing and recordings. Categorize errors: word order, articles, prepositions, verb conjugation, vocabulary choice. Identify patterns."
                },
                {
                  heading: "Error correction strategy",
                  body: "Focus on one error type per week. Create flashcards with the correct version. Before speaking, mentally rehearse the correct pattern. Ask a partner to gently correct you."
                },
                {
                  heading: "Common advanced errors",
                  body: "Er (there/pronoun) placement, omdat/want confusion, separable verb separation in subordinate clauses, and 'van' vs 'over' (about) are frequent advanced-level errors."
                }
              ],
              practice: [
                "Record yourself speaking and identify your top three errors.",
                "Focus on one error for a full week — catch it every time.",
                "Create a 'don't say' list with corrections.",
                "Ask a native speaker to point out your most noticeable error.",
                "Record yourself for 2 minutes, then transcribe and find 3 patterns of errors.",
                "Create a 'don't say' list of 10 common mistakes with their corrections."

              ]
            },
            examples: [
              { dutch: "Ik maak vaak fouten met de woordvolgorde in bijzinnen.", guide: "ik maak vaak fou-ten met de wohrt-vol-khor-de in bay-zi-nen", meaning: "I often make mistakes with word order in subordinate clauses." },
              { dutch: "Ik moet onthouden dat 'want' geen bijzin maakt.", guide: "ik moet ont-hou-den daht 'want' khayn bay-zin maakt", meaning: "I must remember that 'want' does not create a subordinate clause." },
              { dutch: "Mijn grootste fout is het verkeerde lidwoord.", guide: "mayn krhoot-ste fout is het fer-kayr-de lit-wohrt", meaning: "My biggest mistake is the wrong article." },
              { dutch: "Ik schrijf deze fout op zodat ik eraan denk.", guide: "ik skrayf day-ze fout op so-dat ik er-ahn denk", meaning: "I write this mistake down so I remember it." },
              { dutch: "Na een week focussen op deze fout, maak ik hem minder.", guide: "na un week fo-ku-sen op day-ze fout, maak ik hem min-der", meaning: "After a week focusing on this mistake, I make it less." },
              { dutch: "Ik moet onthouden dat 'omdat' de zin verandert.", guide: "ik moet ont-hou-den daht 'om-dat' de zin fer-an-dert", meaning: "I must remember that 'omdat' changes the sentence." },
              { dutch: "Niet 'Ik ben aan het wachten voor jou' maar 'Ik wacht op jou'.", guide: "neet 'Ik ben aan het wah-ten vor yow' mahr 'Ik wacht op yow'", meaning: "Not 'Ik ben aan het wachten voor jou' but 'Ik wacht op jou'." },
              { dutch: "Mijn meest gemaakte fout is de/het — ik maak een lijst.", guide: "mayn mayst khe-mahk-te fout is de/het — ik maak un layst", meaning: "My most common mistake is de/het — I am making a list." },

            ]
          }
        ]
      },
      {
        title: "11.2 Cultural Depth",
        description: "Understand Dutch culture, humor, and expressions.",
        lessons: [
          {
            title: "Idioms and Expressions",
            summary: "Learn common Dutch idioms and figurative expressions.",
            content: {
              objective: "Understand and use 15 common Dutch idioms in appropriate contexts.",
              sections: [
                {
                  heading: "Why idioms matter",
                  body: "Idioms are the difference between textbook Dutch and native Dutch. 'Het regent pijpenstelen' (it's raining very hard, literally 'pipe stems') is more colorful than 'het regent veel'."
                },
                {
                  heading: "Common food idioms",
                  body: "Dutch has many food-based idioms: 'Dat is appeltje-eitje' (that's easy, like apple-egg), 'Een eitje te pellen hebben' (to have a bone to pick), 'Met de noorderzon vertrekken' (leave without paying)."
                },
                {
                  heading: "Body idioms",
                  body: "'Iemand iets op de mouw spelden' (to pull someone's leg), 'Het hart op de tong hebben' (to wear your heart on your sleeve), 'Iemand de hand boven het hoofd houden' (to protect someone)."
                }
              ],
              practice: [
                "Learn five new idioms per week and use each in a sentence.",
                "Watch a Dutch comedy show and note the idioms used.",
                "Replace literal expressions with idiomatic ones in writing.",
                "Keep an idiom journal with examples and English equivalents.",
                "Learn 5 idioms this week and use each in a written sentence.",
                "Replace literal expressions in a paragraph with idiomatic ones."

              ]
            },
            examples: [
              { dutch: "Het regent pijpenstelen.", guide: "het ray-khent pay-pen-stay-len", meaning: "It is raining cats and dogs." },
              { dutch: "Dat is appeltje-eitje.", guide: "daht is ah-pel-tje-ay-tje", meaning: "That is a piece of cake." },
              { dutch: "Ik heb een knoop in mijn maag.", guide: "ik hep un knohp in mayn mahkh", meaning: "I have butterflies in my stomach." },
              { dutch: "Hij heeft iets op zijn lever.", guide: "hay hayft eets op zayn lay-ver", meaning: "He has something on his chest (bothered)." },
              { dutch: "We moeten de kat uit de boom kijken.", guide: "we moe-ten de kat oyt de bohm kay-ken", meaning: "We should wait and see (literally: watch the cat out of the tree)." },
              { dutch: "Hij stak zijn nek uit voor mij.", guide: "hay stak zayn nek oyt vor may", meaning: "He stuck his neck out for me." },
              { dutch: "Dat slaat als een tang op een varken.", guide: "daht slaht als un tang op un var-ken", meaning: "That makes no sense." },
              { dutch: "Ik ben er als de kippen bij.", guide: "ik ben er als de ki-pen bij", meaning: "I am quick to act." },

            ]
          },
          {
            title: "Dutch Humor",
            summary: "Understand and participate in Dutch humor.",
            content: {
              objective: "Recognize Dutch humor patterns and tell a simple joke in Dutch.",
              sections: [
                {
                  heading: "Directness and humor",
                  body: "Dutch humor is direct, often sarcastic, and self-deprecating. 'Doe maar normaal, dan doe je al gek genoeg' (Just act normal, that is already crazy enough) is a famous Dutch saying."
                },
                {
                  heading: "Irony and understatement",
                  body: "The Dutch use irony and understatement frequently. 'Het is niet niets' (It is not nothing) means 'it is quite serious'. 'Ja, ja' said with flat intonation means skepticism."
                },
                {
                  heading: "Wordplay",
                  body: "Dutch loves puns. 'Zij heeft een lang verhaal kort gemaakt' (She made a long story short). Listen for double meanings. Dutch comedy shows like 'Dit was het nieuws' are full of wordplay."
                }
              ],
              practice: [
                "Watch a Dutch comedy show and note the humor style.",
                "Learn three Dutch jokes and practice telling them.",
                "Practice using understatement in your own speech.",
                "Notice when Dutch speakers are being ironic — the tone matters.",
                "Watch a Dutch comedy show and note three jokes or funny moments.",
                "Try telling a simple Dutch joke to a friend and see their reaction."

              ]
            },
            examples: [
              { dutch: "Doe maar normaal, dan doe je al gek genoeg.", guide: "doo mahr nor-mahl, dan doo yuh al khek khe-nookh", meaning: "Just act normal, that is already crazy enough." },
              { dutch: "Het was niet niets.", guide: "het was neet neets", meaning: "It was quite something (understatement)." },
              { dutch: "Grapperig, hè?", guide: "khra-pe-rekh, heh", meaning: "Funny, isn't it?" },
              { dutch: "Nou, mooi is anders.", guide: "now, moy is an-ders", meaning: "Well, 'nice' is not the word I would use (sarcastic)." },
              { dutch: "Hou je mond, of je krijgt een kus!", guide: "hou yuh mont, of yuh krayft un kus", meaning: "Shut up or you'll get a kiss! (playful teasing)" },
              { dutch: "Doe maar gewoon, dan doe je al gek genoeg.", guide: "doo mahr khe-wohn, dan doo yuh al khek khe-nookh", meaning: "Just act normal, that is already crazy enough." },
              { dutch: "Een Nederlander heeft altijd overal een mening over.", guide: "un Nay-der-lahn-der hayft al-tayt oh-ver-al un may-ning oh-ver", meaning: "A Dutch person always has an opinion about everything." },
              { dutch: "Waarom zijn Nederlanders zo groot? Omdat ze altijd in de weer zijn.", guide: "wah-rom zayn Nay-der-lahn-ders zo khroht? om-dat ze al-tayt in de wayr zayn", meaning: "Why are Dutch people so tall? Because they are always busy." },

            ]
          },
          {
            title: "Cultural References",
            summary: "Understand Dutch cultural references and context.",
            content: {
              objective: "Recognize common Dutch cultural references and use them appropriately.",
              sections: [
                {
                  heading: "History and monarchy",
                  body: "The Dutch royal family (Oranje-Nassau) is central to national identity. King's Day (Koningsdag) on April 27 is the biggest celebration. 'Oranje' refers to both the royal family and national sports teams."
                },
                {
                  heading: "Geography and symbols",
                  body: "The Netherlands is known for: de molens (windmills), de tulpen (tulips), de kaas (cheese), de grachten (canals), de fietsen (bicycles). These are not just stereotypes — they are genuine cultural touchpoints."
                },
                {
                  heading: "Dutch values",
                  body: "The Dutch value: directness (directheid), planning, thriftiness (zuinigheid), and consensus (poldermodel). 'Overleggen' (discuss/consult) is a key cultural practice. Understanding these values helps you navigate social situations."
                }
              ],
              practice: [
                "Learn about Koningsdag and describe it in Dutch.",
                "Research three famous Dutch historical figures.",
                "Discuss Dutch cultural values with a language partner.",
                "Watch a Dutch documentary about Dutch culture and summarize it.",
                "Research and describe Sinterklaas in Dutch (5 sentences).",
                "Explain the Dutch polder model to someone in Dutch."

              ]
            },
            examples: [
              { dutch: "Koningsdag is de grootste feestdag in Nederland.", guide: "koh-nings-dakh is de krhoot-ste fayst-dakh in Nay-der-lant", meaning: "King's Day is the biggest celebration in the Netherlands." },
              { dutch: "Typisch Nederlands: een direct antwoord.", guide: "tee-pish Nay-der-lahnts: un dee-rekt ant-wohrt", meaning: "Typically Dutch: a direct answer." },
              { dutch: "De molens en tulpen zijn wereldberoemd.", guide: "de moh-lens en tul-pen zayn way-reld-be-roemt", meaning: "The windmills and tulips are world-famous." },
              { dutch: "Nederlanders staan bekend om hun zuinigheid.", guide: "Nay-der-lahn-ders staahn be-kent om hun zuy-nikh-hayt", meaning: "The Dutch are known for their thriftiness." },
              { dutch: "Oranje boven!", guide: "oh-ran-yeh boh-ven", meaning: "Orange above! (cheer for the royal family/sports teams)" },
              { dutch: "Sinterklaas komt elk jaar uit Spanje met de stoomboot.", guide: "Sin-ter-klahs komt elk yaar oyt Span-ye met de stohtm-boht", meaning: "Sinterklaas comes from Spain every year by steamboat." },
              { dutch: "Nederland staat bekend om zijn polders en dijken.", guide: "Nay-der-lant staht be-kent om zayn pol-ders en day-ken", meaning: "The Netherlands is known for its polders and dikes." },
              { dutch: "Typisch Nederlands: overal fietsen en kaas bij het ontbijt.", guide: "tee-pish Nay-der-lahnts: oh-ver-al feet-sen en kahs bij het ont-bayt", meaning: "Typically Dutch: bicycles everywhere and cheese at breakfast." },

            ]
          }
        ]
      },
      {
        title: "11.3 Professional Fluency",
        description: "Use Dutch in professional and academic contexts.",
        lessons: [
          {
            title: "Working in Dutch",
            summary: "Use Dutch effectively in workplace settings.",
            content: {
              objective: "Handle workplace conversations: meetings, emails, and professional small talk in Dutch.",
              sections: [
                {
                  heading: "Meeting vocabulary",
                  body: "'Ik stel voor dat...' (I propose that...), 'Zijn er nog vragen?' (Are there any questions?), 'Laten we de punten samenvatten' (Let's summarize the points). Use 'u' with superiors and clients."
                },
                {
                  heading: "Professional small talk",
                  body: "'Hoe gaat het met het project?' (How is the project going?), 'Heb je een fijn weekend gehad?' (Did you have a nice weekend?), 'Ik waardeer je inbreng' (I appreciate your input)."
                },
                {
                  heading: "Handling problems",
                  body: "'We hebben een probleem met...' (We have a problem with...), 'Kunnen we een oplossing vinden?' (Can we find a solution?), 'Ik stel voor om...' (I propose to...). Stay solution-oriented."
                }
              ],
              practice: [
                "Role-play a team meeting discussing a project.",
                "Write a professional email to a colleague in Dutch.",
                "Practice giving feedback in a constructive, polite way.",
                "Learn the formal register for presentations and proposals.",
                "Role-play a performance review conversation with your manager in Dutch.",
                "Write a professional LinkedIn summary in Dutch."

              ]
            },
            examples: [
              { dutch: "Ik stel voor dat we dit bespreken in de vergadering.", guide: "ik stel vor daht we dit be-spray-ken in de fer-khah-de-ring", meaning: "I propose that we discuss this in the meeting." },
              { dutch: "Zijn er nog vragen of opmerkingen?", guide: "zayn er nokh vrah-gen of op-mer-king-en", meaning: "Are there any questions or comments?" },
              { dutch: "Ik waardeer je harde werk aan dit project.", guide: "ik wahr-dayr yuh har-de werk aan dit proh-jekt", meaning: "I appreciate your hard work on this project." },
              { dutch: "Kunnen we een deadline voorstellen?", guide: "ku-nen we un ded-layn vor-ste-len", meaning: "Can we propose a deadline?" },
              { dutch: "Laten we de actiepunten samenvatten.", guide: "lah-ten we de ak-see-pun-ten sah-men-va-ten", meaning: "Let's summarize the action points." },
              { dutch: "Ik wil graag een afspraak maken om de voortgang te bespreken.", guide: "ik wil khrahkh un af-spraak mah-ken om de vohrt-gang te be-spray-ken", meaning: "I would like to make an appointment to discuss the progress." },
              { dutch: "Het project loopt volgens schema.", guide: "het proh-jekt lohpt vol-khens skhay-mah", meaning: "The project is on schedule." },
              { dutch: "Kunnen we de deadline met een week verlengen?", guide: "ku-nen we de ded-layn met un wayk fer-leng-en", meaning: "Can we extend the deadline by a week?" },

            ]
          },
          {
            title: "Academic Dutch",
            summary: "Use Dutch for academic reading, writing, and discussion.",
            content: {
              objective: "Read an academic text in Dutch and participate in a discussion about it.",
              sections: [
                {
                  heading: "Academic vocabulary",
                  body: "'De hypothese' (hypothesis), 'de analyse' (analysis), 'de conclusie' (conclusion), 'het onderzoek' (research), 'de theorie' (theory). Many academic words are similar to English."
                },
                {
                  heading: "Academic writing style",
                  body: "Academic Dutch uses formal register, passive voice, and complex sentences. 'In dit onderzoek wordt aangetoond dat...' (This research demonstrates that...). Avoid personal opinions."
                },
                {
                  heading: "Academic discussion",
                  body: "'Ik zou willen betogen dat...' (I would like to argue that...), 'Dit sluit aan bij de theorie van...' (This aligns with the theory of...), 'Een kritiek punt is...' (A critical point is...)."
                }
              ],
              practice: [
                "Read an academic abstract in Dutch and summarize it.",
                "Write a short academic paragraph using formal register.",
                "Participate in a discussion using academic phrases.",
                "Compare academic writing style with conversational Dutch.",
                "Read an academic abstract in Dutch and identify the research question, method, and conclusion.",
                "Write one paragraph in academic style about a topic you know well."

              ]
            },
            examples: [
              { dutch: "In dit onderzoek wordt de relatie tussen X en Y geanalyseerd.", guide: "in dit on-der-zook wort de re-lah-tsee tus-sen X en Y khe-ah-nah-lee-zayrt", meaning: "This research analyzes the relationship between X and Y." },
              { dutch: "De resultaten tonen een significant verband aan.", guide: "de ray-zul-tah-ten toh-nen un sig-ni-fi-kant fer-bant ahn", meaning: "The results show a significant correlation." },
              { dutch: "Ik zou willen betogen dat deze theorie niet volledig is.", guide: "ik zow wi-len be-toh-khen daht day-ze tay-oh-ree neet vo-le-dikh is", meaning: "I would like to argue that this theory is not complete." },
              { dutch: "Dit sluit aan bij eerder onderzoek op dit gebied.", guide: "dit sluit ahn bij ay-der on-der-zook op dit khe-beet", meaning: "This aligns with previous research in this area." },
              { dutch: "Concluderend kunnen we stellen dat verder onderzoek nodig is.", guide: "kon-klu-day-rend kun-nen we ste-len daht fer-der on-der-zook noh-dikh is", meaning: "In conclusion, we can state that further research is needed." },
              { dutch: "De hypothese van dit onderzoek werd niet bevestigd.", guide: "de hie-poh-tee-zuh van dit on-der-zook werd neet be-fes-tikht", meaning: "The hypothesis of this research was not confirmed." },
              { dutch: "Er bestaat een significante correlatie tussen de twee variabelen.", guide: "er be-staat un sig-ni-fi-kahn-te ko-re-lah-tsee tus-sen de tvey vah-ree-ah-be-len", meaning: "There is a significant correlation between the variables." },
              { dutch: "Deze theorie wordt ondersteund door empirisch bewijs.", guide: "day-ze tay-oh-ree wort on-der-stunt dohr em-pie-rees be-wijs", meaning: "This theory is supported by empirical evidence." },

            ]
          },
          {
            title: "Social Fluency",
            summary: "Navigate social situations confidently in Dutch.",
            content: {
              objective: "Handle social gatherings, networking events, and group conversations in Dutch.",
              sections: [
                {
                  heading: "Networking and introductions",
                  body: "At events: 'Aangenaam, ik ben...' (Pleasure, I am...). 'Wat brengt jou hier?' (What brings you here?). 'Heb je een visitekaartje?' (Do you have a business card?). Follow up with common interests."
                },
                {
                  heading: "Group conversations",
                  body: "Joining a group: 'Mag ik meedoen met het gesprek?' (May I join the conversation?). 'Waar hebben jullie het over?' (What are you all talking about?). Listen before jumping in."
                },
                {
                  heading: "Politeness and social grace",
                  body: "'Dank je wel voor de uitnodiging' (Thanks for the invitation). 'Wat gezellig dat je er bent!' (How nice that you are here!). 'Volgende keer bij mij!' (Next time at my place!)."
                }
              ],
              practice: [
                "Role-play a networking event with multiple people.",
                "Practice joining a group conversation that is already in progress.",
                "Learn the social ritual of saying goodbye to everyone at a gathering.",
                "Attend a real Dutch social event and use your skills.",
                "Practice introducing yourself at a networking event and making small talk.",
                "Attend a Dutch-speaking event (online or in person) and use only Dutch."

              ]
            },
            examples: [
              { dutch: "Aangenaam, ik ben Claire. Wat brengt jou hier?", guide: "ahn-khe-nahm, ik ben Claire. Wat brengt yow heer", meaning: "Pleased to meet you, I am Claire. What brings you here?" },
              { dutch: "Mag ik meedoen met het gesprek?", guide: "makh ik may-doen met het khe-sprek", meaning: "May I join the conversation?" },
              { dutch: "Wat gezellig dat je er bent!", guide: "wat khe-ze-lekh daht yuh er bent", meaning: "How nice that you are here!" },
              { dutch: "We moeten snel een keer afspreken!", guide: "we moe-ten snel un kayr af-spray-ken", meaning: "We must meet up sometime soon!" },
              { dutch: "Bedankt voor de gezellige avond!", guide: "be-dankt vor de khe-ze-le-khe ah-vont", meaning: "Thanks for the lovely evening!" },
              { dutch: "Mag ik me voorstellen? Ik ben Thomas, de nieuwe collega.", guide: "makh ik me vor-ste-len? ik ben Thomas, de nee-uwe ko-lay-khah", meaning: "May I introduce myself? I am Thomas, the new colleague." },
              { dutch: "Leuk om kennis met je te maken!", guide: "luhk om ke-nis met yuh te mah-ken", meaning: "Nice to meet you!" },
              { dutch: "Ik hoop dat we goed kunnen samenwerken.", guide: "ik hohp daht we khroot ku-nen sah-men-wer-ken", meaning: "I hope we can work well together." },

            ]
          }
        ]
      }
    ]
  };
}

