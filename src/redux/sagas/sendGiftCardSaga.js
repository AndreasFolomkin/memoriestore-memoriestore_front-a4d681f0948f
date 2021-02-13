import { put, takeLatest, call, delay, select } from "redux-saga/effects";

import { SEND_GIFT_CARD_TRIGGERED } from "../types";
import {
  sendGiftCardRequest as request,
  sendGiftCardSuccess as success,
  sendGiftCardFailure as failure
} from "../actions/sendGiftCard";

import ApiWrapper from "../../utils/apiWrapper";

function* sendGiftCard(action) {
  const state = yield select();
  let values = state.form.gift_card.values || {};
  yield put(request());

  try {
    let response = yield call([ApiWrapper, ApiWrapper.postGiftPage], {
      user_email: values.user_email,
      user_phone: values.user_phone,
      user_name: values.user_name,
      reciever_sum: values.gift_sum,
      reciever_email: values.reciever_email,
      reciever_name: values.reciever_name,
      text: values.gift_comments
    });
    if (response.status === 200) {
      yield put(success(response.data));
    }

    if (response.status === 200) {
      window.location.href = "/thank_you_page?type=gift_card";
    }
  } catch (err) {
    yield put(failure(err.response));
    window.location.href = "/thank_you_page?type=gift_card";
  }
}

export default function* sendGiftCardSaga() {
  yield takeLatest(SEND_GIFT_CARD_TRIGGERED, sendGiftCard);
}
