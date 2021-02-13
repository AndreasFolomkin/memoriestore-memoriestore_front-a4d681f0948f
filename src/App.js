import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import MainPage from "./pages/MainPage";
import PhotoAlbumExamples from "./pages/PhotoAlbumExamples";
import DesignerPortfolioPage from "./pages/DesignerPortfolioPage";
import RequestPage from "./pages/RequestPage";
import FaqPage from "./pages/FaqPage";
import OrderPage from "./pages/OrderPage";
import LoginPage from "./pages/LoginPage";
import ThankYouPage from "./pages/ThankYouPage";
import WhoWeAre from "./pages/WhoWeAre";
import GiftCards from "./pages/GiftCards";
import PDFPage from "./pages/PDFPage";
import ConfirmationPage from "./pages/ConfirmationPage";

import { PrivateRoute } from "./utils/privateRoute";
import { sendSessionSubmitted } from "./redux/actions/sendSession";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.sendSessionSubmitted();
  }

  render() {
    return (
      <Router>
        <div className="123">
          <Switch>

            <Route exact path="/" component={MainPage} />
            <Route
              path="/photo_album_examples/"
              component={PhotoAlbumExamples}
            />
            <Route
              path="/designer_portfolio_page/:ID"
              component={DesignerPortfolioPage}
            />
            <Route path="/request_page/:pageName?" component={RequestPage} />
            <Route path="/faq_page" component={FaqPage} />
            <Route path="/who_we_are" component={WhoWeAre} />
            <Route path="/gift_cards" component={GiftCards} />
            <PrivateRoute path="/order_page" component={OrderPage} />
            <Route path="/login_page" component={LoginPage} />
            <Route path="/thank_you_page" component={ThankYouPage} />
            <Route path="/condition_page" component={PDFPage} />
            <PrivateRoute
              path="/confirmation_page"
              component={ConfirmationPage}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
const NotFound = () => (
  <div className="page-is-not-found">Page is not found!</div>
);
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  sendSessionSubmitted() {
    dispatch(sendSessionSubmitted());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
