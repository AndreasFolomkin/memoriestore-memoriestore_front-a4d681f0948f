import {
  INIT_THANKYOUPAGE_REQUEST,
  INIT_THANKYOUPAGE_SUCCESS,
  INIT_THANKYOUPAGE_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  i18n_data: {},
  isLoading: true
};

const thankYouPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_THANKYOUPAGE_REQUEST:
      return { ...state, isLoading: true };
    case INIT_THANKYOUPAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        i18n_data: action.payload.data.i18n_data,
        error: null
      };
    case INIT_THANKYOUPAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default thankYouPageReducer;
