import { DailyInsight, Insight } from "@/components/screen.interface";

export function buildNewDailyInsight() {
  const key = new Date().toLocaleDateString();
  console.log("Key for AsyncStorage:", key);

  const newData: DailyInsight = {
    date: key,
    moods: { moods: [], core: [], primary: [], secondary: [], tertiary: [] },
    body: [],
    breath: "",
    intentions: [],
    gratitude: [],
    wins: [],
  };

  return newData;
}

export function addNewDailyInsight(insight: Partial<DailyInsight>) {
  const key = new Date().toLocaleDateString();

  let newData: DailyInsight = buildNewDailyInsight();

  return { ...newData, ...insight };
}

export function mergeDailyInsight(
  existing: DailyInsight,
  newInsight: Partial<DailyInsight>,
): DailyInsight {
  return {
    ...existing,
    moods: {
      moods: [...existing.moods.moods, ...(newInsight.moods?.moods || [])],
      core: [...existing.moods.core, ...(newInsight.moods?.core || [])],
      primary: [...existing.moods.primary, ...(newInsight.moods?.primary || [])],
      secondary: [
        ...existing.moods.secondary,
        ...(newInsight.moods?.secondary || []),
      ],
      tertiary: [
        ...existing.moods.tertiary,
        ...(newInsight.moods?.tertiary || []),
      ],
    },
    body: [...existing.body, ...(newInsight.body || [])],
    breath: newInsight.breath || existing.breath,
    intentions: [...existing.intentions, ...(newInsight.intentions || [])],
    gratitude: [...existing.gratitude, ...(newInsight.gratitude || [])],
    wins: [...existing.wins, ...(newInsight.wins || [])],
  };
}
