import { ScrollView, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export type SummaryRendererProps = {
  onComplete: () => void;
  coreEmotion: string;
  goodJobMessage: string;
  reflectionMessage: string;
  mantraMessage: string;
};

export default function SummaryRenderer({
  onComplete,
  coreEmotion,
  goodJobMessage,
  reflectionMessage,
  mantraMessage,
}: SummaryRendererProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={{
          flexGrow: 1,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Text variant="headlineMedium" style={styles.title}>
          {goodJobMessage} 🎉
        </Text>
        <Text variant="titleLarge" style={styles.message}>
          {reflectionMessage}
        </Text>
        <Text variant="bodyLarge" style={styles.mantra}>
          Remember: {mantraMessage}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: "100%",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },
  message: {
    marginBottom: 20,
    textAlign: "center",
    color: "#555",
  },
  mantra: {
    fontStyle: "italic",
    textAlign: "center",
    color: "#777",
  },
});
