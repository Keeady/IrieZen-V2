import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { WinsInsight } from "../screen.interface";

type WinsInsightState = WinsInsight[];

const initialState: WinsInsightState = [];

export const winsInsightSlice = createSlice({
  name: "winsInsight",
  initialState,
  reducers: {
    addWinsInsight: saveWinsInsight,
  },
});

function saveWinsInsight(
  state: WinsInsightState,
  action: PayloadAction<WinsInsight>,
) {
  switch (action.type) {
    case "winsInsight/addWinsInsight":
      return [...state, action.payload];
    default:
      return state;
  }
}

export const { addWinsInsight } = winsInsightSlice.actions;
export default winsInsightSlice.reducer;
