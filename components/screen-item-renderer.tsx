import { Screen } from "@/data/screens";
import React from "react";
import { View } from "react-native";
import BreathScreen from "./breath/breath";
import MoodScreen from "./mood/mood";
import SummaryScreen from "./summary/summary";
import GratitudeScreen from "./gratitude/gratitude";
import FocusScreen from "./focus/focus";
import WinsScreen from "./wins/wins";
import BodySensationScreen from "./body/body";
import ChooseActScreen from "./check-in/choose-act";
import SelectedActionRenderer, { KindnessActivity } from "./check-in/choose-act-render-item";

export type ScreenRendererProps = {
  item: Screen;
  index: number;
  onScreenComplete: (index: number) => void;
  setCoreEmotion: (emotion: string) => void;
  coreEmotion?: string;
  width: number;
  height: number;
  setSelectedEmotions: (emotions: string[]) => void;
  selectedEmotions: string[];
  setSelectedActivity: (activity: KindnessActivity) => void;
  selectedActivity?: KindnessActivity
};

export const ScreenItemRenderer = ({
  item,
  index,
  onScreenComplete,
  setCoreEmotion,
  coreEmotion,
  width,
  height,
  setSelectedEmotions,
  selectedEmotions,
  setSelectedActivity,
  selectedActivity,
}: ScreenRendererProps) => {
  let screenComponent;
  if (item.id === "mood") {
    screenComponent = (
      <MoodScreen
        onComplete={() => onScreenComplete(index)}
        setCoreEmotion={setCoreEmotion}
        setSelectedEmotions={setSelectedEmotions}
        width={width}
        height={height}
      />
    );
  } else if (item.id === "gratitude") {
    screenComponent = (
      <GratitudeScreen
        onComplete={() => onScreenComplete(index)}
        width={width}
        height={height}
      />
    );
  } /*else if (item.id === "body") {
    screenComponent = (
      <BodySensationScreen
        onComplete={() => onScreenComplete(index)}
        selectedEmotions={selectedEmotions}
        width={width}
        height={height}
        loadingBody={loadingBody}
      />
    );
  }*/ else if (item.id === "breath") {
    screenComponent = (
      <BreathScreen
        onComplete={() => onScreenComplete(index)}
        width={width}
        height={height}
      />
    );
  } else if (item.id === "focus") {
    screenComponent = (
      <FocusScreen
        onComplete={() => onScreenComplete(index)}
        width={width}
        height={height}
      />
    );
  } else if (item.id === "wins") {
    screenComponent = (
      <WinsScreen
        onComplete={() => onScreenComplete(index)}
        width={width}
        height={height}
      />
    );
  } else if (item.id === "choose") {
    screenComponent = (
      <ChooseActScreen
        onComplete={() => onScreenComplete(index)}
        selectedEmotions={selectedEmotions}
        coreEmotion={coreEmotion}
        onSkip={() => onScreenComplete(index + 1)}
        width={width}
        height={height}
        setSelectedActivity={setSelectedActivity}
      />
    );
  } else if (item.id === "selection") {
    screenComponent = (
      <SelectedActionRenderer
        onComplete={() => onScreenComplete(index)}
        selectedEmotions={selectedEmotions}
        coreEmotion={coreEmotion}
        width={width}
        height={height}
        activity={selectedActivity}
      />
    );
  } else {
    screenComponent = (
      <SummaryScreen
        onComplete={() => onScreenComplete(index)}
        coreEmotion={coreEmotion}
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        padding: 10,
        width,
      }}
    >
      {screenComponent}
    </View>
  );
};
