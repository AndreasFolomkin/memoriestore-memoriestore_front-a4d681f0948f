import React, { Component } from "react";

import "./Button.css";

class Button extends Component {
  render() {
    return (
      <div className="button-container">
        <button
          onClick={this.props.onClick}
          className={this.props.className}
          type={this.props.type}
          form={this.props.form}
          disabled={this.props.disabled}
          value={this.props.value}
          title={this.props.title}
        >
          {this.props.buttonName}
        </button>
      </div>
    );
  }
}

export default Button;
