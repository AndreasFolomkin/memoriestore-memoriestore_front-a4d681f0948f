import React, { Component } from "react";
import Slider from "react-slick";
import FlipPage from "react-flip-page";
import { connect } from "react-redux";
//СЮДА ПОДКЛЮЧИТЬ ДИСПАТЧ
import foto1 from "../../img/1.png";
import foto2 from "../../img/2.png";
import foto3 from "../../img/3.png";
import leftArrow from "../../img/double-left-chevron.svg";
import rightArrow from "../../img/double-angle-pointing-to-right.svg";

import "./Flipper.css";
// import { url } from "inspector";

let photos = [
  "/static/media/Yulya Bereznjak/01.jpg.jpg",
  "/static/media/Yulya Bereznjak/02.jpg.jpg",
  "/static/media/Yulya Bereznjak/03.jpg.jpg",
  "/static/media/Yulya Bereznjak/04.jpg.jpg",
  "/static/media/Yulya Bereznjak/05.jpg.jpg",
  "/static/media/Yulya Bereznjak/06.jpg.jpg"
];
photos = photos.reverse(); // сделать проверку на арабский язык и переворачивать массив
//reverse
class Flipper extends Component {
  constructor(props) {
    super(props);

    this.flipper = React.createRef();

    // let photosToView = this.props.imgs[albumNum];
    let photosToView = this.props.imgs;
    let photoPics = photosToView;
    let filteredPhotoPics = photoPics.filter(ph => this.isCover(ph)); // filter works
    let covers = photoPics.filter(ph => !this.isCover(ph)); // covers

    let sortedPhotoPics = filteredPhotoPics.sort((a, b) => {
      return this.getPageNumber(a) > this.getPageNumber(b) ? 1 : -1;
    });
    let cover = covers.find(f => f.pic.includes("cover.jpg"));
    let cover_back = covers.find(f => f.pic.includes("cover_back"));

    let spreadedPhotos = [cover, ...sortedPhotoPics, cover_back];

    this.state = {
      inputPageNumber: 1,
      inputPageString: "1",
      currentPageNumber: 1,
      speedTurnAnimation: 1200,
      photosToView: spreadedPhotos,
      val1: -1,
      val2: 0
      // isEnlarged: false
    };
  }

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
      target <= this.state.photosToView.length
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
    flipper.gotoPage(this.state.photosToView.length - 1);

    this.setState({
      val1: this.state.photosToView.length - 2,
      val2: this.state.photosToView.length - 1,
      inputPageString: this.state.photosToView.length * 2 - 2
    });
  };

  handleTurnToEndLeft = event => {
    event.preventDefault();
    const flipper = this.flipper.current;
    this.setState({
      val1: 0,
      val2: 1
    });
    flipper.gotoPage(0);
  };

  getPageNumber = el => {
    // el.pic.indexOf("_");
    let underscoreIndex = el.pic.lastIndexOf("_");
    let res = parseInt(
      el.pic[underscoreIndex - 2] + el.pic[underscoreIndex - 1]
    );
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
    // const { isReverse } = this.props;

    // let sortedPhotoPics = [];
    // .filter(ph => !this.isCover(ph))
    // photoPics.map(ph => {
    //   sortedPhotoPics[this.getPageNumber(ph)] = ph;
    // });
    // console.log("photoPics[5].indexOf(`_`) ", photoPics[5].pic.indexOf("_"));
    // let underscoreIndex = photoPics[5].pic.indexOf("_");

    // parseInt(
    //   photoPics[5].pic[underscoreIndex - 2] +
    //     photoPics[5].pic[underscoreIndex - 1]
    // );

    const { inputPageNumber, speedTurnAnimation, inputPageString } = this.state;
    let { isEnlarged, toggleEnlargement, orderText } = this.props;
    return (
      <div className="container-for-flipper">
        <div className={`flippage-container${isEnlarged ? " zoom" : ""}`}>
          <FlipPage
            orientation="horizontal"
            animationDuration={speedTurnAnimation}
            ref={this.flipper}
            onPageChange={this.handlePageNumber}
            reverse={this.props.isReverse}
            responsive
          >
            {//src={`http://localhost:8000${photo}`}
            //photos.map(photo => (

            //spr.map(photo => {
            // this.props.imgs.map(photo => (
            this.state.photosToView.map(photo => {
              let img = photo.pic.split("/").slice(2);
              img = img.join("/"); // [photo.path, ...img]
              return (
                <img
                  key={photo.id}
                  className="flipperpage-image"
                  src={`https://memoriestore.com/static/media/${img}`}
                  alt="memory"
                  onClick={() => {
                    //if (isEnlarged) {
                    toggleEnlargement(!isEnlarged);
                    //}
                  }}
                />
              );
            })}
          </FlipPage>
        </div>
        {this.props.isReverse ? (
          <div className="manipulators">
            <div className="arrows-container left-arrows">
              <button className="button-cust" onClick={this.next}>
                <img src={arrows.left} alt="left" /> קדימה
                {/* <span>{orderText.toLeft}</span> */}
              </button>
              <button
                className="button-cust"
                onClick={this.handleTurnToEndRight}
              >
                <img src={arrows.leftMax} alt="left" /> לסוף
                {/* <span>{orderText.toEndRight}</span> */}
              </button>
            </div>
            <div className="pages-counter">
              <input
                disabled
                value={
                  this.state.inputPageString === "0 - 1"
                    ? "1"
                    : this.state.inputPageString
                }
                className="pagenumberInput"
                onChange={this.onChangePageNumber}
                onBlur={this.onBlureHandle}
              />
              /{this.state.photosToView.length * 2 - 2}
            </div>
            <div className="arrows-container">
              <button
                className="button-cust"
                onClick={this.handleTurnToEndLeft}
              >
                {/* <span>{orderText.to_end_left}</span> */}
                להתחלה <img src={arrows.rightMax} alt="left" />
              </button>
              <button className="button-cust" onClick={this.prev}>
                {/* <span>{orderText.to_right}</span> */}
                אחורה <img src={arrows.right} alt="left" />
              </button>
            </div>
          </div>
        ) : (
          /////////////////////////////////////////////////////////////////////
          <div className="manipulators">
            <div className="arrows-container left-arrows">
              <button className="button-cust" onClick={this.prev}>
                <img src={arrows.left} alt="left" /> אחורה
                {/* <span>{orderText.to_left}</span> */}
              </button>
              <button
                className="button-cust"
                onClick={this.handleTurnToEndLeft}
              >
                <img src={arrows.leftMax} alt="left" /> להתחלה
                {/* <span>{orderText.to_end_left}</span> */}
              </button>
            </div>
            <div className="pages-counter">
              <input
                disabled
                value={
                  this.state.inputPageString === "0 - 1"
                    ? "1"
                    : this.state.inputPageString
                }
                className="pagenumberInput"
                onChange={this.onChangePageNumber}
                onBlur={this.onBlureHandle}
              />
              /{this.state.photosToView.length * 2 - 2}
            </div>
            <div className="arrows-container">
              <button
                className="button-cust"
                onClick={this.handleTurnToEndRight}
              >
                {/* <span>{orderText.to_end_right}</span> */}
                לסוף <img src={arrows.rightMax} alt="left" />
              </button>
              <button className="button-cust" onClick={this.next}>
                {/* <span>{orderText.to_right}</span> */}
                קדימה <img src={arrows.right} alt="left" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   albms: state.checkPromocodeLogin.data.albums,
//   imgs: state.orderImages.data
// });

// const mapDispatchToProps = dispatch => ({});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Flipper);
export default Flipper;
