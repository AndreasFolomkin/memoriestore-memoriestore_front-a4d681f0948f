import { put, takeLatest, call } from "redux-saga/effects";

import { SEND_COMMENTS_SUMBITTED } from "../types";
import {
  sendCommentsRequest as request,
  sendCommentsSuccess as success,
  sendCommentsFailure as failure
} from "../actions/sendComments";

import ApiWrapper from "../../utils/apiWrapper";

function* sendComments(action) {
  console.log("actionpayload", action.payload);
  yield put(request());
  try {
    let response = yield call([ApiWrapper, ApiWrapper.postOrderPage], {
      comments: action.payload
    });
    yield put(success(response.data));
  } catch (err) {
    yield put(failure(err.response));
  }
}

export default function* sendCommentsSaga() {
  yield takeLatest(SEND_COMMENTS_SUMBITTED, sendComments);
}
