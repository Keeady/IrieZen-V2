import {
  getRandomWinsLabelPrompt,
  getRandomWinsIntroMessage,
} from "@/data/moodList";
import { ScreenProps } from "../screen.interface";
import WinsFlowRenderer from "./wins-renderer";
import { useMemo, useState, useCallback } from "react";
import { useStorageSettingsContext } from "@/providers/storage-settings-provider";
import { addWinsInsight } from "./wins-insight-reducer";
import { useAppDispatch } from "../store.interface";
import { useSavePreferenceSettingsContext } from "@/providers/save-preference-provider";

export default function WinsScreen({ onComplete, disabled }: ScreenProps & { disabled: boolean }) {
  const placeholder = "";
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [label, setLabel] = useState("");

  const { storageType } = useStorageSettingsContext();
  const { savedPreferences } = useSavePreferenceSettingsContext();

  const dispatch = useAppDispatch();

  useMemo(() => {
    const message = getRandomWinsIntroMessage();
    setMessage(message);
    const label = getRandomWinsLabelPrompt();
    setLabel(label);
  }, []);

  const saveWins = useCallback(() => {
    if (
      storageType === "local" &&
      savedPreferences?.gratitudeintentions_preference
    ) {
      dispatch(addWinsInsight({ label, text }));
    }
  }, [
    text,
    label,
    storageType,
    dispatch,
    savedPreferences?.gratitudeintentions_preference,
  ]);

  return (
    <WinsFlowRenderer
      onComplete={() => {
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
