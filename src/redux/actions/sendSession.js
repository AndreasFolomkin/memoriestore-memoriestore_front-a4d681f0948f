import {
  SEND_SESSION_SUMBITTED,
  SEND_SESSION_REQUEST,
  SEND_SESSION_SUCCESS,
  SEND_SESSION_FAILURE
} from "../types";

export const sendSessionSubmitted = (tariffName, albumPrice) => ({
  type: SEND_SESSION_SUMBITTED,
  payload: { tariffName, albumPrice }
});

export const sendSessionRequest = () => ({
  type: SEND_SESSION_REQUEST
});

export const sendSessionSuccess = data => ({
  type: SEND_SESSION_SUCCESS,
  payload: { data }
});

export const sendSessionFailure = error => ({
  type: SEND_SESSION_FAILURE,
  payload: { error }
});
