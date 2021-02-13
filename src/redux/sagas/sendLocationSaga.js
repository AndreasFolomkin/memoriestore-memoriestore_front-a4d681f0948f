import { put, takeLatest, call, delay } from "redux-saga/effects";

import { SEND_LOCATION_DATA_TRIGGERED } from "../types";
import {
  sendLocationRequest as request,
  sendLocationSuccess as success,
  sendLocationFailure as failure
} from "../actions/sendLocation";

import ApiWrapper from "../../utils/apiWrapper";

function* sendLocation(action) {
  yield put(request());
  // console.log("PAYLOAD", action.payload);
  try {
    let response = yield call([ApiWrapper, ApiWrapper.postLocation], {
      tariff: action.payload.tariffName,
      price: action.payload.albumPrice,
      location: window.location.pathname
    });
//    console.log("success");
    yield put(success(response.data));
  } catch (err) {
    console.log("err:");
    console.log(err);
    yield put(failure(err.response));
  }
}

export default function* sendLocationSaga() {
  yield takeLatest(SEND_LOCATION_DATA_TRIGGERED, sendLocation);
}
