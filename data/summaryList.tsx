export const reflectionMessages = {
  Peaceful: [
    "Calm is its own kind of strength. Carry it gently today.",
    "You're starting from a steady place — that's worth protecting.",
    "Peace doesn't need to be earned. You already have it right now.",
  ],
  Powerful: [
    "Something in you is ready. Trust that energy today.",
    "You're showing up with force — use it where it matters most.",
    "That strength isn't accidental. You've been building it.",
  ],
  Sad: [
    "Showing up is one of the quiet acts of courage. You did it.",
    "Sadness means something mattered. That's not weakness.",
    "You don't have to feel better to take good care of yourself.",
  ],
  Joyful: [
    "Let this feeling be enough — no need to chase more.",
    "Joy is worth noticing slowly. Don't rush past it.",
    "Something is working. Let yourself feel that fully.",
  ],
  Scared: [
    "Fear and action can coexist. You're proving that right now.",
    "You checked in even while scared. That's strength.",
    "Courage doesn't wait for the fear to leave.",
  ],
  Mad: [
    "Anger is information. You're listening to it without being ruled by it.",
    "You made space for yourself even while something was burning. That matters.",
    "Noticing anger clearly is the first step to carrying it well.",
  ],
  Unsure: [
    "Not knowing is an honest place to start.",
    "You showed up without certainty. That's enough.",
    "Uncertainty means you're in new territory. That's not wrong.",
  ],
  Tired: [
    "Rest is not a reward. You're allowed to need it.",
    "You honored your limits today. That's self-compassion, not weakness.",
    "Even a tired version of you still showed up. That counts.",
  ],
};

const mantraMessages = [
  "Today, move at your own pace.",
  "The day doesn't need perfection — just presence.",
  "One steady breath at a time is enough.",
  "You've already done something good for yourself.",
  "Small and consistent outlasts big and occasional.",
  "Carry what you noticed into the rest of your day.",
  "You don't have to have it all figured out.",
  "Gentle is a valid way to move through the world.",
  "Something in you chose to show up today.",
  "You're allowed to take up space and take your time.",
  "Progress doesn't always look like motion.",
  "You're doing better than the noise suggests.",
  "This moment was yours. The next one can be too.",
];

const goodJobMessages = [
  "Well Done!",
  "Great Job!",
  "Awesome Work!",
  "Fantastic Effort!",
  "Keep it Up!",
  "You're Crushing It!",
  "Superb!",
  "Excellent!",
  "Brilliant!",
  "Way to Go!",
];

function getRandomMessage(messages: string[]) {
  if (!messages || messages.length === 0) return "";
  const index = Math.floor(Math.random() * messages.length);
  return messages[index];
}

export function getReflectionMessage(mood: keyof typeof reflectionMessages) {
  const messages = reflectionMessages[mood];
  return getRandomMessage(messages);
}

export function getMantraMessage() {
  return getRandomMessage(mantraMessages);
}

export function getGoodJobMessage() {
  return getRandomMessage(goodJobMessages);
}
