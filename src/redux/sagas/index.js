import { all } from "redux-saga/effects";

//pages
import watchMainPageSaga from "./mainPageSaga";
import watchDesignerPortfolioPageSaga from "./designerPortfolioPageSaga";
import watchFaqPageSaga from "./faqPageSaga";
import watchAlbumExamplePageSaga from "./albumExamplePageSaga";
import watchOrderPageSaga from "./orderPageSaga";
import watchLoginPageSaga from "./loginPageSaga";
import watchThankYouPageSaga from "./thankYouPageSaga";
import watchRequestPageSaga from "./requestPageSaga";
import watchAlbumsSaga from "./albumsSaga";
import watchImagesSaga from "./imagesSaga";
import watchOrderImagesSaga from "./orderImagesSaga";
import watchContactUsPageSaga from "./contactUsPageSaga";
import watchGiftCardPageSaga from "./giftCardPageSaga";
import watchConfirmPageSaga from "./confirmPageSaga";

//components
import watchFlipperSaga from "./flipperSaga";
import watchSidebarSaga from "./sidebarSaga";
import watchHeaderFooterSaga from "./headerFooterSaga";

//post
import watchVerifyPromocodeSaga from "./verifyPromocodeSaga";
import watchSendCommentsSaga from "./sendCommentsSaga";
import watchSendSessionSaga from "./sendSessionSaga";
import WatchReduxFormBlur from "./reduxFormBlurSaga";
import watchSendLocationSaga from "./sendLocationSaga";
import watchSendContactInfoSaga from "./sendContactInfoSaga";
import watchSendGiftCardSaga from "./sendGiftCardSaga";
import watchSendOrderSaga from "./orderSaga";

//internazi
import watchSwitchLocaleSaga from "./switchLocaleSaga";

export default function* rootSaga() {
  yield all([
    //pages
    watchMainPageSaga(),
    watchDesignerPortfolioPageSaga(),
    watchFaqPageSaga(),
    watchAlbumExamplePageSaga(),
    watchAlbumsSaga(),
    watchImagesSaga(),
    watchOrderPageSaga(),
    watchLoginPageSaga(),
    watchThankYouPageSaga(),
    watchRequestPageSaga(),
    watchOrderImagesSaga(),
    watchContactUsPageSaga(),
    watchGiftCardPageSaga(),
    watchConfirmPageSaga(),
    //components
    watchFlipperSaga(),
    watchSidebarSaga(),
    watchHeaderFooterSaga(),
    //post
    watchVerifyPromocodeSaga(),
    watchSendCommentsSaga(),
    watchSendSessionSaga(),
    watchSendLocationSaga(),

    watchSendContactInfoSaga(),
    watchSendGiftCardSaga(),
    watchSendOrderSaga(),

    //internazi
    watchSwitchLocaleSaga(),
    WatchReduxFormBlur()
  ]);
}
