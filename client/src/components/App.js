import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";

import "../app.css";
import store from "../store/store";

import setAuthToken from "../constants/authToken";
import { setCurrentUser, logoutUser } from "../actions/auth";
import { clearCurrentProfile } from "../actions/profile";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Landing from "./Landing";
import PrivateRoute from "../utils/components/PrivateRoute/";

import SignUp from "../views/auth/SignUp";
import SignIn from "../views/auth/SignIn";
import Dashboard from "../views/dashboard/";
import CreateProfile from "../views/create-profile/";
import EditProfile from "../views/edit-profile/";
import AddExperience from "../views/add-credentials/AddExperience";
import AddEducation from "../views/add-credentials/AddEducation";
import Profiles from "../views/profiles/Profiles";
import NotFound from "../views/profiles/NotFound";
import Profile from "../views/profile/";

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
    store.dispatch(clearCurrentProfile());
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
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/not-found" component={NotFound} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
            <Footer />
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
