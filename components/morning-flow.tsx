import type { Screen } from "@/data/screens";
import { screens } from "@/data/screens";
import { useEffect, useRef, useState } from "react";
import { Animated, FlatList, useWindowDimensions } from "react-native";
import FlowRenderer from "./screen-renderer";
import { ScreenItemRenderer } from "./screen-item-renderer";
import { useAppDispatch } from "./screen.interface";
import { fetchReports } from "./reports/report-insight-reducer";

export default function MorningFlow() {
  const { width, height } = useWindowDimensions();
  const listRef = useRef<FlatList<Screen>>(null);
  const [coreEmotion, setCoreEmotion] = useState<string | undefined>();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [message, setMessage] = useState<string | null>(null);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const showMessage = (text: string, nextIndex: number) => {
    setMessage(text);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setMessage(null));

      if (nextIndex >= screens.length) return;

      // scroll after message fades out
      setTimeout(() => {
        listRef.current?.scrollToIndex({ index: nextIndex });
      }, 200);
    }, 2000); // show for 2 seconds
  };

  const onScreenComplete = (index: number) => {
    const nextIndex = index + 1;

    if (nextIndex > screens.length) return;

    showMessage(screens[index].message, nextIndex);
  };

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  return (
    <FlowRenderer
      listRef={listRef}
      screens={screens}
      screenItemRenderer={({ item, index }) => (
        <ScreenItemRenderer
          item={item}
          index={index}
          onScreenComplete={onScreenComplete}
          setCoreEmotion={setCoreEmotion}
          coreEmotion={coreEmotion}
          width={width}
          height={height}
          setSelectedEmotions={setSelectedEmotions}
          selectedEmotions={selectedEmotions}
        />
      )}
      message={message}
      fadeAnim={fadeAnim}
    />
  );
}
