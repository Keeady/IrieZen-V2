import ReportsRenderer from "./reports-renderer";
import { useAppDispatch, useAppSelector } from "@/components/screen.interface";
import { useEffect } from "react";
import { getReports } from "./report-insight-reducer";

export default function ReportsScreen() {
  const dispatch = useAppDispatch();
  const key = useAppSelector((state) => state.daily.date); // Access the date from the Redux store
  const reports = useAppSelector((state) => state.reports); // Access the reports from the Redux store
  const currentDailyReport = reports?.find((report) => report.date === key);
  const previousDailyReports = reports?.filter((report) => report.date !== key) || [];

  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);

  return (
    <ReportsRenderer
      currentDaily={currentDailyReport || null}
      previousDaily={previousDailyReports}
    />
  );
}
