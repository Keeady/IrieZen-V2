import { Flow } from "@/data/flow";
import { useFlowContext } from "@/providers/flow-provider";
import { useStorageSettingsContext } from "@/providers/storage-settings-provider";
import { useCallback } from "react";

export const useHandleSubmit = () => {
  const { getBreath, key, flow, saveNewFlow } = useFlowContext();
  const { storageType } = useStorageSettingsContext();

  console.log(
    "Initializing useHandleSubmit with storageType:",
    storageType,
    "key:",
    key,
  );
  console.log("Current flow data:", flow);

  const submit = useCallback(async () => {
    const currentBreath = getBreath?.();
    console.log("Current breath from context:", currentBreath);
    const savedBreath = flow?.breath || 0;
    console.log("Saved breath from flow context:", savedBreath);

    if (!key) {
      console.log("No key available for submission.");
      return Promise.resolve();
    }

    if (!currentBreath) {
      console.log("No breath to submit.");
      return Promise.resolve();
    }

    if (storageType === "local") {
      return saveNewFlow?.({
        ...flow,
        breath: currentBreath + savedBreath,
      } as Flow);
    }
  }, [storageType, key, getBreath]);

  return { submit };
};
