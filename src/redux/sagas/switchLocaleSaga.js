import { put, takeLatest, call, delay } from "redux-saga/effects";

import { SWITCH_LOCALE } from "../types";

function* switchLocale(action) {
  if (action.payload.locale == "he_il") {
    localStorage.setItem("locale", "he_il");
    yield window.location.reload();
  } else if (action.payload.locale == "en_US") {
    localStorage.setItem("locale", "en_US");
    yield window.location.reload();
  }
}

export default function* switchLocaleSaga() {
  yield takeLatest(SWITCH_LOCALE, switchLocale);
}
