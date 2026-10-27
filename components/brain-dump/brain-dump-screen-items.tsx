import { FlatList, View } from "react-native";
import { BrainDumpInsight, ScreenProps } from "../screen.interface";
import { useCallback, useRef, useState } from "react";
import BrainDumpScreen from "./brain-dump";
import { useStorageSettingsContext } from "@/providers/storage-settings-provider";
import { useSavePreferenceSettingsContext } from "@/providers/save-preference-provider";
import { useAppDispatch } from "../store.interface";
import { addBrainDumpInsight } from "./brain-dump-insight-reducer";

type BrainDumpItem = {
  title: string;
  id: keyof BrainDumpInsight;
  label: string;
  placeholder: string;
};

const items = [
  {
    title: "Things I need to do",
    id: "haveToDo",
  },
  {
    title: "One small win this week",
    id: "wins",
  },
  {
    title: "How I'm actually feeling",
    id: "feelings",
  },
  {
    title: "Things I'm worried about",
    id: "worries",
  },
  {
    title: "Things I want to do but keep putting off",
    id: "wantToDo",
  },
] as BrainDumpItem[];

export default function BrainDumpScreenItems({
  onComplete,
  width,
  height,
}: ScreenProps) {
  const [todos, setToDos] = useState("");
  const [smallWin, setSmallWin] = useState("");
  const [feelings, setFeelings] = useState("");
  const [worries, setWorries] = useState("");
  const [puttingOff, setPuttingOff] = useState("");
  const [disabled, setDisabled] = useState(false);

  const itemsRef = useRef<FlatList<BrainDumpItem>>(null);

  const { storageType } = useStorageSettingsContext();
  const { savedPreferences } = useSavePreferenceSettingsContext();
  const dispatch = useAppDispatch();

  const onBrainDumpSave = useCallback(() => {
    setDisabled(true);

    if (storageType === "local" && savedPreferences?.braindump_preference) {
      dispatch(
        addBrainDumpInsight({
          haveToDo: todos.trim(),
          wantToDo: puttingOff.trim(),
          wins: smallWin.trim(),
          feelings: feelings.trim(),
          worries: worries.trim(),
        }),
      );
    }
    onComplete();
  }, [
    storageType,
    savedPreferences?.braindump_preference,
    dispatch,
    todos,
    puttingOff,
    smallWin,
    feelings,
    worries,
  ]);

  const handleOnComplete = (index: number) => {
    if (index < items.length - 1) {
      itemsRef.current?.scrollToIndex({
        index: index + 1,
        animated: true,
        viewPosition: 0,
      });
    } else {
      onBrainDumpSave();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={itemsRef}
        horizontal={false}
        data={items}
        renderItem={({ item, index }) => {
          if (item.id === "haveToDo") {
            return (
              <View style={{ flex: 1, height: height, paddingVertical: 100 }}>
                <BrainDumpScreen
                  onComplete={(text: string) => {
                    setToDos(text);
                    handleOnComplete(index);
                  }}
                  title={item.title}
                  label={item.label}
                  placeholder={item.placeholder}
                  disabled={disabled}
                />
              </View>
            );
          } else if (item.id === "wins") {
            return (
              <View style={{ flex: 1, height: height, paddingVertical: 100 }}>
                <BrainDumpScreen
                  onComplete={(text: string) => {
                    setSmallWin(text);
                    handleOnComplete(index);
                  }}
                  title={item.title}
                  label={item.label}
                  placeholder={item.placeholder}
                  disabled={disabled}
                />
              </View>
            );
          }
          if (item.id === "feelings") {
            return (
              <View style={{ flex: 1, height: height, paddingVertical: 100 }}>
                <BrainDumpScreen
                  onComplete={(text: string) => {
                    setFeelings(text);
                    handleOnComplete(index);
                  }}
                  title={item.title}
                  label={item.label}
                  placeholder={item.placeholder}
                  disabled={disabled}
                />
              </View>
            );
          } else if (item.id === "worries") {
            return (
              <View style={{ flex: 1, height: height, paddingVertical: 100 }}>
                <BrainDumpScreen
                  onComplete={(text: string) => {
                    setWorries(text);
                    handleOnComplete(index);
                  }}
                  title={item.title}
                  label={item.label}
                  placeholder={item.placeholder}
                  disabled={disabled}
                />
              </View>
            );
          } else {
            return (
              <View style={{ flex: 1, height: height, paddingVertical: 100 }}>
                <BrainDumpScreen
                  onComplete={(text: string) => {
                    setPuttingOff(text);
                    handleOnComplete(index);
                  }}
                  title={item.title}
                  label={item.label}
                  placeholder={item.placeholder}
                  buttonLabel={"Complete"}
                  iconText={"arrow-right"}
                  disabled={disabled}
                />
              </View>
            );
          }
        }}
      />
    </View>
  );
}
