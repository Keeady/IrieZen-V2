import React, { useCallback, useEffect, useState } from "react";
import { ExtendedBodyPart } from "react-native-body-highlighter";
import { useBodySettingsContext } from "@/providers/body-settings-provider";
import { useStorageSettingsContext } from "@/providers/storage-settings-provider";
import BodyFlowRenderer from "./body-renderer";
import { BodySide, ScreenProps } from "../screen.interface";
import { getBodySensationIntroMessage } from "@/data/moodList";
import { addBodyInsight } from "./body-insight-reducer";
import { useAppDispatch } from "../store.interface";
import { useSavePreferenceSettingsContext } from "@/providers/save-preference-provider";

type BodySensationScreenProps = {
  selectedEmotions: string[];
  onComplete: (bodyParts: string[]) => void;
  loadingBody: boolean | undefined;
};

export default function BodySensationScreen({
  selectedEmotions,
  onComplete,
  loadingBody,
  height,
}: BodySensationScreenProps & ScreenProps) {
  const [selectedParts, setSelectedParts] = useState<ExtendedBodyPart[]>([]);
  const [side, setSide] = useState<BodySide>("front");
  const [title, setTitle] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { body } = useBodySettingsContext();
  const { storageType } = useStorageSettingsContext();
  const { savedPreferences } = useSavePreferenceSettingsContext();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const message = getBodySensationIntroMessage();
    setTitle(message);
  }, []);

  const saveBodyToStorage = useCallback(() => {
    if (storageType === "local" && savedPreferences?.moodsandbody_preference) {
      const bodyParts = selectedParts.map((p) => {
        if (p.side) {
          return { part: p.slug!, side: p.side };
        }
        return { part: p.slug! };
      });
      dispatch(addBodyInsight(bodyParts));
    }
  }, [selectedParts, storageType, dispatch, savedPreferences?.moodsandbody_preference]);

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
      loadingBody={loadingBody}
      width={0}
      height={height}
    />
  );
}
