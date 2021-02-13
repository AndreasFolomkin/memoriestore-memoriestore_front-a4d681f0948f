import {
  INIT_SIDEBAR_TRIGGERED,
  INIT_SIDEBAR_REQUEST,
  INIT_SIDEBAR_SUCCESS,
  INIT_SIDEBAR_FAILURE
} from "../types";

export const initSidebarTriggered = locale => ({
  type: INIT_SIDEBAR_TRIGGERED,
  payload: { locale }
});

export const initSidebarRequest = () => ({
  type: INIT_SIDEBAR_REQUEST
});

export const initSidebarSuccess = data => ({
  type: INIT_SIDEBAR_SUCCESS,
  payload: { data }
});

export const initSidebarFailure = error => ({
  type: INIT_SIDEBAR_FAILURE,
  payload: { error }
});
