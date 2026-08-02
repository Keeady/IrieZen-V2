import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import BodyHighlighter, {
  ExtendedBodyPart,
} from "react-native-body-highlighter";
import styles from "../styles";
import {
  BODY_TYPE,
} from "@/providers/body-settings-provider";
import { BodySide } from "../screen.interface";

type BodyFlowRendererProps = {
  body: BODY_TYPE;
  side: BodySide;
  selectedParts: ExtendedBodyPart[];
  selectedEmotions: string[];
  onComplete: () => void;
  title: string;
  disabled: boolean;
  handleBodyPartPress: (
    part: ExtendedBodyPart,
    pressedSide?: "left" | "right",
  ) => void;
  setSide: (side: BodySide) => void;
};

export default function BodyFlowRenderer({
  body,
  side,
  selectedParts,
  selectedEmotions,
  onComplete,
  title,
  disabled,
  handleBodyPartPress,
  setSide,
}: BodyFlowRendererProps) {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[{ alignContent: "center",
          justifyContent: "center",
          paddingVertical: 100,}]}
    >
      <View style={{ backgroundColor: colors.background, alignItems: "center" }}>
        <Text style={[styles.title, { color: "#2C4A5E", marginBottom: 10 }]}>
          {title}
        </Text>

        <Text
          style={[
            styles.subheadline,
            { color: colors.primary, marginBottom: 5 },
          ]}
        >
          {selectedEmotions.join(" · ")}
        </Text>
        <BodyHighlighter
          data={selectedParts}
          side={side}
          onBodyPartPress={handleBodyPartPress}
          colors={["#D6E8F4", "#4A7FA5"]} // light → primary blue
          scale={1.6}
          gender={body}
        />

        <Text style={[styles.hint, { color: colors.primary }]}>
          Tap the areas where you notice these sensations:
        </Text>
        <View style={[styles.toggle, { marginTop: 10 }]}>
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
            onPress={onComplete}
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
      </View>
    </ScrollView>
  );
}
