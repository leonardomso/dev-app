import React, { Component } from "react";
import styled from "styled-components";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Landing from "./Landing";
import "../app.css";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
