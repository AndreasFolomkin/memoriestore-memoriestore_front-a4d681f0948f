import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Route, Link, Redirect } from "react-router-dom";

import Button from "../components/Button/Button";
import { initLoginPageTriggered } from "../redux/actions/initLoginPage";
import OrderPage from "../pages/OrderPage";
import Sidebar from "../components/Sidebar/Sidebar";
import Preloader from "../componentsDumb/Preloader/Preloader";

import { checkPromocodeSubmitted } from "../redux/actions/checkPromocodeLogin";

import "./styles/LoginPage.css";

class LoginPage extends Component {
  componentDidMount() {
    let promo = this.props.location.search ? this.props.location.search : false;
    if (promo) {
      let [a, b] = promo.split("=");
      if (a == "?promocode") {
        this.props.checkPromocodeSubmitted(b);
      }
    }
    this.props.initLoginPageTriggered(
      localStorage.getItem("locale") || undefined
    );
    document.addEventListener("keydown", this.handleKeyDown);
  }
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick = () => {
    return this.props.checkPromocodeSubmitted(this.state.password);
  };

  onChange = e => {
    return this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleKeyDown = event => {
    const ENTER_CODE = 13;
    if (event.keyCode === ENTER_CODE) {
      this.props.checkPromocodeSubmitted(this.state.password);
    }
  };
  render() {
    const { isLoading } = this.props;
    if (isLoading) {
      return <Preloader />;
    }
    if (sessionStorage.getItem("isAuthorized") === "true") {
      return <Redirect to={`/order_page`} />;
    }
    const { data, promocode } = this.props;

    return (
      <div className="container-for-login">
        <Sidebar etap={2} />
        <div className="login-wrapper">
          <h1>{data.header}</h1>
          <p>{data.enter}</p>
          {promocode === "false" ? (
            <span style={{ color: "red" }}>{data.error}</span>
          ) : (
            <span style={{ color: "white" }}>_</span>
          )}
          <input
            style={
              promocode === "false"
                ? {
                    borderWidth: 2,
                    borderColor: "red",
                    borderStyle: "solid"
                  }
                : {
                    borderWidth: 2,
                    borderColor: "#f2f2f2",
                    borderStyle: "solid"
                  }
            }
            name="password"
            onChange={e => this.onChange(e)}
            type="password"
            placeholder={data.password_placeholder}
          />
          <Button buttonName={data.button_text} onClick={this.onClick} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.loginPage.data,
  locale: state.switchLocale.locale,
  promocode: state.checkPromocodeLogin.data.promocode,
  isLoading: state.loginPage.isLoading
});

const mapDispatchToProps = dispatch => ({
  initLoginPageTriggered(locale) {
    dispatch(initLoginPageTriggered(locale));
  },
  checkPromocodeSubmitted(promocode) {
    dispatch(checkPromocodeSubmitted(promocode));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
