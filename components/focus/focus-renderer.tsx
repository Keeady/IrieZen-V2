import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import styles from "../styles";
import { Button, Text, TextInput } from "react-native-paper";

export type FocusFlowRendererProps = {
  onComplete: () => void;
  title: string;
  label: string;
  text: string;
  setText: (text: string) => void;
  placeholder: string;
  disabled: boolean;
};

export default function FocusFlowRenderer({
  onComplete,
  title,
  label,
  text,
  setText,
  placeholder,
  disabled,
}: FocusFlowRendererProps) {
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
            flexGrow: 1,
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
              disabled={disabled}
            />
          </View>
          <Button
            mode="contained"
            onPress={onComplete}
            disabled={disabled}
            icon="arrow-down"
            contentStyle={styles.buttonContent}
            style={styles.continueButton}
            labelStyle={styles.buttonLabel}
          >
            Continue
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
