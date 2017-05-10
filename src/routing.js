import React from "react";
import {
  LoginScene
} from "PLScenes";
import { StackNavigator } from "react-navigation";

export const Routing = StackNavigator({
  initialRouteName: { screen: LoginScene },
  Login: { screen: LoginScene }
});
