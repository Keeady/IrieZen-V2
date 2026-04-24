import { FlatList, useWindowDimensions } from "react-native";
import { ScreenProps } from "../screen.interface";
import MoodFlowRenderer from "./mood-renderer";
import React, { useCallback, useState } from "react";
import {
  getMoodIntroMessage,
  getRandomMoodTitlePrompt,
  getRandomReflectionIntroMessage,
  primaryMoods,
  secondaryMixedMoods,
  secondaryMoods,
  tertiaryMoods,
} from "@/data/moodList";
import MoodItemRenderer from "./mood-item-renderer";
import { getSmartResponse } from "../smart-response";

export default function MoodScreen({
  onComplete,
  setCoreEmotion,
  width,
  height,
}: ScreenProps) {
  const moodRef = React.useRef<FlatList<string> | null>(null);
  const moodScreens = ["primary", "secondary", "tertiary", "reflection"];
  const randomTitlePrompt = getRandomMoodTitlePrompt();

  const [primaryMood, setPrimaryMood] = useState<string | null>(null);
  const [coreMood, setCoreMood] = useState<string | null>(null);
  const [mixedCoreMood, setMixedCoreMood] = useState<string | null>(null);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedSecondaryMood, setSelectedSecondaryMood] = useState<
    string | null
  >(null);
  const [loadingReflection, setLoadingReflection] = useState<
    boolean | undefined
  >(undefined);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [reflectionMessage, setReflectionMessage] = useState<string[] | null>(
    null,
  );
  const [scrollToEndOnceDone, setScrollToEndOnceDone] = useState(false);

  const [emotions, setSelectedEmotions] = useState<{ [key: string]: string[] }>(
    {},
  );

  const toggleMood = (mood: string, coreMood: string) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter((m) => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }

    setSelectedEmotions((prevEmotions) => {
      if (!coreMood || coreMood === "Mixed") return prevEmotions;
      const updatedEmotions = { ...prevEmotions };
      if (updatedEmotions[coreMood]) {
        if (updatedEmotions[coreMood].includes(mood)) {
          updatedEmotions[coreMood] = updatedEmotions[coreMood].filter(
            (m) => m !== mood,
          );
        } else {
          updatedEmotions[coreMood].push(mood);
        }
      } else {
        updatedEmotions[coreMood] = [mood];
      }
      return updatedEmotions;
    });
  };

  const scrollToNextScreen = (nextIndex: number) => {
    moodRef.current?.scrollToIndex({ index: nextIndex });
  };

  const secondaryMoodIntroMessage = useCallback(() => {
    return getMoodIntroMessage(primaryMood || "");
  }, [primaryMood]);

  const onSelectionComplete = () => {
    setLoadingReflection(true);
    setDisabled(true);
    scrollToNextScreen(3);

    console.log("Selected moods:", selectedMoods);
    console.log("Selected emotions:", emotions);

    getSmartResponse({
      userMessage: selectedMoods,
      coreMood: mixedCoreMood || coreMood || "",
      step: 1,
    }).then((smartResponse) => {
      setLoadingReflection(false);
      if (smartResponse) {
        setReflectionMessage(smartResponse);
      } else {
        setReflectionMessage([
          "Great job! Let's move on to expressing gratitude.",
        ]);
      }
    });
  };

  const scrollToEndOfScreen = () => {
    // only scroll once
    if (!scrollToEndOnceDone) {
      console.log("Scrolling to end of screen...");
      moodRef.current?.scrollToEnd();
      // setScrollToEndOnceDone(true);
    }
  };

  const reflectionTitle = getRandomReflectionIntroMessage();

  return (
    <MoodFlowRenderer
      moodRef={moodRef}
      moodScreens={moodScreens}
      renderItem={({ item, index }) => (
        <MoodItemRenderer
          item={item}
          primaryMoods={primaryMoods}
          randomTitlePrompt={randomTitlePrompt}
          secondaryMoodIntroMessage={secondaryMoodIntroMessage()}
          selectedMoods={selectedMoods}
          toggleMood={toggleMood}
          setPrimaryMood={setPrimaryMood}
          setCoreMood={setCoreMood}
          setMixedCoreMood={setMixedCoreMood}
          setSelectedSecondaryMood={setSelectedSecondaryMood}
          scrollToNextScreen={scrollToNextScreen}
          primaryMood={primaryMood}
          coreMood={coreMood}
          secondaryMoods={secondaryMoods}
          secondaryMixedMoods={secondaryMixedMoods}
          selectedSecondaryMood={selectedSecondaryMood}
          onSelectionComplete={onSelectionComplete}
          scrollToEndOfScreen={scrollToEndOfScreen}
          disabled={disabled || !coreMood || !selectedSecondaryMood}
          tertiaryMoods={tertiaryMoods}
          mixedCoreMood={mixedCoreMood}
          loadingReflection={loadingReflection}
          height={height}
          reflectionMessage={reflectionMessage || []}
          onComplete={onComplete}
          reflectionTitle={reflectionTitle}
        />
      )}
      height={height}
    />
  );
}
