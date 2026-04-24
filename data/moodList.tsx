export type PrimaryMood = {
  label: string;
  icon: string;
  core: string;
  valence: "positive" | "neutral" | "negative";
  energy: "low" | "medium" | "high" | "varied";
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
  },
  {
    label: "Restless",
    icon: "emoticon-frown-outline",
    core: "Scared",
    valence: "neutral",
    energy: "high",
  },
  {
    label: "Sad",
    icon: "emoticon-cry-outline",
    core: "Sad",
    valence: "neutral",
    energy: "low",
  },
  {
    label: "Happy",
    icon: "emoticon-happy-outline",
    core: "Joyful",
    valence: "positive",
    energy: "low",
  },
  {
    label: "Motivated",
    icon: "emoticon-cool-outline",
    core: "Powerful",
    valence: "positive",
    energy: "high",
  },
  {
    label: "Stressed",
    icon: "emoticon-frown-outline",
    core: "Scared",
    valence: "negative",
    energy: "high",
  },
  {
    label: "Alone",
    icon: "emoticon-frown-outline",
    core: "Sad",
    valence: "neutral",
    energy: "low",
  },
  {
    label: "Meh",
    icon: "emoticon-neutral-outline",
    core: "Unsure",
    valence: "neutral",
    energy: "low",
  },
  {
    label: "Hopeful",
    icon: "emoticon-excited-outline",
    core: "Joyful",
    valence: "positive",
    energy: "medium",
  },
  {
    label: "Frustrated",
    icon: "emoticon-angry-outline",
    core: "Mad",
    valence: "negative",
    energy: "high",
  },
  {
    label: "A Lot",
    icon: "emoticon-dead-outline",
    core: "Mixed",
    valence: "neutral",
    energy: "varied",
  },
  {
    label: "Tired",
    icon: "emoticon-neutral-outline",
    core: "Tired",
    valence: "neutral",
    energy: "low",
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
  "A Lot": [
    "Mad",
    "Powerful",
    "Scared",
    "Joyful",
    "Sad",
    "Peaceful",
  ],
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
    "Disconnected"
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
  "What’s present for you right now?",
  "How’s your inner world today?",
  "What’s moving through you today?",
  "What’s the weather like inside? ☁️",
  "Take a moment — what feeling stands out?",
  "How’s your heart today?",
  "Pause and check in — where are you emotionally?",
  "What’s your current mood whispering?",
  "Let’s begin with a quick check-in.",
  "Before we start, how are you doing, really?",
  "Where are you landing this morning?",
  "How’s your energy today?",
  "What kind of day does it feel like?",
  "How’s your mind and body feeling right now?",
  "What’s alive in you at this moment?",
  "What kind of rhythm are you in today?",
];

export function getRandomMoodTitlePrompt(): string {
  const randomIndex = Math.floor(Math.random() * moodTitlePrompts.length);
  return moodTitlePrompts[randomIndex];
}

const breathingIntroMessages = [
  "Let’s take a quiet moment together.",
  "A gentle pause to find your calm.",
  "Breathe in ease, breathe out the noise.",
  "Let’s come back to center.",
  "A soft reset through your breath.",
  "Settle in. Let your breath do the rest.",
  "Find stillness in your breath.",
];

export function getRandomBreathingIntroMessage(): string {
  const randomIndex = Math.floor(Math.random() * breathingIntroMessages.length);
  return breathingIntroMessages[randomIndex];
}

const gratitudeIntroMessages = [
  "Let’s focus on what brings you joy.",
  "A moment to appreciate the good around you.",
  "Shining a light on your blessings.",
  "Cultivating thankfulness in your heart.",
  "Finding joy in the little things.",
  "Gratitude opens the door to happiness.",
  "Noticing the positive in your life.",
];

export function getRandomGratitudeIntroMessage(): string {
  const randomIndex = Math.floor(
    Math.random() * gratitudeIntroMessages.length
  );
  return gratitudeIntroMessages[randomIndex];
}

const focusIntroMessages = [
  "What’s one thing you want to bring your attention to today?",
  "Let’s set a gentle intention for your day.",
  "A small focus can lead to big changes.",
  "What’s one positive thought to carry with you?",
  "Center your mind on what matters most.",
  "A clear focus helps guide your actions.",
  "What’s one thing that would make today meaningful?",
];

export function getRandomFocusIntroMessage(): string {
  const randomIndex = Math.floor(Math.random() * focusIntroMessages.length);
  return focusIntroMessages[randomIndex];
}

const winsIntroMessages = [
  "Celebrate your progress, no matter how small.",
  "Reflecting on wins fuels future success.",
  "Every step forward is worth acknowledging.",
  "Your achievements, big and small, matter.",
  "Recognizing wins builds confidence and momentum.",
  "Look back on what you’ve accomplished with pride.",
  "Honoring your efforts encourages continued growth.",
];

export function getRandomWinsIntroMessage(): string {
  const randomIndex = Math.floor(Math.random() * winsIntroMessages.length);
  return winsIntroMessages[randomIndex];
}


