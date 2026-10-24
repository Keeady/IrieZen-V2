import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Icon,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { getJournalPrompt, JOURNAL_PROMPTS } from "./journal-prompts";
import { ScreenProps } from "../screen.interface";

export type JournalEntry = {
  coreMood: string;
  selectedMood?: string;
  prompt: string;
  content: string;
};

type JournalScreenProps = {
  coreMood: string;
  selectedMood?: string;
  //onSave: (entry: JournalEntry) => Promise<void>;
  //onBack?: () => void;
};

export default function JournalScreen({
  coreMood,
  selectedMood,
  //onSave,
  //onBack,
}: JournalScreenProps & ScreenProps) {
  const { colors } = useTheme();

  const [content, setContent] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);

  const prompts = JOURNAL_PROMPTS[coreMood] ?? JOURNAL_PROMPTS.Unsure;

  const activePrompt = getJournalPrompt(coreMood, promptIndex);

  const wordCount = useMemo(() => {
    const text = content.trim();
    return text ? text.split(/\s+/).length : 0;
  }, [content]);

  const handleSave = async () => {
    if (!content.trim() || saving) return;

    setSaving(true);
    setError(null);

    try {
    } catch {
      setError("We couldn't save your entry. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const changePrompt = () => {
    setPromptIndex((index) => (index + 1) % prompts.length);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={"padding"}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
         contentContainerStyle={{
          justifyContent: "center",
          flex: 1,
          paddingTop: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.onSurface }]}>
            Let your thoughts flow.
          </Text>
        </View>

        {/* Writing area */}
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
            value={content}
            onChangeText={setContent}
            placeholder="Dear diary, today I've been feeling..."
            placeholderTextColor={colors.onSurfaceVariant}
            editable={!saving}
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                color: colors.onSurface,
              },
            ]}
            contentStyle={styles.inputContent}
          />
        </View>

        {/* Save */}
        {error && (
          <Text
            accessibilityRole="alert"
            style={{
              color: colors.error,
              textAlign: "center",
              marginTop: 14,
            }}
          >
            {error}
          </Text>
        )}

        <Button
          mode="contained"
          onPress={handleSave}
          disabled={disabled}
          contentStyle={styles.saveButtonContent}
          style={styles.saveButton}
          labelStyle={styles.saveButtonLabel}
        >
          {"Complete"}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
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
  navigation: {
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
    fontSize: 27,
    lineHeight: 37,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: "Lora_400Regular",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  moodChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  promptCard: {
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
  },
  promptHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  promptLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.2,
  },
  prompt: {
    fontFamily: "Lora_400Regular",
    fontSize: 19,
    lineHeight: 29,
    marginBottom: 12,
  },
  encouragement: {
    fontSize: 13,
    lineHeight: 21,
  },
  newPromptButton: {
    alignSelf: "flex-start",
    marginTop: 14,
    marginLeft: -10,
  },
  editorCard: {
    borderWidth: 1,
    borderRadius: 18,
    overflow: "hidden",
    minHeight: 250,
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
  editorFooter: {
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  saveButton: {
    borderRadius: 14,
    marginTop: 26,
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
  },
});
