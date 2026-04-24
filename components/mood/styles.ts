import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 100,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
  },
  primaryChip: {
    minWidth: 150,
    height: 60,
  },
  chip: {
    minWidth: 150,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",

    fontFamily: "Lora_600SemiBold",
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0.2,
    color: "#2C4A5E", // deep sky blue — darker than primary, feels grounded
  },
  secondaryTitle: {
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Lora_400Regular",
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.3,
    color: "#4A7FA5", // primary blue — one step lighter than headline
  },
  tertiaryTitle: {
    marginBottom: 20,
    textAlign: "center",
    fontStyle: "italic",
    fontFamily: "Lora_400Regular",
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 1.2, // wide tracking makes small italic text feel intentional
    color: "#4A7FA5", // same primary but lower visual weight from smaller size
  },
  headline: {
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Lora_600SemiBold",
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0.2,
    color: "#2C4A5E", // deep sky blue — darker than primary, feels grounded
  },
  subheadline: {
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Lora_400Regular",
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: 0.3,
    color: "#4A7FA5", // primary blue — one step lighter than headline
  },
});

export default styles;
