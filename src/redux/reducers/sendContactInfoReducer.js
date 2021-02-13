import {
  SEND_CONTACT_INFO_REQUEST,
  SEND_CONTACT_INFO_SUCCESS,
  SEND_CONTACT_INFO_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  isLoading: true
};

const sendContactInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_CONTACT_INFO_REQUEST:
      return { ...state, isLoading: true };
    case SEND_CONTACT_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        error: null
      };

    case SEND_CONTACT_INFO_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default sendContactInfoReducer;
