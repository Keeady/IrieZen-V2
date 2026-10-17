import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

type FadeInMessagesProps = {
  messages: string[];
};

const BORDER_OPACITIES = [0.35, 0.35, 0.55, 0.55, 0.75, 0.75, 1, 1];
const ACCENT_COLOR = { r: 74, g: 127, b: 165 }; // #4A7FA5 — sky blue primary

const FadeInMessages = ({ messages }: FadeInMessagesProps) => {
  const filteredMessages = messages.filter((m) => m.trim() !== "");

  const fadeAnims = useRef(
    filteredMessages.map(() => new Animated.Value(0)),
  ).current;
  const slideAnims = useRef(
    filteredMessages.map(() => new Animated.Value(8)),
  ).current;

  useEffect(() => {
    const animations = fadeAnims.map((anim, index) =>
      Animated.parallel([
        Animated.timing(anim, {
          toValue: 1,
          duration: 2000,
          delay: index * 1500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnims[index], {
          toValue: 0,
          duration: 600,
          delay: index * 1500,
          useNativeDriver: true,
        }),
      ]),
    );

    Animated.stagger(300, animations).start();
  }, [fadeAnims, slideAnims]);

  return (
    <View style={styles.container}>
      {filteredMessages.map((text, index) => {
        const borderOpacity = BORDER_OPACITIES[index] ?? 0.75;
        const borderColor = `rgba(${ACCENT_COLOR.r}, ${ACCENT_COLOR.g}, ${ACCENT_COLOR.b}, ${borderOpacity})`;

        // Split off first word for accent styling
        const words = text.trimStart().split(" ");
        const firstWord = words[0];
        const rest = words.slice(1).join(" ");

        return (
          <Animated.View
            key={index}
            style={[
              styles.paragraph,
              {
                opacity: fadeAnims[index],
                transform: [{ translateY: slideAnims[index] }],
                borderLeftColor: borderColor,
              },
            ]}
          >
            <Text variant="bodyLarge" style={styles.paragraphText}>
              <Text style={[styles.firstWord, { color: borderColor }]}>
                {firstWord}{" "}
              </Text>
              {rest}
            </Text>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    gap: 24,
  },
  paragraph: {
    borderLeftWidth: 2,
    paddingLeft: 20,
  },
  paragraphText: {
    fontFamily: "Lora_400Regular",
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: 0,
  },
  body: {
    fontFamily: "Lora_400Regular",
    fontSize: 17,
    lineHeight: 32,
    color: "#2d2d2d",
    letterSpacing: 0.1,
  },
  firstWord: {
    fontFamily: "Lora_600SemiBold",
    fontSize: 18,
  },
});

export default FadeInMessages;
