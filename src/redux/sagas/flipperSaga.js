import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";

import { INIT_FLIPPER_TRIGGERED } from "../types";
import {
  initFlipperRequest as request,
  initFlipperSuccess as success,
  initFlipperFailure as failure
} from "../actions/initFlipper";

function* flipper(action) {
  yield put(request());
  try {
    let response = yield call(
      [axios, axios.get],
      "https://localhost:8000/testI18N/i18n/"
    );
    console.log("success");
    yield put(success(response.data));
  } catch (err) {
    console.log("err:");
    console.log(err);
    yield put(failure(err.response));
  }
}

export default function* flipperSaga() {
  yield takeLatest(INIT_FLIPPER_TRIGGERED, flipper);
}
