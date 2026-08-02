export type ScreenProps = {
  onComplete: () => void;
  setSelectedMoods?: (moods: string[]) => void;
  setCoreEmotion?: (mood: string) => void;
  width: number;
  height: number;
  setSelectedEmotions?: (emotions: string[]) => void;
};

export type Insight = MoodInsight | BodyInsight | IntentionsInsight | GratitudeInsight | WinsInsight;

export type MoodInsight = {
  moods: string[];
  core: string[];
  primary: string[];
  secondary: string[];
  tertiary: string[];
};

export type BodyInsight = {
  part: string;
  side?: "left" | "right";
};

export type IntentionsInsight = {
  label: string;
  text: string;
};

export type GratitudeInsight = {
  label: string;
  text: string;
};

export type WinsInsight = {
  label: string;
  text: string;
};

export type BodySide = "front" | "back";

export type DailyInsight = {
  date: string;
  moods: MoodInsight;
  body: BodyInsight[];
  breath: string;
  intentions: IntentionsInsight[];
  gratitude: GratitudeInsight[];
  wins: WinsInsight[];
};