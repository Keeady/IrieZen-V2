import { getRandomGratitudeIntroMessage, getRandomGratitudeLabelPrompt } from "@/data/moodList";
import { ScreenProps } from "../screen.interface";
import GratitudeFlowRenderer from "./gratitude-renderer";
import { useState } from "react";
import { useMemo } from "react";

export default function GratitudeScreen({ onComplete, height }: ScreenProps) {
    const placeholder = "Take a moment to reflect on what you're grateful for today. It can be anything - big or small!";
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
    const [label, setLabel] = useState("");
  const [disabled, setDisabled] = useState(false);

  useMemo(() => {
    const message = getRandomGratitudeIntroMessage();
    setMessage(message);
    const label = getRandomGratitudeLabelPrompt();
    setLabel(label);
  }, []);

  return (
    <GratitudeFlowRenderer
      onComplete={() => {
              setDisabled(true);
              onComplete();
            }}
      title={message}
      text={text}
      setText={setText}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
