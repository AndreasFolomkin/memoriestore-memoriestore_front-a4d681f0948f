import {
  INIT_MAINPAGE_TRIGGERED,
  INIT_MAINPAGE_REQUEST,
  INIT_MAINPAGE_SUCCESS,
  INIT_MAINPAGE_FAILURE
} from "../types";

export const initMainPageTriggered = locale => ({
  type: INIT_MAINPAGE_TRIGGERED,
  payload: { locale }
});

export const initMainPageRequest = () => ({
  type: INIT_MAINPAGE_REQUEST
});

export const initMainPageSuccess = data => ({
  type: INIT_MAINPAGE_SUCCESS,
  payload: { data }
});

export const initMainPageFailure = error => ({
  type: INIT_MAINPAGE_FAILURE,
  payload: { error }
});
