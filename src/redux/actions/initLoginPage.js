import {
  INIT_LOGINPAGE_TRIGGERED,
  INIT_LOGINPAGE_REQUEST,
  INIT_LOGINPAGE_SUCCESS,
  INIT_LOGINPAGE_FAILURE
} from "../types";

export const initLoginPageTriggered = locale => ({
  type: INIT_LOGINPAGE_TRIGGERED,
  payload: { locale }
});

export const initLoginPageRequest = () => ({
  type: INIT_LOGINPAGE_REQUEST
});

export const initLoginPageSuccess = data => ({
  type: INIT_LOGINPAGE_SUCCESS,
  payload: { data }
});

export const initLoginPageFailure = error => ({
  type: INIT_LOGINPAGE_FAILURE,
  payload: { error }
});
