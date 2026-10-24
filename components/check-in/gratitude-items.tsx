import { FlatList, View } from "react-native";
import GratitudeScreen from "../gratitude/gratitude";
import { ScreenProps } from "../screen.interface";
import FocusScreen from "../focus/focus";
import WinsScreen from "../wins/wins";

export default function GratitudeScreenItems({
  onComplete,
  width,
  height,
}: ScreenProps) {
  return (
    <View>
      <FlatList
        horizontal={false}
        data={["gratitude", "focus", "wins"]}
        renderItem={({ item }) => {
          if (item === "gratitude") {
            return (
              <GratitudeScreen
                width={width}
                height={height}
                onComplete={onComplete}
              />
            );
          } else if (item === "focus") {
            return (
              <FocusScreen
                onComplete={onComplete}
                height={height}
                width={width}
              />
            );
          } else {
            return (
              <WinsScreen
                onComplete={onComplete}
                height={height}
                width={width}
              />
            );
          }
        }}
      />
    </View>
  );
}
