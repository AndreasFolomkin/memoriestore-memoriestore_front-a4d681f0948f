import {
  SEND_LOCATION_DATA_TRIGGERED,
  SEND_LOCATION_DATA_REQUEST,
  SEND_LOCATION_DATA_SUCCESS,
  SEND_LOCATION_DATA_FAILURE
} from "../types";

export const sendLocationTriggered = (tariffName, albumPrice) => ({
  type: SEND_LOCATION_DATA_TRIGGERED,
  payload: { tariffName, albumPrice }
});

export const sendLocationRequest = () => ({
  type: SEND_LOCATION_DATA_REQUEST
});

export const sendLocationSuccess = data => ({
  type: SEND_LOCATION_DATA_SUCCESS,
  payload: { data }
});

export const sendLocationFailure = error => ({
  type: SEND_LOCATION_DATA_FAILURE,
  payload: { error }
});
