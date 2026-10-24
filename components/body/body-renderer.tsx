import React from "react";
import { View, ScrollView, Animated } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import BodyHighlighter, {
  ExtendedBodyPart,
} from "react-native-body-highlighter";
import styles from "../styles";
import { BODY_TYPE } from "@/providers/body-settings-provider";
import { BodySide, ScreenProps } from "../screen.interface";
import LottieView from "lottie-react-native";

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
  loadingBody: boolean | undefined;
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
  loadingBody,
  height,
}: BodyFlowRendererProps & ScreenProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexGrow: 1,
        //paddingHorizontal: 24,
        alignContent: "center",
        justifyContent: "center",
        paddingVertical: 100,
        minHeight: height,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flex: 1,
        }}
      >
              {loadingBody === true && (
                <View style={[{ backgroundColor: colors.secondary }]}>
                  <Animated.View>
                    <LottieView
                      source={require("../../assets/animation/paperplane.json")}
                      autoPlay={true}
                      loop
                      style={{ width: 300, height: 300 }}
                    />
                  </Animated.View>
                </View>
              )}
      {loadingBody === false && (
        <>
          <View style={{ gap: 10 }}>
            <Text
              style={[styles.title, { color: "#2C4A5E", marginVertical: 0 }]}
            >
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
        </>
      )}
    </View>
    </View>
  );
}
