import { Screen } from "@/data/screens";
import React from "react";
import { Text, View } from "react-native";
import BreathScreen from "./breath/breath";
import MoodScreen from "./mood/mood";
import SummaryScreen from "./summary/summary";
import GratitudeScreen from "./gratitude/gratitude";
import FocusScreen from "./focus/focus";
import WinsScreen from "./wins/wins";

export type ScreenRendererProps = {
  item: Screen;
  index: number;
  onScreenComplete: (index: number) => void;
  setCoreEmotion: (emotion: string) => void;
  coreEmotion?: string;
  width: number;
  height: number;
};

export const ScreenItemRenderer = ({
  item,
  index,
  onScreenComplete,
  setCoreEmotion,
  coreEmotion,
  width,
  height,
}: ScreenRendererProps) => {
  let screenComponent;
  if (item.id === "mood") {
    screenComponent = (
      <MoodScreen
        onComplete={() => onScreenComplete(index)}
        setCoreEmotion={setCoreEmotion}
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
  } else if (item.id === "breath") {
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
