import MorningFlow from "@/components/morning-flow";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

export default function Index() {
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
    <PaperProvider theme={theme}>
      <MorningFlow />
    </PaperProvider>
  );
}
