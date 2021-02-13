import {
  INIT_ORDER_IMAGES_TRIGGERED,
  INIT_ORDER_IMAGES_REQUEST,
  INIT_ORDER_IMAGES_SUCCESS,
  INIT_ORDER_IMAGES_FAILURE,
  CLEAR_IMAGES
} from "../types";

const initialState = {
  data: {},
  error: null,
  isLoading: true
};

const orderImagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_ORDER_IMAGES_TRIGGERED:
      return state;
    case INIT_ORDER_IMAGES_REQUEST:
      return { ...state, isLoading: true };
    case INIT_ORDER_IMAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          [action.payload.albumID]: action.payload.data
        },
        error: null
      };
    case INIT_ORDER_IMAGES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    case CLEAR_IMAGES:
      return {
        data: {}
      };
    default:
      return state;
  }
};

export default orderImagesReducer;
