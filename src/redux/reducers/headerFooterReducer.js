import {
  INIT_HEADERFOOTER_REQUEST,
  INIT_HEADERFOOTER_SUCCESS,
  INIT_HEADERFOOTER_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  i18n_data: {},
  isLoading: true
};

const headerFooterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_HEADERFOOTER_REQUEST:
      return { ...state, isLoading: true };
    case INIT_HEADERFOOTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        i18n_data: action.payload.data.i18n_data,
        error: null
      };
    case INIT_HEADERFOOTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default headerFooterReducer;
