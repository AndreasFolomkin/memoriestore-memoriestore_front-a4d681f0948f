import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Redirect, Link } from "react-router-dom";

import { initThankYouTriggered } from "../redux/actions/initThankYouPage";
import Preloader from "../componentsDumb/Preloader/Preloader";
import HeaderFooter from "../components/HeaderFooter/HeaderFooter";
import Button from "../components/Button/Button";

import LoginImg from "../img/login.svg";
import Logo from "../img/mem.jpeg";

import "./styles/ThankYouPage.css";

class ThankYouPage extends Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
  }
  componentDidMount() {
    this.props.initThankYouTriggered(
      localStorage.getItem("locale") || undefined
    );
  }
  routeChange() {
    let path = `/who_we_are`;
    this.props.history.push(path);
  }
  render() {
    const { isLoading } = this.props;
    if (isLoading) {
      return <Preloader />;
    }
    const { data, headerFooterData } = this.props;
    console.log("this.props.location.search", this.props.location.search);
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
              <img src={LoginImg} alt="memoriestore" />
              <p>{headerFooterData.log_in}</p>
            </label>
          </Link>
        </HeaderFooter>
        <div className="thank-wrapper">
          {!this.props.location.search ? (
            <h1>{data.header}</h1>
          ) : (
            <h1>{data.we_will_contact_you}</h1>
          )}
          {!this.props.location.search && <p>{data.we_will_contact_you}</p>}
          <div className="link">
            <Link to="/">{data.back_to_main_page}</Link>
          </div>
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
          <Link to={`/`}>
            <img src={Logo} className="header-logo" alt="memoriestore" />
          </Link>
        </HeaderFooter>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  data: state.thankYouPage.data,
  locale: state.switchLocale.locale,
  isLoading: state.thankYouPage.isLoading,
  headerFooterData: state.headerFooter.data
});

const mapDispatchToProps = dispatch => ({
  initThankYouTriggered(locale) {
    dispatch(initThankYouTriggered(locale));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThankYouPage);
