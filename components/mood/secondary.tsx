
import { View } from "react-native";
import { Text, Chip } from "react-native-paper";
import styles from "./styles";
import MoodChip from "./mood-chip";

export type SecondaryMoodScreenProps = {
    primaryMood: string | null;
    coreMood: string | null;
    secondaryMoodIntroMessage: string;
    secondaryMoods: Record<string, string[]>;
    secondaryMixedMoods: Record<string, string[]>;
    selectedMoods: string[];
    toggleMood: (mood: string, coreMood: string) => void;
    setSelectedSecondaryMood: (mood: string | null) => void;
    scrollToNextScreen: (index: number) => void;
    setMixedCoreMood: (core: string | null) => void;
};

export default function SecondaryMoodScreen({
    primaryMood,
    coreMood,
    secondaryMoodIntroMessage,
    secondaryMoods,
    secondaryMixedMoods,
    selectedMoods,
    toggleMood,
    setSelectedSecondaryMood,
    scrollToNextScreen,
    setMixedCoreMood
}: SecondaryMoodScreenProps) {
    return (
    <View style={styles.container}>
      <Text
        variant="titleLarge"
        style={styles.secondaryTitle}
      >
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
                onPress={() => {
                  setSelectedSecondaryMood(mood);
                  toggleMood(mood, coreMood!);
                  scrollToNextScreen(2);
                  setMixedCoreMood(null);
                }}
                /*style={styles.chip}
                textStyle={{
                  fontWeight: "400",
                  textAlign: "left",
                }}
                showSelectedOverlay*/
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
                        onPress={() => {
                          setSelectedSecondaryMood(mood);
                          toggleMood(mood, mixedMood);
                          scrollToNextScreen(2);
                          setMixedCoreMood(mixedMood);
                        }}
                        /* style={styles.chip}
                        textStyle={{
                          fontWeight: "400",
                          textAlign: "left",
                        }}
                        showSelectedOverlay*/
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
