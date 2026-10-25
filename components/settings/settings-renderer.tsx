import React from "react";
import { ScrollView, View } from "react-native";
import {
  Divider,
  RadioButton,
  Switch,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import styles from "../styles";
import { BODY_OPTIONS, BODY_TYPE } from "@/providers/body-settings-provider";
import {
  STORAGE_OPTIONS,
  StorageType,
} from "@/providers/storage-settings-provider";

type SettingsRendererProps = {
  onBodyTypeChange: (type: BODY_TYPE) => void;
  body: BODY_TYPE;
  storageType: StorageType;
  onStorageTypeChange: (type: StorageType) => void;
    savePreferences: SavePreferences;
  onSavePreferenceChange: (
    key: keyof SavePreferences,
    enabled: boolean,
  ) => void;
};

export type SavePreferences = {
  moodsAndBody: boolean;
  journal: boolean;
  brainDump: boolean;
  gratitudeAndIntentions: boolean;
};

export const DEFAULT_SAVE_PREFERENCES: SavePreferences = {
  moodsAndBody: false,
  journal: false,
  brainDump: false,
  gratitudeAndIntentions: false,
};

const SAVE_OPTIONS: {
  key: keyof SavePreferences;
  label: string;
  description: string;
}[] = [
  {
    key: "moodsAndBody",
    label: "Moods & body sensations",
    description: "Save your emotions and body sensation check-ins.",
  },
  {
    key: "journal",
    label: "Journal",
    description: "Save your journal entries and personal reflections.",
  },
  {
    key: "brainDump",
    label: "Brain dump",
    description: "Save your brain dump entries to revisit later.",
  },
  {
    key: "gratitudeAndIntentions",
    label: "Gratitude & intentions",
    description: "Save your gratitude and intention entries.",
  },
];

export default function SettingsRenderer({
  onBodyTypeChange,
  body,
  storageType,
  onStorageTypeChange,
  savePreferences,
  onSavePreferenceChange,
}: SettingsRendererProps) {
  const { colors } = useTheme();

  const renderOption = <T extends string>({
    value,
    label,
    description,
    selected,
    onPress,
    disabled = false,
    badge,
  }: {
    value: T;
    label: string;
    description?: string;
    selected: boolean;
    onPress: () => void;
    disabled?: boolean;
    badge?: string;
  }) => (
    <TouchableRipple
      key={value}
      onPress={onPress}
      rippleColor={colors.primary}
      style={[
        styles.option,
        {
          borderColor: selected ? colors.onSecondaryContainer : colors.outline,
          backgroundColor: selected ? colors.secondaryContainer : "transparent",
        },
      ]}
      disabled={disabled}
    >
      <View style={styles.optionInner}>
        <View style={styles.optionText}>
          <View style={styles.optionLabelRow}>
            <Text
              style={[
                styles.optionLabel,
                { color: selected ? colors.primary : colors.onSurface },
              ]}
            >
              {label}
            </Text>
            {badge && (
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: colors.secondary,
                    borderColor: colors.primary,
                  },
                ]}
              >
                <Text style={[styles.badgeText, { color: colors.primary }]}>
                  {badge}
                </Text>
              </View>
            )}
          </View>
          {description && (
            <Text
              style={[styles.optionDescription, { color: colors.onSurface }]}
            >
              {description}
            </Text>
          )}
        </View>

        <RadioButton
          value={value}
          status={selected ? "checked" : "unchecked"}
          onPress={onPress}
          color={colors.primary}
          uncheckedColor={colors.outline}
          disabled={disabled}
        />
      </View>
    </TouchableRipple>
  );

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View
        style={{
          flexGrow: 1,
          alignContent: "center",
          justifyContent: "center",
          padding: 10,
          gap: 24,
        }}
      >
        <Text style={[styles.title, { color: "#2C4A5E" }]}>Settings</Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>
            Body Sensation Map
          </Text>
          <Text style={[styles.sectionHint, { color: colors.onSurface }]}>
            Choose body type shown for body sensation screen.
          </Text>

          {/* Options */}
          {BODY_OPTIONS.map(({ value, label }) =>
            renderOption({
              value,
              label,
              selected: body === value,
              onPress: () => onBodyTypeChange(value),
            }),
          )}
        </View>

        <Divider style={{ backgroundColor: colors.outline }} />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>
            Data Storage
          </Text>
          <Text style={[styles.sectionHint, { color: colors.onSurface }]}>
            Choose where your data are stored.
          </Text>
          {STORAGE_OPTIONS.map(
            ({ value, label, description, disabled, badge }) =>
              renderOption({
                value,
                label,
                description,
                selected: storageType === value,
                onPress: () => onStorageTypeChange(value),
                disabled,
                badge,
              }),
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>
            What to Save
          </Text>

          <Text
            style={[styles.sectionHint, { color: colors.onSurfaceVariant }]}
          >
            Choose what you’d like to keep for future reflection. All options
            are off by default.
          </Text>

          {SAVE_OPTIONS.map(({ key, label, description }) => {
            const enabled = savePreferences[key];

            return (
              <View
                key={key}
                style={[
                  styles.option,
                  {
                    borderColor: enabled ? colors.primary : colors.outline,
                    backgroundColor: enabled
                      ? colors.secondaryContainer
                      : "transparent",
                  },
                ]}
              >
                <View style={styles.optionInner}>
                  <View style={styles.optionText}>
                    <Text
                      style={[
                        styles.optionLabel,
                        {
                          color: enabled
                            ? colors.onSecondaryContainer
                            : colors.onSurface,
                        },
                      ]}
                    >
                      {label}
                    </Text>

                    <Text
                      style={[
                        styles.optionDescription,
                        {
                          color: enabled
                            ? colors.onSecondaryContainer
                            : colors.onSurfaceVariant,
                        },
                      ]}
                    >
                      {description}
                    </Text>
                  </View>

                  <Switch
                    value={enabled}
                    onValueChange={(value) =>
                      onSavePreferenceChange(key, value)
                    }
                    color={colors.primary}
                    accessibilityLabel={`Save ${label.toLowerCase()}`}
                  />
                </View>
              </View>
            );
          })}

          <Text
            style={[styles.sectionHint, { color: colors.onSurfaceVariant }]}
          >
            Turning an option off stops future saving. It does not delete
            previously saved entries.
          </Text>
        </View>

        <Divider style={{ backgroundColor: colors.outline }} />
      </View>
    </ScrollView>
  );
}
