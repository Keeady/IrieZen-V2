
export const JOURNAL_PROMPTS: Record<
  string,
  { prompt: string; encouragement: string }[]
> = {
  Peaceful: [
    {
      prompt: "What has brought you a sense of peace today?",
      encouragement:
        "Notice the moments, people, or places that helped you feel at ease.",
    },
    {
      prompt: "What would you like to carry from this moment into tomorrow?",
      encouragement:
        "It can be something small or something meaningful.",
    },
  ],
  Scared: [
    {
      prompt: "What's taking up the most space in your mind right now?",
      encouragement:
        "You don't have to figure everything out. Just begin wherever you are.",
    },
    {
      prompt: "What might help you feel a little more supported?",
      encouragement:
        "Think of something within reach, even if it's small.",
    },
  ],
  Sad: [
    {
      prompt: "What has been weighing on your heart lately?",
      encouragement:
        "You can give your feelings space without needing to change them.",
    },
    {
      prompt: "What do you wish someone understood about how you're feeling?",
      encouragement:
        "This space is yours to express it.",
    },
  ],
  Joyful: [
    {
      prompt: "What made today feel meaningful or joyful?",
      encouragement:
        "Savor the moments that you'd like to remember.",
    },
    {
      prompt: "What would you love to experience more of?",
      encouragement:
        "Explore what brings you energy, connection, or happiness.",
    },
  ],
  Powerful: [
    {
      prompt: "What are you feeling inspired to move toward?",
      encouragement:
        "There is no need to turn every inspiration into a task.",
    },
    {
      prompt: "What personal strength have you noticed in yourself?",
      encouragement:
        "Celebrate progress, however small.",
    },
  ],
  Unsure: [
    {
      prompt: "What feels uncertain or difficult to name right now?",
      encouragement:
        "Not every feeling needs a clear explanation.",
    },
    {
      prompt: "What do you need more clarity about?",
      encouragement:
        "You can explore the question without finding an answer today.",
    },
  ],
  Mad: [
    {
      prompt: "What has been frustrating you lately?",
      encouragement:
        "Explore what happened and why it matters to you.",
    },
    {
      prompt: "Is there a need or boundary beneath your frustration?",
      encouragement:
        "Consider what your feelings might be drawing attention to.",
    },
  ],
  Mixed: [
    {
      prompt: "What different feelings are showing up for you today?",
      encouragement:
        "You can hold more than one feeling at the same time.",
    },
    {
      prompt: "What would you like to make a little more room for?",
      encouragement:
        "Start with whatever feels most important.",
    },
  ],
  Tired: [
    {
      prompt: "What's been asking the most of your energy lately?",
      encouragement:
        "You don't have to justify your need for rest.",
    },
    {
      prompt: "What would a gentler day look like for you?",
      encouragement:
        "Think about one small way to make room for yourself.",
    },
  ],
};

export function getJournalPrompt(
  coreMood: string,
  index = 0
) {
  const prompts =
    JOURNAL_PROMPTS[coreMood] ??
    JOURNAL_PROMPTS.Unsure;

  return prompts[index % prompts.length];
}
