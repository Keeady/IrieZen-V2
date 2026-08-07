import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BodyInsight, DailyInsight, MoodInsight } from "../screen.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addMoodInsight } from "../mood/mood-insight-reducer";
import { addBodyInsight } from "../body/body-insight-reducer";
import { addBreathInsight } from "../breath/breath-insight-reducer";

type ReportInsightState = DailyInsight;

const key = new Date().toLocaleDateString();
const REPORTS_KEY = "reports";

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

        // Save the updated state to AsyncStorage
        saveNewReport(newState);

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
          // Save the updated state to AsyncStorage
          saveNewReport(newState);

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
        // Save the updated state to AsyncStorage
        saveNewReport(newState);

        return newState;
      });
  },
});

// Save the updated state to AsyncStorage
function saveNewReport(state: ReportInsightState[]) {
  AsyncStorage.setItem(REPORTS_KEY, JSON.stringify(state))
    .then(() => {
      console.log("Successfully saved updated reports to AsyncStorage");
    })
    .catch((error) => {
      console.error("Error saving updated reports to AsyncStorage:", error);
    });
}

export const { getReports } = reportInsightSlice.actions;
export default reportInsightSlice.reducer;
