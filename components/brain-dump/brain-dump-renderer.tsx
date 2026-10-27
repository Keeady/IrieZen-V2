import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import styles from "../styles";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";

export type BrainDumpFlowRendererProps = {
  onComplete: (text: string) => void;
  title: string;
  label: string;
  placeholder: string;
  buttonLabel?: string;
  iconText?: string;
};

export default function BrainDumpFlowRenderer({
  onComplete,
  title,
  label,
  placeholder,
  buttonLabel,
  iconText
}: BrainDumpFlowRendererProps) {
  const [text, setText] = useState("");

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <ScrollView
        style={{}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text variant="headlineMedium" style={styles.title}>
            {title}
          </Text>
          <View style={{ flexGrow: 1 }}>
            <TextInput
              mode="outlined"
              label={label}
              value={text}
              onChangeText={setText}
              multiline
              numberOfLines={16}
              style={styles.textarea}
              placeholder={placeholder}
            />
          </View>
          <Button
            mode="contained"
            onPress={() => onComplete(text)}
            icon={iconText ?? "arrow-down"}
            contentStyle={styles.buttonContent}
            style={styles.continueButton}
            labelStyle={styles.buttonLabel}
          >
            {buttonLabel ?? "Continue"}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
