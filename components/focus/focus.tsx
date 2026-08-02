import {
  getRandomFocusIntroMessage,
  getRandomFocusLabelPrompt,
} from "@/data/moodList";
import { ScreenProps } from "../screen.interface";
import FocusFlowRenderer from "./focus-renderer";
import { useState, useMemo, useCallback } from "react";
import { useStorageSettingsContext } from "@/providers/storage-settings-provider";
import { handleSavingIntentionsToLocalStorage } from "../handle-submit";
import { useReportContext } from "@/providers/report-provider";

export default function FocusScreen({ onComplete, height }: ScreenProps) {
  const placeholder = "";
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [label, setLabel] = useState("");
  const [disabled, setDisabled] = useState(false);

  const { storageType } = useStorageSettingsContext();
  const { saveInsight } = useReportContext();

  useMemo(() => {
    const message = getRandomFocusIntroMessage();
    setMessage(message);
    const label = getRandomFocusLabelPrompt();
    setLabel(label);
  }, []);

  const saveFocus = useCallback(() => {
    console.log("FocusScreen text", text);
    if (storageType === "local") {
      handleSavingIntentionsToLocalStorage({label, text}, saveInsight);
    }
  }, [text, label, storageType, saveInsight]);

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
