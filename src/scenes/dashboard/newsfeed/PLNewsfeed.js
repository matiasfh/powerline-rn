/**
 * @providesModule PLNewsfeed
 * @flow
 */
'use strict';

// var ListContainer = require('ListContainer');
var React = require('React');
var View = require('View');
var Text = require('Text');
var StyleSheet = require('StyleSheet');

function PLNewsfeed() {
  return (
    <View style={styles.container}>
      <Text>Hello, you logged in successfully</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: 'center'
  }
});

module.exports = PLNewsfeed;
