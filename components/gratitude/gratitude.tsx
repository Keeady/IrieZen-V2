import {
  getRandomGratitudeIntroMessage,
  getRandomGratitudeLabelPrompt,
} from "@/data/moodList";
import { ScreenProps } from "../screen.interface";
import GratitudeFlowRenderer from "./gratitude-renderer";
import { useState, useMemo, useCallback } from "react";
import { useStorageSettingsContext } from "@/providers/storage-settings-provider";
import { handleSavingGratitudeToLocalStorage } from "../handle-submit";
import { useReportContext } from "@/providers/report-provider";

export default function GratitudeScreen({ onComplete, height }: ScreenProps) {
  const placeholder = "";
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [label, setLabel] = useState("");
  const [disabled, setDisabled] = useState(false);

  const { storageType } = useStorageSettingsContext();
  const { saveInsight } = useReportContext();

  useMemo(() => {
    const message = getRandomGratitudeIntroMessage();
    setMessage(message);
    const label = getRandomGratitudeLabelPrompt();
    setLabel(label);
  }, []);

  const saveGratitude = useCallback(() => {
    if (storageType === "local") {
      handleSavingGratitudeToLocalStorage({label, text}, saveInsight);
    }
  }, [text, label, storageType, saveInsight]);

  return (
    <GratitudeFlowRenderer
      onComplete={() => {
        setDisabled(true);
        saveGratitude();
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
