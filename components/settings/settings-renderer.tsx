import React from "react";
import { ScrollView, View } from "react-native";
import {
  RadioButton,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import styles from "../styles";
import { BODY_TYPE } from "@/providers/body-settings-provider";

type SettingsRendererProps = {
  onBodyTypeChange: (type: BODY_TYPE) => void;
  body: BODY_TYPE;
};

export default function SettingsRenderer({
  onBodyTypeChange,
  body,
}: SettingsRendererProps) {
  const { colors } = useTheme();

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
        }}
      >
        <Text style={[styles.title, { color: "#2C4A5E" }]}>Settings</Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>
            Body Sensation Map
          </Text>
          <Text style={[styles.sectionHint, { color: colors.onSurface }]}>
            Choose body type for body sensation screen.
          </Text>

          {/* Options */}
          {(["female", "male"] as BODY_TYPE[]).map((type) => (
            <TouchableRipple
              key={type}
              onPress={() => onBodyTypeChange(type)}
              rippleColor={colors.primary}
              style={[
                styles.option,
                {
                  borderColor: body === type ? colors.primary : colors.outline,
                  backgroundColor:
                    body === type ? colors.primary : "transparent",
                },
              ]}
            >
              <View style={styles.optionInner}>
                <Text
                  style={[
                    styles.optionLabel,
                    {
                      color:
                        body === type ? colors.onPrimary : colors.onSurface,
                    },
                  ]}
                >
                  {type === "female" ? "Female" : "Male"}
                </Text>
                <RadioButton
                  value={type}
                  status={body === type ? "checked" : "unchecked"}
                  onPress={() => onBodyTypeChange(type)}
                  color={colors.primary}
                  uncheckedColor={`${colors.outline}`}
                />
              </View>
            </TouchableRipple>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
