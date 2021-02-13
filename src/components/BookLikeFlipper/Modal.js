import React, { Component } from "react";
import Flipper from "./Flipper";

import onclose from "../../img/cancel.svg";
import zoom from "../../img/zoom.svg";

import "./Modal.css";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnlarged: false
    };
    this.toggleEnlargement = this.toggleEnlargement.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }
  // componentWillUnmount() {
  //   document.removeEventListener(this.handleKeyDown);
  // }

  handleKeyDown = event => {
    const { handleClose } = this.props;
    const ESC_CODE = 27;
    if (event.keyCode === ESC_CODE) {
      handleClose();
    }
  };
  toggleEnlargement = value => {
    this.setState({ isEnlarged: value }, () => {
    });
  };
  render() {
    const { handleClose, show, children, isReverse, orderText } = this.props;
    const showHideClassName = show
      ? "modal display-block"
      : "modal display-none";

    console.log("PROPS OF MODAL", this.props);
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
              alt="memoriestore"
            />
            <img
              className="zoom-image"
              src={zoom}
              onClick={() => {
                this.toggleEnlargement(true);
              }}
              alt="memoriestore"
            />
          </div>
          <Flipper
            imgs={this.props.selectedAlbum}
            isReverse={isReverse}
            albumNum={this.props.albumNum}
            isEnlarged={this.state.isEnlarged}
            toggleEnlargement={this.toggleEnlargement}
            orderText={orderText}
          />
        </section>
      </div>
    );
  }
}

export default Modal;
