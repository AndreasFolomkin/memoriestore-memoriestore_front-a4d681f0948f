import {
  INIT_CONFIRMPAGE_TRIGGERED,
  INIT_CONFIRMPAGE_REQUEST,
  INIT_CONFIRMPAGE_SUCCESS,
  INIT_CONFIRMPAGE_FAILURE
} from "../types";

export const initConfirmPageTriggered = locale => ({
  type: INIT_CONFIRMPAGE_TRIGGERED,
  payload: { locale }
});

export const initConfirmPageRequest = () => ({
  type: INIT_CONFIRMPAGE_REQUEST
});

export const initConfirmPageSuccess = data => ({
  type: INIT_CONFIRMPAGE_SUCCESS,
  payload: { data }
});

export const initConfirmPageFailure = error => ({
  type: INIT_CONFIRMPAGE_FAILURE,
  payload: { error }
});
