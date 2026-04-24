import { getGoodJobMessage, getMantraMessage, getReflectionMessage, reflectionMessages } from "@/data/summaryList";
import SummaryRenderer from "./summary-renderer";
import { useMemo } from "react";

export type SummaryScreenProps = {
    onComplete: () => void;
    coreEmotion?: string;
    };

export default function SummaryScreen({ onComplete, coreEmotion }: SummaryScreenProps) {
    const reflectionMessage = useMemo(() => {
    if (!coreEmotion) return "";
    return getReflectionMessage(coreEmotion as keyof typeof reflectionMessages);
  }, [coreEmotion]);

  const mantraMessage = useMemo(() => {
    return getMantraMessage();
  }, []);

  const goodJobMessage = useMemo(() => {
    return getGoodJobMessage();
  }, []);

  return (
    <SummaryRenderer
      onComplete={onComplete}
      coreEmotion={coreEmotion || ""}
      goodJobMessage={goodJobMessage}
      reflectionMessage={reflectionMessage}
      mantraMessage={mantraMessage}
    />
  )
};
