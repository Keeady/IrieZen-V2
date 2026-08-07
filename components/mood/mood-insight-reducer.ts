import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { MoodInsight } from "../screen.interface";

type MoodInsightState = MoodInsight;

// initialize the state with an empty array
const initialState: MoodInsightState = {
  moods: [],
  core: [],
  primary: [],
  secondary: [],
  tertiary: [],
};

// create a slice for the mood insight state with a reducer to update the state
export const moodInsightSlice = createSlice({
  name: "moodInsight",
  initialState,
  reducers: {
    addMoodInsight: saveMoodInsight,
  },
});

function saveMoodInsight(
  state: MoodInsightState,
  action: PayloadAction<MoodInsight>,
) {
  switch (action.type) {
    case "moodInsight/addMoodInsight":
      return {
        ...state,
        moods: state.moods.concat(action.payload.moods),
        core: state.core.concat(action.payload.core),
        primary: state.primary.concat(action.payload.primary),
        secondary: state.secondary.concat(action.payload.secondary),
        tertiary: state.tertiary.concat(action.payload.tertiary),
      };
    default:
      return state;
  }
}

export const { addMoodInsight } = moodInsightSlice.actions;
export default moodInsightSlice.reducer;
