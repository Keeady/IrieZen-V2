import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { REPORTS_KEY, type ReportInsightState } from "../store.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addMoodInsight } from "../mood/mood-insight-reducer";
import { addBodyInsight } from "../body/body-insight-reducer";
import { addBreathInsight } from "../breath/breath-insight-reducer";
import { addIntentionsInsight } from "../focus/intentions-insight-reducer";
import { addGratitudeInsight } from "../gratitude/gratitude-insight-reducer";
import { addWinsInsight } from "../wins/wins-insight-reducer";
import { addJournalInsight } from "../journal/journal-insight-reducer";
import { addBrainDumpInsight } from "../brain-dump/brain-dump-insight-reducer";

// create a middleware to handle persisting the report insight state to AsyncStorage
// whenever any of the insight actions are dispatched
const reportInsightMiddleware = createListenerMiddleware();

reportInsightMiddleware.startListening({
  matcher: isAnyOf(
    addMoodInsight,
    addBodyInsight,
    addBreathInsight,
    addIntentionsInsight,
    addGratitudeInsight,
    addWinsInsight,
    addJournalInsight,
    addBrainDumpInsight
  ),
  effect: async (action, listenerApi) => {
    const { reports } = listenerApi.getState() as { reports: ReportInsightState[] };
    await saveNewReport(reports);
  },
});

// Save the updated state to AsyncStorage
async function saveNewReport(state: ReportInsightState[]) {
  try {
    await AsyncStorage.setItem(REPORTS_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Error saving updated reports to AsyncStorage:", error);
  }
}

export default reportInsightMiddleware.middleware;
