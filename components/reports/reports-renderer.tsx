import { ScrollView, View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";
import styles from "../styles";
import { DailyInsight } from "../screen.interface";

type ReportsRendererProps = {
  currentDaily: DailyInsight | null;
  previousDaily: DailyInsight[];
};

export default function ReportsRenderer({
  currentDaily,
  previousDaily,
}: ReportsRendererProps) {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        {
          alignContent: "center",
          justifyContent: "center",
          paddingVertical: 100,
        },
        { backgroundColor: colors.background },
      ]}
    >
      <View
        style={{
          alignContent: "center",
          padding: 10,
          gap: 24,
        }}
      >
        <Text style={[styles.title, { color: "#2C4A5E" }]}>
          My Daily Insights
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.primary }]}>
          Today&apos;s Insights
        </Text>
        {!currentDaily && (
          <Text style={[styles.sectionHint, { color: colors.onSurface }]}>
            No insights available.
          </Text>
        )}
        {currentDaily && renderDailyInsight(0, currentDaily, colors)}

        <Text style={[styles.sectionTitle, { color: colors.primary }]}>
          Previous Insights
        </Text>
        {previousDaily.length === 0 && (
          <Text style={[styles.sectionHint, { color: colors.onSurface }]}>
            No previous insights available.
          </Text>
        )}
        {previousDaily.map((insight, index) =>
          renderDailyInsight(index, insight, colors),
        )}
      </View>
    </ScrollView>
  );
}

function renderDailyInsight(
  key: number,
  currentDaily: DailyInsight,
  colors: any,
) {
  if (!currentDaily) {
    return (
      <Text style={[styles.sectionHint, { color: colors.onSurface }]}>
        No insights available.
      </Text>
    );
  }

  return (
    <View
      key={key}
      style={{
        backgroundColor: colors.surface,
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
      }}
    >
      <Text style={[styles.sectionTitle, { color: colors.primary }]}>
        {currentDaily.date}
      </Text>
      <View style={[styles.section, { padding: 10 }]}>
        <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Moods</Text>
        {currentDaily.moods.moods.length === 0 ? (
          <Text style={[styles.sectionHint, { color: colors.onSurface }]}>
            No moods entries.
          </Text>
        ) : (
          <Text style={[styles.sectionHint, { color: colors.onSurface }]}>
            {currentDaily.moods.moods.join(", ")}
          </Text>
        )}
      </View>

      <Divider />
      <View style={[styles.section, { padding: 10 }]}>
        <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>
          Body Sensations
        </Text>
        {currentDaily.body.length === 0 ? (
          <Text style={[styles.sectionHint, { color: colors.onSurface }]}>
            No body sensations entries.
          </Text>
        ) : (
          <Text style={[styles.sectionHint, { color: colors.onSurface }]}>
            {currentDaily.body
              .map((b) => {
                const sideText = b.side ? ` (${b.side})` : "";
                return b.part + sideText;
              })
              .join(", ")}
          </Text>
        )}
      </View>

      <Divider />

      <View style={[styles.section, { padding: 10 }]}>
        <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>
          Breath Work
        </Text>
        {currentDaily.breath ? (
          <Text style={[styles.sectionHint, { color: colors.onSurface }]}>
            {currentDaily.breath}
          </Text>
        ) : (
          <Text style={[styles.sectionHint, { color: colors.onSurface }]}>
            No breath work entry.
          </Text>
        )}
      </View>

      <Divider />

      <View style={[styles.section, { padding: 10 }]}>
        <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>
          Intentions
        </Text>
        {currentDaily.intentions.length === 0 ? (
          <Text style={[styles.sectionHint, { color: colors.onSurface }]}>
            No intentions entries.
          </Text>
        ) : (
          currentDaily.intentions.map((i, index) => (
            <View key={index}>
              <Text style={[styles.sectionHint, { color: colors.onSurface }]}>
                {i.label}
              </Text>
              <Text
                style={[styles.sectionContent, { color: colors.onSurface }]}
              >
                {i.text}
              </Text>
            </View>
          ))
        )}
      </View>

      <Divider />

      <View style={[styles.section, { padding: 10 }]}>
        <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>
          Gratitude
        </Text>
        {currentDaily.gratitude.length === 0 ? (
          <Text style={[styles.sectionHint, { color: colors.onSurface }]}>
            No gratitude entries.
          </Text>
        ) : (
          currentDaily.gratitude.map((g, index) => (
            <View key={index}>
              <Text style={[styles.sectionHint, { color: colors.onSurface }]}>
                {g.label}
              </Text>
              <Text
                style={[styles.sectionContent, { color: colors.onSurface }]}
              >
                {g.text}
              </Text>
            </View>
          ))
        )}
      </View>

      <Divider />
      <View style={[styles.section, { padding: 10 }]}>
        <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Wins</Text>
        {currentDaily.wins.length === 0 ? (
          <Text style={[styles.sectionHint, { color: colors.onSurface }]}>
            No wins entries.
          </Text>
        ) : (
          currentDaily.wins.map((w, index) => (
            <View key={index}>
              <Text style={[styles.sectionHint, { color: colors.onSurface }]}>
                {w.label}
              </Text>
              <Text
                style={[styles.sectionContent, { color: colors.onSurface }]}
              >
                {w.text}
              </Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}
