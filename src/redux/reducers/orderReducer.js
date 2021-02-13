import {
  SEND_READY_ORDER_REQUEST,
  SEND_READY_ORDER_SUCCESS,
  SEND_READY_ORDER_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  isLoading: true
};

const sendOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_READY_ORDER_REQUEST:
      return { ...state, isLoading: true };
    case SEND_READY_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        error: null
      };
    case SEND_READY_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default sendOrderReducer;
