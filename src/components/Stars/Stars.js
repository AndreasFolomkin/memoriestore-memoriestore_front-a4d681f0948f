import React, { Component } from "react";

import "./Stars.css";

class Stars extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="star-rating__wrap">
        <label
          title="1 out of 5 stars"
          className="star-rating__ico fa fa-star-o fa-lg"
        >
          <input
            type="radio"
            value={1}
            name={item.id}
            onClick={e => this.onClick(item.id, e)}
            className="star-rating__input"
          />
        </label>
        <label
          title="2 out of 5 stars"
          className="star-rating__ico fa fa-star-o fa-lg"
        >
          <input
            type="radio"
            value={2}
            name={item.id}
            onClick={e => this.onClick(item.id, e)}
            className="star-rating__input"
          />
        </label>
        <label
          title="3 out of 5 stars"
          className="star-rating__ico fa fa-star-o fa-lg"
        >
          <input
            type="radio"
            value={3}
            name={item.id}
            onClick={e => this.onClick(item.id, e)}
            className="star-rating__input"
          />
        </label>
        <label
          title="4 out of 5 stars"
          className="star-rating__ico fa fa-star-o fa-lg"
        >
          <input
            type="radio"
            value={4}
            name={item.id}
            onClick={e => this.onClick(item.id, e)}
            className="star-rating__input"
          />
        </label>
        <label
          title="5 out of 5 stars"
          className="star-rating__ico fa fa-star-o fa-lg"
        >
          <input
            type="radio"
            value={5}
            name={item.id}
            onClick={e => this.onClick(item.id, e)}
            className="star-rating__input"
          />
        </label>
      </div>
    );
  }
}

export default Stars;
