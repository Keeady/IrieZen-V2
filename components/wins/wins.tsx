import {
  getRandomWinsLabelPrompt,
  getRandomWinsIntroMessage,
} from "@/data/moodList";
import { ScreenProps, useAppDispatch } from "../screen.interface";
import WinsFlowRenderer from "./wins-renderer";
import { useMemo, useState, useCallback } from "react";
import { useStorageSettingsContext } from "@/providers/storage-settings-provider";
import { addWinsInsight } from "./wins-insight-reducer";

export default function WinsScreen({ onComplete }: ScreenProps) {
  const placeholder = "";
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [label, setLabel] = useState("");
  const [disabled, setDisabled] = useState(false);

  const { storageType } = useStorageSettingsContext();
  const dispatch = useAppDispatch();

  useMemo(() => {
    const message = getRandomWinsIntroMessage();
    setMessage(message);
    const label = getRandomWinsLabelPrompt();
    setLabel(label);
  }, []);

  const saveWins = useCallback(() => {
    if (storageType === "local") {
      dispatch(addWinsInsight({ label, text }));
    }
  }, [text, label, storageType, dispatch]);

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
