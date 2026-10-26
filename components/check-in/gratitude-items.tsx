import { FlatList, View } from "react-native";
import GratitudeScreen from "../gratitude/gratitude";
import { ScreenProps } from "../screen.interface";
import FocusScreen from "../focus/focus";
import WinsScreen from "../wins/wins";
import { useRef } from "react";

export default function GratitudeScreenItems({
  onComplete,
  width,
  height,
}: ScreenProps) {
  const items = ["gratitude", "focus", "wins"];
  const itemsRef = useRef<FlatList<string>>(null);

  const handleOnComplete = (index: number) => {
    if (index < items.length - 1) {
      itemsRef.current?.scrollToIndex({
        index: index + 1,
        animated: true,
        viewPosition: 0,
      });
    } else {
      onComplete();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={itemsRef}
        horizontal={false}
        data={items}
        renderItem={({ item, index }) => {
          if (item === "gratitude") {
            return (
              <View style={{ flex: 1, height: height, paddingVertical: 100 }}>
                <GratitudeScreen
                  width={width}
                  height={height}
                  onComplete={() => handleOnComplete(index)}
                />
              </View>
            );
          } else if (item === "focus") {
            return (
              <View style={{ flex: 1, height: height, paddingVertical: 100 }}>
                <FocusScreen
                  onComplete={() => handleOnComplete(index)}
                  height={height}
                  width={width}
                />
              </View>
            );
          } else {
            return (
              <View style={{ flex: 1, height: height, paddingVertical: 100 }}>
                <WinsScreen
                  onComplete={() => handleOnComplete(index)}
                  height={height}
                  width={width}
                />
              </View>
            );
          }
        }}
      />
    </View>
  );
}
