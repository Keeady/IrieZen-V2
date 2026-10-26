import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Icon,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import type { DailyInsight } from "../screen.interface";
import JournalInsightCard from "./journal-insight-card";
import BrainDumpInsightCard from "./brain-dump-insight-card";

type ReportsRendererProps = {
  currentDaily: DailyInsight | null;
  previousDaily: DailyInsight[];
};

type LabeledEntry = {
  label: string;
  text: string;
};

function uniqueStrings(items: string[]): string[] {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))];
}

function ReflectionSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  const { colors } = useTheme();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeading}>
        <Icon source={icon} size={20} color={colors.primary} />
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}

function EntryList({ entries }: { entries: LabeledEntry[] }) {
  const { colors } = useTheme();

  const validEntries = entries.filter((entry) => entry.text?.trim());

  return (
    <View style={styles.entryList}>
      {validEntries.map((entry, index) => (
        <View key={`${entry.label}-${index}`} style={styles.entry}>
          {!!entry.label?.trim() && (
            <Text style={[styles.entryLabel, { color: colors.primary }]}>
              {entry.label}
            </Text>
          )}
          <Text style={[styles.bodyText, { color: colors.onSurfaceVariant }]}>
            {entry.text}
          </Text>
        </View>
      ))}
    </View>
  );
}

function MoodTags({ moods }: { moods: string[] }) {
  const { colors } = useTheme();

  return (
    <View style={styles.tags}>
      {uniqueStrings(moods).map((mood) => (
        <View
          key={mood}
          style={[
            styles.tag,
            {
              backgroundColor: colors.secondaryContainer,
            },
          ]}
        >
          <Text
            style={[styles.tagText, { color: colors.onSecondaryContainer }]}
          >
            {mood}
          </Text>
        </View>
      ))}
    </View>
  );
}

