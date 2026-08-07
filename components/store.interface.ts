import type { AppDispatch, RootState } from "@/providers/store-provider";
import { useDispatch, useSelector } from "react-redux";
import type { DailyInsight } from "./screen.interface";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export type ReportInsightState = DailyInsight;
export const REPORTS_KEY = "reports";
