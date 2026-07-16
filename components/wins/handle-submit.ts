import { useFlowContext } from "@/providers/flow-provider";
import { StorageType } from "@/providers/storage-settings-provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";

const storageKey = "wins";

export function handleSubmit(
  storageType: StorageType,
  wins: string,
) {
  if (storageType === "local") {
    return handleLocalStorageSubmission(wins);
  } else if (storageType === "cloud") {
    return handleCloudStorageSubmission(wins);
  }

  return Promise.resolve();
}

async function handleLocalStorageSubmission(wins: string) {
  try {
    const winsString = JSON.stringify({
      [new Date().toISOString()]: { wins },
    });

    await AsyncStorage.setItem(storageKey, winsString);
  } catch (error) {
    console.error("Error saving wins to local storage:", error);
  }
}

function handleCloudStorageSubmission(wins: string) {
  return Promise.resolve();
}

export const useHandleSubmit = (storageType: StorageType) => {
  const { getWins } = useFlowContext();

  const submit = useCallback(() => {
    const currentWins = getWins?.();
    if (!currentWins) {
      console.log("No wins to submit.");
      return Promise.resolve();
    }

    return handleSubmit(storageType, currentWins);
  }, [storageType]);

  return { submit };
};
