import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// ReactDOM.render(
//   isMobile ? (
//     <div
//       style={{
//         color: "#2b5b83",
//         fontFamily: "Alef, sans-serif",
//         textAlign: "center"
//       }}
//     >
//       <div
//         style={{
//           marginTop: 50,
//           marginLeft: 50,
//           marginRight: 50
//         }}
//       >
//         We bring our apologies. At the moment the site does not support work
//         with mobile devices
//       </div>
//       <button
//         onClick={onClick}
//         style={{
//           color: "white",
//           backgroundColor: "#2b5b83",
//           marginTop: 20,
//           height: "1.7em",
//           border: "none",
//           marginLeft: "auto",
//           marginRight: "auto"
//         }}
//       >
//         Enter anyway >>
//       </button>
//     </div>
//   ) : (
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   ),
//   document.getElementById("root")
// );

serviceWorker.unregister();
if (module.hot) {
	module.hot.accept();
}
