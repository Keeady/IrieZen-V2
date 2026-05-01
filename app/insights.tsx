import { View, StyleSheet } from "react-native";
import { useTheme, Text } from "react-native-paper";

export default function InsightsScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.headline, { color: colors.primary }]}>
        Insights
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headline: {
    fontSize: 28,
    fontFamily: "Lora_600SemiBold",
    marginBottom: 20,
  },
});
