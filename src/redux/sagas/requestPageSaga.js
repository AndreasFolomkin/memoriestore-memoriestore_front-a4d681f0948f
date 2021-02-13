import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";

import { INIT_REQUESTPAGE_TRIGGERED } from "../types";
import {
  initRequestPageRequest as request,
  initRequestPageSuccess as success,
  initRequestPageFailure as failure
} from "../actions/initRequestPage";

import ApiWrapper from "../../utils/apiWrapper";

function* requestPage(action) {
  sessionStorage.setItem("is_order_touched", "true");
  yield put(request());
  try {
    let response = yield call(
      [ApiWrapper, ApiWrapper.getRequestPageI18N],
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

export default function* requestPageSaga() {
  yield takeLatest(INIT_REQUESTPAGE_TRIGGERED, requestPage);
}