function DailyReflectionCard({
  insight,
  compact = false,
}: {
  insight: DailyInsight;
  compact?: boolean;
}) {
  const { colors } = useTheme();

  const moods = uniqueStrings(insight.moods?.moods ?? []);

  const body = uniqueStrings(
    (insight.body ?? []).map(
      (item) => `${item.part}${item.side ? ` (${item.side})` : ""}`,
    ),
  );

  const intentions = (insight.intentions ?? []).filter((entry) =>
    entry.text?.trim(),
  );

  const gratitude = (insight.gratitude ?? []).filter((entry) =>
    entry.text?.trim(),
  );

  const wins = (insight.wins ?? []).filter((entry) => entry.text?.trim());

  const breath = insight.breath?.trim();

  const journalEntries = insight.journal ?? [];
  const brainDumpEntries = insight.brainDump ?? [];

  const hasContent =
    moods.length > 0 ||
    body.length > 0 ||
    !!breath ||
    intentions.length > 0 ||
    gratitude.length > 0 ||
    wins.length > 0;
  journalEntries.length > 0 || brainDumpEntries.length > 0;

  return (
    <Surface
      elevation={0}
      style={[
        styles.reflectionCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.outlineVariant,
        },
      ]}
    >
      {!compact && (
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderText}>
            <Text style={[styles.eyebrow, { color: colors.primary }]}>
              TODAY'S REFLECTION
            </Text>
            <Text style={[styles.dateTitle, { color: colors.onSurface }]}>
              {insight.date}
            </Text>
          </View>
          <Icon source="weather-sunny" size={23} color={colors.primary} />
        </View>
      )}

      {!hasContent && (
        <Text style={[styles.bodyText, { color: colors.onSurfaceVariant }]}>
          Your reflections will appear here after your check-in.
        </Text>
      )}

      {moods.length > 0 && (
        <ReflectionSection icon="heart-outline" title="Moods">
          <MoodTags moods={moods} />
        </ReflectionSection>
      )}

      {(body.length > 0 || !!breath) && (
        <View
          style={[
            styles.awarenessCard,
            {
              backgroundColor: colors.secondaryContainer,
            },
          ]}
        >
          {body.length > 0 && (
            <View style={styles.awarenessRow}>
              <Icon source="human" size={22} color={colors.primary} />
              <View style={styles.awarenessText}>
                <Text
                  style={[
                    styles.awarenessTitle,
                    {
                      color: colors.onSecondaryContainer,
                    },
                  ]}
                >
                  Body
                </Text>
                <Text
                  style={[
                    styles.bodyText,
                    {
                      color: colors.onSecondaryContainer,
                    },
                  ]}
                >
                  {body.join(" · ")}
                </Text>
              </View>
            </View>
          )}

          {!!breath && (
            <View
              style={[
                styles.awarenessRow,
                body.length > 0 && styles.awarenessSpacing,
              ]}
            >
              <Icon source="weather-windy" size={22} color={colors.primary} />
              <View style={styles.awarenessText}>
                <Text
                  style={[
                    styles.awarenessTitle,
                    {
                      color: colors.onSecondaryContainer,
                    },
                  ]}
                >
                  Breathing
                </Text>
                <Text
                  style={[
                    styles.bodyText,
                    {
                      color: colors.onSecondaryContainer,
                    },
                  ]}
                >
                  {breath}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}

      {gratitude.length > 0 && (
        <ReflectionSection
          icon="heart-multiple-outline"
          title="A moment of gratitude"
        >
          <EntryList entries={gratitude} />
        </ReflectionSection>
      )}

      {intentions.length > 0 && (
        <ReflectionSection icon="sprout-outline" title="An intention to carry">
          <EntryList entries={intentions} />
        </ReflectionSection>
      )}

      {wins.length > 0 && (
        <ReflectionSection icon="star-four-points-outline" title="Small wins">
          <EntryList entries={wins} />
        </ReflectionSection>
      )}

      {/* Journal entries */}
      {journalEntries.length > 0 && (
        <ReflectionSection icon="book-open-outline" title="My journal">
          <View style={{ gap: 12 }}>
            {journalEntries.map((entry, index) => (
              <JournalInsightCard entry={entry} key={index} />
            ))}
          </View>
        </ReflectionSection>
      )}

      {/* Brain dump entries */}
      {brainDumpEntries.length > 0 && (
        <ReflectionSection icon="cloud-outline" title="My brain dump">
          <View style={{ gap: 12 }}>
            {brainDumpEntries.map((entry, index) => (
              <BrainDumpInsightCard entry={entry} key={index} />
            ))}
          </View>
        </ReflectionSection>
      )}
    </Surface>
  );
}

function PreviousReflection({ insight }: { insight: DailyInsight }) {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const moods = uniqueStrings(insight.moods?.moods ?? []);

  return (
    <View
      style={[
        styles.historyCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.outlineVariant,
        },
      ]}
    >
      <TouchableRipple
        onPress={() => setExpanded(!expanded)}
        accessibilityRole="button"
        accessibilityLabel={`Reflection for ${insight.date}`}
        accessibilityState={{ expanded }}
        style={styles.historyTouchable}
      >
        <View style={styles.historyHeader}>
          <View style={styles.historyText}>
            <Text style={[styles.historyDate, { color: colors.onSurface }]}>
              {insight.date}
            </Text>

            <Text
              numberOfLines={2}
              style={[
                styles.historySummary,
                { color: colors.onSurfaceVariant },
              ]}
            >
              {moods.length ? moods.join(" · ") : "A moment of reflection"}
            </Text>
          </View>

          <Icon
            source={expanded ? "chevron-up" : "chevron-down"}
            size={22}
            color={colors.primary}
          />
        </View>
      </TouchableRipple>

      {expanded && (
        <View style={styles.historyDetails}>
          <DailyReflectionCard insight={insight} compact />
        </View>
      )}
    </View>
  );
}

