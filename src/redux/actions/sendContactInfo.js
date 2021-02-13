import {
  SEND_CONTACT_INFO_TRIGGERED,
  SEND_CONTACT_INFO_REQUEST,
  SEND_CONTACT_INFO_SUCCESS,
  SEND_CONTACT_INFO_FAILURE
} from "../types";

export const sendContactInfoTriggered = () => ({
  type: SEND_CONTACT_INFO_TRIGGERED
});

export const sendContactInfoRequest = () => ({
  type: SEND_CONTACT_INFO_REQUEST
});

export const sendContactInfoSuccess = data => ({
  type: SEND_CONTACT_INFO_SUCCESS,
  payload: { data }
});

export const sendContactInfoFailure = error => ({
  type: SEND_CONTACT_INFO_FAILURE,
  payload: { error }
});
