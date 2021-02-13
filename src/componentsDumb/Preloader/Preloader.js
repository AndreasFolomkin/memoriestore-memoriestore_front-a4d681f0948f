import React from "react";

import "./Preloader.css";
//import gif from "../../img/preloader.gif";

const Preloader = () => {
  return (
    <div className="preloader">
      {/* <img src={gif} /> */}
      <div className="spinner" />
    </div>
  );
};

export default Preloader;
