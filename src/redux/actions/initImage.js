import {
  INIT_IMAGES_TRIGGERED,
  INIT_IMAGES_REQUEST,
  INIT_IMAGES_SUCCESS,
  INIT_IMAGES_FAILURE
} from "../types";

export const initImagesTriggered = id => ({
  type: INIT_IMAGES_TRIGGERED,
  payload: { id }
});

export const initImagesRequest = () => ({
  type: INIT_IMAGES_REQUEST
});

export const initImagesSuccess = (data, albumId) => ({
  type: INIT_IMAGES_SUCCESS,
  payload: { data, albumId }
});

export const initImagesFailure = error => ({
  type: INIT_IMAGES_FAILURE,
  payload: { error }
});
