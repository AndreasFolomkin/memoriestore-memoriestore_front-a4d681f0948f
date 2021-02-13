import {
  SEND_COMMENTS_SUMBITTED,
  SEND_COMMENTS_REQUEST,
  SEND_COMMENTS_SUCCESS,
  SEND_COMMENTS_FAILURE
} from "../types";

export const sendCommentsSubmitted = comments => ({
  type: SEND_COMMENTS_SUMBITTED,
  payload: comments
});

export const sendCommentsRequest = () => ({
  type: SEND_COMMENTS_REQUEST
});

export const sendCommentsSuccess = data => ({
  type: SEND_COMMENTS_SUCCESS,
  payload: { data }
});

export const sendCommentsFailure = error => ({
  type: SEND_COMMENTS_FAILURE,
  payload: { error }
});
