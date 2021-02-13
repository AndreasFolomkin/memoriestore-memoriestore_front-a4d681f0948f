import { MARK_PLACED } from "../types";

const initialState = {
  marks: []
};

const markPlacedReducer = (state = initialState, action) => {
  switch (action.type) {
    case MARK_PLACED:
      if (state.marks[action.payload.mark.albumID]) {
        let a = state.marks.filter(el => {
          return el.albumID !== action.payload.mark.albumID;
        });
        return { ...state, marks: [...a, action.payload.mark] };
      } else return { ...state, marks: [...state.marks, action.payload.mark] };
    default:
      return state;
  }
};

export default markPlacedReducer;
