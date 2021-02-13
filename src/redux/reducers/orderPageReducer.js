import {
  INIT_ORDERPAGE_REQUEST,
  INIT_ORDERPAGE_SUCCESS,
  INIT_ORDERPAGE_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  i18n_data: {},
  isLoading: true
};

const orderPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_ORDERPAGE_REQUEST:
      return { ...state, isLoading: true };
    case INIT_ORDERPAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        i18n_data: action.payload.data.i18n_data,
        error: null
      };
    case INIT_ORDERPAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default orderPageReducer;
