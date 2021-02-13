import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Route, Link } from "react-router-dom";

import { initSidebarTriggered } from "../../redux/actions/initSidebar";
import MainPage from "../../pages/MainPage";
import "./Sidebar.css";

class Sidebar extends Component {
  componentDidMount() {
    this.props.initSidebarTriggered(
      localStorage.getItem("locale") || undefined
    );
  }
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props;
//    console.log(data)
    return (
      <div className="sidebar">
        <div className="sidebar-content">
          <Route exact path="/" component={MainPage} />
          <Link to={`/`}>
            <span className="memorie">Memorie</span>
            <span className="store">store</span>
          </Link>
          <div className="steeps-wrapper">
            <p className="how-it-works">{data.header}</p>
            <div className="secound-wrapper">
              <div className="step-container">
                <div
                  className={
                    this.props.etap <= 3 ? "first-step-active" : "first-step"
                  }
                >
                  1
                </div>
                <div className="step-text">
                  <p>{data.hot_it_works_text}</p>
                  <p className="second-text">{data.first_step_name}</p>
                  <p className="second-text">{data.first_step_name_2}</p>
                  <p className="second-text">{data.first_step_name_3}</p>
                </div>
              </div>
              <div className="vertical-line">
                <span />
              </div>
              <div className="step-container">
                <div
                  className={
                    this.props.etap >= 2 ? "second-step-active" : "second-step"
                  }
                >
                  2
                </div>
                <div className="step-text">
                  <p>{data.first_comment}</p>
                  <p className="second-text">{data.second_step_name}</p>
                  <p className="second-text">{data.second_step_name_2}</p>
                  <p className="second-text">{data.second_step_name_3}</p>
                </div>
              </div>
              <div className="vertical-line">
                <span />
              </div>
              <div className="step-container">
                <div
                  className={
                    this.props.etap == 3 ? "third-step-active" : "third-step"
                  }
                >
                  3
                </div>
                <div className="step-text">
                  <p>{data.second_comment}</p>
                  <p className="second-text">{data.third_step_name}</p>
                  <p className="second-text">{data.third_step_name_2}</p>
                  <p className="second-text">{data.third_step_name_3}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.sidebar.data,
  locale: state.switchLocale.locale
});

const mapDispatchToProps = dispatch => ({
  initSidebarTriggered(locale) {
    dispatch(initSidebarTriggered(locale));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
