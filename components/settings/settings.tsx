import {
  BODY_TYPE,
  useBodySettingsContext,
} from "@/providers/body-settings-provider";
import {
  DEFAULT_SAVE_PREFERENCES,
  SavePreferences,
  useSavePreferenceSettingsContext,
} from "@/providers/save-preference-provider";
import {
  StorageType,
  useStorageSettingsContext,
} from "@/providers/storage-settings-provider";
import React, { useCallback, useEffect } from "react";
import SettingsRenderer from "./settings-renderer";

export default function SettingsScreen() {
  const [bodyType, setBodyType] = React.useState<BODY_TYPE>("female");
  const [selectedStorageType, setSelectedStorageType] =
    React.useState<StorageType>("none");
  const [selectedSavedPreferences, setSelectedSavedPreferences] =
    React.useState(DEFAULT_SAVE_PREFERENCES);

  const { saveBodyType, body } = useBodySettingsContext();
  const { saveStorageType, storageType } = useStorageSettingsContext();
  const { savedPreferences, savePreference } =
    useSavePreferenceSettingsContext();

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

  const onSavedPreferenceChanfe = useCallback(
    (key: keyof SavePreferences, enabled: boolean) => {
      savePreference?.(key, enabled);
      setSelectedSavedPreferences((current) => ({
        ...current,
        [key]: enabled,
      }));
    },
    [savePreference, selectedStorageType],
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

  useEffect(() => {
    console.log("settings savedPreferences", savedPreferences);

    if (savedPreferences) {
      setSelectedSavedPreferences(savedPreferences);
    }
  }, [savedPreferences]);

  return (
    <SettingsRenderer
      onBodyTypeChange={onBodyTypeChange}
      body={bodyType}
      storageType={selectedStorageType}
      onStorageTypeChange={onStorageTypeChange}
      savePreferences={selectedSavedPreferences}
      onSavePreferenceChange={onSavedPreferenceChanfe}
    />
  );
}
