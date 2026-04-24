import { FlatList, View } from "react-native";
import { MoodItemRendererProps } from "./mood-item-renderer";
import { JSX } from "react";

export type MoodFlowRendererProps = {
  moodRef: React.RefObject<FlatList<string> | null>;
  moodScreens: string[];
  renderItem: ({ item, index }: { item: string; index: number }) => JSX.Element;
  height: number;
};

export default function MoodFlowRenderer({
  moodRef,
  moodScreens,
  renderItem,
  height,
}: MoodFlowRendererProps) {
  return (
    <View style={{flex: 1}}>
    <FlatList
      ref={moodRef}
      data={moodScreens}
      horizontal={false}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      snapToAlignment="start"
      decelerationRate={"fast"}
      snapToInterval={height / 2}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
    </View>
  );
 
}
