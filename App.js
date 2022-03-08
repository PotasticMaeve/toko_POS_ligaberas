import React, { Component } from "react";
import { StatusBar } from "react-native";
import Routes from "./src/Routes";

export class App extends Component {
  render() {
    return (
      <>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <Routes />
      </>
    )
  }
}

export default App