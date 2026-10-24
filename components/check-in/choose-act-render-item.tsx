import { FlatList, View } from "react-native";
import BreathScreen from "../breath/breath";
import GratitudeScreen from "../gratitude/gratitude";
import { ScreenProps } from "../screen.interface";
import GratitudeScreenItems from "./gratitude-items";
import JournalScreen from "../journal/journal-screen";
import BrainDumpScreen from "../brain-dump/brain-dump-screen";

export type KindnessActivity =
  | "breathing"
  | "gratitude"
  | "brainDump"
  | "journal";

export type KindnessOption = {
  id: KindnessActivity;
  title: string;
  description: string;
  icon: string;
  duration: string;
};

export const KINDNESS_OPTIONS: KindnessOption[] = [
  {
    id: "breathing",
    title: "Box Breathing",
    description: "Find your rhythm with a few moments of guided breathing.",
    icon: "weather-windy",
    duration: "2–5 min",
  },
  {
    id: "gratitude",
    title: "Notice the good",
    description: "Make space for gratitude, wins, and intentions.",
    icon: "heart-outline",
    duration: "3–5 min",
  },
  {
    id: "brainDump",
    title: "Brain dump",
    description: "Let your thoughts flow freely.",
    icon: "cloud-outline",
    duration: "5–10 min",
  },
  {
    id: "journal",
    title: "Journal",
    description: "Explore your feelings and thoughts.",
    icon: "book-open-outline",
    duration: "5 min",
  },
];

export type SelectedActionRendererProps = {
  activity?: KindnessActivity;
  coreEmotion?: string;
  width: number;
  height: number;
  selectedEmotions: string[];
};

export default function SelectedActionRenderer({
  activity,
  width,
  height,
  onComplete,
  coreEmotion,
}: SelectedActionRendererProps & ScreenProps) {
  let screenComponent;
  switch (activity) {
    case "gratitude":
      screenComponent = (
        <GratitudeScreenItems
          width={width}
          height={height}
          onComplete={onComplete}
        />
      );
      break;

    case "brainDump":
      screenComponent = (
        <BrainDumpScreen
          width={width}
          height={height}
          onComplete={onComplete}
        />
      );
      break;

    case "journal":
      screenComponent = (
        <JournalScreen
          coreMood={coreEmotion || ""}
          width={width}
          height={height}
          onComplete={onComplete}
        />
      );
      break;

    case "breathing":
    default:
      screenComponent = (
        <BreathScreen onComplete={onComplete} width={width} height={height} />
      );
      break;
  }

  return screenComponent;
}
