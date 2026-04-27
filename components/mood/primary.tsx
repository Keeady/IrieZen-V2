import { PrimaryMood } from "@/data/moodList";
import { View } from "react-native";
import { Icon, Text } from "react-native-paper";
import styles from "../styles";
import MoodChip from "./mood-chip";

export type PrimaryMoodScreenProps = {
  randomTitlePrompt: string;
  primaryMoods: PrimaryMood[];
  selectedMoods: string[];
  onPress: (mood: PrimaryMood) => void;
};

export default function PrimaryMoodScreen({
  randomTitlePrompt,
  primaryMoods,
  selectedMoods,
  onPress,
}: PrimaryMoodScreenProps) {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        {randomTitlePrompt}
      </Text>
      <View style={styles.chipContainer}>
        {primaryMoods.map((mood) => (
          <View key={mood.label} style={styles.gridItem}>
            <MoodChip
              key={mood.label}
              mood={mood.label}
              selected={selectedMoods.includes(mood.label)}
              onPress={() => onPress(mood)}
              icon={() => <Icon source={mood.icon} size={48} />}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
