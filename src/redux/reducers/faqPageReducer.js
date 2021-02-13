import {
  INIT_FAQPAGE_REQUEST,
  INIT_FAQPAGE_SUCCESS,
  INIT_FAQPAGE_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  i18n_data: {},
  isLoading: true
};

const faqPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_FAQPAGE_REQUEST:
      return { ...state, isLoading: true };
    case INIT_FAQPAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        i18n_data: action.payload.data.i18n_data,
        error: null
      };
    case INIT_FAQPAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default faqPageReducer;
