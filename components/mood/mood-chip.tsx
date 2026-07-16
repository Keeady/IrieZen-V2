import { Chip, Icon, useTheme } from "react-native-paper";

export default function MoodChip({
  mood,
  selected,
  onPress,
  icon,
}: {
  mood: string;
  selected: boolean;
  onPress: () => void;
  icon?: string;
}) {
  const { colors } = useTheme();

  return (
    <Chip
      key={mood}
      selected={selected}
      onPress={onPress}
      mode={selected ? "flat" : "outlined"}
      style={{
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: selected ? colors.primary : colors.outline,
        backgroundColor: selected ? colors.secondary : colors.surface,
        height: icon ? 60 : undefined,
      }}
      showSelectedOverlay={false}
      textStyle={{
        fontFamily: "Lora_400Regular",
        fontSize: 15,
        letterSpacing: 0.8,
        fontWeight: "400",
        textAlign: "center",
        color: selected ? colors.primary : colors.onSurface,
        paddingVertical: 5,
        flexShrink: 1,
      }}
      icon={
        icon
          ? () => (
              <Icon
                source={icon}
                size={48}
                color={selected ? colors.primary : colors.onSurface}
              />
            )
          : undefined
      }
      ellipsizeMode="tail"
    >
      {mood}
    </Chip>
  );
}
