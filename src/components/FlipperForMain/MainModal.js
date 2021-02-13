import React, { Component } from "react";
import Flipper from "./MainFlipper";
import { connect } from "react-redux";

import onclose from "../../img/cancel.svg";
import zoom from "../../img/zoom.svg";
import FlipPage from "react-flip-page";

// import { initAlbumsTriggered } from "../redux/actions/initAlbums";

import "./MainModal.css";

class MainModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnlarged: false,
      inputPageNumber: 2,
      currentPageNumber: 2,
      speedTurnAnimation: 1200,
      inputPageString: "1 - 2",
      val1: 0,
      val2: 1
    };
    this.toggleEnlargement = this.toggleEnlargement.bind(this);
    this.flipper = React.createRef(); //1
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    // this.props.initAlbumsTriggered();
  }
  currentImages = (albumID, images, exampleAlbums) => {
    let currentIdArr = images[albumID];
    return currentIdArr;
  };

  handleKeyDown = event => {
    const { handleClose } = this.props;
    const ESC_CODE = 27;
    if (event.keyCode === ESC_CODE) {
      handleClose();
    }
  };
  toggleEnlargement = value => {
    this.setState({ isEnlarged: value });
  };

  //------- функции для флиппера -------//
  next = e => {
    e.preventDefault();
    const flipper = this.flipper.current;
    flipper.gotoNextPage();
  };

  prev = e => {
    e.preventDefault();
    const flipper = this.flipper.current;
    flipper.gotoPreviousPage();
  };

  handlePageNumber = (pageIndex, direction) => {
    this.setInputPageNumber(pageIndex + 1, direction);
    this.setCurrentPage(pageIndex + 1);
  };

  setCurrentPage = page => {
    this.setState({
      currentPageNumber: page
    });
  };

  setInputPageNumber = (page, direction) => {
    this.setState(state => {
      const val1 =
        direction === "next"
          ? state.val1 + 1
          : state.val1 >= -1 && state.val1 - 1;
      const val2 =
        direction === "next"
          ? state.val2 + 1
          : state.val2 >= 0 && state.val2 - 1;
      return {
        inputPageNumber: page,
        inputPageString: `${page + val1} - ${page + val2}`,
        val1,
        val2
        // `${page * 2} - ${page * 2 + 1}`
      };
    });
  };

  onChangePageNumber = e => {
    e.preventDefault();
    const target = +e.target.value;
    const flipper = this.flipper.current;
    if (
      Number.isInteger(target) &&
      target >= 0 &&
      target <= this.props.selectedAlbum.length
    ) {
      this.setInputPageNumber(target);
      if (target > 0) {
        flipper.gotoPage(target - 1);
        this.setCurrentPage(target);
      }
    }
  };

  onBlureHandle = e => {
    e.preventDefault();
    const { inputPageNumber, currentPageNumber } = this.state;
    if (inputPageNumber < 1) {
      this.setInputPageNumber(currentPageNumber);
    }
  };

  handleTurnToEndRight = event => {
    event.preventDefault();
    const flipper = this.flipper.current;
    flipper.gotoPage(this.props.selectedAlbum.length - 1);

    this.setState({
      val1: this.props.selectedAlbum.length - 0,
      val2: this.props.selectedAlbum.length - -1,
      inputPageString: this.props.selectedAlbum.length * 2
    });
  };

  handleTurnToEndLeft = event => {
    event.preventDefault();
    const flipper = this.flipper.current;
    this.setState({
      val1: 1,
      val2: 2
    });
    flipper.gotoPage(0);
  };

  getPageNumber = el => {
    // el.pic.indexOf("_");
    let dotIndex = el.pic.indexOf(".");
    let slash = el.pic.indexOf("/", 7);
    let res = parseInt(el.pic.slice(slash + 1, dotIndex));
    return res; //? res : false;
  };

  isCover = el => {
    let num = this.getPageNumber(el);
    if (num) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const arrows = {
      left: require("../../img/left.png"),
      leftMax: require("../../img/left_max.png"),
      right: require("../../img/right.png"),
      rightMax: require("../../img/right_max.png")
    };
    const { inputPageNumber, speedTurnAnimation } = this.state;
    const {
      handleClose,
      show,
      children,
      images,
      exampleAlbums,
      albumNumber,
      selectedAlbum,
      mainPageData
    } = this.props;
    let filteredPhotoPics = selectedAlbum.filter(ph => this.isCover(ph));
    let sortedPhotoPics = filteredPhotoPics.sort((a, b) => {
      return this.getPageNumber(a) > this.getPageNumber(b) ? 1 : 0;
    });
    let covers = selectedAlbum.filter(ph => !this.isCover(ph));
    let cover = covers.find(f => f.is_main);

    let spreadedPhotos = [cover, ...sortedPhotoPics];

    const showHideClassName = show
      ? "modal display-block"
      : "modal display-none";

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <div className="rule-buttons">
            <img
              className="onclose-image"
              src={onclose}
              onKeyPress={event => console.log("event", event.key)}
              onClick={handleClose}
            />
            <img
              className="zoom-image"
              src={zoom}
              onClick={() => {
                this.toggleEnlargement(true);
              }}
            />
          </div>
          <div className="container-for-flipper">
            <div
              className={`flippage-container${
                this.state.isEnlarged ? " zoom" : ""
              }`}
            >
              <FlipPage
                orientation="horizontal"
                animationDuration={speedTurnAnimation}
                ref={this.flipper}
                onPageChange={this.handlePageNumber}
                responsive
              >
                {spreadedPhotos.map(photo => (
                  <img
                   key={photo.id}
                    className="flipperpage-image"
                    src={`https://memoriestore.com/static${photo.pic}`} //http://localhost:8000
                    alt="memory"
                    onClick={() => {
                      //if (isEnlarged) {
                      this.toggleEnlargement(!this.state.isEnlarged);
                      //}
                    }}
                  />
                ))}
              </FlipPage>
            </div>
            {this.props.isReverse ? (
              <div className="manipulators">
                <div className="arrows-container left-arrows">
                  <button className="button-cust" onClick={this.next}>
                    <img src={arrows.left} alt="left" /> קדימה
                    {/* <span>{mainPageData.toLeft}</span> */}
                  </button>
                  <button
                    className="button-cust"
                    onClick={this.handleTurnToEndRight}
                  >
                    <img src={arrows.leftMax} alt="left" /> לסוף
                    {/* <span>{mainPageData.toEndRight}</span> */}
                  </button>
                </div>
                <div className="pages-counter">
                  <input
                    disabled
                    value={this.state.inputPageString}
                    className="pagenumberInput"
                    onChange={this.onChangePageNumber}
                    onBlur={this.onBlureHandle}
                  />
                  /{this.props.selectedAlbum.length * 2}
                </div>
                <div className="arrows-container">
                  <button
                    className="button-cust"
                    onClick={this.handleTurnToEndLeft}
                  >
                    {/* <span>{mainPageData.to_end_left}</span> */}
                    להתחלה <img src={arrows.rightMax} alt="left" />
                  </button>
                  <button className="button-cust" onClick={this.prev}>
                    {/* <span>{mainPageData.to_right}</span> */}
                    אחורה <img src={arrows.right} alt="left" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="manipulators">
                <div className="arrows-container left-arrows">
                  <button className="button-cust" onClick={this.prev}>
                    <img src={arrows.left} alt="left" /> אחורה
                    {/* <span>{mainPageData.to_left}</span> */}
                  </button>
                  <button
                    className="button-cust"
                    onClick={this.handleTurnToEndLeft}
                  >
                    <img src={arrows.leftMax} alt="left" /> להתחלה
                    {/* <span>{mainPageData.to_end_left}</span> */}
                  </button>
                </div>
                <div className="pages-counter">
                  <input
                    disabled
                    value={this.state.inputPageString}
                    className="pagenumberInput"
                    onChange={this.onChangePageNumber}
                    onBlur={this.onBlureHandle}
                  />
                  /{this.props.selectedAlbum.length * 2}
                </div>
                <div className="arrows-container">
                  <button
                    className="button-cust"
                    onClick={this.handleTurnToEndRight}
                  >
                    {/* <span>{mainPageData.to_end_right}</span> */}
                    לסוף <img src={arrows.rightMax} alt="left" />
                  </button>
                  <button className="button-cust" onClick={this.next}>
                    {/* <span>{mainPageData.to_right}</span> */}
                    קדימה <img src={arrows.right} alt="left" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainModal);
