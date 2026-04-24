import MorningFlow from "@/components/morning-flow";
import { Text, View } from "react-native";
import { MD3LightTheme, PaperProvider, Provider } from "react-native-paper";

export default function Index() {
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#4A7FA5",              // steel blue — replaces purple, ties everything together
    outline: "#A8C4D8",              // used by Paper internally for borders

    background: "#E0EDF7",           // light open sky
    surface: "#E0EDF7",
    surfaceVariant: "#E0EDF7", 
    
    secondary: "#D6E8F4", // slightly deeper — chip unselected fill in MD3

    chipBackground: "#E0EDF7",               // unselected: matches background, feels flush
    chipBorder: "#A8C4D8",                   // soft blue-grey
    chipBorderSelected: "#4A7FA5",           // full primary when selected
    chipBackgroundSelected: "#D6E8F4",       // gentle selected fill

    reflectionBackground: "#D6E8F4", // one shade deeper than background — calm, intimate
    buttonBackground: "transparent", // outlined button, no fill needed
    headlineColor: "#2C4A5E",      // dark slate, used for titles and important text
  },
};

  return (
    <PaperProvider theme={theme}>
      <MorningFlow />
    </PaperProvider>
  );
}
