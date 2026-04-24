import { Stack } from "expo-router";
import { useFonts, Lora_400Regular, Lora_600SemiBold } from "@expo-google-fonts/lora";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Lora_400Regular,
    Lora_600SemiBold,
  });

  if (!fontsLoaded) {
   return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
