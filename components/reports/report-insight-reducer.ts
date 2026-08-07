import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  REPORTS_KEY,
  type BodyInsight,
  type GratitudeInsight,
  type IntentionsInsight,
  type MoodInsight,
  type ReportInsightState,
  type WinsInsight,
} from "../screen.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addMoodInsight } from "../mood/mood-insight-reducer";
import { addBodyInsight } from "../body/body-insight-reducer";
import { addBreathInsight } from "../breath/breath-insight-reducer";
import { addIntentionsInsight } from "../focus/intentions-insight-reducer";
import { addGratitudeInsight } from "../gratitude/gratitude-insight-reducer";
import { addWinsInsight } from "../wins/wins-insight-reducer";

const key = new Date().toLocaleDateString();

// initialize the state with an empty array
const initialState: ReportInsightState[] = [
  {
    date: key,
    moods: {
      moods: [],
      core: [],
      primary: [],
      secondary: [],
      tertiary: [],
    },
    body: [],
    breath: "",
    intentions: [],
    gratitude: [],
    wins: [],
  },
];

export const fetchReports = createAsyncThunk(
  "reportInsight/fetchReports",
  async () => {
    try {
      const reportsString = await AsyncStorage.getItem(REPORTS_KEY);
      if (reportsString) {
        const reports: ReportInsightState[] = JSON.parse(reportsString);
        return reports;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  },
);

// create a slice for the report insight state with a reducer to get the state
// when the fetchReports action is fulfilled, update the state with the fetched reports
export const reportInsightSlice = createSlice({
  name: "reportInsight",
  initialState: initialState,
  reducers: {
    getReports: (state) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchReports.fulfilled,
        (state, action: PayloadAction<ReportInsightState[]>) => {
          return action.payload.length > 0 ? action.payload : state;
        },
      )
      .addCase(addMoodInsight, (state, action: PayloadAction<MoodInsight>) => {
        let newState;
        // Find the report for the current date
        const existingReportIndex = state.findIndex(
          (report) => report.date === key,
        );

        if (existingReportIndex !== -1) {
          // If the report exists, update the moods
          const existingReport = state[existingReportIndex];
          const updatedReport = {
            ...existingReport,
            moods: {
              moods: [...existingReport.moods.moods, ...action.payload.moods],
              core: [...existingReport.moods.core, ...action.payload.core],
              primary: [
                ...existingReport.moods.primary,
                ...action.payload.primary,
              ],
              secondary: [
                ...existingReport.moods.secondary,
                ...action.payload.secondary,
              ],
              tertiary: [
                ...existingReport.moods.tertiary,
                ...action.payload.tertiary,
              ],
            },
          };
          // Update the state with the updated report
          newState = state.map((report, index) =>
            index === existingReportIndex ? updatedReport : report,
          );
        } else {
          // If the report doesn't exist, create a new one with the mood insight
          const newReport: ReportInsightState = {
            date: key,
            moods: action.payload,
            body: [],
            breath: "",
            intentions: [],
            gratitude: [],
            wins: [],
          };
          // Add the new report to the state
          newState = [newReport, ...state];
        }

        return newState;
      })
      .addCase(
        addBodyInsight,
        (state, action: PayloadAction<BodyInsight[]>) => {
          let newState;
          // Find the report for the current date
          const existingReportIndex = state.findIndex(
            (report) => report.date === key,
          );

          if (existingReportIndex !== -1) {
            // If the report exists, update the body insights
            const existingReport = state[existingReportIndex];
            const updatedReport = {
              ...existingReport,
              body: [...existingReport.body, ...action.payload],
            };
            // Update the state with the updated report
            newState = state.map((report, index) =>
              index === existingReportIndex ? updatedReport : report,
            );
          } else {
            // If the report doesn't exist, create a new one with the body insight
            const newReport: ReportInsightState = {
              date: key,
              moods: {
                moods: [],
                core: [],
                primary: [],
                secondary: [],
                tertiary: [],
              },
              body: action.payload,
              breath: "",
              intentions: [],
              gratitude: [],
              wins: [],
            };
            // Add the new report to the state
            newState = [newReport, ...state];
          }

          return newState;
        },
      )
      .addCase(addBreathInsight, (state, action: PayloadAction<string>) => {
        let newState;
        // Find the report for the current date
        const existingReportIndex = state.findIndex(
          (report) => report.date === key,
        );

        if (existingReportIndex !== -1) {
          // If the report exists, update the breath insight
          const existingReport = state[existingReportIndex];
          const updatedReport = {
            ...existingReport,
            breath: action.payload,
          };
          // Update the state with the updated report
          newState = state.map((report, index) =>
            index === existingReportIndex ? updatedReport : report,
          );
        } else {
          // If the report doesn't exist, create a new one with the breath insight
          const newReport: ReportInsightState = {
            date: key,
            moods: {
              moods: [],
              core: [],
              primary: [],
              secondary: [],
              tertiary: [],
            },
            body: [],
            breath: action.payload,
            intentions: [],
            gratitude: [],
            wins: [],
          };
          // Add the new report to the state
          newState = [newReport, ...state];
        }

        return newState;
      })
      .addCase(
        addIntentionsInsight,
        (state, action: PayloadAction<IntentionsInsight>) => {
          let newState;
          // Find the report for the current date
          const existingReportIndex = state.findIndex(
            (report) => report.date === key,
          );

          if (existingReportIndex !== -1) {
            // If the report exists, update the intentions insight
            const existingReport = state[existingReportIndex];
            const updatedReport = {
              ...existingReport,
              intentions: [...existingReport.intentions, action.payload],
            };
            // Update the state with the updated report
            newState = state.map((report, index) =>
              index === existingReportIndex ? updatedReport : report,
            );
          } else {
            // If the report doesn't exist, create a new one with the intentions insight
            const newReport: ReportInsightState = {
              date: key,
              moods: {
                moods: [],
                core: [],
                primary: [],
                secondary: [],
                tertiary: [],
              },
              body: [],
              breath: "",
              intentions: [action.payload],
              gratitude: [],
              wins: [],
            };
            // Add the new report to the state
            newState = [newReport, ...state];
          }

          return newState;
        },
      )
      .addCase(
        addGratitudeInsight,
        (state, action: PayloadAction<GratitudeInsight>) => {
          let newState;
          // Find the report for the current date
          const existingReportIndex = state.findIndex(
            (report) => report.date === key,
          );

          if (existingReportIndex !== -1) {
            // If the report exists, update the gratitude insight
            const existingReport = state[existingReportIndex];
            const updatedReport = {
              ...existingReport,
              gratitude: [...existingReport.gratitude, action.payload],
            };
            // Update the state with the updated report
            newState = state.map((report, index) =>
              index === existingReportIndex ? updatedReport : report,
            );
          } else {
            // If the report doesn't exist, create a new one with the gratitude insight
            const newReport: ReportInsightState = {
              date: key,
              moods: {
                moods: [],
                core: [],
                primary: [],
                secondary: [],
                tertiary: [],
              },
              body: [],
              breath: "",
              intentions: [],
              gratitude: [action.payload],
              wins: [],
            };
            // Add the new report to the state
            newState = [newReport, ...state];
          }

          return newState;
        },
      )
      .addCase(addWinsInsight, (state, action: PayloadAction<WinsInsight>) => {
        let newState;
        // Find the report for the current date
        const existingReportIndex = state.findIndex(
          (report) => report.date === key,
        );

        if (existingReportIndex !== -1) {
          // If the report exists, update the wins insight
          const existingReport = state[existingReportIndex];
          const updatedReport = {
            ...existingReport,
            wins: [...existingReport.wins, action.payload],
          };
          // Update the state with the updated report
          newState = state.map((report, index) =>
            index === existingReportIndex ? updatedReport : report,
          );
        } else {
          // If the report doesn't exist, create a new one with the wins insight
          const newReport: ReportInsightState = {
            date: key,
            moods: {
              moods: [],
              core: [],
              primary: [],
              secondary: [],
              tertiary: [],
            },
            body: [],
            breath: "",
            intentions: [],
            gratitude: [],
            wins: [action.payload],
          };
          // Add the new report to the state
          newState = [newReport, ...state];
        }

        return newState;
      });
  },
});

export const { getReports } = reportInsightSlice.actions;
export default reportInsightSlice.reducer;
