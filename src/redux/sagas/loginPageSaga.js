import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";

import { INIT_LOGINPAGE_TRIGGERED } from "../types";
import {
  initLoginPageRequest as request,
  initLoginPageSuccess as success,
  initLoginPageFailure as failure
} from "../actions/initLoginPage";

import ApiWrapper from "../../utils/apiWrapper";

function* loginPage(action) {
  yield put(request());
  try {
    let response = yield call(
      [ApiWrapper, ApiWrapper.getLoginPageI18N],
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

export default function* loginPageSaga() {
  yield takeLatest(INIT_LOGINPAGE_TRIGGERED, loginPage);
}
