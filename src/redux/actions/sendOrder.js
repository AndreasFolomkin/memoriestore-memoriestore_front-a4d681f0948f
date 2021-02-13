import {
  SEND_READY_ORDER_TRIGGERED,
  SEND_READY_ORDER_REQUEST,
  SEND_READY_ORDER_SUCCESS,
  SEND_READY_ORDER_FAILURE
} from "../types";

export const sendOrderTriggered = (order, path) => ({
  type: SEND_READY_ORDER_TRIGGERED,
  payload: { order, path }
});

export const sendOrderRequest = () => ({
  type: SEND_READY_ORDER_REQUEST
});

export const sendOrderSuccess = data => ({
  type: SEND_READY_ORDER_SUCCESS,
  payload: { data }
});

export const sendOrderFailure = error => ({
  type: SEND_READY_ORDER_FAILURE,
  payload: { error }
});
