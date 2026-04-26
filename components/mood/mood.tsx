import { FlatList } from "react-native";
import { ScreenProps } from "../screen.interface";
import MoodFlowRenderer from "./mood-renderer";
import React, { useCallback, useEffect, useState } from "react";
import {
  getMoodIntroMessage,
  getRandomMoodTitlePrompt,
  getRandomReflectionIntroMessage,
  PrimaryMood,
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
  const [selectedTertiaryMood, setSelectedTertiaryMood] = useState<
    string | null
  >(null);

  const scrollToEndOfScreen = () => {
    // only scroll once
    if (!scrollToEndOnceDone) {
      moodRef.current?.scrollToEnd();
      // setScrollToEndOnceDone(true);
    }
  };

  useEffect(() => {
    if (coreMood) {
      scrollToNextScreen(1);
    }
  }, [coreMood]);

  useEffect(() => {
    if (selectedSecondaryMood) {
      scrollToNextScreen(2);
    }
  }, [selectedSecondaryMood]);

  useEffect(() => {
    if (selectedTertiaryMood) {
      scrollToEndOfScreen();
    }
  }, [selectedTertiaryMood]);

  useEffect(() => {
    if (mixedCoreMood) {
      setCoreEmotion?.(mixedCoreMood);
    } else {
      coreMood && setCoreEmotion?.(coreMood);
    }
  }, [coreMood, mixedCoreMood, setCoreEmotion]);

  const toggleMood = (mood: string) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter((m) => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
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
    scrollToEndOfScreen();

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
      scrollToNextScreen(3);
    });
  };

  const onDonePress = () => {
    onSelectionComplete();
  };

  const onPrimaryMoodPress = (mood: PrimaryMood) => {
    setCoreMood(mood.core);
    setPrimaryMood(mood.label);
    toggleMood(mood.label);
    setSelectedSecondaryMood(null);
    setMixedCoreMood(null);
  };

  const onSecondaryMoodPress = (mood: string, mixedMood: string | null) => {
    setSelectedSecondaryMood(mood);
    toggleMood(mood);
    setMixedCoreMood(mixedMood);
  };

  const onTertiaryMoodPress = (mood: string) => {
    setSelectedTertiaryMood(mood);
    toggleMood(mood);
  };

  const onReflectionComplete = () => {
    onComplete();
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
          primaryMood={primaryMood}
          coreMood={coreMood}
          secondaryMoods={secondaryMoods}
          secondaryMixedMoods={secondaryMixedMoods}
          selectedSecondaryMood={selectedSecondaryMood}
          onSelectionComplete={onDonePress}
          disabled={disabled || !coreMood || !selectedSecondaryMood}
          tertiaryMoods={tertiaryMoods}
          mixedCoreMood={mixedCoreMood}
          loadingReflection={loadingReflection}
          height={height}
          reflectionMessage={reflectionMessage || []}
          reflectionTitle={reflectionTitle}
          onPrimaryMoodPress={onPrimaryMoodPress}
          onSecondaryMoodPress={onSecondaryMoodPress}
          onTertiaryMoodPress={onTertiaryMoodPress}
          onReflectionComplete={onReflectionComplete}
        />
      )}
      height={height}
    />
  );
}
