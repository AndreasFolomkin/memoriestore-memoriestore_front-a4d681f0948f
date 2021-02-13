import {
  SEND_GIFT_CARD_TRIGGERED,
  SEND_GIFT_CARD_REQUEST,
  SEND_GIFT_CARD_SUCCESS,
  SEND_GIFT_CARD_FAILURE
} from "../types";

export const sendGiftCardTriggered = () => ({
  type: SEND_GIFT_CARD_TRIGGERED
});

export const sendGiftCardRequest = () => ({
  type: SEND_GIFT_CARD_REQUEST
});

export const sendGiftCardSuccess = data => ({
  type: SEND_GIFT_CARD_SUCCESS,
  payload: { data }
});

export const sendGiftCardFailure = error => ({
  type: SEND_GIFT_CARD_FAILURE,
  payload: { error }
});
