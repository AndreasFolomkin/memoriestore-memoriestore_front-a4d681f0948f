import { SWITCH_LOCALE } from "../types";

const initialState = {
  locale: "he_il"
};

const switchLocaleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_LOCALE:
      return { ...state, locale: action.payload };
    default:
      return state;
  }
};

export default switchLocaleReducer;