export default function ReportsRenderer({
  currentDaily,
  previousDaily,
}: ReportsRendererProps) {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageHeader}>
        <View style={styles.pageHeaderText}>
          <Text style={[styles.eyebrow, { color: colors.primary }]}>
            YOUR REFLECTION SPACE
          </Text>

          <Text style={[styles.pageTitle, { color: colors.onSurface }]}>
            My Insights
          </Text>
        </View>

        <View
          style={[
            styles.headerIcon,
            {
              backgroundColor: colors.secondaryContainer,
            },
          ]}
        >
          <Icon source="flower-outline" size={24} color={colors.primary} />
        </View>
      </View>

      <Text style={[styles.pageSubtitle, { color: colors.onSurfaceVariant }]}>
        A quiet look at the moments you've made space for yourself.
      </Text>

      {/* Today's reflection */}
      {currentDaily ? (
        <DailyReflectionCard insight={currentDaily} />
      ) : (
        <View
          style={[
            styles.emptyCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <Icon source="book-heart-outline" size={32} color={colors.primary} />
          <Text style={[styles.emptyTitle, { color: colors.onSurface }]}>
            A fresh day to check in
          </Text>
          <Text style={[styles.emptyText, { color: colors.onSurfaceVariant }]}>
            When you take a moment to reflect, your insights will appear here.
          </Text>
        </View>
      )}

      {/* History */}
      <View style={styles.historySection}>
        <View style={styles.historyTitleRow}>
          <Text
            style={[styles.historySectionTitle, { color: colors.onSurface }]}
          >
            Previous reflections
          </Text>

          <Icon
            source="calendar-month-outline"
            size={22}
            color={colors.primary}
          />
        </View>

        {previousDaily.length === 0 ? (
          <Text
            style={[styles.emptyHistory, { color: colors.onSurfaceVariant }]}
          >
            Your past reflections will find a home here as you continue checking
            in.
          </Text>
        ) : (
          <View style={styles.historyList}>
            {previousDaily.map((insight, index) => (
              <PreviousReflection
                key={`${insight.date}-${index}`}
                insight={insight}
              />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 64,
    justifyContent: "center",
  },
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  pageHeaderText: {
    flex: 1,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.4,
    marginBottom: 8,
  },
  pageTitle: {
    fontFamily: "Lora_400Regular",
    fontSize: 30,
    lineHeight: 40,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  pageSubtitle: {
    fontFamily: "Lora_400Regular",
    fontSize: 14,
    lineHeight: 23,
    marginTop: 12,
    marginBottom: 26,
  },

  // Daily reflection
  reflectionCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    gap: 22,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardHeaderText: {
    flex: 1,
  },
  dateTitle: {
    fontFamily: "Lora_400Regular",
    fontSize: 20,
    lineHeight: 29,
  },

  // Reflection sections
  section: {
    gap: 12,
    paddingBottom: 2,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sectionTitle: {
    fontFamily: "Lora_400Regular",
    fontSize: 16,
    lineHeight: 24,
  },
  bodyText: {
    fontFamily: "Lora_400Regular",
    fontSize: 14,
    lineHeight: 23,
  },

  // Mood tags
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  tagText: {
    fontFamily: "Lora_400Regular",
    fontSize: 13,
  },

  // Body and breathing
  awarenessCard: {
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  awarenessRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  awarenessText: {
    flex: 1,
    gap: 4,
  },
  awarenessTitle: {
    fontFamily: "Lora_400Regular",
    fontSize: 15,
    lineHeight: 23,
  },
  awarenessSpacing: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(100,140,160,0.25)",
    paddingTop: 14,
  },

  // Gratitude / intentions / wins
  entryList: {
    gap: 12,
  },
  entry: {
    gap: 5,
  },
  entryLabel: {
    fontSize: 12,
    fontWeight: "600",
  },

  // History
  historySection: {
    marginTop: 34,
  },
  historyTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  historySectionTitle: {
    fontFamily: "Lora_400Regular",
    fontSize: 21,
    lineHeight: 30,
  },
  historyList: {
    gap: 12,
  },
  historyCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  historyTouchable: {
    borderRadius: 16,
  },
  historyHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
    minHeight: 76,
  },
  historyText: {
    flex: 1,
    gap: 5,
  },
  historyDate: {
    fontFamily: "Lora_400Regular",
    fontSize: 16,
    lineHeight: 23,
  },
  historySummary: {
    fontSize: 13,
    lineHeight: 19,
  },
  historyDetails: {
    padding: 12,
    paddingTop: 0,
  },

  // Empty states
  emptyCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 28,
    alignItems: "center",
    gap: 12,
  },
  emptyTitle: {
    fontFamily: "Lora_400Regular",
    fontSize: 19,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 23,
    textAlign: "center",
  },
  emptyHistory: {
    fontFamily: "Lora_400Regular",
    fontSize: 14,
    lineHeight: 23,
  },
});
