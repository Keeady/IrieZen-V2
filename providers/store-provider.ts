import { configureStore } from "@reduxjs/toolkit";
import reportsReducer from "@/components/reports/report-insight-reducer";
import moodInsightReducer from "@/components/mood/mood-insight-reducer";
import dailyInsightReducer from "@/components/daily-insight-reducer";
import bodyInsightReducer from "@/components/body/body-insight-reducer";
import breathInsightReducer from "@/components/breath/breath-insight-reducer";
import intentionsInsightReducer from "@/components/focus/intentions-insight-reducer";
import gratitudeInsightReducer from "@/components/gratitude/gratitude-insight-reducer";
import winsInsightReducer from "@/components/wins/wins-insight-reducer";
import reportInsightMiddleware from "@/components/reports/report-insight-middleware";
import journalInsightReducer from "@/components/journal/journal-insight-reducer";
import brainDumpInsightReducer from "@/components/brain-dump/brain-dump-insight-reducer";

const store = configureStore({
  reducer: {
    reports: reportsReducer,
    daily: dailyInsightReducer,
    moods: moodInsightReducer,
    body: bodyInsightReducer,
    breath: breathInsightReducer,
    intentions: intentionsInsightReducer,
    gratitude: gratitudeInsightReducer,
    wins: winsInsightReducer,
    journal: journalInsightReducer,
    brainDump: brainDumpInsightReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(reportInsightMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;
