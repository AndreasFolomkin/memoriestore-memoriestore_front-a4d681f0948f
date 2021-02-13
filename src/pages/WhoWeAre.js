import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { BrowserRouter as Route, Link } from "react-router-dom";

import { sendLocationTriggered } from "../redux/actions/sendLocation";
import { sendContactInfoTriggered } from "../redux/actions/sendContactInfo";
import { initContactUsPageTriggered } from "../redux/actions/initContactUs";
import { customInput, customTextArea } from "../componentsDumb/Fields/Fields";
import { required, isValidPhone, isValidEmail } from "../validation";
import HeaderFooter from "../components/HeaderFooter/HeaderFooter";
import Button from "../components/Button/Button";
import Preloader from "../componentsDumb/Preloader/Preloader";
import RequestPage from "../pages/RequestPage";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonBoot from 'react-bootstrap/Button';

import LoginImg from "../img/login.svg";
import Foto from "../img/foto.PNG";
import Logo from "../img/mem.jpeg";

import "./styles/WhoWeAre.css";

class WhoWeAre extends Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
  }
  componentDidMount() {
    this.props.initContactUsPageTriggered(
      localStorage.getItem("locale") || undefined
    );
    this.props.sendLocationTriggered();
  }

  handleChange = e => {
    this.setState({ value: e.target.value.toUpperCase() });
  };

  routeChange() {
    let path = `/who_we_are`;
    this.props.history.push(path);
  }
  onSubmit = () => {
    this.props.sendContactInfoTriggered();
  };
  render() {
    const { isLoading, headerFooterData, formData, contactUsDate } = this.props;
    if (isLoading) {
      return <Preloader />;
    }
    // console.log(this.props.location.state, "WHOWE");
    return (
      <div>
        <HeaderFooter
          buttonText={headerFooterData.header_button_text}
          faq={headerFooterData.faq}
          albumExamples={headerFooterData.album_examples}
          gift_cards={headerFooterData.gift_cards}
          who_we_are={headerFooterData.who_we_are}
          forDesigner={headerFooterData.for_designer}
          className="header-memoriestor"
        >
          <Link to={`/login_page`}>
            <label className="button-entrance">
              <img src={LoginImg} alt="memoriestore" />
              <p>{headerFooterData.log_in}</p>
            </label>
          </Link>{" "}
          <Link to={`/`}>
            <img src={Logo} className="header-logo" alt="memoriestore" />
          </Link>
        </HeaderFooter>
        <h1 className="who-header">מי אנחנו</h1>
        <div className="container-for-who">
          <div className="who-we-are">
            <img src={Foto} className="mobile-foto" alt="memoriestore" />
            <p>{contactUsDate.main_text}</p>

            <p>{contactUsDate.text_one}</p>

            <p>{contactUsDate.text_two}</p>

            <div>
              <span> {contactUsDate.mail} </span>
              {contactUsDate.mail_text}
              <span> {contactUsDate.phone_number} </span>
              {contactUsDate.phone_text}
            </div>
          </div>
          <img src={Foto} className="desktop-foto" alt="memoriestore" />
        </div>
    	  <Row className="btn-container padd">
          <Route path="/request_page" component={RequestPage} />
          <Link to={`/request_page`}>
            <ButtonBoot className="main_color_button_back">להזמנה</ButtonBoot>
          </Link>
          </Row>
        <p className="single-p">{contactUsDate.mini_header}</p>
        <div className="contact-form-container">
          <form
            onSubmit={e => {
              e.preventDefault();
              this.onSubmit();
            }}
          >
            <div className="fields-container">
              <Field
                className="input"
                name="email"
                component={customInput}
                type="email"
                validate={[required, isValidEmail]}
                placeholder={contactUsDate.email}
                onChange={this.handleChange}
              />
              <Field
                className="input"
                name="phone"
                component={customInput}
                type="number"
                validate={[required, isValidPhone]}
                placeholder={contactUsDate.phone}
                onChange={this.handleChange}
              />
              <Field
                className="input"
                name="name"
                component={customInput}
                type="text"
                validate={[required]}
                placeholder={contactUsDate.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="contact-and-message">
              {formData.contact_us && !formData.contact_us.syncErrors ? (
                <Button type="submit" buttonName={contactUsDate.contact_us} />
              ) : (
                <Button
                  type="submit"
                  disabled
                  className="disabled-order-button"
                  buttonName={contactUsDate.contact_us}
                />
              )}
              <Field
                className="input-long text-area"
                name="comments"
                component={customTextArea}
                type="text"
                placeholder={contactUsDate.whrite_your_mess}
                onChange={this.handleChange}
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
          gift_cards={headerFooterData.gift_cards}
          who_we_are={headerFooterData.who_we_are}        
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

WhoWeAre = reduxForm({
  form: "contact_us"
})(WhoWeAre);

const mapStateToProps = state => ({
  formData: state.form,
  contactUsDate: state.contactUsPage.data,
  isLoading: state.contactUsPage.isLoading,
  headerFooterData: state.headerFooter.data,
  locale: state.switchLocale.locale
});

const mapDispatchToProps = dispatch => ({
  sendLocationTriggered() {
    dispatch(sendLocationTriggered());
  },
  sendContactInfoTriggered() {
    dispatch(sendContactInfoTriggered());
  },
  initContactUsPageTriggered() {
    dispatch(initContactUsPageTriggered());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhoWeAre);
