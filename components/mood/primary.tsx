import { PrimaryMood } from "@/data/moodList";
import { View, StyleSheet } from "react-native";
import { Text, Chip, Icon } from "react-native-paper";
import styles from "./styles";
import MoodChip from "./mood-chip";

export type PrimaryMoodScreenProps = {
  randomTitlePrompt: string;
  primaryMoods: PrimaryMood[];
  selectedMoods: string[];
  setCoreMood: (core: string) => void;
  setPrimaryMood: (mood: string) => void;
  toggleMood: (mood: string, coreMood: string) => void;
  setSelectedSecondaryMood: (mood: string | null) => void;
  scrollToNextScreen: (index: number) => void;
  setMixedCoreMood: (core: string | null) => void;
};

export default function PrimaryMoodScreen({
  randomTitlePrompt,
  primaryMoods,
  selectedMoods,
  setCoreMood,
  setPrimaryMood,
  toggleMood,
  setSelectedSecondaryMood,
  scrollToNextScreen,
  setMixedCoreMood,
}: PrimaryMoodScreenProps) {
  return (
    <View style={styles.container}>
      <Text
        variant="headlineMedium"
        style={styles.title}
      >
        {randomTitlePrompt}
      </Text>
      <View style={styles.chipContainer}>
        {primaryMoods.map((mood) => (
          <MoodChip
            key={mood.label}
            mood={mood.label}
            selected={selectedMoods.includes(mood.label)}
            onPress={() => {
              setCoreMood(mood.core);
              setPrimaryMood(mood.label);
              toggleMood(mood.label, mood.core);
              setSelectedSecondaryMood(null);
              scrollToNextScreen(1);
              setMixedCoreMood(null);
            }}
            /*style={styles.primaryChip}
            showSelectedOverlay*/
            icon={() => <Icon source={mood.icon} size={48} />}
          />
        ))}
      </View>
    </View>
  );
}


