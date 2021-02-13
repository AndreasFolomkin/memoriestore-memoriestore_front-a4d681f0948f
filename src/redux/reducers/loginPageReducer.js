import {
  INIT_LOGINPAGE_REQUEST,
  INIT_LOGINPAGE_SUCCESS,
  INIT_LOGINPAGE_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  i18n_data: {},
  isLoading: true
};

const loginPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_LOGINPAGE_REQUEST:
      return { ...state, isLoading: true };
    case INIT_LOGINPAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        i18n_data: action.payload.data.i18n_data,
        error: null
      };
    case INIT_LOGINPAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default loginPageReducer;
