import { getRandomBreathingIntroMessage } from "@/data/moodList";
import LottieView from "lottie-react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, useWindowDimensions } from "react-native";
import { ScreenProps } from "../screen.interface";
import BreathFlowRenderer from "./breath-renderer";
import { useStorageSettingsContext } from "@/providers/storage-settings-provider";
import { addBreathInsight } from "./breath-insight-reducer";
import { useAppDispatch } from "../store.interface";
import { useSavePreferenceSettingsContext } from "@/providers/save-preference-provider";

const steps = ["Breathe In", "Hold", "Breathe Out", "Hold"];
const duration = 4000; // 4s per step
const totalCycles = 4;

export default function BreathScreen({ onComplete }: ScreenProps) {
  const [message, setMessage] = useState("");
  const { width, height } = useWindowDimensions();
  const animationRef = useRef<LottieView | null>(null);
  const scale = useRef(new Animated.Value(1)).current;
  const [disabled, setDisabled] = useState(false);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const opacity = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { storageType } = useStorageSettingsContext();
  const { savedPreferences } = useSavePreferenceSettingsContext();

  const dispatch = useAppDispatch();

  useMemo(() => {
    const message = getRandomBreathingIntroMessage();
    setMessage(message);
  }, []);

  useEffect(() => {
    if (!running) return;

    const animate = () => {
      // pause animation on last "hold" steps
      if (stepIndex !== 3) {
        animationRef.current?.play();
      } else {
        animationRef.current?.pause();
      }

      // scale circle up on "breathe in", down on "breathe out", keep scale on "hold"
      let toValue: number;
      if (stepIndex === 0) {
        toValue = 1.5; // breathe in → scale up
      } else if (stepIndex === 1) {
        toValue = 1.5; // hold after breathe in → keep scaled
      } else if (stepIndex === 2) {
        toValue = 1; // breathe out → scale down
      } else {
        toValue = 1; // hold after breathe out → keep normal
      }

      Animated.timing(scale, {
        toValue,
        duration,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();

      // fade text in → hold → fade out
      opacity.setValue(0);
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.delay(duration - 2000),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();

      // schedule next step
      timerRef.current = setTimeout(() => {
        let nextStep = (stepIndex + 1) % steps.length;

        if (nextStep === 0) {
          setCycleCount((currentCycleCount) => {
            if (currentCycleCount + 1 >= totalCycles) {
              setRunning(false);
              setCompleted(true);
              animationRef.current?.reset();
              return currentCycleCount + 1;
            }
            return currentCycleCount + 1;
          });
        }

        setStepIndex(nextStep);
      }, duration);
    };

    animate();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [running, stepIndex]);

  const handleStart = () => {
    setCycleCount(0);
    setStepIndex(0);
    setRunning(true);
  };

  const saveBreath = useCallback(() => {
    if (storageType === "local" && savedPreferences?.moodsandbody_preference) {
      dispatch(addBreathInsight("Box Breathing"));
    }
  }, [storageType, dispatch, savedPreferences?.moodsandbody_preference]);

  return (
    <BreathFlowRenderer
      message={message}
      width={width}
      height={height}
      scale={scale}
      animationRef={animationRef}
      onComplete={() => {
        setDisabled(true);
        saveBreath();
        onComplete();
      }}
      disabled={disabled}
      running={running}
      completed={completed}
      cycleCount={cycleCount}
      stepIndex={stepIndex}
      totalCycles={totalCycles}
      steps={steps}
      handleStart={handleStart}
      opacity={opacity}
    />
  );
}
