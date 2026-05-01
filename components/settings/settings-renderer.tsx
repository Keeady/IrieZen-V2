import React from "react";
import { ScrollView, View } from "react-native";
import {
  Divider,
  RadioButton,
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
};

export default function SettingsRenderer({
  onBodyTypeChange,
  body,
  storageType,
  onStorageTypeChange,
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
          borderColor: selected ? colors.primary : colors.outline,
          backgroundColor: selected ? colors.secondary : "transparent",
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
            Choose how your mood data is stored.
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
      </View>
    </ScrollView>
  );
}
