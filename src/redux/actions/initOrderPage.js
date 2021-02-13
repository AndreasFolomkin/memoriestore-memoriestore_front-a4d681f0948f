import {
  INIT_ORDERPAGE_TRIGGERED,
  INIT_ORDERPAGE_REQUEST,
  INIT_ORDERPAGE_SUCCESS,
  INIT_ORDERPAGE_FAILURE
} from "../types";

export const initOrderPageTriggered = (locale, album, albumID) => ({
  type: INIT_ORDERPAGE_TRIGGERED,
  payload: { locale, album, albumID }
});

export const initOrderPageRequest = () => ({
  type: INIT_ORDERPAGE_REQUEST
});

export const initOrderPageSuccess = data => ({
  type: INIT_ORDERPAGE_SUCCESS,
  payload: { data }
});

export const initOrderPageFailure = error => ({
  type: INIT_ORDERPAGE_FAILURE,
  payload: { error }
});
