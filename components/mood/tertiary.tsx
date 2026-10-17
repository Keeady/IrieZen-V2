import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import styles from "../styles";
import MoodChip from "./mood-chip";

export type TertiaryMoodScreenProps = {
  coreMood: string;
  selectedSecondaryMood: string | null;
  selectedMoods: string[];
  onSelectionComplete: () => void;
  disabled: boolean;
  mixedCoreMood: string | null;
  tertiaryMoods: Record<string, string[]>;
  onPress: (mood: string, mixedMood: string | null) => void;
};

export default function TertiaryMoodScreen({
  coreMood,
  selectedSecondaryMood,
  selectedMoods,
  onSelectionComplete,
  disabled,
  mixedCoreMood,
  tertiaryMoods,
  onPress,
}: TertiaryMoodScreenProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      {(tertiaryMoods[coreMood] ||
        (mixedCoreMood && tertiaryMoods[mixedCoreMood])) && (
        <Text variant="titleSmall" style={styles.tertiaryTitle}>
          Let&apos;s dive deeper. Do any of these resonate?
        </Text>
      )}

      {!mixedCoreMood && (
        <View style={styles.chipContainer}>
          {coreMood &&
            tertiaryMoods[coreMood] &&
            tertiaryMoods[coreMood].map((mood) => (
              <View key={mood} style={styles.gridItem}>
                <MoodChip
                  key={mood}
                  mood={mood}
                  selected={selectedMoods.includes(mood)}
                  onPress={() => onPress(mood, null)}
                />
              </View>
            ))}
        </View>
      )}

      {mixedCoreMood && (
        <View style={styles.chipContainer}>
          {mixedCoreMood &&
            tertiaryMoods[mixedCoreMood] &&
            tertiaryMoods[mixedCoreMood].map((mood) => (
              <View key={mood} style={styles.gridItem}>
                <MoodChip
                  key={mood}
                  mood={mood}
                  selected={selectedMoods.includes(mood)}
                  onPress={() => onPress(mood, mixedCoreMood)}
                />
              </View>
            ))}
        </View>
      )}
      {coreMood && selectedSecondaryMood && (
        <Button
          mode="contained"
          onPress={onSelectionComplete}
          disabled={disabled}
          icon="arrow-down"
          contentStyle={styles.buttonContent}
          style={styles.continueButton}
        >
          Continue to reflection
        </Button>
      )}
    </View>
  );
}
