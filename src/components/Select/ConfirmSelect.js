import React, { Component } from "react";

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cost: this.props.albumItem.price
    };
  }

  setCost = e => {
    this.setState({ cost: e.target.value }, () => {
      this.props.getAr({ [this.props.selectKey]: +this.state.cost });
    });
  };

  render() {
    const { albumItem, selectText, albumTypes } = this.props;

    return (
      <div className="type-of-album">
        <h3>{selectText}</h3>
        <select value={this.state.cost} onChange={e => this.setCost(e)}>
          <option value={albumItem.price}>
            {albumItem.price + " " + albumTypes[0]}
          </option>
          <option value={albumItem.middle_price}>
            {albumItem.middle_price + " " + albumTypes[1]}
          </option>
          <option value={albumItem.high_price}>
            {albumItem.high_price + " " + albumTypes[2]}
          </option>
        </select>
      </div>
    );
  }
}

export default Select;
