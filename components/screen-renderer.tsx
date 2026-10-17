import { Screen } from "@/data/screens";
import { JSX } from "react";
import { Animated, FlatList, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export type FlowRendererProps = {
  listRef: React.RefObject<FlatList<Screen> | null>;
  screens: Screen[];
  screenItemRenderer: ({
    item,
    index,
  }: {
    item: Screen;
    index: number;
  }) => JSX.Element;
  message: string | null;
  fadeAnim: Animated.Value;
};

export default function ScreenFlowRenderer({
  listRef,
  screens,
  screenItemRenderer,
  message,
  fadeAnim,
}: FlowRendererProps) {
  const { colors } = useTheme();
  return (
    <View style={{ backgroundColor: colors.background }}>
      <FlatList
        ref={listRef}
        data={screens}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={screenItemRenderer}
      />
    </View>
  );
}
