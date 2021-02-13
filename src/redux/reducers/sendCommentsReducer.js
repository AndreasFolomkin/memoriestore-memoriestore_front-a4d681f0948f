import {
  SEND_COMMENTS_REQUEST,
  SEND_COMMENTS_SUCCESS,
  SEND_COMMENTS_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  isLoading: true
};

const sendCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_COMMENTS_REQUEST:
      return { ...state, isLoading: true };
    case SEND_COMMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        error: null
      };
    case SEND_COMMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default sendCommentsReducer;
