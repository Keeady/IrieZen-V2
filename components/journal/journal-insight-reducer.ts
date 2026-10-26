import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JournalInsight } from "../screen.interface";

type JournalInsightState = JournalInsight[];

const initialState: JournalInsightState = []

export const journalInsightSlice = createSlice({
  name: "journalInsight",
  initialState,
  reducers: {
    addJournalInsight: saveJournalInsight,
  },
});

function saveJournalInsight(
  state: JournalInsightState,
  action: PayloadAction<JournalInsight>,
) {
  switch (action.type) {
    case "journalInsight/addJournalInsight":
      return [...state, action.payload];
    default:
      return state;
  }
}

export const { addJournalInsight } = journalInsightSlice.actions;
export default journalInsightSlice.reducer;
