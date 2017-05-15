var React = require('react');
var { Component, PropTypes } = require('react');
var { StyleSheet, View } = require('react-native');
var Login = require('../../components/auth/Login')
var { connect } = require('react-redux');

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class LoginScene extends Component {
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
    var { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
  }
}

module.exports = connect()(LoginScene);
