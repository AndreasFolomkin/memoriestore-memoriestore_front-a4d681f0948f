import {
  SEND_GIFT_CARD_REQUEST,
  SEND_GIFT_CARD_SUCCESS,
  SEND_GIFT_CARD_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  isLoading: true
};

const sendContactInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_GIFT_CARD_REQUEST:
      return { ...state, isLoading: true };
    case SEND_GIFT_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        error: null
      };

    case SEND_GIFT_CARD_FAILURE:
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
