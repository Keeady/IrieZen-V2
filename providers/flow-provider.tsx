import { Flow, MoodFlow } from "@/data/flow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export type FlowContextProps = {
  key: string;
  flow: Flow;
  moods: MoodFlow;
  body: string[];
  addPrimaryMood: (core: string, value: string) => void;
  addSecondaryMood: (core: string, value: string) => void;
  addTertiaryMood: (core: string, value: string) => void;
  removePrimaryMood: (core: string, value: string) => void;
  removeSecondaryMood: (core: string, value: string) => void;
  removeTertiaryMood: (core: string, value: string) => void;
  addBreath: () => void;
  addBody: (body: string[]) => void;
  addGratitude: (gratitude: string) => void;
  addIntentions: (intentions: string) => void;
  addWins: (wins: string) => void;
  addNotes: (notes: string) => void;
  getFlow: () => Promise<Flow>;
  saveNewFlow: (updatedFlow: Flow) => Promise<void>;
  getBreath: () => number;
  getMoods: () => MoodFlow;
  getBody: () => string[];
};

const FlowContext = createContext<Partial<FlowContextProps>>({});

interface Props {
  children: React.ReactNode;
}

const FlowContextProvider = (props: Props) => {
  const key = new Date().toLocaleDateString(); // use current date as key for flow data
  console.log("FlowContextProvider: Initializing FlowContextProvider with key:", key);
  const [flow, setFlow] = useState<Flow>({
    breath: 0,
    body: [],
    moods: new Map<string, { primary: string[]; secondary: string[]; tertiary: string[] }>(),
    gratitude: "",
    intentions: "",
    wins: "",
    notes: "",
  });

  const [breath, setBreath] = useState<number>(0);
  const [moods, setMoods] = useState<MoodFlow>(new Map<string, { primary: string[]; secondary: string[]; tertiary: string[] }>());
  const [body, setBody] = useState<string[]>([]);
  const [gratitude, setGratitude] = useState<string>("");
  const [intentions, setIntentions] = useState<string>("");
  const [wins, setWins] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const addPrimaryMood = (core: string, value: string) => {
    setMoods((prev) => {
      const existingCore = prev.get(core);
      if (existingCore) {
        existingCore.primary.push(value);
        return new Map(prev).set(core, existingCore);
      } else {
        return new Map(prev).set(core, {primary: [value], secondary: [], tertiary: [] });
      }
    });
  };

  const addSecondaryMood = (core: string, value: string) => {
    setMoods((prev) => {
      const existingCore = prev.get(core);
      if (existingCore) {
        existingCore.secondary.push(value);
        return new Map(prev).set(core, existingCore);
      } else {
        return new Map(prev).set(core, {primary: [], secondary: [value], tertiary: [] });
      }
    });
  };

  const addTertiaryMood = (core: string, value: string) => {
    setMoods((prev) => {
      const existingCore = prev.get(core);
      if (existingCore) {
        existingCore.tertiary.push(value);
        return new Map(prev).set(core, existingCore);
      } else {
        return new Map(prev).set(core, {primary: [], secondary: [], tertiary: [value] });
      }
    });
  };

  const removePrimaryMood = (core: string, value: string) => {
    setMoods((prev) => {
      const existingCore = prev.get(core);
      if (existingCore) {
        existingCore.primary = existingCore.primary.filter((mood) => mood !== value);
        return new Map(prev).set(core, existingCore);
      }
      return prev;
    });
  };

  const removeSecondaryMood = (core: string, value: string) => {
    setMoods((prev) => {
      const existingCore = prev.get(core);
      if (existingCore) {
        existingCore.secondary = existingCore.secondary.filter((mood) => mood !== value);
        return new Map(prev).set(core, existingCore);
      }
      return prev;
    });
  };

  const removeTertiaryMood = (core: string, value: string) => {
    setMoods((prev) => {
      const existingCore = prev.get(core);
      if (existingCore) {
        existingCore.tertiary = existingCore.tertiary.filter((mood) => mood !== value);
        return new Map(prev).set(core, existingCore);
      }
      return prev;
    });
  };

  const addBreath = () => {
    setBreath((prev) => prev + 1);
  };

  const addBody = (body: string[]) => {
    console.log("FlowContextProvider: Adding body sensations to context:", body);
    setBody([...body]);
  };

  const getBody = () => {
    console.log("FlowContextProvider: Getting body sensations from context:", body);
    return body;
  };

  const addGratitude = (gratitude: string) => {
    setGratitude(gratitude);
  };

  const addIntentions = (intentions: string) => {
    setIntentions(intentions);
  };

  const addWins = (wins: string) => {
    setWins(wins);
  };

  const addNotes = (notes: string) => {
    setNotes(notes);
  };

  const getExistingFlow = async () => {
    try {
      const flowDataByKey = await AsyncStorage.getItem(key);
      console.log("Retrieved flow data from local storage:", flowDataByKey);
      if (flowDataByKey) {
        const flowData = JSON.parse(flowDataByKey);
        setFlow(flowData);
      }
    } catch (error) {
      console.error("Error retrieving breaths from local storage:", error);
    }
  };

  const saveNewFlow = async (updatedFlow: Flow) => {
    try {
      const flowString = JSON.stringify(updatedFlow);
      await AsyncStorage.setItem(key, flowString);
    } catch (error) {
      console.error("Error saving flow to local storage:", error);
    }
  };

  useEffect(() => {
    getExistingFlow();
  }, []);

  const getBreath = () => {
    return breath;
  };

  const getMoods = () => {
    return moods;
  };

  return (
    <FlowContext.Provider
      value={{
        key,
        flow,
        moods,
        body,
        addPrimaryMood,
        addSecondaryMood,
        addTertiaryMood,
        removePrimaryMood,
        removeSecondaryMood,
        removeTertiaryMood,
        addBreath,
        addBody,
        addGratitude,
        addIntentions,
        addWins,
        addNotes,
        getBreath,
        saveNewFlow,
        getMoods,
        getBody,
      }}
    >
      {props.children}
    </FlowContext.Provider>
  );
};

export function useFlowContext() {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error("Context unavailable.");
  return ctx;
}

export { FlowContext, FlowContextProvider };
