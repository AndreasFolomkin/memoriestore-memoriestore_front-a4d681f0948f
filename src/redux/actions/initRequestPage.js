import {
  INIT_REQUESTPAGE_TRIGGERED,
  INIT_REQUESTPAGE_REQUEST,
  INIT_REQUESTPAGE_SUCCESS,
  INIT_REQUESTPAGE_FAILURE
} from "../types";

export const initRequestPageTriggered = locale => ({
  type: INIT_REQUESTPAGE_TRIGGERED,
  payload: { locale }
});

export const initRequestPageRequest = () => ({
  type: INIT_REQUESTPAGE_REQUEST
});

export const initRequestPageSuccess = data => ({
  type: INIT_REQUESTPAGE_SUCCESS,
  payload: { data }
});

export const initRequestPageFailure = error => ({
  type: INIT_REQUESTPAGE_FAILURE,
  payload: { error }
});
