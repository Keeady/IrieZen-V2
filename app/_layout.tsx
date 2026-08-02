import { Tabs } from "expo-router";
import {
  useFonts,
  Lora_400Regular,
  Lora_600SemiBold,
} from "@expo-google-fonts/lora";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { BodySettingsContextProvider } from "@/providers/body-settings-provider";
import { StorageSettingsContextProvider } from "@/providers/storage-settings-provider";
import { ReportProvider } from "@/providers/report-provider";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Lora_400Regular,
    Lora_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const theme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: "#4A7FA5",
      outline: "#A8C4D8",

      background: "#E0EDF7",
      surface: "#E0EDF7",
      surfaceVariant: "#E0EDF7",

      secondary: "#D6E8F4",
    },
  };

  return (
    <StorageSettingsContextProvider>
      <ReportProvider>
      <BodySettingsContextProvider>
        <PaperProvider theme={theme}>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: "#4A7FA5",
              tabBarInactiveTintColor: "#2C4A5E",
              tabBarStyle: {
                backgroundColor: "#D6E8F4",
                borderTopWidth: 1,
                borderTopColor: "#A8C4D8",
                elevation: 0, // removes Android shadow
                shadowOpacity: 0, // removes iOS shadow
              },
              tabBarLabelStyle: {
                fontFamily: "Lora_400Regular",
                fontSize: 11,
                letterSpacing: 0.4,
              },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Today",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="weather-sunset"
                    size={22}
                    color={color}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="insights"
              options={{
                title: "Insights",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="chart-bubble" size={22} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="settings"
              options={{
                title: "Settings",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="tune" size={22} color={color} />
                ),
              }}
            />
          </Tabs>
        </PaperProvider>
      </BodySettingsContextProvider>
      </ReportProvider>
    </StorageSettingsContextProvider>
  );
}
