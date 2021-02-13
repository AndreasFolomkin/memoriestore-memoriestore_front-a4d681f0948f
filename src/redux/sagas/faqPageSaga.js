import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";

import { INIT_FAQPAGE_TRIGGERED } from "../types";
import {
  initFaqPageRequest as request,
  initFaqPageSuccess as success,
  initFaqPageFailure as failure
} from "../actions/initFaqPage";

import ApiWrapper from "../../utils/apiWrapper";

function* faqPage(action) {
  yield put(request());
  try {
    let response = yield call(
      [ApiWrapper, ApiWrapper.getFaqPageI18N],
      action.payload.locale
    );

    // (
    //   [axios, axios.get],
    //   "http://localhost:8000/testI18N/i18n/"
    // );
    console.log("success");
    yield put(success(response.data));
  } catch (err) {
    console.log("err:");
    console.log(err);
    yield put(failure(err.response));
  }
}

export default function* faqPageSaga() {
  yield takeLatest(INIT_FAQPAGE_TRIGGERED, faqPage);
}
