import React, { Component } from "react";
// import { connect } from "react-redux";
// import { BrowserRouter as Route, Link } from "react-router-dom";
// import { Document, Page } from "react-pdf";

// import HeaderFooter from "../components/HeaderFooter/HeaderFooter";
// import Button from "../components/Button/Button";
// import Preloader from "../componentsDumb/Preloader/Preloader";

import "./styles/PDFPage.css";

import LoginImg from "../img/login.svg";
import Logo from "../img/mem.jpeg";

class PDFPage extends Component {
  componentDidMount() {}
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { pageNumber, numPages } = this.state;
    // const { headerFooterData } = this.props;
    // if (!headerFooterData) {
    //   return <Preloader />; //ПЕРЕДЕЛАТЬ ЭТО НА КОМПОНЕНТ (СДЕЛАТЬ КОМПОНЕНТОМ)
    // }

    return (
      <div>
        {/* <HeaderFooter
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
        </HeaderFooter> */}

        <div className="pdf-container">
          <object>
            <embed src="https://memoriestore.com/static/MemoristoreConditions01.pdf" />
          </object>
        </div>
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
  }
}

// const mapStateToProps = state => ({
//   headerFooterData: state.headerFooter.data,
//   locale: state.switchLocale.locale
// });

// const mapDispatchToProps = dispatch => ({});

export default PDFPage;
// connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(PDFPage);
