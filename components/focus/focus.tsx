import {
  getRandomFocusIntroMessage,
  getRandomFocusLabelPrompt,
} from "@/data/moodList";
import { ScreenProps, useAppDispatch } from "../screen.interface";
import FocusFlowRenderer from "./focus-renderer";
import { useState, useMemo, useCallback } from "react";
import { useStorageSettingsContext } from "@/providers/storage-settings-provider";
import { addIntentionsInsight } from "./intentions-insight-reducer";

export default function FocusScreen({ onComplete, height }: ScreenProps) {
  const placeholder = "";
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [label, setLabel] = useState("");
  const [disabled, setDisabled] = useState(false);

  const { storageType } = useStorageSettingsContext();
  const dispatch = useAppDispatch();

  useMemo(() => {
    const message = getRandomFocusIntroMessage();
    setMessage(message);
    const label = getRandomFocusLabelPrompt();
    setLabel(label);
  }, []);

  const saveFocus = useCallback(() => {
    if (storageType === "local") {
      dispatch(addIntentionsInsight({ label, text }));
    }
  }, [text, label, storageType]);

  return (
    <FocusFlowRenderer
      onComplete={() => {
        setDisabled(true);
        saveFocus();
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
