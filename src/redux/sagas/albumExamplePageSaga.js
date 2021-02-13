import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";

import { INIT_ALBUMEXAMPLESPAGE_TRIGGERED } from "../types";
import {
  initAlbumExamplePageRequest as request,
  initAlbumExamplePageSuccess as success,
  initAlbumExamplePageFailure as failure
} from "../actions/initAlbumExamplePage";

import ApiWrapper from "../../utils/apiWrapper";

function* albumExamplePage(action) {
  yield put(request());
  try {
    let response = yield call(
      [ApiWrapper, ApiWrapper.getPhotoAlbumExamplesPageI18N],
      action.payload.locale
    );
    yield put(success(response.data));
  } catch (err) {
    yield put(failure(err.response));
  }
}

export default function* albumExamplePageSaga() {
  yield takeLatest(INIT_ALBUMEXAMPLESPAGE_TRIGGERED, albumExamplePage);
}
