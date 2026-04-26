import { View } from "react-native";
import { Text } from "react-native-paper";
import styles from "../styles";
import MoodChip from "./mood-chip";

export type SecondaryMoodScreenProps = {
  primaryMood: string | null;
  coreMood: string | null;
  secondaryMoodIntroMessage: string;
  secondaryMoods: Record<string, string[]>;
  secondaryMixedMoods: Record<string, string[]>;
  selectedMoods: string[];
  onPress: (mood: string, mixedMood: string | null) => void;
};

export default function SecondaryMoodScreen({
  primaryMood,
  coreMood,
  secondaryMoodIntroMessage,
  secondaryMoods,
  secondaryMixedMoods,
  selectedMoods,
  onPress,
}: SecondaryMoodScreenProps) {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.secondaryTitle}>
        {secondaryMoodIntroMessage}
      </Text>
      <View style={styles.chipContainer}>
        {coreMood &&
          secondaryMoods[coreMood] &&
          secondaryMoods[coreMood].map((mood) => {
            return (
              <MoodChip
                key={mood}
                mood={mood}
                selected={selectedMoods.includes(mood)}
                onPress={() => onPress(mood, null)}
              />
            );
          })}

        {primaryMood &&
          secondaryMixedMoods[primaryMood] &&
          secondaryMixedMoods[primaryMood].map((mixedMood) => {
            return (
              <View key={mixedMood} style={styles.chipContainer}>
                {mixedMood &&
                  secondaryMoods[mixedMood] &&
                  secondaryMoods[mixedMood].map((mood) => {
                    return (
                      <MoodChip
                        key={`${mixedMood}-${mood}`}
                        mood={mood}
                        selected={selectedMoods.includes(mood)}
                        onPress={() => onPress(mood, mixedMood)}
                      />
                    );
                  })}
              </View>
            );
          })}
      </View>
    </View>
  );
}
