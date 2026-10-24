import { View, StyleSheet, ActivityIndicator, Animated } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import FadeInMessages from "./animate";
import { useState } from "react";
import { SmartResponse } from "../smart-response";
import LottieView from "lottie-react-native";

export type ReflectionScreenProps = {
  messages: SmartResponse;
  onPress: () => void;
  loadingReflection: boolean | undefined;
  height: number;
  title: () => string;
  disabled: boolean;
  selectedMoods: string[];
};

export default function ReflectionScreen({
  messages,
  onPress,
  loadingReflection,
  height,
  title,
  disabled,
  selectedMoods,
}: ReflectionScreenProps) {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const hasMore = Boolean(
    messages.acceptanceIntro.length ||
    messages.investigationIntro.length ||
    messages.nurturingIntro.length,
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.secondary, minHeight: height },
      ]}
    >
      {loadingReflection === true && (
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

      {loadingReflection === false && (
        <>
          <Text style={[styles.title, { color: colors.onSurface }]}>
            {title()}
          </Text>
          {selectedMoods.length > 0 && (
            <View style={styles.moods}>
              {selectedMoods.map((mood) => (
                <View
                  key={mood}
                  style={[styles.mood, { backgroundColor: colors.surface }]}
                >
                  <Text style={{ color: colors.primary }}>{mood}</Text>
                </View>
              ))}
            </View>
          )}
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <ReflectionParagraphs messages={[messages.intro, messages.outro]} />
          </View>

          {expanded && (
            <>
              {!!messages.acceptanceIntro && (
                <View style={[styles.section]}>
                  <FadeInMessages
                    messages={[
                      messages.acceptanceIntro,
                      messages.acceptanceOutro,
                      messages.investigationIntro,
                      messages.investigationOutro,
                      messages.nurturingIntro,
                      messages.nurturingOutro,
                    ]}
                  />
                </View>
              )}
            </>
          )}

          {hasMore && (
            <Button
              mode="text"
              onPress={() => setExpanded(!expanded)}
              icon={expanded ? "chevron-up" : "chevron-down"}
              style={styles.exploreButton}
            >
              {expanded ? "Show less" : "Explore this feeling"}
            </Button>
          )}
          <Button
            mode="contained"
            onPress={onPress}
            disabled={disabled}
            icon="arrow-down"
            contentStyle={styles.buttonContent}
            style={styles.continueButton}
            labelStyle={styles.buttonLabel}
          >
            Continue to body check-in
          </Button>
        </>
      )}
    </View>
  );
}

function ReflectionParagraphs({ messages }: { messages: string[] }) {
  return (
    <View style={styles.paragraphs}>
      {messages.filter(Boolean).map((message, index) => (
        <Text
          key={`${index}-${message}`}
          variant="bodyLarge"
          style={styles.paragraph}
        >
          {message}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    //paddingTop: 48,
    //paddingBottom: 48,
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: 100,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    height: 300,
  },
  loadingText: {
    fontFamily: "Lora_400Regular",
    fontSize: 16,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: 16,
  },
  title: {
    fontFamily: "Lora_400Regular",
    fontSize: 28,
    lineHeight: 38,
    textAlign: "center",
    marginBottom: 24,
  },
  moods: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginBottom: 24,
  },
  mood: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    gap: 20,
  },
  paragraphs: {
    gap: 14,
  },
  paragraph: {
    fontFamily: "Lora_400Regular",
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: 0,
  },
  section: {
    paddingTop: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#C9DCE5",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 14,
  },
  exploreButton: {
    alignSelf: "center",
    marginTop: 10,
  },
  continueButton: {
    borderRadius: 14,
    marginTop: 28,
  },
  buttonContent: {
    minHeight: 52,
    flexDirection: "row-reverse",
  },
  buttonLabel: {
    fontFamily: "Lora_400Regular",
    fontSize: 15,
    letterSpacing: 0.3,
  },
});
