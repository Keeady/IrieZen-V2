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
 /* {
    id: "body",
    title: "Body Sensations",
    message: "Great job! Let's move on to breath work.",
  },*/
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
  /*{
    id: "breath",
    title: "Breath Work",
    message: "Great job! Let's move on to gratitude.",
  },
  {
    id: "gratitude",
    title: "Gratitude",
    message: "Great job! Let's move on to today's intention.",
  },
  {
    id: "focus",
    title: "Today's Intention",
    message: "Great job! Let's move on to yesterday's wins.",
  },
  {
    id: "wins",
    title: "Yesterday’s Wins",
    message: "Great job! Let's wrap it up",
  },*/
  {
    id: "summary",
    title: "Summary",
    message: "You've completed the morning flow!",
  },
];
