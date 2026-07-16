type Primary = string[];
type Secondary = string[];
type Tertiary = string[];
export type MoodFlow = Map<
  string,
  { primary: Primary; secondary: Secondary; tertiary: Tertiary }
>;

export interface Flow {
  breath: number;
  body: string[];
  moods: MoodFlow;
  gratitude: string;
  intentions: string;
  wins: string;
  notes: string;
}
