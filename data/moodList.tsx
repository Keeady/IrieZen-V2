export type PrimaryMood = {
  label: string;
  icon: string;
  core: string;
  valence: "positive" | "neutral" | "negative";
  energy: "low" | "medium" | "high" | "varied";
  bg: string;
  border: string;
  text: string;
};

export const neutral = ["tired", "sad", "unsure", "mixed"];
export const negative = ["mad", "scared"];
export const positive = ["powerful", "peaceful", "joyful"];

export const primaryMoods: PrimaryMood[] = [
  {
    label: "Calm",
    icon: "emoticon-happy-outline",
    core: "Peaceful",
    valence: "positive",
    energy: "low",
    bg: "#08f2b4",       // rich mint
    border: "#1A9E74",   // vivid emerald
    text: "#0D4F3A"
  },
  {
    label: "Restless",
    icon: "emoticon-frown-outline",
    core: "Scared",
    valence: "neutral",
    energy: "high",
    bg: "#8107f4",       // rich lavender
    border: "#7B2DE8",   // vivid violet
    text: "#2D0A5C" 
  },
  {
    label: "Sad",
    icon: "emoticon-cry-outline",
    core: "Sad",
    valence: "neutral",
    energy: "low",
    bg: "#064bf8",       // rich periwinkle
    border: "#2D4FE8",   // vivid cobalt
    text: "#0D1A5C" 
  },
  {
    label: "Happy",
    icon: "emoticon-happy-outline",
    core: "Joyful",
    valence: "positive",
    energy: "low",
    bg: "#f64d05",       // rich peach
    border: "#E84D1C",   // vivid coral-red
    text: "#5C1A00" 
  },
  {
    label: "Motivated",
    icon: "emoticon-cool-outline",
    core: "Powerful",
    valence: "positive",
    energy: "high",
    bg: "#f8b304",       // rich amber
    border: "#E08C00",   // vivid gold
    text: "#3D2800" 
  },
  {
    label: "Stressed",
    icon: "emoticon-frown-outline",
    core: "Scared",
    valence: "negative",
    energy: "high",
    bg: "#f70909",       // rich rose
    border: "#E81C1C",   // vivid red
    text: "#5C0000" 
  },
  {
    label: "Alone",
    icon: "emoticon-frown-outline",
    core: "Sad",
    valence: "neutral",
    energy: "low",
    bg: "#840af6",       // rich lavender
    border: "#7B2DE8",   // vivid violet
    text: "#2D0A5C" 
  },
  {
    label: "Meh",
    icon: "emoticon-neutral-outline",
    core: "Unsure",
    valence: "neutral",
    energy: "low",
    bg: "#df0c0c",       // rich grey
    border: "#606060",   // vivid charcoal
    text: "#1A1A1A" 
  },
  {
    label: "Hopeful",
    icon: "emoticon-excited-outline",
    core: "Joyful",
    valence: "positive",
    energy: "medium",
    bg: "#ff7300",       // rich peach
    border: "#E84D1C",   // vivid coral-red
    text: "#5C1A00" 
  },
  {
    label: "Frustrated",
    icon: "emoticon-angry-outline",
    core: "Mad",
    valence: "negative",
    energy: "high",
    bg: "#f80c0c",       // rich rose
    border: "#E81C1C",   // vivid red
    text: "#5C0000" 
  },
  {
    label: "A Lot",
    icon: "emoticon-dead-outline",
    core: "Mixed",
    valence: "neutral",
    energy: "varied",
    bg: "#f90c0c",       // rich rose
    border: "#E81C1C",   // vivid red
    text: "#5C0000" 
  },
  {
    label: "Tired",
    icon: "emoticon-neutral-outline",
    core: "Tired",
    valence: "neutral",
    energy: "low",
    bg: "#0a78e6",       // rich slate
    border: "#2D6A9E",   // vivid steel blue
    text: "#0D2A3D" 
  },
];

