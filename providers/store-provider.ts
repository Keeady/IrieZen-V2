import { configureStore } from "@reduxjs/toolkit";
import reportsReducer from "@/components/reports/report-insight-reducer";
import moodInsightReducer from "@/components/mood/mood-insight-reducer";
import dailyInsightReducer from "@/components/daily-insight-reducer";
import bodyInsightReducer from "@/components/body/body-insight-reducer";
import breathInsightReducer from "@/components/breath/breath-insight-reducer";
import intentionsInsightReducer from "@/components/focus/intentions-insight-reducer";

const store = configureStore({
  reducer: {
    // settings: settingsReducer,
    reports: reportsReducer,
    daily: dailyInsightReducer,
    moods: moodInsightReducer,
    body: bodyInsightReducer,
    breath: breathInsightReducer,
    intentions: intentionsInsightReducer,
    // gratitude: gratitudeInsightReducer,
    // wins: winsInsightReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;
