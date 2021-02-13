import {
  INIT_ALBUMEXAMPLESPAGE_REQUEST,
  INIT_ALBUMEXAMPLESPAGE_SUCCESS,
  INIT_ALBUMEXAMPLESPAGE_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  i18n_data: {},
  isLoading: true
};

const albumExamplePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_ALBUMEXAMPLESPAGE_REQUEST:
      return { ...state, isLoading: true };
    case INIT_ALBUMEXAMPLESPAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        i18n_data: action.payload.data.i18n_data,
        error: null
      };
    case INIT_ALBUMEXAMPLESPAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default albumExamplePageReducer;
