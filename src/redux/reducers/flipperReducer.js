import {
  INIT_FLIPPER_REQUEST,
  INIT_FLIPPER_SUCCESS,
  INIT_FLIPPER_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  i18n_data: {},
  isLoading: true
};

const flipperReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_FLIPPER_REQUEST:
      return { ...state, isLoading: true };
    case INIT_FLIPPER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        i18n_data: action.payload.data.i18n_data,
        error: null
      };
    case INIT_FLIPPER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default flipperReducer;
