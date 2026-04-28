import PrimaryMoodScreen from "./primary";
import { PrimaryMood } from "@/data/moodList";
import SecondaryMoodScreen from "./secondary";
import TertiaryMoodScreen from "./tertiary";
import ReflectionScreen from "./reflection";
import BodySensationScreen from "./body";

export type MoodItemRendererProps = {
  item: string;
  randomTitlePrompt: string;
  secondaryMoodIntroMessage: string;
  primaryMood: string | null;
  primaryMoods: PrimaryMood[];
  coreMood: string | null;
  selectedMoods: string[];
  secondaryMoods: Record<string, string[]>;
  secondaryMixedMoods: Record<string, string[]>;
  selectedSecondaryMood: string | null;
  onSelectionComplete: () => void;
  disabled: boolean;
  tertiaryMoods: Record<string, string[]>;
  mixedCoreMood: string | null;
  loadingReflection: boolean | undefined;
  height: number;
  reflectionMessage: string[];
  reflectionTitle: string;
  onPrimaryMoodPress: (mood: PrimaryMood) => void;
  onSecondaryMoodPress: (mood: string, mixedMood: string | null) => void;
  onTertiaryMoodPress: (mood: string) => void;
  onReflectionComplete: () => void;
  onBodySensationComplete: (bodyParts: string[]) => void;
  bodySensationIntroMessage: string;
  showBodyScreen: boolean;
  disabledOnComplete: boolean;
};

export default function MoodItemRenderer({
  item,
  randomTitlePrompt,
  secondaryMoodIntroMessage,
  primaryMood,
  primaryMoods,
  selectedMoods,
  coreMood,
  selectedSecondaryMood,
  secondaryMoods,
  secondaryMixedMoods,
  onSelectionComplete,
  disabled,
  tertiaryMoods,
  mixedCoreMood,
  loadingReflection,
  height,
  reflectionMessage,
  reflectionTitle,
  onPrimaryMoodPress,
  onSecondaryMoodPress,
  onTertiaryMoodPress,
  onReflectionComplete,
  onBodySensationComplete,
  bodySensationIntroMessage,
  showBodyScreen,
  disabledOnComplete,
}: MoodItemRendererProps) {
  let screenComponent = null;

  if (item === "primary") {
    screenComponent = (
      <PrimaryMoodScreen
        randomTitlePrompt={randomTitlePrompt}
        primaryMoods={primaryMoods}
        selectedMoods={selectedMoods}
        onPress={onPrimaryMoodPress}
      />
    );
  } else if (item === "secondary") {
    if (!coreMood) {
      return null;
    }

    screenComponent = (
      <SecondaryMoodScreen
        primaryMood={primaryMood}
        coreMood={coreMood}
        secondaryMoodIntroMessage={secondaryMoodIntroMessage}
        secondaryMoods={secondaryMoods}
        secondaryMixedMoods={secondaryMixedMoods}
        selectedMoods={selectedMoods}
        onPress={onSecondaryMoodPress}
      />
    );
  } else if (item === "tertiary") {
    if (!coreMood || !selectedSecondaryMood || !selectedMoods) return null;

    screenComponent = (
      <TertiaryMoodScreen
        coreMood={coreMood}
        selectedSecondaryMood={selectedSecondaryMood}
        selectedMoods={selectedMoods}
        onSelectionComplete={onSelectionComplete}
        disabled={disabled}
        mixedCoreMood={mixedCoreMood}
        tertiaryMoods={tertiaryMoods}
        onPress={onTertiaryMoodPress}
      />
    );
  } else if (item === "reflection") {
    if (loadingReflection === undefined) {
      return null;
    }
    screenComponent = (
      <ReflectionScreen
        messages={reflectionMessage}
        onPress={onReflectionComplete}
        loadingReflection={loadingReflection}
        height={height}
        title={reflectionTitle}
        disabled={disabledOnComplete}
      />
    );
  } else if (item === "body") {
    if (!selectedMoods || !showBodyScreen) return null;

    screenComponent = (
      <BodySensationScreen
        selectedEmotions={selectedMoods}
        onComplete={onBodySensationComplete}
        title={bodySensationIntroMessage}
        disabled={disabledOnComplete}
      />
    );
  }

  return screenComponent;
}
