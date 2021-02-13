import {
  INIT_ALBUMS_REQUEST,
  INIT_ALBUMS_SUCCESS,
  INIT_ALBUMS_FAILURE
} from "../types";

const initialState = {
  data: { results: [], count: 10 },
  error: null,
  isLoading: true
  // count: 0,
  // nextLink: null
};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_ALBUMS_REQUEST:
      return { ...state, isLoading: true };
    case INIT_ALBUMS_SUCCESS:
      // console.log("state.data.results", state.data.results);
      // let next = action.payload.data.next
      //   .split("/")
      //   .slice(3)
      //   .join("/");
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        // next: next,
        // results: [...action.payload.data.results, ...state.data.results]
        error: null
      };
    case INIT_ALBUMS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default albumsReducer;
