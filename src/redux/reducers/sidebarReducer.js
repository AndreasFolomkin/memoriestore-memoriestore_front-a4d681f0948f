import {
  INIT_SIDEBAR_REQUEST,
  INIT_SIDEBAR_SUCCESS,
  INIT_SIDEBAR_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  i18n_data: {},
  isLoading: true
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_SIDEBAR_REQUEST:
      return { ...state, isLoading: true };
    case INIT_SIDEBAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        i18n_data: action.payload.data.i18n_data,
        error: null
      };
    case INIT_SIDEBAR_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default sidebarReducer;
