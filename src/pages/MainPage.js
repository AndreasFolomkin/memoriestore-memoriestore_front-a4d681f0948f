import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Route, Link } from "react-router-dom";

import HeaderFooter from "../components/HeaderFooter/HeaderFooter";
import PhotoAlbumExamples from "../components/PhotoAlbumExamples/PhotoAlbumExamples";
import HowWorks from "../componentsDumb/HowWorks/HowWorks";
import HeroElement from "../componentsDumb/HeroElement/HeroElement";
import Button from "../components/Button/Button";
import TariffPlan from "../components/TariffPlan/TariffPlan";
import Preloader from "../componentsDumb/Preloader/Preloader";

import { initMainPageTriggered } from "../redux/actions/initMainPage";
import { sendSessionSubmitted } from "../redux/actions/sendSession";
import { initAlbumsTriggered } from "../redux/actions/initAlbums";
import { sendLocationTriggered } from "../redux/actions/sendLocation";

import "./styles/MainPage.css";

class MainPage extends Component {
  componentDidMount() {
    this.props.initMainPageTriggered(
      localStorage.getItem("locale") || undefined
    );
    this.props.initAlbumsTriggered();
    this.props.sendLocationTriggered();
  }
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
  }
  currentImages = (albumID, images, exampleAlbums) => {
    let currentIdArr = images[albumID];
    return currentIdArr;
  };
  routeChange() {
    let path = `/who_we_are`;
    this.props.history.push(path);
  }
  handleClickTop(){
	  window.scroll({top: 0, left: 0, behavior: 'smooth' });
  }
  render() {
    const { isLoading, images, mainPageData, headerFooterData } = this.props;
    let locale = localStorage.getItem("locale");
    if (isLoading || !!!locale || !images) {
      return <Preloader />;
    }
    return (
      <div>
        <HeroElement className="header-hero header-hero-img">
        <HeaderFooter
            buttonText={headerFooterData.header_button_text}
            faq={headerFooterData.faq}
            log_in={headerFooterData.log_in}
            gift_cards={headerFooterData.gift_cards}
            who_we_are={headerFooterData.who_we_are}
            albumExamples={headerFooterData.album_examples}
            forDesigner={headerFooterData.for_designer}
            className="header-memoriestor"
          >
          </HeaderFooter>
          <div className="main-title">
            <div className="main-button-container">
              <Link to={`/request_page`}>
                <Button buttonName={mainPageData.hero.order_button} />
              </Link>
            </div>
          </div>
        </HeroElement>
        <HowWorks
          header={mainPageData.how_it_work.header}
          elem_header={mainPageData.how_it_work.elem_header}
          steps={mainPageData.how_it_work.steps}
          order_button={mainPageData.how_it_work.order_button}
        />
        <PhotoAlbumExamples />
        <TariffPlan
          header={mainPageData.choose_tariff.header}
          text_tariff_info={mainPageData.choose_tariff.text_tariff_info}
          smallAlbum={mainPageData.choose_tariff.small_album}
          familyAlbum={mainPageData.choose_tariff.family_album}
          presentAlbum={mainPageData.choose_tariff.present_album}
        />
        <HeroElement />
        <div className="footer-banner-wrapper">
          <p>
            memorie<span>store</span>
          </p>
        </div>
        <div className="gray_color_back footer-panel">Copyright &copy; 2020 - All Rights Reserved
        <a href="javascript:void(0)" onClick={this.handleClickTop}><i className="fa fa-angle-up"></i></a>
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

const mapStateToProps = state => ({
  mainPageData: state.mainPage,
  headerFooterData: state.headerFooter.data,
  isLoading: state.mainPage.isLoading,
  locale: state.switchLocale.locale,
  exampleAlbums: state.albums.data.results,
  images: state.images.data,
  isLoadingAlbums: state.albums.data,
  isLoadingImages: state.images.data
});

const mapDispatchToProps = dispatch => ({
  initMainPageTriggered(locale) {
    dispatch(initMainPageTriggered(locale));
  },
  initAlbumsTriggered() {
    dispatch(initAlbumsTriggered());
  },
  sendLocationTriggered() {
    dispatch(sendLocationTriggered());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
