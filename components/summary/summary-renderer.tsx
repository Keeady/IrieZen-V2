import { ScrollView, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import styles from "../styles";

export type SummaryRendererProps = {
  onComplete: () => void;
  coreEmotion: string;
  goodJobMessage: string;
  reflectionMessage: string;
  mantraMessage: string;
};

export default function SummaryRenderer({
  goodJobMessage,
  reflectionMessage,
  mantraMessage,
}: SummaryRendererProps) {
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        minHeight: "100%",
      }}
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
        <Text variant="titleLarge" style={styles.subheadline}>
          {reflectionMessage}
        </Text>
        <Text variant="bodyLarge" style={styles.subtext}>
          Remember: {mantraMessage}
        </Text>
      </View>
    </ScrollView>
  );
}
