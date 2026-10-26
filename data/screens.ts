export type Screen = {
  id: string;
  title: string;
  message: string;
};

export const screens: Screen[] = [
  {
    id: "mood",
    title: "How are you feeling?",
    message: "Great job! Let's move on to body sensations.",
  },
  {
    id: "choose",
    title: "What small act of kindness will you choose today?",
    message: "Great job!"
  },
  {
    id: "selection",
    title: "selection",
    message: "selection"
  },
  {
    id: "summary",
    title: "Summary",
    message: "You've completed the morning flow!",
  },
];
