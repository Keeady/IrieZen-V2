
import React from "react";
import { StyleSheet } from "react-native";
import { Chip, useTheme } from "react-native-paper";

type MoodChipProps = {
  mood: string;
  selected: boolean;
  onPress: () => void;
  icon?: () => React.ReactNode;
  variant?: "primary" | "detail";
};

export default function MoodChip({
  mood,
  selected,
  onPress,
  icon,
  variant = "detail",
}: MoodChipProps) {
  const { colors } = useTheme();

  const isPrimary = variant === "primary";

  return (
    <Chip
      key={mood}
      selected={selected}
      onPress={onPress}
      icon={icon}
      mode="outlined"
      showSelectedOverlay={false}
      showSelectedCheck={false}
      accessibilityLabel={mood}
      accessibilityState={{ selected }}
      style={[
        styles.base,
        isPrimary ? styles.primary : styles.detail,
        {
          backgroundColor: selected
            ? colors.secondaryContainer
            : colors.surface,
          borderColor: selected
            ? colors.primary
            : colors.outlineVariant,
          borderWidth: selected ? 1.5 : 1,
        },
      ]}
      textStyle={[
        styles.text,
        {
          color: selected
            ? colors.onSecondaryContainer
            : colors.onSurface,
        },
      ]}
      ellipsizeMode="tail"
    >
      {mood}
    </Chip>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    justifyContent: "center",
  },
  primary: {
    minHeight: 60,
  },
  detail: {
    minHeight: 50,
  },
  text: {
    fontFamily: "Lora_400Regular",
    fontSize: 15,
    letterSpacing: 0,
    lineHeight: 22,
    marginVertical: 5,
    flexShrink: 1,
  },
});
