import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: 100,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    gap: 10,
  },
  gridItem: {
    width: "47%", // two columns with gap
  },
  title: {
    marginVertical: 40,
    textAlign: "center",
    fontFamily: "Lora_600SemiBold",
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0.2,
    color: "#2C4A5E", // deep sky blue — darker than primary, feels grounded
  },
  secondaryTitle: {
    marginBottom: 40,
    textAlign: "center",
    fontFamily: "Lora_400Regular",
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.3,
    color: "#4A7FA5", // primary blue — one step lighter than headline
  },
  tertiaryTitle: {
    marginBottom: 40,
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
  button: {
    marginHorizontal: 24,
    marginTop: 32,
    marginBottom: 50,
    borderRadius: 2, // sharp corners vs default pill shape
    borderWidth: 1.5,
    borderColor: "#4A7FA5", // primary blue — matches last paragraph border
  },
  buttonLabel: {
    fontFamily: "Lora_400Regular", // matches reflection typography
    fontSize: 15,
    letterSpacing: 0.3, // spaced caps feel intentional and calm
    textTransform: "capitalize",
  },
  instruction: {
    fontFamily: "Lora_400Regular",
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 20,
    color: "#2C4A5E",
  },
  subtext: {
    fontFamily: "Lora_400Regular",
    fontWeight: "400",
    textAlign: "center",
    marginTop: 8,
    fontSize: 13,
    color: "#4A7FA5",
    letterSpacing: 1.2,
    fontStyle: "italic",
  },
  textarea: {
    width: "100%",
    height: 150,
    textAlignVertical: "top", // ensures text starts at top
    textAlign: "left",
    flexGrow: 1,
  },
  hint: {
    fontFamily: "Lora_400Regular",
    fontSize: 13,
    letterSpacing: 0.8,
    fontStyle: "italic",
    //opacity: 0.7,
    textAlign: "center",
  },
  toggle: {
    flexDirection: "row",
    gap: 4,
  },
  toggleButton: {
    borderRadius: 2,
    borderWidth: 1.5,
    minWidth: 90,
    marginBottom: 50,
  },
  bodyContainer: {
    marginVertical: 8,
  },
  summary: {
    fontFamily: "Lora_400Regular",
    fontSize: 13,
    letterSpacing: 1.2,
    textAlign: "center",
    //opacity: 0.8,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontFamily: "Lora_600SemiBold",
    fontSize: 13,
    letterSpacing: 1.4,
    textTransform: "uppercase",
   // opacity: 0.8,
    marginBottom: 4,
  },
  sectionHint: {
    fontFamily: "Lora_400Regular",
    fontSize: 14,
    lineHeight: 22,
    //opacity: 0.6,
    marginBottom: 4,
  },
  sectionContent: {
    fontFamily: "Lora_400Regular",
    fontSize: 14,
    lineHeight: 22,
   // opacity: 0.8,
  },
  option: {
    borderRadius: 2,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionLabel: {
    fontFamily: "Lora_400Regular",
    fontSize: 15,
    letterSpacing: 0.4,
  },
  divider: {
    height: 1,
    marginVertical: -8,
  },
  optionText: {
    flex: 1,
    paddingRight: 12,
    gap: 4,
  },
  optionDescription: {
    fontFamily: "Lora_400Regular",
    fontSize: 12,
    lineHeight: 18,
   // opacity: 0.55,
  },
  badge: {
    borderRadius: 2,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontFamily: "Lora_400Regular",
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  optionLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  continueButton: {
    borderRadius: 14,
    marginTop: 28,
  },
  buttonContent: {
    minHeight: 52,
    flexDirection: "row-reverse",
  },
});

export default styles;