export const secondaryMoods = {
  Peaceful: [
    "Peaceful",
    "Balanced",
    "Spent",
    "Relaxed",
    "Grateful",
    "Relieved",
    "At ease",
    "Restful",
  ],
  Powerful: [
    "Proud",
    "Respected",
    "Focused",
    "Appreciated",
    "Confident",
    "Determined",
    "Energetic",
    "Successful",
  ],
  Sad: [
    "Disappointed",
    "Lonely",
    "Fatigued",
    "Heartbroken",
    "Hopeless",
    "Missing someone",
    "Jaded",
    "Down",
  ],
  Joyful: [
    "Excited",
    "Cheerful",
    "Playful",
    "Lighthearted",
    "Fulfilled",
    "Proud",
  ],
  Scared: [
    "Confused",
    "Rejected",
    "Helpless",
    "Uncertain",
    "Insecure",
    "Anxious",
    "Overwhelmed",
    "Pressured",
  ],
  Mad: [
    "Irritated",
    "Annoyed",
    "Defensive",
    "Resentful",
    "Hurt",
    "Fed up",
    "Angry",
    "Impatient",
  ],
  Unsure: [
    "Confused",
    "Numb",
    "Torn",
    "Reflective",
    "Curious",
    "Drained",
    "Bored",
    "Unsure",
    "Quiet",
    "Indifferent",
  ],
};

export const secondaryMixedMoods = {
  Calm: ["Joyful"],
  Stressed: ["Mad", "Sad"],
  Sad: ["Scared"],
  Motivated: ["Joyful"],
  Restless: ["Mad"],
  Alone: ["Scared"],
  Happy: ["Peaceful"],
  Hopeful: ["Peaceful", "Powerful"],
  Frustrated: ["Sad"],
  Meh: ["Sad", "Scared", "Peaceful"],
  "A Lot": ["Mad", "Powerful", "Scared", "Joyful", "Sad", "Peaceful"],
  Tired: ["Peaceful", "Sad", "Scared"],
};

