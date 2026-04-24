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
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
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
              numberOfLines={16}
              style={styles.textarea}
              placeholder={placeholder}
            />
          </View>
          <Button
            mode="contained"
            onPress={onComplete}
            disabled={disabled}
            style={styles.button}
          >
            Done
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
