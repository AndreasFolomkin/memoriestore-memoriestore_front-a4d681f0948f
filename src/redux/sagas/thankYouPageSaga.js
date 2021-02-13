import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";

import { INIT_THANKYOUPAGE_TRIGGERED } from "../types";
import {
  initThankYouRequest as request,
  initThankYouSuccess as success,
  initThankYouFailure as failure
} from "../actions/initThankYouPage";

import ApiWrapper from "../../utils/apiWrapper";

function* thankYouPage(action) {
  yield put(request());
  try {
    let response = yield call(
      [ApiWrapper, ApiWrapper.getThankYouPageI18N],
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

export default function* thankYouPageSaga() {
  yield takeLatest(INIT_THANKYOUPAGE_TRIGGERED, thankYouPage);
}