export const tertiaryMoods = {
  Peaceful: [
    "Satisfied",
    "Content",
    "Relaxed",
    "Pensive",
    "Responsive",
    "Serene",
    "Secure",
    "Thankful",
    "Grounded",

    // related to calm/open
    "Open",
    "Centered",
    "Fulfilled",
    "Patient",
    "Present",

    // related to tenderness
    "Caring",
    "Reflective",
    "Self-loving",
    "Vulnerable",
    "Warm",
    "Resting",
    "Clear",
    "Winding down",
    "Letting go",
    "Ready to rest",
    "At peace",
    "Ready to recharge",
    "Overextended",
    "Sleepy",
    "Unplugging",
    "Slowing down",
    "Accomplished",
  ],
  Powerful: [
    "Surprised",
    "Successful",
    "Worthwhile",
    "Confident",
    "Discerning",
    "Valuable",
    "Aware",

    // More detailed powerful/empowered moods
    "Adventurous",
    "Brave",
    "Capable",
    "Daring",
    "Determined",
    "Free",
    "Grounded",
    "Strong",
    "Worthy",
    "Valiant",
    "Courageous",
    "Accepted",
    "Appreciated",
    "Empowered",
    "Assertive",
    "Important",

    // related to gratitude
    "Appreciative",
    "Blessed",
    "Delighted",
    "Fortunate",
    "Grace",
    "Humbled",
    "Lucky",
    "Moved",
    "Thankful",
    "Touched",
    "Faithful",
  ],
  Sad: [
    "Remorseful",
    "Stupid",
    "Inferior",
    "Isolated",
    "Apathetic",
    "Sleepy",
    "Tender",
    // More detailed sad moods
    "Anguish",
    "Despondent",
    "Disappointed",
    "Discouraged",
    "Forlorn",
    "Gloomy",
    "Grief",
    "Heartbroken",
    "Hopeless",
    "Longing",
    "Melancholy",
    "Sorrow",
    "Teary",
    "Unhappy",
    "Upset",
    "Weary",
    "Yearning",
    "Abandoned",
    // more disconnected / numb
    "Aloof",
    "Distant",
    "Empty",
    "Indifferent",
    "Lethargic",
    "Listless",
    "Removed",
    "Resistant",
    "Shut Down",
    "Uneasy",
    "Withdrawn",
    "Numb",
    // related to shame/embarrassment
    "Humiliated",
    "Inhibited",
    "Mortified",
    "Self-conscious",
    "Useless",
    "Weak",
    "Worthless",
    "Embarrassed",
    // related to guilt
    "Regret",
    "Sorry",
    "Guilty",
    "Ashamed",
    "Depressed",
    "Lonely",
    "Bored",
    "Despair",
    "Spent",
    "Unfocused",
    "Unmotivated",
    "Tense",
    "Disconnected",
  ],
  Joyful: [
    "Daring",
    "Fascinating",
    "Stimulating",
    "Amused",
    "Playful",
    "Optimistic",

    // More detailed joyful/happy moods
    "Amazed",
    "Awe",
    "Bliss",
    "Delighted",
    "Eager",
    "Ecstatic",
    "Enchanted",
    "Energized",
    "Engaged",
    "Enthusiastic",
    "Free",
    "Happy",
    "Inspired",
    "Invigorated",
    "Lively",
    "Passionate",
    "Radiant",
    "Refreshed",
    "Rejuvenated",
    "Renewed",
    "Satisfied",
    "Thrilled",
    "Vibrant",

    // related to curiosity
    "Exploring",
    "Fascinated",
    "Interested",
    "Intrigued",
    "Involved",
    "Stimulated",

    // related to hope
    "Encouraged",
    "Expectant",
    "Trusting",
    "Creative",
  ],
  Scared: [
    "Bewildered",
    "Discouraged",
    "Insignificant",
    "Inadequate",
    "Embarrassed",
    "Overwhelmed",
    "Overworked",

    // More detailed scared/fearful moods
    "Afraid",
    "Apprehensive",
    "Frightened",
    "Hesitant",
    "Nervous",
    "Panic",
    "Paralyzed",
    "Scared",
    "Terrified",
    "Worried",
    "Sensitive",
    "Horrified",

    // related to stress
    "Burned out",
    "Cranky",
    "Depleted",
    "Edgy",
    "Exhausted",
    "Frazzled",
    "Rattled",
    "Rejecting",
    "Restless",
    "Shaken",
    "Tight",
    "Weary",
    "Worn out",
    "Drained",
    "Slow",

    // related to doubt
    "Concerned",
    "Dissatisfied",
    "Disturbed",
    "Grouchy",
    "Inhibited",
    "Perplexed",
    "Questioning",
    "Reluctant",
    "Shocked",
    "Skeptical",
    "Suspicious",
    "Ungrounded",
    "Unsure",
    "Submissive",
    "Cautious",
    "Alert",
    "Conflicted",
    "Scattered",
  ],
  Mad: [
    "Distant",
    "Sarcastic",
    "Frustrated",
    "Jealous",
    "Irritated",
    "Skeptical",

    // More detailed mad/anger moods
    "Agitated",
    "Aggravated",
    "Bitter",
    "Contempt",
    "Cynical",
    "Disdain",
    "Disgruntled",
    "Disturbed",
    "Edgy",
    "Exasperated",
    "Furious",
    "Grouchy",
    "Impatient",
    "Irate",
    "Moody",
    "On edge",
    "Outraged",
    "Pissed",
    "Resentful",
    "Upset",
    "Vindictive",
    "Appalled",
    "Annoyed",
    "Hostile",
    "Angry",
    "Selfish",
    "Hateful",
    "Critical",
  ],
};

