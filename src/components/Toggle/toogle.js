import React, { useState } from "react";

import StarRatingComponent from "react-star-rating-component";
import SliderSlick from "../SlickSlider/SliderSlick";

import Button from "../Button/Button";

export const toogle = ({
  imgs,
  item,
  data,
  requestPage,
  onStarClick,
  ratings
}) => {
  const handleClick = () => {
    setIsToggle(!isToggle);
    console.log("(!isToggle)", isToggle);
  };
  const [isToggle, setIsToggle] = useState(false);
  return (
    <div className="star-rating">
      <SliderSlick slickPictures={imgs} />
      <div className="answer-and-questions">
        <div>
          <p className="album-name">{item.name}</p>
        </div>
        <div>
          <span className="answer">
            {requestPage.data.how_many[item.how_many]}
          </span>
          <span className="question">{data.how_many}</span>
        </div>
        <div>
          <span className="answer">
            {requestPage.data.background[item.background]}
          </span>
          <span className="question">{data.which_background}</span>
        </div>
        <div>
          <span className="answer">
            {requestPage.data.how_photos_page[item.how_many_photos_per_page]}
          </span>
          <span className="question">{data.photos_on_page}</span>
        </div>
        <div>
          <span className="answer">
            {requestPage.data.frames_for_photos[item.frames_for_photos]}
          </span>
          <span className="question">{data.whether_use_frames}</span>
        </div>
        <div>
          <span className="answer">
            {requestPage.data.decorations[item.decorations]}
          </span>
          <span className="question">{data.whether_use_decoration}</span>
        </div>
        <span className="pages-count">{data.pages}</span>
        <span className="pages-count">{imgs.length}</span>
        {/* <p className="album-example-price">{data.price}</p> */}
      </div>

      <div className="stars-main-container">
        {/* <h2>Rating from state: {this.state.rating}</h2> */}
        {/* <p className="albumName">{data.do_you_like}</p> */}
        {/* <StarRatingComponent
          name={item.id}
          starCount={5}
          value={ratings[item.id] ? ratings[item.id] : 0}
          onStarClick={onStarClick}
        /> */}
        {/*<Button
          onClick={handleClick}
          buttonName={"האלבום לטעמי"}
          className={isToggle ? "like-button" : "dont-like-button"}
        />*/}
      </div>
    </div>
  );
};
