
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Icon,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { JournalInsight } from "../screen.interface";

type Props = {
  entry: JournalInsight;
};

export default function JournalInsightCard({ entry }: Props) {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.secondaryContainer },
      ]}
    >
      <Text
        numberOfLines={expanded ? undefined : 3}
        style={[
          styles.content,
          { color: colors.onSecondaryContainer },
        ]}
      >
        {entry.text}
      </Text>

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
            {expanded ? "Show less" : "Read full entry"}
          </Text>

          <Icon
            source={expanded ? "chevron-up" : "chevron-down"}
            size={18}
            color={colors.primary}
          />
        </View>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 18,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    fontFamily: "Lora_400Regular",
    fontSize: 16,
  },
  promptLabel: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1.2,
    marginTop: 6,
  },
  prompt: {
    fontFamily: "Lora_400Regular",
    fontSize: 16,
    lineHeight: 25,
  },
  content: {
    fontFamily: "Lora_400Regular",
    fontSize: 14,
    lineHeight: 24,
  },
  expandButton: {
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  expandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
  },
});
