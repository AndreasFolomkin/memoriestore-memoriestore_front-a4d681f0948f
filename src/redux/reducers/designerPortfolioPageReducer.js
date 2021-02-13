import {
  INIT_DESIGNERPORTFOLIOPAGE_REQUEST,
  INIT_DESIGNERPORTFOLIOPAGE_SUCCESS,
  INIT_DESIGNERPORTFOLIOPAGE_FAILURE
} from "../types";

const initialState = {
  data: {},
  error: null,
  i18n_data: {},
  isLoading: true
};

const designerPortfolioPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_DESIGNERPORTFOLIOPAGE_REQUEST:
      return { ...state, isLoading: true };
    case INIT_DESIGNERPORTFOLIOPAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        i18n_data: action.payload.data.i18n_data,
        error: null
      };
    case INIT_DESIGNERPORTFOLIOPAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default designerPortfolioPageReducer;
