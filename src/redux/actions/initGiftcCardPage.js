import {
  GIFT_CARD_TRIGGERED,
  GIFT_CARD_REQUEST,
  GIFT_CARD_SUCCESS,
  GIFT_CARD_FAILURE
} from "../types";

export const initGiftCardPageTriggered = locale => ({
  type: GIFT_CARD_TRIGGERED,
  payload: { locale }
});

export const initGiftCardPageRequest = () => ({
  type: GIFT_CARD_REQUEST
});

export const initGiftCardPageSuccess = data => ({
  type: GIFT_CARD_SUCCESS,
  payload: { data }
});

export const initGiftCardPageFailure = error => ({
  type: GIFT_CARD_FAILURE,
  payload: { error }
});
