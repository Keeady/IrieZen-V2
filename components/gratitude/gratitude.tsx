import {
  getRandomGratitudeIntroMessage,
  getRandomGratitudeLabelPrompt,
} from "@/data/moodList";
import { ScreenProps, useAppDispatch } from "../screen.interface";
import GratitudeFlowRenderer from "./gratitude-renderer";
import { useState, useMemo, useCallback } from "react";
import { useStorageSettingsContext } from "@/providers/storage-settings-provider";
import { addGratitudeInsight } from "./gratitude-insight-reducer";

export default function GratitudeScreen({ onComplete, height }: ScreenProps) {
  const placeholder = "";
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [label, setLabel] = useState("");
  const [disabled, setDisabled] = useState(false);

  const { storageType } = useStorageSettingsContext();
  const dispatch = useAppDispatch();

  useMemo(() => {
    const message = getRandomGratitudeIntroMessage();
    setMessage(message);
    const label = getRandomGratitudeLabelPrompt();
    setLabel(label);
  }, []);

  const saveGratitude = useCallback(() => {
    if (storageType === "local") {
      dispatch(addGratitudeInsight({ label, text }));
    }
  }, [text, label, storageType, dispatch]);

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
