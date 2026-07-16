import { StorageType } from "@/providers/storage-settings-provider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storageKey = "intentions";

export function handleSubmit(
  storageType: StorageType,
  intention: string,
) {
  if (storageType === "local") {
    return handleLocalStorageSubmission(intention);
  } else if (storageType === "cloud") {
    return handleCloudStorageSubmission(intention);
  }

  return Promise.resolve();
}

async function handleLocalStorageSubmission(intention: string) {
  try {
    const intentionsString = JSON.stringify({
      [new Date().toISOString()]: { intention },
    });

    await AsyncStorage.setItem(storageKey, intentionsString);
  } catch (error) {
    console.error("Error saving intentions to local storage:", error);
  }
}

function handleCloudStorageSubmission(intention: string) {
  return Promise.resolve();
}
