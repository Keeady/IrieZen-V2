import { DailyInsight, Insight } from "@/components/screen.interface";
import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  FC,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addNewDailyInsight, mergeDailyInsight } from "./daily-insight-provider";

const REPORTS_KEY = "reports";

interface Props {
  children: ReactNode;
}

type ContextProps = {
  reports: DailyInsight[];
  getReports: () => Promise<DailyInsight[]>;
  saveInsight: (insight: Partial<DailyInsight>) => Promise<void>;
};

const ReportContext = createContext<Partial<ContextProps>>({});

const ReportProvider = (props: Props) => {
  const [reports, setReports] = useState<DailyInsight[]>([]);

  const saveInsight = useCallback(
    async (insight: Partial<DailyInsight>) => {
      console.log("saveInsight called with insight:", insight);
      const key = new Date().toLocaleDateString();
      console.log("Key for AsyncStorage:", key, "Insight:", insight);
      const newReport = addNewDailyInsight(insight);
      const existingReport = await getReports();
      const existingReportIndex = existingReport.findIndex(
        (report) => report.date === key,
      );
      let updatedReports = [];

      console.log("Existing report index:", existingReportIndex);
      if (existingReportIndex !== -1) {
        const mergedReport = mergeDailyInsight(existingReport[existingReportIndex], newReport);
        updatedReports = existingReport.map((report, index) => {
          if (index === existingReportIndex) {
            return { ...report, ...mergedReport };
          }
          return report;
        });
      } else {
        updatedReports = [newReport, ...existingReport];
      }

      setReports(updatedReports);
      await AsyncStorage.setItem(REPORTS_KEY, JSON.stringify(updatedReports));
    },
    [],
  );

  const getReports = useCallback(async () => {
    console.log("getReports called");
    try {
      const storedReports = await AsyncStorage.getItem(REPORTS_KEY);
      if (storedReports) {
        const parsedReports: DailyInsight[] = JSON.parse(storedReports);
        setReports(parsedReports);
        return parsedReports;
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
    return [];
  }, []);

  useEffect(() => {
    console.log("useEffect in ReportProvider called");
    getReports();
  }, [getReports]);

  return (
    <ReportContext.Provider value={{ reports, getReports, saveInsight }}>
      {props.children}
    </ReportContext.Provider>
  );
};

export function useReportContext() {
  console.log("useReportContext called");
  const ctx = useContext(ReportContext);
  if (!ctx) throw new Error("Context unavailable.");
  return ctx;
}

export { ReportContext, ReportProvider };
