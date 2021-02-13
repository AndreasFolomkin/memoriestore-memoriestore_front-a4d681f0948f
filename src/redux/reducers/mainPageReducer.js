import {
  INIT_MAINPAGE_REQUEST,
  INIT_MAINPAGE_SUCCESS,
  INIT_MAINPAGE_FAILURE
} from "../types";

const initialState = {
  hero: {},
  photo_album_examples: {},
  how_it_work: {},
  choose_tariff: {},
  i18n_data: {},
  error: null,
  isLoading: true
};

const mainPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_MAINPAGE_REQUEST:
      return { ...state, isLoading: true };
    case INIT_MAINPAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hero: action.payload.data.hero,
        photo_album_examples: action.payload.data.photo_album_examples,
        how_it_work: action.payload.data.how_it_work,
        choose_tariff: action.payload.data.choose_tariff,
        i18n_data: action.payload.data.i18n_data, //продублировать на остальные
        error: null
      };
    case INIT_MAINPAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default mainPageReducer;
