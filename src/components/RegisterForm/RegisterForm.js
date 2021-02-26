import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import {
  customInput,
  customRadio,
  customTextArea
} from "../../componentsDumb/Fields/Fields";
import { required, isValidPhone, isValidEmail } from "../../validation";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import backico from "../../img/backbutton.svg";
import arrow from "../../img/arrowReq.png";

import MainPage from "../../pages/MainPage";
import HeaderFooter from "../HeaderFooter/HeaderFooter";
import Button from "../Button/Button";
import { reduxFormBlur } from "../../redux/actions/initReduxBlur";

import Logo from "../../img/mem.jpeg";
import LoginImg from "../../img/login.svg";

// import "./RegisterForm.css";
import "./RegisterFormEng.css"

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      checked:false,    
      isSubmitted: false,
      isConfirmed: false,
      isEnlarged: false,
      radioButtonsActivity: false
    };
  }

  handleChangeFunc = e => {
    this.setState({ value: e.target.value.toUpperCase() });
  };
  
  handleChangeCheckboxFunc = e => {
	  this.setState({checked:!this.state.checked})
 };

  changeRadioArea = () => {
    this.setState({ radioButtonsActivity: !this.state.radioButtonsActivity });
  };
  // sendAndRedirect = () => {
  //   this.setState({ isConfirmed: false }, () => {
  //     let { tariffName, albumPrice, familyTariff } = this.props;
  //     console.log(
  //       "FAMILY NAME",
  //       familyTariff.album_name,
  //       "FAMILY PRICE",
  //       familyTariff.price
  //     );
  //     console.log("TARIFF NAME", tariffName, "ALBUM NAME", albumPrice);
  //     this.props.sendSessionSubmitted(
  //       tariffName || familyTariff.album_name,
  //       albumPrice || familyTariff.price
  //     );
  //     if (this.state.isConfirmed == "confirmed") {
  //       this.props.history.push("/thank_you_page");
  //     } else if (this.state.isConfirmed == "denied") {
  //       this.props.history.push("/");
  //     }
  //   });
  // };

  toggleEnlargement = value => {
    this.setState({ isEnlarged: value }, () => {
      console.log("this, isEnlarged", this, this.state.isEnlarged);
    });
  };
  render() {
	  const {
      ff,
      handleSubmit,
      regData,
      familyTariff,
      headerFooterData
    } = this.props;
    let { tariffName, albumPrice, someInfo } = this.props;
    let checked = false;
//    console.log("someInfo", tariffName, albumPrice, "HELLO!!!", someInfo);
    let t = tariffName || familyTariff.album_name;
    let a = albumPrice || familyTariff.price;
    if (!tariffName && !albumPrice) {
      //Проверка на undefined
      tariffName = `${familyTariff.album_name}`;
      albumPrice = `${familyTariff.price}`;
    }
    this.howManyPhotos = [
      { text: regData.data.how_many.ALL, value: "ALL" },
      { text: regData.data.how_many.MOST, value: "MOST" },
      { text: regData.data.how_many.BEST, value: "BEST" },
      { text: regData.data.how_many.DES_TASTE, value: "DES_TASTE" }
    ];
    this.whichBackground = [
      { text: regData.data.background.MY, value: "MY" },
      { text: regData.data.background.MIXED, value: "MIXED" },
      { text: regData.data.background.ABSTR, value: "ABSTR" },
      { text: regData.data.background.DES_TASTE, value: "DES_TASTE" }
    ];
    this.photosOnPage = [
      { text: regData.data.how_photos_page.FEW, value: "FEW" },
      { text: regData.data.how_photos_page.MEDIUM, value: "MEDIUM" },
      { text: regData.data.how_photos_page.MANY, value: "MANY" },
      { text: regData.data.how_photos_page.DES_TASTE, value: "DES_TASTE" }
    ];
    this.framesForPhotos = [
      { text: regData.data.frames_for_photos.USE, value: "USE" },
      { text: regData.data.frames_for_photos.NOT_USE, value: "NOT_USE" },
      { text: regData.data.frames_for_photos.BLUR, value: "BLUR" },
      { text: regData.data.frames_for_photos.DES_TASTE, value: "DES_TASTE" }
    ];
    this.useDecorations = [
      { text: regData.data.decorations.YES, value: "YES" },
      { text: regData.data.decorations.SOME, value: "SOME" },
      { text: regData.data.decorations.NO, value: "NO" },
      { text: regData.data.decorations.DES_TASTE, value: "DES_TASTE" }
    ];

    if (this.state.isConfirmed) {
      return (
        <div className="first-page">
          <HeaderFooter
            buttonText={headerFooterData.header_button_text}
            faq={headerFooterData.faq}
            albumExamples={headerFooterData.album_examples}
            forDesigner={headerFooterData.for_designer}
            className="header-memoriestor"
          >
            <Link to={`/login_page`}>
              <label className="button-entrance">
                <img src={LoginImg} alt="memoriestore" />
                <p>{headerFooterData.log_in}</p>
              </label>
            </Link>
            <Link to={`/`}>
              <img src={Logo} className="header-logo" alt="memoriestore" />
            </Link>
          </HeaderFooter>
          <div
            className="back-button-conf t"
            onClick={() => this.setState({ isConfirmed: false })}
          >
            <img src={backico} alt="memoriestore" />
            <p>{regData.data.back_button}</p>
          </div>
          <br />
          <h1 className="first-h">{regData.data.thank_you_header}</h1>
          <p className="thank-you-for-order">{regData.data.info_about_order}</p>
          <Link className="thank-you-back" to={`/`}>
            {regData.data.main_page_button}
          </Link>
        </div>
      );
    }

    if (!this.state.isSubmitted) {
      return (
        <div className="second-pa ge">
          {/*<HeaderFooter*/}
          {/*  buttonText={headerFooterData.header_button_text}*/}
          {/*  faq={headerFooterData.faq}*/}
          {/*  albumExamples={headerFooterData.album_examples}*/}
          {/*  forDesigner={headerFooterData.for_designer}*/}
          {/*  gift_cards={headerFooterData.gift_cards}*/}
          {/*  who_we_are={headerFooterData.who_we_are}*/}
          {/*  className="header-memoriestor"*/}
          {/*>*/}
          {/*  <Link to={`/login_page`}>*/}
          {/*    <label className="button-entrance">*/}
          {/*      <img src={LoginImg} alt="memoriestore" />*/}
          {/*      <p>{headerFooterData.log_in} </p>*/}
          {/*    </label>*/}
          {/*  </Link>*/}
          {/*  <Link to={`/`}>*/}
          {/*    <img src={Logo} className="header-logo" alt="memoriestore" />*/}
          {/*  </Link>*/}
          {/*</HeaderFooter>*/}
          <form
            onSubmit={e => {
              e.preventDefault();
              this.setState({ isSubmitted: true });
              this.props.onSubmit();
            }}
          >
            <Route exact path="/" component={MainPage} />
            <Link to={`/`} className="back-button">
              <img src={backico} alt="memoriestore" />{" "}
              <p>{regData.data.back_button}<h1>Klacni menya tyt</h1></p>
            </Link>
            <h1 className="order-header">{regData.data.order_header}</h1>

            <div className="order-descr">
              <div>
                <p>{regData.data.ordering}</p>
                <p className="choosen-tariff">"{tariffName}"</p>
              </div>
              <div>
                <p>{regData.data.at_a_price}</p>
                <p className="choosen-tariff">{albumPrice}</p>
              </div>
            </div>
            <h4 className="reg-form-text">{regData.data.extra_mini_header}</h4>
            <div className="first-row">
              <Field
                className="input"
                name="cloudpass"
                component={customInput}
                type="text"
                //validate={[required]}
                /* placeholder={`סיסמת ענן`}  */
                placeholder={regData.data.cloudpass_placeholder}
                onChange={this.handleChangeFunc}
                onBlur={e => {
                  this.props.reduxFormBlur(t, a);
                }}
              />
              <Field
                className="input"
                name="linkonalbum"
                component={customInput}
                type="text"
                validate={[required]}
                placeholder={regData.data.album_name_placeholder}
                onChange={this.handleChangeFunc}
                onBlur={e => {
                  this.props.reduxFormBlur(t, a);
                }}
              />
            </div>
            <div className="first-row">
              <Field
                className="input"
                name="firstname"
                component={customInput}
                type="text"
                validate={[required]}
                placeholder={regData.data.phone_placeholder}
                onChange={this.handleChangeFunc}
                onBlur={e => {
                  this.props.reduxFormBlur(t, a);
                }}
              />
              <Field
                className="input"
                name="phone"
                component={customInput}
                type="number"
                validate={[required, isValidPhone]}
                placeholder={regData.data.name_placeholder}
                onChange={this.handleChangeFunc}
                onBlur={e => {
                  this.props.reduxFormBlur(t, a);
                }}
              />
            </div>
            <div className="secound-row">
              <Field
                className="input"
                name="albumname"
                component={customInput}
                type="text"
                validate={[required]}
                placeholder={regData.data.link_placeholder}
                onChange={this.handleChangeFunc}
                onBlur={e => {
                  this.props.reduxFormBlur(t, a);
                }}
              />
              <Field
                className="input"
                name="email"
                component={customInput}
                type="email"
                validate={[required, isValidEmail]}
                // placeholder={`דוא"ל`}
                placeholder={regData.data.email_placeholder}
                onChange={this.handleChangeFunc}
                onBlur={e => {
                  this.props.reduxFormBlur(t, a);
                }}
              />
            </div>
            <div
              className="radio-activity-container"
              onClick={this.changeRadioArea}
            >
              <p className="radio-area-header">{regData.data.answer}</p>
              <img
                alt="memoriestore"
                src={arrow}
                className={
                  !this.state.radioButtonsActivity ? "down-arrow" : "top-arrow"
                }
              />
            </div>

            <div
              className={
                !this.state.radioButtonsActivity
                  ? "radio-area-hide"
                  : "radio-area"
              }
            >
              {/* <label className="privacy-policy">
              <Field
                name="policy"
                component={customInput}
                validate={[requiredCheck]}
                type="checkbox"
                onBlur={e => {
                  this.props.reduxFormBlur();
                }}
              />
              <span>{regData.data.private_policy}</span>
            </label> */}
              <div className="first-button-wrapper">
                {/* <Route
                path="/photo_album_examples/"
                component={PhotoAlbumExamples}
              /> */}
                <Link
                  className="link-to-examples"
                  to={{
                    pathname: `/photo_album_examples/`,
                    state: {
                      checkout: true
                    }
                  }}
                >
                  {regData.data.see_examples_button}
                </Link>
                {/* {ff.register && !ff.register.syncErrors ? (
                <Button buttonName={regData.data.order_button} type="submit" />
              ) : (
                <Button
                  buttonName={regData.data.order_button}
                  disabled
                  className="disabled-order-button"
                  validate={[requiredCheck]}
                />
              )} */}
              </div>

              <Field
                className="radiobutt"
                name="howManyPhotos"
                component={customRadio}
                type="text"
                radioID="howMany"
                label={`${regData.data.how_many.name}`}
                values={this.howManyPhotos}
                validate={[required]}
                checkedValue={"DES_TASTE"}
              />
              <Field
                className="radiobutt"
                name="whichBackground"
                component={customRadio}
                type="text"
                radioID="background"
                label={`${regData.data.background.name}`}
                values={this.whichBackground}
                validate={[required]}
                checkedValue={"DES_TASTE"}
              />
              <Field
                className="radiobutt"
                name="photosOnPage"
                component={customRadio}
                type="text"
                radioID="photosOnPage"
                label={`${regData.data.how_photos_page.name}`}
                values={this.photosOnPage}
                validate={[required]}
                checkedValue={"DES_TASTE"}
              />
              <Field
                className="radiobutt"
                name="framesForPhotos"
                component={customRadio}
                type="text"
                radioID="framesForPhotos"
                label={`${regData.data.frames_for_photos.name}`}
                values={this.framesForPhotos}
                validate={[required]}
                checkedValue={"DES_TASTE"}
              />
              <Field
                className="radiobutt"
                name="useDecorations"
                component={customRadio}
                type="text"
                radioID="decoration"
                label={`${regData.data.decorations.name}`}
                values={this.useDecorations}
                validate={[required]}
                checkedValue={"DES_TASTE"}
              />
            </div>
            <Field
                className="input-long text-area"
                name="comments"
                component={customTextArea}
                type="text"
                //validate={[required]}
                placeholder={regData.data.requet_placeholder}
                onChange={this.handleChangeFunc}
                onBlur={e => {
                    this.props.reduxFormBlur(t, a);
                }}
            />
              
            <div className="conditions"><input className="conditions-check" checked={this.state.checked} onChange={this.handleChangeCheckboxFunc} type="checkbox" />
            קראתי ואני מסכים  
            <Link target="_blank" to={`/condition_page`}>לתנאי השימוש</Link> 
            ומדיניות הפרטיות של האתר.</div>
              
            <div className="second-button-wrapper">
              <Link
                className="link-to-examples"
                to={{
                  pathname: `/photo_album_examples/`,
                  state: {
                    checkout: true
                  }
                }}
              >
                {regData.data.see_examples_button}
              </Link>
             
              {ff.register && this.state.checked && !ff.register.syncErrors ? (
                <Button buttonName={regData.data.order_button} type="submit" />
              ) : (
                <Button
                  buttonName={regData.data.order_button}
                  disabled
                  type="submit"
                  className={"disabled-order-button"}
                />
              )}
            </div>
          </form>
          {/* <HeaderFooter
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
          </HeaderFooter> */}
        </div>
      );
    } else {
      return (
        <div className="third-page">
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
                <img src={LoginImg} alt="memoriestore" />
                <p>{headerFooterData.log_in}</p>
              </label>
            </Link>
            <Link to={`/`}>
              <img src={Logo} className="header-logo" alt="memoriestore" />
            </Link>
          </HeaderFooter>
          <div className="third-container">
            <div
              className="back-button-conf"
              onClick={() => this.setState({ isSubmitted: false })}
            >
              <img src={backico} alt="memoriestore" />{" "}
              <p>{regData.data.back_button}</p>
            </div>
            <h1 className="confirm-header">{regData.data.confirm_header}</h1>
            <p className="check-privacy">{regData.data.check_order}</p>
            <Button
              onClick={() => this.setState({ isSubmitted: false })}
              buttonName={regData.data.to_fix_button}
            />
            <br />
            <div className="disabled-first-row">
              <input
                className="input"
                disabled
                value={this.props.ff.register.values.cloudpass}
              />
              <input
                className="input"
                disabled
                value={this.props.ff.register.values.linkonalbum}
              />
            </div>
            <div className="disabled-first-row">
              <input
                className="input"
                disabled
                value={this.props.ff.register.values.firstname}
              />
              <input
                className="input"
                disabled
                value={this.props.ff.register.values.phone}
              />
            </div>
            <div className="disabled-second-row">
              <input
                className="input"
                disabled
                value={this.props.ff.register.values.albumname}
              />
              <input
                className="input"
                disabled
                value={this.props.ff.register.values.email}
              />
            </div>
            <div className="disabled-third-row">
              <textarea
                className="input-long text-area"
                disabled
                value={this.props.ff.register.values.comments}
              />
            </div>
            <div className="container-for-disabled">
              <div className="confirm-first-disabled">
                <div className="checked-radio-button">
                  <p>{regData.data.how_many.name}</p>
                  <label className="disabled-label">
                    {
                      this.howManyPhotos.find(el => {
                        return (
                          this.props.ff.register.values.howManyPhotos ===
                          el.value
                        );
                        //Сравнение элементов. Возвращает тот элемент, которому первому вернёт true
                      }).text
                    }
                    <input className="disabled-iput" type="radio" checked />
                  </label>
                </div>
                <div className="checked-radio-button">
                  <p>{regData.data.background.name}</p>
                  <label className="disabled-label">
                    {
                      this.whichBackground.find(el => {
                        return (
                          this.props.ff.register.values.whichBackground ===
                          el.value
                        );
                      }).text
                    }
                    <input className="disabled-iput" type="radio" checked />
                  </label>
                </div>
              </div>
              <div className="confirm-second-disabled">
                <div className="checked-radio-button">
                  <p>{regData.data.how_photos_page.name}</p>
                  <label className="disabled-label">
                    {
                      this.photosOnPage.find(el => {
                        return (
                          this.props.ff.register.values.photosOnPage === el.value
                        );
                      }).text
                    }
                    <input className="disabled-iput" type="radio" checked />
                  </label>
                </div>
                <div className="checked-radio-button">
                  <p>{regData.data.frames_for_photos.name}</p>
                  <label className="disabled-label">
                    {
                      this.framesForPhotos.find(el => {
                        return (
                          this.props.ff.register.values.framesForPhotos ===
                          el.value
                        );
                      }).text
                    }
                    <input className="disabled-iput" type="radio" checked />
                  </label>
                </div>
              </div>
              <div className="confirm-third-disabled">
                <div className="checked-radio-button">
                  <p>{regData.data.decorations.name}</p>
                  <label className="disabled-label">
                    {
                      this.useDecorations.find(el => {
                        return (
                          this.props.ff.register.values.useDecorations ===
                          el.value
                        );
                      }).text
                    }
                    <input className="disabled-iput" type="radio" checked />
                  </label>
                </div>
              </div>
            </div>
            <br />
            

            <Button
              buttonName={regData.data.confirm_button}
              onClick={() => {
                sessionStorage.setItem("is_order_confirmed", "true");
                this.setState({ isConfirmed: true }, () => {
                  this.props.reduxFormBlur(t, a);
                });
              }}
            />
          </div>
        </div>
      );
    }
  }
}

RegisterForm = reduxForm({
  form: "register"
})(RegisterForm);

const mapStateToProps = state => ({
  ff: state.form,
  initialValues: {
    howManyPhotos: "DES_TASTE",
    whichBackground: "DES_TASTE",
    photosOnPage: "DES_TASTE",
    framesForPhotos: "DES_TASTE",
    useDecorations: "DES_TASTE"
  },
  headerFooterData: state.headerFooter.data
});
const mapDispatchToProps = dispatch => ({
  reduxFormBlur(t, a) {
    dispatch(reduxFormBlur(t, a));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
