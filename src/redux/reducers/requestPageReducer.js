import {
  INIT_REQUESTPAGE_REQUEST,
  INIT_REQUESTPAGE_SUCCESS,
  INIT_REQUESTPAGE_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  i18n_data: {},
  isLoading: true
};

const requestPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_REQUESTPAGE_REQUEST:
      return { ...state, isLoading: true };
    case INIT_REQUESTPAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        i18n_data: action.payload.data.i18n_data,
        error: null
      };
    case INIT_REQUESTPAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default requestPageReducer;
