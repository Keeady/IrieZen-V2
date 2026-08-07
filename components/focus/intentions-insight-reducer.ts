import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IntentionsInsight } from "../screen.interface";

type IntentionsInsightState = IntentionsInsight[];

const initialState: IntentionsInsightState = [];

export const intentionsInsightSlice = createSlice({
  name: "intentionsInsight",
  initialState,
  reducers: {
    addIntentionsInsight: saveIntentionsInsight,
  },
});

function saveIntentionsInsight(
  state: IntentionsInsightState,
  action: PayloadAction<IntentionsInsight>,
) {
  switch (action.type) {
    case "intentionsInsight/addIntentionsInsight":
      return [...state, action.payload];
    default:
      return state;
  }
}

export const { addIntentionsInsight } = intentionsInsightSlice.actions;
export default intentionsInsightSlice.reducer;
