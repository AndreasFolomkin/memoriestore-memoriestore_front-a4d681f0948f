import { put, takeLatest, call } from "redux-saga/effects";

import { SEND_READY_ORDER_TRIGGERED } from "../types";
import {
  sendOrderRequest as request,
  sendOrderSuccess as success,
  sendOrderFailure as failure
} from "../actions/sendOrder";

import ApiWrapper from "../../utils/apiWrapper";

function* sendOrder(action) {
  yield put(request());
  try {
    let response = yield call([ApiWrapper, ApiWrapper.postCofirmOrderPage], {
      order: action.payload.order
    });
    yield put(success(response.data));
    action.payload.path.push("/");
    window.history.state.state = {};
  } catch (err) {
    yield put(failure(err.response));
  }
}

export default function* sendOrderSaga() {
  yield takeLatest(SEND_READY_ORDER_TRIGGERED, sendOrder);
}
