import { put, takeLatest, call, all } from "redux-saga/effects";

import { INIT_DESIGNERPORTFOLIOPAGE_TRIGGERED } from "../types";
import {
  initDesignerPortfolioPageRequest as request,
  initDesignerPortfolioPageSuccess as success,
  initDesignerPortfolioPageFailure as failure
} from "../actions/initDesignerPortfolioPage";

import ApiWrapper from "../../utils/apiWrapper";

function* designerPortfolioPage(action) {
  yield put(request());
  try {
    let response = yield all([
      call(
        [ApiWrapper, ApiWrapper.getDesignerPortfolio],
        action.payload.designerID
      ),
      call(
        [ApiWrapper, ApiWrapper.getDesignerPortfolioAlbums],
        action.payload.designerID
      )
    ]);

    let albumsID = response[1].data.map(item => {
      return item.id;
    });

    let albumsImages = yield all(
      albumsID.map(ID =>
        call([ApiWrapper, ApiWrapper.getDesignerPortfolioAlbumsImages], ID)
      )
    );

    let images = albumsImages.map(el => {
      return [...el.data];
    });

    let albums = {};

    for (let i = 0; i < images.length; i++) {
      albums = {
        ...albums,
        [`${albumsID[i]}`]: albumsImages[i].data
      };
    }
    console.log("albums", albums);

    let designerInfo = {
      designer: response[0].data.designer,
      designerAlbums: response[1].data,
      designerAlbumsImages: images
    };
    yield put(success(designerInfo));
  } catch (err) {
    yield put(failure(err.response));
  }
}

export default function* designerPortfolioPageSaga() {
  yield takeLatest(INIT_DESIGNERPORTFOLIOPAGE_TRIGGERED, designerPortfolioPage);
}
