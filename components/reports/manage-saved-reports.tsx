import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Icon,
  IconButton,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

import {
  deleteReport,
  deleteAllReports,
} from "../reports/report-insight-reducer";
import { useAppDispatch, useAppSelector } from "../store.interface";

export default function ManageSavedReports() {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  // Replace reportInsight with your configured store key.
  const reports = useAppSelector((state) => state.reports);

  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = (date: string) => {
    Alert.alert(
      "Delete reflection?",
      `Permanently delete your reflection for ${date}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            if (deleting) return;

            setDeleting(true);
            setError(null);

            try {
              await dispatch(deleteReport(date)).unwrap();
            } catch {
              setError("Unable to delete this reflection.");
            } finally {
              setDeleting(false);
            }
          },
        },
      ],
    );
  };

  const handleDeleteAll = () => {
    Alert.alert(
      "Delete all reflections?",
      "All saved daily reports will be permanently removed from this device. This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {
            if (deleting) return;

            setDeleting(true);
            setError(null);

            try {
              await dispatch(deleteAllReports()).unwrap();
            } catch {
              setError("Unable to delete saved reports.");
            } finally {
              setDeleting(false);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon source="database-outline" size={23} color={colors.primary} />

        <Text style={[styles.title, { color: colors.primary }]}>
          Manage Saved Data
        </Text>
      </View>

      <Text style={[styles.description, { color: colors.onSurfaceVariant }]}>
        Your reflections are stored locally on this device. You can remove them
        at any time.
      </Text>

      <Text style={[styles.subheading, { color: colors.onSurface }]}>
        Saved daily reports ({reports.length})
      </Text>

      {reports.length === 0 ? (
        <View style={[styles.emptyCard, { backgroundColor: colors.surface }]}>
          <Icon source="book-heart-outline" size={28} color={colors.primary} />

          <Text
            style={{
              color: colors.onSurfaceVariant,
              textAlign: "center",
            }}
          >
            No saved reflections yet.
          </Text>
        </View>
      ) : (
        <View style={styles.reportList}>
          {reports.map((report) => (
            <Surface
              key={report.date}
              elevation={0}
              style={[
                styles.reportCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.outlineVariant,
                },
              ]}
            >
              <Icon
                source="calendar-blank-outline"
                size={22}
                color={colors.primary}
              />

              <View style={styles.reportText}>
                <Text style={[styles.reportDate, { color: colors.onSurface }]}>
                  {report.date}
                </Text>

                <Text
                  numberOfLines={2}
                  style={{
                    color: colors.onSurfaceVariant,
                    fontSize: 12,
                  }}
                >
                  {report.moods.moods.length > 0
                    ? [...new Set(report.moods.moods)].join(" · ")
                    : "Daily reflection"}
                </Text>
              </View>

              <IconButton
                icon="trash-can-outline"
                iconColor={colors.error}
                size={21}
                disabled={deleting}
                onPress={() => handleDelete(report.date)}
                accessibilityLabel={`Delete report for ${report.date}`}
              />
            </Surface>
          ))}
        </View>
      )}

      {deleting && <ActivityIndicator color={colors.primary} />}

      {error && (
        <Text accessibilityRole="alert" style={{ color: colors.error }}>
          {error}
        </Text>
      )}

      {reports.length > 0 && (
        <View
          style={[
            styles.deleteAllSection,
            {
              borderTopColor: colors.outlineVariant,
            },
          ]}
        >
          <Text style={[styles.subheading, { color: colors.onSurface }]}>
            Delete all reports
          </Text>

          <Text
            style={[styles.description, { color: colors.onSurfaceVariant }]}
          >
            Permanently remove all saved daily reports. Your preferences will
            not change.
          </Text>

          <Button
            mode="outlined"
            icon="trash-can-outline"
            textColor={colors.error}
            style={{
              borderColor: colors.error,
              borderRadius: 12,
            }}
            disabled={deleting}
            onPress={handleDeleteAll}
          >
            Delete all saved reports
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontFamily: "Lora_400Regular",
    fontSize: 21,
  },
  description: {
    fontFamily: "Lora_400Regular",
    fontSize: 14,
    lineHeight: 22,
  },
  subheading: {
    fontFamily: "Lora_400Regular",
    fontSize: 16,
  },
  reportList: {
    gap: 10,
  },
  reportCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    paddingLeft: 14,
    paddingRight: 4,
    paddingVertical: 8,
  },
  reportText: {
    flex: 1,
    gap: 5,
    marginLeft: 12,
  },
  reportDate: {
    fontFamily: "Lora_400Regular",
    fontSize: 15,
  },
  emptyCard: {
    borderRadius: 14,
    padding: 26,
    alignItems: "center",
    gap: 12,
  },
  deleteAllSection: {
    borderTopWidth: 1,
    paddingTop: 22,
    marginTop: 8,
    gap: 12,
  },
});
