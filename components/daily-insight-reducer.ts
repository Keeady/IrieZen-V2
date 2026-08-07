import { createSlice } from "@reduxjs/toolkit";

interface DailyInsightState {
  date: string;
}

// initialize the state with the current date
const initialState: DailyInsightState = {
  date: new Date().toLocaleDateString(),
};

// create a slice for the daily insight state with a reducer to retrieve the current date
export const dailyInsightSlice = createSlice({
  name: "dailyInsight",
  initialState,
  reducers: {
    getDate: (state) => {
      return state;
    },
  },
});

export const { getDate } = dailyInsightSlice.actions;
export default dailyInsightSlice.reducer;
