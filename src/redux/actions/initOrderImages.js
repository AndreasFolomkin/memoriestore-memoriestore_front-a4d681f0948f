import {
  INIT_ORDER_IMAGES_TRIGGERED,
  INIT_ORDER_IMAGES_REQUEST,
  INIT_ORDER_IMAGES_SUCCESS,
  INIT_ORDER_IMAGES_FAILURE,
  CLEAR_IMAGES
} from "../types";

export const initOrderImagesTriggered = id => ({
  type: INIT_ORDER_IMAGES_TRIGGERED,
  payload: { id }
});

export const initOrderImagesRequest = () => ({
  type: INIT_ORDER_IMAGES_REQUEST
});

export const initOrderImagesSuccess = (data, albumID) => ({
  type: INIT_ORDER_IMAGES_SUCCESS,
  payload: { data, albumID }
});

export const initOrderImagesFailure = error => ({
  type: INIT_ORDER_IMAGES_FAILURE,
  payload: { error }
});
export const clearImages = () => ({
  type: CLEAR_IMAGES
});
