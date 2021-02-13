import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return sessionStorage.getItem("isAuthorized") === "true" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login_page",
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);
