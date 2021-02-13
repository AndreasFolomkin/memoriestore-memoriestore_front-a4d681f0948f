import {
  CONTACT_US_REQUEST,
  CONTACT_US_SUCCESS,
  CONTACT_US_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  i18n_data: {},
  isLoading: true
};

const contactUsPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_US_REQUEST:
      return { ...state, isLoading: true };
    case CONTACT_US_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        i18n_data: action.payload.data.i18n_data,
        error: null
      };
    case CONTACT_US_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default contactUsPageReducer;
