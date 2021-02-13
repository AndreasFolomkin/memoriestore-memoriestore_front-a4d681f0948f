import { put, takeLatest, call, select, all } from "redux-saga/effects";
import { initImagesTriggered } from "../actions/initImage";

import { INIT_ALBUMS_TRIGGERED } from "../types";
import {
  initAlbumsRequest as request,
  initAlbumsSuccess as success,
  initAlbumsFailure as failure
} from "../actions/initAlbums";
import ApiWrapper from "../../utils/apiWrapper";

function* albumsPage(action) {
  yield put(request());
  try {
    let albums = yield call([ApiWrapper, ApiWrapper.getAlbums]);

    let authorsIds = albums.data.results.map(item => {
      return item.designer_id;
    });
//    console.log("authorsIds", authorsIds);

    let authorsRaw = yield all(
      authorsIds.map(ID =>
        call([ApiWrapper, ApiWrapper.getDesignerPortfolio], ID)
      )
    );

    let authors = authorsRaw.map(i => {
      return i.data.designer;
    });

    let response = {
      ...albums.data,
      authors
    };
    yield put(success(response));

    let albumIds = albums.data.results.map(item => {
      return item.id;
    });
    const yieldMap = albumIds.map(item => {
      return put(initImagesTriggered(item));
    });
    yield all(yieldMap);
  } catch (err) {
    console.log(err);
    yield put(failure(err.response));
  }
}

export default function* albumsSaga() {
  yield takeLatest(INIT_ALBUMS_TRIGGERED, albumsPage);
}
