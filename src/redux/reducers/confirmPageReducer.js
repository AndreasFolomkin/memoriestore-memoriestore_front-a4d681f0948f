import {
  INIT_CONFIRMPAGE_REQUEST,
  INIT_CONFIRMPAGE_SUCCESS,
  INIT_CONFIRMPAGE_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  i18n_data: {},
  isLoading: true
};

const confirmPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_CONFIRMPAGE_REQUEST:
      return { ...state, isLoading: true };
    case INIT_CONFIRMPAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        i18n_data: action.payload.data.i18n_data,
        error: null
      };
    case INIT_CONFIRMPAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default confirmPageReducer;
