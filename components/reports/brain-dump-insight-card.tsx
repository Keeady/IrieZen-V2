
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Icon,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import type { BrainDumpInsight } from "../screen.interface";

type Props = {
  entry: BrainDumpInsight;
};

const QUESTIONS: {
  key: keyof Pick<
    BrainDumpInsight,
    "haveToDo" | "wins" | "feelings" |
    "worries" | "wantToDo"
  >;
  title: string;
}[] = [
  {
    key: "haveToDo",
    title: "Things I need to do",
  },
  {
    key: "wins",
    title: "One small win this week",
  },
  {
    key: "feelings",
    title: "How I'm actually feeling",
  },
  {
    key: "worries",
    title: "Things I'm worried about",
  },
  {
    key: "wantToDo",
    title: "Things I want to do but keep putting off",
  },
];

export default function BrainDumpInsightCard({
  entry,
}: Props) {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const responses = QUESTIONS.filter(
    (question) => entry[question.key]?.trim()
  );
  console.log(entry)

  // Initially show the first two completed prompts.
  const visibleResponses = expanded
    ? responses
    : responses.slice(0, 2);

  if (!responses.length) return null;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.secondaryContainer },
      ]}
    >
      {visibleResponses.map(({ key, title }) => (
        <View key={key} style={styles.response}>
          <Text
            style={[
              styles.question,
              { color: colors.onSecondaryContainer },
            ]}
          >
            {title}
          </Text>

          <Text
            style={[
              styles.answer,
              { color: colors.onSecondaryContainer },
            ]}
          >
            {entry[key]}
          </Text>
        </View>
      ))}

      {responses.length > 2 && (
        <TouchableRipple
          onPress={() => setExpanded(!expanded)}
          accessibilityRole="button"
          accessibilityState={{ expanded }}
          style={styles.expandButton}
        >
          <View style={styles.expandRow}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 13,
                fontWeight: "600",
              }}
            >
              {expanded
                ? "Show less"
                : `View all ${responses.length} responses`}
            </Text>

            <Icon
              source={
                expanded ? "chevron-up" : "chevron-down"
              }
              color={colors.primary}
              size={18}
            />
          </View>
        </TouchableRipple>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 18,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  heading: {
    fontFamily: "Lora_400Regular",
    fontSize: 16,
  },
  response: {
    gap: 6,
  },
  question: {
    fontFamily: "Lora_400Regular",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 22,
  },
  answer: {
    fontFamily: "Lora_400Regular",
    fontSize: 14,
    lineHeight: 23,
  },
  expandButton: {
    alignSelf: "flex-start",
    borderRadius: 8,
  },
  expandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
  },
});
