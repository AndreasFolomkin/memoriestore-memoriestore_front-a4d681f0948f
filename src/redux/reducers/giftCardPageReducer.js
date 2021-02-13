import {
  GIFT_CARD_REQUEST,
  GIFT_CARD_SUCCESS,
  GIFT_CARD_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  i18n_data: {},
  isLoading: true
};

const giftCardPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GIFT_CARD_REQUEST:
      return { ...state, isLoading: true };
    case GIFT_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        i18n_data: action.payload.data.i18n_data,
        error: null
      };
    case GIFT_CARD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default giftCardPageReducer;
