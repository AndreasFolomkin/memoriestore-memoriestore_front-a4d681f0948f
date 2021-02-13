import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";

import { INIT_SIDEBAR_TRIGGERED } from "../types";
import {
  initSidebarRequest as request,
  initSidebarSuccess as success,
  initSidebarFailure as failure
} from "../actions/initSidebar";

import ApiWrapper from "../../utils/apiWrapper";

function* sidebar(action) {
  yield put(request());
  try {
    let response = yield call(
      [ApiWrapper, ApiWrapper.getSidebarI18N],
      action.payload.locale
    );
    yield put(success(response.data));
  } catch (err) {
    yield put(failure(err.response));
  }
}

export default function* sidebarSaga() {
  yield takeLatest(INIT_SIDEBAR_TRIGGERED, sidebar);
}
