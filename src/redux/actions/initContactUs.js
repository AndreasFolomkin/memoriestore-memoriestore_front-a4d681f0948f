import {
  CONTACT_US_TRIGGERED,
  CONTACT_US_REQUEST,
  CONTACT_US_SUCCESS,
  CONTACT_US_FAILURE
} from "../types";

export const initContactUsPageTriggered = locale => ({
  type: CONTACT_US_TRIGGERED,
  payload: { locale }
});

export const initContactUsPageRequest = () => ({
  type: CONTACT_US_REQUEST
});

export const initContactUsPageSuccess = data => ({
  type: CONTACT_US_SUCCESS,
  payload: { data }
});

export const initContactUsPageFailure = error => ({
  type: CONTACT_US_FAILURE,
  payload: { error }
});
