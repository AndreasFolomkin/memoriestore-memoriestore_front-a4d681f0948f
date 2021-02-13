import { put, takeLatest, call, delay, select } from "redux-saga/effects";

import { SEND_CONTACT_INFO_TRIGGERED } from "../types";
import {
  sendContactInfoRequest as request,
  sendContactInfoSuccess as success,
  sendContactInfoFailure as failure
} from "../actions/sendContactInfo";

import ApiWrapper from "../../utils/apiWrapper";

function* sendContactInfo(action) {
  const state = yield select();
  let values = state.form.contact_us.values || {};
  yield put(request());
  console.log("STATE IN SAGA", state);
  try {
    let response = yield call([ApiWrapper, ApiWrapper.postContactInfo], {
      email: values.email,
      phone: values.phone,
      name: values.name,
      text: values.comments
    });
    if (response.status === 200) {
      yield put(success(response.data));
    }

    if (response.status === 200) {
      window.location.href = "/thank_you_page?type=contact_us";
    }
  } catch (err) {
    yield put(failure(err.response));
    window.location.href = "/thank_you_page?type=contact_us";
  }
}

export default function* sendContactInfoSaga() {
  yield takeLatest(SEND_CONTACT_INFO_TRIGGERED, sendContactInfo);
}
