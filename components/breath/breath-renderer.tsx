import LottieView from "lottie-react-native";
import { Animated, View } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "../styles";

export type BreathFlowRendererProps = {
  message: string;
  height: number;
  width: number;
  scale: Animated.Value;
  animationRef: React.RefObject<LottieView | null>;
  running: boolean;
  completed: boolean;
  cycleCount: number;
  totalCycles: number;
  stepIndex: number;
  steps: string[];
  opacity: Animated.Value;
  handleStart: () => void;
  onComplete: () => void;
  disabled: boolean;
};

export default function BreathFlowRenderer({
  message,
  height,
  width,
  scale,
  animationRef,
  running,
  completed,
  cycleCount,
  totalCycles,
  stepIndex,
  steps,
  opacity,
  handleStart,
  onComplete,
  disabled,
}: BreathFlowRendererProps) {
  return (
    <View style={{ justifyContent: "center" }}>
      <Text
        variant="headlineMedium"
        style={[
          styles.title,
          {
            position: "absolute",
            top: 100,
            left: 5,
            right: 5,
            textAlign: "center",
            zIndex: 10, // ensures it appears above animation
          },
        ]}
      >
        {message}
      </Text>
      <View
        style={{
          alignItems: "center",
        }}
      >
        {/* Circle animation */}
        <Animated.View style={{ transform: [{ scale }] }}>
          <LottieView
            ref={animationRef}
            source={require("../../assets/animation/breathing.json")}
            autoPlay={false}
            loop
            style={{ width, height }}
          />
        </Animated.View>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 100,
          width,
        }}
      >
        {running ? (
          <>
            <Animated.Text style={[styles.instruction, { opacity }]}>
              {steps[stepIndex]}
            </Animated.Text>
            <Text style={styles.subtext}>
              Cycle {cycleCount + 1} of {totalCycles}
            </Text>
          </>
        ) : !completed ? (
          <Button
            mode="contained"
            onPress={handleStart}
            contentStyle={styles.buttonContent}
            style={styles.continueButton}
            labelStyle={styles.buttonLabel}
          >
            Start
          </Button>
        ) : (
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Button
              mode="contained"
              onPress={handleStart}
              contentStyle={styles.buttonContent}
              style={styles.continueButton}
              labelStyle={styles.buttonLabel}
              disabled={disabled}
            >
              Restart
            </Button>
            <Button
              mode="contained"
              onPress={onComplete}
              disabled={disabled}
              icon="arrow-right"
              contentStyle={styles.buttonContent}
              style={styles.continueButton}
              labelStyle={styles.buttonLabel}
            >
              Continue
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}
