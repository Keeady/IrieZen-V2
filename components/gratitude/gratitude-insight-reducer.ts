import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { GratitudeInsight } from "../screen.interface";

type GratitudeInsightState = GratitudeInsight[];

const initialState: GratitudeInsightState = [];

export const gratitudeInsightSlice = createSlice({
  name: "gratitudeInsight",
  initialState,
  reducers: {
    addGratitudeInsight: saveGratitudeInsight,
  },
});

function saveGratitudeInsight(
  state: GratitudeInsightState,
  action: PayloadAction<GratitudeInsight>,
) {
  switch (action.type) {
    case "gratitudeInsight/addGratitudeInsight":
      return [...state, action.payload];
    default:
      return state;
  }
}

export const { addGratitudeInsight } = gratitudeInsightSlice.actions;
export default gratitudeInsightSlice.reducer;
