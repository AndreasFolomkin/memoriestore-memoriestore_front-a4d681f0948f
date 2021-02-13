import React, { Component } from "react";
import { connect } from "react-redux";

import "./HeroElement.css";

class HeroElement extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //   locale_data: state.mainPage.how_it_works.locale
  state
});

export default connect(mapStateToProps)(HeroElement);
