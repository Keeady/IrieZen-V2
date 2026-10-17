import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import styles from "../styles";
import { Button, Text, TextInput } from "react-native-paper";

export type WinsFlowRendererProps = {
  onComplete: () => void;
  title: string;
  label: string;
  text: string;
  setText: (text: string) => void;
  placeholder: string;
  disabled: boolean;
};

export default function WinsFlowRenderer({
  onComplete,
  title,
  label,
  text,
  setText,
  placeholder,
  disabled,
}: WinsFlowRendererProps) {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <ScrollView
        style={{}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          flexGrow: 1,
          paddingTop: 100,
        }}
      >
        <View style={{ flexGrow: 1 }}>
          <Text variant="headlineMedium" style={styles.title}>
            {title}
          </Text>
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            <TextInput
              mode="outlined"
              label={label}
              value={text}
              onChangeText={setText}
              multiline
              numberOfLines={5}
              style={styles.textarea}
              placeholder={placeholder}
            />
          </View>
          <Button
            mode="contained"
            onPress={onComplete}
            disabled={disabled}
            icon="arrow-right"
            contentStyle={styles.buttonContent}
            style={styles.continueButton}
            labelStyle={styles.buttonLabel}
          >
            Complete
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