const moodIntroMessages = {
  calm: [
    "You’re in a moment of ease — notice the stillness around you.",
    "You feel settled — like a quiet breath between moments.",
    "There’s calm within you — let it hold you for a while.",
  ],
  joyful: [
    "You’re feeling light and uplifted — let yourself enjoy it fully.",
    "Something bright is shining through — let it warm your day.",
    "Joy’s visiting in small ways — notice where it lands.",
  ],
  restless: [
    "There’s energy stirring — maybe something inside wants movement or change.",
    "You feel unsettled — a sign something’s ready to shift.",
    "Your mind’s buzzing — pause to see what it’s trying to tell you.",
  ],
  sad: [
    "Something feels tender right now — it’s okay to hold space for it.",
    "You’re moving through something soft and heavy — take it slowly.",
    "Sadness often speaks quietly — let it say what it needs to.",
  ],
  motivated: [
    "You’re feeling that spark — a good moment to take small, meaningful steps.",
    "Energy’s rising — channel it gently toward what matters most.",
    "You feel capable and ready — momentum starts with one calm move.",
  ],
  stressed: [
    "You’re holding a lot — take a slow breath before continuing.",
    "Things might feel tight — soften your shoulders and exhale.",
    "Even in stress, you’re doing your best — give yourself credit for that.",
  ],
  alone: [
    "You might be feeling distant — gently turn your attention inward.",
    "It’s okay to feel disconnected — awareness is the first step back.",
    "You’re a bit out of sync — small grounding moments can help you return.",
  ],
  meh: [
    "It’s one of those in-between days — steady and neutral is okay too.",
    "Not every moment needs to shine — being here is enough.",
    "You’re coasting gently — there’s peace even in ‘meh’.",
  ],
  hopeful: [
    "You’re looking ahead with trust — keep that quiet light close.",
    "Hope is softly glowing — let it guide you one step at a time.",
    "Something in you believes in what’s possible — nurture that spark.",
  ],
  frustrated: [
    "Things aren’t flowing easily — pause and give yourself grace.",
    "You’re bumping up against resistance — that’s part of the process.",
    "Frustration shows you care — take a breath before trying again.",
  ],
  "a lot": [
    "You’re feeling a mix today — emotions can blend, and that’s perfectly normal.",
    "It’s a swirl of feelings — notice each one without needing to sort them.",
    "You’re carrying many layers — all of them belong in this moment.",
  ],
  tired: [
    "You’ve given a lot — it’s okay to rest and recharge your energy.",
    "Your body’s asking for softness — slow down where you can.",
    "Tired can mean you’ve lived fully — let today be gentle on you.",
  ],
};

export function getMoodIntroMessage(mood: string): string {
  const messages =
    moodIntroMessages[
      mood.toLocaleLowerCase() as keyof typeof moodIntroMessages
    ];
  if (messages && messages.length > 0) {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }
  return "Naming your feelings helps you understand them better.";
}

const moodTitlePrompts = [
  "How are you feeling right now?",
  "What's present for you today?",
  "Where are you landing this moment?",
  "What's the weather inside? ☁️",
  "How's your heart today?",
  "What feeling is closest to the surface?",
  "Check in — what's here right now?",
  "What are you carrying today?",
  "What's true for you right now?",
  "How does this moment feel?",
  "What's alive in you today?",
  "What's your body telling you?",
  "How are you, really?",
  "What's underneath the surface today?",
  "Where are you right now?",
  "What color is your mood today?",
  "What's the texture of this moment?",
];

export function getRandomMoodTitlePrompt(): string {
  const randomIndex = Math.floor(Math.random() * moodTitlePrompts.length);
  return moodTitlePrompts[randomIndex];
}

const breathingIntroMessages = [
  "Let your breath lead the way.",
  "In. Hold. Out. Just this.",
  "Follow the circle. Nothing else.",
  "Your breath is already slowing down.",
  "Let the rhythm carry you.",
  "Soften. The rest can wait.",
  "Just breathe. That's enough.",
];

export function getRandomBreathingIntroMessage(): string {
  const randomIndex = Math.floor(Math.random() * breathingIntroMessages.length);
  return breathingIntroMessages[randomIndex];
}

const gratitudeIntroMessages = [
  "Something good is already here.",
  "What feels like enough right now?",
  "A moment worth holding onto.",
  "What's quietly working in your favor?",
  "Noticing what's genuinely good.",
  "What would you hate to take for granted?",
  "Something small, something real.",
];

export function getRandomGratitudeIntroMessage(): string {
  const randomIndex = Math.floor(Math.random() * gratitudeIntroMessages.length);
  return gratitudeIntroMessages[randomIndex];
}

