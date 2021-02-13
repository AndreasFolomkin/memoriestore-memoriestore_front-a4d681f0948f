import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";

import { INIT_ORDERPAGE_TRIGGERED } from "../types";
import {
  initOrderPageRequest as request,
  initOrderPageSuccess as success,
  initOrderPageFailure as failure
} from "../actions/initOrderPage";

import ApiWrapper from "../../utils/apiWrapper";

function* orderPage(action) {
  yield put(request());
  try {
    let response = yield call(
      [ApiWrapper, ApiWrapper.getChooseAlbumPageI18N],
      action.payload.locale
    );
    console.log("success");
    yield put(success(response.data));
  } catch (err) {
    console.log("err:");
    console.log(err);
    yield put(failure(err.response));
  }
}

export default function* orderPageSaga() {
  yield takeLatest(INIT_ORDERPAGE_TRIGGERED, orderPage);
}
