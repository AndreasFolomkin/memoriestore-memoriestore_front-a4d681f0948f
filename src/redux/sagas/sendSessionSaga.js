import { put, takeLatest, call, delay, select } from "redux-saga/effects";

import { SEND_SESSION_SUMBITTED } from "../types";
import {
  sendSessionRequest as request,
  sendSessionSuccess as success,
  sendSessionFailure as failure
} from "../actions/sendSession";

import ApiWrapper from "../../utils/apiWrapper";

function* sendSession(action) {
  const state = yield select();
  // console.log("state in saga", state);
  // console.log("ACTION.payloadNEXT", action.payload.albumPrice);
  // let formInfo;

  let ab = action.payload.tariffName;
  let ac = action.payload.albumPrice;
  let info = {
    user_id: localStorage.getItem("userId"),
    time: Date.now(),
    marks: state.markPlaced.marks || [],
    lang: localStorage.getItem("locale"),
    is_order_touched: sessionStorage.getItem("is_order_touched"),
    is_order_placed: sessionStorage.getItem("is_order_placed"),
    is_order_confirmed: sessionStorage.getItem("is_order_confirmed"),
    tariffName: ab,
    albumPrice: ac

    // secret_info: {
    //   browser_name: navigator.appName,
    //   browser_enginereturn: navigator.product,
    //   browser_version1a: navigator.appVersion,
    //   browser_version1b: navigator.userAgent,
    //   browser_language: navigator.language,
    //   browser_online: navigator.onLine,
    //   browser_platform: navigator.platform,
    //   java_enabled: navigator.javaEnabled(),
    //   data_cookies_enabled: navigator.cookieEnabled,

    //   size_screen_width: window.screen.width,
    //   size_screen_heigh: window.screen.height,
    //   scr_color_depth: window.screen.colorDepth,
    //   scr_pixel_depth: window.screen.pixelDepth
    // }
  };
  yield put(request());
  try {
    let response = yield call([ApiWrapper, ApiWrapper.postSendSessionPage], {
      info: info
    });
    yield put(success(response.data));
  } catch (err) {
    yield put(failure(err.response));
  }
}
export default function* sendSessionSaga() {
  yield takeLatest(SEND_SESSION_SUMBITTED, sendSession);
}
