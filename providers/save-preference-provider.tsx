import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const MOODS_BODY_PREFERENCE_KEY = "moodsandbody_preference";
export const JOURNAL_PREFERENCE_KEY = "journal_preference";
export const BRAIN_DUMP_PREFERENCE_KEY = "braindump_preference";
export const GRATITUDE_INTENTIONS_PREFERENCE_KEY =
  "gratitudeintentions_preference";

export type SavePreferences = {
  moodsandbody_preference: boolean;
  journal_preference: boolean;
  braindump_preference: boolean;
  gratitudeintentions_preference: boolean;
};

export const DEFAULT_SAVE_PREFERENCES: SavePreferences = {
  moodsandbody_preference: false,
  journal_preference: false,
  braindump_preference: false,
  gratitudeintentions_preference: false,
};

export const SAVE_OPTIONS: {
  key: keyof SavePreferences;
  label: string;
  description: string;
}[] = [
  {
    key: "moodsandbody_preference",
    label: "Moods & body sensations",
    description: "Save your emotions and body sensation check-ins.",
  },
  {
    key: "journal_preference",
    label: "Journal",
    description: "Save your journal entries and personal reflections.",
  },
  {
    key: "braindump_preference",
    label: "Brain dump",
    description: "Save your brain dump entries to revisit later.",
  },
  {
    key: "gratitudeintentions_preference",
    label: "Gratitude & intentions",
    description: "Save your gratitude and intention entries.",
  },
];

type ContextProps = {
  savedPreferences: SavePreferences;
  savePreference: (key: keyof SavePreferences, enabled: boolean) => void;
  getSavedPreferences: () => Promise<SavePreferences>;
};

const SavePreferencesSettingsContext = createContext<Partial<ContextProps>>({});

interface Props {
  children: React.ReactNode;
}

const SavePreferencesSettingsContextProvider = (props: Props) => {
  const defaultSavePreferences: SavePreferences = DEFAULT_SAVE_PREFERENCES;
  const [preferences, setSavePreferences] = React.useState<SavePreferences>(
    defaultSavePreferences,
  );

  const getSavedPreferences = useCallback(async () => {
    const preferences = defaultSavePreferences;
    try {
      await AsyncStorage.multiGet(
        [
          BRAIN_DUMP_PREFERENCE_KEY,
          MOODS_BODY_PREFERENCE_KEY,
          JOURNAL_PREFERENCE_KEY,
          GRATITUDE_INTENTIONS_PREFERENCE_KEY,
        ],
        (err, stores) => {
          stores?.map((result, i, store) => {
            let key = store[i][0] as keyof SavePreferences;
            let value = store[i][1];
            if (key && value) {
              preferences[key] = Boolean(value);
            }
          });
        },
      );

      setSavePreferences(preferences);
      return preferences;
    } catch (error) {
      return defaultSavePreferences;
    }
  }, []);

  const savePreference = useCallback(
    async (key: keyof SavePreferences, enabled: boolean) => {
      await AsyncStorage.setItem(key, String(enabled));
      getSavedPreferences();
    },
    [],
  );

  useEffect(() => {
    getSavedPreferences();
  }, [getSavedPreferences]);

  return (
    <SavePreferencesSettingsContext.Provider
      value={{
        savedPreferences: preferences,
        savePreference,
        getSavedPreferences,
      }}
    >
      {props.children}
    </SavePreferencesSettingsContext.Provider>
  );
};

export function useSavePreferenceSettingsContext() {
  const ctx = useContext(SavePreferencesSettingsContext);
  if (!ctx) throw new Error("Context unavailable.");
  return ctx;
}

export {
  SavePreferencesSettingsContext,
  SavePreferencesSettingsContextProvider,
};
