import { Screen } from "@/data/screens";
import React from "react";
import { Text, View } from "react-native";
import BreathScreen from "./breath/breath";
import MoodScreen from "./mood/mood";
import SummaryScreen from "./summary/summary";

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
      <View style={{ flex: 1 }}>
        <Text>Gratitude</Text>
      </View>
    ); /*(
        <GratitudeScreen onComplete={() => onScreenComplete(index)} />
      );*/
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
      <View>
        <Text>Focus</Text>
      </View>
    ); /*(
        <FocusScreen onComplete={() => onScreenComplete(index)} />
      );*/
  } else if (item.id === "wins") {
    screenComponent = (
      <View>
        <Text>Wins</Text>
      </View>
    ); /*<WinsScreen onComplete={() => onScreenComplete(index)} />;*/
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
