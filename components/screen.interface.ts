import { FlowContextProps } from "@/providers/flow-provider";

export type ScreenProps = {
  onComplete: () => void;
  setSelectedMoods?: (moods: string[]) => void;
  setCoreEmotion?: (mood: string) => void;
  width: number;
  height: number;
  context: Partial<FlowContextProps>
};
