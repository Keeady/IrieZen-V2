import {
  BodyInsight,
  DailyInsight,
  GratitudeInsight,
  IntentionsInsight,
  MoodInsight,
  WinsInsight,
} from "./screen.interface";
import { buildNewDailyInsight } from "@/providers/daily-insight-provider";

export function handleSavingMoodsToLocalStorage(
  moodInsight: MoodInsight,
  saveInsight?: (insight: Partial<DailyInsight>) => Promise<void>,
) {
  const newData = buildNewDailyInsight();
  const updatedInsight: DailyInsight = {
    ...newData,
    moods: moodInsight,
  };

  saveInsight?.(updatedInsight);
}

export function handleSavingBreathToLocalStorage(
  breath: string,
  saveInsight?: (insight: Partial<DailyInsight>) => Promise<void>,
) {
  const newData = buildNewDailyInsight();
  const updatedInsight: DailyInsight = {
    ...newData,
    breath: breath,
  };

  saveInsight?.(updatedInsight);
}

export function handleSavingBodyToLocalStorage(
  body: BodyInsight[],
  saveInsight?: (insight: Partial<DailyInsight>) => Promise<void>,
) {
  const newData = buildNewDailyInsight();
  const updatedInsight: DailyInsight = {
    ...newData,
    body: body,
  };

  saveInsight?.(updatedInsight);
}

export function handleSavingIntentionsToLocalStorage(
  intentions: IntentionsInsight,
  saveInsight?: (insight: Partial<DailyInsight>) => Promise<void>,
) {
  const newData = buildNewDailyInsight();
  const updatedInsight: DailyInsight = {
    ...newData,
    intentions: [intentions],
  };

  saveInsight?.(updatedInsight);
}

export function handleSavingGratitudeToLocalStorage(
  gratitude: GratitudeInsight,
  saveInsight?: (insight: Partial<DailyInsight>) => Promise<void>,
) {
  const newData = buildNewDailyInsight();
  const updatedInsight: DailyInsight = {
    ...newData,
    gratitude: [gratitude],
  };

  saveInsight?.(updatedInsight);
}

export function handleSavingWinsToLocalStorage(
  wins: WinsInsight,
  saveInsight?: (insight: Partial<DailyInsight>) => Promise<void>,
) {
  const newData = buildNewDailyInsight();
  const updatedInsight: DailyInsight = {
    ...newData,
    wins: [wins],
  };

  saveInsight?.(updatedInsight);
}
