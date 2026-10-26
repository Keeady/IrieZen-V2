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
import BrainDumpField from "./brain-dump-field";
import { ScreenProps } from "../screen.interface";

export type BrainDumpEntry = {
  todos: string;
  smallWin: string;
  feelings: string;
  worries: string;
  puttingOff: string;
};

type BrainDumpScreenProps = {
};

export default function BrainDumpScreen({
    onComplete
}: BrainDumpScreenProps & ScreenProps) {
  const { colors } = useTheme();

  const [todos, setTodos] = useState("");
  const [smallWin, setSmallWin] = useState("");
  const [feelings, setFeelings] = useState("");
  const [worries, setWorries] = useState("");
  const [puttingOff, setPuttingOff] = useState("");
  const [disabled, setDisabled] = useState(false);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        contentContainerStyle={{
          justifyContent: "center",
          paddingTop: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.onSurface }]}>
            Clear your mind.
          </Text>
        </View>
        <View
          style={{
            //flexGrow: 1,
          }}
        >
          {/* Prompts */}
          <View style={{}}>
            <BrainDumpField
              title="Things I need to do"
              subtitle="List what’s on your plate."
              value={todos}
              onChangeText={setTodos}
              placeholder=""
              minHeight={140}
            />
          </View>
          <View style={{}}>
            <BrainDumpField
              title="One small win this week"
              subtitle="Even a small step still counts."
              value={smallWin}
              onChangeText={setSmallWin}
              placeholder=""
              //minHeight={120}
            />
          </View>
          <View style={{}}>
            <BrainDumpField
              title="How I'm actually feeling this week"
              subtitle="Be honest with yourself here."
              value={feelings}
              onChangeText={setFeelings}
              placeholder=""
              //minHeight={140}
            />
          </View>
          <View style={{}}>
            <BrainDumpField
              title="Things I'm worried about"
              subtitle="Name the thoughts that keep circling."
              value={worries}
              onChangeText={setWorries}
              placeholder=""
              //minHeight={140}
            />
          </View>
          <View style={{}}>
            <BrainDumpField
              title="Things I want to do but keep putting off"
              subtitle="Sometimes naming it is the first step."
              value={puttingOff}
              onChangeText={setPuttingOff}
              placeholder=""
              //minHeight={140}
            />
          </View>
 

          <Button
            mode="contained"
            onPress={onComplete}
            disabled={!disabled}
            contentStyle={styles.saveButtonContent}
            style={styles.saveButton}
            labelStyle={styles.saveButtonLabel}
          >
            {"Complete"}
          </Button>
        </View>
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
    fontSize: 16,
  },
  inputContent: {
    fontFamily: "Lora_400Regular",
    fontSize: 15,
    lineHeight: 25,
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 18,
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
});
