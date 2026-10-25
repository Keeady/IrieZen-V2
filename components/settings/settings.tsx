import React, { useCallback, useEffect } from "react";
import SettingsRenderer, {
  DEFAULT_SAVE_PREFERENCES,
  SavePreferences,
} from "./settings-renderer";
import {
  BODY_TYPE,
  useBodySettingsContext,
} from "@/providers/body-settings-provider";
import {
  StorageType,
  useStorageSettingsContext,
} from "@/providers/storage-settings-provider";

export default function SettingsScreen() {
  const [bodyType, setBodyType] = React.useState<BODY_TYPE>("female");
  const [selectedStorageType, setSelectedStorageType] =
    React.useState<StorageType>("none");

  const { saveBodyType, body } = useBodySettingsContext();
  const { saveStorageType, storageType } = useStorageSettingsContext();

  const [savePreferences, setSavePreferences] = React.useState<SavePreferences>(
    {
      ...DEFAULT_SAVE_PREFERENCES,
    },
  );

  const onSavePreferenceChange = (
    key: keyof SavePreferences,
    enabled: boolean,
  ) => {
    setSavePreferences((current) => ({
      ...current,
      [key]: enabled,
    }));
  };

  const onBodyTypeChange = useCallback(
    (type: BODY_TYPE) => {
      if (type === bodyType) return;
      saveBodyType?.(type);
      setBodyType(type);
    },
    [saveBodyType, bodyType],
  );

  const onStorageTypeChange = useCallback(
    (type: StorageType) => {
      if (type === selectedStorageType) return;
      saveStorageType?.(type);
      setSelectedStorageType(type);
    },
    [saveStorageType, selectedStorageType],
  );

  useEffect(() => {
    if (body) {
      setBodyType(body);
    }
  }, [body]);

  useEffect(() => {
    if (storageType) {
      setSelectedStorageType(storageType);
    }
  }, [storageType]);

  return (
    <SettingsRenderer
      onBodyTypeChange={onBodyTypeChange}
      body={bodyType}
      storageType={selectedStorageType}
      onStorageTypeChange={onStorageTypeChange}
      savePreferences={savePreferences}
      onSavePreferenceChange={onSavePreferenceChange}
    />
  );
}
