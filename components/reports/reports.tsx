import ReportsRenderer from "./reports-renderer";
import { useReportContext } from "@/providers/report-provider";

export default function ReportsScreen() {
  const { reports } = useReportContext();
  const key = new Date().toLocaleDateString();
  const currentDailyReport = reports?.find((report) => report.date === key);
  const previousDailyReports = reports?.filter((report) => report.date !== key) || [];

  return (
    <ReportsRenderer
      currentDaily={currentDailyReport || null}
      previousDaily={previousDailyReports}
    />
  );
}
