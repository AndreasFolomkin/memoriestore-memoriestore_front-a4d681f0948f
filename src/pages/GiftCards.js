import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import { initGiftCardPageTriggered } from "../redux/actions/initGiftcCardPage";
import { initFaqPageTriggered } from "../redux/actions/initFaqPage";
import { sendLocationTriggered } from "../redux/actions/sendLocation";
import { sendGiftCardTriggered } from "../redux/actions/sendGiftCard";
import {
  customInput,
  customTextArea,
  customSelect
} from "../componentsDumb/Fields/Fields";
import {
  required,
  isValidPhone,
  isValidEmail,
  requiredCheck
} from "../validation";

import HeaderFooter from "../components/HeaderFooter/HeaderFooter";
import Button from "../components/Button/Button";
import Preloader from "../componentsDumb/Preloader/Preloader";
import "./styles/GiftCards.css";

import giftImg from "../img/gift-card-page.jpg";
import Logo from "../img/mem.jpeg";
import LoginImg from "../img/login.svg";

class GiftCards extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.routeChange = this.routeChange.bind(this);
  }
  componentDidMount() {
    this.props.initGiftCardPageTriggered(
      localStorage.getItem("locale") || undefined
    );
    this.props.sendLocationTriggered();

    // this.props.initGiftCardPageTriggered();
  }
  routeChange() {
    let path = `/who_we_are`;
    this.props.history.push(path);
  }
  handleChange = e => {
    console.log("e", e.target);
    this.setState({ [`${e.target.name}`]: e.target.value });
  };

  onSubmit = () => {
    this.props.sendGiftCardTriggered();
  };

  render() {
    // console.log("%cthis.state", "color:yellow", this.props);
    // this.setState({ path: window.location.pathname });
    // console.log("THIS", this.state.path);
    // console.log("HHH", window.location.pathname);
    const {
      isLoading,
      headerFooterData,
      giftCardData,
      form,
      formData
    } = this.props;
    console.log("giftCardData", giftCardData);
    if (isLoading) {
      return <Preloader />; //ПЕРЕДЕЛАТЬ ЭТО НА КОМПОНЕНТ (СДЕЛАТЬ КОМПОНЕНТОМ)
    }
    console.log("this.props.location.query", this.props.location.query);
    return (
      <div>
        <HeaderFooter
          buttonText={headerFooterData.header_button_text}
          faq={headerFooterData.faq}
          albumExamples={headerFooterData.album_examples}
          forDesigner={headerFooterData.for_designer}
          gift_cards={headerFooterData.gift_cards}
          who_we_are={headerFooterData.who_we_are}
          className="header-memoriestor"
        >
          <Link to={`/login_page`}>
            <label className="button-entrance">
              <img src={LoginImg} />
              <p>{headerFooterData.log_in}</p>
            </label>
          </Link>
          <Link to={`/`}>
            <img src={Logo} className="header-logo" />
          </Link>
        </HeaderFooter>
        <div className="gift-info-wrapper">
          {/* <h1>שובר מתנה</h1> */}
          <h1>{giftCardData.header}</h1>
          <div className="gift-info">
            <div className="gift-text">
              {/* <p>?מחפשים מתנה מקורית לבר/בת מצווה</p> */}
              <p>{giftCardData.question_one}</p>
              {/* <p>?ליום הולדת או להולדת ילד</p> */}
              <p>{giftCardData.question_two}</p>
              {/* <p>?ליום נישואים של ההורים</p> */}
              <p>{giftCardData.question_three}</p>
              {/* <p dir="rtl">
                אתם יכולים לתת לקרובים שלכם מתנה מגניבה ומקורית - אלבום תמונות
                שעוצב במיוחד עבורם ושהם בטוח יאהבו!
              </p> */}
              <p dir="rtl">{giftCardData.question_fout}</p>
            </div>
            <img src={giftImg} />
          </div>
        </div>
        <div className="gift-form-wrapper">
          <form
            onSubmit={e => {
              e.preventDefault();
              this.onSubmit();
            }}
          >
            <div className="fields-container-user">
              <Field
                className="input"
                name="user_email"
                component={customInput}
                type="email"
                validate={[required, isValidEmail]}
                /* placeholder="E-dwadwawad" */
                placeholder={giftCardData.email}
              />
              <Field
                className="input"
                name="user_phone"
                component={customInput}
                type="number"
                validate={[required, isValidPhone]}
                /* placeholder="Phone" */
                placeholder={giftCardData.phone}
              />
              <Field
                className="input"
                name="user_name"
                component={customInput}
                type="text"
                validate={[required]}
                /* placeholder="Name" */
                placeholder={giftCardData.name}
              />
            </div>
            <div className="fields-container-reciever">
              {/* <Field className="input sel" name="gift_sum" component="select">
                <option value="399">399</option>
                <option value="549">549</option>
              </Field> */}
              <Field
                className="input sel"
                name="gift_sum"
                component={customSelect}
                validate={[required]}
                visibleValue={giftCardData.price_is_not_selected}
              />
              <Field
                className="input"
                name="reciever_email"
                component={customInput}
                type="email"
                validate={[required, isValidEmail]}
                placeholder={giftCardData.reciever_email}
              />
              <Field
                className="input"
                name="reciever_name"
                component={customInput}
                type="text"
                validate={[required]}
                placeholder={giftCardData.reciever_name}
              />
            </div>
            <div className="submit-and-message">
              {formData.gift_card && !formData.gift_card.syncErrors ? (
                <Button type="submit" buttonName={giftCardData.contact_us} />
              ) : (
                <Button
                  type="submit"
                  disabled
                  className="disabled-order-button"
                  buttonName={giftCardData.contact_us}
                />
              )}

              <Field
                className="input-long text-area"
                name="gift_comments"
                component={customTextArea}
                type="text"
                placeholder={giftCardData.whrite_your_mess}
              />
            </div>
          </form>
        </div>
        <HeaderFooter
          className="footer-memoriestor"
          description={headerFooterData.description}
          faq={headerFooterData.faq}
          albumExamples={headerFooterData.album_examples}
          forDesigner={headerFooterData.for_designer}
        >
          <Button
            buttonName={headerFooterData.footer_button_text}
            onClick={this.routeChange}
          />
        </HeaderFooter>
      </div>
    );
  }
}

GiftCards = reduxForm({
  form: "gift_card"
})(GiftCards);

const mapStateToProps = state => ({
  formData: state.form,
  giftCardData: state.giftCardPage.data,
  isLoading: state.giftCardPage.isLoading,
  headerFooterData: state.headerFooter.data,
  locale: state.switchLocale.locale
});

const mapDispatchToProps = dispatch => ({
  initGiftCardPageTriggered() {
    dispatch(initGiftCardPageTriggered());
  },
  initFaqPageTriggered(locale) {
    dispatch(initFaqPageTriggered(locale));
  },
  sendLocationTriggered() {
    dispatch(sendLocationTriggered());
  },
  sendGiftCardTriggered() {
    dispatch(sendGiftCardTriggered());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftCards);
