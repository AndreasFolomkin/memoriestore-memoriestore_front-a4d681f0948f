import React, { Component } from "react";
import { connect } from "react-redux";
//import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
//import StarRatingComponent from "react-star-rating-component";

import { markPlaced } from "../redux/actions/markPlaced";
import { initAlbumExamplePageTriggered } from "../redux/actions/initAlbumExamplePage";
import { initAlbumsTriggered } from "../redux/actions/initAlbums";
import { sendSessionSubmitted } from "../redux/actions/sendSession";
import { initRequestPageTriggered } from "../redux/actions/initRequestPage";
import { sendLocationTriggered } from "../redux/actions/sendLocation";

import HeaderFooter from "../components/HeaderFooter/HeaderFooter";
import Button from "../components/Button/Button";
import Preloader from "../componentsDumb/Preloader/Preloader";
//import SliderSlick from "../components/SlickSlider/SliderSlick";
import { toogle as Toogle } from "../components/Toggle/toogle";

import backico from "../img/backbutton.svg";
import LoginImg from "../img/login.svg";
import Logo from "../img/mem.jpeg";

import "./styles/PhotoAlbumExamples.css";

class PhotoAlbumExamples extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullfill: false,
      items: [],
      page: 1,
      rating: 1,
      ratings: {},
      isToggleOn: false
    };
    this.onStarClick = this.onStarClick.bind(this);
    this.routeChange = this.routeChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.initAlbumExamplePageTriggered(
      localStorage.getItem("locale") || undefined
    );
    this.props.initAlbumsTriggered();
    this.props.initRequestPageTriggered();
    this.props.sendLocationTriggered();
  }
  routeChange() {
    let path = `/who_we_are`;
    this.props.history.push(path);
  }
  onStarClick(nextValue, prevValue, name) {
    const id = name;
    this.setState(
      prevState => {
        return {
          ratings: { ...prevState.ratings, [id]: nextValue }
        };
      },
      () => {
        this.props.markPlaced({ rating: this.state.ratings[id], albumID: id });
        this.props.sendSessionSubmitted();
      }
    );
  }

  currentImages = (albumID, images, exampleAlbums) => {
    let currentIdArr = images[albumID];
    return currentIdArr;
  };

  handleClick(name) {
//    const id = name;
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    const {
//      count,
      isLoading,
      images,
      data,
      exampleAlbums,
      headerFooterData,
      isLoadingRequest
    } = this.props;
//    const { checkout } = this.props.location.state || {};
    const { ratings } = this.state;
    let albums = this.props.exampleAlbums.map(item => {
      return {
        ...albums,
        [`${item.id}_rating`]: 1
      };
    });

    if (isLoading || !!!images || isLoadingRequest) {
      return <Preloader />;
    }
    let prev = () => {
      window.history.go(-1);
    };
    console.log("images", images);
    return (
      <div className="albums-example-page">
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
          </Link>

          <Link to={`/`}>
            <img src={Logo} className="header-logo" alt="memoriestore" />
          </Link>
        </HeaderFooter>
        {/* {checkout ? null : ( */}
        <div className="return" onClick={prev}>
          <img src={backico} alt="memoriestore" />
          {/* <p>חזרה</p> */}
          <p>{data.back_button}</p>
        </div>
        {/* )} */}
        <h1 className="examples-page-header">{data.header}</h1>
        <p className="some-info">{data.help_info}</p>
        <p className="some-info">{data.taste_understand}</p>
        {/* count > exampleAlbums.length */}
        {/* <InfiniteScroll
          pageStart={0}
          loadMore={this.loadFunc}
          hasMore={true || false}
          loader={
            <div className="loader">
              <h1>LOADING.............</h1>
            </div>
          }
        > */}
        <div className="container-for-examples">
          {exampleAlbums.map((item, key) => {
            let imgs = this.currentImages(item.id, this.props.images);
            if (imgs) {
//              let main_image = imgs[0].pic;
              return (
                <Toogle
                  imgs={imgs}
                  item={item}
                  data={data}
                  requestPage={this.props.requestPage}
                  onStarClick={this.onStarClick}
                  ratings={ratings}
                  key={key}
                />
              );
            }
          })}
        </div>
        <div className="empty-exaples-container" />
        {/* </InfiniteScroll> */}
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
  count: state.albums.data.count,
  data: state.albumExample.data,
  locale: state.switchLocale.locale,
  exampleAlbums: state.albums.data.results,
  images: state.images.data,
  isLoading: state.albums.isLoading,
  isLoadingRequest: state.requestPage.isLoading,
  headerFooterData: state.headerFooter.data,
  requestPage: state.requestPage
});

const mapDispatchToProps = dispatch => ({
  initAlbumExamplePageTriggered(locale, album, albumID) {
    dispatch(initAlbumExamplePageTriggered(locale, album, albumID));
  },
  markPlaced(mark) {
    dispatch(markPlaced(mark));
  },
  sendSessionSubmitted() {
    dispatch(sendSessionSubmitted());
  },
  initAlbumsTriggered() {
    dispatch(initAlbumsTriggered());
  },
  initRequestPageTriggered(locale) {
    dispatch(initRequestPageTriggered(locale));
  },
  sendLocationTriggered() {
    dispatch(sendLocationTriggered());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoAlbumExamples);
