import { BodyInsight, MoodInsight } from "./screen.interface";



function bodyInsight(state: any, action: any) {
  switch (action.type) {
    case "body/bodySaved":
      return {
        ...state,
        body: state.body.concat(action.payload.bodyInsight),
      };
    default:
      return state;
  }
}

function breathInsight(state: any, action: any) {
  switch (action.type) {
    case "breath/breathSaved":
      return {
        ...state,
        breath: action.payload.breathInsight,
      };
    default:
      return state;
  }
}

function intentionsInsight(state: any, action: any) {
  switch (action.type) {
    case "intentions/intentionsSaved":
      return {
        ...state,
        intentions: action.payload.intentionsInsight,
      };
    default:
      return state;
  }
}

function gratitudeInsight(state: any, action: any) {
  switch (action.type) {
    case "gratitude/gratitudeSaved":
      return {
        ...state,
        gratitude: action.payload.gratitudeInsight,
      };
    default:
      return state;
  }
}

function winsInsight(state: any, action: any) {
  switch (action.type) {
    case "wins/winsSaved":
      return {
        ...state,
        wins: action.payload.winsInsight,
      };
    default:
      return state;
  }
}

/* function insightStore(state: any, action: any) {
  return {
    date: action.payload.date,
    moods: moodInsight(state.moods, action),
    body: bodyInsight(state.body, action),
    breath: breathInsight(state.breath, action),
    intentions: intentionsInsight(state.intentions, action),
    gratitude: gratitudeInsight(state.gratitude, action),
    wins: winsInsight(state.wins, action),
  };
}*/

const saveMoodInsight = (mood: MoodInsight) => {
  return {
    type: "moods/moodSaved",
    payload: {
      moodInsight: mood,
    },
  };
};

const saveBodyInsight = (body: BodyInsight) => {
  return {
    type: "body/bodySaved",
    payload: {
      bodyInsight: body,
    },
  };
};


// Todo: https://redux.js.org/tutorials/essentials/part-2-app-structure#creating-the-redux-store