import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BreathInsightState = {
  breath: string;
};

const initialState: BreathInsightState = {
  breath: "",
};

export const breathInsightSlice = createSlice({
  name: "breathInsight",
  initialState,
  reducers: {
    addBreathInsight: saveBreathInsight,
  },
});

function saveBreathInsight(
  state: BreathInsightState,
  action: PayloadAction<string>,
) {
  switch (action.type) {
    case "breathInsight/addBreathInsight":
      return { ...state, breath: action.payload };
    default:
      return state;
  }
}

export const { addBreathInsight } = breathInsightSlice.actions;
export default breathInsightSlice.reducer;
