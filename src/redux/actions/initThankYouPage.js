import {
  INIT_THANKYOUPAGE_TRIGGERED,
  INIT_THANKYOUPAGE_REQUEST,
  INIT_THANKYOUPAGE_SUCCESS,
  INIT_THANKYOUPAGE_FAILURE
} from "../types";

export const initThankYouTriggered = locale => ({
  type: INIT_THANKYOUPAGE_TRIGGERED,
  payload: { locale }
});

export const initThankYouRequest = () => ({
  type: INIT_THANKYOUPAGE_REQUEST
});

export const initThankYouSuccess = data => ({
  type: INIT_THANKYOUPAGE_SUCCESS,
  payload: { data }
});

export const initThankYouFailure = error => ({
  type: INIT_THANKYOUPAGE_FAILURE,
  payload: { error }
});
