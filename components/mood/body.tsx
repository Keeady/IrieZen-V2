import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import BodyHighlighter, {
  ExtendedBodyPart,
} from "react-native-body-highlighter";
import styles from "../styles";
import { useBodySettingsContext } from "@/providers/body-settings-provider";

type BodySensationScreenProps = {
  selectedEmotions: string[];
  onComplete: (bodyParts: string[]) => void;
  title: string;
  disabled: boolean;
};

export default function BodySensationScreen({
  selectedEmotions,
  onComplete,
  title,
  disabled,
}: BodySensationScreenProps) {
  const { colors } = useTheme();
  const [selectedParts, setSelectedParts] = useState<ExtendedBodyPart[]>([]);
  const [side, setSide] = useState<"front" | "back">("front");
  const { body } = useBodySettingsContext();

  const handleBodyPartPress = (
    part: ExtendedBodyPart,
    side?: "left" | "right",
  ) => {
    setSelectedParts((prev) => {
      const exists = prev.find((p) => p.slug === part.slug);
      if (exists) {
        if (side && exists.side === undefined) {
          // both sides are already selected, deselect the side that was pressed
          return prev.map((p) =>
            p.slug === part.slug
              ? { ...p, side: side === "left" ? "right" : "left" }
              : p,
          );
        } else if (side && exists.side === side) {
          // deselect the side that was pressed
          return prev.filter((p) => !(p.slug === part.slug && p.side === side));
        } else if (side && exists.side !== side) {
          // select both sides
          return prev.map((p) =>
            p.slug === part.slug ? { ...p, side: undefined } : p,
          );
        }
        // deselect
        return prev.filter((p) => p.slug !== part.slug);
      }
      // select part with intensity 2 and the side that was pressed
      return [...prev, { slug: part.slug, intensity: 2, side }];
    });
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { alignItems: "center" }]}
    >
      <Text style={[styles.headline, { color: "#2C4A5E" }]}>{title}</Text>

      <Text style={[styles.subheadline, { color: colors.primary }]}>
        {selectedEmotions.join(" · ")}
      </Text>

      <View style={styles.bodyContainer}>
        <BodyHighlighter
          data={selectedParts}
          side={side}
          onBodyPartPress={handleBodyPartPress}
          colors={["#D6E8F4", "#4A7FA5"]} // light → primary blue
          scale={1.6}
          gender={body}
        />
      </View>
      <Text style={[styles.hint, { color: colors.primary }]}>
        Tap the areas where you notice these sensations:
      </Text>
      <View style={styles.toggle}>
        {["front", "back"].map((s) => (
          <Button
            key={s}
            mode={side === s ? "contained" : "outlined"}
            onPress={() => setSide(s as "front" | "back")}
            style={[
              styles.toggleButton,
              {
                borderColor: colors.primary,
                backgroundColor: side === s ? colors.primary : "transparent",
              },
            ]}
            labelStyle={{
              fontFamily: "Lora_400Regular",
              fontSize: 13,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              color: side === s ? colors.onPrimary : colors.primary,
            }}
            disabled={disabled}
          >
            {s}
          </Button>
        ))}
        <Button
          mode="outlined"
          onPress={() => onComplete(selectedParts.map((p) => p.slug!))}
          style={[
            styles.toggleButton,
            { borderColor: colors.primary, borderWidth: 1.5, marginTop: 0 },
          ]}
          labelStyle={{
            fontFamily: "Lora_400Regular",
            fontSize: 15,
            letterSpacing: 1.8,
            textTransform: "uppercase",
            color: colors.primary,
          }}
          disabled={disabled}
        >
          Done
        </Button>
      </View>
    </ScrollView>
  );
}
