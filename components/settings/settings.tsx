import React, { useCallback, useEffect } from "react";
import SettingsRenderer from "./settings-renderer";
import {
  BODY_TYPE,
  useBodySettingsContext,
} from "@/providers/body-settings-provider";

export default function SettingsScreen() {
  const [bodyType, setBodyType] = React.useState<BODY_TYPE>("female");
  const { saveBodyType, body } = useBodySettingsContext();
  const onBodyTypeChange = useCallback((type: BODY_TYPE) => {
    if (type === bodyType) return;
    saveBodyType?.(type);
    setBodyType(type);
  }, [saveBodyType, bodyType]);

  useEffect(() => {
    if (body) {
      setBodyType(body);
    }
  }, [body]);

  return <SettingsRenderer onBodyTypeChange={onBodyTypeChange} body={bodyType} />;
}
