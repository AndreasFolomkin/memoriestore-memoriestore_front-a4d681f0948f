import {
  CHECK_PROMOCODE_REQUEST,
  CHECK_PROMOCODE_SUCCESS,
  CHECK_PROMOCODE_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  isLoading: true
};

const checkPromocodeLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_PROMOCODE_REQUEST:
      return { ...state, isLoading: true };
    case CHECK_PROMOCODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        error: null
      };
    case CHECK_PROMOCODE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default checkPromocodeLoginReducer;
