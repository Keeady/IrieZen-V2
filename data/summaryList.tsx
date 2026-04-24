export const reflectionMessages = {
  Peaceful: [
    "You seem calm and focused today — a lovely place to begin.",
    "Your sense of peace is a strong foundation for the day ahead.",
    "You’re carrying a peaceful energy — let it guide your actions today.",
  ],
  Powerful: [
    "Your energy is radiant today! Let’s channel that positivity.",
    "You’re starting the day with strength and confidence. Embrace it!",
    "Your powerful mindset is a great asset — use it to fuel your day.",
  ],
  Sad: [
    "You took time to center yourself even while feeling sad. That’s care in action.",
  ],
  Joyful: [
    "Your energy feels hopeful — remember to carry that light through your day.",
  ],
  Scared: [
    "You noticed your fear and still checked in. That’s strength in vulnerability.",
  ],
  Mad: [
    "You’re aware of your anger and still making space for yourself. Well done.",
  ],
  Unsure: [
    "You’re embracing uncertainty and still being kind to yourself. That’s growth.",
    "You’re taking a step forward even when you’re not sure.",
    "You’re showing up for yourself despite the uncertainty. That’s courage.",
  ],
  Tired: [
    "You acknowledged your tiredness and still made time for self-care. That’s important.",
    "You’re honoring your need for rest while still being kind to yourself.",
  ],
};

const mantraMessages = [
  "Today, move at your own pace.",
  "You’ve already done something good for yourself by checking in.",
  "The day doesn’t need perfection, just presence.",
  "One steady breath at a time is more than enough.",
  "Carry your awareness into each small moment.",
  "Every step counts — you showed up today.",
  "Small progress is still progress 🌱.",
  "Consistency is more powerful than intensity.",
  "You’re building a habit of care for yourself.",
  "Even a single breath can shift your day.",
  "You’re doing better than you think.",
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
