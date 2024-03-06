// reducers.js
import { First, Second } from "./action";

const initialState = {
  first: null,
  second: null,
  Timer: 600,
  Score: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case First:
      // console.log(action.type)
      return { ...state, first: action.data };
    case Second:
      // console.log(action.data);
      return { ...state, second: action.data };
    case "UPDATE_TIMER":
      return {
        ...state,
        Timer: action.payload,
      };
    case "Score":
      return {
        ...state,
        Score: state.Score + action.payload,
      };
    case "resetscore":
      return { ...state, Score: action.payload };
    default:
      return state;
  }
};

export default counterReducer;
