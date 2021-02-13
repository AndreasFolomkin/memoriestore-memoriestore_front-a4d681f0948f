import { put, takeLatest, call, all, delay, select } from "redux-saga/effects";

import { CHECK_PROMOCODE_SUMBITTED } from "../types";
import {
  checkPromocodeRequest as request,
  checkPromocodeSuccess as success,
  checkPromocodeFailure as failure
} from "../actions/checkPromocodeLogin";
import { initOrderImagesTriggered } from "../actions/initOrderImages";
import ApiWrapper from "../../utils/apiWrapper";

function* verifyPromocode(action) {
  // const state = yield select();
  // console.log("state in saga", state);
  // console.log("%cthis.state.password", "color:blue", state.password);
  yield put(request());
  sessionStorage.setItem("password", action.payload.promoCode);
  try {
    let response = yield call([ApiWrapper, ApiWrapper.postLoginPage], {
      promocode: action.payload.promoCode
    });

    if (response.data.promocode == "true") {
      const yieldMap = response.data.albums.map(album => {
        return put(initOrderImagesTriggered(album.id));
      });
      yield all(yieldMap);
    }
    yield put(success(response.data));
  } catch (err) {
    yield put(failure(err.response));
  }
}

export default function* verifyPromocodeSaga() {
  yield takeLatest(CHECK_PROMOCODE_SUMBITTED, verifyPromocode);
}
