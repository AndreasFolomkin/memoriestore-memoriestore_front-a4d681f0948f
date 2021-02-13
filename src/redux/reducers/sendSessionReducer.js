import {
  SEND_SESSION_REQUEST,
  SEND_SESSION_SUCCESS,
  SEND_SESSION_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  isLoading: true,
  submitted: {}
};

const sendSessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_SESSION_REQUEST:
      return { ...state, isLoading: true };
    case SEND_SESSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        error: null
      };

    case SEND_SESSION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default sendSessionReducer;
