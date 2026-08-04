import {
  getRandomWinsLabelPrompt,
  getRandomWinsIntroMessage,
} from "@/data/moodList";
import { ScreenProps } from "../screen.interface";
import WinsFlowRenderer from "./wins-renderer";
import { useMemo, useState, useCallback } from "react";
import { useStorageSettingsContext } from "@/providers/storage-settings-provider";
import { handleSavingWinsToLocalStorage } from "../handle-submit";
import { useReportContext } from "@/providers/report-provider";

export default function WinsScreen({ onComplete }: ScreenProps) {
  const placeholder = "";
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [label, setLabel] = useState("");
  const [disabled, setDisabled] = useState(false);

  const { storageType } = useStorageSettingsContext();
  const { saveInsight } = useReportContext();

  useMemo(() => {
    const message = getRandomWinsIntroMessage();
    setMessage(message);
    const label = getRandomWinsLabelPrompt();
    setLabel(label);
  }, []);

  const saveWins = useCallback(() => {
    if (storageType === "local") {
      handleSavingWinsToLocalStorage({label, text}, saveInsight);
    }
  }, [text, label, storageType, saveInsight]);

  return (
    <WinsFlowRenderer
      onComplete={() => {
        setDisabled(true);
        saveWins();
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
