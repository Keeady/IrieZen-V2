import { Chip, useTheme } from "react-native-paper";

export default function MoodChip({
  mood,
  selected,
  onPress,
  icon,
}: {
  mood: string;
  selected: boolean;
  onPress: () => void;
  icon?: () => React.ReactNode;
}) {
  const { colors } = useTheme();
  const ACCENT = "124, 111, 142"; // your brand color as r,g,b

  const withOpacity = (opacity: number) => `rgba(${ACCENT}, ${opacity})`;

  return (
    <Chip
      key={mood}
      selected={selected}
      onPress={onPress}
      mode={selected ? "flat" : "outlined"}
      style={{
        minWidth: 150,
        borderRadius: 2, // sharp corners, matches button
        borderWidth: 1.5,
        borderColor: selected ? colors.primary : colors.outline, // subtle when unselected
        backgroundColor: selected
          ? colors.secondary // very faint primary fill — not a solid blob
          : colors.background,
        height: icon ? 60 : undefined,
      }}
      showSelectedOverlay={false} // disable — we're handling selected state manually
      textStyle={{
        fontFamily: "Lora_400Regular", // matches reflection + button
        fontSize: 15,
        letterSpacing: 0.8,
        fontWeight: "400",
        textAlign: "right",
        color: selected ? colors.primary : colors.onSurface,
      }}
      icon={icon}
    >
      {mood}
    </Chip>
  );
}
