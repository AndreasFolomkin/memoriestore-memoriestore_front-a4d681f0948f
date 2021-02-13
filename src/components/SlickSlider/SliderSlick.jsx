import React, { Component } from "react";
import Slider from "react-slick";

import rightArrow from "../../sliderPictures/right-arrow @1X.png";
import leftArrow from "../../sliderPictures/left-arrow @1X.png";
import Preloader from "./../../componentsDumb/Preloader/Preloader";

import "./SliderSlick.css";

const NextArrow = props => {
  const { onClick } = props;
  return (
    <img
      onClick={onClick}
      className="arrow right-arrow"
      src={rightArrow}
      alt="memoriestore"
    />
  );
};

const PrevArrow = props => {
  const { onClick } = props;
  return (
    <img
      onClick={onClick}
      className="arrow left-arrow"
      src={leftArrow}
      alt="memoriestore"
    />
  );
};

class SliderSlick extends Component {
  constructor(props) {
    super(props);
    this.slider = React.createRef();
  }

  render() {
    let { slickPictures, Price, className } = this.props;
    if (slickPictures.length < 3) {
      return <Preloader />;
    }

    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      arrows: true
    };

    return (
      <div className={`slider-container ${className}`}>
        <Slider {...settings} ref={this.slider}>
          {slickPictures.map((item, key) => {
            return (
              <div className="relative-container" key={key}>
                <img
                  className="albums-image"
                  src={`http://memoriestore.com/static${item.pic}`}
                  alt="memoriestore"
                />
              </div>
            );
          })}
        </Slider>
        <div>{Price}</div>
      </div>
    );
  }
}

export default SliderSlick;
