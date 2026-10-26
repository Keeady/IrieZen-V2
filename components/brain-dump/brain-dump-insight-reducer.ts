import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BrainDumpInsight } from "../screen.interface";

type BrainDumpInsightState = BrainDumpInsight[];

const initialState: BrainDumpInsightState = []

export const brainDumpInsightSlice = createSlice({
  name: "brainDumpInsight",
  initialState,
  reducers: {
    addBrainDumpInsight: saveBrainDumpInsight,
  },
});

function saveBrainDumpInsight(
  state: BrainDumpInsightState,
  action: PayloadAction<BrainDumpInsight>,
) {
  switch (action.type) {
    case "brainDumpInsight/addBrainDumpInsight":
      return [...state, action.payload];
    default:
      return state;
  }
}

export const { addBrainDumpInsight } = brainDumpInsightSlice.actions;
export default brainDumpInsightSlice.reducer;
