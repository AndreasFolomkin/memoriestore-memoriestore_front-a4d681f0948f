import {
  SEND_LOCATION_DATA_REQUEST,
  SEND_LOCATION_DATA_SUCCESS,
  SEND_LOCATION_DATA_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  isLoading: true
  //   submitted: {}
};

const sendLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_LOCATION_DATA_REQUEST:
      return { ...state, isLoading: true };
    case SEND_LOCATION_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        error: null
      };

    case SEND_LOCATION_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default sendLocationReducer;
