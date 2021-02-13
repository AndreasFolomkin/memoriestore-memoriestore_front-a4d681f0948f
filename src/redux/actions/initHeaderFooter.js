import {
  INIT_HEADERFOOTER_TRIGGERED,
  INIT_HEADERFOOTER_REQUEST,
  INIT_HEADERFOOTER_SUCCESS,
  INIT_HEADERFOOTER_FAILURE
} from "../types";

export const initHeaderFooterTriggered = locale => ({
  type: INIT_HEADERFOOTER_TRIGGERED,
  payload: { locale }
});

export const initHeaderFooterRequest = () => ({
  type: INIT_HEADERFOOTER_REQUEST
});

export const initHeaderFooterSuccess = data => ({
  type: INIT_HEADERFOOTER_SUCCESS,
  payload: { data }
});

export const initHeaderFooterFailure = error => ({
  type: INIT_HEADERFOOTER_FAILURE,
  payload: { error }
});
