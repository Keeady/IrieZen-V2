import {
    getRandomFocusIntroMessage,
  getRandomFocusLabelPrompt,
} from "@/data/moodList";
import { ScreenProps } from "../screen.interface";
import FocusFlowRenderer from "./focus-renderer";
import { useState, useMemo } from "react";

export default function FocusScreen({ onComplete, height }: ScreenProps) {
  const placeholder =
    "";
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [label, setLabel] = useState("");
  const [disabled, setDisabled] = useState(false);

  useMemo(() => {
    const message = getRandomFocusIntroMessage();
    setMessage(message);
    const label = getRandomFocusLabelPrompt();
    setLabel(label);
  }, []);

  return (
    <FocusFlowRenderer
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
