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
      const key = new Date().toLocaleDateString();
      const newReport = addNewDailyInsight(insight);
      const existingReport = await getReports();
      const existingReportIndex = existingReport.findIndex(
        (report) => report.date === key,
      );
      let updatedReports = [];

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
    try {
      const storedReports = await AsyncStorage.getItem(REPORTS_KEY);
      if (storedReports) {
        const parsedReports: DailyInsight[] = JSON.parse(storedReports);
        setReports(parsedReports);
        return parsedReports;
      }
    } catch (error) {
      
    }
    return [];
  }, []);

  useEffect(() => {
    getReports();
  }, [getReports]);

  return (
    <ReportContext.Provider value={{ reports, getReports, saveInsight }}>
      {props.children}
    </ReportContext.Provider>
  );
};

export function useReportContext() {
  const ctx = useContext(ReportContext);
  if (!ctx) throw new Error("Context unavailable.");
  return ctx;
}

export { ReportContext, ReportProvider };
