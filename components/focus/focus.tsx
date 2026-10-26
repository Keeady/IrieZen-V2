import {
  getRandomFocusIntroMessage,
  getRandomFocusLabelPrompt,
} from "@/data/moodList";
import { ScreenProps } from "../screen.interface";
import FocusFlowRenderer from "./focus-renderer";
import { useState, useMemo, useCallback } from "react";
import { useStorageSettingsContext } from "@/providers/storage-settings-provider";
import { addIntentionsInsight } from "./intentions-insight-reducer";
import { useAppDispatch } from "../store.interface";
import { useSavePreferenceSettingsContext } from "@/providers/save-preference-provider";

export default function FocusScreen({ onComplete, height }: ScreenProps) {
  const placeholder = "";
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [label, setLabel] = useState("");
  const [disabled, setDisabled] = useState(false);

  const { storageType } = useStorageSettingsContext();
  const { savedPreferences } = useSavePreferenceSettingsContext();

  const dispatch = useAppDispatch();

  useMemo(() => {
    const message = getRandomFocusIntroMessage();
    setMessage(message);
    const label = getRandomFocusLabelPrompt();
    setLabel(label);
  }, []);

  const saveFocus = useCallback(() => {
    if (storageType === "local" && savedPreferences?.gratitudeintentions_preference) {
      dispatch(addIntentionsInsight({ label, text }));
    }
  }, [
    text,
    label,
    storageType,
    dispatch,
    savedPreferences?.gratitudeintentions_preference,
  ]);

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
