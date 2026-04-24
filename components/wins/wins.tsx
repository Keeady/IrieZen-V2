import {
  getRandomWinsLabelPrompt,
  getRandomWinsIntroMessage,
} from "@/data/moodList";
import { ScreenProps } from "../screen.interface";
import WinsFlowRenderer from "./wins-renderer";
import { useState } from "react";
import { useMemo } from "react";

export default function WinsScreen({ onComplete }: ScreenProps) {
  const placeholder = "";
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [label, setLabel] = useState("");
  const [disabled, setDisabled] = useState(false);

  useMemo(() => {
    const message = getRandomWinsIntroMessage();
    setMessage(message);
    const label = getRandomWinsLabelPrompt();
    setLabel(label);
  }, []);

  return (
    <WinsFlowRenderer
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
