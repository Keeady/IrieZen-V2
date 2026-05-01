import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const BODY_TYPE_KEY = "bodyType";
export type BODY_TYPE = "male" | "female";

export const BODY_OPTIONS: { value: BODY_TYPE; label: string }[] = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
];

type ContextProps = {
  body: BODY_TYPE;
  saveBodyType: (value: BODY_TYPE) => void;
  getBodyType: () => Promise<BODY_TYPE>;
};

const BodySettingsContext = createContext<Partial<ContextProps>>({});

interface Props {
  children: React.ReactNode;
}

const BodySettingsContextProvider = (props: Props) => {
  const defaultBodyType: BODY_TYPE = "female";
  const [body, setBody] = useState<BODY_TYPE>(defaultBodyType);

  const getSelectedBodyType = useCallback(async () => {
    try {
      const storedBodyType = await AsyncStorage.getItem(BODY_TYPE_KEY);
      if (storedBodyType === "male" || storedBodyType === "female") {
        return storedBodyType;
      }
      return defaultBodyType;
    } catch (error) {
      return defaultBodyType;
    }
  }, []);

  const saveBodyType = useCallback((value: BODY_TYPE) => {
    if (value === "female" || value === "male") {
      setBody(value);
      AsyncStorage.setItem(BODY_TYPE_KEY, value);
    }
  }, []);

  useEffect(() => {
    getSelectedBodyType();
  }, [getSelectedBodyType]);

  return (
    <BodySettingsContext.Provider
      value={{
        body,
        saveBodyType,
        getBodyType: getSelectedBodyType,
      }}
    >
      {props.children}
    </BodySettingsContext.Provider>
  );
};

export function useBodySettingsContext() {
  const ctx = useContext(BodySettingsContext);
  if (!ctx) throw new Error("Context unavailable.");
  return ctx;
}

export { BodySettingsContext, BodySettingsContextProvider };
