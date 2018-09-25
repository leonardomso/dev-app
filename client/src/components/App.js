import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";
import styled from "styled-components";

import "../app.css";
import setAuthToken from "../constants/authToken";
import { setCurrentUser, logoutUser } from "../actions/auth";
import store from "../store/store";

import SignUp from "../views/auth/SignUp";
import SignIn from "../views/auth/SignIn";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Landing from "./Landing";

// Check for token.
if (localStorage.jwtToken) {
  // Set auth token header auth.
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info.
  const userDecoded = jwtDecode(localStorage.jwtToken);
  // Set user and isAuthenticated.
  store.dispatch(setCurrentUser(userDecoded));
  // Check for expired token.
  const currentTime = Date.now() / 1000;

  if (userDecoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // Clear the current profile.
    // Redirect to Sign In page.
    window.location.href = "/signin";
  }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Switch>
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
            </Switch>
            <Footer />
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
