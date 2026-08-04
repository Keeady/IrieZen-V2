import React, { useCallback, useEffect, useState } from "react";
import { ExtendedBodyPart } from "react-native-body-highlighter";
import { useBodySettingsContext } from "@/providers/body-settings-provider";
import { useStorageSettingsContext } from "@/providers/storage-settings-provider";
import { handleSavingBodyToLocalStorage } from "../handle-submit";
import BodyFlowRenderer from "./body-renderer";
import { BodySide, ScreenProps } from "../screen.interface";
import { getBodySensationIntroMessage } from "@/data/moodList";
import { useReportContext } from "@/providers/report-provider";

type BodySensationScreenProps = {
  selectedEmotions: string[];
  onComplete: (bodyParts: string[]) => void;
};

export default function BodySensationScreen({
  selectedEmotions,
  onComplete,
}: BodySensationScreenProps & ScreenProps) {
  const [selectedParts, setSelectedParts] = useState<ExtendedBodyPart[]>([]);
  const [side, setSide] = useState<BodySide>("front");
  const [title, setTitle] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { body } = useBodySettingsContext();
  const { storageType } = useStorageSettingsContext();
  const { saveInsight } = useReportContext();

  useEffect(() => {
    const message = getBodySensationIntroMessage();
    setTitle(message);
  }, []);

  const saveBodyToStorage = useCallback(() => {
    if (storageType === "local") {
      const bodyParts = selectedParts.map((p) => {
        if (p.side) {
          return { part: p.slug!, side: p.side };
        }
        return { part: p.slug! };
      });
      handleSavingBodyToLocalStorage(bodyParts, saveInsight);
    }
  }, [selectedParts, saveInsight, storageType]);

  const handleBodyPartPress = (
    part: ExtendedBodyPart,
    pressedSide?: "left" | "right",
  ) => {
    setSelectedParts((prev) => {
      const exists = prev.find((p) => p.slug === part.slug);
      if (exists) {
        if (pressedSide && exists.side === undefined) {
          // both sides are already selected, deselect the side that was pressed
          return prev.map((p) =>
            p.slug === part.slug
              ? { ...p, side: pressedSide === "left" ? "right" : "left" }
              : p,
          );
        } else if (pressedSide && exists.side === pressedSide) {
          // deselect the side that was pressed
          return prev.filter(
            (p) => !(p.slug === part.slug && p.side === pressedSide),
          );
        } else if (pressedSide && exists.side !== pressedSide) {
          // select both sides
          return prev.map((p) =>
            p.slug === part.slug ? { ...p, side: undefined } : p,
          );
        }
        // deselect
        return prev.filter((p) => p.slug !== part.slug);
      }
      // select part with intensity 2 and the side that was pressed
      return [...prev, { slug: part.slug, intensity: 2, side: pressedSide }];
    });
  };

  const handleOnComplete = useCallback(() => {
    setDisabled(true);
    saveBodyToStorage();
    onComplete(selectedParts.map((p) => p.slug!));
  }, [selectedParts, onComplete, saveBodyToStorage]);

  return (
    <BodyFlowRenderer
      body={body || "female"}
      side={side}
      selectedParts={selectedParts}
      selectedEmotions={selectedEmotions}
      onComplete={handleOnComplete}
      title={title}
      disabled={disabled}
      handleBodyPartPress={handleBodyPartPress}
      setSide={setSide}
    />
  );
}
