import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BodyInsight } from "../screen.interface";

type BodyInsightState = BodyInsight[];

// initialize the state with an empty array
const initialState: BodyInsightState = [];

// create a slice for the body insight state with a reducer to update the state
export const bodyInsightSlice = createSlice({
  name: "bodyInsight",
  initialState,
  reducers: {
    addBodyInsight: saveBodyInsight,
  },
});

function saveBodyInsight(
  state: BodyInsightState,
  action: PayloadAction<BodyInsight[]>,
) {
  switch (action.type) {
    case "bodyInsight/addBodyInsight":
      return [...state, ...action.payload];
    default:
      return state;
  }
}

export const { addBodyInsight } = bodyInsightSlice.actions;
export default bodyInsightSlice.reducer;
