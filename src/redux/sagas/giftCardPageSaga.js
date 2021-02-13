import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";

import { GIFT_CARD_TRIGGERED } from "../types";
import {
  initGiftCardPageRequest as request,
  initGiftCardPageSuccess as success,
  initGiftCardPageFailure as failure
} from "../actions/initGiftcCardPage";

import ApiWrapper from "../../utils/apiWrapper";

function* giftCardPage(action) {
  yield put(request());
  try {
    let response = yield call(
      [ApiWrapper, ApiWrapper.getGiftPageI18N],
      // [ApiWrapper, ApiWrapper.getGiftPageI18N],
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

export default function* giftCardPageSaga() {
  yield takeLatest(GIFT_CARD_TRIGGERED, giftCardPage);
}
