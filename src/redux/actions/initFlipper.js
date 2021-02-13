import {
  INIT_FLIPPER_TRIGGERED,
  INIT_FLIPPER_REQUEST,
  INIT_FLIPPER_SUCCESS,
  INIT_FLIPPER_FAILURE
} from "../types";

export const initFlipperTriggered = (locale, album, albumID) => ({
  type: INIT_FLIPPER_TRIGGERED,
  payload: { locale, album, albumID }
});

export const initFlipperRequest = () => ({
  type: INIT_FLIPPER_REQUEST
});

export const initFlipperSuccess = data => ({
  type: INIT_FLIPPER_SUCCESS,
  payload: { data }
});

export const initFlipperFailure = error => ({
  type: INIT_FLIPPER_FAILURE,
  payload: { error }
});
