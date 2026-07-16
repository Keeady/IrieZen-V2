import { Flow } from "@/data/flow";
import { useFlowContext } from "@/providers/flow-provider";
import { useStorageSettingsContext } from "@/providers/storage-settings-provider";
import { useCallback } from "react";

export const useHandleSubmit = () => {
  const { storageType } = useStorageSettingsContext();

  const { getMoods, getBody, key } = useFlowContext();

  console.log("useHandleSubmit: Initialized with storageType:", storageType);

  const submit = useCallback(async () => {
    /*const moods = getMoods?.();
    const bodys = getBody?.() || [];

    console.log("submit: Current moods from context:", moods);
    console.log("submit: Current body sensations from context:", bodys);

    if (!key) {
      console.log("submit: No key available for submission.");
      return Promise.resolve();
    }

    if (!moods) {
      console.log("submit: No moods to submit.");
      return Promise.resolve();
    }

    if (storageType === "local") {
      console.log(
        "submit: Submitting moods to local storage with key:",
        key,
        "and moods:",
        moods,
      );
      console.log(
        "submit: Submitting body sensations to local storage with key:",
        key,
        "and body sensations:",
        bodys,
      );*/
      return Promise.resolve();
      /* return saveNewFlow?.({
        ...flow,
        moods,
        body: bodys,
      } as Flow);
    }*/
  }, [storageType, getMoods, getBody, key]);

  return { submit };
};
