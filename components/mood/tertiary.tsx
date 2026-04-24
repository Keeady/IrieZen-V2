import { Button, Chip, Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import styles from "./styles";
import MoodChip from "./mood-chip";

export type TertiaryMoodScreenProps = {
  coreMood: string;
  selectedSecondaryMood: string | null;
  selectedMoods: string[];
  toggleMood: (mood: string, coreMood: string) => void;
  onSelectionComplete: (selection: string) => void;
  disabled: boolean;
  mixedCoreMood: string | null;
  scrollToEndOfScreen: () => void;
  tertiaryMoods: Record<string, string[]>;
};

export default function TertiaryMoodScreen({
  coreMood,
  selectedSecondaryMood,
  selectedMoods,
  toggleMood,
  onSelectionComplete,
  disabled,
  mixedCoreMood,
  scrollToEndOfScreen,
  tertiaryMoods,
}: TertiaryMoodScreenProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      {(tertiaryMoods[coreMood] ||
        (mixedCoreMood && tertiaryMoods[mixedCoreMood])) && (
        <Text
          variant="titleSmall"
          style={ styles.tertiaryTitle }
        >
          Let's dive deeper. Do any of these resonate?
        </Text>
      )}

      {!mixedCoreMood && (
        <View style={styles.chipContainer}>
          {coreMood &&
            tertiaryMoods[coreMood] &&
            tertiaryMoods[coreMood].map((mood) => (
              <MoodChip
                key={mood}
                mood={mood}
                selected={selectedMoods.includes(mood)}
                onPress={() => {
                  toggleMood(mood, coreMood);
                  scrollToEndOfScreen();
                }}
                // style={styles.chip}
                // showSelectedOverlay
                /*textStyle={{
                  fontWeight: "400",
                  textAlign: "right",
                }}*/
              />
            ))}
        </View>
      )}

      {mixedCoreMood && (
        <View style={styles.chipContainer}>
          {mixedCoreMood &&
            tertiaryMoods[mixedCoreMood] &&
            tertiaryMoods[mixedCoreMood].map((mood) => (
              <MoodChip
                key={mood}
                mood={mood}
                selected={selectedMoods.includes(mood)}
                onPress={() => {
                  toggleMood(mood, mixedCoreMood);
                  scrollToEndOfScreen();
                }}
              />
            ))}
        </View>
      )}
      {coreMood && selectedSecondaryMood && (
        <Button
          mode="contained"
          onPress={() => {
            onSelectionComplete(selectedMoods.join(", "));
            scrollToEndOfScreen();
          }}
          disabled={disabled}
          style={{
            marginHorizontal: 24,
            marginTop: 32,
            marginBottom: 50,
            borderRadius: 2, // sharp corners vs default pill shape
            borderWidth: 1.5,
            borderColor: colors.primary,
          }}
          labelStyle={{
            fontFamily: "Lora_400Regular", // matches reflection typography
            fontSize: 15,
            letterSpacing: 1.8, // spaced caps feel intentional and calm
            textTransform: "uppercase",
          }}
        >
          Done
        </Button>
      )}
    </View>
  );
}
