import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";

import { INIT_HEADERFOOTER_TRIGGERED } from "../types";
import {
  initHeaderFooterRequest as request,
  initHeaderFooterSuccess as success,
  initHeaderFooterFailure as failure
} from "../actions/initHeaderFooter";

import ApiWrapper from "../../utils/apiWrapper";

function* headerFooter(action) {
  yield put(request());
  try {
    let response = yield call(
      [ApiWrapper, ApiWrapper.getHeaderFooterI18N],
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

export default function* headerFooterSaga() {
  yield takeLatest(INIT_HEADERFOOTER_TRIGGERED, headerFooter);
}
