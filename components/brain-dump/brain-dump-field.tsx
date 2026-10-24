import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  Button,
  Icon,
  IconButton,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

type BrainDumpFieldProps = {
  title: string;
  subtitle?: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  minHeight?: number;
};

export default function BrainDumpField({
  title,
  subtitle,
  value,
  onChangeText,
  placeholder,
  minHeight = 130,
}: BrainDumpFieldProps) {
  const { colors } = useTheme();

  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
          {title}
        </Text>
      </View>

      <View
        style={[
          styles.editorCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.outlineVariant,
          },
        ]}
      >
        <TextInput
          mode="flat"
          multiline
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.onSurfaceVariant}
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              color: colors.onSurface,
              //minHeight
            },
          ]}
          contentStyle={styles.inputContent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 48,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: "600",
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  title: {
    fontFamily: "Lora_400Regular",
    fontSize: 28,
    lineHeight: 38,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "Lora_400Regular",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    maxWidth: 340,
  },
  sections: {
    gap: 16,
  },
  sectionCard: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
  },
  sectionHeader: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontFamily: "Lora_400Regular",
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    lineHeight: 20,
  },
  input: {
    flex: 1,
    minHeight: 210,
    fontSize: 16,
  },
  inputContent: {
    fontFamily: "Lora_400Regular",
    fontSize: 16,
    lineHeight: 27,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 16,
    textAlignVertical: "top",
  },
  summaryCard: {
    borderRadius: 18,
    padding: 18,
    marginTop: 22,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  summaryText: {
    fontFamily: "Lora_400Regular",
    fontSize: 17,
    lineHeight: 25,
    marginBottom: 6,
  },
  summarySubtext: {
    fontSize: 13,
    lineHeight: 21,
  },
  errorText: {
    textAlign: "center",
    marginTop: 16,
  },
  saveButton: {
    borderRadius: 14,
    marginTop: 24,
  },
  saveButtonContent: {
    minHeight: 54,
    flexDirection: "row-reverse",
  },
  saveButtonLabel: {
    fontFamily: "Lora_400Regular",
    fontSize: 15,
    letterSpacing: 0.3,
  },
  footer: {
    fontFamily: "Lora_400Regular",
    fontSize: 12,
    textAlign: "center",
    marginTop: 18,
    lineHeight: 20,
  },
  editorCard: {
    borderWidth: 1,
    borderRadius: 18,
    overflow: "hidden",
    minHeight: 250,
  },
});
