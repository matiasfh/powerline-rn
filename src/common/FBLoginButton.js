/**
 * @providesModule FBLoginButton
 * @flow
 */
'use strict';

var React = require('react');
var { StyleSheet } = require('react-native');
var PLButton = require('PLButton');

class FBLoginButton extends React.Component {
  props: {
    style: any;
    source?: string; // For Analytics
    dispatch: (action: any) => Promise;
    onLoggedIn: ?() => void;
  };
  state: {
    isLoading: boolean;
  };
  _isMounted: boolean;

  constructor() {
    super();
    this.state = { isLoading: false };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <PLButton
    //       style={[styles.button, this.props.style]}
    //       caption="Please wait..."
    //       onPress={() => { }}
    //     />
    //   );
    // }

    return (
      <PLButton
        style={[styles.button, this.props.style]}
        icon={require('img/f-logo.png')}
        caption="Log in with Facebook"
        onPress={() => this.logIn()}
      />
    );
  }

  async logIn() {
    var { dispatch, onLoggedIn } = this.props;

    this.setState({ isLoading: true });
    onLoggedIn && onLoggedIn();
  }
}

async function timeout(ms: number): Promise {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timed out')), ms);
  });
}

var styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    width: 270,
  },
});

module.exports = FBLoginButton;
