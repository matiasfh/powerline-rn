import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Routing } from "./routing";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Routing />;
  }
}
