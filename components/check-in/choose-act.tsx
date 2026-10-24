import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Icon,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { ScreenProps } from "../screen.interface";
import { KINDNESS_OPTIONS, KindnessActivity } from "./choose-act-render-item";

export type ChooseActScreenProps = {
  //onContinue: (activity: KindnessActivity) => void;
  onSkip: () => void;
  //onBack?: () => void;
  //disabled?: boolean;
  selectedEmotions: string[];
  coreEmotion?: string;
  setSelectedActivity: (activity: KindnessActivity) => void;
};

export default function ChooseActScreen({
  // onContinue,
  onSkip,
  //onBack,
  onComplete,
  setSelectedActivity,
 // disabled = false,
}: ChooseActScreenProps & ScreenProps) {
  const { colors } = useTheme();

  const [selected, setSelected] = useState<KindnessActivity | null>("breathing");
  const [disabled, setDisabled] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: "center",
        paddingTop: 100,
      }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: "#2C4A5E", marginVertical: 0 }]}>
          A little kindness for yourself
        </Text>
      </View>

      {/* Activity options */}
      <View style={styles.options}>
        {KINDNESS_OPTIONS.map((option) => {
          const isSelected = selected === option.id;

          return (
            <Surface
              key={option.id}
              elevation={0}
              style={[
                styles.card,
                {
                  backgroundColor: isSelected
                    ? colors.secondaryContainer
                    : colors.surface,
                  borderColor: isSelected
                    ? colors.primary
                    : colors.outlineVariant,
                  borderWidth: isSelected ? 2 : 1,
                },
              ]}
            >
              <TouchableRipple
                onPress={() => setSelected(option.id)}
                disabled={disabled}
                borderless
                accessibilityRole="radio"
                accessibilityLabel={option.title}
                accessibilityState={{
                  selected: isSelected,
                  disabled,
                }}
                style={styles.cardRipple}
              >
                <View style={styles.cardContent}>
                  {/* Activity icon */}
                  <View
                    style={[
                      styles.optionIcon,
                      {
                        backgroundColor: colors.secondaryContainer,
                      },
                    ]}
                  >
                    <Icon
                      source={option.icon}
                      size={26}
                      color={colors.primary}
                    />
                  </View>

                  {/* Activity description */}
                  <View style={styles.optionBody}>
                    <Text
                      style={[styles.optionTitle, { color: colors.onSurface }]}
                    >
                      {option.title}
                    </Text>

                    <Text
                      style={[
                        styles.optionDescription,
                        {
                          color: colors.onSurfaceVariant,
                        },
                      ]}
                    >
                      {option.description}
                    </Text>
                  </View>

                  {/* Selection indicator */}
                  <Icon
                    source={isSelected ? "check-circle" : "chevron-right"}
                    size={23}
                    color={isSelected ? colors.primary : colors.outline}
                  />
                </View>
              </TouchableRipple>
            </Surface>
          );
        })}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Button
          mode="contained"
          icon="arrow-right"
          contentStyle={styles.buttonContent}
          style={styles.continueButton}
          labelStyle={styles.buttonLabel}
          disabled={disabled}
          onPress={() => {
            if (selected) {
              // setDisabled(true);
              setSelectedActivity(selected);
              onComplete();
            }
          }}
        >
          Continue
        </Button>

        <Button
          mode="text"
          onPress={onComplete}
          disabled={disabled}
          textColor={colors.primary}
          labelStyle={styles.skipLabel}
        >
          I'm okay for now
        </Button>

        <Text style={[styles.footer, { color: colors.onSurfaceVariant }]}>
          There's no right way to care for yourself.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  backRow: {
    alignItems: "flex-start",
    marginBottom: 12,
  },

  // Header
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    marginVertical: 40,
    textAlign: "center",
    fontFamily: "Lora_600SemiBold",
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0.2,
    color: "#2C4A5E", // deep sky blue — darker than primary, feels grounded
  },
  description: {
    fontFamily: "Lora_400Regular",
    fontSize: 15,
    lineHeight: 25,
    textAlign: "center",
    maxWidth: 340,
    marginBottom: 14,
  },
  hint: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },

  // Cards
  options: {
    gap: 12,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
  },
  cardRipple: {
    borderRadius: 16,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 14,
    minHeight: 112,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  optionBody: {
    flex: 1,
    gap: 5,
  },
  optionTitle: {
    fontFamily: "Lora_400Regular",
    fontSize: 17,
    lineHeight: 24,
  },
  optionDescription: {
    fontSize: 13,
    lineHeight: 19,
  },
  duration: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 3,
  },

  // Actions
  actions: {
    marginTop: 32,
    alignItems: "center",
    gap: 12,
  },
  continueButton: {
    width: "100%",
    borderRadius: 14,
  },
  buttonContent: {
    minHeight: 54,
    flexDirection: "row-reverse",
  },
  buttonLabel: {
    fontFamily: "Lora_400Regular",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  skipLabel: {
    fontFamily: "Lora_400Regular",
    fontSize: 14,
  },
  footer: {
    fontFamily: "Lora_400Regular",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 2,
  },
});
