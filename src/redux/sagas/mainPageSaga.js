import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";

import { INIT_MAINPAGE_TRIGGERED } from "../types";
import {
  initMainPageRequest as request,
  initMainPageSuccess as success,
  initMainPageFailure as failure
} from "../actions/initMainPage";

import ApiWrapper from "../../utils/apiWrapper";

function* mainPage(action) {
  yield put(request());
  try {
    let response = yield call(
      [ApiWrapper, ApiWrapper.getMainPageI18N],
      action.payload.locale
    );
//    console.log("success");
    yield put(success(response.data));
  } catch (err) {
    console.log("err:");
    console.log(err);
    yield put(failure(err.response));
  }
}

export default function* mainPageSaga() {
  yield takeLatest(INIT_MAINPAGE_TRIGGERED, mainPage);
}
