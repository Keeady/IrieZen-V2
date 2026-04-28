import LottieView from "lottie-react-native";
import { Animated, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import styles from "../styles";
import FadeInMessages from "./animate";

export type ReflectionScreenProps = {
  messages: string[];
  onPress: () => void;
  loadingReflection: boolean | undefined;
  height: number;
  title: string;
  disabled: boolean;
};

export default function ReflectionScreen({
  messages,
  onPress,
  loadingReflection,
  height,
  title,
  disabled,
}: ReflectionScreenProps) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          alignItems: "center",
          alignContent: "center",
          justifyContent: "flex-start",
          flexGrow: 1,
          backgroundColor: colors.secondary,
          minHeight: height, // ensure it fills the screen even if messages are short
        },
      ]}
    >
      {loadingReflection === true && (
        <Animated.View>
          <LottieView
            source={require("../../assets/animation/paperplane.json")}
            autoPlay={true}
            loop
            style={{ width: 300, height: 300 }}
          />
        </Animated.View>
      )}

      {loadingReflection === false && (
        <>
          <Text style={styles.headline}>{title}</Text>
          <FadeInMessages messages={messages} />
          <Button
            mode="contained"
            onPress={onPress}
            style={{
              marginHorizontal: 24,
              marginTop: 32,
              marginBottom: 50,
              borderRadius: 2,
              borderWidth: 1.5,
              borderColor: colors.primary,
            }}
            labelStyle={{
              fontFamily: "Lora_400Regular",
              fontSize: 15,
              letterSpacing: 1.8,
              textTransform: "uppercase",
            }}
            disabled={disabled}
          >
            Continue
          </Button>
        </>
      )}
    </View>
  );
}
