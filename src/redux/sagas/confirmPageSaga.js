import { put, takeLatest, call } from "redux-saga/effects";

import { INIT_CONFIRMPAGE_TRIGGERED } from "../types";
import {
  initConfirmPageRequest as request,
  initConfirmPageSuccess as success,
  initConfirmPageFailure as failure
} from "../actions/initConfirmationPage";

import ApiWrapper from "../../utils/apiWrapper";

function* confirmPage(action) {
  yield put(request());
  try {
    let response = yield call(
      [ApiWrapper, ApiWrapper.getConfirmPageI18N],
      action.payload.locale
    );

    console.log("confirm success");
    yield put(success(response.data));
  } catch (err) {
    console.log("confirm err:");
    console.log(err);
    yield put(failure(err.response));
  }
}

export default function* faqPageSaga() {
  yield takeLatest(INIT_CONFIRMPAGE_TRIGGERED, confirmPage);
}
