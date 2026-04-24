import PrimaryMoodScreen from "./primary";
import { PrimaryMood } from "@/data/moodList";
import SecondaryMoodScreen from "./secondary";
import TertiaryMoodScreen from "./tertiary";
import ReflectionScreen from "./reflection";

export type MoodItemRendererProps = {
  item: string;
  randomTitlePrompt: string;
  secondaryMoodIntroMessage: string;
  primaryMood: string | null;
  primaryMoods: PrimaryMood[];
  coreMood: string | null;
  selectedMoods: string[];
  setCoreMood: (core: string) => void;
  setPrimaryMood: (mood: string) => void;
  toggleMood: (mood: string, coreMood: string) => void;
  setSelectedSecondaryMood: (mood: string | null) => void;
  scrollToNextScreen: (index: number) => void;
  setMixedCoreMood: (core: string | null) => void;
  secondaryMoods: Record<string, string[]>;
  secondaryMixedMoods: Record<string, string[]>;
  selectedSecondaryMood: string | null;
  onSelectionComplete: () => void;
  scrollToEndOfScreen: () => void;
  disabled: boolean;
  tertiaryMoods: Record<string, string[]>;
  mixedCoreMood: string | null;
  loadingReflection: boolean | undefined;
  height: number;
  reflectionMessage: string[];
  onComplete: () => void;
};

export default function MoodItemRenderer({
  item,
  randomTitlePrompt,
  secondaryMoodIntroMessage,
  primaryMood,
  primaryMoods,
  selectedMoods,
  coreMood,
  setCoreMood,
  setPrimaryMood,
  toggleMood,
  selectedSecondaryMood,
  setSelectedSecondaryMood,
  scrollToNextScreen,
  setMixedCoreMood,
  secondaryMoods,
  secondaryMixedMoods,
  onSelectionComplete,
  scrollToEndOfScreen,
  disabled,
  tertiaryMoods,
  mixedCoreMood,
  loadingReflection,
  height,
  reflectionMessage,
  onComplete,
}: MoodItemRendererProps) {
  let screenComponent = null;

  if (item === "primary") {
    screenComponent = (
      <PrimaryMoodScreen
        randomTitlePrompt={randomTitlePrompt}
        primaryMoods={primaryMoods}
        selectedMoods={selectedMoods}
        setCoreMood={setCoreMood}
        setPrimaryMood={setPrimaryMood}
        toggleMood={toggleMood}
        setSelectedSecondaryMood={setSelectedSecondaryMood}
        scrollToNextScreen={scrollToNextScreen}
        setMixedCoreMood={setMixedCoreMood}
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
        toggleMood={toggleMood}
        setSelectedSecondaryMood={setSelectedSecondaryMood}
        scrollToNextScreen={scrollToNextScreen}
        setMixedCoreMood={setMixedCoreMood}
      />
    );
  } else if (item === "tertiary") {
    if (!coreMood || !selectedSecondaryMood || !selectedMoods) return null;

    screenComponent = (
      <TertiaryMoodScreen
        coreMood={coreMood}
        selectedSecondaryMood={selectedSecondaryMood}
        selectedMoods={selectedMoods}
        toggleMood={toggleMood}
        onSelectionComplete={onSelectionComplete}
        disabled={disabled}
        mixedCoreMood={mixedCoreMood}
        scrollToEndOfScreen={scrollToEndOfScreen}
        tertiaryMoods={tertiaryMoods}
      />
    );
  } else if (item === "reflection") {
    if (loadingReflection === undefined) {
      return null;
    }
    screenComponent = (
      <ReflectionScreen
        messages={reflectionMessage}
        onComplete={onComplete}
        loadingReflection={loadingReflection}
        height={height}
        title="A moment of reflection with yourself"
      />
    );
  }

  return screenComponent;
}
