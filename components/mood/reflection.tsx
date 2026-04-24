import { View } from "react-native";
import { Button, useTheme, Text } from "react-native-paper";
import LottieView from "lottie-react-native";
import { Animated } from "react-native";
import FadeInMessages from "./animate";
import styles from "./styles";

export type ReflectionScreenProps = {
  messages: string[];
  onComplete: () => void;
  loadingReflection: boolean | undefined;
  height: number;
  title: string;
};

export default function ReflectionScreen({
  messages,
  onComplete,
  loadingReflection,
  height,
  title,
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
          <Text style={styles.headline}>
            {title}
          </Text>
          <FadeInMessages messages={messages} />
          <Button
            mode="contained"
            onPress={() => {
              // Complete the mood screen
              onComplete();
            }}
            style={{
              marginHorizontal: 24,
              marginTop: 32,
              marginBottom: 50,
              borderRadius: 2, // sharp corners vs default pill shape
              borderWidth: 1.5,
              borderColor: colors.primary,
            }}
            labelStyle={{
              fontFamily: "Lora_400Regular", // matches reflection typography
              fontSize: 15,
              letterSpacing: 1.8, // spaced caps feel intentional and calm
              textTransform: "uppercase",
            }}
          >
            Continue
          </Button>
        </>
      )}
    </View>
  );
}
