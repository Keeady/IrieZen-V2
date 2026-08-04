import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const STORAGE_TYPE_KEY = "storageType";
export type StorageType = "none" | "local" | "cloud";

export const STORAGE_OPTIONS: {
  value: StorageType;
  label: string;
  description: string;
  disabled?: boolean;
  badge?: string;
}[] = [
  {
    value: "none",
    label: "Don't save",
    description: "Nothing is stored. Data is lost when you close the app.",
  },
  {
    value: "local",
    label: "Local only",
    description:
      "Saved on your device. Never leaves your phone.",
    disabled: false, // Not implemented yet
  },
  /* {
    value: "cloud",
    label: "Cloud",
    description: "Your full history, always available. No time limits.",
    disabled: true, // Not implemented yet
    badge: "Pro",
  },*/
];

type ContextProps = {
  storageType: StorageType;
  saveStorageType: (value: StorageType) => void;
  getStorageType: () => Promise<StorageType>;
};

const StorageSettingsContext = createContext<Partial<ContextProps>>({});

interface Props {
  children: React.ReactNode;
}

const StorageSettingsContextProvider = (props: Props) => {
  const defaultStorageType: StorageType = "none";
  const [storageType, setStorageType] =
    useState<StorageType>(defaultStorageType);

  const getSelectedStorageType = useCallback(async () => {
    try {
      const storedStorageType = await AsyncStorage.getItem(STORAGE_TYPE_KEY);
      if (
        storedStorageType === "none" ||
        storedStorageType === "local" ||
        storedStorageType === "cloud"
      ) {
        setStorageType(storedStorageType);
        return storedStorageType;
      }
      return defaultStorageType;
    } catch (error) {
      return defaultStorageType;
    }
  }, []);

  const saveStorageType = useCallback((value: StorageType) => {
    if (value === "none" || value === "local" || value === "cloud") {
      setStorageType(value);
      AsyncStorage.setItem(STORAGE_TYPE_KEY, value);
    }
  }, []);

  useEffect(() => {
    getSelectedStorageType();
  }, [getSelectedStorageType]);

  return (
    <StorageSettingsContext.Provider
      value={{
        storageType,
        saveStorageType,
        getStorageType: getSelectedStorageType,
      }}
    >
      {props.children}
    </StorageSettingsContext.Provider>
  );
};

export function useStorageSettingsContext() {
  const ctx = useContext(StorageSettingsContext);
  if (!ctx) throw new Error("Context unavailable.");
  return ctx;
}

export { StorageSettingsContext, StorageSettingsContextProvider };
