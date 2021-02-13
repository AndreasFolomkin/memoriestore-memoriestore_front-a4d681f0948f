import { put, takeEvery, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";

import { INIT_IMAGES_TRIGGERED } from "../types";
import {
  initImagesRequest as request,
  initImagesSuccess as success,
  initImagesFailure as failure
} from "../actions/initImage";

import ApiWrapper from "../../utils/apiWrapper";

function* images(action) {
  yield put(request());
  let response;
  try {
    response = yield call([ApiWrapper, ApiWrapper.getImage], action.payload.id);
    yield put(success(response.data, action.payload.id));
  } catch (err) {
    yield put(failure(`"action.payload.id", ${action.payload.id}`)); //err.response));
  }
}

export default function* imagesSaga() {
  yield takeEvery(INIT_IMAGES_TRIGGERED, images);
}
