import axios from "axios";

// const host = "http://localhost:8000/";
const host = "https://memoriestore.com/";
const apiWrapper = (method = "get", url = "", body = {}) => {
//  console.log("LINK", `${host}${url}`);
  if (method === "get") {
    return axios.get(`${host}${url}`);
  } else if (method === "post") {
    return axios.post(`${host}${url}`, body);
  } else return "Incorrect HTTP-method";
};
export default class ApiWrapper {
  //pages connection

  static postLoginPage = body => {
    return apiWrapper("post", `design/check_promocode/`, body);
  };

  static postOrderPage = body => {
    return apiWrapper("post", `design/order_confirm/`, body);
  };

  static postCofirmOrderPage = body => {
    return apiWrapper("post", `design/handle_confirmation_info/`, body);
  };

  static postLocation = body => {
    return apiWrapper("post", `design/send_location_email/`, body);
  };
  static postGiftPage = body => {
    return apiWrapper("post", `design/contact/`, body);
  };

  static postContactInfo = body => {
    return apiWrapper("post", `design/send_contact/`, body);
  };

  static postSendSessionPage = body => {
    return apiWrapper("post", `design/session/`, body);
  };
  //get
  static getMainPageI18N = (locale = "he_il") => {
    return apiWrapper("get", `design/i18n/main_page/${locale}/`);
  };

  static getGiftPageI18N = (locale = "he_il") => {
    return apiWrapper("get", `design/i18n/gift_cards/${locale}/`);
  };

  static getContactUsPageI18N = (locale = "he_il") => {
    return apiWrapper("get", `design/i18n/who_we_are/${locale}/`);
  };

  static getFaqPageI18N = (locale = "he_il") => {
    return apiWrapper("get", `design/i18n/faq/${locale}/`);
  };
  static getConfirmPageI18N = (locale = "he_il") => {
    return apiWrapper("get", `design/i18n/confirmation_page/${locale}/`);
  };

  static getRequestPageI18N = (locale = "he_il") => {
    return apiWrapper("get", `design/i18n/request_page/${locale}/`);
  };

  static getDesignerPortfolio = designerID => {
    return apiWrapper("get", `design/designer_portfolio/${designerID}`);
  };

  static getDesignerPortfolioAlbums = designerID => {
    return apiWrapper("get", `design/designer_portfolio_albums/${designerID}`);
  };

  static getDesignerPortfolioAlbumsImages = designerID => {
    return apiWrapper(
      "get",
      `design/designer_portfolio_album_images/${designerID}`
    );
  };

  static getPhotoAlbumExamplesPageI18N = (locale = "he_il") => {
    return apiWrapper("get", `design/i18n/photo_album_examples/${locale}/`);
  };

  static getAlbums = (next_link = `design/photo_album_examples`) => {
    return apiWrapper("get", next_link); //`design/photo_album_examples`);
  };

  static getImage = id => {
    return apiWrapper("get", `design/photo_album_example_images/${id}`);
  };

  static getOrderImage = id => {
    return apiWrapper("get", `design/order_album_example_images/${id}`);
  };

  static getLoginPageI18N = (locale = "he_il") => {
    return apiWrapper("get", `design/i18n/login_page/${locale}/`);
  };

  static getChooseAlbumPageI18N = (locale = "he_il") => {
    return apiWrapper("get", `design/i18n/choose_album_page/${locale}/`);
  };

  static getThankYouPageI18N = (locale = "he_il") => {
    return apiWrapper("get", `design/i18n/thank_you/${locale}/`);
  };

  //components connection

  static getSidebarI18N = (locale = "he_il") => {
    return apiWrapper("get", `design/i18n/sidebar/${locale}/`);
  };

  static getHeaderFooterI18N = (locale = "he_il") => {
    return apiWrapper("get", `design/i18n/header_footer/${locale}/`);
  };
}
