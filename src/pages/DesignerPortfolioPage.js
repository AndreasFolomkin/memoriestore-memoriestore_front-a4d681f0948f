import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Route, Link } from "react-router-dom";
import Slider from "react-slick";
import StarRatingComponent from "react-star-rating-component";

import { initDesignerPortfolioPageTriggered } from "../redux/actions/initDesignerPortfolioPage";
import { sendLocationTriggered } from "../redux/actions/sendLocation";
import HeaderFooter from "../components/HeaderFooter/HeaderFooter";
import Button from "../components/Button/Button";
import Preloader from "../componentsDumb/Preloader/Preloader";
import MainModal from "../components/FlipperForMain/MainModal";

import rightArrow from "../sliderPictures/right-arrow @1X.png";
import leftArrow from "../sliderPictures/left-arrow @1X.png";
import LoginImg from "../img/login.svg";
import Logo from "../img/mem.jpeg";

// import Modal from "/FlipperForMain/MainModal";
import Modal from "../components/BookLikeFlipper/Modal";

import "./styles/DesignerPortfolio.css";

import "../components/SlickSlider/SliderSlick.css";

const NextArrow = props => {
  const { onClick } = props;
  return (
    <img onClick={onClick} className="arrow right-arrow" src={rightArrow} />
  );
};

const PrevArrow = props => {
  const { onClick } = props;
  return <img onClick={onClick} className="arrow left-arrow" src={leftArrow} />;
};

class DesignerPortfolioPage extends Component {
  componentDidMount() {
    console.log(
      "this.props.match.params.designerID",
      this.props.match.params.ID
    );
    this.props.initDesignerPortfolioPageTriggered(this.props.match.params.ID);
    this.props.sendLocationTriggered();
  }
  constructor(props) {
    super(props);
    this.state = {
      rating: 1
    };
    this.slider = React.createRef();
    this.routeChange = this.routeChange.bind(this);
  }
  state = { show: false, albumNumber: "" };

  showModal = number => {
    this.setState({ albumNumber: number, show: true });
    // this.setState({  });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  onStarClick(nextValue, prevValue, name, e, id) {
    this.setState({ id: id, rating: nextValue });
    console.log("STAR RATING", this.state.rating);
  }
  routeChange() {
    let path = `/who_we_are`;
    this.props.history.push(path);
  }

  render() {
    let { slickPictures } = this.props;
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      arrows: true
    };
    const { isLoading } = this.props;
    if (isLoading) {
      return <Preloader />;
    }
    const { data, headerFooterData } = this.props;
    console.log("designerData", data);
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
        <h1 className="profile-header">{data.header}</h1>
        <div className="profile-info">
          <img
            src={`https://memoriestore.com/static${data.designer.avatar}`}
            className="profile-avatar"
          />
          <div className="designers-info-container">
            <p className="profile-designer-name">{data.designer.name}</p>
            {/* ------------------------------------------------------------------------ */}
            <div>
              <StarRatingComponent
                name={`${data.designer.name}rating`}
                starCount={5}
                value={data.designer.mark}
              />
            </div>
            {/* ------------------------------------------------------------------------ */}
            <p className="profile-country">{data.designer.country}</p>
          </div>
        </div>
        <div className="left-marg">
          {data.designerAlbumsImages.map(album => {
            return (
              <div className="slider-background">
                <div className="slider-container">
                  <Slider {...settings} ref={this.slider}>
                    {album.map((item, key) => {
                      return (
                        <div className="relative-container" key={key}>
                          <img
                            className="albums-image"
                            src={`https://memoriestore.com/static${item.pic}`}
                            alt={key}
                          />
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
            );
          })}
          {/* <div className="desirgners-album">
            <img
              onClick={() => {
                this.showModal(designerData.designerAlbumNumber);
              }}
              src={`${designerData.designerCover1}`}
            />
          </div> */}
          {/* <div className="desirgners-album">
            <img src={example1} />
          </div>
          <div className="desirgners-album">
            <img src={example1} />
          </div>
          <div className="desirgners-album">
            <img src={example1} />
          </div> */}
        </div>
        {/* {this.state.show && designerData.designerAlbum ? (
          <Modal
            selectedAlbum={designerData.designerAlbum || null}
            show={this.state.show}
            albumNumber={this.state.albumNumber}
            handleClose={this.hideModal}
          />
        ) : (
          this.state.show && (
            <MainModal
              show={this.state.show}
              albumNumber={this.state.albumNumber}
              handleClose={this.hideModal}
            />
          )
        )} */}
        {/* <p>{data.loading}</p> */}
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

const mapStateToProps = state => ({
  data: state.portfolioPage.data,
  locale: state.switchLocale.locale,
  headerFooterData: state.headerFooter.data,
  isLoading: state.portfolioPage.isLoading
});

const mapDispatchToProps = dispatch => ({
  initDesignerPortfolioPageTriggered(locale, designerID) {
    dispatch(initDesignerPortfolioPageTriggered(locale, designerID));
  },
  sendLocationTriggered() {
    dispatch(sendLocationTriggered());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesignerPortfolioPage);
