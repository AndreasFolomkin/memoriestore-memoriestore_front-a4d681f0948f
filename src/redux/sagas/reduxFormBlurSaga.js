import { put, takeLatest, call, delay, select } from "redux-saga/effects";

import { REDUX_FORM_BLUR } from "../types";
import {
  sendSessionRequest as request,
  sendSessionSuccess as success,
  sendSessionFailure as failure
} from "../actions/sendSession";

import ApiWrapper from "../../utils/apiWrapper";

function* reduxFormBlur(action) {
  let ab = action.payload.tariffName;
  let ac = action.payload.albumPrice;
  const state = yield select();
  let formInfo;
  if (
    window.location.pathname === "/request_page" ||
    window.location.pathname === "/request_page/"
  ) {
    formInfo = state.form.register.values;
  }

  let info = {
    user_id: localStorage.getItem("userId"),
    time: Date.now(),
    marks: [],
    lang: localStorage.getItem("locale"),
    is_order_touched: sessionStorage.getItem("is_order_touched"),
    is_order_placed: sessionStorage.getItem("is_order_placed"),
    is_order_confirmed: sessionStorage.getItem("is_order_confirmed"),
    tariffName: ab,
    albumPrice: ac,
    order_form: formInfo
  };
  console.log("ACTION PAY", action.payload);
  yield put(request());
  try {
    let response = yield call([ApiWrapper, ApiWrapper.postSendSessionPage], {
      info: info
    });
    sessionStorage.setItem("is_order_confirmed", "false");
    yield put(success(response.data));
  } catch (err) {
    yield put(failure(err.response));
  }
}

export default function* reduxFormBlurSaga() {
  yield takeLatest(REDUX_FORM_BLUR, reduxFormBlur);
}
