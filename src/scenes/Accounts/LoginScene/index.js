import React, { Component, PropTypes } from "react";
import { View, StyleSheet } from "react-native";
import { Login } from "PLComponents";

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
        <Login navigation={navigation} />
      </View>
    );
  }
}
