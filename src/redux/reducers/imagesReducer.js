import {
  INIT_IMAGES_REQUEST,
  INIT_IMAGES_SUCCESS,
  INIT_IMAGES_FAILURE
} from "../types";

const initialState = {
  data: [],
  error: null,
  isLoading: true
};

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_IMAGES_REQUEST:
      return { ...state, isLoading: true };
    case INIT_IMAGES_SUCCESS:
      const newData = [...state.data];
      newData[action.payload.albumId] = action.payload.data;
      return {
        ...state,
        isLoading: false,
        data: newData,
        error: null
      };
    case INIT_IMAGES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default imagesReducer;
