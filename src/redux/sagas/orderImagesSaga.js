import { put, takeEvery, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";

import { INIT_ORDER_IMAGES_TRIGGERED } from "../types";
import {
  initOrderImagesRequest as request,
  initOrderImagesSuccess as success,
  initOrderImagesFailure as failure
} from "../actions/initOrderImages";

import ApiWrapper from "../../utils/apiWrapper";

function* orderImages(action) {
  yield put(request());
  let response;
  try {
    response = yield call(
      [ApiWrapper, ApiWrapper.getOrderImage],
      action.payload.id
    );
    yield put(success(response.data, action.payload.id));
  } catch (err) {
    yield put(failure(`"action.payload.id", ${action.payload.id}`)); //err.response));
  }
}

export default function* orderImagesSaga() {
  yield takeEvery(INIT_ORDER_IMAGES_TRIGGERED, orderImages);
}
