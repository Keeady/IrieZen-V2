import { StorageType } from "@/providers/storage-settings-provider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storageKey = "gratitudes";

export function handleSubmit(
  storageType: StorageType,
  gratitude: string,
) {
  if (storageType === "local") {
    return handleLocalStorageSubmission(gratitude);
  } else if (storageType === "cloud") {
    return handleCloudStorageSubmission(gratitude);
  }

  return Promise.resolve();
}

async function handleLocalStorageSubmission(gratitude: string) {
  try {
    const moodsString = JSON.stringify({
      [new Date().toISOString()]: { gratitude },
    });

    await AsyncStorage.setItem(storageKey, moodsString);
  } catch (error) {
    console.error("Error saving moods to local storage:", error);
  }
}

function handleCloudStorageSubmission(gratitude: string) {
  return Promise.resolve();
}
