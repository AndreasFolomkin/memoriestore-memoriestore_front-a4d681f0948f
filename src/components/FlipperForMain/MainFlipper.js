import React, { Component } from "react";
import FlipPage from "react-flip-page";
import { connect } from "react-redux";

import "./MainFlipper.css";

let photos = [
  "/static/media/Yulya Bereznjak/01.jpg.jpg",
  "/static/media/Yulya Bereznjak/02.jpg.jpg",
  "/static/media/Yulya Bereznjak/03.jpg.jpg",
  "/static/media/Yulya Bereznjak/04.jpg.jpg",
  "/static/media/Yulya Bereznjak/05.jpg.jpg",
  "/static/media/Yulya Bereznjak/06.jpg.jpg"
];
// photos = photos.reverse();  сделать проверку на арабский язык и переворачивать массив
//reverse
class MainFlipper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputPageNumber: 1,
      inputPageString: "1",
      currentPageNumber: 1,
      speedTurnAnimation: 1200,

      val1: -1,
      val2: 0
    };
    this.flipper = React.createRef();
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

  // setInputPageNumber = page => {
  //   this.setState({
  //     inputPageNumber: page
  //   });
  // };

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
    if (Number.isInteger(target) && target >= 0 && target <= photos.length) {
      this.setInputPageNumber(target);
      if (target > 0) {
        flipper.gotoPage(target - 1);
        this.setCurrentPage(target);
      }
    }
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
      inputPageString: this.state.photosToView.length * 2 - 2
    });
    // const flipper = this.flipper.current;
    // const delay = 150;

    // this.setState({
    //   speedTurnAnimation: 20
    // });

    // this.state.photosToView.forEach((photo, index) => {
    //   setTimeout(() => {
    //     flipper.gotoNextPage();
    //     if (index === this.state.photosToView.length - 1) {
    //       this.setState({
    //         speedTurnAnimation: 1200
    //       });
    //     }
    //   }, delay * index);
    // });
  };

  handleTurnToEndLeft = event => {
    event.preventDefault();
    const flipper = this.flipper.current;
    flipper.gotoPage(0);
    // const delay = 150;
    // this.setState({
    //   speedTurnAnimation: 20
    // });

    // this.state.photosToView.forEach((photo, index) => {
    //   setTimeout(() => {
    //     flipper.gotoPreviousPage();
    //     if (index === this.state.photosToView.length - 1) {
    //       this.setState({
    //         speedTurnAnimation: 1200
    //       });
    //     }
    //   }, delay * index);
    // });
  };
  getPageNumber = el => {
    // el.pic.indexOf("_");
    let underscoreIndex = el.pic.indexOf("_");
    let res = parseInt(
      el.pic[underscoreIndex - 2] + el.pic[underscoreIndex - 1]
    );
    // console.log(el, "'s page number: ", res);
    // console.log(
    //   "el.pic[underscoreIndex - 2] + el.pic[underscoreIndex - 1]:",
    //   el.pic[underscoreIndex - 2] + el.pic[underscoreIndex - 1]
    // );
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
    return (
      <div className="container-for-flipper">
        <div className="flippage-container">
          <FlipPage
            orientation="horizontal"
            animationDuration={speedTurnAnimation}
            ref={this.flipper}
            onPageChange={this.handlePageNumber}
            responsive
          >
            {photos.map(photo => (
              <img
                className="flipperpage-image"
                src={`http://localhost:8000${photo}`}
                alt="memory"
              />
            ))}
          </FlipPage>
        </div>
        {this.props.isReverse ? (
          <div className="manipulators">
            <div className="arrows-container left-arrows">
              <button className="button-cust" onClick={this.next}>
                <img src={arrows.left} alt="left" /> קדימה
              </button>
              <button
                className="button-cust"
                onClick={this.handleTurnToEndRight}
              >
                <img src={arrows.leftMax} alt="left" /> לסוף
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
              /{photos.length}
            </div>
            <div className="arrows-container">
              <button
                className="button-cust"
                onClick={this.handleTurnToEndLeft}
              >
                להתחלה <img src={arrows.rightMax} alt="left" />
              </button>
              <button className="button-cust" onClick={this.prev}>
                אחורה <img src={arrows.right} alt="left" />
              </button>
            </div>
          </div>
        ) : (
          <div className="manipulators">
            <div className="arrows-container left-arrows">
              <button className="button-cust" onClick={this.prev}>
                <img src={arrows.left} alt="left" /> אחורה
              </button>
              <button
                className="button-cust"
                onClick={this.handleTurnToEndLeft}
              >
                <img src={arrows.leftMax} alt="left" /> להתחלה
              </button>
            </div>
            <div className="pages-counter">
              <input
                value={inputPageNumber}
                className="pagenumberInput"
                onChange={this.onChangePageNumber}
                onBlur={this.onBlureHandle}
              />
              /{photos.length}
            </div>
            <div className="arrows-container">
              <button
                className="button-cust"
                onClick={this.handleTurnToEndRight}
              >
                לסוף <img src={arrows.rightMax} alt="left" />
              </button>
              <button className="button-cust" onClick={this.next}>
                קדימה <img src={arrows.right} alt="left" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainFlipper);
