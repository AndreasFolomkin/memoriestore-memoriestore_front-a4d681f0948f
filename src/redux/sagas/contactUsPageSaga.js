import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";

import { CONTACT_US_TRIGGERED } from "../types";
import {
  initContactUsPageRequest as request,
  initContactUsPageSuccess as success,
  initContactUsPageFailure as failure
} from "../actions/initContactUs";

import ApiWrapper from "../../utils/apiWrapper";

function* contactUs(action) {
  yield put(request());
  try {
    let response = yield call(
      [ApiWrapper, ApiWrapper.getContactUsPageI18N],
      // [ApiWrapper, ApiWrapper.getContactUsPageI18N],
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

export default function* contactUsPageSaga() {
  yield takeLatest(CONTACT_US_TRIGGERED, contactUs);
}
