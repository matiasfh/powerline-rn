/**
 * @providesModule PLApp
 * @flow
 */

'use strict';

var React = require('React');
var AppState = require('AppState');
var LoginScene = require('./scenes/auth/LoginScene');
var StyleSheet = require('StyleSheet');
var PLNavigator = require('PLNavigator');
var View = require('View');
var StatusBar = require('StatusBar');
var { connect } = require('react-redux');

var { version } = require('./PLEnv.js');

var PLApp = React.createClass({
  displayName: 'PLApp',
  componentDidMount: function () {
    AppState.addEventListener('change', this.handleAppStateChange);
  },

  componentWillUnmount: function () {
    AppState.removeEventListener('change', this.handleAppStateChange);
  },

  handleAppStateChange: function (appState) {
    if (appState === 'active') {
    }
  },

  render: function () {
    if (!this.props.isLoggedIn) {
      return <LoginScene />;
    }
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
        />
        <PLNavigator />
      </View>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn,
  };
}

module.exports = connect(select)(PLApp);
