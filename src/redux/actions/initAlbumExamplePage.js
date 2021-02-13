import {
  INIT_ALBUMEXAMPLESPAGE_TRIGGERED,
  INIT_ALBUMEXAMPLESPAGE_REQUEST,
  INIT_ALBUMEXAMPLESPAGE_SUCCESS,
  INIT_ALBUMEXAMPLESPAGE_FAILURE
} from "../types";

export const initAlbumExamplePageTriggered = (locale, album, albumID) => ({
  type: INIT_ALBUMEXAMPLESPAGE_TRIGGERED,
  payload: { locale, album, albumID }
});

export const initAlbumExamplePageRequest = () => ({
  type: INIT_ALBUMEXAMPLESPAGE_REQUEST
});

export const initAlbumExamplePageSuccess = data => ({
  type: INIT_ALBUMEXAMPLESPAGE_SUCCESS,
  payload: { data }
});

export const initAlbumExamplePageFailure = error => ({
  type: INIT_ALBUMEXAMPLESPAGE_FAILURE,
  payload: { error }
});
