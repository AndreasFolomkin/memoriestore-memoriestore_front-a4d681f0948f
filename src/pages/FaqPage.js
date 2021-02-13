import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Route, Link } from "react-router-dom";

import { initFaqPageTriggered } from "../redux/actions/initFaqPage";
import HeaderFooter from "../components/HeaderFooter/HeaderFooter";
import Button from "../components/Button/Button";
import Preloader from "../componentsDumb/Preloader/Preloader";
import "./styles/FaqPage.css";

import LoginImg from "../img/login.svg";
import Logo from "../img/mem.jpeg";

class FaqPage extends Component {
  componentDidMount() {
    this.props.initFaqPageTriggered(
      localStorage.getItem("locale") || undefined
    );
  }
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
  }
  routeChange() {
    let path = `/who_we_are`;
    this.props.history.push(path);
  }
  render() {
    const { isLoading } = this.props;
    if (isLoading) {
      return <Preloader />; //ПЕРЕДЕЛАТЬ ЭТО НА КОМПОНЕНТ (СДЕЛАТЬ КОМПОНЕНТОМ)
    }
    const { data, headerFooterData } = this.props;
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
              <img src={LoginImg} />
              <p>{headerFooterData.log_in}</p>
            </label>
          </Link>
          <Link to={`/`}>
            <img src={Logo} className="header-logo" />
          </Link>
        </HeaderFooter>
        <h1 className="faq-header">{data.name}</h1>

        {data.answers_and_questions.map((item, key) => {
          return (
            <div className="faq-answer-and-question" key={key}>
              <p className="faq-question">{item.question}</p>
              <p className="faq-answer">{item.answer}</p>
            </div>
          );
        })}
        <div className="empty-div" />
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

const mapStateToProps = state => ({
  data: state.faqPage.data,
  isLoading: state.faqPage.isLoading,
  headerFooterData: state.headerFooter.data,
  locale: state.switchLocale.locale
});

const mapDispatchToProps = dispatch => ({
  initFaqPageTriggered(locale) {
    dispatch(initFaqPageTriggered(locale));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FaqPage);
