import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import BodyHighlighter, {
  ExtendedBodyPart,
} from "react-native-body-highlighter";
import styles from "../styles";
import { BODY_TYPE } from "@/providers/body-settings-provider";
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
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: "center",
        paddingTop: 100,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flex: 1,
        }}
      >
        <View style={{ gap: 10 }}>
          <Text style={[styles.title, { color: "#2C4A5E", marginVertical: 0 }]}>
            {title}
          </Text>
          <Text style={[styles.hint, { color: colors.primary }]}>
            Tap the areas where you notice these sensations:
          </Text>
          <Text style={[styles.subheadline, { color: colors.primary }]}>
            {selectedEmotions.join(" · ")}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <BodyHighlighter
            data={selectedParts}
            side={side}
            onBodyPartPress={handleBodyPartPress}
            colors={["#A6CDD3", "#345A6A"]} // light → primary blue
            scale={2}
            gender={body}
          />
        </View>
        <View style={[styles.toggle]}>
          {["front", "back"].map((s) => (
            <Button
              key={s}
              mode={side === s ? "contained" : "outlined"}
              onPress={() => setSide(s as "front" | "back")}
              contentStyle={styles.buttonContent}
              style={styles.continueButton}
              labelStyle={styles.buttonLabel}
              disabled={disabled}
            >
              {s}
            </Button>
          ))}
          <Button
            mode="outlined"
            onPress={onComplete}
            icon="arrow-right"
            contentStyle={styles.buttonContent}
            style={styles.continueButton}
            labelStyle={styles.buttonLabel}
            disabled={disabled}
          >
            Done
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
