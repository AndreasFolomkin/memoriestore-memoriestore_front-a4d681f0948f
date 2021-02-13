import {
  INIT_ALBUMS_TRIGGERED,
  INIT_ALBUMS_REQUEST,
  INIT_ALBUMS_SUCCESS,
  INIT_ALBUMS_FAILURE
} from "../types";

export const initAlbumsTriggered = () => ({
  type: INIT_ALBUMS_TRIGGERED
});

export const initAlbumsRequest = () => ({
  type: INIT_ALBUMS_REQUEST
});

export const initAlbumsSuccess = data => ({
  type: INIT_ALBUMS_SUCCESS,
  payload: { data }
});

export const initAlbumsFailure = error => ({
  type: INIT_ALBUMS_FAILURE,
  payload: { error }
});
