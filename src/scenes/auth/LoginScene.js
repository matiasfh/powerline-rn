import React, { Component, PropTypes } from "react";
import { View, StyleSheet } from "react-native";

var Login = require('../../components/auth/Login')
var { connect } = require('react-redux');

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export class LoginScene extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  static navigationOptions = {
    title: "Login",
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
  }
}

module.exports = connect()(LoginScene);
