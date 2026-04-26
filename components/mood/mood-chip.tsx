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

  return (
    <Chip
      key={mood}
      selected={selected}
      onPress={onPress}
      mode={selected ? "flat" : "outlined"}
      style={{
        minWidth: 150,
        borderRadius: 2,
        borderWidth: 1.5,
        borderColor: selected ? colors.primary : colors.outline,
        backgroundColor: selected ? colors.secondary : colors.background,
        height: icon ? 60 : undefined,
      }}
      showSelectedOverlay={false}
      textStyle={{
        fontFamily: "Lora_400Regular",
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
