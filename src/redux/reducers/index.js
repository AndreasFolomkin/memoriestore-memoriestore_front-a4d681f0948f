import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
//pages
import mainPageReducer from "./mainPageReducer";
import faqPageReducer from "./faqPageReducer";
import designerPortfolioPageReducer from "./designerPortfolioPageReducer";
import albumExamplePageReducer from "./albumExamplePageReducer";
import orderPageReducer from "./orderPageReducer";
import loginPageReducer from "./loginPageReducer";
import thankYouPageReducer from "./thankYouPageReducer";
import requestPageReducer from "./requestPageReducer";
import albumsReducer from "./albumsReducer";
import imagesReducer from "./imagesReducer";
import orderImagesReducer from "./orderImagesReducer";
import contactUsPageReducer from "./contactUsPageReducer";
import giftCardPageReducer from "./giftCardPageReducer";
import confirmPageReducer from "./confirmPageReducer";

//components
import flipperReducer from "./flipperReducer";
import sidebarReducer from "./sidebarReducer";
import headerFooterReducer from "./headerFooterReducer";
import markPlacedReducer from "./markPlacedReducer";
//int
import switchLocaleReducer from "./switchLocaleReducer";

//post
import checkPromocodeLoginReducer from "./checkPromocodeLoginReducer";
import sendCommentsReducer from "./sendCommentsReducer";
import sendSessionReducer from "./sendSessionReducer";
import sendLocationReducer from "./sendLocationReducer";
import sendContactInfoReducer from "./sendContactInfoReducer";
import sendOrderReducer from "./orderReducer";

import sendGiftCardReducer from "./sendGiftCardReducer";

const rootReducer = combineReducers({
  //pages
  mainPage: mainPageReducer,
  faqPage: faqPageReducer,
  portfolioPage: designerPortfolioPageReducer,
  albumExample: albumExamplePageReducer,
  albums: albumsReducer,
  images: imagesReducer,
  orderPage: orderPageReducer,
  loginPage: loginPageReducer,
  thankYouPage: thankYouPageReducer,
  requestPage: requestPageReducer,
  orderImages: orderImagesReducer,
  contactUsPage: contactUsPageReducer,
  giftCardPage: giftCardPageReducer,
  confirmPage: confirmPageReducer,

  //components
  flipper: flipperReducer,
  sidebar: sidebarReducer,
  headerFooter: headerFooterReducer,
  //form data
  form: formReducer,
  markPlaced: markPlacedReducer,
  //internazi data
  switchLocale: switchLocaleReducer,
  //post
  checkPromocodeLogin: checkPromocodeLoginReducer,
  sendComments: sendCommentsReducer,
  sendSession: sendSessionReducer,
  sendLocation: sendLocationReducer,
  sendOrder: sendOrderReducer,

  sendContactInfo: sendContactInfoReducer,
  sendGiftCard: sendGiftCardReducer
});

export default rootReducer;