const focusIntroMessages = [
  "One thing to carry into your day.",
  "What would make today feel complete?",
  "A gentle intention goes a long way.",
  "What do you want to bring more of today?",
  "Something worth holding onto today.",
  "What does a good day look like for you?",
  "One small focus can change everything.",
];

export function getRandomFocusIntroMessage(): string {
  const randomIndex = Math.floor(Math.random() * focusIntroMessages.length);
  return focusIntroMessages[randomIndex];
}

const winsIntroMessages = [
  "Something went right. What was it?",
  "You showed up. That counts.",
  "Even small wins deserve a moment.",
  "What's worth a quiet nod today?",
  "Progress looks different every day.",
  "What did you do that was hard, or kind, or brave?",
  "Resting is a win too.",
];

export function getRandomWinsIntroMessage(): string {
  const randomIndex = Math.floor(Math.random() * winsIntroMessages.length);
  return winsIntroMessages[randomIndex];
}

const reflectionIntroMessages = [
  "A quiet moment with yourself.",
  "Just noticing what's here.",
  "Sitting with what's true right now.",
  "No fixing. Just feeling.",
  "A pause before moving on.",
  "What's present doesn't need to be solved.",
  "Gently turning inward.",
];

export function getRandomReflectionIntroMessage(): string {
  const randomIndex = Math.floor(
    Math.random() * reflectionIntroMessages.length,
  );
  return reflectionIntroMessages[randomIndex];
}

const gratitudeLabelPrompts = [
  "A moment that made me smile today...",
  "Someone who made things a little easier...",
  "Something small I usually overlook...",
  "A comfort I'm glad existed today...",
  "One thing that went better than expected...",
  "Something that made today feel more alive...",
  "A person I'm quietly thankful for...",
  "Something that brought me a sense of calm...",
  "A small thing I'd miss if it were gone...",
  "One moment I wouldn't trade today...",
  "Something that made me feel less alone...",
  "A simple pleasure I got to enjoy...",
];

export function getRandomGratitudeLabelPrompt(): string {
  const randomIndex = Math.floor(Math.random() * gratitudeLabelPrompts.length);
  return gratitudeLabelPrompts[randomIndex];
}

const focusLabelPrompts = [
  "Today I want to show up as...",
  "One thing I want to be more of today...",
  "I want to make space for...",
  "Today I'll try to let go of...",
  "Something I want to bring my full attention to...",
  "One way I want to be kind to myself today...",
  "Today feels like a good day to...",
  "I want to move through today with...",
  "One thing that would make today feel meaningful...",
  "Something I want to notice more of today...",
  "Today I choose to focus on...",
  "I want to hold onto...",
];

export function getRandomFocusLabelPrompt(): string {
  const randomIndex = Math.floor(Math.random() * focusLabelPrompts.length);
  return focusLabelPrompts[randomIndex];
}

const winsLabelPrompts = [
  "Something I did that took effort...",
  "A moment I handled better than I expected...",
  "I showed up for myself by...",
  "Something I finished, started, or let go of...",
  "I was kind to myself when I...",
  "Something small that still counts...",
  "I gave myself permission to...",
  "A habit I kept, even just once...",
  "Something I did despite not feeling like it...",
  "I took care of myself by...",
  "One thing I can quietly be proud of...",
  "I made space for myself by...",
];

export function getRandomWinsLabelPrompt(): string {
  const randomIndex = Math.floor(Math.random() * winsLabelPrompts.length);
  return winsLabelPrompts[randomIndex];
}

const bodySensationIntroMessages = [
  "Where are these feelings living in you?",
  "What is your body holding right now?",
  "Where do these settle inside you?",
  "Your body is carrying something. Where?",
  "Notice where these land in your body.",
  "Where are you feeling all of this?",
  "What does your body want you to notice?",
  "Where are you carrying these right now?",
  "These feelings live somewhere. Where?",
  "Tune in. Where does your body speak?",
];

export function getBodySensationIntroMessage(): string {
  const randomIndex = Math.floor(
    Math.random() * bodySensationIntroMessages.length,
  );
  return bodySensationIntroMessages[randomIndex];
}
