import React from "react";
import "./Popup.css";

const Popup = ({ handleClose, show, children, text }) => {
  const showHideClassName = show ? "popup popup-block" : "popup popup-none";

  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        {children}
        <div className="block" onClick={handleClose}>
          <div className="container-for-text">
            <p className="close-popup">╳</p>
            <p>{text}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Popup;
